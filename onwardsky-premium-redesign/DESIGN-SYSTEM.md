# Design system — “The Enroute Chart”

The redesign treats the homepage as an aeronautical enroute chart: cool chart paper ruled with a faint
graticule, a deep night-chart field where the airline network lives, and condensed chart lettering for
names, codes and prices. The booking console is the instrument on that chart.

All values below are live CSS custom properties in `assets/css/styles.css` (`:root`). The same system
is recorded in machine-readable form in `../DESIGN.md` (token frontmatter) and `../.impeccable/design.json`.

---

## 1. Color

The brand palette was refined, not replaced: the CTA orange is exactly the production value, and the
teals are the production accent and deep tones with a deeper ink for crisper type.

| Token | Hex | Role |
| --- | --- | --- |
| `--c-cta` | `#C94300` | The one hot color: primary action, plotted route, one proof mark per illustration |
| `--c-cta-hover` / `--c-cta-active` | `#B33C00` / `#9C3200` | Hover / pressed (production values) |
| `--c-teal` | `#156970` | Links, icons, focus ring, rating stars (production `accent`) |
| `--c-teal-deep` | `#0F555B` | Selected segment, identifier boxes, illustration fills (production `deep`) |
| `--c-night` | `#0B363C` | Night-chart field under the console and the closing band |
| `--c-sky` / `--c-sky-soft` | `#2FB0C6` / `#8FD3DF` | Airways, graticule and identifiers on night (logo sky) |
| `--c-mist` | `#B8D3D2` | Secondary text on night |
| `--c-ink` | `#0B2B30` | Headlines and primary text |
| `--c-ink-2` / `--c-ink-3` | `#2E474B` / `#4F676B` | Reading text / meta |
| `--c-paper` / `--c-paper-2` / `--c-paper-3` | `#F4F8F7` / `#EAF2F1` / `#DDEBEA` | Chart-paper grounds and tints |
| `--c-rule` | `#D5E3E2` | Decorative hairlines only |
| `--c-field-line` | `#7E979A` | Every control boundary (3.1:1 on white) |
| `--c-error` / `--c-error-bg` | `#B3261E` / `#FDF1EF` | Validation |
| `--c-ok` / `--c-ok-bg` | `#17684A` / `#EAF5F0` | “Search ready” confirmation |

**Rules**
- **One hot color.** Orange marks what happens next (the action, the route, the proof) and nothing else.
- **Boundary rule.** Controls use `--c-field-line`; hairlines never form the only edge of something you operate.

**Measured contrast (WCAG 2.1):** ink on paper 14.0:1 · ink-2 on paper 9.3:1 · ink-3 on paper 5.6:1 ·
white on CTA 4.9:1 · teal on white 6.4:1 · white on night 13.1:1 · mist on night 8.3:1 ·
sky on night 5.1:1 · placeholder on white 4.95:1 · error on white 6.5:1.

## 2. Typography

| Role | Face | Size | Weight · width · leading |
| --- | --- | --- | --- |
| Display (hero h1) | Archivo | `clamp(2.6rem, 1.05rem + 5.1vw, 5.75rem)` → 90px at 1440 | 780 · 74% · 0.93 |
| Headline (h2) | Archivo | `clamp(2.125rem, 1.45rem + 2.1vw, 3.5rem)` → 53px at 1440 | 760 · 76% · 1.0 |
| Title (h3) | Archivo | `clamp(1.3125rem, 1.15rem + 0.45vw, 1.5rem)` | 740 · 80% · 1.12 |
| Identifier (codes, fare) | Archivo | 1.875rem (30px) | 780 · 76% · tabular lining numerals |
| Lead | Figtree | `clamp(1.0625rem, 0.98rem + 0.3vw, 1.1875rem)` | 400 · 1.55 · max 46ch |
| Body | Figtree | 1rem | 400 · 1.6 · max 34–48ch in columns |
| Label | Figtree | 0.8125rem | 650 · sentence case |

- **Archivo** (variable, width 62–125%) is the chart lettering: names, codes, prices, headings.
- **Figtree** (the existing brand face) carries every sentence and control, for continuity with the live site.
- Hero lines break on meaning: “Get a verifiable / onward ticket / in 2 minutes.”
- Sentence case everywhere. Identifiers (DEL, BA) are the only run-together capitals. There are no eyebrow labels.
- Both fonts are self-hosted WOFF2 (Archivo 90 KB, Figtree 20 KB + 10 KB latin-ext) with `font-display: swap`.

## 3. Space, grid and layout

- **Spacing scale (4px base):** 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 (`--s-2` … `--s-10`).
- **Section rhythm:** `clamp(64px, 7.2vw, 112px)` top and bottom.
- **Container:** 1240px max; side gutter `clamp(16px, 4.2vw, 56px)` (respects notch safe areas); 12 columns, 16–24px gaps.
- **Hero:** headline over 7 columns, promise + proof + rating over 5, bottom-aligned (6/6 from 1024–1199px; stacked below 1024px).
- **Console overlap:** the console reaches `--overlap` (112px desktop, 96px tablet, 0 on phones) into the night field.
- **Breakpoints:** phone < 768 · tablet 768–1023 · laptop 1024–1199 · desktop ≥ 1200. The header collapses to a menu below 1080px.

## 4. Shape and depth

| Token | Value | Used on |
| --- | --- | --- |
| `--r-chip` | 6px | Identifier boxes, payment chips |
| `--r-control` | 12px | Fields, buttons, route group |
| (submit) | 14px | Console submit button |
| `--r-panel` | 20px | Featured review panel |
| `--r-console` | 24px | Booking console |

Only things you operate float. Shadows always carry an offset and a soft blur tinted from ink or orange:
- `--sh-console`: the booking console
- `--sh-pop`: the suggestions list
- `--sh-cta` / `--sh-cta-hover`: primary buttons

## 5. Components

**Header.** White, sticky, hairline bottom border, with a soft shadow once scrolled. Logo, five links,
“WhatsApp support” and the orange CTA. Below 1080px the links collapse into a 44px menu button that
opens a full-width panel; Escape closes it and returns focus to the button.

**Booking console (signature).**
- **Trip type:** a segmented control built on real radio buttons; the selected segment is deep teal.
- **Fare:** “From **$9.99**” in identifier type with “Delivered in 2 minutes”, top-right, directly above the action column.
- **Route group:** From and To share one bordered unit with a 44px circular swap control on the divider.
  - A chosen airport turns the field into an identifier: code, city and country.
  - With both ends set, an orange route line draws through the swap control (760ms ease-out).
  - On phones the fields stack with a dashed vertical route line (ring → dot) that turns solid orange.
- **Date fields:** native date inputs (mobile-friendly pickers); the whole cell opens the picker. The minimum date is enforced.
- **Passengers:** native select (1–5) with a drawn chevron.
- **Submit:** 68px orange button aligned to the field row; full width on phones.
- **Multi-city:** labelled “Flight N” rows (2–6), each with its own remove control, plus a dashed “Add another flight” control.
- **Assurances row:** Secure checkout, Delivered straight to your email, and payment marks set as neutral text chips.

**Suggestions list.** Popover with a 6px inner rail and a 16px radius. Each row is an identifier box plus
city and country, with the first match pre-highlighted. The active row is tinted, with its identifier filled.
When nothing matches, an explicit “No airports found” row gives a hint.

**Fields.**
- **Rest:** label above, value below, `--c-field-line` border.
- **Hover:** a darker border.
- **Focus:** teal border, inner ring and a 5px teal halo.
- **Error:** error border, error wash and a red label, with the message inside the cell.

**Buttons.**
- **Primary:** orange, 700 weight. Hover is darker with a longer shadow; press sinks 1px. Focus shows a 2px ink outline offset by 3px.
- **Quiet:** white with a control-line border.

**Night band.**
- On phones it carries the three proof points first.
- “Onward Sky™ works with 100+ airlines” sits over a grid of identifier-boxed airlines (5 / 3 / 2 columns), with a sky graticule and two faint cyan airways behind.

**Reviews.**
- An editorial layout: a sticky intro column, then one featured review on a paper panel.
- Two supporting reviews divided by a hairline (not three identical cards).
- Stars are drawn SVG; the TrustScore disclosure stays as a footnote.

**Journey line (signature).**
- Four checkpoints — Visa → Check-in → Take-off → Arrival — share one continuous line.
- The line starts as a hairline ground, becomes an orange climb from the Take-off marker, cruises level across the gap, and descends to the Arrival marker.
- Titles, bodies and personas align across columns via CSS subgrid.
- Illustrations are hand-authored SVG: deep-teal outline, chart tint, one orange proof mark each.

## 6. Icons and illustration

- One authored icon family on a 24px grid, 1.75px round strokes. Defined once as an inline SVG sprite: chat, menu, close, verify, expire, support, swap, clock, lock, mail, plus, alert, check, external, user, plane, star.
- No icon fonts, emoji or Unicode glyphs as icons.
- Illustrations are inline SVG (≈1–2 KB each) and decorative (`aria-hidden`).

## 7. Motion

| Moment | Trigger | Spec |
| --- | --- | --- |
| Graticule plots itself (the one authored load moment) | Page load | 1.7s draw per line, 55ms stagger |
| Route line draws | Both airports chosen | `--d-draw` 760ms, `--ease-out` |
| Swap icon turns | Press | 360ms rotation |
| Flight row appears | Add flight | 360ms fade + 6px rise |
| Sticky fare bar | Console leaves viewport (phones/tablets) | 360ms slide |
| Hover / focus | Pointer / keyboard | 120–200ms, color and shadow only |

`--ease-out` is `cubic-bezier(0.16, 0.84, 0.24, 1)`. Under `prefers-reduced-motion: reduce`, every animation
and transition collapses to its final state, and scroll-to-form jumps instead of gliding.

## 8. Accessibility built in

- Semantic landmarks, a skip link, a logical heading outline (one h1), and a labelled form with a radio group and comboboxes.
- WAI-ARIA 1.2 combobox: `aria-expanded`, `aria-activedescendant`, a listbox with options, keyboard ↑ ↓ Enter Esc, and announced result counts.
- Errors are linked with `aria-describedby`, marked `aria-invalid`, focus the first error, and announce through a polite live region.
- Targets are ≥ 44px. Focus is visible on every stop. Sticky UI never hides the focused control (`scroll-padding`).
- `color-scheme: light`, `translate="no"` on codes and the brand, and safe-area-aware gutters.
