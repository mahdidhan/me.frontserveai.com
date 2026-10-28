# Roadmap & Known Issues

A living backlog for enhancing and modernizing the portfolio. Mark items `[x]` when done and add new findings as you go. Items are roughly ordered by value and effort within each group.

## 1. Bugs / correctness

- [ ] **Broken `aria-labelledby`**: About, Skills, Experience, Projects, Education, Languages, and Contact set `aria-labelledby="<x>-heading"` but don't pass `id` to `SectionHeading`. Only Certifications does it right. Fix: pass `id="<x>-heading"` in each.
- [x] ~~README Node version~~ (now 20.9+), domain updated.
- [ ] README project structure omits the Certifications section and `docs/`.
- [ ] **`Button` with `href`** silently drops `ref` and the rest of `...props` (e.g. `download`, `target`, `aria-*`). It should forward them, or the `href` case should be split into a link component (use `next/link` for internal routes).
- [ ] **Inconsistent `rel`**: cert "Verify" links use `rel="noreferrer"`, while the rest use `rel="noopener noreferrer"`.
- [ ] **`sitemap.ts`** uses `lastModified: new Date()`, which changes on every build. Use a fixed or content-derived date.
- [ ] **OG image**: `profile.png` is declared as 800×800 with `summary_large_image`. Add a proper 1200×630 image (e.g. `app/opengraph-image.tsx` with `next/og`).

## 2. Code health / tech debt

- [ ] Replace hard-coded hex colors (`#0a0a0f`, `#12121a`, `#0c0c14`, `#101018`, `#08080d`) with `@theme` tokens (see DESIGN-SYSTEM.md).
- [ ] Move `certificationGroups`, brand marks, and provider pills out of `Certifications.tsx` into `src/data/portfolio.ts` (e.g. a `certificationProviders` array with accent, logo, and summary). Derive group dates and counts from the data.
- [ ] `Hero.tsx` doesn't need `"use client"` (no hooks; `MotionWrapper` is already a client component). Make it a Server Component.
- [ ] `Navbar` scroll-spy loops over `offsetTop` on every scroll event. Replace it with an `IntersectionObserver`. Also add Escape-to-close and focus handling to the mobile menu.
- [ ] Drop `forwardRef` in `Button` (with React 19, `ref` is a prop).
- [ ] Remove unused create-next-app assets: `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`.
- [ ] React list keys use text slices (`highlight.slice(0, 50)`). That's fine for static content, but index-plus-content would be safer.
- [ ] Tailwind v4 naming: consider migrating `bg-gradient-to-*` to `bg-linear-to-*` and `flex-shrink-0` to `shrink-0` for consistency.
- [ ] Add Prettier (+ `prettier-plugin-tailwindcss`) and a `typecheck` script (`tsc --noEmit`).
- [ ] Add GitHub Actions CI: install, lint, typecheck, build.
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
