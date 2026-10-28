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

- [ ] **Project detail and links**: `Project` has optional `github` and `demo` fields, but `Projects.tsx` never renders them. Add link buttons and optional images or screenshots.
- [ ] **Featured projects**: the `featured` flag exists but isn't used. Highlight featured projects (e.g. a larger card).
- [ ] Light/dark theme toggle (CSS variables are already in place; add a light palette under `[data-theme="light"]`).
- [ ] Contact form (Server Action + Resend/email service), or a "book a call" link.
- [ ] Blog / writing section using MDX for architecture and AI articles. This needs routes beyond the single page.
- [ ] Case-study pages per project (`app/projects/[slug]/page.tsx`). Remember that `params` is async in Next 16.
- [ ] Analytics: `@vercel/analytics` and `@vercel/speed-insights`.
- [ ] Command palette / keyboard nav (⌘K) to jump between sections.
- [ ] i18n: Arabic version with RTL (Mahdi lists Arabic as a language).
- [ ] Testimonials / recommendations section.

## 4. Modernization (visual)

- [ ] Refresh the hero: animated gradient mesh or subtle grid/noise background, availability status pill ("Open to opportunities"), typed/rotating role line.
- [ ] Bento-grid layout for About stats and Skills instead of uniform cards.
- [ ] Skill icons/logos (e.g. Simple Icons) and grouping by proficiency.
- [ ] Interactive experience timeline (expand/collapse highlights, company logos).
- [ ] View Transitions API for smooth section and route transitions (React 19.2 / Next 16 support `<ViewTransition>`; check the docs).
- [ ] Scroll-progress bar and a more refined sticky nav (pill indicator that slides to the active item using `layoutId`).
- [ ] Custom 404 page with personality, matching the hero.

## 5. Performance / SEO

- [ ] Verify Lighthouse ≥ 95 on all categories. Check that framer-motion isn't bloating the initial JS (consider `LazyMotion` + `m` components).
- [ ] Add `alternates.canonical` to the metadata.
- [ ] Enrich JSON-LD (`knowsAbout`, `alumniOf`, `worksFor`) from `portfolio.ts` instead of duplicating it.
- [ ] Generate the resume PDF's metadata/title, or link a web resume page.

## Decisions

- Canonical domain is `me.frontserveai.com` (changed from `me.mandn.shop`). Updated in `siteConfig.url`, `package.json`, and the README. Make sure the Vercel project has the new domain, and consider a redirect from the old one.
- The phone number stays public on the site.
