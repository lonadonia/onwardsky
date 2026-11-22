# Implementation notes (v3)

## 1. What is real, what is simulated

| Area | Prototype behaviour | Production behaviour |
| --- | --- | --- |
| Trip types, multi-city 2–6 flights, swap, next-flight auto-fill | **Real**, same rules as the production block | Same |
| Validation rules and messages | **Real**: copied from the plugin (`onwardsky_itinerary` v1.7.1) | Same |
| Earliest date | **Real**: today + 10 days in `Asia/Kolkata`, recomputed in the browser | Same |
| Airport search | **Demo data**: 140 major airports in `assets/js/airports.js` with a local ranking (code → city → alias → country) | Plugin dataset (`airports-data.js`) + `airport-search.js` ranking, loaded on first focus |
| Submit | **Stops at a “Search ready” confirmation.** No redirect, no network request | Hands off to `/flight-booking-wizard/` via `handoff.js`; the wizard and checkout re-validate and re-quote |
| Prices, payment and checkout | Static copy (“From $9.99”, payment names) | Quoted by the wizard |
| Airline strip | **Real marquee** (CSS animation) of the client's nine logo files, with a pause control | The production strip already scrolls (46s, hover pause); only the control is new |
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
- **The whole field cell is clickable:** a click on a cell's padding focuses its control (date cells already did; found in the v3 design review).
- **Phones:** the card title “Choose your route” is visually hidden (the form keeps it as its accessible name) so the whole form and CTA fit the first viewport.

New in v3:
- **Pause/play button on the logo strip** (WCAG 2.2.2) and a static logo row under `prefers-reduced-motion`. Production only pauses on hover.
- **“Be ready” in two equal columns** (production: 7fr / 5fr), top-aligned copy, 12px stub labels, a CTA that never wraps, a compact stub on phones, a semantic list and a slide-in on scroll.
- **The three promises** moved from the hero's left column into a boarding-pass strip under the form (same words).
- **Errors in the production pressed-orange** on its peach wash (v2 used red).
- **Reviews:** the production trio at equal widths; the carousel arrows are removed because three cards fit.
- **`autocomplete="off"`** on the date and passenger controls (non-auth fields).

## 4. Reference gaps and assumptions

- **Airline logos** are the client's nine `.webp` files, copied unchanged (white marks, transparent background). The production strip paints them through CSS `mask-image`; the prototype uses `<img>` so the page also works when opened from disk (Chrome blocks file masks over `file://`). Sizes follow the production strip.
- **The saved page** shows the strip empty (its logos load from elsewhere), so the logo sizes and marquee settings were read from the production CSS in the export.
- **Hero art:** the dotted globe and plane are cut from the client's own hero image; the globe is 178 KB, the largest asset on the page (about 49 KB gzipped).
- **Trustpilot widget:** external. The prototype draws the five green rating squares the client's reviews use (Trustpilot's brand green), keeps the wording and links, and shows 4 of 5 on the hero line for the 4.0 score.
- **Payment marks:** PayPal, Stripe, Visa and Mastercard are quiet monochrome marks (Simple Icons). **UPI has no mark in that library, so it is set as text** in the same chip.
- **Review dates** (Aug–Sep 2026) are reproduced exactly as they appear in the export.
- **The decorative quote glyph** on the review cards is a straight `"` in italic (aria-hidden), as on the production page, so it is not a curly quote.
- **Copy case:** headings and buttons stay in the client's sentence case; the Web Interface Guidelines suggest Title Case, which would change the brand voice.
- **Competitor:** observed for structure only (framed hero, ticket motif, a strip of three promises). No layout, asset, colour or text was copied.
- **Illustration:** the four “Be ready” drawings are the client's; v2's stock illustration is gone.

## 5. Limitations

- Native `<input type="date">` shows the browser's locale format (e.g. mm/dd/yyyy in en-US). The validation message keeps the plugin's dd/mm/yyyy wording.
- Uses modern CSS: `:has()` for the route-group error border (Chrome 105+, Safari 15.4+, Firefox 121+), `overflow: clip`, gradient `mask-image`, `text-wrap: balance` / `pretty` (progressive), and `inert` on the sticky bar.
- Demo airport data covers 140 airports. Unlisted airports show the “No airports found” state.
- Screen-reader behaviour was checked through the accessibility tree and axe-core, not with a physical screen reader.
- The preview server in `README.md` is optional: opening `index.html` from disk works (fonts preload only over http).

## 6. Porting to the WordPress block theme

- **Tokens:** the `:root` names are the production preset slugs (`heading`, `accent`, `deep`, `surface`, `cta` …) plus the section values listed in `DESIGN-SYSTEM.md`; copy them into `theme.json` (`settings.color.palette`) and the section stylesheets.
- **Booking card:** replace the markup of `wp-block-onwardsky-booking-form`. The behaviour layer maps onto the existing Interactivity API store (`state.fields`, `state.dates`, `state.trip`, `state.legCount`); add the `is-set` / `is-routed` class bindings and keep `handoff.js` for submit. Add the click-to-focus on field cells.
- **Hero panel, proof ticket, reviews, tickets:** register as block patterns. The “Be ready” illustrations are inline SVG in the pattern; the globe and plane are plain SVG files.
- **Airline strip:** keep the existing strip block; add the pause button, a third set of logos for very wide screens and the reduced-motion static row.
- **Fonts:** none to add (Figtree is already the theme font).

## 7. QA performed (actual results)

| Check | Result |
| --- | --- |
| Widths 1440, 1280, 1024, 768, 390, 375 | No horizontal overflow; captures in `screenshots/` |
| Booking CTA inside the first viewport | 1440×900: 527px · 1280×720: 507px · 1024×768: 504px · 768×1024: 769px · 390×844: 729px · 375×812: 724px |
| Whole hero (card, proof strip, logo strip) in the first viewport | Yes at 1440×900 |
| Console errors / failed requests | None over `http://` or `file://`; no broken images |
| Colour audit (`tools/palette-audit.js`) | 34 distinct colours painted; all are in the production palette (3 flagged values are artefacts, explained in `DESIGN-SYSTEM.md`) |
| axe-core 4.10 (WCAG 2.1 A/AA + best practice) | **0 violations** in four states (desktop, mobile, validation errors, multi-city with open listbox), three consecutive runs. The one “incomplete” item per run is the headline's accent word over the panel gradient, verified by calculation (5.8:1 against a 3:1 requirement for large text) |
| Keyboard | Tab order follows the visual order (header, trust line, trip tabs, From, swap, To, date, passengers, CTA, pause button, review links, “Be ready” CTA); every stop shows visible focus; combobox ↑ ↓ Enter Esc; menu Escape returns focus |
| Functional | Validation messages, 10-day minimum, return and multi-city rules, auto-fill, swap, add/remove flights, suggestion list on top of the proof strip (not clipped), sticky bar focus hand-off, click anywhere in a field cell |
| Marquee | Moves at ~34px/s; pause button, hover pause and resume verified; `prefers-reduced-motion` gives a static one-row set with duplicates removed and no control |
| Impeccable detector | All design-system findings cleared (colour, radius, type ramp). Four findings remain and are accepted: “cramped padding” on the Be ready section (static-analysis false positive: padding comes from `clamp()` containers), “nested cards” (the booking card and proof strip sit on the hero panel by design), “marquee” (requested; pausable) and “repeating stripes” (the client's barcode bar) |
| Impeccable first-viewport gate | Pass at 1440×900 and 390×844 (thesis visible, primary action in view and answering a click); the price is client copy, so `--figures-supplied` |
| Page weight | About 383 KB uncompressed for everything the page can request (globe 178 KB, CSS 49 KB, JS 34 KB, font 20 KB, logos 52 KB) |

## 8. Skills used

All five requested skills were installed from their official repositories into `~/.claude/skills/` and confirmed
discovered by a fresh Claude Code process in round 1. In this round:

- **impeccable:** the surface brief and direction contract were rewritten for v3; the detector and first-viewport gate were run; `DESIGN.md` and `.impeccable/design.json` were regenerated and then drive the design-system lint.
- **design-review:** captures at 1440, 768 and 375, the accessibility tree, and the checklist audit (type scale and line length, contrast, rhythm, composition, targets, polish). Findings fixed: field cells now focus on a click of their padding; the pause button, nav links and logo link reach 44px hit areas.
- **web-design-guidelines:** a full pass with the bundled rules; findings fixed: `autocomplete="off"` on date and passenger controls. Known and intentional: the decorative straight-quote glyph and the client's sentence-case copy.
- **ui-ux-pro-max:** UX-guideline searches for auto-rotating content controls (play/pause, hover stop, reduced motion: all present), inline error placement and form feedback.
- **frontend-design:** the art-direction pass: one visual idea (the ticket) carried from hero to last section instead of templated cards.

**Substitutions, disclosed:**
- Impeccable's concept roll (its service is unreachable from the sandbox) was not run; the direction came from the client's feedback, the current site and the competitor.
- design-review normally drives Playwright through MCP; the same steps were run with Playwright scripts.
- The competitor and the client's own site were studied from the saved pages the client supplied (the live sites are not reachable from the sandbox).
