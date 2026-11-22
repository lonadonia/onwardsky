# Implementation notes

## 1. What is real, what is simulated

| Area | Prototype behaviour | Production behaviour |
| --- | --- | --- |
| Trip types, multi-city 2–6 flights, swap, next-flight auto-fill | **Real**, same rules as the production block | Same |
| Validation rules and messages | **Real**: copied from the plugin (`onwardsky_itinerary` v1.7.1) | Same |
| Earliest date | **Real**: today + 10 days in `Asia/Kolkata`, recomputed in the browser | Same |
| Airport search | **Demo data**: 140 major airports in `assets/js/airports.js` with a local ranking (code → city → alias → country) | Plugin dataset (`airports-data.js`) + `airport-search.js` ranking, loaded on first focus |
| Submit | **Stops at a “Search ready” confirmation.** No redirect, no network request | Hands off to `/flight-booking-wizard/` via `handoff.js`; the wizard and checkout re-validate and re-quote |
| Prices, payment and checkout | Static copy (“From $9.99”, payment names) | Quoted by the wizard |
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

## 3. Deliberate small improvements (flag for product sign-off)

- **First suggestion pre-highlighted:** Enter picks it. Production starts with none highlighted.
- **Exact matches accepted on blur:** typing an exact code or city and leaving the field selects it (e.g. `DEL`), instead of erroring on submit.
- **Visible summary line:** “Please check the highlighted fields.” is shown on screen as well as announced.
- **Visible empty state:** “No airports found” now appears on screen; production only announced it.
- **Date picker from the whole cell:** clicking anywhere on a date cell opens the native picker.
- **Phones:** the card title “Choose your route” is visually hidden (the form keeps it as its accessible name) so the whole form and CTA fit the first viewport at 375×812.

## 4. Reference gaps and assumptions

- **Airline marks** come from the Soaring Symbols library (monochrome files, white on the band). They are trademarks of their owners; production should keep the client's own licensed files (see `assets/SOURCES.md`). **SriLankan Airlines is named on the production site but is not in the library**, so eight of the nine named airlines are shown. The client should supply that asset.
- **Trustpilot widget and stars** are external. The prototype draws its own stars (Phosphor), keeps the wording and links, and uses the Simple Icons Trustpilot glyph only to label the link.
- **Payment marks:** PayPal, Stripe, Visa and Mastercard are shown as quiet monochrome marks (Simple Icons). **UPI has no mark in that library, so it is set as text** in the same chip.
- **Review dates** (Aug–Sep 2026) are reproduced exactly as they appear in the export. Reviewer avatars are the reviewers' initials, not photos.
- **Screenshot vs export:** the provided screenshot was used to restore the intent of assets missing from the export (airline strip, star widget).
- **Fonts:** Manrope (display) is new to the brand; Figtree (body/UI) is the production face. Both are SIL OFL and self-hosted, with licences in `assets/fonts/`.
- **Illustration** is generic stock (unDraw), recolored. If the client wants bespoke art later, the slots are the hero traveler, the reviews header and the four moments.

## 5. Limitations

- Native `<input type="date">` shows the browser's locale format (e.g. mm/dd/yyyy in en-US). The validation message keeps the plugin's dd/mm/yyyy wording.
- Uses modern CSS:
  - `:has()` for the route-group error border (Chrome 105+, Safari 15.4+, Firefox 121+).
  - Subgrid for aligning the four moments (falls back to plain stacking).
  - `text-wrap: balance` / `pretty` (progressive).
  - `inert` on the sticky bar.
- Demo airport data covers 140 airports. Unlisted airports show the “No airports found” state.
- Screen-reader behaviour was checked through the accessibility tree and axe-core, not with a physical screen reader.

## 6. Porting to the WordPress block theme

- **Tokens:** copy the `:root` tokens into `theme.json` (`settings.color.palette`, `settings.typography`, `settings.spacing`). The color slugs map to the existing presets (accent, deep, cta, surface…).
- **Booking card:** replace the markup of `wp-block-onwardsky-booking-form`. The behaviour layer maps onto the existing Interactivity API store:
  - `state.fields`, `state.dates`, `state.trip` and `state.legCount` already exist.
  - Add the `is-set` / `is-routed` class bindings (`data-wp-class--is-set`, `data-wp-class--is-routed`) and keep `handoff.js` for submit.
- **Hero, band, reviews, moments:** register as block patterns. Illustrations and marks are plain SVG files (`assets/vectors`, `assets/airlines`, `assets/brands`); the icon sprite is inline.
- **Fonts:** add Manrope to the theme's font collection (`theme.json` `fontFace`) and keep preloading the two WOFF2 files.

## 7. QA performed (actual results)

| Check | Result |
| --- | --- |
| Widths 1440, 1280, 1024, 768, 390, 375 | No horizontal overflow; captures in `screenshots/` |
| Booking CTA inside the first viewport | 1440×900: 597px · 1280×720: 534px · 1024×768: 534px · 768×1024: 884px · 390×844: 785px · 375×812: 777px |
| Console errors / failed requests | None over `http://` or `file://` |
| axe-core 4.10 (WCAG 2.1 A/AA + best practice) | **0 violations** in four states (desktop, mobile, validation errors, multi-city with open listbox). The one “incomplete” item per run is text over decorative art, verified by calculation (ink-2 on the hero stage 8.6:1, white on deep teal 8.5:1) |
| Keyboard | Tab order follows the visual order; every stop shows visible focus; combobox ↑ ↓ Enter Esc; menu Escape returns focus |
| Functional | Validation messages, 10-day minimum, return and multi-city rules, auto-fill, swap, add/remove flights, suggestion list on top of other controls (not clipped), sticky bar focus hand-off |
| Impeccable detector | All design-system and hierarchy findings cleared. 4 “cramped padding” findings remain: static-analysis false positives (padding comes from `clamp()`-based containers; verified visually) |
| Impeccable first-viewport gate | Pass at 1440×900 and 390×844 (thesis visible, primary action in view and responsive) |
| Page weight | About 316 KB uncompressed for everything the page can request, fonts included (44 KB) |

## 8. Skills used

All five requested skills were installed from their official repositories into `~/.claude/skills/` and confirmed
discovered by a fresh Claude Code process. Across both rounds:

- **frontend-design:** art-direction principles and the plan-then-critique process.
- **ui-ux-pro-max:** design-system query and typography, landing and form-accessibility searches. Its generic blue palette was overruled by the brand.
- **impeccable:** `context`, `init` → `PRODUCT.md`, the direction contract, craft floor, detector, first-viewport gate, finish review and documenter → `DESIGN.md` + `.impeccable/design.json`.
- **design-review:** desktop/tablet/mobile captures, accessibility snapshot and checklist audit.
- **web-design-guidelines:** a full rule pass; mechanical findings fixed.

**Substitutions, disclosed:**
- Impeccable's concept roll ran degraded because its service is unreachable from the sandbox (no catalog challengers).
- Impeccable's finish-reviewer and documenter subagents ship with its plugin installer, not the skill folder, so their documented in-thread fallbacks were used.
- design-review normally drives Playwright through MCP; the same steps were run with Playwright scripts.
- Most vector sites (unDraw, SVG Repo, Iconify, Wikimedia) are blocked from the sandbox. Their content was fetched through the npm packages that mirror them (`undraw-svg`, `@phosphor-icons/core`, `soaring-symbols`, `simple-icons`); see `tools/README.md`.
