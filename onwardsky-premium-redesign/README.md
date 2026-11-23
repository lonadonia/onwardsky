# Onward Sky — premium homepage redesign (prototype v7)

A browser-viewable, high-fidelity prototype of the Onward Sky homepage from the top of the page
through **“Be ready when proof of onward travel is requested”**. Everything below that section is
out of scope and unchanged.

![Desktop first viewport](screenshots/desktop-1440-first-viewport.png)

## What changed in v7

The client's feedback on v6: **make the hero card a little wider and right for every screen size**, and **give the other
sections more beauty and polish, with professional vectors in the same style as the “Be ready” illustrations**.

- **A wider hero panel, fluid at every size.** The panel now grows to 1640px (it stopped at 1320px) and keeps an 8–20px
  margin to the window until it gets there, so on a 1440 screen it is 1408px wide, on a 1536 laptop 1502px and on a 1920
  monitor 1640px. The page container grows from 1240 to 1320px, so the headline, the boarding-pass form, the reviews and
  “Be ready” widen with it and still share one left edge with the header. Below 1280px the layout is as in v6 (the panel's
  margin differs by a pixel or two).
- **The route map runs on to the panel's edge.** The map is rebuilt by its script 600 units wider (Japan and Australia are
  now drawn), and its routes stay composed in the same 16:9 box, centred on the content: on wide panels the dots continue to
  the edge instead of stopping, and the routes keep clear of the headline and the form at every width.
- **Reviews redesigned as tickets, in the “Be ready” style.** The Trustpilot summary is a small ticket (the score on the stub),
  and each review is an upright ticket: a tinted stub with the Trustpilot rating and an **illustration drawn the same way as
  the client's “Be ready” art**, a dashed perforation with two notches, an orange topic label (*Visa appointment*, *Delivery
  time*, *Itinerary details*), the title, the quote and the reviewer, and a barcode. Three across on desktops, lying down
  (stub at the left, as “Be ready”) on tablets, upright in one column on phones. Every word, name, date and link is unchanged.
- **Professional vectors, in the client's construction.** The three new illustrations are composed by a script
  (`tools/build-review-art.py`) from **Tabler Icons** (tabler.io, MIT): the objects are Tabler's, unchanged; the construction is
  the client's own: peach and mint blocks, ink lines at the same weight, white paper, one orange accent and the same slight
  hand-drawn wobble.
- **A contrast fix the earlier rounds had not measured.** At 1100px (the two-column band, 900–1179px) the end of the lead sat
  on faint map dots (4.3 : 1); in that band the map now shows only above the card, and the lead measures at least 4.9 : 1 at
  all fourteen widths measured, from 360 to 2560px.
- **Kept:** the boarding-pass form and every one of its behaviours, the glass proof bar, the airline marquee with its pause
  button, “Be ready” as the client designed it. Every colour is still a production colour (`tools/palette-audit.js`: 30 colours,
  none outside the palette) and Figtree is the only typeface. The page weighs 323 KB on a desktop and 274 KB on a phone.

## v7.1

At the client's request the round pause button on the airline strip is gone, and the airline logos are about 15% larger
(scale 1.26 on desktops, 1.07 on tablets, 1.0 on phones; rows 60–74px tall). The strip still pauses on hover and keyboard
focus, rests off screen, and becomes a static row under reduced motion.

## v7.2

- **The airline strip is its own band.** It left the hero card: it now runs under the card, separated from it by the card's
  own margin, from one edge of the window to the other, and the logos scroll on past both edges (no fade). Its colour is the
  hero's teal one step darker (the deep teal under a 22–42% veil of the heading teal), so it stays in the card's family; no
  new colour.
- **A sky behind the reviews.** Soft cloud banks (Tabler's filled cloud: a surface shadow, a mint outline, white paper) sit
  around the content, and a dashed flight path crosses the top of the section with a small plane heading for a cloud above
  the Trustpilot ticket, the same dashed line as the routes on the hero map. Built by `tools/build-review-art.py`; larger banks
  appear in the margins of wide screens, two small clouds on phones. Decoration only (`aria-hidden`), never under text that
  would lose contrast.

## v7.3

At the client's request the reviews return to the direction of the production section: **no illustrations, no tickets**.
Three cards in the production's three tones (dark teal, tinted, white) share one anatomy: a quote mark in accent-bright, the
green Trustpilot squares, the title, the quote, and under a rule the reviewer's name (linked), country and date with
“5-star review on Trustpilot”. The Trustpilot summary beside the heading is a plain card again, and the topic labels and
initials are gone. The clouds and the flight path behind the section stay. Three across from 1024px, two plus one on
tablets, one column on phones.

## Preview it

The prototype is static HTML, CSS and vanilla JavaScript. There is no build step and nothing to install.

**Recommended: serve the folder locally** (fonts are preloaded and behaviour matches production):

```bash
cd onwardsky-premium-redesign
```

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>. Any static server works (`npx serve`, VS Code Live Server, etc.).

**Quick look:** double-clicking `index.html` also works in Chrome, Edge, Firefox and Safari. Font
preloading is simply skipped under `file://`.

## What to review

| Try this | What you should see |
| --- | --- |
| Look at the first screen on a laptop | The headline, the route map with its airport tags and airplane, the boarding-pass form with its orange button, the proof bar and the logo strip, all visible at 1440×900 |
| Widen the window from 1280px to 1920px and beyond | The hero panel keeps a slim margin to the window and grows to 1640px; the map's dots run on to its edge (Japan, Australia) while the routes stay where they were |
| Shrink the window below 1200px, 1180px, then 900px | The header folds into the menu at 1200px; the ticket becomes a card at 1180px, set lower so the map shows above it (only above it, so the lead stays on the plain teal); below 900px the layout stacks and the map is not shown |
| Watch the airline strip | Its own band under the hero card, edge to edge, in the hero teal one step darker; the nine logos scroll sideways and run on past both edges of the window; hover or keyboard focus pauses them; they rest while the band is off screen |
| Turn on “reduce motion” in your OS | The logos become a static centred row; the entrance and slide-in effects and the map's fade are skipped |
| Type `del`, `bom`, `bangkok` or `saigon` in **From** | Ranked airport suggestions with boxed codes; ↑/↓ + Enter or click to choose |
| Click anywhere in a field cell | The control inside takes focus (the passenger cell opens its list) |
| Choose both airports | Each field becomes a departure-board entry (e.g. **DEL** New Delhi) |
| Press **Get my onward ticket** with no date | Inline errors in the production pressed-orange, a summary line, focus moves to the first problem |
| Pick a date before the minimum | “Please choose a date on or after DD/MM/YYYY (at least 10 days from today).” |
| Complete the search | A “Search ready” confirmation. **The prototype stops here — no booking, payment or redirect.** |
| Switch to **Return** / **Multi-city** | Return puts the route on its own row and adds a return date; flights 2–6 start where the previous one lands, with add and remove |
| Type nonsense (e.g. `zzq`) | A visible “No airports found” state with a hint |
| Phone width, scroll past the form | A sticky fare bar; its button returns you to the form and focuses **From** |
| Scroll to the reviews | The Trustpilot ticket beside the heading (one link), then three review tickets with the new illustrations; each name links to its review. Narrow the window: they lie down below 1100px and stand up in one column below 640px |
| Scroll to “Be ready” | The action beside the heading; four ticket stubs of one shape in two equal columns (one on tablets and phones) on the dotted map |
| Keyboard only | Logical tab order, visible focus everywhere (white on the teal panel), full combobox support |

## Folder contents

```
onwardsky-premium-redesign/
├── index.html                 Prototype page (header → hero: route map, booking ticket, proof bar, logo marquee → reviews → “Be ready”)
├── assets/
│   ├── css/styles.css         Production-derived tokens + all components + responsive rules
│   ├── js/main.js             Header menu, marquee control, booking form, validation, sticky bar, scroll reveals
│   ├── js/airports.js         Demo airport dataset (140 airports) — prototype only
│   ├── airlines/              The client's nine airline logos (.webp, white on transparent)
│   ├── img/                   The client's logo
│   ├── vectors/               The hero route map and the “Be ready” dot texture (SVG, computed from Natural Earth data)
│   ├── brands/                Payment marks (Simple Icons)
│   ├── fonts/                 Figtree variable font (self-hosted, SIL OFL licence included)
│   └── SOURCES.md             Where every asset came from, its owner or licence, and what was changed
├── tools/                     Scripts that rebuild the sprite, the route map, the “Be ready” and review art, and the colour audit
├── screenshots/               Final captures: 2560, 1920, 1440, 1280, 1024, 768, 390, 375 + section, form and strip states + before/after
├── DESIGN-SYSTEM.md           Palette with production names and measured contrast, type, layout, components, motion
├── DESIGN-RATIONALE.md        What was wrong, how the two sites compare, what changed and why, self-critique
└── IMPLEMENTATION-NOTES.md    Demo-only behaviour, gaps, limitations, porting notes, QA log, skills used
```

Machine-readable design records produced by the Impeccable skill live at the repository root:
`PRODUCT.md`, `DESIGN.md` and `.impeccable/` (surface brief with the direction contract, and the
`design.json` token sidecar).

## Screenshots

| | |
| --- | --- |
| Before / after, desktop | `screenshots/before-after/compare-desktop-1440.png` |
| Before / after, mobile | `screenshots/before-after/compare-mobile-390.png` |
| First viewports (2×, and 1× for 2560, 1920 and 1024) | `screenshots/*-first-viewport.png` |
| Full pages | `screenshots/*-full-page.png` |
| The reviews at 1440, 900 and 390, “Be ready” at 1440, the boarding-pass bar, the 1024 two-column band | `screenshots/states/section-*.png`, `ticket-closeup-1440.png`, `tablet-1024-two-columns.png` |
| Form states (suggestions, error, ready, return, multi-city), the strip and the mobile states (captured in v6; the form and strip did not change in v7) | `screenshots/states/` |

## Important

This is a design prototype, not production code. It does **not** contact the booking wizard,
checkout, payment providers or any Onward Sky endpoint, and it does not modify the live site.
See `IMPLEMENTATION-NOTES.md` for exactly what is simulated, and `assets/SOURCES.md` for the owners of the
logos and artwork and the licences of the map data and icons.
