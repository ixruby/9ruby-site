# 9ruby.com

> Corporate website for [Nine Ruby Management FZ-LLC](https://www.9ruby.com).

## Overview

The official 9Ruby corporate website featuring 3D shader gradients, Three.js visuals, and a modern landing experience. Showcases the company's products, services, and brand identity.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **3D:** Three.js, React Three Fiber, ShaderGradient
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5

## Getting Started

```bash
npm install
npm run dev   # http://localhost:3000
```

## Environment

Copy `.env.example` to `.env.local` for local-only secrets.

- `OPENROUTER_API_KEY` uses OpenRouter first, defaulting to the free `openrouter/free` router.
- `GROQ_API_KEY` is the second provider, defaulting to `llama-3.1-8b-instant`.
- `GEMINI_API_KEY` is the third provider, defaulting to `gemini-2.5-flash-lite`.
- Without an AI provider key, the homepage uses local deterministic copy.

## Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # React components (3D scenes, sections)
public/
├── fonts/        # Custom typefaces
└── images/       # Brand assets
```

## Deployment

Deployed to Vercel. Pushes to `main` trigger auto-deploy.

## License

Proprietary — Nine Ruby Management FZ-LLC
