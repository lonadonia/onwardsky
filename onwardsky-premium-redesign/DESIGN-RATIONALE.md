# Design rationale

## 1. Scope (confirmed from the export and screenshot)

In order, from the top of the page:

1. Header and navigation (logo, five links, WhatsApp support, CTA; mobile menu)
2. Hero with the booking form
3. Airline strip: “Onward Sky™ works with 100+ airlines”
4. Reviews: “Helping travelers get on with their journey.”
5. **“Be ready when proof of onward travel is requested”** (the last section in scope)

“A real onward ticket. See for yourself.” and everything after it are unchanged and not part of the prototype.

## 2. Audit

### What already worked (kept)
- **The booking form lives in the hero.** This is the single biggest advantage over the competitor, whose hero only has a “Book now” button.
- A clear, specific promise (“verifiable onward ticket in 2 minutes”), a visible price (“From $9.99”) and delivery time next to the action.
- A distinctive brand pairing: deep teal with a burnt-orange CTA and a recognisable logo.
- Honest social proof: real Trustpilot excerpts plus a disclosure of the overall 4.0 TrustScore.
- Solid form engineering underneath: accessible combobox, plugin-matched validation, multi-city 2–6 flights, a sticky mobile CTA.

### What held it back
- **Template composition.** The hero was the category default: copy left, a floating form card right, a faded gradient panel, a dotted globe and clip-art planes on dashed paths. Nothing in it was specific to Onward Sky.
- **Generic headline treatment.** A single accented word (“verifiable”) on a stock geometric sans, with a hierarchy only a little larger than the form.
- **A cramped form.**
  - Tiny 11–12px labels and an ambiguous floating swap circle.
  - Field borders at 1.4:1 contrast (below the WCAG 3:1 for control boundaries).
  - Price, delivery, trust lines and payment logos all competing at the same weight.
- **A disconnected airline strip.** An all-caps label on a teal band, with logos hosted externally (they vanished in the export).
- **Reviews as three unequal cards** (dark, tinted, white) with carousel arrows for only three items.
- **The “Be ready” section.**
  - Four similar ticket-stub cards with ALL-CAPS stub labels and orange eyebrow labels.
  - Inconsistent heights and empty space (the Visa card).
  - The only CTA buried in the fourth card.

### What the competitor (onwardticket.com) does well and badly
- **Learned:** one dominant message, a memorable boarding-pass motif, generous spacing, and named-airline proof.
- **Avoided:**
  - The booking form is hidden behind a button.
  - Pastel gradient cards everywhere, low-contrast light-on-mint text, and cartoon softness.
  - Identical rounded cards in every section.
- Nothing was copied: no layout, assets, illustrations or styling.

## 3. Directions explored

Seven world candidates were drawn from the traveller's own culture, ranked by resonance:

1. E-ticket itinerary
2. Airport wayfinding
3. Passport security print
4. Split-flap board
5. Aeronautical route chart
6. Luggage tag
7. The literal “sky”

The Impeccable skill's concept roll (which ran in a degraded, offline mode) assigned candidate 5. Three directions were then fully developed and scored on the brief's eight criteria:

| Criterion | **A · Enroute Chart** | B · The Itinerary | C · Wayfinding |
| --- | --- | --- | --- |
| Originality | 4 | 3 | 4 |
| Brand alignment | **5** | 3.5 | 4.5 |
| Premium quality | **4.5** | 3.5 | 3.5 |
| Booking-form prominence | **5** | 4.5 | 4.5 |
| Clarity | 4 | 5 | 5 |
| Ease of implementation | 3.5 | 4.5 | 4 |
| Responsive usability | 4 | 4.5 | 4.5 |
| Conversion potential | 4.5 | 4.5 | 4.5 |
| **Total** | **34.5** | 33 | 34 |

**Selected: A, the Enroute Chart.** It takes two disciplines from the others:
- From C, signage-grade clarity: one message per panel and large legible labels.
- From B, “prove, don't claim”: the console visibly assembles the traveller's real route.

Why it fits Onward Sky: the logo's orbit swoosh already describes a trajectory, “onward” is a route, and the
brand teals are chart inks. A chart also gives a premium, precise visual language that needs no stock
photography and stays light (pure SVG/CSS).

## 4. Key improvements and why

| Change | Why it helps |
| --- | --- |
| **Full-width booking console** spanning the hero, straddling the paper and night fields | The form becomes the hero's spine instead of a side card. At 1280×720 the full console, including the CTA, sits above the fold. |
| Fare + delivery set top-right, directly above the CTA | The price is read in the same glance as the action. |
| **Airport → identifier transformation** with a drawn route line | Turns form-filling into visible proof the system understands real routes; memorable and on-brand. |
| Labelled cells, 68px tall, 3:1 boundaries, 44px swap, 16px inputs on phones | Easier to read and tap; meets WCAG 1.4.11; no iOS zoom. |
| Visible error summary, inline errors with icons, focus to the first error, a “No airports found” state | Problems are explained where they happen, in the plugin's own wording. |
| **Condensed chart lettering** (Archivo) with Figtree kept for text | Typography becomes the strongest element (90px three-line headline broken on meaning) while staying continuous with the brand face. |
| Removed the accented-word headline, ALL-CAPS labels and eyebrows | These read as template tells; hierarchy now comes from scale and weight. |
| Chart-paper ground with a Lambert-conic graticule; night field with sky airways | A world specific to Onward Sky, at low contrast so it never fights the copy. |
| Airline strip rebuilt as identifier-boxed names on a grid | Factual, legible proof with no externally hosted logos; it reads as part of the chart. |
| Reviews as an editorial layout (featured + two supporting, hairline divider) | No identical cards or pointless carousel; the most relevant review (Schengen visa) leads. |
| **“Be ready” as a journey line** (Visa → Check-in → Take-off → Arrival) | The four moments become one story in travel order. The take-off CTA sits on the climb, and custom illustrations replace small stub art. |
| Sticky header CTA (desktop) and sticky fare bar (mobile) | The action is always one tap away, without competing with the console when it is on screen. |

## 5. Content decisions (all factual copy preserved)

All headlines, descriptions, review excerpts, names, dates, prices, delivery promises, payment methods
and the TrustScore disclosure are the client's existing copy. Changes made:

- **“Be ready” order** changed from Check-in, Arrival, Visa, Take-off to journey order (**Visa → Check-in → Take-off → Arrival**).
  - Stub labels “READY FOR X” became checkpoint labels on the journey line.
  - Persona labels (“One-way travelers”, etc.) moved from eyebrows to a line under each description (eyebrows are banned in this system).
- **Hero trust line:** “TrustScore 4.0 · All 4 reviews rated 5 stars” is now set as two lines, “TrustScore 4.0 on Trustpilot / All 4 reviews rated 5 stars”.
- **Placeholders:** “City or airport” became “City or airport…” (typographic convention for placeholder prompts).
- **New UI guidance copy** (not claims): “No airports found. Try another spelling, a nearby city or a 3-letter airport code.” and the prototype's “Search ready …” confirmation.
- **Airline strip:** the heading is in sentence case. The nine named airlines are unchanged; their IATA codes (BA, MH, UL, TK, EK, QR, IB, KL, AK) were added as identifiers.
- **Removed duplication:** the reviews section had no separate score block in the original, so none was added. The rating appears in the hero and in the section's footnote disclosure.
- **Not added:** no testimonials, customer counts, years in business, certifications, guarantees or new prices.

## 6. Self-critique: what was changed during review

Each issue below was caught in a Playwright screenshot pass and fixed:

- A compass rose and an orange airway in the hero collided with the lead text. Both were removed; the airways moved to the night band.
- Vignette labels sat under drawings, and the climb and descent paths crossed at the column gap. The illustrations were re-laid out with level-cruise joins.
- The Impeccable detector flagged Mona Sans as an overused face. It was replaced with Archivo after checking candidates against the detector.
- Journey columns misaligned. They now use a subgrid with titles bottom-aligned to their copy.
- On mobile, the trust line orphaned a word, the date field truncated at 375px, and the Trustpilot button was offset. All three were fixed.
- The sticky fare bar was reachable on desktop. It is now hidden at 1024px and up.
