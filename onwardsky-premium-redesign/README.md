# Onward Sky — premium homepage redesign (prototype v5)

A browser-viewable, high-fidelity prototype of the Onward Sky homepage from the top of the page
through **“Be ready when proof of onward travel is requested”**. Everything below that section is
out of scope and unchanged.

![Desktop first viewport](screenshots/desktop-1440-first-viewport.png)

## What changed in v5

The client's feedback on v4: redo the hero so it is more professional, more beautiful and better organised; **remove the two
documents in the back**; professional, high-quality images and vectors from other sites are welcome if they suit the brand.

- **The two documents are gone**, with the badge, the plane and the dotted globe that surrounded them. The hero now has one
  picture instead of four decorations.
- **A professional photograph.** An airliner's wing against a sunset (Unsplash, free licence), graded to the brand teals and
  kept warm where the sky is, so deep teal and burnt orange meet the way they do in the logo and the button. Text sits on
  brand-teal veils, and its contrast was **measured on the rendered page** at eight widths (worst case 4.85 : 1 for body text,
  ≥ 8 : 1 for the headline on desktop).
- **The booking form is still a boarding pass** (from 1180px): route, date and passengers on the white half, the fare and the
  orange button on the tinted stub, a perforation and two notches through which the photograph shows. Every capability of
  the production form is kept (one way, return, multi-city, airport search, validation). Below 1180px it is a clean card.
- **One proof bar.** The three promises and the Trustpilot score are one glass object with four cells instead of four boxes.
- **Better organised.** Everything shares the headline's left edge and the ticket's width; the header no longer wraps at 1100px;
  on small laptops and tablets the card is set lower so the sunset shows above it; at 1440×900 the whole hero, logos included,
  is above the fold.
- **Same brand, lighter page.** Every UI colour is a production colour (`tools/palette-audit.js`: 32 colours painted, none
  outside the palette), Figtree is the only typeface, and the page weighs 260 KB (it was 467 KB). Reviews and “Be ready” keep
  their v3 design.

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
| Look at the first screen on a laptop | The headline, the wing and sunset, the boarding-pass form with its orange button, the proof bar and the logo strip, all visible at 1440×900 |
| Shrink the window below 1200px, 1180px, then 900px | The header folds into the menu at 1200px; the ticket becomes a card at 1180px, with the card set lower so the sunset shows; below 900px the layout stacks and the photograph is subdued behind the text |
| Watch the airline strip | The nine logos scroll sideways; hover pauses them; the round button at its right pauses and plays them; they also rest while the strip is off screen |
| Turn on “reduce motion” in your OS | The logos become a static centred row; the entrance and slide-in effects and the photograph's fade are skipped |
| Type `del`, `bom`, `bangkok` or `saigon` in **From** | Ranked airport suggestions with boxed codes; ↑/↓ + Enter or click to choose |
| Click anywhere in a field cell | The control inside takes focus (the passenger cell opens its list) |
| Choose both airports | Each field becomes a departure-board entry (e.g. **DEL** New Delhi) |
| Press **Get my onward ticket** with no date | Inline errors in the production pressed-orange, a summary line, focus moves to the first problem |
| Pick a date before the minimum | “Please choose a date on or after DD/MM/YYYY (at least 10 days from today).” |
| Complete the search | A “Search ready” confirmation. **The prototype stops here — no booking, payment or redirect.** |
| Switch to **Return** / **Multi-city** | Return puts the route on its own row and adds a return date; flights 2–6 start where the previous one lands, with add and remove |
| Type nonsense (e.g. `zzq`) | A visible “No airports found” state with a hint |
| Phone width, scroll past the form | A sticky fare bar; its button returns you to the form and focuses **From** |
| Scroll to “Be ready” | Four ticket stubs in two equal columns (one on tablets and phones), CTA in the fourth |
| Keyboard only | Logical tab order, visible focus everywhere (white on the photograph), full combobox support |

## Folder contents

```
onwardsky-premium-redesign/
├── index.html                 Prototype page (header → hero: photograph, booking ticket, proof bar, logo marquee → reviews → “Be ready”)
├── assets/
│   ├── css/styles.css         Production-derived tokens + all components + responsive rules
│   ├── js/main.js             Header menu, marquee control, booking form, validation, sticky bar, scroll reveals
│   ├── js/airports.js         Demo airport dataset (140 airports) — prototype only
│   ├── airlines/              The client's nine airline logos (.webp, white on transparent)
│   ├── img/                   The client's logo and the hero photograph (graded WebP, landscape and phone crop)
│   ├── brands/                Payment marks (Simple Icons)
│   ├── fonts/                 Figtree variable font (self-hosted, SIL OFL licence included)
│   └── SOURCES.md             Where every asset came from, its owner or licence, and what was changed
├── tools/                     Scripts that rebuild the sprite, the graded photograph and the art, and the colour audit
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
logos and artwork and the licence of the photograph.
