@AGENTS.md

# Project: Mahdi Hamed — Personal Portfolio

Single-page portfolio site for Mahdi Hamed: Founder & CEO of FrontServe AI (the lead story) and Software Architect at Wizard AI. Static content, no backend, no env vars. Deployed to Vercel from GitHub (`main`).

Related docs (read when relevant):

- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — colors, typography, spacing, motion, component patterns. Read before any visual/UI change.
- [docs/ROADMAP.md](docs/ROADMAP.md) — known issues and the enhancement/modernization backlog. Check it before starting improvement work, and update it when you finish or discover an item.

## Stack

- **Next.js 16.2** (App Router, Turbopack) + **React 19.2** + **TypeScript 5** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — CSS-first config in `src/app/globals.css` (`@theme inline`); there is **no `tailwind.config.*`**
- **Font:** Archivo only (variable, with the `wdth` axis; use `font-stretch-*`), via `next/font/google`. The fallback font can't do the width axis, so wide text that wraps differently in the fallback causes layout shift. That's why the hero headline is set at normal width; only short, non-wrapping text (the name, the impact numbers) is wide.
- **Vercel Analytics + Speed Insights** (`<Analytics />`, `<SpeedInsights />` in layout). Their scripts 404 locally; that's expected.
- **No animation library.** Motion is the hero diagram's CSS draw-in (`.diagram-*` in `globals.css`) plus the user-triggered trace pulse ("Trace an order" / "Trace a request") in `DiagramExplorer`.
- **lucide-react** for small UI icons (download, menu, external link, copy, theme, chevrons)
- `clsx` + `tailwind-merge` via `cn()` in `src/lib/utils.ts`
- ESLint 9 flat config (`eslint-config-next` core-web-vitals + typescript). Prettier 3 with `prettier-plugin-tailwindcss` (`.prettierrc.json`; `endOfLine: auto` because git uses CRLF on Windows checkouts; `AGENTS.md` is ignored because Next manages it). No tests.

## Commands

```bash
npm install        # required first — node_modules is not committed (also needed for node_modules/next/dist/docs)
npm run dev        # http://localhost:3000
npm run build      # production build — run this to verify changes (type-checks too)
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write . (sorts Tailwind classes too)
npm run format:check  # CI runs format:check + lint + typecheck + build on push/PR
```

Node 20.9+ is required by Next 16.
Shell is Windows (PowerShell / Git Bash), so use forward-slash paths in scripts.

## Architecture

```
src/app/            layout.tsx (fonts, metadata, JSON-LD, theme script, Navbar/Footer/CommandPalette), page.tsx (composes sections),
                    globals.css (tokens), loading.tsx, not-found.tsx, sitemap.ts, robots.ts, favicon.ico,
                    opengraph-image.tsx (next/og share card; also used for twitter:image; fonts from assets/fonts)
src/components/
  layout/           Navbar (client: scroll-spy + mobile menu), Footer, ThemeToggle, CommandPalette (Ctrl/⌘ K, native <dialog>)
  sections/         Hero, About, Experience, Projects (case file + index), Stack, Credentials (certs + education + languages), Contact
  ui/               Section (spec-sheet section shell), Button, ArchitectureDiagram (server SVG),
                    DiagramExplorer (client wrapper: hover/tap/arrow highlighting, request trace)
src/data/
  portfolio.ts      ALL CV content (typed as PortfolioData)
  diagrams/         architecture figures. shared.ts has the types and defineDiagram(); frontserve.ts is the
                    hero (Fig. 1); cybershield.ts sits in its case file (Fig. 3, confirmed by Mahdi). Each has
                    labels defined once plus `wide` (sm and up) and `tall` (phones) layouts. A new node needs a
                    position in BOTH layouts (defineDiagram throws otherwise), a `kind` and a factual `note`;
                    edges list `from`/`to` node ids for the explorer.
  site.ts           siteConfig (url, SEO, navItems, social links, resume path) + jsonLd (built from portfolio data)
src/lib/theme.ts    manual theme choice (data-theme on <html>, localStorage) + the pre-paint inline script
src/types/portfolio.ts  content interfaces
public/             profile.jpg (OG/JSON-LD), profile-photo.webp (transparent cut-out from remove.bg, About section), Mahdi-Hamed-Resume.pdf
assets/fonts/       static Latin-subset Archivo TTFs for next/og (satori can't read variable fonts) + OFL.txt
```

Key data flow: **content lives in `src/data/`, components only render it.** Sections import `portfolio` / `siteConfig` directly; there are no props between `page.tsx` and sections.

## Conventions

- **Content changes go in `src/data/portfolio.ts`** (and its type in `src/types/portfolio.ts`), never hard-coded in components. Certifications are grouped by `certificationProviders`; a cert whose `provider` has no matching provider entry won't render. Projects with `draft: true` don't render; projects with a `caseStudy` render as full case files in array order (FrontServe AI first, then CyberShield; `caseStudy.diagram` embeds a figure), the rest as an expandable index. Company projects (`ownership: "company"`) have no links.
- **Server Components by default.** Client components: Navbar (scroll-spy, menu), Contact (clipboard), DiagramExplorer, CommandPalette, ThemeToggle. The diagram SVG stays server-rendered; DiagramExplorer marks it through `data-*` attributes.
- **Section anatomy:** wrap every section in `<Section id="x" title="…">`. It renders the hairline rule, the sticky title rail, the `h2` with `id="x-heading"`, and `aria-labelledby`. Optional `meta` adds a line under the title; `band` gives the raised paper tone (About and Projects use it, to vary the rhythm). Contact is the exception: a full-bleed `inverse` band with its own heading.
- **Content inside sections is lists, not cards:** `divide-y divide-rule border-y border-rule` rows, `dl` for label/value pairs, and 3-column ruled grids (`border-t border-ink`, `border-l border-rule` between columns) for outcomes, the case file and the stack. Longer detail goes behind `<details>`.
- Adding a section: create it in `components/sections/`, add it to `page.tsx`, and if it should appear in the nav, add it to `siteConfig.navItems` (the href must equal the section `id`).
- Use `cn()` for conditional classes. Named exports for components (`export function X`); Next special files (`page`, `layout`, etc.) use default exports.
- Imports use the `@/*` alias for `src/*`.
- External links: `target="_blank" rel="noopener noreferrer"`. Icons get `aria-hidden`; icon-only buttons and links need an `aria-label`.
- Motion: don't add scroll-reveal or per-element entrance animations. The hero diagram is the page's one orchestrated moment. Any new CSS animation goes inside `@media (prefers-reduced-motion: no-preference)`; JS motion checks `matchMedia("(prefers-reduced-motion: reduce)")`.
- Theme: light "drafting film" by default, with a dark "blueprint at night" version via `prefers-color-scheme`, which the toggle can override (`data-theme` on `<html>`). Token values are defined three times in globals.css (light, OS dark, `[data-theme="dark"]`); keep them in sync. Use the custom `dark:` variant (it respects the toggle), never a raw `prefers-color-scheme` media query in components. Use only the tokens (`paper`, `ink`, `graphite`, `rule`, `cobalt`, …), never raw colors or Tailwind palette colors like `zinc-*`. Cobalt is reserved for interactive elements and the diagram's focal node. See DESIGN-SYSTEM.md.

## Next.js 16 gotchas

This is newer than most training data. Before using any Next API, read `node_modules/next/dist/docs/` (after `npm install`). In particular:

- Request APIs (`params`, `searchParams`, `cookies()`, `headers()`) are **async** and must be awaited.
- `middleware.ts` is renamed to `proxy.ts`.
- Turbopack is the default bundler for dev and build.
- `next lint` was removed; use `npm run lint` (plain `eslint`).
- With React 19, `ref` is a regular prop, so new components shouldn't use `forwardRef`.

## Verification

Run `npm run format` before committing. There are no tests. Last Lighthouse run (2026-10-28, local prod build): mobile 96/100/96/100, desktop 100/100/96/100 (perf/a11y/best-practices/SEO). After changes, run `npm run lint` and `npm run build`, and spot-check `npm run dev` at mobile (~375px) and desktop widths, in **both light and dark** color schemes. Check keyboard focus rings, the reduced-motion behavior, Ctrl K, and the diagram explorer (hover, tap, arrows, trace).
Screenshots: headless Chrome (`chrome.exe --headless=new --screenshot=… --window-size=W,H --blink-settings=preferredColorScheme=1|0`, plus a throwaway `--user-data-dir`). Chrome won't go below ~500px wide on Windows, so test phone widths by loading the page in a 390px `<iframe>`.

## Identity / domain

- Canonical domain: **`https://me.frontserveai.com`**, set in `siteConfig.url`. It feeds metadata, the sitemap, robots, and JSON-LD. (The old domain `me.mandn.shop` is retired; don't reintroduce it.)
- The personal contact info (email, phone) is intentionally public on the site. Keep it.
