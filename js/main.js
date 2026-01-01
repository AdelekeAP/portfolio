/* ==========================================================================
   Paul Aladenusi Portfolio - Main JavaScript
   ========================================================================== */

/* --------------------------------------------------------------------------
   Theme Toggle (Dark/Light Mode)
   -------------------------------------------------------------------------- */
(function() {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add a little animation feedback
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Initialize theme toggle when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}

/* --------------------------------------------------------------------------
   Custom Cursor with Trails
   -------------------------------------------------------------------------- */
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const trails = document.querySelectorAll('.cursor-trail');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let trailPositions = Array(5).fill().map(() => ({ x: 0, y: 0 }));

// Only initialize cursor on non-touch devices
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }

        // Update trail positions
        for (let i = trailPositions.length - 1; i > 0; i--) {
            trailPositions[i] = { ...trailPositions[i - 1] };
        }
        trailPositions[0] = { x: mouseX, y: mouseY };
    });

    function animateFollower() {
        const speed = 0.4;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;

        if (cursorFollower) {
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
        }

        // Animate trails
        trails.forEach((trail, index) => {
            const targetX = trailPositions[Math.min(index * 2, trailPositions.length - 1)].x;
            const targetY = trailPositions[Math.min(index * 2, trailPositions.length - 1)].y;

            trail.style.left = targetX + 'px';
            trail.style.top = targetY + 'px';
            trail.style.opacity = Math.max(0, 0.8 - index * 0.2);
        });

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Enhanced cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .stat, .skill-bubble');
    const textElements = document.querySelectorAll('h1, h2, h3, p');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('hover');
            if (cursorFollower) cursorFollower.classList.add('hover');
            trails.forEach(trail => trail.style.opacity = '0.6');
        });
        element.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('hover');
            if (cursorFollower) cursorFollower.classList.remove('hover');
        });
    });

    textElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('text-hover');
        });
        element.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('text-hover');
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        if (cursor) cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        if (cursor) cursor.classList.remove('click');
    });
}

/* --------------------------------------------------------------------------
   Magnetic Buttons
   -------------------------------------------------------------------------- */
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

/* --------------------------------------------------------------------------
   Interactive Skill Bubbles
   -------------------------------------------------------------------------- */
document.querySelectorAll('.skill-bubble').forEach(bubble => {
    bubble.addEventListener('click', () => {
        const skill = bubble.textContent;
        const messages = {
            'JavaScript': 'My go-to language for frontend magic and backend APIs!',
            'Python': 'Perfect for AI/ML projects and rapid prototyping.',
            'React': 'Building responsive UIs that users love.',
            'TypeScript': 'JavaScript with superpowers - type safety FTW!',
            'NestJS': 'Scalable Node.js frameworks for enterprise applications.',
            'Docker': 'Containerizing applications for consistent deployments.',
            'Firebase': 'Real-time databases and authentication made easy.',
            'Git': 'Version control mastery for collaborative development.'
        };

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = messages[skill] || 'One of my favorite technologies!';
        tooltip.style.cssText = `
            position: fixed;
            background: #1a202c;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 10000;
            pointer-events: none;
            left: ${mouseX + 10}px;
            top: ${mouseY - 40}px;
            animation: fadeInOut 2s ease-in-out forwards;
        `;

        document.body.appendChild(tooltip);
        setTimeout(() => tooltip.remove(), 2000);
    });
});

/* --------------------------------------------------------------------------
   Terminal Typing Effect
   -------------------------------------------------------------------------- */
function typeInTerminal() {
    const terminal = document.querySelector('.terminal');
    const text = 'const leke = { skills: ["JavaScript", "Python", "React", "Problem Solving"], passion: "Building meaningful tech" };';

    if (terminal) {
        let i = 0;
        terminal.innerHTML = '> ';

        function type() {
            if (i < text.length) {
                terminal.innerHTML = '> ' + text.slice(0, i + 1) + '<span class="terminal-cursor">|</span>';
                i++;
                setTimeout(type, 50);
            }
        }

        // Start typing when terminal comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(type, 500);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(terminal);
    }
}

// Initialize terminal typing after DOM load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeInTerminal, 1000);
});

/* --------------------------------------------------------------------------
   Modal Functions
   -------------------------------------------------------------------------- */
function createModal(content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;

    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 20px;
        max-width: 700px;
        text-align: center;
        cursor: default;
        max-height: 80vh;
        overflow-y: auto;
    `;

    contentDiv.innerHTML = content;
    modal.appendChild(contentDiv);
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    return modal;
}

// Eagle project info
function showEagleInfo() {
    createModal(`
        <h3 style="margin-bottom: 1rem; color: #1a202c;">Eagle Vessel Tracking System</h3>
        <div style="background: #f7fafc; padding: 2rem; border-radius: 10px; margin: 1rem 0; text-align: left;">
            <h4 style="color: #1a202c; margin-bottom: 1rem;">Project Overview</h4>
            <p style="color: #4a5568; margin-bottom: 1rem;">Developed a comprehensive vessel-tracking solution for Keystone Bank Nigeria to monitor bank-owned vessels and enhance operational oversight.</p>

            <h4 style="color: #1a202c; margin-bottom: 0.5rem;">Technical Implementation</h4>
            <ul style="color: #4a5568; margin-bottom: 1rem; padding-left: 1.5rem;">
                <li>Designed robust database schema for ship information and routes</li>
                <li>Integrated AIS (Automatic Identification System) data for real-time tracking</li>
                <li>Proposed API architecture for maritime data providers</li>
                <li>Built risk assessment framework for asset management</li>
            </ul>

            <h4 style="color: #1a202c; margin-bottom: 0.5rem;">Impact</h4>
            <p style="color: #4a5568;">Enabled financial institutions to assess vessel-related asset risks more effectively and improve operational decision-making.</p>
        </div>
        <p style="color: #718096; font-size: 0.9rem;">*Internal banking tool - Code repository not publicly available due to confidentiality</p>
        <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 2rem; background: #1a202c; color: white; border: none; border-radius: 25px; cursor: pointer;">Close</button>
    `);
}

// EchoPay project info
function showEchoPayInfo() {
    createModal(`
        <div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 0.5rem 1rem; border-radius: 15px; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-bottom: 1rem;">TIC Hackathon 2.0 Winner</div>
        <h3 style="margin-bottom: 1rem; color: #1a202c;">EchoPay - Intelligent Banking Platform</h3>
        <div style="background: #f7fafc; padding: 2rem; border-radius: 10px; margin: 1rem 0; text-align: left;">
            <h4 style="color: #1a202c; margin-bottom: 1rem;">The Challenge</h4>
            <p style="color: #4a5568; margin-bottom: 1rem;">Built in under 24 hours for TIC Hackathon 2.0 (Oct 24-25, 2025) under "Reimagining Today with AI" theme - addressing modern digital banking challenges.</p>

            <h4 style="color: #1a202c; margin-bottom: 0.5rem;">The Innovation</h4>
            <ul style="color: #4a5568; margin-bottom: 1rem; padding-left: 1.5rem;">
                <li>AI-enhanced banking platform for improved user experience</li>
                <li>Advanced security features protecting financial transactions</li>
                <li>Intelligent authentication system for secure access</li>
                <li>Streamlined financial operations and transaction processing</li>
                <li>Accessible interface designed for diverse user needs</li>
            </ul>

            <h4 style="color: #1a202c; margin-bottom: 0.5rem;">Technical Approach</h4>
            <p style="color: #4a5568; margin-bottom: 1rem;">Full-stack solution with Python backend, React frontend, and AI/ML integration. Emphasis on security, performance, and seamless user experience.</p>

            <h4 style="color: #1a202c; margin-bottom: 0.5rem;">Achievement</h4>
            <p style="color: #4a5568;">Won TIC Hackathon 2.0 with EchoMind, showcasing versatility across Healthcare and Fintech AI innovation in under 24 hours.</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 2rem; background: #0891b2; color: white; border: none; border-radius: 25px; cursor: pointer;">Close</button>
    `);
}

// AI Demo modal
function showAIDemo() {
    createModal(`
        <h3 style="margin-bottom: 1rem; color: #1a202c;">PAU AI Knowledge Assistant Demo</h3>
        <div style="background: #f7fafc; padding: 2rem; border-radius: 10px; margin: 1rem 0;">
            <div style="text-align: left; font-family: monospace;">
                <div style="color: #4a5568; margin-bottom: 0.5rem;">PAU Assistant: Hello! How can I help you today?</div>
                <div style="color: #1a202c; margin-bottom: 0.5rem;">Student: What are the library opening hours?</div>
                <div style="color: #4a5568; margin-bottom: 0.5rem;">PAU Assistant: The library is open Monday-Friday: 8AM-10PM, Saturday: 9AM-6PM, Sunday: 2PM-8PM</div>
                <div style="color: #1a202c; margin-bottom: 0.5rem;">Student: How do I register for courses?</div>
                <div style="color: #4a5568;">PAU Assistant: You can register through the student portal. Go to Academic → Course Registration. The system opens 2 weeks before each semester...</div>
            </div>
        </div>
        <p style="color: #718096; font-size: 0.9rem;">This AI assistant serves 700+ students and staff, providing instant access to university policies, procedures, and guidelines.</p>
        <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 2rem; background: #1a202c; color: white; border: none; border-radius: 25px; cursor: pointer;">Close</button>
    `);
}

/* --------------------------------------------------------------------------
   Contact Form Handler
   -------------------------------------------------------------------------- */
function sendMessage() {
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Create mailto link with form data
    const subject = `Portfolio Contact from ${name}`;
    const body = `Hi Leke,

${message}

Best regards,
${name}
${email}`;

    const mailtoLink = `mailto:aladenusiadeleke@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    // Reset form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

    alert('Thank you! Your email client should open with the message ready to send.');
}

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */
// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* --------------------------------------------------------------------------
   Animations
   -------------------------------------------------------------------------- */
// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    fadeObserver.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax-bg');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add random movement to particles
document.querySelectorAll('.particle').forEach((particle, index) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = 4 + Math.random() * 4;
    particle.style.animationDelay = randomDelay + 's';
    particle.style.animationDuration = randomDuration + 's';
    particle.style.top = Math.random() * 100 + '%';
});

/* --------------------------------------------------------------------------
   Form Submission (for forms with submit event)
   -------------------------------------------------------------------------- */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMessage();
    });
}
