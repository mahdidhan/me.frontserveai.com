# Design System

The current visual language of the portfolio. Keep new UI consistent with it. When modernizing, change it here first and then migrate components.

## Theme

Dark only. A near-black canvas with translucent white surfaces, and a **violet → cyan** accent gradient.

### Color tokens (`src/app/globals.css`)

| Token | Value | Tailwind utility | Used for |
|---|---|---|---|
| `--background` | `#0a0a0f` | `bg-background` | Page canvas |
| `--foreground` | `#f4f4f5` | `text-foreground` | Body text |
| `--surface` | `#12121a` | `bg-surface` | Cards |
| `--surface-elevated` | `#1a1a24` | `bg-surface-elevated` | Raised surfaces |
| `--muted` | `#a1a1aa` | `text-muted` | Secondary text |
| `--accent-violet` | `#8b5cf6` | (violet-500) | Focus outline, accents |
| `--accent-cyan` | `#22d3ee` | (cyan-400) | Gradient end |

> **Known drift:** components mostly use raw hex arbitrary values instead of the tokens. These include `bg-[#0a0a0f]`, `bg-[#12121a]/80`, `bg-[#0c0c14]/50` (band sections), `bg-[#101018]/85` (cert groups), `bg-[#08080d]` (footer), and `ring-offset-[#0a0a0f]`. Prefer tokens in new code. Add tokens for `#0c0c14`, `#101018`, and `#08080d` before migrating. See ROADMAP.

### Text hierarchy

- Headings: `text-white`
- Body / descriptions: `text-zinc-400`
- Meta (dates, locations, labels): `text-zinc-500`
- Faint (credential IDs): `text-zinc-600`
- Accent text (company, role, eyebrow): `text-violet-300` / `text-violet-400`

### Borders & surfaces

- Default border: `border-white/10`; subtle dividers: `border-white/5`
- Glass fill: `bg-white/5`, with `bg-white/10` on hover
- Hover accent border: `hover:border-violet-400/30` (or `/20` or `/40`)
- Card: `rounded-2xl border border-white/10 bg-[#12121a]/80 p-6 backdrop-blur-sm`

### Gradients

- Primary accent: `bg-gradient-to-r from-violet-600 to-cyan-500` (buttons), `from-violet-500 to-cyan-400` (bars, lines)
- Gradient text: `bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent`
- Ambient glows: large `blur-3xl` circles at `violet-500/10` and `cyan-500/10`, plus a top radial violet wash (Hero)

## Typography

- Sans: **Inter** (`--font-inter` → `font-sans`)
- Mono: **JetBrains Mono** (`--font-jetbrains-mono` → `font-mono`). Used for eyebrows, dates, the logo, and IDs.
- Both are loaded via `next/font/google` in `layout.tsx`.
- Eyebrow: `font-mono text-sm uppercase tracking-widest text-violet-400`
- Section title: `text-3xl sm:text-4xl font-bold tracking-tight text-white`
- Hero H1: `text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight`

## Layout & spacing

- Container: `mx-auto max-w-6xl px-6 lg:px-8`
- Section rhythm: `py-24`. Alternate sections use the band style `border-y border-white/5 bg-[#0c0c14]/50`. The current order is: Hero, About, **Skills (band)**, Experience, **Projects (band)**, Certifications, **Education (band)**, Languages, Contact.
- SectionHeading has `mb-12 max-w-2xl` and a `h-1 w-16` gradient underline bar.
- Grids: `gap-4` or `gap-6`. Responsive with `sm:grid-cols-2`, `lg:grid-cols-3` or `lg:grid-cols-4`.
- Radius: `rounded-lg` (icon chips, badges), `rounded-xl` (buttons), `rounded-2xl` (cards), `rounded-full` (pills)
- The Navbar is `fixed` with a height of about 72px. The Hero offsets it with `pt-24`. The scroll-spy offset is 120px.

## Components (`src/components/ui`)

| Component | Notes |
|---|---|
| `Button` | Variants `primary` (gradient), `secondary` (glass), `ghost`. Sizes `sm`/`md`/`lg`. Renders `<a>` when `href` is set. |
| `Badge` | Glass chip for tech/skills, with a violet hover. |
| `Card` | Glass surface. `hover` (default true) adds lift + violet glow. |
| `SectionHeading` | eyebrow + h2 + gradient bar + description. **Pass `id`** for `aria-labelledby`. |
| `Timeline` / `TimelineItem` | Vertical gradient line + glowing violet dot. |
| `MotionWrapper` | Fade-up on enter (`y: 24`, 0.5s, once). Accepts `delay`. |
| `StaggerContainer` / `StaggerItem` | Staggered children (0.08s). |
| `SocialIcons` | `GitHubIcon`, `LinkedInIcon` inline SVGs. |

Icon chip pattern: `<div className="rounded-lg bg-violet-500/10 p-2"><Icon className="h-5 w-5 text-violet-400" aria-hidden /></div>`

## Motion

- Easing: `[0.21, 0.47, 0.32, 0.98]`. Entrance: opacity 0→1, y 24→0 (or 20 for stagger items).
- `viewport={{ once: true, margin: "-50px" }}`
- Hover transitions: `transition-all duration-300`, with a card lift of `-translate-y-1`
- Reduced motion: wrappers render plain `div`s, and global CSS clamps animation and transition durations.

## Accessibility baseline

- Global `:focus-visible` violet outline. Buttons add `ring-violet-400` with an offset.
- `::selection` is violet at 35%.
- Every section has `id` and `aria-labelledby`. Decorative elements are `aria-hidden`.
- Contrast: `zinc-400` on `#0a0a0f` passes AA for body text. Avoid `zinc-600` for anything a reader needs.
