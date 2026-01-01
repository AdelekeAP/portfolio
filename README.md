# Paul Adeleke Aladenusi - Portfolio Website

**Name:** Paul Adeleke Aladenusi
**Matric Number:** 23120111053

A modern, responsive portfolio website showcasing projects, experience, and technical skills. Built with clean HTML, CSS, and JavaScript featuring interactive animations and a minimalist design philosophy.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Custom cursor, smooth animations, and hover effects
- **SEO Optimized**: Comprehensive meta tags for search engines and social media
- **Accessible**: ARIA labels and keyboard navigation support
- **Performance**: Lightweight, fast loading, and optimized assets
- **Mobile Navigation**: Hamburger menu for seamless mobile experience

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom animations, flexbox, grid
- **JavaScript (ES6+)**: Interactive features and smooth UX
- **No frameworks**: Pure vanilla JavaScript for optimal performance

## Project Structure

```
portfolio/
├── index.html                  # Main HTML file (leke_portfolio.html)
├── assets/
│   ├── css/                    # Future: Modular CSS files
│   ├── js/                     # Future: Modular JavaScript files
│   ├── images/                 # Images and icons
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   ├── og-image.png       # Social media preview image
│   │   └── projects/          # Project screenshots
│   └── downloads/
│       └── Adeleke_Aladenusi_Resume_2025.pdf
├── README.md                   # This file
├── SPECIFICATIONS.md           # Detailed project specifications
├── .gitignore                  # Git ignore rules
├── netlify.toml               # Netlify configuration
└── vercel.json                # Vercel configuration
```

## Local Development

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)
- Optional: Local web server for testing

### Setup

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/AdelekeAP/portfolio.git
   cd portfolio
   ```

2. **Open the portfolio**

   Option A - Direct file opening:
   ```bash
   open leke_portfolio.html
   # or double-click the file
   ```

   Option B - Using a local server (recommended):
   ```bash
   # Python 3
   python3 -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (if you have http-server installed)
   npx http-server -p 8000
   ```

   Then visit: `http://localhost:8000/leke_portfolio.html`

3. **Make changes**
   - Edit `leke_portfolio.html` directly
   - Refresh browser to see changes

## Deployment

### Option 1: Netlify (Recommended)

**Fastest deployment method:**

1. **Install Netlify CLI** (optional)
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy via Git** (Recommended)

   a. Create a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

   b. Go to [Netlify](https://netlify.com) and sign in

   c. Click "Add new site" → "Import an existing project"

   d. Connect to GitHub and select your repository

   e. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)

   f. Click "Deploy site"

3. **Deploy via Drag & Drop** (Quickest)

   a. Go to [Netlify Drop](https://app.netlify.com/drop)

   b. Drag your entire portfolio folder

   c. Done! Your site is live

4. **Custom Domain** (Optional)
   - In Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Follow instructions to configure DNS

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd portfolio
   vercel
   ```

3. **Follow the prompts**
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - Project name? **portfolio**
   - Directory? **.**
   - Override settings? **N**

4. **Custom Domain**
   ```bash
   vercel domains add yourdomain.com
   ```

### Option 3: GitHub Pages

1. **Create GitHub repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save

3. **Rename main file**
   ```bash
   mv leke_portfolio.html index.html
   git add .
   git commit -m "Rename to index.html for GitHub Pages"
   git push
   ```

4. **Access your site**
   - URL: `https://YOUR_USERNAME.github.io/portfolio/`

### Option 4: Custom Server (Advanced)

If you have your own hosting with cPanel, FTP, or SSH access:

1. **Upload files via FTP/SFTP**
   - Use FileZilla, Cyberduck, or similar
   - Upload all files to `public_html` or equivalent
   - Rename `leke_portfolio.html` to `index.html`

2. **Or use SSH**
   ```bash
   scp -r portfolio/* user@your-server.com:/var/www/html/
   ```

## Pre-Deployment Checklist

Before going live, complete these tasks:

### Critical
- [ ] Convert resume.docx to PDF and place in `assets/downloads/`
- [ ] Add favicon.ico to `assets/images/`
- [ ] Create og-image.png (1200x630px) for social media previews
- [ ] Update canonical URL in meta tags (replace paulaladenusi.com)
- [ ] Test all links (projects, social media, email)
- [ ] Verify contact form functionality

### Recommended
- [ ] Add Google Analytics tracking code
- [ ] Set up custom domain
- [ ] Configure SSL certificate (automatic with Netlify/Vercel)
- [ ] Test on multiple devices and browsers
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Optimize images (compress to web-friendly sizes)
- [ ] Add real project screenshots to replace placeholders

### Optional
- [ ] Set up Netlify/Formspree for contact form
- [ ] Add dark mode toggle
- [ ] Create blog section
- [ ] Add testimonials
- [ ] Implement analytics dashboard

## Customization Guide

### Updating Content

1. **Personal Information**
   - Edit lines 903-909 (Hero section)
   - Update email and social links (lines 1043-1046)

2. **Projects**
   - Find Projects section (lines 904-963)
   - Duplicate project card blocks
   - Update title, description, tech tags, and links

3. **Experience**
   - Locate Experience timeline (lines 966-1011)
   - Add/edit timeline items
   - Maintain alternating left/right layout

4. **Skills**
   - Update skill bubbles (lines 871-880)
   - Add new technologies as needed

### Changing Colors

Update CSS custom properties or color values:

```css
/* Primary colors */
--bg-primary: #fafafa;      /* Background */
--text-primary: #1a202c;    /* Text */
--accent: #4a5568;          /* Accent/hover */
```

Find and replace color codes throughout the stylesheet.

### Adding Sections

1. Create new section in HTML
2. Add navigation link
3. Style in CSS
4. Add scroll animations if desired

## Performance Optimization

### Image Optimization

```bash
# Install ImageOptim (Mac) or similar
# Compress all images before upload

# Target sizes:
# - Profile photo: 400x400px, <100KB
# - Project screenshots: 800x600px, <200KB
# - OG image: 1200x630px, <300KB
```

### CSS/JS Minification

For production, consider minifying:

```bash
# CSS minification
npx clean-css-cli -o style.min.css style.css

# JS minification
npx terser script.js -o script.min.js -c -m
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari (iOS): Latest 2 versions
- Chrome Mobile (Android): Latest 2 versions

## Troubleshooting

### Issue: Custom cursor not showing on mobile
**Solution**: This is intentional. Custom cursor only works on desktop devices with a mouse.

### Issue: Resume download not working
**Solution**:
1. Ensure PDF file exists at `assets/downloads/Adeleke_Aladenusi_Resume_2025.pdf`
2. Check file name spelling
3. If using GitHub Pages, wait for deployment to complete

### Issue: Contact form not submitting
**Solution**:
1. Current implementation uses mailto: link
2. For functional form, integrate Formspree or Netlify Forms
3. See SPECIFICATIONS.md for implementation details

### Issue: Images not loading after deployment
**Solution**:
1. Check file paths are relative (not absolute)
2. Ensure image files were uploaded
3. Verify case-sensitive file names match

### Issue: Mobile menu not working
**Solution**:
1. Check JavaScript console for errors
2. Ensure mobile-menu-toggle button ID matches
3. Verify JavaScript is loading (not blocked)

## Testing

### Local Testing Checklist

```bash
# 1. Test responsiveness
# - Resize browser window
# - Use Chrome DevTools device toolbar
# - Test on actual devices

# 2. Test links
# - Click all navigation links
# - Test external links (GitHub, LinkedIn)
# - Verify resume download

# 3. Test forms
# - Fill out contact form
# - Check validation

# 4. Test animations
# - Scroll through page
# - Hover over elements
# - Check cursor effects
```

### Lighthouse Audit

1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Click "Generate report"
5. Fix any issues scoring <90

## Future Enhancements

See `SPECIFICATIONS.md` for comprehensive enhancement plans including:

- Blog integration
- CMS for easy content updates
- Advanced animations with GSAP
- 3D elements with Three.js
- Progressive Web App (PWA) features
- Multilingual support
- Video introduction
- Interactive code playground

## Contributing

This is a personal portfolio, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with description

## License

© 2025 Paul Adeleke Aladenusi. All rights reserved.

You may view and reference this code for learning purposes. Please do not copy or redistribute without permission.

## Contact

**Paul Adeleke Aladenusi (Leke)**

- Email: aladenusiadeleke@gmail.com
- LinkedIn: [Adeleke Aladenusi](https://www.linkedin.com/in/adeleke-aladenusi-1a1350337/)
- GitHub: [@AdelekeAP](https://github.com/AdelekeAP)
- Portfolio: [paulaladenusi.com](https://paulaladenusi.com) (or your deployed URL)

---

**Built with passion and attention to detail. Building the future, one elegant solution at a time.**
