# Implementation notes (v4)

## 1. What is real, what is simulated

| Area | Prototype behaviour | Production behaviour |
| --- | --- | --- |
| Trip types, multi-city 2–6 flights, swap, next-flight auto-fill | **Real**, same rules as the production block | Same |
| Validation rules and messages | **Real**: copied from the plugin (`onwardsky_itinerary` v1.7.1) | Same |
| Earliest date | **Real**: today + 10 days in `Asia/Kolkata`, recomputed in the browser | Same |
| Airport search | **Demo data**: 140 major airports in `assets/js/airports.js` with a local ranking (code → city → alias → country) | Plugin dataset (`airports-data.js`) + `airport-search.js` ranking, loaded on first focus |
| Submit | **Stops at a “Search ready” confirmation.** No redirect, no network request | Hands off to `/flight-booking-wizard/` via `handoff.js`; the wizard and checkout re-validate and re-quote |
| Prices, payment and checkout | Static copy (“From $9.99”, payment names) | Quoted by the wizard |
| Sample itinerary pages | **Static images** (the client's own redacted samples, already watermarked “SAMPLE · PRIVACY REDACTED”); nothing is generated from the form | Same images, or the production “verify” section's assets |
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

New in v4:
- **The hero is recomposed** (see `DESIGN-RATIONALE.md`): a deep-teal sky panel; the client's two sample itinerary pages with a “Verifiable PNR” badge; the booking form drawn as a boarding pass from 1180px (fields, behaviour and validation unchanged); a card below 1180px.
- **Return puts the route on its own row** on the desktop ticket (five controls do not fit one row at 1240px). **Multi-city shows one flight per row** with a column always reserved for the remove control.
- **The three promises and the Trustpilot line are four glass chips** (same words). The Trustpilot line left the headline column, which is what lets the logo strip fit above the fold at 1440×900.
- **The logo loop also rests while the strip is off screen** (IntersectionObserver), in addition to hover, focus and the button.
- **Entrance motion is transform-only for text, the form and the chips**; only the picture-only sample pages and the badge fade.
- **`loading="lazy"` on art that is hidden at some widths** (globe, plane, sample pages): a phone loads 220 KB, a desktop 467 KB (uncompressed).
- **A white focus ring on the Trustpilot chip** (the brand-teal ring would vanish on the sky).

## 4. Reference gaps and assumptions

- **Airline logos** are the client's nine `.webp` files, copied unchanged (white marks, transparent background). The production strip paints them through CSS `mask-image`; the prototype uses `<img>` so the page also works when opened from disk (Chrome blocks file masks over `file://`). Sizes follow the production strip.
- **The saved page** shows the strip empty (its logos load from elsewhere), so the logo sizes and marquee settings were read from the production CSS in the export.
- **Hero art:** the dotted globe and plane are cut from the client's own hero image and recoloured for the dark sky (white, with an aqua path). The globe is 175 KB, the largest asset on the page (about 49 KB gzipped).
- **Sample itinerary pages:** the two tall pages in the client's “A real onward ticket. See for yourself.” section (embedded WebP), resized to 680px wide (34 and 39 KB). They are the client's samples; the prototype adds no data to them.
- **Trustpilot widget:** external. The prototype draws the five green rating squares the client's reviews use (Trustpilot's brand green), keeps the wording and links, and shows 4 of 5 for the 4.0 score.
- **Payment marks:** PayPal, Stripe, Visa and Mastercard are quiet monochrome marks (Simple Icons). **UPI has no mark in that library, so it is set as text** in the same chip.
- **Review dates** (Aug–Sep 2026) are reproduced exactly as they appear in the export.
- **The decorative quote glyph** on the review cards is a straight `"` in italic (aria-hidden), as on the production page.
- **Copy case:** headings and buttons stay in the client's sentence case; the Web Interface Guidelines suggest Title Case, which would change the brand voice. The input placeholder keeps the client's “City or airport…” (no example pattern).
- **Competitor:** observed for structure only (framed hero, ticket motif, a strip of three promises). No layout, asset, colour or text was copied.
- **Illustration:** the four “Be ready” drawings are the client's; v2's stock illustration is gone, and a trial with stock clouds was dropped in v4.
- **Error summary:** a failed submit shows inline errors and a summary line and moves focus to the first invalid field (the production behaviour). It does not add a separate focusable summary block.

## 5. Limitations

- Native `<input type="date">` shows the browser's locale format (e.g. mm/dd/yyyy in en-US). The validation message keeps the plugin's dd/mm/yyyy wording.
- Uses modern CSS: `:has()` (Chrome 105+, Safari 15.4+, Firefox 121+), `color-mix()` (Chrome 111+, Safari 16.2+, Firefox 113+), `overflow: clip`, gradient `mask-image`, `text-wrap: balance` / `pretty` (progressive), and `inert` on the sticky bar.
- The sample itinerary pages are hidden between 900 and 1179px (the card and the copy share the row) and below 680px; the product proof is a desktop and large-tablet feature.
- Demo airport data covers 140 airports. Unlisted airports show the “No airports found” state.
- The decorative glows are CSS gradients, so a browser without `color-mix()` shows the plain teal panel without them (text contrast is unaffected).
- Screen-reader behaviour was checked through the accessibility tree and axe-core, not with a physical screen reader.
- The preview server in `README.md` is optional: opening `index.html` from disk works (fonts preload only over http).

## 6. Porting to the WordPress block theme

- **Tokens:** the `:root` names are the production preset slugs (`heading`, `accent`, `deep`, `surface`, `cta` …) plus the section values listed in `DESIGN-SYSTEM.md`; copy them into `theme.json` (`settings.color.palette`) and the section stylesheets.
- **Booking form:** replace the markup of `wp-block-onwardsky-booking-form`. The behaviour layer maps onto the existing Interactivity API store (`state.fields`, `state.dates`, `state.trip`, `state.legCount`); add the `is-set` / `is-routed` class bindings and keep `handoff.js` for submit. Add the click-to-focus on field cells. The ticket and the card are the **same DOM**: `.ticket`, `.ticket-main` and `.stub` are `display: contents` below 1180px, so only the stylesheet changes between them.
- **Ticket notches:** painted with two `radial-gradient` backgrounds per half, not masks, so the suggestion list can overflow the ticket. Keep the halves' `--notch` (12px) and `--stub-w` (344px; 322px from 1180 to 1279px) variables together.
- **Hero panel, chips, reviews, tickets:** register as block patterns. The “Be ready” illustrations are inline SVG in the pattern; the globe and plane are plain SVG files, the sample pages are WebP.
- **Airline strip:** keep the existing strip block; add the pause button, the off-screen pause, a third set of logos for very wide screens and the reduced-motion static row.
- **Fonts:** none to add (Figtree is already the theme font).

## 7. QA performed (actual results)

| Check | Result |
| --- | --- |
| Widths 1920, 1536, 1440, 1366, 1280, 1180, 1100, 1024, 900, 820, 768, 680, 430, 390, 375, 360 | No horizontal overflow and no console error at any of them; captures in `screenshots/` |
| Booking CTA inside the first viewport | Bottom edge: 1440×900 612px · 1366×768 604 · 1280×720 591 · 1180×800 575 · 1024×768 552 · 900×900 544 · 820×1180 811 · 768×1024 804 · 680×900 783 · 430×932 754 · 390×844 748 · 375×812 743 · 360×740 740 |
| Whole hero (form, chips, logo strip) in the first viewport | Yes at 1440×900 (the panel ends at 884px) and at 1920×1080 |
| Console errors / failed requests | None over `http://` or `file://`; no broken images |
| Colour audit (`tools/palette-audit.js`) | 32 distinct colours painted (error state included, transitions settled); **none outside the production palette** (three consecutive runs) |
| axe-core 4.10 (WCAG 2.1 A/AA + best practice) | **0 violations** in four states (desktop, mobile, validation errors, multi-city with open listbox), repeated runs (the four-state suite five times after the last style changes, plus eight further desktop runs with no wait after load). The single “incomplete” item is the text over the sky gradient, which axe cannot compute, so it was measured (next row) |
| Contrast on the sky gradient (measured on the rendered page: text hidden, pixels under each line box sampled, worst case kept; widths 1440, 1180, 768, 680, 390, 360) | White headline ≥ 6.5 : 1 · lead ≥ 4.8 : 1 · chips ≥ 5.9 : 1 · assurances ≥ 6.7 : 1 · inactive tabs ≥ 4.8 : 1 · strip title ≥ 6.8 : 1 · aqua key word ≥ 3.8 : 1 (large text, 3 : 1 needed). A first run found the phone lead at 3.4 : 1 under the aqua glow; the glow is now removed on phones |
| Keyboard | Tab order follows the visual order (header, trip tabs, From, swap, To, date, passengers, CTA, Trustpilot chip, pause button, review links, “Be ready” CTA); every stop shows a visible ring (white on the sky); combobox ↑ ↓ Enter Esc; menu Escape returns focus |
| Functional | Validation messages, 10-day minimum, return and multi-city rules, auto-fill, swap, add/remove flights, suggestion list over the chips (not clipped by the notches), sticky bar focus hand-off, click anywhere in a field cell. Captured at 1440, 1280, 1180 and 390 |
| Marquee | Moves at ~34px/s; the pause button, hover pause, resume and the off-screen pause were verified; `prefers-reduced-motion` gives a static one-row set with duplicates removed and no control |
| Impeccable detector (live page, 1440 / 1280 / 768 / 390) | Six findings at desktop: three “cyan gradient” (the client's brand teal, hue ≈ 185°, is read as cyan; accepted because the brief fixes the palette and the production strip already uses this gradient), two “nested cards” (the form halves and chips sit on the panel by design), and “marquee” (requested; pausable); one advisory, “repeating stripes” (the client's barcode bar). A one-sided border on a rounded box that the detector flagged as a “side tab” was removed. The static scan adds four false positives (the gradient-painted ticket halves read as text on the panel, and two “cramped padding”). The design-system lint (radius, type, colour) is clean |
| Impeccable first-viewport gate | Pass at 1440×900 and 390×844 (thesis fully visible, primary action wholly inside and answering a click); the price is client copy, so `--figures-supplied` |
| Page weight | 467 KB uncompressed at desktop (globe 175, CSS 56, HTML 45, sample pages 72, JS 35, font 20, logos 52); 220 KB on a phone, which skips the globe, plane and sample pages |

## 8. Skills used

All five requested skills were installed from their official repositories into `~/.claude/skills/` and confirmed
discovered by a fresh Claude Code process in round 1. In round 4 each was used on the new hero:

- **frontend-design:** an art-direction check of the finished hero: the opening is the most characteristic object in the subject's world (a boarding pass beside the real itinerary), type is one family, motion is one orchestrated entrance. Two of its “template tells” were reviewed and **kept on purpose**: the single accent word in the headline and the small-caps ticket label are the client's own conventions (headline accent as on the live site; stub labels as on its “Be ready” tickets).
- **impeccable:** the surface brief and direction contract were rewritten for v4; `DESIGN.md` (tokens `sheet` 6px and `ticket` 22px added, components and prose updated) and `.impeccable/design.json` were regenerated; the detector (static and live, four viewports) and the first-viewport gate were run; and a critique was run. **Method: single context, not two isolated sub-agents**, because this session does not spawn sub-agents unless the user asks. Result, honestly: Nielsen 24 / 32 (heuristics 7 and 10 not applicable to a Persuade surface), 0 cognitive-load failures; priority issues were all P2–P3: the sample pages are decorative and unreadable at hero size (intended; they carry the client's own watermark), the product proof disappears between 900 and 1179px, and a few category habits (aqua accent word, four identical chips) were kept deliberately. It produced no change to the build, and its questions to the user were skipped (delegated run).
- **design-review:** captures at 1440, 1280, 768 and 375, the accessibility tree and the checklist audit (type scale and line length, contrast, rhythm, composition, targets, polish). Findings fixed: the multi-city first flight was wider than the rest; the ticket's plane icon was 18px and is now 20px; the entrance fade made a contrast check flaky and became transform-only; the phone glow lowered contrast and was removed. The skill normally drives Playwright through MCP; the same steps were run with Playwright scripts.
- **web-design-guidelines:** a full pass with the bundled rules over `index.html`, `styles.css` and `main.js`. Fixed: `loading="lazy"` for art hidden at some widths; a white focus ring on the Trustpilot chip. Known and intentional: sentence case instead of Title Case, the decorative straight-quote glyph, the placeholder without an example (all the client's copy). No `transition: all`, no `outline: none` without a replacement, no zoom blocking, explicit image sizes, `translate="no"` on codes and the brand.
- **ui-ux-pro-max:** searches for hero and social-proof patterns, auto-rotating content controls, focusable error summaries, contrast on overlays and touch targets. Applied: the marquee now also pauses off screen (pause button, hover, focus and reduced motion were already in place); contrast measured on the gradient; targets are 44px or more. Not applied, with the reason: a separate error-summary block (the production behaviour focuses the first invalid field and keeps inline errors).

**Substitutions, disclosed:**
- Impeccable's concept roll (its service is unreachable from the sandbox) was not run; the direction came from the client's feedback, the current site and the competitor, explored in a small hero lab before the build.
- The critique ran in one context rather than two sub-agents (see above).
- design-review normally drives Playwright through MCP; the same steps were run with Playwright scripts.
- The competitor and the client's own site were studied from the saved pages the client supplied (the live sites are not reachable from the sandbox).
- The Vercel deployment was checked by fetching it through the Vercel tools; a visual check of the live URL in a browser was not possible from the sandbox.
