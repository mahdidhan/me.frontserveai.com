@AGENTS.md

# Project: Mahdi Hamed — Personal Portfolio

Single-page portfolio site for Mahdi Hamed (Software Architect & Cloud Solutions Engineer). Static content, no backend, no env vars. Deployed to Vercel from GitHub (`main`).

Related docs (read when relevant):
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — colors, typography, spacing, motion, component patterns. Read before any visual/UI change.
- [docs/ROADMAP.md](docs/ROADMAP.md) — known issues and the enhancement/modernization backlog. Check it before starting improvement work, and update it when you finish or discover an item.

## Stack

- **Next.js 16.2** (App Router, Turbopack) + **React 19.2** + **TypeScript 5** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — CSS-first config in `src/app/globals.css` (`@theme inline`); there is **no `tailwind.config.*`**
- **Fonts:** Archivo (variable, with the `wdth` axis; use `font-stretch-*`) and IBM Plex Mono, via `next/font/google`
- **No animation library.** The only motion is the hero diagram's CSS draw-in (`.diagram-*` in `globals.css`).
- **lucide-react** for small UI icons (download, menu, external link, copy)
- `clsx` + `tailwind-merge` via `cn()` in `src/lib/utils.ts`
- ESLint 9 flat config (`eslint-config-next` core-web-vitals + typescript). No Prettier, no tests.

## Commands

```bash
npm install        # required first — node_modules is not committed (also needed for node_modules/next/dist/docs)
npm run dev        # http://localhost:3000
npm run build      # production build — run this to verify changes (type-checks too)
npm run lint       # eslint
npm run typecheck  # tsc --noEmit (CI runs lint + typecheck + build on push/PR)
```

Node 20.9+ is required by Next 16.
Shell is Windows (PowerShell / Git Bash), so use forward-slash paths in scripts.

## Architecture

```
src/app/            layout.tsx (fonts, metadata, JSON-LD, Navbar/Footer), page.tsx (composes sections),
                    globals.css (tokens), loading.tsx, not-found.tsx, sitemap.ts, robots.ts, favicon.ico,
                    opengraph-image.tsx (next/og share card; also used for twitter:image)
src/components/
  layout/           Navbar (client: scroll-spy + mobile menu), Footer
  sections/         Hero, About, Experience, Projects, Skills, Certifications, Education (+ languages), Contact
  ui/               Section (spec-sheet section shell), Button, ArchitectureDiagram (hero SVG figure)
src/data/
  portfolio.ts      ALL CV content (typed as PortfolioData)
  architecture.ts   groups/nodes/edges for the hero diagram (CyberShield, confirmed by Mahdi)
  site.ts           siteConfig (url, SEO, navItems, social links, resume path) + jsonLd
src/types/portfolio.ts  content interfaces
public/             profile.jpg, Mahdi-Hamed-Resume.pdf
```

Key data flow: **content lives in `src/data/`, components only render it.** Sections import `portfolio` / `siteConfig` directly; there are no props between `page.tsx` and sections.

## Conventions

- **Content changes go in `src/data/portfolio.ts`** (and its type in `src/types/portfolio.ts`), never hard-coded in components. Certifications are grouped by `certificationProviders`; a cert whose `provider` has no matching provider entry won't render.
- **Server Components by default.** Only Navbar (scroll-spy, menu) and Contact (clipboard) are client components.
- **Section anatomy:** wrap every section in `<Section id="x" title="…">`. It renders the hairline rule, the sticky title rail, the `h2` with `id="x-heading"`, and `aria-labelledby`. Optional `aside` goes in the rail (About uses it for the photo).
- **Content inside sections is lists, not cards:** `divide-y divide-rule border-y border-rule` rows, `dl` for label/value pairs, plain comma-joined text for tech lists.
- Adding a section: create it in `components/sections/`, add it to `page.tsx`, and if it should appear in the nav, add it to `siteConfig.navItems` (the href must equal the section `id`).
- Use `cn()` for conditional classes. Named exports for components (`export function X`); Next special files (`page`, `layout`, etc.) use default exports.
- Imports use the `@/*` alias for `src/*`.
- External links: `target="_blank" rel="noopener noreferrer"`. Icons get `aria-hidden`; icon-only buttons and links need an `aria-label`.
- Motion: don't add scroll-reveal or per-element entrance animations. The hero diagram is the page's one orchestrated moment. Any new CSS animation goes inside `@media (prefers-reduced-motion: no-preference)`.
- Theme: light "drafting film" by default, with a dark "blueprint at night" version via `prefers-color-scheme`. Use only the tokens (`paper`, `ink`, `graphite`, `rule`, `cobalt`, …), never raw colors or Tailwind palette colors like `zinc-*`. Cobalt is reserved for interactive elements and the diagram's focal node. See DESIGN-SYSTEM.md.

## Next.js 16 gotchas

This is newer than most training data. Before using any Next API, read `node_modules/next/dist/docs/` (after `npm install`). In particular:
- Request APIs (`params`, `searchParams`, `cookies()`, `headers()`) are **async** and must be awaited.
- `middleware.ts` is renamed to `proxy.ts`.
- Turbopack is the default bundler for dev and build.
- `next lint` was removed; use `npm run lint` (plain `eslint`).
- With React 19, `ref` is a regular prop, so new components shouldn't use `forwardRef`.

## Verification

There are no tests. After changes, run `npm run lint` and `npm run build`, and spot-check `npm run dev` at mobile (~375px) and desktop widths, in **both light and dark** color schemes. Check keyboard focus rings and the reduced-motion behavior.
Screenshots: headless Chrome (`chrome.exe --headless=new --screenshot=… --window-size=W,H --blink-settings=preferredColorScheme=1|0`, plus a throwaway `--user-data-dir`). Chrome won't go below ~500px wide on Windows, so test phone widths by loading the page in a 390px `<iframe>`.

## Identity / domain

- Canonical domain: **`https://me.frontserveai.com`**, set in `siteConfig.url`. It feeds metadata, the sitemap, robots, and JSON-LD. (The old domain `me.mandn.shop` is retired; don't reintroduce it.)
- The personal contact info (email, phone) is intentionally public on the site. Keep it.
