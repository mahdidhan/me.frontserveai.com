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
- [ ] Add Prettier (+ `prettier-plugin-tailwindcss`). This will reformat most files, so do it as its own commit.
- [x] `typecheck` script plus GitHub Actions CI (lint, typecheck, build on push and PR).
- [ ] `@types/node` is `^20`, which is fine. Consider bumping it to match the Node version Vercel uses.

## 3. Features / enhancements

- [x] Project `github` and `demo` links render when present ("Open live site", "View source"). None are filled in yet: add URLs in `portfolio.ts`.
- [ ] Project screenshots or a small diagram per project. A case-study page could reuse `ArchitectureDiagram` with its own data.
- [ ] `featured` flag is still unused (all four projects are featured). Use it if non-featured projects are added.
- [ ] Manual light/dark toggle. Tokens already switch via `prefers-color-scheme`; add `[data-theme]` overrides and a toggle that persists to `localStorage`.
- [ ] Contact form (Server Action + Resend/email service), or a "book a call" link.
- [ ] Blog / writing section using MDX for architecture and AI articles. This needs routes beyond the single page.
- [ ] Case-study pages per project (`app/projects/[slug]/page.tsx`). Remember that `params` is async in Next 16.
- [ ] Analytics: `@vercel/analytics` and `@vercel/speed-insights`.
- [ ] i18n: Arabic version with RTL (Mahdi lists Arabic as a language). Archivo has no Arabic glyphs, so pair it with an Arabic family.
- [ ] Testimonials / recommendations section.

## 4. Modernization (visual)

- [x] **Redesign to "drafting film"** (see DESIGN-SYSTEM.md): cool paper and ink palette with a dark version, Archivo with its width axis, spec-sheet section layout, and a hero architecture diagram that draws itself once. This replaced the violet/cyan glass-card look.
- [x] Removed framer-motion and all scroll-reveal animations.
- [x] Experience grouped by company, so promotions read as one story.
- [x] 404 and share image restyled to match.
- [x] Hero diagram redrawn as CyberShield from Mahdi's description: Entra ID single sign-on, NGINX ingress, gRPC services with Helm, Sentinel/Defender/Graph mail signals, Azure SQL and Cosmos DB (plus graph), Service Bus (RabbitMQ locally) with Logic Apps, and Container Registry, Key Vault, Storage and Notification Hubs.
- [x] Projects section renamed to CyberShield to match the experience and the diagram.
- [ ] Phone-width diagram: it currently scrolls horizontally inside its frame. Consider a vertical layout variant below `sm`.
- [ ] Load Archivo into `opengraph-image.tsx` (a TTF via `readFile`) so the share card uses the site's typeface.
- [ ] View Transitions for future multi-page routes (`<ViewTransition>`; check the Next 16 docs).

## 5. Performance / SEO

- [ ] Verify Lighthouse ≥ 95 on all categories. framer-motion is gone, so Navbar and Contact are the only client JS.
- [x] `alternates.canonical` added to the metadata.
- [ ] Enrich JSON-LD (`knowsAbout`, `alumniOf`, `worksFor`) from `portfolio.ts` instead of duplicating it.
- [ ] Generate the resume PDF's metadata/title, or link a web resume page.

## Decisions

- Canonical domain is `me.frontserveai.com` (changed from `me.mandn.shop`). Updated in `siteConfig.url`, `package.json`, and the README. Make sure the Vercel project has the new domain, and consider a redirect from the old one.
- The phone number stays public on the site.
