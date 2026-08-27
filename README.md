# 9Ruby — www.9ruby.com

Corporate website for **Nine Ruby Management FZ-LLC** — Dubai. Built on Next.js 16 + Tailwind 4, deployed to Vercel.

**Live:** https://www.9ruby.com · **Repo:** `ixruby/9ruby-site` · **Default branch:** `main`

## Stack
Next.js 16.2, React 19, Tailwind 4, Framer Motion, Lucide, TypeScript. Deploys via Vercel Git integration (push to `main` = production, PR = preview).

## Local dev
```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

No env vars required for local build.

## Deploy
- **Production:** push/merge to `main` → Vercel auto-deploys `www.9ruby.com`
- **Preview:** any branch/PR → `https://9ruby-site-<branch>-ixruby.vercel.app`
- **CI:** `.github/workflows/ci.yml` (lint + build, required before merge — protected `main`)

## Repo hygiene
`main` protected: requires `check` (CI), no force push. Squash merge, delete branch on merge. See `ixruby/.github/NAMING_CONVENTION.md` (`9ruby-*` split, `ruby-*` platform).

## Contributing
Branch `feat/*` or `fix/*` → PR to `main` → CI green → squash merge. Preview URL posts automatically.

---
© Nine Ruby Management FZ-LLC. Private corporate site — no public license.
