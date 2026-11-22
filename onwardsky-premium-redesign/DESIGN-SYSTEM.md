# Design system — “Boarding pass” (v6)

The page is one family of tickets, drawn in vectors only. The hero is a deep-teal panel with a dot-matrix world map
(Natural Earth data) on which flight routes join real airports; the headline sits at the left on the plain gradient and a
**boarding-pass-shaped booking bar** is laid across the panel. One glass bar carries the three promises and the
Trustpilot score, and the airline logos run along the panel's foot like a horizon. Below the hero, the reviews open with a
Trustpilot summary and three cards of one kind, and the “Be ready” tickets sit on the same dotted map, in the brand teal.
Colour, type and the client's artwork come from the production site; there is no photograph and no hand-drawn art.

All values below are live CSS custom properties in `assets/css/styles.css` (`:root`). The same system is recorded in
machine-readable form in `../DESIGN.md` (token frontmatter) and `../.impeccable/design.json`.

---

## 1. Colour: every value is a production value

v2 was rejected because its colours were invented (near-matches such as `#0B2B30`, a blue-grey pastel, a sand tint,
a red error). From v3 on, the page uses **only** the colours the production site already defines, under the same names:

- the **theme.json presets** of the production theme (`heading`, `accent`, `deep`, `surface`, `cta` …), and
- the **values its section styles resolve to** (airline strip, mint, peach …). The production CSS names some of these
  after blues (`--c-0B283D`, `--c-E4F5FB`), but the page remaps every one to a teal; the table lists what is painted.

| Token | Hex | Production name | Used for |
| --- | --- | --- | --- |
| `--heading` | `#0E2F34` | preset `heading` | Headlines, field values, the foot of the airline strip, glass fills |
| `--ink` | `#12262A` | preset `ink` | Base text colour |
| `--secondary` | `#33484B` | preset `secondary` | Body copy |
| `--muted` | `#4A6266` | preset `muted` | Labels, meta, ticket label |
| `--accent` | `#156970` | preset `accent` | Hero gradient start, links, icons, focus, the dots of the light map texture |
| `--accent-bright` | `#21A1A3` | preset `accent-bright` | The glow behind the routes, routed connector |
| `--deep` | `#0F555B` | preset `deep` | Hero gradient middle, the selected tab's text |
| `--surface` | `#E7F3F3` | preset `surface` | The ticket stub, a reviewer's initials, tiles |
| `--surface-alt` / `--surface-soft` | `#EFF4F4` / `#F3F8F8` | presets | Hover grounds |
| `--border` / `--border-strong` / `--divider` | `#D5E4E4` / `#C6D7D7` / `#DDE7E7` | presets | Card edges, the dashed perforation, rules |
| `--cta` / `-hover` / `-active` | `#C94300` / `#B33C00` / `#9C3200` | presets `cta*` | Primary actions; `-active` is also the error colour |
| `--v9-bg` | `#F5FAFA` | section ground | “Be ready” ground, the Trustpilot summary |
| `--v9-line` | `#E5EBEB` | section rules | Header and section borders |
| `--v9-strip-ink` | `#D9F1EE` | airline strip title | Lead text on the hero, strip title, trust-line caption |
| `--v9-deep` | `#0F5A60` | deep section | Hero gradient end, strip start, scope strip |
| `--v9-mint` | `#C8E6E1` | illustration mint | Quote marks and a reviewer's initials, text selection, art |
| `--v9-aqua` | `#86D6D2` | aqua on dark | The key word “verifiable”, the routes and airport markers, icons on dark |
| `--v9-peach` / `--v9-peach-wash` | `#FFD3BA` / `#FFEDE7` | illustration peach / wash | Art, a reviewer's initials; error ground |
| `--v9-orange` | `#CC4700` | orange text | Audience labels on the “Be ready” stubs |
| `--v9-bar` | `#9DC4C7` | ticket bar | The barcode strip |
| `--v9-placeholder` | `#5F7477` | placeholder | Placeholder text |
| `--tp-green` | `#00B67A` | Trustpilot (third party) | Rating squares, as in the client's reviews |
| `--heading-rgb` / `--accent-bright-rgb` | `14, 47, 52` / `33, 161, 163` | `heading` / `accent-bright` as channels | Glass fills and the glow |

`--v9-strip-1`, `--v9-strip-2`, `--v9-wash` and `--v9-on-dark(-2)` stay defined (they are production values) but nothing
paints them in v6.

One value is derived, by a stated rule: `--field-line` `#809194` = `--muted` mixed 70% with white. Control boundaries
need 3:1 on white (WCAG 1.4.11); the production field border is far lighter, so this is the lightest brand-derived tint
that passes (3.28:1).

**Translucent white and teal.** The glass bar, the trip tabs, the airport tags and the payment marks use white at 10–24% or
`heading` at 40–62% over the hero. These are alpha values of existing colours, not new colours; `tools/palette-audit.js`
accepts white, black and the palette colours at any alpha. The map SVGs use only `#FFFFFF`, `#86D6D2` (aqua) and
`#156970` (accent).

**Rules**
- **No new colour.** If it is not in the table it does not ship. `tools/palette-audit.js` renders the page, opens the error
  state, waits for the transitions to settle and lists every colour painted: **30 distinct values, none outside the table**
  (consecutive runs). It expands the short hex in the client's art (`#FFF` = white) and treats `#7A3300` at 28–30% as what it
  is: the production CTA shadow tint, used in shadows only.
- **One hot colour.** Orange is the action. Errors use the same orange family (`cta-active`), as the production form does,
  never red. The map's routes and markers are aqua, never orange.
- **Boundary rule.** Controls use `--field-line`; hairlines never form the only edge of something you operate.
- **The map rule.** The map never sits under text. It is masked to nothing across the text column (0–46% of the panel's
  width), reaches full strength from 60%, fades out above the booking bar, and is not shown below 900px, where the text spans
  the width. The contrast below was *measured*, not assumed.

**Measured contrast (WCAG 2.1)**

On white and tinted grounds:

| Pair | Ratio |
| --- | --- |
| heading on white / `--v9-bg` / surface | 14.2 / 13.5 / 12.6 |
| secondary on white / surface | 9.7 / 8.5 |
| muted on white / surface | 6.5 / 5.7 |
| accent on white / surface | 6.4 / 5.6 |
| white on cta (the booking button) | 4.9 |
| orange label `#CC4700` on white | 4.7 |
| cta-active (errors) on white / on peach wash | 7.3 / 6.5 |
| `--field-line` on white (control edge, 3:1 needed) | 3.3 |
| placeholder on white | 4.9 |
| selected tab, `--deep` on white | 8.5 |
| heading initials on mint / surface / peach | 10.8 / 12.6 / 10.4 |
| muted and accent on `--v9-bg` (Trustpilot summary) | 6.2 / 6.1 |

On the hero gradient and map, which an automated checker cannot evaluate, so it was **measured on the rendered page**
(hide the text, sample every pixel under each line box, keep the worst; widths 1440, 1280, 1180, 1024, 768, 680, 390, 360):

| Text on the hero | Worst measured | Needs |
| --- | --- | --- |
| Headline, white (36–62px, 800) | 6.0 : 1 | 3 : 1 (large) |
| “verifiable”, `--v9-aqua` (36–62px, 800) | 3.5 : 1 | 3 : 1 (large) |
| Lead, `--v9-strip-ink` (17–19px) | 4.9 : 1 | 4.5 : 1 |
| Glass-bar text, white (15px, 600) | 10 : 1 | 4.5 : 1 |
| Assurances, white at 90% (14px, desktop) | 7.0 : 1 | 4.5 : 1 |
| Inactive trip tab, white at 92% (14px, 650) | 4.8 : 1 | 4.5 : 1 |
| Strip title, `--v9-strip-ink` (13px, caps) | 6.8 : 1 | 4.5 : 1 |

## 2. Typography: Figtree only

The production face is Figtree; v2's second typeface (Manrope) is gone.

| Role | Size | Weight · leading · tracking |
| --- | --- | --- |
| Hero headline | `clamp(2.375rem, 0.9rem + 3.3vw, 3.875rem)` → 62px at 1440 | 800 · 1.03 · −0.035em |
| Phone headline | `clamp(2.125rem, 1.2rem + 4.6vw, 3rem)` | 800 · 1.05 |
| Section headline | `clamp(1.875rem, 1.1rem + 2.4vw, 3.125rem)` → 50px | 700 · 1.06 · −0.028em (as the production sections) |
| Rating score | 2.75rem | 800 · 1 · tabular numerals |
| Ticket stage word | `clamp(1.375rem, 1.1rem + 0.9vw, 1.75rem)` | 800 · 1 · uppercase |
| Ticket / review title | `clamp(1.25rem, 1.1rem + 0.5vw, 1.4375rem)` / 1.25rem | 700 · 1.2–1.25 |
| Lead | `clamp(1.0625rem, 0.95rem + 0.28vw, 1.1875rem)` → 19px | 400 · 1.55 · max 31em |
| Body / quotes | 1rem / 1.0625rem | 400 · 1.55–1.6 |
| Fare | 1.875rem on the stub (2.125rem in the tablet card) | 800 · tabular numerals |
| Airport code | 1.625rem in the form, 0.75rem on the map tags | 800 |
| Ticket label | 0.75rem, uppercase, 0.14em | 800 |
| Labels / micro | 0.8125rem / 0.75rem | 600 / 700–800 |

Sentence case everywhere except the strip title, ticket labels and airport codes, which the production site already sets in
capitals. The hero breaks on meaning: “Get a **verifiable** / onward ticket / in 2 minutes.” with the key word in aqua.
One self-hosted variable font (Figtree, 20 KB latin + 10 KB latin-ext, `font-display: swap`).

## 3. Layout

- **Container** 1240px, side gutter `clamp(16px, 4.2vw, 56px)`.
- **Hero panel** is inset by `--panel-m` (8–16px) and padded by `--panel-pad`, so its content lines up exactly with the
  header and the other sections (logo, headline, section titles share one left edge). It is 1320px wide at 1440.
- **Four hero layouts**, one DOM:

| Width | Layout |
| --- | --- |
| ≥ 1180px | **Ticket.** Headline and lead at the left, the map's routes at the right, trip tabs, then the boarding-pass bar across the full panel width, assurances and payment marks, the glass bar and the airline strip |
| 900–1179px | **Two columns.** Copy and the glass bar at the left (2 × 2 cells from 1100px, one column below), a 430px booking card at the right, set 44–84px lower than the headline so the map shows above it |
| 680–899px | **One column.** The card is centred (max 640px); no map (the text spans the width); below 768px the card turns compact |
| < 680px | **Phone.** Headline, lead, full-width card, the glass bar as one stacked list, the strip |

- **Above the fold** at 1440×900 the whole hero is visible: headline, lead, tabs, the ticket with its CTA, the glass bar and the
  logo strip. The CTA's bottom edge is at 612px (1440×900), 591px (1280×720), 624px (1024×768), 757px (820×1180 and 680×900),
  748px (390×844), 743px (375×812).
- **Reviews:** heading and lead at the left, the Trustpilot summary at the right (stacked below 900px); three cards in a row,
  2 + 1 on tablets, one column on phones.
- **Be ready:** heading at the left, the action at the right (full width on phones); four tickets in a 2 × 2 grid from 1024px,
  one column below.
- **Header** collapses to the menu below 1200px.

## 4. Shape and depth

| Token | Value | Used on |
| --- | --- | --- |
| `--r-chip` | 8px | Tabs, suggestions, payment chips, map tags |
| `--r-cta` | 10px | Buttons (production CTA radius), icon tiles |
| `--r-control` / `--r-inner` | 12px / 11px | Fields, route group, the glass bar; inner = control minus its 1px border |
| `--r-card` | 18px | Booking card, review cards, the Trustpilot summary, “Be ready” tickets (production ticket radius) |
| `--r-ticket` | 22px | The outer corners of the desktop boarding-pass bar |
| `--r-panel` | 28px (22px on phones) | The hero panel and the strip's lower corners |

Shadows carry an offset and a soft blur tinted from `--heading`: `--sh-card` (booking card), `--sh-pop` (suggestions),
`--sh-tk` (review cards and “Be ready” tickets, the production shadow), `--sh-cta` / `--sh-cta-hover` (production values). The
ticket halves carry their own two-layer shadow so they lift off the panel. Nothing that is not a link or a button moves on hover:
the “Be ready” tickets are not links, so they keep still.

## 5. Components

**Hero panel (the route map).** The brand-teal gradient (`accent` → `deep` → `v9-deep`), a soft aqua glow behind the routes, and
one vector: `assets/vectors/route-map.svg`, built by `tools/build-route-map.mjs` from open data. It is a dot matrix of the world's
land (Natural Earth 1:110m, Equal Earth projection, one dot every 10 units, white at 30%) with five flight routes between real
airports (London, Lisbon, Istanbul, Dubai, Delhi, Bangkok, Singapore) drawn as aqua dashed arcs with a soft halo, an aqua marker
at each airport and Phosphor's airplane on the Delhi–London route. Four markers carry a small departure-board tag in HTML
(`LHR`, `DXB`, `DEL`, `BKK`, Figtree 800, glass). The map box is 16:9 at the top of the panel; it is masked out across the text
column and above the form, fades in over a second, and is hidden below 900px (and lazy-loaded, so phones do not download it).
From 900 to 1179px the card covers the map's eastern half, so only the `LHR` tag is shown (`.map-tag--wide` hides the others).

**Booking ticket (signature, ≥ 1180px).** A real boarding-pass shape built from two backgrounds: the main half is white, the
stub is the `--surface` tint, and each half has a quarter circle cut out of its top and bottom corner at the perforation, so
the panel shows through the notch. The seam carries a dashed `--border-strong` perforation. The label row reads
“CHOOSE YOUR ROUTE ··········· ✈”. One row of controls: From | To with a 40px swap between them, travel date, passengers.
The stub holds the fare (“From $9.99”, “Delivered in 2 minutes”) above the 54px orange CTA. Return puts the route on its own
row; multi-city shows one flight per row with a reserved remove column.

**Booking card (< 1180px).** White, 18px radius, a `--surface` header with the title and the segmented trip control on real
radio buttons; From over To in one bordered unit with a dashed connector and a 44px swap control; chosen airports become
departure-board entries (code + city). Date and passengers side by side, fare above a 58px orange CTA, status line, then
assurances and payment marks. Errors: pressed-orange text on the peach wash with an icon, a summary line, focus on the first
problem.

**Proof bar.** The three promises and the TrustScore line as one glass object (heading at 40%, a 10px blur, a 1px white edge at
20%) with four cells split by hairlines; the Trustpilot cell sizes to its content and shows a white focus ring inside its edge.

**Airline strip.** The panel's foot: gradient `--v9-deep` → `--heading`, centred small-caps title, the client's nine logos in a
sideways marquee (46s, masked edges) that pauses on hover, on focus, off screen and with a visible button, and becomes a static
row under reduced motion.

**Reviews (redesigned in v6).** The heading and lead at the left and, at the right, a **Trustpilot summary** that is one link:
the score “4.0” large, four of five green squares, “TrustScore 4.0 on Trustpilot”, “All 4 reviews rated 5 stars”, and
“Read more reviews on Trustpilot ↗” under a rule (the `--v9-bg` section ground, 18px radius, accent edge and shadow on hover). Then **three cards of one
kind** (white, 1px border, 18px radius, the production ticket shadow): five green squares with a mint quote mark (Phosphor
`quotes`) on the same row, the review's title, the quote, and a footer under a rule with the reviewer's **initials** in a
tinted circle (mint, surface, peach), their name (linked to the review on Trustpilot; a 25px target) and “country · date” (the live page's format, with the
country spelled out). A one-line note
below repeats that these are excerpts and the overall score. v3's mixed dark / tinted / white cards are gone.

**Be ready (refined in v6).** Same four tickets, copy, order, stub (“READY FOR / CHECK-IN”), the client's illustrations,
notches, perforation and barcode bar. Changes: the heading row now carries the **“Get my onward ticket” action at the right**, so
all four tickets have the same shape (the action used to sit inside the fourth); the section ground carries the hero's
**dot-matrix map in the brand teal at 16%** (`assets/vectors/world-dots.svg`) behind the heading, tying it to the hero. The tickets are not links, so they do not react to hover (a lift was tried and
removed as a false affordance). Kept from v3: two equal columns, top-aligned copy, 12px stub labels, a compact stub on phones, a semantic list
and a slide-in on scroll.

## 6. Icons and artwork

- **Icons:** Phosphor (bold for controls, duotone for the proof tiles, fill for stars, play/pause, the ticket's airplane, the
  map's airplane and the review quote mark), defined once as an inline sprite (22 symbols).
- **Map:** Natural Earth land (public domain) via the `world-atlas` package, projected with `d3-geo`; routes computed between
  airport coordinates. See `assets/SOURCES.md`.
- **Artwork:** the client's own: the four “Be ready” illustrations and the nine airline logos. No photograph and no
  third-party illustration.

## 7. Motion

| Moment | Trigger | Spec |
| --- | --- | --- |
| Entrance | Page load | Headline and lead, then the form (tabs and ticket), then the proof bar slide up 14px in sequence (640–720ms ease-out, 0–260ms delays). **Transform only**: text and the form never fade |
| Map | Page load | Fades in over 1s from 200ms (opacity only); it never sits under text, so contrast is unaffected |
| Logo marquee | Always | 46s linear loop; pauses on hover, on focus, off screen or with the button; static under reduced motion |
| Cards slide in | Scroll (reviews, tickets) | 18px, 640ms, transform only; skipped under reduced motion |
| Connector, swap, flight row | Input | 360ms colour, rotation, fade + rise |
| Sticky fare bar | Card leaves the viewport (< 1024px) | 360ms slide |
| Hover / focus | Pointer / keyboard | 120–200ms, colour and shadow only |

`--ease-out` is `cubic-bezier(0.16, 0.84, 0.24, 1)`. Under `prefers-reduced-motion: reduce` every animation and transition
collapses to its final state.

## 8. Accessibility built in

- Landmarks, skip link, one h1, labelled form with a radio group and ARIA 1.2 comboboxes (↑ ↓ Enter Esc, announced counts).
- Errors linked with `aria-describedby`, `aria-invalid`, focus to the first error, polite live region.
- Targets ≥ 44px; visible focus on every stop (white on the hero); sticky UI never hides the focused control (`scroll-padding`).
- Reading order equals visual order: tabs, From, swap, To, date, passengers, CTA, Trustpilot cell, pause control, the
  Trustpilot summary, the three reviewers, the “Be ready” action.
- The map, its tags and the glow are decorative (`aria-hidden`, `alt=""`); the initials circles are `aria-hidden` (the names
  are read from the links).
- `color-scheme: light`, `translate="no"` on codes and the brand, safe-area-aware gutters.
