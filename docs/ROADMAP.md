# Roadmap & Known Issues

A living backlog for enhancing and modernizing the portfolio. Mark items `[x]` when done and add new findings as you go. Items are roughly ordered by value and effort within each group.

## 1. Bugs / correctness

- [x] Broken `aria-labelledby`: every section now passes a matching `id` to `SectionHeading`.
- [x] README: Node 20.9+, new domain, structure includes Certifications, OG image, and `docs/`.
- [x] `Button` forwards all props (and `ref`) to the `<a>` or `<button>` it renders. It is typed as a union, and `forwardRef` is gone.
- [x] Cert "Verify" links use `rel="noopener noreferrer"`.
- [x] `sitemap.ts` no longer emits a fake `lastModified` that changed on every build.
- [x] OG image: `app/opengraph-image.tsx` generates a 1200×630 card. It also feeds `twitter:image`, and the old 800×800 entries are gone.
- [x] Renamed `public/profile.png` to `profile.jpg` (it was a JPEG all along).

## 2. Code health / tech debt

- [x] Hard-coded hex colors replaced with `@theme` tokens (`background`, `background-deep`, `band`, `surface`, `surface-sunken`).
- [x] Certification groups moved to `portfolio.certificationProviders`. Group dates are derived from the certs.
- [x] `Hero.tsx` is a Server Component.
- [x] `Navbar` scroll-spy uses an `IntersectionObserver`. The mobile menu closes on Escape and returns focus to the toggle.
- [x] Removed the unused create-next-app SVGs.
- [ ] React list keys use text slices (`highlight.slice(0, 50)`). That's fine for static content, but index-plus-content would be safer.
- [x] Tailwind v4 naming: `bg-gradient-to-*` became `bg-linear-to-*`.
- [x] Prettier + `prettier-plugin-tailwindcss` (`npm run format`), checked in CI.
- [x] `typecheck` script plus GitHub Actions CI (lint, typecheck, build on push and PR).
- [ ] `@types/node` is `^20`, which is fine. Consider bumping it to match the Node version Vercel uses.

## 3. Features / enhancements

- [x] Project `github` and `demo` links render when present ("Open live site", "View source"). None are filled in yet: add URLs in `portfolio.ts`.
- [ ] Project screenshots or a small diagram per project. A case-study page could reuse `ArchitectureDiagram` with its own data.
- [x] `featured` replaced by `caseStudy` (projects rendered as full case files) and `draft` (not rendered).
- [x] FrontServe AI (Mahdi's AI order-taker, in development) added as a second case file with website and demo links, and the Stack's third column now reflects it.
- [ ] Decision notes on the diagram: the node `note`s state facts only. Adding the reasons behind key choices (gRPC, the Cosmos DB graph, Service Bus) would make the explorer much stronger.
- [x] Portrait cut-out redone with an AI model (rembg, BiRefNet-portrait) plus white-fringe removal, so the hair edge is clean on the dark theme.
- [x] Manual light/dark toggle (navbar and command menu), saved to `localStorage` and applied before paint by an inline script.
- [x] Command menu (Ctrl/⌘ K): sections, copy email, résumé, theme, LinkedIn, GitHub.
- [ ] Contact form (Server Action + Resend/email service), or a "book a call" link.
- [ ] Blog / writing section using MDX for architecture and AI articles. This needs routes beyond the single page.
- [ ] Case-study pages per project (`app/projects/[slug]/page.tsx`). Remember that `params` is async in Next 16.
- [x] Vercel Analytics and Speed Insights added. Turn both on in the Vercel dashboard (Project → Analytics / Speed Insights).
- [ ] i18n: Arabic version with RTL (Mahdi lists Arabic as a language). Archivo has no Arabic glyphs, so pair it with an Arabic family.
- [ ] Testimonials / recommendations section.

## 4. Modernization (visual)

- [x] **Redesign to "drafting film"** (see DESIGN-SYSTEM.md): cool paper and ink palette with a dark version, Archivo with its width axis, spec-sheet section layout, and a hero architecture diagram that draws itself once. This replaced the violet/cyan glass-card look.
- [x] Removed framer-motion and all scroll-reveal animations.
- [x] Experience grouped by company, so promotions read as one story.
- [x] 404 and share image restyled to match.
- [x] Hero diagram redrawn as CyberShield from Mahdi's description: Entra ID single sign-on, NGINX ingress, gRPC services with Helm, Sentinel/Defender/Graph mail signals, Azure SQL and Cosmos DB (plus graph), Service Bus (RabbitMQ locally) with Logic Apps, and Container Registry, Key Vault, Storage and Notification Hubs.
- [x] Projects section renamed to CyberShield to match the experience and the diagram.
- [x] Phone diagram: a dedicated tall layout below `sm` that fits at full size with no horizontal scroll.
- [x] Share image uses Archivo (static Expanded Bold + Regular instances in `assets/fonts`, OFL).
- [x] **"Live Blueprint" redesign** (2026-10-28): hero headline, availability line and impact strip; explorable diagram (hover, tap, arrows, "Trace a request"); About with a cut-out portrait and new facts; Experience as scope, three outcomes and "More detail"; Projects as a CyberShield case file plus an expandable index; Skills became a Stack matrix (Daily, Shipped, Exploring); Certifications and Education merged into Credentials, collapsed by provider; Contact as an inverse closing band.
- [ ] Re-run Lighthouse after the redesign (the last scores predate it).
- [x] **FrontServe AI leads** (2026-10-28): hero is founder-first (Founder & CEO, FrontServe AI, with the Wizard AI role and availability underneath), "Try the FrontServe demo" CTA, a FrontServe architecture figure with "Trace an order", FrontServe-first impact strip, About, Experience and Projects. CyberShield keeps its explorable figure (Fig. 3) inside its case file. Diagrams moved to `src/data/diagrams/` with a shared `defineDiagram()`.
- [ ] FrontServe traction: once pilots start, swap the hero strip's product facts for real numbers (stores, orders, languages served).
- [ ] View Transitions for future multi-page routes (`<ViewTransition>`; check the Next 16 docs).

## 5. Performance / SEO

- [x] Lighthouse: mobile 96/100/96/100, desktop 100/100/96/100. Fixed a 0.17 layout shift (hero name rewrapping when Archivo replaced the fallback) and removed the unused IBM Plex Mono. Best practices sits at 96 locally only because the Vercel analytics scripts 404 off-Vercel.
- [x] `alternates.canonical` added to the metadata.
- [x] JSON-LD is built from `portfolio.ts`: jobTitle, description, image, worksFor, alumniOf, knowsAbout, knowsLanguage.
- [ ] Generate the resume PDF's metadata/title, or link a web resume page.

## Decisions

- Canonical domain is `me.frontserveai.com` (changed from `me.mandn.shop`). Updated in `siteConfig.url`, `package.json`, and the README. Make sure the Vercel project has the new domain, and consider a redirect from the old one.
- The phone number stays public on the site.
