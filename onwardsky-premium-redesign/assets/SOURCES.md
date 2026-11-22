# Asset sources and licenses

**Rule for this prototype:** nothing figurative is drawn by hand. Every illustration, icon, logo and map was
fetched from an open library and only *recolored* or *cropped*. The exact commands and scripts are in
[`../tools/`](../tools/README.md).

| Asset | Where it is used | Source (as fetched) | License |
| --- | --- | --- | --- |
| Illustrations (7) | Hero traveler, reviews, four "Be ready" moments, hero atlas | [unDraw](https://undraw.co) via npm `undraw-svg@2.0.0` | [unDraw license](https://undraw.co/license): free for personal and commercial use, no attribution required; the npm package is MIT |
| UI icons (20 symbols) | Header, form, proof list, buttons | [Phosphor Icons](https://phosphoricons.com) via npm `@phosphor-icons/core@2.1.1` (bold, duotone, fill weights) | MIT |
| Airline marks (8) | Airline band | [Soaring Symbols](https://soaringsymbols.org) via npm `soaring-symbols@0.5.2` (`logo-mono.svg`) | Catalog and code MIT. **The marks are trademarks of their airlines** (see below) |
| Payment and review marks (5) | Card footer, Trustpilot button | [Simple Icons](https://simpleicons.org) via npm `simple-icons@16.38.1` | CC0. Trademarks remain with their owners |
| Manrope (display) | Headlines, fare, airport codes | [Fontsource](https://fontsource.org) `@fontsource-variable/manrope@5.3.0` | SIL OFL 1.1 (`fonts/LICENSE-Manrope-OFL.txt`) |
| Figtree (text) | Body and controls | [Fontsource](https://fontsource.org) `@fontsource-variable/figtree@5.3.0` | SIL OFL 1.1 (`fonts/LICENSE-Figtree-OFL.txt`) |
| Onward Sky logo | Header, favicon | Client's own asset, extracted from the production export | Client |

## Illustrations (unDraw)

| File in `vectors/` | unDraw name | Used for |
| --- | --- | --- |
| `at-the-airport.svg` | at the airport | Hero traveler |
| `connected-world-soft.svg` | connected world | Faint atlas behind the hero |
| `reviews.svg` | reviews | Reviews header |
| `luggage.svg` | luggage | Moment: check-in |
| `my-documents.svg` | my documents | Moment: arrival |
| `approve.svg` | approve | Moment: visa |
| `travel-mode.svg` | travel mode | Moment: take-off |

unDraw ships its accent color as `currentColor`. The only change made to each file is a **color remap** to the
Onward Sky palette (no shapes were added, moved or redrawn):

| unDraw color | Becomes | Role |
| --- | --- | --- |
| `currentColor` (accent) | `#156970` | Brand teal |
| `#3f3d56`, `#2f2e41`, `#090814` | `#0F4C54`, `#0B2B30` | Deep teal and ink (clothing, objects) |
| `#e6e6e6`, `#f2f2f2`, `#f0f0f0`, `#e4e4e4`, `#cbcbcb`, `#d6d6e3`, `#e1e7ef` | Teal-tinted greys (`#D8E8E7` … `#C3D9D8`) | Backgrounds and shadows inside the art |
| `#ed9da0`, `#e8989b` | `#F08A57` | Warm accent (peach/orange clothing) |
| Skin tones, white | unchanged | |

`connected-world-soft.svg` is the same map with a lighter remap (`#B9DBE0` land, `#97CCD4` routes, `#EDF7F8` plate) so it can
sit quietly behind text.

## Icons (Phosphor)

Defined once as an inline SVG sprite in `index.html` (so previews work from `file://`). Bold weight for controls
(`b-…`), duotone for the proof tiles (`d-…`), fill for stars and the quote mark (`f-…`).

## Airline marks and trademark notice

The eight marks (British Airways, Malaysia Airlines, Turkish Airlines, Emirates, Qatar Airways, Iberia, KLM, AirAsia)
are the monochrome (`logo-mono`) versions from Soaring Symbols with their viewBox cropped to the drawn bounds and
rendered white on the dark band. **They are the property of their owners.** The Soaring Symbols disclaimer says the
project license does not cover the marks and that commercial use may need the owner's permission. The production
site already shows airline logos for the same purpose ("works with 100+ airlines"), so production should keep using
the client's own licensed files; these are stand-ins for the prototype.

**Gap:** SriLankan Airlines is named on the production site but is not in the Soaring Symbols collection, so the
prototype shows eight marks instead of nine. The client should supply that asset.

## Payment and review marks

PayPal, Stripe, Visa and Mastercard come from Simple Icons and are cropped to their bounds and shown in a quiet
monochrome. Simple Icons has no UPI mark, so UPI is set as text in the same chip. The Trustpilot star is the Simple
Icons glyph filled with Trustpilot's green (`#00B67A`) and is used only to label the link to the client's own
Trustpilot page.
