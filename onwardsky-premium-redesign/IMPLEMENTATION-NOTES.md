# Implementation notes (v7)

## 1. What is real, what is simulated

| Area | Prototype behaviour | Production behaviour |
| --- | --- | --- |
| Trip types, multi-city 2–6 flights, swap, next-flight auto-fill | **Real**, same rules as the production block | Same |
| Validation rules and messages | **Real**: copied from the plugin (`onwardsky_itinerary` v1.7.1) | Same |
| Earliest date | **Real**: today + 10 days in `Asia/Kolkata`, recomputed in the browser | Same |
| Airport search | **Demo data**: 140 major airports in `assets/js/airports.js` with a local ranking (code → city → alias → country) | Plugin dataset (`airports-data.js`) + `airport-search.js` ranking, loaded on first focus |
| Submit | **Stops at a “Search ready” confirmation.** No redirect, no network request | Hands off to `/flight-booking-wizard/` via `handoff.js`; the wizard and checkout re-validate and re-quote |
| Prices, payment and checkout | Static copy (“From $9.99”, payment names) | Quoted by the wizard |
| Hero route map | **Static SVG**, decorative, built once by `tools/build-route-map.mjs` from open map data (nothing is generated from the form, and the routes are not a statement about routes sold) | The same SVG file in a Cover block or a pattern; the four airport tags are plain HTML |
| Airline strip | **Real marquee** (CSS animation) of the client's nine logo files, with a pause control | The production strip already scrolls (46s, hover pause); the control, the off-screen pause and the reduced-motion row are new |
| Header links, Trustpilot links, WhatsApp | Point to the live URLs (read-only navigation) | Same |

Nothing in the prototype contacts booking, checkout or payment endpoints, and the live site is untouched.

## 2. Preserved production behaviour

- **Date label:** “Depart date” for return trips, “Travel date” otherwise.
- **Date ordering:** return must be after departure, and each multi-city flight departs on or after the previous one.
- **Next-flight auto-fill:** choosing a destination pre-fills the next flight's origin when that is still empty.
- **Removing a flight:** the remaining flights close the gap and focus stays in the form.
- **`#book` links:** any `#book` link scrolls to the form and focuses **From**; a menu open at the time closes first.
- **Sticky CTA:** below 1024px a fare bar appears once the form has scrolled out of view.
- **Field names:** `trip_type`, `from_city`, `to_city`, `dep_date`, `ret_date`, `pax`, plus indexed names for extra flights.
- **Marquee:** same speed (46s per set), masked edges and hover pause as the production strip; reduced motion shows a static row.

## 3. Deliberate improvements (flag for product sign-off)

Form (unchanged since v2):
- **First suggestion pre-highlighted:** Enter picks it. Production starts with none highlighted.
- **Exact matches accepted on blur:** typing an exact code or city and leaving the field selects it (e.g. `DEL`).
- **Visible summary line** (“Please check the highlighted fields.”) and a **visible “No airports found” state**.
- **The whole field cell is clickable:** a click on a cell's padding focuses its control.
- **Phones:** the card title “Choose your route” is visually hidden (the form keeps it as its accessible name) so the whole form and CTA fit the first viewport.

From v3:
- **Pause/play button on the logo strip** (WCAG 2.2.2) and a static logo row under `prefers-reduced-motion`. Production only pauses on hover.
- **“Be ready” in two equal columns** (production: 7fr / 5fr), top-aligned copy, 12px stub labels, a CTA that never wraps, a compact stub on phones, a semantic list and a slide-in on scroll.
- **Errors in the production pressed-orange** on its peach wash (v2 used red).
- **Reviews:** the production trio at equal widths; the carousel arrows are removed because three cards fit.
- **`autocomplete="off"`** on the date and passenger controls (non-auth fields).

From v4:
- **The booking form is a boarding pass from 1180px** (fields, behaviour and validation unchanged; a card below 1180px). Return puts the route on its own row; multi-city shows one flight per row with a column always reserved for the remove control.
- **The logo loop also rests while the strip is off screen** (IntersectionObserver), in addition to hover, focus and the button.
- **Entrance motion is transform-only** for text, the form and the proof bar.
- **A white focus ring on the Trustpilot cell** (the brand-teal ring would vanish on the dark panel).

From v5 (kept):
- **One glass proof bar** replaces the four separate chips (same words, same Trustpilot link); its last cell sizes to its content.
- **The header collapses to the menu below 1200px** (production: 1080px): at 1100px two nav links wrapped onto two lines.
- **In the two-column band (900–1179px) the card starts 44–84px lower**, so the map stays visible above it.

New in v6:
- **The hero is vectors only.** The photograph and its two veils are gone (files deleted). The panel is the brand-teal gradient with
  one soft glow and a **dot-matrix route map** at the right: Natural Earth land as 4,201 dots, five computed routes between real
  airports, seven airport pins, the Phosphor airplane on the Delhi–London route, and four airport codes as HTML tags. A CSS mask
  keeps it clear of the text column; it fades in over one second (opacity only).
- **The map is not shown below 900px** (the text spans the width there) and it is `loading="lazy"`, so phones never download it:
  264 KB on a phone, 309 KB on a desktop. From 900 to 1179px the card covers the map's eastern half, so only the London tag is
  shown there (the other three would sit under, or peek out from under, the card).
- **Reviews redesigned.** A Trustpilot summary beside the heading (the score, the green squares, the client's line “All 4 reviews
  rated 5 stars”, and the link to Trustpilot); three cards of one kind (rating and a mint quote mark, title, quote, then the
  reviewer's initials, name, country and date). The separate Trustpilot button under the grid is folded into the summary.
- **Reviewer names are 25px targets** (2px vertical padding) to meet the 24px minimum of WCAG 2.5.8.
- **“Be ready”: the action moved to the heading row** (right-aligned on desktop, full width on phones), so the fourth ticket is
  the same shape as the others; the section ground carries the same dot matrix in the brand teal at 16%.
- **No hover motion on things that are not links**: the tickets keep still; the Trustpilot summary (a link) answers hover.

New in v7:
- **The hero panel grows to 1640px** (`--panel-max`) with an 8–20px margin to the window (`--panel-m`); the page container grows
  from 1240 to 1320px (`--max`), and `.hero-main` takes the container's width inside the panel, so every left edge still lines
  up. Below 1280px the layout is as in v6 (the panel's margin differs by a pixel or two). From 1600 × 1000 the panel gets 54px
  above the headline (36px before).
- **The route map is drawn 2200 units wide.** `tools/build-route-map.mjs` keeps the projection and the routes of v6 and continues
  the dots eastwards (`WX = 2200`); the CSS places the 16:9 route box (`--s`: the panel up to 1320px) centred on the content and
  lets the rest run to the panel's edge. The airport tags' `--x` values are the script's new percentages. The “Be ready”
  texture is unchanged (byte-identical). The glow moved onto the map element so it follows the routes.
- **900–1179px: the map shows only above the card** (a second vertical mask), because there the text column reaches past the
  map's clear zone: at 1100px the end of the lead measured 4.3 : 1 on faint dots (a v6 gap; v6 measured eight widths, not
  1100). The lead's worst is now 4.9 : 1.
- **Reviews are tickets.** A Trustpilot ticket (the score on a surface stub, perforation, notches; one link) and three review
  tickets (stub with “TRUSTPILOT”, the green squares and a picture; perforation and notches; an orange topic label, title,
  quote; the reviewer with initials, linked name, country · date and a barcode). Upright and three across from 1100px, lying
  down from 640 to 1099px (as “Be ready”), upright in one column below. The markup stays `figure` > `blockquote` + `figcaption`
  (the caption is the figure's last child and the grid places it). Mint quote marks are gone (the stub carries the rating).
- **Three review pictures**, inline SVG built by `tools/build-review-art.py` from Tabler Icons (MIT, `@tabler/icons@3.52.0`) with
  the construction of the client's “Be ready” drawings (blocks, 2.4-unit ink line, white paper, one orange accent, the client's
  wobble filter). The build is idempotent and reproduces `index.html` byte for byte.
- **Topic labels** (*Visa appointment*, *Delivery time*, *Itinerary details*) are new copy: each names what that review is
  about. **Flag for sign-off.**
- The review rating's accessible name is now “Rated 5 out of 5” (the visible “Trustpilot” label precedes it). The unused
  quote-mark symbol was removed from the sprite (21 symbols).

v7.1 (client request):
- **The marquee's pause button is removed** and the logos are about 15% larger. Hover, keyboard focus, off-screen rest and the
  reduced-motion static row remain. Note for sign-off: without a visible pause control a looping animation longer than five
  seconds does not meet WCAG 2.2.2 (Pause, Stop, Hide) for pointer-less users who do not set reduced motion.

## 4. Reference gaps and assumptions

- **Airline logos** are the client's nine `.webp` files, copied unchanged (white marks, transparent background). The production strip paints them through CSS `mask-image`; the prototype uses `<img>` so the page also works when opened from disk (Chrome blocks file masks over `file://`). Sizes follow the production strip.
- **The saved page** shows the strip empty (its logos load from elsewhere), so the logo sizes and marquee settings were read from the production CSS in the export.
- **The map** uses Natural Earth's 1:110m land polygons (public domain), packaged by `world-atlas@2.0.2` (ISC) and projected with
  `d3-geo@3.1.1` (Equal Earth, rotated 40°) via `topojson-client@3.1.0`. At this scale very small islands are absent; the map is a
  decorative illustration, not a route network, and the airports (London, Lisbon, Istanbul, Dubai, Delhi, Bangkok, Singapore) are
  examples. `tools/build-route-map.mjs` rebuilds both SVG files; the pin positions it prints are the tags' `--x` / `--y` values.
- **No photograph remains.** v5's Unsplash photograph and its build script were removed from the repository.
- **Trustpilot widget:** external. The prototype draws the five green rating squares the client's reviews use (Trustpilot's brand green), keeps the wording and links, and shows 4 of 5 for the 4.0 score. The summary's two lines (“TrustScore 4.0 on Trustpilot”, “All 4 reviews rated 5 stars”) are the live hero's own wording, checked against the export.
- **Reviewers:** names, dates, titles and excerpts are as exported; the country codes are spelled out (IN → India, ES → Spain); the initials are derived from the names. No avatar photographs are invented.
- **Payment marks:** PayPal, Stripe, Visa and Mastercard are quiet monochrome marks (Simple Icons). **UPI has no mark in that library, so it is set as text** in the same chip.
- **Review dates** (Aug–Sep 2026) are reproduced exactly as they appear in the export.
- **Review pictures:** the client asked for professional vectors from a site in the “Be ready” style. Only package registries
  are reachable from the build sandbox, so the objects come from Tabler Icons on npm (Lucide, IconPark and Hugeicons were
  rendered side by side and compared); the licence text ships as `assets/LICENSE-Tabler-Icons-MIT.txt`.
- **Copy case:** headings and buttons stay in the client's sentence case; the Web Interface Guidelines suggest Title Case, which would change the brand voice. The input placeholder keeps the client's “City or airport…” (no example pattern).
- **Competitor:** observed for structure only (framed hero, ticket motif, a strip of promises). No layout, asset, photograph, colour or text was copied.
- **Error summary:** a failed submit shows inline errors and a summary line and moves focus to the first invalid field (the production behaviour). It does not add a separate focusable summary block.

## 5. Limitations

- Native `<input type="date">` shows the browser's locale format (e.g. mm/dd/yyyy in en-US). The validation message keeps the plugin's dd/mm/yyyy wording.
- Uses modern CSS: `:has()` (Chrome 105+, Safari 15.4+, Firefox 121+), `backdrop-filter` (the glass bar falls back to its translucent fill without it), `overflow: clip`, `text-wrap: balance` / `pretty` (progressive), and `inert` on the sticky bar.
- The route map is a desktop and large-tablet feature: below 900px it is not shown, so phones see the brand-teal gradient and its glow. It is an SVG, so it stays sharp at any pixel density.
- The map's mask needs `mask-composite` (and `-webkit-mask-composite` for Safari); where masks are not supported the map shows unmasked at the right of the panel, still behind the text column's plain left side.
- Demo airport data covers 140 airports. Unlisted airports show the “No airports found” state.
- Screen-reader behaviour was checked through the accessibility tree and axe-core, not with a physical screen reader.
- The preview server in `README.md` is optional: opening `index.html` from disk works (fonts preload only over http).

## 6. Porting to the WordPress block theme

- **Tokens:** the `:root` names are the production preset slugs (`heading`, `accent`, `deep`, `surface`, `cta` …) plus the section values listed in `DESIGN-SYSTEM.md`; copy them into `theme.json` (`settings.color.palette`) and the section stylesheets.
- **Booking form:** replace the markup of `wp-block-onwardsky-booking-form`. The behaviour layer maps onto the existing Interactivity API store (`state.fields`, `state.dates`, `state.trip`, `state.legCount`); add the `is-set` / `is-routed` class bindings and keep `handoff.js` for submit. Add the click-to-focus on field cells. The ticket and the card are the **same DOM**: `.ticket`, `.ticket-main` and `.stub` are `display: contents` below 1180px, so only the stylesheet changes between them.
- **Ticket notches:** painted with two `radial-gradient` backgrounds per half, not masks, so the suggestion list can overflow the ticket. Keep the halves' `--notch` (12px) and `--stub-w` (344px; 322px from 1180 to 1279px) variables together.
- **Hero panel:** a Group block with the panel gradient, plus the map as an image (or a Cover block with the SVG and no overlay). Keep the mask on the image: the contrast figures depend on the map staying clear of the text column. The four airport tags are absolutely positioned spans whose `--x` / `--y` come from the build script's output. In v7 the panel is `min(100% - 2 × --panel-m, --panel-max)` (1640px) and its inner group is the 1320px page container; the map box is sized by `--s` (the panel up to 1320px) and is 2200/1600 of it wide, so keep those three values together.
- **Proof bar, reviews, tickets:** register as block patterns. The review tickets are `figure` > stub, main (`blockquote`) and `figcaption` (the caption stays the figure's last child); the Trustpilot ticket is one link; the three review pictures are inline SVG in the pattern, like the “Be ready” illustrations. The “Be ready” illustrations are inline SVG in the pattern; the section's dotted texture is a CSS background (`world-dots.svg`).
- **Airline strip:** keep the existing strip block; add the pause button, the off-screen pause, a third set of logos for very wide screens and the reduced-motion static row.
- **Fonts:** none to add (Figtree is already the theme font).

## 7. QA performed (actual results)

### v7 (this round)

| Check | Result |
| --- | --- |
| Widths 2560, 1920, 1680, 1536, 1440, 1366, 1280, 1200, 1180, 1100, 1024, 1000, 900, 820, 768, 680, 660, 600, 560, 430, 390, 375, 360 | No horizontal overflow and no console error at any of them |
| Hero panel width | 1252px at 1280 · 1336 at 1366 · 1408 at 1440 · 1502 at 1536 · 1640 at 1680, 1920 and 2560 (v6: 1320 from 1350px up) |
| Booking CTA inside the first viewport | Bottom edge: 1920×1080 634px · 1536×864 613 · 1440×900 612 · 1366×768 603 · 1280×720 590 · 1200×800 577 · 1180×800 574 · 1100×800 631 · 1024×768 623 · 900×900 606 · 820×1180 756 · 768×1024 750 · 680×900 757 · 430×932 754 · 390×844 748 · 375×812 743 · 360×740 740 |
| Whole hero in the first viewport | Yes at 2560×1300 and 1920×1080 (the panel ends at 909px), 1440×900 (880px) and 900×900 |
| Contrast on the hero, measured on the rendered page at 14 widths (2560 to 360; text hidden, every pixel under each line box sampled, worst kept) | Headline 5.9 : 1 · “verifiable” 3.5 : 1 (large text, 3 : 1 needed) · lead 4.9 : 1 · inactive tabs 4.8 : 1 · glass bar 8.8 : 1 · assurances 6.9 : 1 · strip title 7.0 : 1 · airport tags 9.1 : 1. Before the 900–1179px mask: lead 4.3 : 1 at 1100px |
| Contrast, new review text (computed) | “TRUSTPILOT” / “TRUSTSCORE” muted on surface 5.7 : 1 · score accent on surface 5.6 : 1 · orange topic label on white 4.7 : 1 |
| Colour audit (`tools/palette-audit.js`) | 30 distinct colours painted, **none outside the production palette**; the pictures use heading, white, mint, peach, accent-bright and the orange text colour only |
| axe-core 4.10.2 (WCAG 2.1 A/AA + best practice) at 1440, 1024 and 390 | **0 violations**. “Incomplete” items are text on the hero gradient (measured above) and the stub labels next to the notches' pseudo-elements (computed above) |
| Booking form smoke test (1920, 1440, 390) | `del` and `bkk` give suggestions and set DEL → BKK; a date 20 days out; submit shows “Search ready”; Return shows the return date; Multi-city adds a third flight with the origin auto-filled; no overflow, no errors |
| Build scripts | `build-route-map.mjs` (v6 settings) reproduced the committed v6 SVGs byte for byte before the change; `build-sprite.py` and `build-review-art.py` reproduce `index.html` byte for byte |
| Page weight | 323 KB uncompressed at desktop (CSS 63, logos 50, HTML 50, route map 48, dot texture 42, JS 27 + 7, font 20, logo 12, payment marks 3); 274 KB on a phone (the map is lazy and hidden there) |
| Screenshots | The set in `screenshots/` was regenerated (13 viewports, the reviews at 1440 / 900 / 390, “Be ready”, the ticket, the 1024 band and the “After” half of both comparisons). The form, strip and mobile-menu state captures are from v6: those components did not change |

### v6 (kept for reference; the form, keyboard order and marquee did not change in v7)

| Check | Result |
| --- | --- |
| Widths 1920, 1440, 1366, 1280, 1200, 1180, 1100, 1024, 900, 820, 768, 680, 430, 390, 375, 360 | No horizontal overflow and no console error at any of them; captures in `screenshots/` |
| Booking CTA inside the first viewport | Bottom edge: 1440×900 612px · 1366×768 604 · 1280×720 591 · 1200×800 578 · 1180×800 575 · 1100×800 632 · 1024×768 624 · 900×900 607 · 820×1180 757 · 768×1024 751 · 680×900 757 · 430×932 754 · 390×844 748 · 375×812 743 · 360×740 740 |
| Whole hero (form, proof bar, logo strip) in the first viewport | Yes at 1440×900 (the panel ends at 892px) and at 1920×1080 |
| Console errors / failed requests | None over `http://` or `file://`; no broken images |
| Colour audit (`tools/palette-audit.js`) | 30 distinct colours painted (error state included, transitions settled); **none outside the production palette**. The map's SVG is drawn in white, aqua and accent-bright only |
| axe-core 4.10 (WCAG 2.1 A/AA + best practice) | **0 violations** in four states (desktop, mobile, validation errors, multi-city with open listbox), repeated runs, including after the final fixes. The single “incomplete” item is text over a gradient (the map tags, the headline), which axe cannot compute, so it was measured (next row) |
| Contrast on the hero (measured on the rendered page: text hidden, pixels under each line box sampled, worst case kept; widths 1440, 1280, 1180, 1024, 768, 680, 390, 360) | White headline ≥ 6.0 : 1 · lead ≥ 4.9 : 1 · aqua key word ≥ 3.5 : 1 (large text, 3 : 1 needed) · proof bar ≥ 10 : 1 · assurances ≥ 7.0 : 1 · inactive tabs ≥ 4.8 : 1 · strip title ≥ 6.8 : 1 · airport tags ≥ 8.8 : 1. The first map placement measured 3.1–3.7 : 1 for the lead and 1.1 : 1 for the aqua word on phones; it was moved and masked (see `DESIGN-RATIONALE.md` §9) |
| Keyboard | Tab order follows the visual order (header, trip tabs, From, swap, To, date, passengers, CTA, Trustpilot cell, pause button, Trustpilot summary, three reviewer links, “Be ready” CTA); every stop shows a visible ring (white on the panel); combobox ↑ ↓ Enter Esc; menu Escape returns focus |
| Functional | Validation messages, 10-day minimum, return and multi-city rules, auto-fill, swap, add/remove flights, suggestion list over the proof bar (not clipped by the notches), sticky bar focus hand-off, click anywhere in a field cell |
| Marquee | Moves at ~34px/s; the pause button, hover pause, resume and the off-screen pause were verified; `prefers-reduced-motion` gives a static one-row set with duplicates removed and no control |
| Impeccable detector (live page, 1440 / 1280 / 768 / 390) | Desktop findings: “cyan gradient” ×3 (the client's brand teal, hue ≈ 185°, is read as cyan; accepted because the brief fixes the palette), two “nested cards” (the ticket halves and the glass bar sit on the hero panel by design) and “marquee” (requested; pausable); one advisory, “repeating stripes” (the client's barcode bar). The design-system lint (radius, type, colour) is clean after replacing a `#000` in the mask with the white token. The static scan adds false positives (the gradient-painted ticket halves read as text on the panel; “cramped padding” for the booking card's foot and the “Be ready” section edge) |
| Impeccable first-viewport gate | Pass at 1440×900 and 390×844 (thesis fully visible, primary action wholly inside and answering a click); the price is client copy, so `--figures-supplied` |
| Page weight | 309 KB uncompressed at desktop (route map 46, dot texture 43, CSS 58, HTML 47, JS 35, font 20, logos 52); 264 KB on a phone (the map is lazy and hidden, so it is never requested) |
| Design-review metrics (1440 / 768 / 375) | No horizontal overflow; review cards equal height per row (358px at 1440); quotes about 42 characters per line (the full-width third card at 768 about 72); the only targets under 24px were the reviewer names (21px), now 25px |

## 8. Skills used

**v7:** the five design skills of the earlier rounds were installed in an earlier session and were not available in this one, so
this round's checks were run directly with Playwright scripts: overflow and console at 23 widths, the palette audit, axe-core
4.10.2, the pixel-sampled hero contrast at 14 widths, the booking form smoke test and the CTA and panel measurements above.

**v6:**

All five requested skills were installed from their official repositories into `~/.claude/skills/` and confirmed
discovered by a fresh Claude Code process in round 1. In round 6 (vector-only hero, reviews, “Be ready”):

- **frontend-design:** an art-direction check against the skill's guidance (re-read this round). The hero opens with the most
  characteristic thing in the subject's world (routes between real airports beside a boarding pass); one family of type; the
  boldness is spent in one place (the map and the ticket), the sections below stay quiet. Its warning that hover transitions on
  every card read as generated **removed the hover lift from the “Be ready” tickets**, which are not links. Two of its “template
  tells” were reviewed and **kept on purpose** because they are the client's own: the one aqua word in the headline and the
  middle dot in review meta (“India · Sep 28, 2026”; the live page uses “IN · Sep 28, 2026”).
- **impeccable:** the surface brief and direction contract, `DESIGN.md` and `.impeccable/design.json` were rewritten for v6; the
  detector (live at four viewports and static), the design-system lint and the first-viewport gate (pass at 1440×900 and
  390×844, `--figures-supplied` because the price is client copy) were run. No new critique run in this round.
- **design-review:** captures at 1440, 768 and 375, the accessibility tree and the checklist metrics (type scale, line length,
  card heights, target sizes, overflow). Findings fixed: the map under the text (measured), the black quote marks, and the
  reviewer links under 24px. The skill normally drives Playwright through MCP; the same steps were run with Playwright scripts.
- **web-design-guidelines:** a pass over the new markup and styles against the bundled rules: the map is `alt=""` inside an
  `aria-hidden` wrapper, with explicit dimensions and `loading="lazy"`; airport codes carry `translate="no"`; decorative icons are
  `aria-hidden`; review quotes use curly quotes; headings use `text-wrap: balance`; no `transition: all`; reduced motion makes the
  map's fade instant. No violations. Sentence case is kept (the guidelines suggest Title Case; it would change the brand voice).
- **ui-ux-pro-max:** searches on review and rating sections (“Product Review/Ratings Focused”: an aggregate rating before the
  individual reviews, the CTA after the social proof, which is the order v6 uses; its advice to show reviewer photos was not
  followed, because none exist and none were invented; its gold stars were not followed, because Trustpilot's mark is green) and
  on target size (web: 24 CSS px with WCAG exceptions, which led to the reviewer-link fix). A search for map or illustrated hero
  backgrounds found no match in its database.

**Substitutions and limits, disclosed:**
- Impeccable's concept roll (its service is unreachable from the sandbox) was not run; the direction came from the client's
  feedback, the current site and the competitor.
- design-review normally drives Playwright through MCP; the same steps were run with Playwright scripts.
- The competitor and the client's own site were studied from the saved pages the client supplied (the live sites are not
  reachable from the sandbox).
- The map data and libraries came from the npm registry (`world-atlas`, `d3-geo`, `topojson-client`) and the airplane from the
  Phosphor package already used for the icons; no image host was needed in this round.
- The Vercel deployment is checked by fetching it through the Vercel tools; a visual check of the live URL in a browser is not
  possible from the sandbox.
