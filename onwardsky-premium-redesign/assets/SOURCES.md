# Asset sources and licenses

**Rule for this prototype:** nothing figurative is drawn by hand. Every image, icon and logo is either the client's
own asset (copied unchanged or recolored with brand values), comes from an open library, or is computed from open data. The
scripts that reproduce the derived files are in [`../tools/`](../tools/README.md).

| Asset | Where it is used | Source | License / owner |
| --- | --- | --- | --- |
| Route map (`vectors/route-map.svg`) | Hero panel, at the right, behind the form | **Computed** by `tools/build-route-map.mjs`: land from **[Natural Earth](https://www.naturalearthdata.com)** 1:110m (via npm `world-atlas@2.0.2`, decoded with `topojson-client@3.1.0`), projected with **`d3-geo@3.1.1`** (Equal Earth) and sampled as a dot matrix; five routes computed between real airport coordinates; the airplane is Phosphor's `airplane-fill` | Natural Earth: **public domain**. `world-atlas`, `topojson-client`, `d3-geo`: **ISC** (build-time only, not shipped). Phosphor: **MIT** |
| Review illustrations (3, inline in `index.html`) | The stubs of the three review tickets | **Composed** by `tools/build-review-art.py` from **[Tabler Icons](https://tabler.io/icons)** (npm `@tabler/icons@3.52.0`, outline set): `calendar-event`, `ticket`, `zoom-check`, `device-mobile`, `mail`, `send`, `stopwatch`, `file-text`, `id`, `circle-check`. The icons' paths are used unchanged; the script places, scales and rotates them and builds each picture the way the client's “Be ready” drawings are built (see below) | Tabler Icons: **MIT**, © 2020-2026 Paweł Kuna (licence text in `LICENSE-Tabler-Icons-MIT.txt`); the composed SVG is inline |
| Dot texture (`vectors/world-dots.svg`) | “Be ready” section background | The same dot matrix, without routes, in the brand teal at 16% | As above |
| Airline logos (9, `airlines/*.webp`) | Hero strip marquee | **Supplied by the client** (`imgi_39…47` archive); byte-identical copies | Client; the marks belong to their airlines |
| "Be ready" illustrations (4) | The four ticket stubs, inline in `index.html` | **The client's current homepage** (the `travel-use-cases` section). Mechanical changes only, see below | Client |
| Onward Sky logo (`img/onward-sky-logo.svg`) | Header, favicon | The client's logo, extracted from the production export | Client |
| UI icons (19 symbols) | Header, form, ticket label, proof bar, buttons, stars | [Phosphor Icons](https://phosphoricons.com) via npm `@phosphor-icons/core@2.1.1` (bold, duotone and fill weights) | MIT |
| Payment marks (4) | Card footer | [Simple Icons](https://simpleicons.org) via npm `simple-icons@16.38.1` | CC0; trademarks remain with their owners |
| Figtree (text and display) | Everything | [Fontsource](https://fontsource.org) `@fontsource-variable/figtree@5.3.0` | SIL OFL 1.1 (`fonts/LICENSE-Figtree-OFL.txt`) |

## The review illustrations (v7)

The client asked for “professional vectors from a site, in the same style as the ‘Be ready’ section”. Only package registries
are reachable from the build sandbox, so the vectors come from **Tabler Icons** (5,400+ outline icons, MIT), fetched from npm
and compared with three other open sets (Lucide, IconPark, Hugeicons): Tabler's rounded 2-unit outlines are the closest to the
client's drawings. Nothing is drawn freehand. `tools/build-review-art.py` takes each icon's paths unchanged and composes three
pictures on the client's 200 × 140 box with the client's recipe:

- two soft colour blocks, peach `#FFD3BA` and mint `#C8E6E1` (20-unit corners), and at most one accent dot `#21A1A3`;
- every object outlined in the heading ink `#0E2F34` at **2.4 units** (each icon's stroke is rescaled, so a large phone and a
  small paper plane carry the same line), round caps and joins, paper filled white;
- one warm accent in the illustration orange `#CC4700` (a circled date, a stopwatch hand, a check), as on the client's stubs;
- the client's own wobble filter (`feTurbulence` 0.04, 2 octaves, seed 16, displacement 2.6), so the lines match.

| Picture | Review it illustrates | Objects (Tabler) |
| --- | --- | --- |
| `review-visa` | Schengen visa VFS appointment, verifiable PNR | `calendar-event` (date circled), `ticket` with “PNR” in Figtree 800, `zoom-check` |
| `review-delivery` | Reservation received within the promised time | `device-mobile` with `mail` on screen, a dashed trail to `send`, `stopwatch` (orange hand) |
| `review-itinerary` | Correct passenger and route details | `file-text` with a dotted route, `id`, `circle-check` (orange tick) |

The pictures describe what each reviewer wrote; they add no claim. They are inline SVG (about 3 KB each).

## What changed from v2 to v5

v2 used stock illustration (unDraw), airline marks from Soaring Symbols and a second typeface (Manrope). All of that is
gone. v3 and v4 used the client's own hero artwork (a dotted globe and a plane cut from its hero image) and, in v4, two of
the client's redacted sample itinerary pages. v5 replaced them with one Unsplash photograph. **v6 removes the photograph**
(the client asked for vectors only) and its build script; the hero's only picture is now the computed route map. The page
contains **no photograph and no stock illustration**: the third-party artwork is the map data (Natural Earth), the icon
family (Phosphor), the payment marks (Simple Icons) and, from v7, the Tabler icons the review pictures are composed from.

## The route map

- **What it is:** a dot matrix of the world's land (4,475 dots, one every 10 units on a 2200 × 900 box, white at 30%; the
  routes are composed in its first 1600 × 900, and the last 600 units continue the land eastwards so a wide panel never shows
  the map's edge), with
  dashed aqua arcs for five routes (Delhi–London, Delhi–Bangkok, Dubai–Lisbon, Bangkok–Singapore, Istanbul–Dubai), a marker at
  each of the seven airports and one airplane on the Delhi–London route. It is an illustration: the routes are not a statement
  about routes sold.
- **How it is made:** each grid point of the projected box is un-projected and kept when it lies on Natural Earth's land
  polygons (`geoContains`); routes are quadratic arcs between the projected airport coordinates, bowed by a quarter of their
  length; the airplane's path is placed on the Delhi–London arc (at the curve parameter t = 0.58) and rotated to the arc's tangent. The script
  prints the airports' positions as percentages of the 2200-unit box, which `index.html` uses to place the four HTML tags (`LHR`, `DXB`, `DEL`, `BKK`).
- **Colours:** white, `--v9-aqua` (#86D6D2) and `--accent-bright` (#21A1A3) on the map; `--accent` (#156970) for the texture.
- **Weight:** 48 KB and 43 KB (uncompressed SVG). The map is lazy-loaded and not shown below 900px. The texture is the
  1600-unit part only, byte-identical to v6.

## Mechanical changes to the artwork

| File | Change | Why |
| --- | --- | --- |
| "Be ready" illustrations | Legacy variables resolved to the values the production page resolves them to (`--c-0B283D` → `#0E2F34`, `--c-27A3B5` → `#21A1A3`, `--c-FFD2B0` → `#FFD3BA`, `--c-BFE9F0` → `#C8E6E1`); lost camel case restored (`viewBox`, `feTurbulence`…); filter ids made unique; text font set to Figtree | The saved page loses its stylesheet context; the drawings render the same as on the live page |
| Phosphor `airplane-fill` | Path copied into the map SVG, scaled to 44 map units (of 1600) and filled white | One icon family for the whole page |

## Airline logos

The nine files are the white-on-transparent marks the production strip already uses (British Airways, Malaysia
Airlines, SriLankan Airlines, Turkish Airlines, Emirates, Qatar Airways, Iberia, KLM, AirAsia). They are the client's
files and are used for the same purpose as on the production site ("works with 100+ airlines"). Per-logo heights follow the
production strip (27 to 36 px) so the optical weight matches; the scale is 0.86 on phones, 0.93 on tablets and 1.1 on desktop
(production uses 1.0 there; the logos are 10% larger here for legibility).

## Payment marks and ratings

PayPal, Stripe, Visa and Mastercard come from Simple Icons, cropped to their bounds and shown in a quiet monochrome.
Simple Icons has no UPI mark, so UPI is set as text in the same chip. The Trustpilot rating is drawn as the green
squares the client's reviews already use (Trustpilot brand green `#00B67A`, with a Phosphor star), which also label the
links to the client's own Trustpilot page; no Trustpilot logo file is used. The reviewers' initials (ZK, MM, EF) are set in
Figtree on brand tints; no avatar image is used.
