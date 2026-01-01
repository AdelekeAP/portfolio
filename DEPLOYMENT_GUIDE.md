# Quick Deployment Guide

Get your portfolio live in minutes!

## Before You Deploy - Critical Steps

### 1. Convert Resume to PDF
```bash
# You MUST convert your .docx resume to PDF first
# Option A: Use Microsoft Word
# File → Save As → PDF

# Option B: Use macOS Preview
# Open the .docx file → File → Export as PDF

# Save as: assets/downloads/Adeleke_Aladenusi_Resume_2025.pdf
```

### 2. Rename HTML File
```bash
cd /Users/useruser/Documents/portfolio
mv leke_portfolio.html index.html
```

### 3. Add Required Images (Optional but Recommended)
Place these in `assets/images/`:
- `favicon.ico` - Browser tab icon (16x16 or 32x32)
- `apple-touch-icon.png` - iOS home screen icon (180x180)
- `og-image.png` - Social media preview (1200x630)

You can create these quickly at:
- **Favicon**: https://favicon.io/
- **OG Image**: https://www.canva.com/ (use template: 1200x630)

---

## Method 1: Netlify (Easiest - Recommended)

### Option A: Drag & Drop (No Git Required) - 2 Minutes

1. **Prepare your files**
   ```bash
   # Make sure you're in the portfolio directory
   cd /Users/useruser/Documents/portfolio

   # Verify index.html exists
   ls index.html
   ```

2. **Visit Netlify Drop**
   - Go to: https://app.netlify.com/drop
   - Sign in (or create free account with GitHub/Email)

3. **Drag & Drop**
   - Drag the entire `portfolio` folder to the Netlify Drop page
   - Wait 10-30 seconds for deployment

4. **Done!**
   - You'll get a URL like: `random-name-123.netlify.app`
   - Click "Site settings" to customize the name

5. **Customize Domain (Optional)**
   - Site settings → Domain management
   - Change to: `paulaladenusi.netlify.app` (or any available name)

### Option B: GitHub + Netlify (Continuous Deployment) - 5 Minutes

1. **Initialize Git & Push to GitHub**
   ```bash
   cd /Users/useruser/Documents/portfolio

   # Initialize git
   git init
   git add .
   git commit -m "Initial commit: Portfolio website with TIC Hackathon projects"

   # Create repo on GitHub (go to github.com/new)
   # Name it: portfolio
   # Don't initialize with README

   # Push to GitHub
   git branch -M main
   git remote add origin https://github.com/AdelekeAP/portfolio.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to: https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your `portfolio` repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Click "Deploy site"

3. **Done!**
   - Any future changes: just `git push`
   - Netlify auto-deploys in seconds

---

## Method 2: GitHub Pages - 3 Minutes

1. **Push to GitHub** (if not already done)
   ```bash
   cd /Users/useruser/Documents/portfolio
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/AdelekeAP/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to: https://github.com/AdelekeAP/portfolio/settings/pages
   - Source: "Deploy from a branch"
   - Branch: `main`, folder: `/ (root)`
   - Click "Save"

3. **Wait 1-2 minutes**, then visit:
   ```
   https://AdelekeAP.github.io/portfolio/
   ```

---

## Method 3: Vercel - 2 Minutes

1. **Push to GitHub** (same as above)

2. **Deploy with Vercel**
   - Go to: https://vercel.com/new
   - Sign in with GitHub
   - Import `portfolio` repository
   - Click "Deploy"

3. **Done!**
   - URL: `portfolio-username.vercel.app`

---

## Custom Domain Setup (Optional)

### Purchase Domain ($10-15/year)
Recommended registrars:
- **Namecheap**: https://www.namecheap.com
- **Google Domains**: https://domains.google
- **Cloudflare**: https://www.cloudflare.com/products/registrar/

Suggested domains:
- `paulaladenusi.com`
- `leke.dev`
- `adelekeleke.com`

### Connect to Netlify
1. In Netlify: Site settings → Domain management → Add custom domain
2. Add your domain (e.g., `paulaladenusi.com`)
3. Follow DNS instructions (usually adding A record or CNAME)
4. Wait 24-48 hours for DNS propagation
5. Netlify auto-provisions SSL certificate

### Connect to GitHub Pages
1. Add file `CNAME` to your repo:
   ```bash
   echo "paulaladenusi.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
2. In your domain registrar, add DNS records:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: A
   Name: @
   Value: 185.199.109.153

   Type: A
   Name: @
   Value: 185.199.110.153

   Type: A
   Name: @
   Value: 185.199.111.153
   ```

---

## Post-Deployment Checklist

Once your site is live, verify:

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Mobile menu works (test on phone)
- [ ] Resume downloads successfully
- [ ] All project modals open and close
- [ ] Contact form opens email client
- [ ] Social media links work
- [ ] Custom cursor works on desktop
- [ ] Animations play smoothly
- [ ] SEO meta tags present (view page source)

### Test Tools

1. **Mobile Responsiveness**
   - https://responsivedesignchecker.com/
   - Enter your live URL

2. **Performance & SEO**
   - https://pagespeed.web.dev/
   - Enter your live URL
   - Target score: 90+

3. **Meta Tags Preview**
   - https://www.opengraph.xyz/
   - See how your site appears on social media

4. **SSL Certificate**
   - Check for padlock icon in browser
   - Should show automatically with Netlify/Vercel

---

## Updating Your Live Site

### If using Netlify Drag & Drop:
1. Make changes to local files
2. Drag folder to Netlify again (it updates existing site)

### If using Git (GitHub + Netlify/Vercel):
```bash
# Make your changes, then:
git add .
git commit -m "Update: Added new project"
git push

# Site auto-deploys in 30-60 seconds
```

---

## Troubleshooting

### Resume not downloading
**Problem**: 404 error when clicking download
**Solution**:
```bash
# Ensure PDF exists:
ls assets/downloads/Adeleke_Aladenusi_Resume_2025.pdf

# If missing, convert .docx to PDF and place there
```

### Custom cursor not working
**Problem**: Default cursor shows
**Solution**: This is normal on mobile devices - custom cursor only works on desktop

### Mobile menu not opening
**Problem**: Hamburger button does nothing
**Solution**: Check browser console (F12) for JavaScript errors

### Images not loading
**Problem**: Broken image icons
**Solution**:
- Check file paths are relative (not absolute)
- Verify image files were uploaded
- Check case-sensitive file names

### Site not updating after git push
**Problem**: Changes don't appear
**Solution**:
- Wait 1-2 minutes for build
- Check deployment logs in Netlify/Vercel dashboard
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

---

## Next Steps After Deployment

1. **Share Your Portfolio**
   - Update LinkedIn with portfolio URL
   - Add to email signature
   - Include in job applications
   - Share on Twitter/X

2. **Submit to Search Engines**
   - https://search.google.com/search-console
   - Add your site and submit sitemap

3. **Set Up Analytics**
   - Add Google Analytics (see SPECIFICATIONS.md)
   - Track visitor behavior

4. **Monitor Performance**
   - Run Lighthouse audits monthly
   - Optimize based on feedback

5. **Keep Content Fresh**
   - Add new projects as you build them
   - Update experience section
   - Refresh resume quarterly

---

## Support

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Review SPECIFICATIONS.md for detailed information
3. Netlify/Vercel have excellent documentation
4. GitHub Issues for platform-specific problems

---

**Congratulations on deploying your portfolio!** 🎉

Your next step: Share it with the world and start applying to those EMEA tech internships!

---

Generated: November 23, 2025
Last Updated: November 23, 2025
