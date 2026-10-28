# Design System: "Drafting film"

The portfolio of a software architect should look like it was drawn by one: a technical document on cool drafting paper, with one real system diagram as the centerpiece. Everything else stays quiet so that the diagram and the content carry the page.

## Principles

1. **One bold element.** The hero's architecture diagram (`ArchitectureDiagram`) is the memorable thing, and it's built from real project content. Don't add competing decoration such as glows, gradients, blobs, or background effects.
2. **Structure carries information.** Hairline rules separate rows and sections. A sticky title rail labels each section. A timeline appears only where the content is a sequence (Experience). Don't add borders, numbers, or labels that encode nothing.
3. **Lists, not cards.** Content is set as rows, definition lists, and plain text. Avoid grids of identical rounded boxes.
4. **One orchestrated motion.** The diagram draws itself once on load. There are no scroll reveals or hover lifts. Motion that responds to the user (menu, copy confirmation) is fine.
5. **Plain, specific copy.** Sentence case, first person where it's Mahdi speaking, and buttons named for what they do ("See projects", "Download résumé", "Copy email").

## Color tokens (`src/app/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#f3f5f4` | `#0e141b` | Page background |
| `paper-raised` | `#fbfcfc` | `#131b24` | Diagram node fill |
| `ink` | `#16202b` | `#e6ebef` | Primary text, primary button fill, node outlines |
| `graphite` | `#5b6672` | `#93a0ac` | Secondary text, meta, diagram edges |
| `rule` | `#d3d9dd` | `#26313c` | Hairlines, dividers, list markers |
| `cobalt` | `#1f4fd1` | `#7fa2ff` | **Interactive only:** links, active nav, current-role dot, focus ring, diagram focal node |
| `cobalt-ink` | `#ffffff` | `#0e141b` | Text on cobalt |
| `grid-dot` | `#c9d0d5` | `#223040` | Dot grid behind the hero figure (`.dot-grid`) |
| `status` | `#2f8f5b` | `#5cc48a` | Success confirmation ("Copied") |

Dark mode follows `prefers-color-scheme`. There is no manual toggle yet (see ROADMAP). Never use raw hex values or Tailwind palette colors (`zinc-*`, `violet-*`) in components. Add a token instead. `opengraph-image.tsx` is the exception, because `next/og` can't read CSS variables, so it mirrors the light values by hand.

Both themes pass WCAG AA for body text. In light mode, `graphite` on `paper` is 5.3:1, `cobalt` on `paper` is 6.2:1, and text on `cobalt` is 6.8:1. In dark mode the same pairs are 6.9:1, 7.5:1, and 7.5:1.

## Typography

One family, **Archivo** (variable `wght` 100–900 and `wdth` 62–125). Width is the expressive axis. Fallback fonts can't do width, so keep above-the-fold wide text from wrapping differently in the fallback (the hero name is forced to one word per line):

| Role | Classes |
|---|---|
| Hero name | `text-[clamp(3.25rem,9vw,6rem)] font-bold leading-[0.95] tracking-[-0.02em] font-stretch-125%` |
| Hero statement | `text-xl sm:text-2xl leading-snug max-w-[30ch]` |
| Section title (h2) | `text-2xl font-semibold tracking-tight font-stretch-118%` |
| Item title (h3) | `text-xl font-semibold font-stretch-112%` |
| Sub-item (h4) | `text-lg font-semibold` |
| Body | base 17px / 1.6 (`body` in globals.css), measure `max-w-[65ch]` |
| Meta | `text-sm text-graphite` |

Rules: no all-caps labels, no eyebrow text above headings, no highlighting a single word in a headline, and no middle-dot (`·`) separated meta strings. Use commas or sentences.

## Layout

- Container: `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8`. Grids that hold wide content use `grid-cols-1` or `minmax(0,1fr)` so children can shrink. Otherwise the page scrolls sideways on phones.
- **`Section`** (`components/ui/Section.tsx`): `border-t border-rule`, `py-16 lg:py-24`, and a two-column grid `lg:grid-cols-[13rem_minmax(0,1fr)]`. The left rail holds a sticky `h2` and an optional `aside`.
- Row lists: `divide-y divide-rule border-y border-rule`, rows `py-3`–`py-8`.
- Label/value pairs: `<dl>`, with `dt` in `text-sm text-graphite` and `dd` in ink.
- Radius: `rounded-md` for buttons, the photo, and the figure frame (`rounded-lg`). Nothing is pill-shaped except the timeline dots.
- Fixed header is `h-16`. `scroll-padding-top: 5rem` keeps anchors clear of it.

Section order: Hero, About, Experience, Projects, Skills, Certifications, Education and languages, Contact.

## Components

| Component | Notes |
|---|---|
| `Section` | Section shell described above. Always use it for new sections. |
| `Button` | `primary` (ink fill, turns cobalt on hover) or `secondary` (outlined). Sizes `md`/`lg`. Renders `<a>` when `href` is set, and forwards all props. |
| `ArchitectureDiagram` | Server-rendered SVG from `src/data/architecture.ts` (viewBox 680×530). Dashed `groups` are zones (Signals, Kubernetes, Data, Shared Azure services); `nodes` may omit `detail`; `edges` can be `bidirectional`. Edge labels have a paper-colored halo (`paint-order: stroke`) so they stay legible over borders. The emphasis node is cobalt. On phones it keeps `min-w-[34rem]` and scrolls inside its frame. |
| Text links | `text-cobalt underline-offset-4 hover:underline`, or for quiet links `underline decoration-rule hover:text-cobalt hover:decoration-cobalt`. |

## Motion

- The diagram draw-in: zones appear (80ms stagger), then nodes fade and rise in (55ms stagger), then edges draw via `stroke-dashoffset` on `pathLength=1` (120ms stagger), then arrowheads and labels appear. The total is about 2.5s.
- It's defined only inside `@media (prefers-reduced-motion: no-preference)`, so reduced-motion users see the finished drawing. Follow the same pattern for any new animation.
- Interaction transitions: `transition-colors duration-150`. Don't add transforms on hover.

## Accessibility baseline

- Skip link to `#main`. Every section is labelled via `Section`. `aria-current="location"` marks the active nav link.
- The diagram has `role="img"` plus `<title>` and `<desc>` that describe the data flow in prose.
- The mobile menu closes on Escape and returns focus to the toggle. The copy-email action announces itself through a `role="status"` live region.
- Focus ring: 2px cobalt outline with an offset (`:focus-visible` in globals.css).
