# Asset sources and licenses

**Rule for this prototype:** nothing figurative is drawn by hand. Every image, icon and logo is either the client's
own asset (copied unchanged or recolored with brand values) or comes from an open library or a free-licence photo site. The
scripts that reproduce the derived files are in [`../tools/`](../tools/README.md).

| Asset | Where it is used | Source | License / owner |
| --- | --- | --- | --- |
| Hero photograph (`img/hero-photo.webp`, `img/hero-photo-portrait.webp`) | Hero panel background, under two brand-teal veils | **[Unsplash](https://unsplash.com)**, image id `photo-1506012787146-f92b2d7d6d96` (an airliner's wing against a sunset), graded and resized by `tools/build-hero-photo.py` | **Unsplash License**: free for commercial use, no permission or attribution required. **Photographer not recorded** (see below) |
| Airline logos (9, `airlines/*.webp`) | Hero strip marquee | **Supplied by the client** (`imgi_39…47` archive); byte-identical copies | Client; the marks belong to their airlines |
| "Be ready" illustrations (4) | The four ticket stubs, inline in `index.html` | **The client's current homepage** (the `travel-use-cases` section). Mechanical changes only, see below | Client |
| Onward Sky logo (`img/onward-sky-logo.svg`) | Header, favicon | The client's logo, extracted from the production export | Client |
| UI icons (21 symbols) | Header, form, ticket label, proof bar, buttons, stars, play/pause | [Phosphor Icons](https://phosphoricons.com) via npm `@phosphor-icons/core@2.1.1` (bold, duotone and fill weights) | MIT |
| Payment marks (4) | Card footer | [Simple Icons](https://simpleicons.org) via npm `simple-icons@16.38.1` | CC0; trademarks remain with their owners |
| Figtree (text and display) | Everything | [Fontsource](https://fontsource.org) `@fontsource-variable/figtree@5.3.0` | SIL OFL 1.1 (`fonts/LICENSE-Figtree-OFL.txt`) |

## What changed from v2, v3 and v4

v2 used stock illustration (unDraw), airline marks from Soaring Symbols and a second typeface (Manrope). All of that is
gone. v3 and v4 used the client's own hero artwork (a dotted globe and a plane cut from its hero image) and, in v4, two of
the client's redacted sample itinerary pages. **v5 removes all of them** (the client asked for the two pages behind the form
to go) and replaces them with one photograph. The page now contains **no third-party illustration**; the third-party
artwork is the photograph, the icon family (Phosphor) and the payment marks (Simple Icons).

## The hero photograph

- **What it is:** an aerial view of an airliner's wing against a sunset. No people, no airline marks, no text in the frame.
- **How it was found:** Unsplash's search pages answer automated clients with an anti-bot challenge, and Pexels' pages with a
  block, so about a hundred candidate ids were fetched from the two image CDNs, compared on contact sheets and judged by eye.
  Four finalists were laid out at full size (a sunrise wing over bright clouds, a pastel-pink wing, this sunset wing and a Pexels
  wing with an airline logo on the winglet); this one is dark where the interface sits and warm where the sky is, which is the
  brand's own deep teal and burnt orange. See `../DESIGN-RATIONALE.md`.
- **Licence:** the [Unsplash License](https://unsplash.com/license) allows free use for commercial and non-commercial purposes
  with no permission or attribution; it does not allow selling the photograph unaltered or compiling photographs to compete
  with Unsplash, neither of which applies. Crediting the photographer is courtesy, not a condition.
- **Photographer:** not recorded. The sandbox cannot open Unsplash's photo pages and the image files carry no embedded credit.
  A reverse lookup of the id `photo-1506012787146-f92b2d7d6d96` on unsplash.com finds the page and the name if the client wants
  to add one before production.
- **The original is not stored in the repository.** Download it with the command at the top of `tools/build-hero-photo.py`.

## Mechanical changes to the artwork

| File | Change | Why |
| --- | --- | --- |
| `hero-photo.webp` | Original (2400 px) resized to 2000 px wide; a split-tone grade (shadows toward `#0E2F34`, lower mid-tones lightly toward `#0F555B`); WebP quality 78 (44 KB) | The dark ground under the form reads as brand teal; the warm sunset light is kept; the file is small enough to load with the page |
| `hero-photo-portrait.webp` | The right-hand 65% of the frame (wing tip and sun), resized to 900 px wide, same grade, 20 KB | Phones load a smaller picture; the crop keeps the subject at a narrow width |
| "Be ready" illustrations | Legacy variables resolved to the values the production page resolves them to (`--c-0B283D` → `#0E2F34`, `--c-27A3B5` → `#21A1A3`, `--c-FFD2B0` → `#FFD3BA`, `--c-BFE9F0` → `#C8E6E1`); lost camel case restored (`viewBox`, `feTurbulence`…); filter ids made unique; text font set to Figtree | The saved page loses its stylesheet context; the drawings render the same as on the live page |

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
