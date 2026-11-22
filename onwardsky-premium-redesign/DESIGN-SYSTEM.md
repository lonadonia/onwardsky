# Design system — “The Daylight Terminal”

The redesign treats the homepage as a bright departure hall: pale teal daylight, a traveler on her phone with
luggage and a plane overhead, and a booking card that is the counter she steps up to. It keeps the brand's
friendly identity and adds weight where a premium service needs it: confident headlines, a deep teal card header,
real airline marks and illustration with a human in it.

All values below are live CSS custom properties in `assets/css/styles.css` (`:root`). The same system is recorded
in machine-readable form in `../DESIGN.md` (token frontmatter) and `../.impeccable/design.json`.

---

## 1. Color

The brand palette was refined, not replaced: the CTA orange is exactly the production value, and the teals are the
production accent and deep tones.

| Token | Hex | Role |
| --- | --- | --- |
| `--c-cta` | `#C94300` | The one hot color: actions and the plotted route connector |
| `--c-cta-hover` / `--c-cta-active` | `#B33C00` / `#9C3200` | Hover / pressed (production values) |
| `--c-teal` | `#156970` | Links, icons, stars, illustration accent (production `accent`) |
| `--c-teal-deep` | `#0F555B` | Card header, selected states, featured review (production `deep`) |
| `--c-night` | `#0B363C` | Airline band, scope strip |
| `--c-sky` / `--c-sky-soft` | `#2FB0C6` / `#8FD3DF` | Quote mark and stars on deep teal (logo sky) |
| `--c-mist` | `#B8D3D2` | Secondary text on night |
| `--c-ink` / `--c-ink-2` / `--c-ink-3` | `#0B2B30` / `#2E474B` / `#4F676B` | Headlines / reading text / meta |
| `--c-stage` / `--c-stage-2` | `#E3F2F3` / `#D0E9EC` | Hero ground and the halo behind the card |
| `--c-paper` | `#F3F9F9` | Section ground, quiet panels |
| `--c-rule` | `#D5E3E2` | Decorative hairlines only |
| `--c-field-line` | `#7E979A` | Every control boundary (3.1:1 on white) |
| `--tint-peach` / `-teal` / `-sky` / `-sand` | `#FBE5D4` / `#D6ECEF` / `#D9E9F6` / `#F5EADA` | One pastel stage per moment |
| `--c-error` / `--c-error-bg` | `#B3261E` / `#FDF1EF` | Validation |
| `--c-ok` / `--c-ok-bg` | `#17684A` / `#EAF5F0` | “Search ready” confirmation |

**Rules**
- **One hot color.** Orange marks what happens next (the action, the route) and nothing else.
- **Boundary rule.** Controls use `--c-field-line`; hairlines never form the only edge of something you operate.
- **Fetched art rule.** Illustration, icons, logos and maps are fetched and only recolored or cropped.

**Measured contrast (WCAG 2.1):** ink on stage 13.0:1 · ink-2 on stage 8.6:1 · ink-2 on the peach/sand stages 8.2–8.3:1 ·
ink-3 on white 6.0:1 · white on CTA 4.9:1 · white on deep teal 8.5:1 · sky-soft on deep teal 5.1:1 ·
white on night 13.1:1 · mist on night 8.3:1 · teal on white 6.4:1 · placeholder on white 4.95:1 · error on white 6.5:1.

## 2. Typography

| Role | Face | Size | Weight · leading |
| --- | --- | --- | --- |
| Display (hero h1) | Manrope | `clamp(2.5rem, 1.25rem + 3.75vw, 4.75rem)` → 74px at 1440 | 800 · 1.02 · -0.035em |
| Headline (h2) | Manrope | `clamp(2rem, 1.1rem + 2.6vw, 3.25rem)` → 52px | 800 · 1.05 · -0.03em |
| Title (h3) | Manrope | `clamp(1.25rem, 1.12rem + 0.4vw, 1.5rem)` | 800 · 1.15 |
| Price / airport code | Manrope | 2.125rem / 1.625rem, tabular lining numerals | 800 |
| Lead | Figtree | `clamp(1.0625rem, 0.98rem + 0.3vw, 1.25rem)` | 400 · 1.55 · max 22em |
| Body | Figtree | 1rem | 400 · 1.6 · max 34ch in columns |
| UI / label | Figtree | 1.0625rem / 0.8125rem | 650 / 600 · sentence case |

- **Manrope** (variable 200–800) names things and sets prices: headings, fare, airport codes.
- **Figtree** (the existing brand face) carries every sentence and control, for continuity with the live site.
- The hero breaks on meaning: “Get a verifiable / onward ticket / in 2 minutes.”
- Sentence case everywhere. No eyebrow labels.
- Both fonts are self-hosted WOFF2 (Manrope 24 KB, Figtree 20 KB + 10 KB latin-ext) with `font-display: swap`.

## 3. Space, grid and layout

- **Spacing scale (4px base):** 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 (`--s-2` … `--s-10`).
- **Section rhythm:** `clamp(64px, 7vw, 104px)` top and bottom.
- **Container:** 1240px max; side gutter `clamp(16px, 4.2vw, 56px)` (respects notch safe areas); 12 columns, 16–28px gaps.
- **Hero (≥1024px):** copy at the left, the 480px (440px below 1280) booking card at the right, the traveler between
  them standing on the band's top edge. Below 1024px the order is copy, card, traveler; proof points move into the band.
- **Breakpoints:** phone < 768 · tablet 768–1023 · laptop 1024–1279 · desktop ≥ 1280. The header collapses to a menu below 1080px.

## 4. Shape and depth

| Token | Value | Used on |
| --- | --- | --- |
| `--r-chip` | 8px | Tabs, chips, suggestions |
| (small button) | 12px | Header CTA, menu button, remove flight |
| `--r-control` | 14px | Fields, buttons, route group (13px for the fields inside it) |
| (menu) | 16px | Suggestions list |
| `--r-panel` | 24px | Supporting reviews |
| `--r-card` | 28px | Booking card, featured review, moment stages (22px for the card on phones) |

Only things you operate float. Shadows always carry an offset and a soft blur tinted from ink or orange:
`--sh-card` (booking card), `--sh-pop` (suggestions), `--sh-cta` / `--sh-cta-hover` (primary buttons).

## 5. Components

**Header.** White, sticky, hairline bottom border, soft shadow once scrolled. Logo, five links, “WhatsApp support” and
the orange CTA. Below 1080px the links collapse into a 44px menu button that opens a full-width panel; Escape closes
it and returns focus to the button.

**Booking card (signature).**
- **Header:** deep teal with the title and a segmented trip control built on real radio buttons (the selected tab is white). On phones the title is visually hidden (the form keeps its accessible name) to keep the CTA in the first viewport.
- **Route:** From over To in one bordered unit with a dashed vertical connector and a 44px swap control. Once both airports are set the connector and swap turn orange. A chosen airport shows its code (Manrope) with city and country, like a departure board.
- **Date and passengers:** native date input (the whole cell opens the picker; the minimum is enforced) and a native select with a drawn caret.
- **Fare:** “From **$9.99**” with “Delivered in 2 minutes”, directly above the 60px orange submit (full width, trailing arrow).
- **Return / multi-city:** return adds a return-date cell and moves passengers beside the fare; multi-city stacks labelled “Flight N” blocks (2–6) with From and To side by side, a remove control each and a dashed “Add another flight”.
- **Foot:** secure checkout and email delivery, plus payment marks (PayPal, Stripe, UPI, Visa, Mastercard) as quiet chips.

**Suggestions list.** Popover on a 16px radius. Each row is a code chip plus city and country, with the first match
pre-highlighted. When nothing matches, an explicit “No airports found” row gives a hint.

**Fields.** Rest: label above, value below, `--c-field-line` border. Hover: darker border. Focus: teal border, inner ring and a
5px teal halo. Error: error border, wash and red label, with the message inside the cell.

**Buttons.** Primary: orange, 700 weight; hover is darker with a longer shadow and the arrow nudges right; press sinks 1px;
focus shows a 2px ink outline offset by 3px. Quiet: white with a control-line border.

**Airline band.** Night teal; “Onward Sky™ works with 100+ airlines” and eight white marks sized for equal optical weight
(one row on desktop, wrapping on tablets, two columns on phones). Below 1024px it also carries the three proof points.

**Reviews.** An intro with the unDraw “reviews” illustration standing on the top edge of the grid; one featured quote on
deep teal (large quote mark, sky stars, avatar initials) and two supporting quotes on paper. The TrustScore disclosure stays as a footnote.

**Moments (signature).** Four pastel stages in the original order (check-in, arrival, visa, take-off), each with one
fetched illustration standing on the stage's bottom edge, a small white tag, then title, body and audience line.
Titles, bodies and audience lines align across columns via CSS subgrid. The fourth moment keeps the CTA.

## 6. Icons and illustration

- **Icons:** Phosphor (bold for controls, duotone for proof tiles, fill for stars and the quote mark), defined once as an inline SVG sprite. No emoji or Unicode glyphs as icons.
- **Illustration:** unDraw, recolored by a documented remap to brand teal, ink and a peach accent; decorative (`aria-hidden`). Below-the-fold art uses `loading="lazy"`.
- **Marks:** airline logos from Soaring Symbols and payment marks from Simple Icons, cropped to their bounds.
- Provenance, licenses and the recolor table: `assets/SOURCES.md`.

## 7. Motion

| Moment | Trigger | Spec |
| --- | --- | --- |
| Entrance (the one authored moment) | Page load | Copy lines, card and traveler rise 12px in sequence (640–900ms ease-out) |
| Connector turns orange | Both airports chosen | 360ms color transition |
| Swap icon turns | Press | 360ms rotation |
| Flight row appears | Add flight | 360ms fade + 6px rise |
| Sticky fare bar | Card leaves the viewport (phones/tablets) | 360ms slide |
| Hover / focus | Pointer / keyboard | 120–200ms, color and shadow only |

`--ease-out` is `cubic-bezier(0.16, 0.84, 0.24, 1)`. Under `prefers-reduced-motion: reduce`, every animation and
transition collapses to its final state, and scroll-to-form jumps instead of gliding.

## 8. Accessibility built in

- Semantic landmarks, a skip link, a logical heading outline (one h1), and a labelled form with a radio group and comboboxes.
- WAI-ARIA 1.2 combobox: `aria-expanded`, `aria-activedescendant`, a listbox with options, keyboard ↑ ↓ Enter Esc, and announced result counts.
- Errors are linked with `aria-describedby`, marked `aria-invalid`, focus the first error, and announce through a polite live region.
- Targets are ≥ 44px. Focus is visible on every stop. Sticky UI never hides the focused control (`scroll-padding`).
- `color-scheme: light`, `translate="no"` on codes and the brand, and safe-area-aware gutters.
