# Asset sources and licenses

**Rule for this prototype:** nothing figurative is drawn by hand. Every image, icon and logo is either the client's
own asset (copied unchanged or recolored with brand values) or comes from an open library. The scripts that reproduce
the derived files are in [`../tools/`](../tools/README.md).

| Asset | Where it is used | Source | License / owner |
| --- | --- | --- | --- |
| Airline logos (9, `airlines/*.webp`) | Hero strip marquee | **Supplied by the client** (`imgi_39…47` archive); byte-identical copies | Client; the marks belong to their airlines |
| "Be ready" illustrations (4) | The four ticket stubs, inline in `index.html` | **The client's current homepage** (the `travel-use-cases` section). Mechanical changes only, see below | Client |
| Hero globe and plane (`vectors/hero-globe.svg`, `hero-plane.svg`) | Hero panel decoration | **The client's hero artwork** (`.os-book__art` image), cut into two files and recolored | Client |
| Onward Sky logo (`img/onward-sky-logo.svg`) | Header, favicon | The client's logo, extracted from the production export | Client |
| UI icons (20 symbols) | Header, form, proof strip, buttons, stars | [Phosphor Icons](https://phosphoricons.com) via npm `@phosphor-icons/core@2.1.1` (bold, duotone and fill weights) | MIT |
| Payment marks (4) | Card footer | [Simple Icons](https://simpleicons.org) via npm `simple-icons@16.38.1` | CC0; trademarks remain with their owners |
| Figtree (text and display) | Everything | [Fontsource](https://fontsource.org) `@fontsource-variable/figtree@5.3.0` | SIL OFL 1.1 (`fonts/LICENSE-Figtree-OFL.txt`) |

## What changed from v2

v2 used stock illustration (unDraw), airline marks from Soaring Symbols and a second typeface (Manrope). All of that is
gone: the page now uses the client's own illustrations, globe, logos and typeface, which is what keeps it on brand.

## Mechanical changes to the client's artwork

| File | Change | Why |
| --- | --- | --- |
| "Be ready" illustrations | Legacy variables resolved to the values the production page resolves them to (`--c-0B283D` → `#0E2F34`, `--c-27A3B5` → `#21A1A3`, `--c-FFD2B0` → `#FFD3BA`, `--c-BFE9F0` → `#C8E6E1`); lost camel case restored (`viewBox`, `feTurbulence`…); filter ids made unique; text font set to Figtree | The saved page loses its stylesheet context; the drawings render the same as on the live page |
| `hero-globe.svg` | Only the dotted globe is kept; fill `#0B283D` → accent `#156970`; opacity 10% → 28%; numbers rounded to one decimal (svgo) | Navy dots read grey on the teal panel; accent keeps the palette closed |
| `hero-plane.svg` | One of the two planes and the first part of its dashed path; viewBox cropped; path `black` → accent, plane navy → heading `#0E2F34` | The second plane flies out from behind the booking card |

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
link to the client's own Trustpilot page; no Trustpilot logo file is used.
