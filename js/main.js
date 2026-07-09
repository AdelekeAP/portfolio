/* ==========================================================================
   Paul Adeleke Aladenusi (Leke) — Portfolio
   Interactions: nav scroll-state, hero name fit, scroll reveal,
   role typewriter, project hover preview, 3D skills globe.
   ========================================================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── NAV SCROLL STATE ─────────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── HERO NAME AUTO-FIT ───────────────────────────────────────────────── */
function fitHeroName() {
  const home = document.getElementById('home');
  const lines = document.querySelectorAll('.hero-name .line span');
  if (!home || !lines.length) return;
  const cs = getComputedStyle(home);
  const avail = home.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  let size = Math.min(190, window.innerWidth * 0.14);
  document.documentElement.style.setProperty('--name-size', size + 'px');
  let widest = 0;
  lines.forEach(l => { widest = Math.max(widest, l.scrollWidth); });
  if (widest > avail) {
    size = Math.floor(size * (avail / widest));
    document.documentElement.style.setProperty('--name-size', size + 'px');
  }
}
window.addEventListener('resize', fitHeroName);
fitHeroName(); // initial measure (may use fallback metrics; re-measured once fonts load)

// Gate the hero entrance on fonts being ready so the name never flashes in the
// fallback font (FOUT). The hero text is held at opacity:0 / below its mask by CSS
// until .fonts-ready is set, then the slide-up/fade animations run — measured with
// the real Syne metrics.
function revealHero() {
  fitHeroName();
  document.documentElement.classList.add('fonts-ready');
}
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(revealHero);
  setTimeout(revealHero, 2000); // fallback: reveal anyway if font loading stalls
} else {
  revealHero(); // no Font Loading API — reveal immediately
}

/* ─── SCROLL REVEAL ────────────────────────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ─── ROLE TYPEWRITER ──────────────────────────────────────────────────── */
const roles = ['Backend-Focused Engineer', 'Full-Stack Developer', 'API Architect', 'React Native Developer', 'Fintech Builder'];
if (!prefersReducedMotion) {
  let ri = 0, ci = 0, deleting = false;
  function typeRole() {
    const el = document.getElementById('role-text');
    if (!el) return;
    const target = roles[ri];
    if (!deleting) {
      el.textContent = target.slice(0, ++ci);
      if (ci === target.length) { deleting = true; setTimeout(typeRole, 2200); return; }
    } else {
      el.textContent = target.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(typeRole, deleting ? 40 : 80);
  }
  setTimeout(typeRole, 2000);
}

/* ─── PROJECT HOVER PREVIEW ────────────────────────────────────────────── */
const preview = document.getElementById('project-preview');
const previewImg = document.getElementById('preview-img');
let mouseX = 0, mouseY = 0;
let previewToken = 0; // bumped on every enter/leave to invalidate stale loads

document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

function positionPreview() {
  const pw = preview.offsetWidth, ph = preview.offsetHeight;
  const vw = window.innerWidth, vh = window.innerHeight;
  let x = mouseX + 24, y = mouseY - ph / 2;
  if (x + pw > vw - 16) x = mouseX - pw - 24;   // flip to left near right edge
  if (y < 16) y = 16;
  if (y + ph > vh - 16) y = vh - ph - 16;        // clamp vertically
  preview.style.left = x + 'px';
  preview.style.top = y + 'px';
}

function hidePreview() {
  previewToken++;                    // cancel any in-flight load's reveal
  preview.classList.remove('active');
  previewImg.removeAttribute('src'); // clear immediately — no stale image left visible
}

function showPreview(src) {
  const token = ++previewToken;
  preview.classList.remove('active'); // stay hidden until the NEW image is ready

  // Preload into a detached Image so the load handler is attached BEFORE src is set —
  // this can never miss the event (the failure mode of hooking a shared, possibly
  // already-complete <img>). Only the current request (matching token) reveals.
  const loader = new Image();
  loader.onload = () => {
    if (token !== previewToken) return; // a newer row — or a mouseleave — superseded us
    previewImg.src = src;               // swap the visible image only once fully loaded
    preview.classList.add('active');
    positionPreview();
  };
  loader.onerror = () => { /* broken path: fail silently, leave preview hidden */ };
  loader.src = src;
}

document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const img = item.dataset.img;
    if (!img) { hidePreview(); return; }
    showPreview(img);
  });
  item.addEventListener('mouseleave', hidePreview);
  item.addEventListener('mousemove', positionPreview);
});

// Warm the cache on load: preload every project image so the first hover is instant.
// Refs are kept in an array so the requests aren't garbage-collected before they finish.
const preloadedImages = [];
document.querySelectorAll('.project-item[data-img]').forEach(item => {
  const src = item.dataset.img;
  if (!src) return;
  const pre = new Image();
  pre.src = src;
  preloadedImages.push(pre);
});

/* ─── 3D SKILLS GLOBE ──────────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('globe-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const skills = [
    'Django', 'FastAPI', 'Python', 'PostgreSQL', 'Redis',
    'React', 'TypeScript', 'JavaScript', 'React Native', 'HTML/CSS',
    'Docker', 'GitHub Actions', 'Vercel', 'Sentry', 'AWS',
    'Stripe', 'Plaid', 'Clerk', 'REST APIs', 'JWT',
    'CI/CD', 'Claude Code', 'Git', 'Tailwind CSS', 'Node.js',
    'SQL', 'DRF', 'Expo', 'Agile', 'Linux'
  ];

  let W, H, radius, cx, cy, dpr;
  let rotX = 0.3, rotY = 0, velX = 0, velY = 0.003;
  let dragging = false, lastMX = 0, lastMY = 0;
  const baseVelY = prefersReducedMotion ? 0 : 0.003;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth <= 600 ? 1.5 : 2);
    const size = canvas.parentElement.offsetWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    W = canvas.width; H = canvas.height;
    cx = W / 2; cy = H / 2;
    radius = size * 0.38 * dpr;
  }
  window.addEventListener('resize', resize);
  resize();

  // Fibonacci sphere points
  function fibSphere(n) {
    const pts = [], g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = g * i;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    return pts;
  }
  const pts = fibSphere(skills.length);

  function rotate3D(x, y, z, rx, ry) {
    let y2 = y * Math.cos(rx) - z * Math.sin(rx);
    let z2 = y * Math.sin(rx) + z * Math.cos(rx);
    let x2 = x * Math.cos(ry) + z2 * Math.sin(ry);
    let z3 = -x * Math.sin(ry) + z2 * Math.cos(ry);
    return [x2, y2, z3];
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

    // Faint sphere outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const y_norm = Math.sin(lat * Math.PI / 180);
      const r_lat = Math.cos(lat * Math.PI / 180) * radius;
      const y_screen = cy + y_norm * radius;
      if (y_screen > 0 && y_screen < H) {
        ctx.beginPath();
        ctx.ellipse(cx, y_screen, r_lat, r_lat * 0.25, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.025)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Compute & sort points by depth
    const rendered = pts.map(([x, y, z], i) => {
      const [rx, ry, rz] = rotate3D(x, y, z, rotX, rotY);
      return { x: rx, y: ry, z: rz, label: skills[i] };
    }).sort((a, b) => a.z - b.z);

    rendered.forEach(p => {
      const sx = cx + p.x * radius;
      const sy = cy - p.y * radius;
      const depth = (p.z + 1) / 2; // 0=back, 1=front
      const alpha = 0.15 + depth * 0.85;
      const sz = (0.65 + depth * 0.6) * dpr;
      const isFront = p.z > 0;
      const fontSize = Math.round(10 * sz);

      ctx.save();
      ctx.font = `${isFront ? 500 : 400} ${fontSize}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Leading dot for the frontmost labels
      if (depth > 0.75) {
        ctx.fillStyle = accent;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(sx - ctx.measureText(p.label).width / 2 - 8, sy, 2.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = (isFront && depth > 0.6) ? accent : '#efefef';
      ctx.globalAlpha = alpha * (isFront ? 0.9 : 0.45);
      ctx.fillText(p.label, sx, sy);
      ctx.restore();
    });

    if (!dragging) {
      rotY += velY;
      rotX += velX;
      velX *= 0.98;
    }
    requestAnimationFrame(draw);
  }
  draw();

  // Mouse / touch drag
  canvas.addEventListener('mousedown', e => { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    rotY += (e.clientX - lastMX) * 0.008;
    rotX += (e.clientY - lastMY) * 0.008;
    lastMX = e.clientX; lastMY = e.clientY;
  });
  window.addEventListener('mouseup', () => dragging = false);
  canvas.addEventListener('touchstart', e => { dragging = true; lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY; e.preventDefault(); }, { passive: false });
  canvas.addEventListener('touchmove', e => {
    if (!dragging) return;
    rotY += (e.touches[0].clientX - lastMX) * 0.01;
    rotX += (e.touches[0].clientY - lastMY) * 0.01;
    lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY;
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchend', () => dragging = false);

  // Mouse proximity nudges spin speed
  document.addEventListener('mousemove', e => {
    if (dragging || prefersReducedMotion) return;
    const rect = canvas.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1.5) {
      velY = baseVelY + dx * 0.004;
      velX = dy * 0.003;
    }
  });
})();
