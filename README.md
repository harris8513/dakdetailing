# DAK Detailing Website

Static, interactive website for DAK Detailing (mobile paint correction & ceramic coatings).

## How to run locally
Just open `index.html` in your browser.

## Deploy on GitHub Pages
1. Create a new repo (e.g. `dak-detailing`)
2. Drag these files into the repo
3. In GitHub: Settings → Pages
4. Source: Deploy from a branch → Branch: `main` / root
5. Save. Your site will be live at the provided URL.

## Customize (must-do)
- Update your email in `assets/js/main.js`:
  - `const BUSINESS_EMAIL = "youremail@example.com";`
- Update Instagram/TikTok handles in `assets/js/main.js`
- Replace placeholder gallery with real photos:
  - Put images in `assets/img/`
  - Then modify the gallery in `index.html` to use `<img>` tags or update the lightbox logic.

## Optional upgrades later
- Formspree / Netlify Forms for real form submissions
- Add real before/after slider
- Add real Google review embed
