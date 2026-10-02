# Clockwork Live: Website

A plain HTML/CSS/JS static site. No build step, no framework: open any page directly in a browser, or deploy as-is.

## Structure

- `index.html`: Home (hero uses the Neon Flow tubes piece as a live WebGL background, via `assets/hero-tubes.html` in an iframe)
- `services.html`: Services
- `work.html`: Work / Portfolio
- `team.html`: Team
- `contact.html`: Contact (form is currently a placeholder: see "Wiring up the contact form" below)
- `css/style.css`: all shared styles
- `js/nav.js`: mobile menu toggle
- `assets/logo-mark.svg`: static nav/footer logo mark
- `assets/hero-tubes.html`: the interactive tubes background used on the homepage hero

## Getting this live

1. **Create a GitHub repo** for this project (e.g. `clockwork-live-site`) and push these files to it.
2. **Create a Vercel account** (free tier is fine) at vercel.com, connect it to that GitHub repo, and import the project. Vercel auto-detects static sites: no build configuration needed.
3. Every push to the main branch redeploys automatically. Vercel also gives you a preview URL for any other branch or pull request.

## Editing content later

This is plain HTML, so there are two ways to make changes without touching a terminal:

- **GitHub's web editor**: open any file in the GitHub repo and click the pencil icon to edit it directly in the browser, then commit. Good for text and copy changes.
- **Ask Claude**: paste the change you want and the relevant file, and have it make the edit and push it for you.

There's no WordPress-style dashboard here (Vercel doesn't include one): if that kind of editing experience becomes important later, the next step would be pairing this with a headless CMS (e.g. Sanity or Contentful), which gives non-technical editors a proper admin screen while keeping the fast, code-based frontend.

## Wiring up the contact form

Right now the contact form just shows an alert instead of sending anything. The quickest real options:
- **Formspree** or **Resend**: drop in a form action/endpoint, no backend code needed.
- **Vercel serverless function**: a small `/api/contact.js` that emails you the submission, once the site is on Vercel.

## Brand assets

Colors, the gear-mark logo geometry, and the Montserrat typeface are defined in `css/style.css` and reused throughout. The three brand palettes (blue / orange / green) are the same ones used in the Neon Flow interactive piece.
