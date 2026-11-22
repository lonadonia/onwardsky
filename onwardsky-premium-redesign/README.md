# Onward Sky — premium homepage redesign (prototype v3)

A browser-viewable, high-fidelity prototype of the Onward Sky homepage from the top of the page
through **“Be ready when proof of onward travel is requested”**. Everything below that section is
out of scope and unchanged.

![Desktop first viewport](screenshots/desktop-1440-first-viewport.png)

## What changed in v3

The client's feedback on v2: the colours were not carefully defined and did not match the brand; take inspiration
from the competitor; make the hero more professional; add the supplied airline logos to the bottom strip as a sideways
scroll; keep “Be ready” as it is on the current site, with improvements.

- **Colours:** every colour is now a production colour, under its production name (theme presets and the values the
  section styles resolve to). `tools/palette-audit.js` renders the page and checks every painted colour against the palette.
  Figtree is the only typeface, as on the live site.
- **Hero:** an inset, rounded teal panel (the competitor's framing idea, in the client's colours) holding the booking card,
  with the three promises set as a boarding-pass strip and the airline strip as the panel's foot. At 1440×900 the card,
  its CTA, the proof strip and the logos are all above the fold.
- **Airline strip:** the client's nine logos scroll sideways (production speed, masked edges), pause on hover and with a
  visible button, and become a static row under reduced motion.
- **Be ready:** the live site's four ticket stubs, copy, order and artwork, restored, with equal columns, aligned rows, a
  button that never wraps and a compact phone layout.
- **Artwork:** the client's own (the four illustrations, the dotted globe and plane, the nine logos). v2's stock
  illustration and second typeface are gone.

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
| Look at the first screen on a laptop | Headline, booking card with its CTA, the three promises as a ticket strip and the logo strip, all visible |
| Watch the airline strip | The nine logos scroll sideways; hover pauses them; the round button at its right pauses and plays them |
| Turn on “reduce motion” in your OS | The logos become a static centred row; the entrance and slide-in effects are skipped |
| Type `del`, `bom`, `bangkok` or `saigon` in **From** | Ranked airport suggestions with boxed codes; ↑/↓ + Enter or click to choose |
| Click anywhere in a field cell | The control inside takes focus (the passenger cell opens its list) |
| Choose both airports | Each field becomes a departure-board entry (e.g. **DEL** New Delhi) and the dashed connector turns solid aqua |
| Press **Get my onward ticket** with no date | Inline errors in the production pressed-orange, a summary line, focus moves to the first problem |
| Pick a date before the minimum | “Please choose a date on or after DD/MM/YYYY (at least 10 days from today).” |
| Complete the search | A “Search ready” confirmation. **The prototype stops here — no booking, payment or redirect.** |
| Switch to **Return** / **Multi-city** | A return-date field appears; flights 2–6 start where the previous one lands, with add and remove |
| Type nonsense (e.g. `zzq`) | A visible “No airports found” state with a hint |
| Phone width, scroll past the form | A sticky fare bar; its button returns you to the form and focuses **From** |
| Scroll to “Be ready” | Four ticket stubs in two equal columns (one on tablets and phones), CTA in the fourth |
| Keyboard only | Logical tab order, visible focus everywhere, full combobox support |

## Folder contents

```
onwardsky-premium-redesign/
├── index.html                 Prototype page (header → hero panel with booking card, proof strip, logo marquee → reviews → “Be ready”)
├── assets/
│   ├── css/styles.css         Production-derived tokens + all components + responsive rules
│   ├── js/main.js             Header menu, marquee control, booking card, validation, sticky bar, scroll reveals
│   ├── js/airports.js         Demo airport dataset (140 airports) — prototype only
│   ├── airlines/              The client's nine airline logos (.webp, white on transparent)
│   ├── vectors/               The client's dotted globe and plane (SVG)
│   ├── brands/                Payment marks (Simple Icons)
│   ├── img/onward-sky-logo.svg  Client logo (from the production site)
│   ├── fonts/                 Figtree variable font (self-hosted, SIL OFL licence included)
│   └── SOURCES.md             Where every asset came from, its owner or licence, and what was changed
├── tools/                     Scripts that rebuild the sprite and the derived art, and the colour audit
├── screenshots/               Final captures: 1440, 1280, 768, 390, 375 + form and strip states + before/after
├── DESIGN-SYSTEM.md           Palette with production names and contrast, type, spacing, components, motion
├── DESIGN-RATIONALE.md        What was wrong, how the two sites compare, what changed and why
└── IMPLEMENTATION-NOTES.md    Demo-only behaviour, gaps, limitations, porting notes, QA log
```

Machine-readable design records produced by the Impeccable skill live at the repository root:
`PRODUCT.md`, `DESIGN.md` and `.impeccable/` (surface brief with the direction contract, and the
`design.json` token sidecar).

## Screenshots

| | |
| --- | --- |
| Before / after, desktop | `screenshots/before-after/compare-desktop-1440.png` |
| Before / after, mobile | `screenshots/before-after/compare-mobile-390.png` |
| First viewports (2×) | `screenshots/*-first-viewport.png` |
| Full pages | `screenshots/*-full-page.png` |
| Card, strip and mobile states | `screenshots/states/` |

## Important

This is a design prototype, not production code. It does **not** contact the booking wizard,
checkout, payment providers or any Onward Sky endpoint, and it does not modify the live site.
See `IMPLEMENTATION-NOTES.md` for exactly what is simulated, and `assets/SOURCES.md` for the owners of the
logos and artwork.
