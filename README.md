# Product Diary

Nightly diary of project changes under `/Volumes/nas/projects`, published at
**https://blog.remnantsecurity.com**.

## Layout

- `posts/<project-slug>/YYYY-MM-DD.md` — one entry per project per day. Optional frontmatter:
  `title`, `project` (canonical display name from `PROJECTS.md`), `summary`.
- `assets/<project-slug>/YYYY-MM-DD/*.png` — screenshots; reference them as `/assets/...` in posts.

## Publish

```sh
git add -A && git commit -m "Diary: YYYY-MM-DD"
git push origin main     # Markdown source
npm run deploy           # builds dist/ and force-pushes it to gh-pages
```

Routes: `/`, `/<project>/`, `/<project>/YYYY-MM-DD/`.

The repo is **public** (GitHub Pages requires it on this plan), so the `main` branch is as public
as the site. Never commit secrets, `.env` contents, private answer material, unpublished
manuscript text, or learner data.
