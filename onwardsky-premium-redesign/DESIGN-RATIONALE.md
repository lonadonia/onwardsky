# Design rationale (v4)

## 1. Scope (confirmed from the export and screenshot)

In order, from the top of the page:

1. Header and navigation (logo, five links, WhatsApp support, CTA; mobile menu)
2. Hero with the booking form, with the airline strip as its foot
3. Reviews: “Helping travelers get on with their journey.”
4. **“Be ready when proof of onward travel is requested”** (the last section in scope)

“A real onward ticket. See for yourself.” and everything after it are unchanged and not part of the prototype.

## 2. What the client asked for, round by round

| Round | The client said | What was delivered |
| --- | --- | --- |
| 1 | Premium UI/UX redesign of the homepage, form prominent above the fold, every form capability preserved | v1, rejected (“a very bad design”) |
| 2 | Nothing pleased them: inspect both sites properly, design something professional, and fetch vectors from a source instead of drawing them | v2 (a bright “Daylight Terminal”), rejected: invented palette, stock illustration, a second typeface |
| 3 | The colours must match the brand exactly; take inspiration from the competitor; a better hero; the supplied airline logos in a sideways-scrolling strip; keep “Be ready” as on the live site, with improvements | v3: production palette, framed hero, marquee, restored “Be ready”; rejected as too close to the old site |
| **4** | **“You only made small changes to the old site. The client wants a real design improvement, more professional, inspired by the competitor, with a wonderful professional touch especially on the hero: more beautiful, organised and consistent. Vectors from other sites are fine if used precisely and in an organised way.”** | **v4: a new hero composition** |

## 3. Why v3 fell short (an honest diagnosis)

v3 fixed the colours, but it kept the live site's composition: copy at the left, a tall form card at the right, a faded
panel behind them. It re-skinned that composition (a rounded panel, a teal card header, a strip of promises) without
changing what a visitor sees first. The client read it, fairly, as the old site with small changes. Three structural
problems remained:

- **The hero showed no product.** The visitor is asked to pay for “a verifiable onward ticket” and never sees one in the
  first viewport. The client's own page shows redacted sample itineraries lower down, under “A real onward ticket. See for
  yourself.”
- **The form was the same object.** A white 468px card of stacked fields is what the live site has; the ticket idea
  appeared only below it.
- **No focal point.** Headline, card, art and chips competed at similar weight on a pale ground, so nothing led the eye.

## 4. The v4 idea: show the ticket, and make the form one

**One sentence:** a deep-teal sky panel in which the product (the client's sample itinerary) rises from behind a
boarding-pass-shaped booking bar.

- **The sky.** The hero panel is now the brand's darkest teal gradient. White type on it is the strongest contrast on the
  page, so the headline finally leads, and every light object (the sheets, the ticket) stands out without extra effects.
- **The product, shown.** The client's own redacted itinerary pages, rotated and overlapping, with a “Verifiable PNR” badge.
  This answers the visitor's first question (“what exactly will I get?”) before they read a word.
- **The form is a boarding pass.** On desktop the booking form is a wide ticket across the panel: route, date and
  passengers on the white half, the fare and the orange CTA on the tinted stub, a perforation and two notches between them.
  It keeps every capability of the production form. Below 1180px it becomes the familiar card, so touch screens get large
  targets and a single column.
- **Chips instead of a strip.** The three promises and the TrustScore are four quiet glass chips on the sky (the
  competitor's “three promises” idea, in the client's colours).
- **Logos as the horizon.** The airline marquee stays the foot of the panel, now on the darkest teal, so white logos read at
  full contrast.

## 5. The two sites, compared

### Current Onward Sky page (kept)
- **The booking form lives in the hero.** The biggest advantage over the competitor, whose hero only has a “Book now” button.
- A clear promise (“verifiable onward ticket in 2 minutes”), a visible price and delivery time beside the action.
- Teal ink, the burnt-orange CTA, Figtree, ticket-stub cards, honest Trustpilot excerpts.
- Solid form engineering: accessible combobox, plugin-matched validation, multi-city, a sticky mobile CTA.

### What held it back
- **A flat hero.** A form card on a faded gradient, a dotted globe and two stray planes; nothing framed the content or
  showed the product, and the first viewport ended in an empty strip (its logos were hosted elsewhere and missing).
- **A cramped form.** 11–12px labels, an empty circle where the swap icon belongs, field borders at about 1.4:1.
- **“Be ready” in unequal columns** (7fr / 5fr): the narrow cards wrapped their headings, the button and “TAKE-OFF”.

### The competitor (onwardticket.com): learned and avoided
- **Learned:** an inset, rounded hero panel that frames the message; a **ticket** as the visual idea (boarding pass with
  perforation and notch); three short proof statements near the hero; soft rounded surfaces; airline names as proof.
- **Avoided:** the form hidden behind a button; saturated mint with navy, lime and pink; gradient text; clouds; pill
  buttons; their boarding-pass graphic. Nothing was copied: no layout, asset, illustration or colour.
- Observed fonts and colours: Poppins, navy `#1f368d` on mint with lime and pink accents. None is used here.

## 6. Key decisions

| Change | Why it helps |
| --- | --- |
| **Dark teal sky panel** (`accent → deep → v9-deep`) | A focal ground for white type; still only production colours; the strip and the panel read as one object |
| **Sample itinerary pages** (the client's own, rotated, behind the ticket) | Shows the product in the first viewport; reuses an asset the client already publishes; no invented claims |
| **Boarding-pass booking bar** (≥ 1180px): main half + stub, notches, perforation | The competitor's ticket idea built as a real, working form; route, date and passengers share one row, and the fare and CTA sit together on the stub; the whole hero, logo strip included, fits 1440×900 |
| **Return on two rows, multi-city one flight per row** | Five controls do not fit one row at 1240px; the route keeps its width and nothing is clipped |
| **Card below 1180px** with a tinted header | Touch-friendly; every control ≥ 44px; one column |
| **Four glass chips** (three promises + TrustScore) | Same words as before; the Trustpilot line moved out of the headline column, which shortened the hero so the logo strip is above the fold |
| **Dotted globe and one plane (white and aqua variants)** | The client's own art recoloured for the dark sky; the plane flies from the sheets to the headline's side |
| **Airline marquee on the darkest teal** | Exactly what was asked; production speed (46s), masked edges, pause on hover, a visible pause button (WCAG 2.2.2), a static row under reduced motion |
| **Reviews and “Be ready” unchanged from v3** | The client asked to keep them; v3's improvements (equal columns, aligned copy, no wrapped buttons) stand |
| Pressed-orange error states | Matches the production form; red was off-brand |

## 7. Vectors and artwork

The client allowed vectors from other sites if used precisely and in an organised way. v4 uses **no** third-party
illustration at all: the artwork is the client's own (the dotted globe and plane from its hero, the sample itinerary pages from
its own page, the four “Be ready” drawings, the airline logos), and the icons are one consistent family (Phosphor, MIT). A
trial with unDraw clouds was rejected on sight: they read as clip art against the client's linework. Provenance and every
mechanical change: `assets/SOURCES.md`.

## 8. Content decisions (all factual copy preserved)

All headlines, descriptions, review excerpts, names, dates, prices, delivery promises, payment methods and the
TrustScore disclosure are the client's existing copy.

- **Proof points:** the same three promises, now glass chips under the form.
- **Trust line:** “TrustScore 4.0 on Trustpilot / All 4 reviews rated 5 stars”, with the green rating squares, as the fourth chip.
- **Be ready:** every label (“READY FOR”, stage words, audience labels) and paragraph is as on the live site.
- **New UI copy** (not claims): the ticket label “Choose your route” (the card's former title), the badge “Verifiable PNR”
  (the client's own phrase), the sheets' accessible name, “No airports found. Try another spelling, a nearby city or a 3-letter
  airport code.”, the prototype's “Search ready …” confirmation, and the pause/play control label.
- **Not added:** no testimonials, customer counts, years in business, certifications, guarantees or prices. The itinerary pages
  are the client's samples, already marked “SAMPLE · PRIVACY REDACTED”.

## 9. Self-critique during the build

Each issue was caught in a Playwright pass or a measurement and fixed:

- The first ticket put the Trustpilot line in the headline column and pushed the logo strip below the fold; it became the fourth
  chip and the spacing was tightened so the whole hero fits 1440×900.
- Return needed two rows: five controls in one row clipped the date fields at 1240px.
- Between 1024 and 1179px the stacked layout pushed the CTA below the fold; from 900px the copy and the card now sit side by side.
- On tablets the lead ran under the sample sheets; its width now accounts for them (and the sheets are hidden below 680px and in
  the two-column layout).
- Trustpilot's rating squares shrank in narrow chips; they no longer shrink.
- On phones the aqua glow sat under the headline and lead (measured as low as 3.4 : 1 for the lead); it is removed there. The
  measured worst case on the gradient is now 4.8 : 1 for body text and 3.8 : 1 for the large aqua word.
- An entrance effect that faded the form made an automated contrast check flag the CTA mid-fade (4.2–4.4 : 1 against 4.5); text,
  the form and the chips now slide without fading (axe: 0 violations in 8 consecutive runs and in four states).
- Multi-city flight 1 was wider than flights 2–6 because it has no remove button; the column is now always reserved.
- The hairline between From and To was a one-sided border on a rounded box, a pattern the detector (rightly) distrusts; it is now
  a line on the route group's centre.
- The notch cut-outs are painted with gradients rather than masks so the airport list is never clipped.
