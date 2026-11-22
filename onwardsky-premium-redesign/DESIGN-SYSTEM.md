# Design system — “Boarding pass” (v3)

The page is drawn as one family of tickets. The hero is an inset panel, the three promises are a boarding-pass
strip with perforations, and the “Be ready” cards are the client's own ticket stubs. Colour, type and artwork
all come from the production site, so nothing reads as a different brand.

All values below are live CSS custom properties in `assets/css/styles.css` (`:root`). The same system is recorded in
machine-readable form in `../DESIGN.md` (token frontmatter) and `../.impeccable/design.json`.

---

## 1. Colour: every value is a production value

v2 was rejected because its colours were invented (near-matches such as `#0B2B30`, a blue-grey pastel, a sand tint,
a red error). v3 uses **only** the colours the production site already defines, under the same names:

- the **theme.json presets** of the production theme (`heading`, `accent`, `deep`, `surface`, `cta` …), and
- the **values its section styles resolve to** (airline strip, mint, peach …). The production CSS names some of these
  after blues (`--c-0B283D`, `--c-E4F5FB`), but the page remaps every one to a teal; the table lists what is painted.

| Token | Hex | Production name | Used for |
| --- | --- | --- | --- |
| `--heading` | `#0E2F34` | preset `heading` | Headlines, field values, dark review card |
| `--ink` | `#12262A` | preset `ink` | Base text colour |
| `--secondary` | `#33484B` | preset `secondary` | Body copy |
| `--muted` | `#4A6266` | preset `muted` | Labels, meta, stub labels |
| `--accent` | `#156970` | preset `accent` | “verifiable”, links, icons, focus, route dots |
| `--accent-bright` | `#21A1A3` | preset `accent-bright` | Quote marks, routed connector, illustration accent |
| `--deep` | `#0F555B` | preset `deep` | Booking-card header, selected tab |
| `--surface` | `#E7F3F3` | preset `surface` | Panel base, ticket stubs, tinted review, tiles |
| `--surface-alt` / `--surface-soft` | `#EFF4F4` / `#F3F8F8` | presets | Hover grounds, quiet buttons |
| `--border` / `--border-strong` / `--divider` | `#D5E4E4` / `#C6D7D7` / `#DDE7E7` | presets | Hairlines, dashed perforations, rules |
| `--cta` / `-hover` / `-active` | `#C94300` / `#B33C00` / `#9C3200` | presets `cta*` | Primary actions; `-active` is also the error colour |
| `--v9-bg` | `#F5FAFA` | section ground | “Be ready” ground, panel top |
| `--v9-line` | `#E5EBEB` | section rules | Header and section borders |
| `--v9-strip-1` → `--v9-strip-2` | `#186C73` → `#156970` | airline strip | Strip gradient |
| `--v9-strip-ink` | `#D9F1EE` | airline strip title | Strip title; text on the scope strip |
| `--v9-deep` | `#0F5A60` | deep section | Scope strip |
| `--v9-mint` | `#C8E6E1` | illustration mint | Glow behind the card |
| `--v9-aqua` | `#86D6D2` | aqua on dark | Links and highlights on the dark review |
| `--v9-peach` / `--v9-peach-wash` | `#FFD3BA` / `#FFEDE7` | illustration peach / wash | Art; error ground |
| `--v9-orange` | `#CC4700` | orange text | Audience labels on the stubs |
| `--v9-bar` | `#9DC4C7` | ticket bar | The barcode strip |
| `--v9-on-dark` / `--v9-on-dark-2` | `#D7E4E4` / `#ABC2C1` | dark-card text | Quote and meta on the dark review |
| `--v9-placeholder` | `#5F7477` | placeholder | Placeholder text |
| `--tp-green` | `#00B67A` | Trustpilot (third party) | Rating squares, as in the client's reviews |

One value is derived, by a stated rule: `--field-line` `#809194` = `--muted` mixed 70% with white. Control boundaries
need 3:1 on white (WCAG 1.4.11); the production field border is far lighter, so this is the lightest brand-derived tint
that passes (3.28:1).

**Rules**
- **No new colour.** If it is not in the table it does not ship. `tools/palette-audit.js` renders the page and lists every
  colour painted; the last run found 34 distinct values, **all of them in the table** (the three it flags are artefacts:
  `#FFF` is white written short in the client's art, `#9C3402` is a mid-transition frame of the error border, and
  `#7A3300` at 28% is the production CTA shadow).
- **One hot colour.** Orange is the action. Errors use the same orange family (`cta-active`), as the production form does,
  never red.
- **Boundary rule.** Controls use `--field-line`; hairlines never form the only edge of something you operate.

**Measured contrast (WCAG 2.1)**

| Pair | Ratio |
| --- | --- |
| heading on white / `--v9-bg` / surface | 14.2 / 13.5 / 12.6 |
| secondary on white / surface | 9.7 / 8.5 |
| muted on white / surface | 6.5 / 5.7 |
| accent on white / surface | 6.4 / 5.6 |
| white on deep (card header) | 8.5 |
| white on cta | 4.9 |
| white on strip `#186C73` | 6.1 |
| strip ink `#D9F1EE` on strip | 5.2 |
| `--v9-aqua` on heading (dark review links) | 8.5 |
| `--v9-on-dark` / `-2` on heading | 10.9 / 7.6 |
| orange label `#CC4700` on white | 4.7 |
| cta-active (errors) on white / on peach wash | 7.3 / 6.5 |
| `--field-line` on white (control edge, 3:1 needed) | 3.3 |
| placeholder on white | 4.9 |

## 2. Typography: Figtree only

The production face is Figtree; v2's second typeface (Manrope) is gone.

| Role | Size | Weight · leading · tracking |
| --- | --- | --- |
| Hero headline | `clamp(2.375rem, 0.9rem + 3.95vw, 4.5rem)` → 72px at 1440 | 800 · 1.02 · −0.035em |
| Section headline | `clamp(1.875rem, 1.1rem + 2.4vw, 3.125rem)` → 50px | 700 · 1.06 · −0.028em (as the production sections) |
| Phone headline | `clamp(2.125rem, 1.2rem + 4.6vw, 3rem)` | 800 · 1.05 |
| Ticket stage word | `clamp(1.375rem, 1.1rem + 0.9vw, 1.75rem)` | 800 · 1 · uppercase |
| Ticket / review title | `clamp(1.25rem, 1.1rem + 0.5vw, 1.4375rem)` / 1.25rem | 700 · 1.2 |
| Lead | `clamp(1.0625rem, 0.98rem + 0.3vw, 1.25rem)` | 400 · 1.55 · max 25em |
| Body | 1rem | 400 · 1.55–1.6 |
| Fare | 2.125rem (1.875rem on short screens) | 800 · tabular numerals |
| Airport code | 1.625rem | 800 |
| Labels / micro | 0.8125rem / 0.75rem (uppercase, wide tracking on stub and strip labels) | 600 / 700–800 |

Sentence case everywhere except the strip title and ticket labels, which the production site already sets in capitals.
The hero breaks on meaning: “Get a **verifiable** / onward ticket / in 2 minutes.” with the key word in `--accent`
(as on the live site). One self-hosted variable font (Figtree, 20 KB latin + 10 KB latin-ext, `font-display: swap`).

## 3. Layout

- **Container** 1240px, side gutter `clamp(16px, 4.2vw, 56px)`.
- **Hero panel** is inset by `--panel-m` (8–16px) and padded by `--panel-pad` so its content lines up exactly with the
  header and the other sections (logo, headline, section titles share one left edge).
- **Hero grid ≥ 1024px:** copy at the left, the 468px (440px below 1280) booking card at the right, copy aligned to
  the top so a taller card (multi-city) never pushes it away. Below 1024px: headline, lead, card, trust line.
- **Above the fold** at 1440×900 the whole hero is visible: card with its CTA, the proof strip and the logo strip.
- **Breakpoints:** phone < 768 · tablet 768–1023 · laptop 1024–1279 · desktop ≥ 1280. The header collapses below 1080px.

## 4. Shape and depth

| Token | Value | Used on |
| --- | --- | --- |
| `--r-chip` | 8px | Tabs, suggestions, chips |
| `--r-cta` | 10px | Buttons (production CTA radius) |
| `--r-control` / `--r-inner` | 12px / 11px | Fields, route group, trust line; inner = control minus its 1px border |
| `--r-card` | 18px | Booking card, proof ticket, “Be ready” tickets (production ticket radius) |
| (reviews) | 24px | Review cards |
| `--r-panel` | 28px (22px on phones) | The hero panel and the strip's lower corners |

Shadows carry an offset and a soft blur tinted from `--heading`: `--sh-card` (booking card), `--sh-pop` (suggestions),
`--sh-tk` (ticket cards, the production shadow), `--sh-cta` / `--sh-cta-hover` (production values).

## 5. Components

**Hero panel.** Vertical gradient `--v9-bg` → `--surface` with a `--v9-mint` glow behind the card, the client's dotted
globe (accent at 28%, left side masked so no dots touch the headline) and one of the client's planes flying out from behind
the card (desktop only). The airline strip is the panel's foot.

**Booking card (signature).** White, 18px radius; a deep-teal header with the title and a segmented trip control on real
radio buttons; From over To in one bordered unit with a dashed connector and a 44px swap control; chosen airports become
departure-board entries (code + city); the connector turns solid aqua once both ends are set. Date and passengers side by
side, fare above a 58px orange CTA, status line, then assurances and payment marks. All behaviour of the production form is
kept (see `IMPLEMENTATION-NOTES.md`). Errors: pressed-orange text on the peach wash with an icon, summary line, focus to
the first problem.

**Proof ticket.** The three promises as one boarding-pass strip: white, 18px radius, two dashed perforations with notches
(the notch colour is `--surface`, the panel's colour at that height). Turns vertical below 900px.

**Airline strip.** Production strip: gradient `--v9-strip-1` → `--v9-strip-2`, centred small-caps title, then the client's nine
logos in a sideways marquee. Three identical sets, `translateX(−33.333%)` over 46s linear (the production speed), masked
edges. It pauses on hover, has a visible pause/play button (WCAG 2.2.2), and under `prefers-reduced-motion` becomes a static
centred row with the duplicate sets removed.

**Reviews.** The production trio, equal width: dark `--heading` card, `--surface` card, white bordered card; aqua quote glyph,
Trustpilot-green rating squares, title, quote, name · country · date, source. Link and meta colours on the dark card use
`--v9-aqua` / `--v9-on-dark-2`.

**Be ready (restored from the live site).** Same four tickets, same copy and order, same stub (“READY FOR / CHECK-IN”), the
client's own illustrations, notches, dashed perforation and barcode bar, and the CTA in the fourth. Improvements:
- two **equal** columns instead of 7fr/5fr, so no card is squeezed (the old fourth card wrapped its button and “TAKE-OFF”);
- copy **top-aligned**, so each row's labels, titles and paragraphs start on one line;
- stub labels 12px (were 11px), stage words never break, CTA never wraps;
- on phones the stub becomes a compact row (label left, art right) with notches on the dashed line;
- semantic list, `aria-labelledby` per card, and a slide-in on scroll (transform only, skipped for reduced motion).

## 6. Icons and artwork

- **Icons:** Phosphor (bold for controls, duotone for the proof tiles, fill for stars and play/pause), defined once as an inline sprite.
- **Artwork:** the client's own: the four “Be ready” illustrations, the dotted globe and plane. The nine airline logos are the
  client's files. Provenance and the mechanical changes made: `assets/SOURCES.md`.

## 7. Motion

| Moment | Trigger | Spec |
| --- | --- | --- |
| Entrance | Page load | Copy, card and proof strip rise 12px in sequence (640–720ms ease-out) |
| Logo marquee | Always | 46s linear loop; pauses on hover or with the button; static under reduced motion |
| Cards slide in | Scroll (reviews, tickets) | 18px, 640ms, transform only (text never fades); skipped under reduced motion |
| Connector, swap, flight row | Input | 360ms colour, rotation, fade + rise |
| Sticky fare bar | Card leaves the viewport (< 1024px) | 360ms slide |
| Hover / focus | Pointer / keyboard | 120–200ms, colour and shadow only |

`--ease-out` is `cubic-bezier(0.16, 0.84, 0.24, 1)`. Under `prefers-reduced-motion: reduce` every animation and transition
collapses to its final state.

## 8. Accessibility built in

- Landmarks, skip link, one h1, labelled form with a radio group and ARIA 1.2 comboboxes (↑ ↓ Enter Esc, announced counts).
- Errors linked with `aria-describedby`, `aria-invalid`, focus to the first error, polite live region.
- Targets ≥ 44px; visible focus on every stop; sticky UI never hides the focused control (`scroll-padding`).
- The marquee duplicates are `aria-hidden`; the pause control is a real button with `aria-pressed` and a changing label.
- `color-scheme: light`, `translate="no"` on codes and the brand, safe-area-aware gutters.
