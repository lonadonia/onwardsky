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

## 4. Reference gaps and assumptions

- **Airline logos** are external production files (`/wp-content/themes/onwardsky/assets/images/airlines/*.webp`), so they were missing from the export. The prototype shows the same nine airlines as IATA-coded names; the official logo masks can be swapped into the identifier slots if preferred.
- **Trustpilot widget and stars** are external. The prototype draws its own stars and keeps the wording and links.
- **Payment marks** are shown as neutral text chips rather than reproducing brand logos.
- **Review dates** (Aug–Sep 2026) are reproduced exactly as they appear in the export.
- **Screenshot vs export:** the provided screenshot was used to restore the missing assets' intent (airline strip, star widget, illustration style).
- **Fonts:** Archivo (display) is new to the brand. Figtree (body/UI) is the production face. Both are SIL OFL and self-hosted, with licences in `assets/fonts/`.

## 5. Limitations

- Native `<input type="date">` shows the browser's locale format (e.g. mm/dd/yyyy in en-US). The validation message keeps the plugin's dd/mm/yyyy wording.
- Uses modern CSS:
  - `:has()` for the route-group error border (Chrome 105+, Safari 15.4+, Firefox 121+).
  - Subgrid for journey row alignment (falls back to plain stacking).
  - `text-wrap: balance` (progressive).
  - `inert` on the sticky bar.
- Demo airport data covers 140 airports. Unlisted airports show the “No airports found” state.
- Screen-reader behaviour was checked through the accessibility tree and axe-core, not with a physical screen reader.

## 6. Porting to the WordPress block theme

- **Tokens:** copy the `:root` tokens into `theme.json` (`settings.color.palette`, `settings.typography`, `settings.spacing`). The color slugs map one-to-one to the existing presets (accent, deep, cta, surface…).
- **Booking console:** replace the block's markup in `wp-block-onwardsky-booking-form`. The behaviour layer maps onto the existing Interactivity API store:
  - `state.fields`, `state.dates`, `state.trip` and `state.legCount` already exist.
  - Add the `is-set` / `is-routed` class bindings (`data-wp-class--is-set`, `data-wp-class--is-routed`) and keep `handoff.js` for submit.
- **Night band and journey:** register them as block patterns. The vignettes are inline SVG and need no assets.
- **Fonts:** add Archivo to the theme's font collection (`theme.json` `fontFace`) and keep preloading the two WOFF2 files.

## 7. QA performed (actual results)

| Check | Result |
| --- | --- |
| Breakpoints 1440, 1280, 1024, 768, 390, 375 | No horizontal overflow; captures in `screenshots/` |
| CTA above the fold | 1440×900: 617px · 1280×720: 602px · 1024×768: 686px · 768×1024: 744px · 390×844: 792px · 375×812: 786px |
| Console errors / failed requests | None over `http://` or `file://` |
| axe-core 4.10 (WCAG 2.1 A/AA + best practice) | **0 violations** in four states (desktop, mobile, validation errors, multi-city with open listbox). “Incomplete” items are text over the SVG chart, verified manually at 8.3–14:1 |
| Keyboard | Full tab order follows visual order; every stop has visible focus; combobox ↑ ↓ Enter Esc; menu Escape returns focus |
| Reduced motion | Graticule and route render in their final state; scroll-to-form jumps |
| Functional | Validation messages, 10-day minimum, return/multi-city rules, auto-fill, swap, add/remove flights, sticky bar focus hand-off |
| Impeccable detector | Overused-font, flat-hierarchy and stripe findings fixed. 3 remaining “cramped padding” items are static-analysis false positives (padding comes from `clamp()`-based containers) |
| Impeccable first-viewport gate | Pass at 1440×900 and 390×844 (thesis visible, primary action in view and responsive) |

## 8. Skills used

All five requested skills were installed from their official repositories into `~/.claude/skills/`:

- `frontend-design` (anthropics/skills)
- `ui-ux-pro-max` (nextlevelbuilder/ui-ux-pro-max-skill)
- `impeccable` (pbakaus/impeccable)
- `design-review` (AslanMazhidov/design-review-skill)
- `web-design-guidelines` (vercel-labs/agent-skills)

A fresh Claude Code process confirmed all five were discovered, and each was invoked during the work:

- **frontend-design:** art-direction principles, the two-pass plan and self-critique.
- **ui-ux-pro-max:** design-system query, typography/landing/UX searches and form accessibility rules. Its generic blue palette was overruled by the brand.
- **impeccable:**
  - `context`, `init` → `PRODUCT.md`, and the concept roll (seed `9e5708a9b0030f67`).
  - Direction contract, craft floor and detector.
  - First-viewport gate, finish review, and documenter → `DESIGN.md` + `.impeccable/design.json`.
- **design-review:** desktop/tablet/mobile captures, accessibility snapshot and checklist audit. Fixes were applied and re-verified.
- **web-design-guidelines:** a full rule pass with `file:line` findings. All mechanical items were fixed; intentional deviations are listed in the rationale.

**Substitutions, disclosed:**
- The impeccable concept roll ran degraded because its service was unreachable from the sandbox, so there were no catalog challengers.
- Impeccable's finish-reviewer and documenter subagents ship with its plugin installer, not with the skill folder, so their documented in-thread fallbacks were used.
- design-review normally drives Playwright through MCP. The same steps were run with Playwright scripts.
