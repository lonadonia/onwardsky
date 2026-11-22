# Implementation notes (v5)

## 1. What is real, what is simulated

| Area | Prototype behaviour | Production behaviour |
| --- | --- | --- |
| Trip types, multi-city 2–6 flights, swap, next-flight auto-fill | **Real**, same rules as the production block | Same |
| Validation rules and messages | **Real**: copied from the plugin (`onwardsky_itinerary` v1.7.1) | Same |
| Earliest date | **Real**: today + 10 days in `Asia/Kolkata`, recomputed in the browser | Same |
| Airport search | **Demo data**: 140 major airports in `assets/js/airports.js` with a local ranking (code → city → alias → country) | Plugin dataset (`airports-data.js`) + `airport-search.js` ranking, loaded on first focus |
| Submit | **Stops at a “Search ready” confirmation.** No redirect, no network request | Hands off to `/flight-booking-wizard/` via `handoff.js`; the wizard and checkout re-validate and re-quote |
| Prices, payment and checkout | Static copy (“From $9.99”, payment names) | Quoted by the wizard |
| Hero photograph | **Static image**, decorative (an Unsplash photograph graded to the brand; nothing is generated from the form) | A Cover block or a pattern with the same image and overlay |
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
- **A white focus ring on the Trustpilot cell** (the brand-teal ring would vanish on the photograph).

New in v5:
- **The hero is photographic.** One aerial photograph of an airliner's wing against a sunset, graded to the brand, under two brand-teal veils (see `DESIGN-SYSTEM.md` §5). The v4 sample itinerary pages, “Verifiable PNR” badge, dotted globe, plane and glows are removed, along with their files.
- **One glass proof bar** replaces the four separate chips (same words, same Trustpilot link); its last cell sizes to its content.
- **The header collapses to the menu below 1200px** (was 1080px): at 1100px two nav links wrapped onto two lines.
- **In the two-column band (900–1179px) the card starts 44–84px lower** so the sunset stays visible above it.
- **A phone gets its own crop** of the photograph (`<picture>`, 20 KB) and a top-down veil; the page is 236 KB on a phone and 260 KB on a desktop (it was 467 KB in v4).
- **The photograph fades in** (opacity only) over one second; text never fades.

## 4. Reference gaps and assumptions

- **Airline logos** are the client's nine `.webp` files, copied unchanged (white marks, transparent background). The production strip paints them through CSS `mask-image`; the prototype uses `<img>` so the page also works when opened from disk (Chrome blocks file masks over `file://`). Sizes follow the production strip.
- **The saved page** shows the strip empty (its logos load from elsewhere), so the logo sizes and marquee settings were read from the production CSS in the export.
- **The hero photograph** is Unsplash `photo-1506012787146-f92b2d7d6d96` (Unsplash License). **The photographer's name is not recorded**: Unsplash's pages sit behind an anti-bot challenge and its files carry no embedded credit, so the name could not be read from the sandbox. The licence does not require a credit; add one before production if the client wants it (a reverse lookup of the id on unsplash.com finds the page).
- **The grade** is one edit (a split tone in `heading` and `deep`); there is no retouching, no text, no logos and no people in the frame. `tools/build-hero-photo.py` reproduces both WebP files from the downloaded original.
- **Trustpilot widget:** external. The prototype draws the five green rating squares the client's reviews use (Trustpilot's brand green), keeps the wording and links, and shows 4 of 5 for the 4.0 score.
- **Payment marks:** PayPal, Stripe, Visa and Mastercard are quiet monochrome marks (Simple Icons). **UPI has no mark in that library, so it is set as text** in the same chip.
- **Review dates** (Aug–Sep 2026) are reproduced exactly as they appear in the export.
- **The decorative quote glyph** on the review cards is a straight `"` in italic (aria-hidden), as on the production page.
- **Copy case:** headings and buttons stay in the client's sentence case; the Web Interface Guidelines suggest Title Case, which would change the brand voice. The input placeholder keeps the client's “City or airport…” (no example pattern).
- **Competitor:** observed for structure only (framed hero, ticket motif, a strip of promises). No layout, asset, photograph, colour or text was copied.
- **Error summary:** a failed submit shows inline errors and a summary line and moves focus to the first invalid field (the production behaviour). It does not add a separate focusable summary block.

## 5. Limitations

- Native `<input type="date">` shows the browser's locale format (e.g. mm/dd/yyyy in en-US). The validation message keeps the plugin's dd/mm/yyyy wording.
- Uses modern CSS: `:has()` (Chrome 105+, Safari 15.4+, Firefox 121+), `backdrop-filter` (the glass bar falls back to its translucent fill without it), `overflow: clip`, `text-wrap: balance` / `pretty` (progressive), and `inert` on the sticky bar.
- The photograph is a 2000px raster: on a 2× desktop display it is scaled about 1.3×, which the haze of the sky and the veils hide. Below 900px it is subdued on purpose (the text spans the width), so the photographic hero is a desktop and large-tablet feature.
- Demo airport data covers 140 airports. Unlisted airports show the “No airports found” state.
- Screen-reader behaviour was checked through the accessibility tree and axe-core, not with a physical screen reader.
- The preview server in `README.md` is optional: opening `index.html` from disk works (fonts preload only over http).

## 6. Porting to the WordPress block theme

- **Tokens:** the `:root` names are the production preset slugs (`heading`, `accent`, `deep`, `surface`, `cta` …) plus the section values listed in `DESIGN-SYSTEM.md`; copy them into `theme.json` (`settings.color.palette`) and the section stylesheets.
- **Booking form:** replace the markup of `wp-block-onwardsky-booking-form`. The behaviour layer maps onto the existing Interactivity API store (`state.fields`, `state.dates`, `state.trip`, `state.legCount`); add the `is-set` / `is-routed` class bindings and keep `handoff.js` for submit. Add the click-to-focus on field cells. The ticket and the card are the **same DOM**: `.ticket`, `.ticket-main` and `.stub` are `display: contents` below 1180px, so only the stylesheet changes between them.
- **Ticket notches:** painted with two `radial-gradient` backgrounds per half, not masks, so the suggestion list can overflow the ticket. Keep the halves' `--notch` (12px) and `--stub-w` (344px; 322px from 1180 to 1279px) variables together.
- **Hero panel:** a Cover block (the graded image, a fixed focal point, an overlay) or a pattern. The two veils are plain gradients over the image (`.hero-art::after`); keep them, because the contrast figures depend on them. Use the portrait crop for narrow viewports.
- **Proof bar, reviews, tickets:** register as block patterns. The “Be ready” illustrations are inline SVG in the pattern.
- **Airline strip:** keep the existing strip block; add the pause button, the off-screen pause, a third set of logos for very wide screens and the reduced-motion static row.
- **Fonts:** none to add (Figtree is already the theme font).

## 7. QA performed (actual results)

| Check | Result |
| --- | --- |
| Widths 1920, 1440, 1366, 1280, 1200, 1180, 1100, 1024, 900, 820, 768, 680, 430, 390, 375, 360 | No horizontal overflow and no console error at any of them; captures in `screenshots/` |
| Booking CTA inside the first viewport | Bottom edge: 1440×900 612px · 1366×768 604 · 1280×720 591 · 1200×800 578 · 1180×800 575 · 1100×800 632 · 1024×768 624 · 900×900 607 · 820×1180 757 · 768×1024 751 · 680×900 757 · 430×932 754 · 390×844 748 · 375×812 743 · 360×740 740 |
| Whole hero (form, proof bar, logo strip) in the first viewport | Yes at 1440×900 (the panel ends at 892px) and at 1920×1080 |
| Console errors / failed requests | None over `http://` or `file://`; no broken images |
| Colour audit (`tools/palette-audit.js`) | 32 distinct colours painted (error state included, transitions settled); **none outside the production palette** (three consecutive runs). Pixels inside the photograph are not audited |
| axe-core 4.10 (WCAG 2.1 A/AA + best practice) | **0 violations** in four states (desktop, mobile, validation errors, multi-city with open listbox), repeated runs. The single “incomplete” item is the text over the photograph, which axe cannot compute, so it was measured (next row) |
| Contrast on the photograph (measured on the rendered page: text hidden, pixels under each line box sampled, worst case kept; widths 1440, 1280, 1180, 1024, 768, 680, 390, 360) | White headline ≥ 5.6 : 1 (≥ 8.3 on desktop) · lead ≥ 4.85 : 1 · aqua key word ≥ 4.85 : 1 on desktop, ≥ 3.3 : 1 on tablet and phone (large text, 3 : 1 needed) · proof bar ≥ 10 : 1 · assurances ≥ 9.2 : 1 · inactive tabs ≥ 6.2 : 1 · strip title ≥ 6.8 : 1. A first veil measured 2.5–3.4 : 1 for the lead and was reshaped |
| Keyboard | Tab order follows the visual order (header, trip tabs, From, swap, To, date, passengers, CTA, Trustpilot cell, pause button, review links, “Be ready” CTA); every stop shows a visible ring (white on the photograph); combobox ↑ ↓ Enter Esc; menu Escape returns focus |
| Functional | Validation messages, 10-day minimum, return and multi-city rules, auto-fill, swap, add/remove flights, suggestion list over the proof bar (not clipped by the notches), sticky bar focus hand-off, click anywhere in a field cell |
| Marquee | Moves at ~34px/s; the pause button, hover pause, resume and the off-screen pause were verified; `prefers-reduced-motion` gives a static one-row set with duplicates removed and no control |
| Impeccable detector (live page, 1440 / 1280 / 768 / 390) | Four findings at desktop: one “cyan gradient” (the client's brand teal, hue ≈ 185°, is read as cyan; accepted because the brief fixes the palette and the production strip already uses this gradient), two “nested cards” (the ticket halves and the glass bar sit on the hero panel by design) and “marquee” (requested; pausable); one advisory, “repeating stripes” (the client's barcode bar). The design-system lint (radius, type, colour) is clean. The static scan adds false positives (the gradient-painted ticket halves read as text on the panel, a shadow read as a glow, and “cramped padding” for the strip, which is the panel's full-bleed foot by design) |
| Impeccable first-viewport gate | Pass at 1440×900 and 390×844 (thesis fully visible, primary action wholly inside and answering a click); the price is client copy, so `--figures-supplied` |
| Page weight | 260 KB uncompressed at desktop (photograph 44, CSS 57, HTML 44, JS 35, font 20, logos 52); 236 KB on a phone (portrait crop 20 KB) |

## 8. Skills used

All five requested skills were installed from their official repositories into `~/.claude/skills/` and confirmed
discovered by a fresh Claude Code process in round 1. In round 5, on the photographic hero:

- **frontend-design:** an art-direction check against the skill's guidance (loaded earlier in the session): the hero opens with the most characteristic thing in the subject's world (a wing at sunset beside a boarding pass), type is one family, motion is one orchestrated entrance, and the boldness is spent in one place (the photograph). Two of its “template tells” were reviewed and **kept on purpose**: the single accent word in the headline and the small-caps ticket label are the client's own conventions. It also flags “dark ground, one accent” as a common default; here the palette is fixed by the client and the photograph is what makes it specific.
- **impeccable:** the surface brief and direction contract, `DESIGN.md` and `.impeccable/design.json` were rewritten for v5; the detector (live at four viewports and static) and the first-viewport gate were run. No new critique run in this round.
- **design-review:** captures at 1440, 768 and 375, the whole phone hero, the accessibility tree and the checklist audit. Findings fixed in this round: the nav wrapping at 1100px, the photograph vanishing in the two-column band, the veil failing contrast (measured, not eyeballed) and the Trustpilot cell wrapping. The skill normally drives Playwright through MCP; the same steps were run with Playwright scripts.
- **web-design-guidelines:** a pass over the new markup and styles: decorative `alt=""` with explicit dimensions and `fetchpriority="high"`, no `transition: all`, no `outline: none` without a replacement, reduced motion honoured. No violations; two optional ideas were left out (a `type` on the portrait `<source>`, a preload link).
- **ui-ux-pro-max:** searches on hero imagery and overlays, contrast, responsive images, layout shift and glass surfaces. Its landing guidance (“use an overlay strong enough for text contrast … light text only when the measured contrast passes”) is what the measurement step implements; alt text for a decorative image is correctly empty.

**Substitutions and limits, disclosed:**
- Impeccable's concept roll (its service is unreachable from the sandbox) was not run; the direction came from the client's feedback, the current site and the competitor.
- design-review normally drives Playwright through MCP; the same steps were run with Playwright scripts.
- The competitor and the client's own site were studied from the saved pages the client supplied (the live sites are not reachable from the sandbox).
- Image hosts were blocked at first; with the user's approval a new cloud environment allowing `unsplash.com`, `images.unsplash.com`, `www.pexels.com` and `images.pexels.com` was created. Unsplash's search pages answer automated clients with an anti-bot challenge, so photographs were found by id on the image CDNs and judged by eye.
- The Vercel deployment is checked by fetching it through the Vercel tools; a visual check of the live URL in a browser is not possible from the sandbox.
