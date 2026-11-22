# Onward Sky — premium homepage redesign (prototype)

A browser-viewable, high-fidelity prototype of the Onward Sky homepage from the top of the page
through **“Be ready when proof of onward travel is requested”**. Everything below that section is
out of scope and unchanged.

![Desktop first viewport](screenshots/desktop-1440-first-viewport.png)

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
| Type `del`, `bom`, `bangkok` or `saigon` in **From** | Ranked airport suggestions with boxed IATA codes; ↑/↓ + Enter or click to choose |
| Choose both airports | Each field turns into a chart identifier (e.g. **DEL** New Delhi) and an orange route line draws through the swap control |
| Press **Get my onward ticket** with no date | Inline errors (plugin wording), a summary line, focus moves to the first problem |
| Pick a date before the minimum | “Please choose a date on or after DD/MM/YYYY (at least 10 days from today).” |
| Complete the search | A “Search ready” confirmation. **The prototype stops here — no booking, payment or redirect.** |
| Switch to **Return** | Date label becomes “Depart date” and a “Return date” field appears |
| Switch to **Multi-city** | Flight 2 starts where flight 1 lands; add up to 6 flights, remove down to 2 |
| Type nonsense (e.g. `zzq`) | A visible “No airports found” state with a hint |
| Phone width, scroll past the form | A sticky fare bar; its button returns you to the form and focuses **From** |
| Any “Get my onward ticket” link | Scrolls to the form and puts the cursor in **From** |
| Keyboard only | Logical tab order, visible focus everywhere, full combobox support |
| OS “reduce motion” on | The chart and route lines appear without animation |

## Folder contents

```
onwardsky-premium-redesign/
├── index.html                 Prototype page (header → hero + booking console → reviews → “Be ready”)
├── assets/
│   ├── css/styles.css         Design tokens + all components + responsive rules
│   ├── js/main.js             Header menu, booking console, validation, sticky bar
│   ├── js/airports.js         Demo airport dataset (140 airports) — prototype only
│   ├── img/onward-sky-logo.svg  Client logo (from the production site)
│   └── fonts/                 Archivo + Figtree variable fonts (self-hosted, SIL OFL licences included)
├── screenshots/               Final captures: 1440, 1280, 768, 390, 375 + console states + before/after
├── DESIGN-SYSTEM.md           Tokens, type, spacing, components, interactions
├── DESIGN-RATIONALE.md        Audit, directions explored, what changed and why
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
| Console + mobile states | `screenshots/states/` |

## Important

This is a design prototype, not production code. It does **not** contact the booking wizard,
checkout, payment providers or any Onward Sky endpoint, and it does not modify the live site.
See `IMPLEMENTATION-NOTES.md` for exactly what is simulated.
