# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run pages:deploy # Build and deploy to Cloudflare Pages
```

## Tech Stack

- **Next.js 16** (App Router, Server Components by default)
- **React 19** (use React Compiler patterns - no useMemo/useCallback)
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4** (PostCSS plugin, @utility syntax)
- **Cloudflare Pages** (deployment via Wrangler)

## Architecture

### Component Structure
- Server Components by default, `'use client'` only when needed (e.g., scroll listeners)
- Barrel exports in `/app/components/index.tsx`
- Card components in `/app/components/card/` subdirectory

### Styling Patterns
- **Viewport units** (`dvh`, `dvw`) for responsive design
- **Custom utilities** in `globals.css` using Tailwind v4 `@utility` syntax:
  - `absolute-center` - centers with transform
  - `flex-center` - flex centering
  - `margin-center` - consistent page margins
- **Theme variables** via `@theme` block in `globals.css`
- **Fluid typography** using `clamp()` functions

### Fonts
- `league-gothic` - Google Font (var: `--font-league-gothic`)
- `neuemontreal` - Local OTF fonts (var: `--font-neuemontreal`)

### Path Alias
- `@/*` maps to project root

## Deployment

Cloudflare Pages with `@cloudflare/next-on-pages`. Output goes to `.vercel/output/static`.
