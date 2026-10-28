@AGENTS.md

# Project: Mahdi Hamed — Personal Portfolio

Single-page portfolio site for Mahdi Hamed (Software Architect & Cloud Solutions Engineer). Static content, no backend, no env vars. Deployed to Vercel from GitHub (`main`).

Related docs (read when relevant):
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — colors, typography, spacing, motion, component patterns. Read before any visual/UI change.
- [docs/ROADMAP.md](docs/ROADMAP.md) — known issues and the enhancement/modernization backlog. Check it before starting improvement work, and update it when you finish or discover an item.

## Stack

- **Next.js 16.2** (App Router, Turbopack) + **React 19.2** + **TypeScript 5** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — CSS-first config in `src/app/globals.css` (`@theme inline`); there is **no `tailwind.config.*`**
- **Framer Motion 12** for scroll-reveal animations
- **lucide-react** for icons (brand icons like GitHub/LinkedIn are custom SVGs in `SocialIcons.tsx`, because lucide doesn't ship brand marks)
- `clsx` + `tailwind-merge` via `cn()` in `src/lib/utils.ts`
- ESLint 9 flat config (`eslint-config-next` core-web-vitals + typescript). No Prettier, no tests.

## Commands

```bash
npm install        # required first — node_modules is not committed (also needed for node_modules/next/dist/docs)
npm run dev        # http://localhost:3000
npm run build      # production build — run this to verify changes (type-checks too)
npm run lint       # eslint
```

Node 20.9+ is required by Next 16.
Shell is Windows (PowerShell / Git Bash), so use forward-slash paths in scripts.

## Architecture

```
src/app/            layout.tsx (fonts, metadata, JSON-LD, Navbar/Footer), page.tsx (composes sections),
                    globals.css (tokens), loading.tsx, not-found.tsx, sitemap.ts, robots.ts, favicon.ico
src/components/
  layout/           Navbar (client: scroll-spy + mobile menu), Footer
  sections/         Hero, About, Skills, Experience, Projects, Certifications, Education, Languages, Contact
  ui/               Button, Badge, Card, SectionHeading, Timeline, MotionWrapper, SocialIcons
src/data/
  portfolio.ts      ALL CV content (typed as PortfolioData)
  site.ts           siteConfig (url, SEO, navItems, social links, resume path) + jsonLd
src/types/portfolio.ts  content interfaces
public/             profile.png, Mahdi-Hamed-Resume.pdf (+ unused create-next-app SVGs)
```

Key data flow: **content lives in `src/data/`, components only render it.** Sections import `portfolio` / `siteConfig` directly; there are no props between `page.tsx` and sections.

## Conventions

- **Content changes go in `src/data/portfolio.ts`** (and its type in `src/types/portfolio.ts`), never hard-coded in components. Exception (tech debt): `Certifications.tsx` hard-codes `certificationGroups` and provider brand marks. A new cert provider needs a group entry there too, or its certs won't render.
- **Server Components by default.** Add `"use client"` only for state, effects, or browser APIs (Navbar, Contact clipboard, MotionWrapper). Wrap animated content in `MotionWrapper` / `StaggerContainer` + `StaggerItem` rather than making a whole section a client component.
- **Section anatomy** (copy an existing section):
  ```tsx
  <section id="x" aria-labelledby="x-heading" className="py-24">
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <MotionWrapper><SectionHeading id="x-heading" eyebrow="…" title="…" description="…" /></MotionWrapper>
      …
  ```
  Always pass `id` to `SectionHeading` to match `aria-labelledby`. Alternate sections get the band style `border-y border-white/5 bg-[#0c0c14]/50`.
- Adding a section: create it in `components/sections/`, add it to `page.tsx`, and if it should appear in the nav, add it to `siteConfig.navItems` (the href must equal the section `id`).
- Use `cn()` for conditional classes. Named exports for components (`export function X`); Next special files (`page`, `layout`, etc.) use default exports.
- Imports use the `@/*` alias for `src/*`.
- External links: `target="_blank" rel="noopener noreferrer"`. Icons get `aria-hidden`; icon-only buttons and links need an `aria-label`.
- Respect reduced motion: `MotionWrapper` already checks `useReducedMotion`, and `globals.css` neutralizes CSS animations.
- Dark-only theme. Accent pair is violet (`violet-400/500/600`) to cyan (`cyan-400/500`). See DESIGN-SYSTEM.md.

## Next.js 16 gotchas

This is newer than most training data. Before using any Next API, read `node_modules/next/dist/docs/` (after `npm install`). In particular:
- Request APIs (`params`, `searchParams`, `cookies()`, `headers()`) are **async** and must be awaited.
- `middleware.ts` is renamed to `proxy.ts`.
- Turbopack is the default bundler for dev and build.
- `next lint` was removed; use `npm run lint` (plain `eslint`).
- With React 19, `ref` is a regular prop, so new components shouldn't use `forwardRef`.

## Verification

There are no tests. After changes, run `npm run lint` and `npm run build`, and spot-check `npm run dev` at mobile (~375px) and desktop widths. Check keyboard focus rings and the reduced-motion behavior.

## Identity / domain

- Canonical domain: **`https://me.frontserveai.com`**, set in `siteConfig.url`. It feeds metadata, the sitemap, robots, and JSON-LD. (The old domain `me.mandn.shop` is retired; don't reintroduce it.)
- The personal contact info (email, phone) is intentionally public on the site. Keep it.
