# Design system — “Boarding pass” (v4)

The page is one family of tickets, now with the product shown. The hero is a deep-teal sky panel: the headline at the
left, the client's own sample itinerary rising from behind a **boarding-pass-shaped booking bar**, three promises and the
Trustpilot score as glass chips, and the airline logos running along the panel's foot. Below the hero the reviews and the
“Be ready” tickets keep the same ticket vocabulary. Colour, type and artwork all come from the production site, so
nothing reads as a different brand.

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
| `--heading` | `#0E2F34` | preset `heading` | Headlines, field values, dark review card, the foot of the airline strip |
| `--ink` | `#12262A` | preset `ink` | Base text colour |
| `--secondary` | `#33484B` | preset `secondary` | Body copy |
| `--muted` | `#4A6266` | preset `muted` | Labels, meta, ticket label |
| `--accent` | `#156970` | preset `accent` | Hero gradient start, links, icons, focus |
| `--accent-bright` | `#21A1A3` | preset `accent-bright` | Glow behind the sample itinerary, routed connector, quote marks |
| `--deep` | `#0F555B` | preset `deep` | Hero gradient middle, selected tab text |
| `--surface` | `#E7F3F3` | preset `surface` | The ticket stub, tinted review, tiles |
| `--surface-alt` / `--surface-soft` | `#EFF4F4` / `#F3F8F8` | presets | Hover grounds, quiet buttons |
| `--border` / `--border-strong` / `--divider` | `#D5E4E4` / `#C6D7D7` / `#DDE7E7` | presets | Hairlines, the dashed perforation, rules |
| `--cta` / `-hover` / `-active` | `#C94300` / `#B33C00` / `#9C3200` | presets `cta*` | Primary actions; `-active` is also the error colour |
| `--v9-bg` | `#F5FAFA` | section ground | “Be ready” ground |
| `--v9-line` | `#E5EBEB` | section rules | Header and section borders |
| `--v9-strip-1` → `--v9-strip-2` | `#186C73` → `#156970` | airline strip | Lower-left glow of the hero |
| `--v9-strip-ink` | `#D9F1EE` | airline strip title | Lead text on the hero, strip title, chip captions |
| `--v9-deep` | `#0F5A60` | deep section | Hero gradient end, strip start, scope strip |
| `--v9-mint` | `#C8E6E1` | illustration mint | Text selection, art |
| `--v9-aqua` | `#86D6D2` | aqua on dark | The key word “verifiable”, icons and links on dark |
| `--v9-peach` / `--v9-peach-wash` | `#FFD3BA` / `#FFEDE7` | illustration peach / wash | Art; error ground |
| `--v9-orange` | `#CC4700` | orange text | Audience labels on the “Be ready” stubs |
| `--v9-bar` | `#9DC4C7` | ticket bar | The barcode strip |
| `--v9-on-dark` / `--v9-on-dark-2` | `#D7E4E4` / `#ABC2C1` | dark-card text | Quote and meta on the dark review |
| `--v9-placeholder` | `#5F7477` | placeholder | Placeholder text |
| `--tp-green` | `#00B67A` | Trustpilot (third party) | Rating squares, as in the client's reviews |

One value is derived, by a stated rule: `--field-line` `#809194` = `--muted` mixed 70% with white. Control boundaries
need 3:1 on white (WCAG 1.4.11); the production field border is far lighter, so this is the lightest brand-derived tint
that passes (3.28:1).

**Translucent white on the sky.** The glass chips, the trip tabs and the payment marks use white at 9–20% over the hero
gradient. These are alpha values of an existing colour (white), not new colours; `tools/palette-audit.js` accepts white
and black at any alpha.

**Rules**
- **No new colour.** If it is not in the table it does not ship. `tools/palette-audit.js` renders the page, opens the error
  state, waits for the transitions to settle and lists every colour painted: **32 distinct values, none outside the table**
  (three consecutive runs). It expands the short hex in the client's art (`#FFF` = white) and treats `#7A3300` at 28–30% as
  what it is: the production CTA shadow tint, used in shadows only.
- **One hot colour.** Orange is the action. Errors use the same orange family (`cta-active`), as the production form does,
  never red.
- **Boundary rule.** Controls use `--field-line`; hairlines never form the only edge of something you operate.
- **No glow under text.** The aqua glow sits behind the sample itinerary only; on phones, where the sheets are hidden, it is
  removed so the headline and lead never sit on its brightest part.

**Measured contrast (WCAG 2.1)**

On white and tinted grounds:

| Pair | Ratio |
| --- | --- |
| heading on white / `--v9-bg` / surface | 14.2 / 13.5 / 12.6 |
| secondary on white / surface | 9.7 / 8.5 |
| muted on white / surface | 6.5 / 5.7 |
| accent on white / surface | 6.4 / 5.6 |
| white on cta (the booking button) | 4.9 |
| `--v9-aqua` on heading (dark review links) | 8.5 |
| `--v9-on-dark` / `-2` on heading | 10.9 / 7.6 |
| orange label `#CC4700` on white | 4.7 |
| cta-active (errors) on white / on peach wash | 7.3 / 6.5 |
| `--field-line` on white (control edge, 3:1 needed) | 3.3 |
| placeholder on white | 4.9 |
| selected tab, `--deep` on white | 8.5 |

On the hero gradient, which an automated checker cannot evaluate, so it was **measured on the rendered page**
(`scratchpad` script: hide the text, sample every pixel under each line box, take the worst; widths 1440, 1180, 768, 680, 390, 360):

| Text on the sky | Worst measured | Needs |
| --- | --- | --- |
| Headline, white (37–62px, 800) | 6.5 : 1 | 3 : 1 (large) |
| “verifiable”, `--v9-aqua` (37–62px, 800) | 3.8 : 1 | 3 : 1 (large) |
| Lead, `--v9-strip-ink` (17–19px) | 4.8 : 1 | 4.5 : 1 |
| Chip text, white (15px, 600) | 5.9 : 1 | 4.5 : 1 |
| Chip captions and trust line, `--v9-strip-ink` (14px) | 5.3 : 1 | 4.5 : 1 |
| Assurances, white at 90% (14px) | 6.7 : 1 | 4.5 : 1 |
| Inactive trip tab, white at 92% (14px, 650) | 4.8 : 1 | 4.5 : 1 |
| Strip title, `--v9-strip-ink` (13px, caps) | 6.8 : 1 | 4.5 : 1 |

## 2. Typography: Figtree only

The production face is Figtree; v2's second typeface (Manrope) is gone.

| Role | Size | Weight · leading · tracking |
| --- | --- | --- |
| Hero headline | `clamp(2.375rem, 0.9rem + 3.3vw, 3.875rem)` → 62px at 1440 | 800 · 1.03 · −0.035em |
| Phone headline | `clamp(2.125rem, 1.2rem + 4.6vw, 3rem)` | 800 · 1.05 |
| Section headline | `clamp(1.875rem, 1.1rem + 2.4vw, 3.125rem)` → 50px | 700 · 1.06 · −0.028em (as the production sections) |
| Ticket stage word | `clamp(1.375rem, 1.1rem + 0.9vw, 1.75rem)` | 800 · 1 · uppercase |
| Ticket / review title | `clamp(1.25rem, 1.1rem + 0.5vw, 1.4375rem)` / 1.25rem | 700 · 1.2 |
| Lead | `clamp(1.0625rem, 0.95rem + 0.28vw, 1.1875rem)` → 19px | 400 · 1.55 · max 31em |
| Body | 1rem | 400 · 1.55–1.6 |
| Fare | 1.875rem on the stub (2.125rem in the tablet card) | 800 · tabular numerals |
| Airport code | 1.625rem | 800 |
| Ticket label | 0.75rem, uppercase, 0.14em | 800 |
| Labels / micro | 0.8125rem / 0.75rem | 600 / 700–800 |

Sentence case everywhere except the strip title and ticket labels, which the production site already sets in capitals.
The hero breaks on meaning: “Get a **verifiable** / onward ticket / in 2 minutes.” with the key word in aqua (the
production site sets it in the brand teal; on the dark panel the aqua is the production's “aqua on dark”). One
self-hosted variable font (Figtree, 20 KB latin + 10 KB latin-ext, `font-display: swap`).

## 3. Layout

- **Container** 1240px, side gutter `clamp(16px, 4.2vw, 56px)`.
- **Hero panel** is inset by `--panel-m` (8–16px) and padded by `--panel-pad`, so its content lines up exactly with the
  header and the other sections (logo, headline, section titles share one left edge). It is 1320px wide at 1440.
- **Five hero layouts**, one DOM:

| Width | Layout |
| --- | --- |
| ≥ 1180px | **Ticket.** Headline and lead at the left, the two sample sheets at the right, trip tabs, then the boarding-pass bar across the full panel width, then assurances and payment marks, the four chips and the airline strip |
| 900–1179px | **Two columns.** Copy and chips at the left, a 430px booking card at the right; sheets hidden |
| 680–899px | **One column** with the sheets at the top right; the card is centred (max 640px). Below 768px the card turns compact: title hidden visually, tabs fill the row |
| < 680px | **Phone.** Headline, lead, full-width card, stacked chips; sheets hidden |

- **Above the fold** at 1440×900 the whole hero is visible: headline, lead, tabs, the ticket with its CTA, the chips and the
  logo strip. The CTA's bottom edge is at 612px (1440×900), 591px (1280×720), 552px (1024×768), 811px (820×1180), 748px (390×844).
- **Header** collapses to the menu below 1080px.

## 4. Shape and depth

| Token | Value | Used on |
| --- | --- | --- |
| `--r-sheet` | 6px | The sample itinerary pages |
| `--r-chip` | 8px | Tabs, suggestions, payment chips |
| `--r-cta` | 10px | Buttons (production CTA radius), icon tiles |
| `--r-control` / `--r-inner` | 12px / 11px | Fields, route group, chips, badge; inner = control minus its 1px border |
| `--r-card` | 18px | Tablet/phone booking card, “Be ready” tickets (production ticket radius) |
| `--r-ticket` | 22px | The outer corners of the desktop boarding-pass bar |
| (reviews) | 24px | Review cards |
| `--r-panel` | 28px (22px on phones) | The hero panel and the strip's lower corners |

Shadows carry an offset and a soft blur tinted from `--heading`: `--sh-card` (booking card), `--sh-pop` (suggestions),
`--sh-tk` (ticket cards, the production shadow), `--sh-cta` / `--sh-cta-hover` (production values). The ticket halves and the
sheets carry their own two-layer shadow (a 1–2px contact line and a long soft drop) so they lift off the sky.

## 5. Components

**Hero panel (the sky).** `linear-gradient(165deg, accent → deep 62% → v9-deep)`: the brand teals, light at the top left to
deep at the foot. Two soft glows sit in a separate decoration layer (`.hero-art`, so text never sits on a glow it did not
expect): aqua (`accent-bright` at 85%) behind the sample itinerary, and `--v9-strip-1` at the lower left. The client's dotted
globe is white at 20%, masked away from the headline. One of the client's planes (white, with an aqua dashed path) flies from
the sheets towards the headline's side on desktop.

**Sample itinerary (the product, shown).** The client's own redacted itinerary pages (from its “A real onward ticket. See for
yourself.” section, already watermarked “SAMPLE · PRIVACY REDACTED”), 680px WebP, 35–39 KB each. Two pages, rotated −8° and
+4.5°, rise from behind the ticket. A white badge, “Verifiable PNR” with a seal-check icon, states what they are. The figure
is one image to assistive technology (`role="img"`, labelled “Sample itinerary with a verifiable PNR, personal details redacted”).

**Booking ticket (signature, ≥ 1180px).** A real boarding-pass shape built from two backgrounds: the main half is white, the
stub is the `--surface` tint, and each half has a quarter circle cut out of its top and bottom corner at the perforation, so
the sky (and the sheets) show through the notch. The seam carries a dashed `--border-strong` perforation. The label row reads
“CHOOSE YOUR ROUTE ··········· ✈”. One row of controls: From | To with a 40px swap between them, travel date, passengers.
The stub holds the fare (“From $9.99”, “Delivered in 2 minutes”) above the 54px orange CTA. Trip tabs sit above the ticket as
a translucent white segmented control on the sky. Assurances and payment marks sit below, directly on the sky.
- **Return:** the route takes its own row, then departure, return and passengers.
- **Multi-city:** one flight per row (label, route, date, a reserved 44px remove column, so flight 1 aligns with the rest), then
  “Add another flight” and passengers.
- The notches are painted with `radial-gradient` backgrounds, not masks, so the suggestion list can overflow the ticket.

**Booking card (< 1180px).** White, 18px radius, a `--surface` header with the title and the segmented trip control on real
radio buttons; From over To in one bordered unit with a dashed connector and a 44px swap control; chosen airports become
departure-board entries (code + city) and the connector turns solid aqua once both ends are set. Date and passengers side by
side, fare above a 58px orange CTA, status line, then assurances and payment marks. All behaviour of the production form is
kept (see `IMPLEMENTATION-NOTES.md`). Errors: pressed-orange text on the peach wash with an icon, a summary line, focus on the
first problem.

**Proof chips.** The three promises and the TrustScore line, as four glass chips under the form (white at 9% with a 1px white
18% edge): a 38px tile with a duotone icon (aqua on white 14%), one short sentence. The Trustpilot chip shows the green
rating squares and links to the client's Trustpilot page. Four across at ≥1180px, 2×2 at 1100–1179px, a column below.

**Airline strip.** The panel's foot: gradient `--v9-deep` → `--heading`, centred small-caps title, then the client's nine logos
in a sideways marquee. Three identical sets, `translateX(−33.333%)` over 46s linear (the production speed), masked edges. It
pauses on hover, has a visible pause/play button (WCAG 2.2.2), and under `prefers-reduced-motion` becomes a static centred row
with the duplicate sets removed.

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

- **Icons:** Phosphor (bold for controls, duotone for the proof tiles, fill for stars, play/pause, the seal-check badge and the
  ticket's airplane), defined once as an inline sprite (22 symbols).
- **Artwork:** the client's own: the four “Be ready” illustrations, the dotted globe and plane, the two sample itinerary pages.
  The nine airline logos are the client's files. Provenance and the mechanical changes made: `assets/SOURCES.md`.

## 7. Motion

| Moment | Trigger | Spec |
| --- | --- | --- |
| Entrance | Page load | Headline and lead, then the form (tabs and ticket), then the chips slide up 14px in sequence (640–720ms ease-out, 0–260ms delays). **Transform only**: text and the form never fade |
| Sample itinerary | Page load | Each sheet rises 44px and fades in (900ms, from 220ms); the badge fades in after (500ms, from 600ms). Everything is at rest by about 1.1s |
| Logo marquee | Always | 46s linear loop; pauses on hover or with the button; static under reduced motion |
| Cards slide in | Scroll (reviews, tickets) | 18px, 640ms, transform only; skipped under reduced motion |
| Connector, swap, flight row | Input | 360ms colour, rotation, fade + rise |
| Sticky fare bar | Card leaves the viewport (< 1024px) | 360ms slide |
| Hover / focus | Pointer / keyboard | 120–200ms, colour and shadow only |

`--ease-out` is `cubic-bezier(0.16, 0.84, 0.24, 1)`. Under `prefers-reduced-motion: reduce` every animation and transition
collapses to its final state.

## 8. Accessibility built in

- Landmarks, skip link, one h1, labelled form with a radio group and ARIA 1.2 comboboxes (↑ ↓ Enter Esc, announced counts).
- Errors linked with `aria-describedby`, `aria-invalid`, focus to the first error, polite live region.
- Targets ≥ 44px; visible focus on every stop; sticky UI never hides the focused control (`scroll-padding`).
- Reading order equals visual order: tabs, From, swap, To, date, passengers, CTA, Trustpilot, pause control.
- The marquee duplicates are `aria-hidden`; the pause control is a real button with `aria-pressed` and a changing label.
- The decorative glows, globe and plane are `alt=""` / CSS; the sample itinerary is one labelled image.
- `color-scheme: light`, `translate="no"` on codes and the brand, safe-area-aware gutters.
