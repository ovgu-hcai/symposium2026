# HCAI Symposium 2026

A cinematic, glassmorphic one-page website for the 2026 HCAI Symposium at Otto von Guericke University Magdeburg.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

The included `.github/workflows/deploy-pages.yml` workflow builds and publishes the site whenever `main` is pushed. In the GitHub repository, choose **Settings → Pages → Source → GitHub Actions** once, then push to `main`.

The Vite build uses relative asset URLs, so it works both at a user/organisation root and at a project path such as `/symposium2026/`.

Most editable event content lives in the arrays at the top of `src/main.jsx`.
