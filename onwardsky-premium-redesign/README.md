# Onward Sky — premium homepage redesign (prototype v6)

A browser-viewable, high-fidelity prototype of the Onward Sky homepage from the top of the page
through **“Be ready when proof of onward travel is requested”**. Everything below that section is
out of scope and unchanged.

![Desktop first viewport](screenshots/desktop-1440-first-viewport.png)

## What changed in v6

The client's feedback on v5: **remove the photograph and make the hero vectors only**, and **improve the other sections too**.

- **A vector hero.** The photograph is gone. At the right of the brand-teal panel there is now a **route map**: the world's land as
  a dot matrix (Natural Earth's open data), five flight routes between real airports (London, Lisbon, Istanbul, Dubai, Delhi,
  Bangkok, Singapore), the airports' codes in small departure-board tags, and one airplane in flight (Phosphor). It is computed
  by a script from open data, so nothing is drawn by hand, and it continues the dotted globe of the client's current hero.
- **Organised around the text.** The map is masked out across the headline column, so the copy always sits on the plain teal
  (contrast measured on the rendered page at eight widths); it is shown from 900px and is not even downloaded on phones.
- **Reviews redesigned.** A Trustpilot summary sits beside the heading (4.0, the green squares, “All 4 reviews rated 5 stars”,
  the link to Trustpilot), then three cards of one kind: rating and quote mark, title, quote, and the reviewer's initials, name,
  country and date. Same excerpts, names, dates and links as the live page.
- **“Be ready” refined.** The “Get my onward ticket” action moved into the heading row, so the four tickets are the same shape;
  the section ground carries the hero's dot map in the brand teal. The client's tickets, illustrations and copy are unchanged.
- **Kept from v5:** the boarding-pass booking form (from 1180px; every capability of the production form), the single glass proof
  bar, the airline-logo marquee with its pause button, the header that folds below 1200px. Every UI colour is a production colour
  (`tools/palette-audit.js`: 30 colours painted, none outside the palette), Figtree is the only typeface, and the page weighs
  309 KB on a desktop and 264 KB on a phone.

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
| Shrink the window below 1200px, 1180px, then 900px | The header folds into the menu at 1200px; the ticket becomes a card at 1180px, set lower so the map shows above it; below 900px the layout stacks and the map is not shown |
| Watch the airline strip | The nine logos scroll sideways; hover pauses them; the round button at its right pauses and plays them; they also rest while the strip is off screen |
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
| Scroll to the reviews | The Trustpilot summary beside the heading (one link), then three cards of one kind; each name links to its review |
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
├── tools/                     Scripts that rebuild the sprite, the route map and the art, and the colour audit
├── screenshots/               Final captures: 1920, 1440, 1280, 1024, 768, 390, 375 + form and strip states + before/after
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
| First viewports (2×, and 1× for 1920 and 1024) | `screenshots/*-first-viewport.png` |
| Full pages | `screenshots/*-full-page.png` |
| Form states (suggestions, error, ready, return, multi-city), the strip and the mobile states, plus the reviews and “Be ready” sections at 1440 | `screenshots/states/` |

## Important

This is a design prototype, not production code. It does **not** contact the booking wizard,
checkout, payment providers or any Onward Sky endpoint, and it does not modify the live site.
See `IMPLEMENTATION-NOTES.md` for exactly what is simulated, and `assets/SOURCES.md` for the owners of the
logos and artwork and the licences of the map data and icons.
