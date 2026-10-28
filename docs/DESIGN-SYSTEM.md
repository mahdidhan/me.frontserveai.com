# Design System: "Drafting film"

The portfolio of a software architect should look like it was drawn by one: a technical document on cool drafting paper, with one real system diagram as the centerpiece. Everything else stays quiet so that the diagram and the content carry the page.

## Principles

1. **One bold element.** The hero's architecture diagram (`ArchitectureDiagram`, made explorable by `DiagramExplorer`) is the memorable thing, and it's built from real project content. Don't add competing decoration such as glows, gradients, blobs, or background effects.
2. **Structure carries information.** Hairline rules separate rows and sections. A sticky title rail labels each section. A timeline appears only where the content is a sequence (Experience). Big numerals are reserved for real results (the hero impact strip, Experience outcomes). Don't add borders, numbers, or labels that encode nothing.
3. **Lists, not cards.** Content is set as rows, definition lists, and plain text. Avoid grids of identical rounded boxes.
4. **One orchestrated motion.** The diagram draws itself once on load. There are no scroll reveals or hover lifts. Motion that responds to the user (menu, copy confirmation, diagram highlighting, the trace pulse) is fine. Lower figures render with `animate={false}`.
5. **Proof before detail.** Lead with the strongest evidence (numbers, outcomes, the case file) and put the rest behind `<details>`. A visitor skimming for six seconds should leave with the role, the scale and the results.
6. **Plain, specific copy.** Sentence case, first person where it's Mahdi speaking, and buttons named for what they do ("See projects", "Download résumé", "Copy email").

## Color tokens (`src/app/globals.css`)

| Token           | Light     | Dark      | Use                                                                                       |
| --------------- | --------- | --------- | ----------------------------------------------------------------------------------------- |
| `paper`         | `#f3f5f4` | `#0e141b` | Page background                                                                           |
| `paper-raised`  | `#fbfcfc` | `#131b24` | Diagram node fill, figure boards, explorer panel, command menu                            |
| `paper-band`    | `#e9edec` | `#111922` | `Section band` background (About, Projects), to vary the page rhythm                      |
| `ink`           | `#16202b` | `#e6ebef` | Primary text, primary button fill, node outlines                                          |
| `graphite`      | `#5b6672` | `#93a0ac` | Secondary text, meta, diagram edges                                                       |
| `rule`          | `#d3d9dd` | `#26313c` | Hairlines, dividers, list markers                                                         |
| `cobalt`        | `#1f4fd1` | `#7fa2ff` | **Interactive only:** links, active nav, current-role dot, focus ring, diagram focal node |
| `cobalt-ink`    | `#ffffff` | `#0e141b` | Text on cobalt                                                                            |
| `cobalt-wash`   | `#e3eafb` | `#1a2640` | Selected diagram node, active command-menu row, current-role halo                         |
| `grid-dot`      | `#c9d0d5` | `#223040` | Dot grid behind the hero figure (`.dot-grid`)                                             |
| `status`        | `#2f8f5b` | `#5cc48a` | Success confirmation ("Copied"), the availability dot                                     |
| `inverse`       | `#16202b` | `#18222d` | Contact band and footer background                                                        |
| `inverse-ink`   | `#f3f5f4` | `#e6ebef` | Text and primary button on `inverse`                                                      |
| `inverse-muted` | `#a9b3bd` | `#93a0ac` | Secondary text on `inverse`                                                               |
| `inverse-rule`  | `#2e3a47` | `#2b3846` | Borders and underlines on `inverse`                                                       |

Dark mode follows `prefers-color-scheme` unless the visitor uses the toggle (navbar or command menu), which sets `data-theme` on `<html>` and is saved to `localStorage`. Each token is therefore defined three times in `globals.css` (light, OS dark, `[data-theme="dark"]`); change all three together. In components, use the custom `dark:` variant, which respects the toggle. Never use raw hex values or Tailwind palette colors (`zinc-*`, `violet-*`) in components. Add a token instead. `opengraph-image.tsx` is the exception, because `next/og` can't read CSS variables, so it mirrors the light values by hand. It uses static Archivo instances from `assets/fonts` (Expanded Bold for the name, Regular for the rest); regenerate them with fontTools' `varLib.instancer` + `subset` if new glyphs are needed.

Both themes pass WCAG AA for body text. In light mode, `graphite` on `paper` is 5.3:1, `cobalt` on `paper` is 6.2:1, and text on `cobalt` is 6.8:1. In dark mode the same pairs are 6.9:1, 7.5:1, and 7.5:1.

## Typography

One family, **Archivo** (variable `wght` 100–900 and `wdth` 62–125). Width is the expressive axis. Fallback fonts can't do width, so wide text that can wrap must not sit above the fold: the hero headline is normal width, and only short single-line text (the name, numerals) is wide:

| Role               | Classes                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Hero name          | `text-lg font-bold tracking-tight font-stretch-125%` (first line of the `h1`)                  |
| Hero headline      | `text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.04] font-bold tracking-[-0.025em]`, normal width |
| Big numeral        | `font-bold font-stretch-125% tabular-nums leading-none`, 1.65rem (outcomes) to 3.25rem (hero)  |
| Section title (h2) | `text-2xl font-semibold tracking-tight font-stretch-118%`                                      |
| Item title (h3)    | `text-xl font-semibold font-stretch-112%`                                                      |
| Sub-item (h4)      | `text-lg font-semibold`                                                                        |
| Body               | base 17px / 1.6 (`body` in globals.css), measure `max-w-[65ch]`                                |
| Meta               | `text-sm text-graphite`                                                                        |

Rules: no all-caps labels, no eyebrow text above headings, no highlighting a single word in a headline, and no middle-dot (`·`) separated meta strings. Use commas or sentences.

## Layout

- Container: `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8`. Grids that hold wide content use `grid-cols-1` or `minmax(0,1fr)` so children can shrink. Otherwise the page scrolls sideways on phones.
- **`Section`** (`components/ui/Section.tsx`): `border-t border-rule`, `py-14 lg:py-20`, and a two-column grid `lg:grid-cols-[10rem_minmax(0,1fr)]`. The left rail holds a sticky `h2` and an optional `meta` line. `band` switches the background to `paper-band`.
- Ruled columns (impact strip, outcomes, case file, stack): `grid` with `border-t border-ink` on top and `border-l border-rule` between columns, stacking with `border-t border-rule` on narrow screens.
- Tech labels: `rounded-sm border border-rule px-2 py-0.5 text-xs text-graphite`. These are the only small outlined labels; never fill them.
- Row lists: `divide-y divide-rule border-y border-rule`, rows `py-3`–`py-8`.
- Label/value pairs: `<dl>`, with `dt` in `text-sm text-graphite` and `dd` in ink.
- Radius: `rounded-md` for buttons, the photo, and the figure frame (`rounded-lg`). Nothing is pill-shaped except the timeline dots.
- Fixed header is `h-16`. `scroll-padding-top: 5rem` keeps anchors clear of it.

Section order: Hero (with impact strip), About (band), Experience, Projects (band: case file + index), Stack, Credentials (certificates, education, languages), Contact (inverse band).

## Components

| Component             | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Section`             | Section shell described above. Always use it for new sections.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Button`              | `primary` (ink fill, turns cobalt on hover) or `secondary` (outlined). Sizes `md`/`lg`. Renders `<a>` when `href` is set, and forwards all props.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ArchitectureDiagram` | Server-rendered SVG of a `diagram` from `src/data/diagrams/` (FrontServe AI in the hero, CyberShield in its case file), with a `layout` prop: `wide` (680×530, shown from `sm`) and `tall` (360 wide, phones, no horizontal scroll). Callers render both and toggle them with `hidden sm:block` / `sm:hidden`. `animate` (default true) enables the draw-in; only the hero uses it. Labels live once in `nodeContent`/`groupContent`/`edgeContent`; each layout only supplies geometry. Dashed `groups` are zones; `nodes` may omit `detail`; `edges` can be `bidirectional`. Edge labels have a paper-colored halo (`paint-order: stroke`) so they stay legible over borders. The emphasis node is cobalt. |
| `DiagramExplorer`     | Client wrapper around both layouts of one diagram; takes the diagram's `explorer` data. Hover (mouse) or tap a node to highlight it, its edges and its neighbours (`data-hot`, `data-selected`, `data-focus`, styled in globals.css); the panel below shows the node's `kind`, `note` and connections. The arrow buttons step through nodes for keyboard users. The trace button ("Trace an order" for FrontServe, "Trace a request" for CyberShield) pulses a cobalt dot along the diagram's `trace` steps; under reduced motion it steps through the path without moving anything.                                                                                                                        |
| `CommandPalette`      | Ctrl/⌘ K, or the navbar button. Native `<dialog>` (focus trap and Esc for free) with a combobox and listbox. Commands come from `siteConfig.navItems` plus copy email, résumé, theme and links.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `ThemeToggle`         | Icon button; the Moon/Sun icon is chosen with `dark:` so server and client markup match.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Text links            | `text-cobalt underline-offset-4 hover:underline`, or for quiet links `underline decoration-rule hover:text-cobalt hover:decoration-cobalt`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## Motion

- The diagram trace: a 5px cobalt dot travels each edge in 650ms, one edge after another. It only runs on click, and under reduced motion each step is held for 900ms instead.
- The diagram draw-in: zones appear (80ms stagger), then nodes fade and rise in (55ms stagger), then edges draw via `stroke-dashoffset` on `pathLength=1` (120ms stagger), then arrowheads and labels appear. The total is about 2.5s.
- It's defined only inside `@media (prefers-reduced-motion: no-preference)`, so reduced-motion users see the finished drawing. Follow the same pattern for any new animation.
- Interaction transitions: `transition-colors duration-150`. Don't add transforms on hover.

## Accessibility baseline

- Skip link to `#main`. Every section is labelled via `Section`. `aria-current="location"` marks the active nav link.
- The diagram has `role="img"` plus `<title>` and `<desc>` that describe the data flow in prose.
- The diagram explorer is also reachable by keyboard (previous/next buttons), and its panel is an `aria-live="polite"` region. The command menu is a modal `<dialog>` with `aria-activedescendant` on its combobox.
- The mobile menu closes on Escape and returns focus to the toggle. The copy-email action announces itself through a `role="status"` live region.
- Focus ring: 2px cobalt outline with an offset (`:focus-visible` in globals.css).
