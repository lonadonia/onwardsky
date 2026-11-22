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
- A friendly, recognisable brand: deep teal, a burnt-orange CTA, rounded Figtree type, illustrated moments.
- Honest social proof: real Trustpilot excerpts plus a disclosure of the overall 4.0 TrustScore.
- Solid form engineering underneath: accessible combobox, plugin-matched validation, multi-city 2–6 flights, a sticky mobile CTA.

### What held it back
- **A generic hero.** Copy left, a floating form card right, a faded gradient panel, a dotted globe and clip-art planes. Nothing in it showed a person or the moment the product solves.
- **A cramped form.** 11–12px labels, an empty circle where the swap icon should be, field borders at 1.4:1 contrast (below WCAG's 3:1 for control boundaries), and price, delivery, trust and payment logos all at the same weight.
- **A dead airline strip.** An all-caps label on a teal band; the logos are hosted externally and vanished in the export.
- **Reviews as three unequal cards** with carousel arrows for only three items.
- **The “Be ready” cards.** Four similar stub cards with ALL-CAPS labels and orange eyebrows, uneven heights, and the only CTA buried in the fourth.

### The competitor (onwardticket.com): what to learn and what to avoid
- **Learned:** one dominant message, a visual that shows the product, generous spacing, named-airline proof, human faces in social proof.
- **Avoided:** the booking form hidden behind a button; pastel mint everywhere with low-contrast light-on-mint text; identical rounded cards in every section; cartoon softness.
- Fonts and colors observed in its CSS: Poppins, navy `#1f368d` on mint, lime and pink accents. Nothing was copied: no layout, assets, illustrations or styling.

## 3. What v1 got wrong (and why it was rejected)

The first version used a cold “aeronautical chart” world: condensed display type, a faint graticule, a dark band, and
illustrations drawn by hand in code. The client rejected it outright. The honest critique:

- **It abandoned the brand's warmth.** The original is friendly and human; v1 was technical and dry, and read as a different company.
- **Hand-drawn art looked amateur.** The vignettes were simple shapes, not professional illustration. The client was explicit that vectors must come from a real library.
- **Nothing in the first viewport was human or concrete.** No traveler, no scene, no real airline marks; a hairline grid is not a hero.
- **Typography was harsh.** Heavy condensed capitals suit a flight board, not a trust-first consumer brand.
- **The form was a wide search bar.** It matched airline sites but was less comfortable than the original's tall card.

## 4. v2 concept: “The Daylight Terminal”

Three directions were considered again with that feedback:

| Direction | Verdict |
| --- | --- |
| A · **Daylight terminal**: bright stage, a traveler at the airport, a tall booking card with a deep teal header, fetched illustration | **Chosen**: closest to the brand, most human, and the card stays the focal point |
| B · Deep teal hero with white card | Rejected: the unDraw figures use dark ink and would vanish on a dark ground |
| C · Light hero with a deep teal card | Close, but heavier than needed; the card header carries the same brand weight |

The traveler is on a phone with luggage and a boarding pass while a plane passes overhead: it tells the product's story
(“I need proof at the counter, now”) before a word is read. She stands on the top edge of the airline band, so the
illustration, the proof and the page share one ground.

## 5. Key improvements and why

| Change | Why it helps |
| --- | --- |
| **Tall booking card** with a deep teal header (title and trip tabs), 480px wide, on a soft halo | Bigger labels and targets, clearer grouping, and the most finished object on the page; the CTA clears the fold at 1280×720 and on phones |
| Route as **From over To** with a dashed connector and a real swap icon; chosen airports become **departure-board entries** | Easier to read and tap than a floating circle; the form visibly “understands” the route (the connector turns orange) |
| Fare and delivery directly above the CTA; assurances and payment marks below | The price is read in the same glance as the action; trust details no longer compete with it |
| Visible error summary, inline errors with icons, focus to the first error, a “No airports found” state | Problems are explained where they happen, in the plugin's own wording |
| **Manrope 800 headlines** over the brand's Figtree | A confident premium voice without leaving the brand's friendly geometry |
| **Fetched illustration** (unDraw, recolored to the brand) in the hero, reviews and moments | Professional art that is cohesive with the palette and clearly not hand-made |
| **Real airline marks** in white on a deep teal band | Instantly legible proof, replacing invisible externally hosted logos |
| Reviews: one **featured quote** on deep teal plus two supporting quotes, with the illustration | A clear hierarchy (the Schengen visa story leads) instead of three mismatched cards and carousel arrows |
| “Be ready” as **four pastel stages with illustration**, aligned across columns | Each person finds their moment at a glance; no stub cards, no eyebrows; the CTA keeps its place |
| Sticky header CTA (desktop) and sticky fare bar (phones and tablets) | The action is always one tap away without competing with the card when it is on screen |

## 6. Content decisions (all factual copy preserved)

All headlines, descriptions, review excerpts, names, dates, prices, delivery promises, payment methods and the
TrustScore disclosure are the client's existing copy. Changes made:

- **“Be ready” stays in the original order** (check-in, arrival, visa, take-off). The stub labels “READY FOR …” became small tags on each illustration; the audience labels (“One-way travelers”, etc.) moved from eyebrows to a line under each description.
- **Hero trust line:** “TrustScore 4.0 · All 4 reviews rated 5 stars” is set as two lines, “TrustScore 4.0 on Trustpilot / All 4 reviews rated 5 stars”.
- **Placeholders:** “City or airport” became “City or airport…”.
- **New UI guidance copy** (not claims): “No airports found. Try another spelling, a nearby city or a 3-letter airport code.” and the prototype's “Search ready …” confirmation.
- **Airline strip:** the heading is in sentence case; eight of the nine named airlines appear as marks (SriLankan is not in the fetched library; see `assets/SOURCES.md`).
- **Not added:** no testimonials, customer counts, years in business, certifications, guarantees or new prices. Reviewer avatars are the reviewers' initials only.

## 7. Self-critique during the build

Each issue was caught in a Playwright screenshot pass and fixed:

- The traveler first sat behind the halo and over the lead text; the layering was fixed and the text column narrowed.
- The first atlas was too dark and fought the headline; it was remapped to a quiet teal-on-teal.
- A hero clip also cut off the airport suggestions list; the decoration now lives in its own clipped layer.
- The airport chip lost a letter to a neighbouring marker; focused fields now stack above their siblings.
- The visa illustration read as a close-up of a face; it was replaced by one showing a document being approved.
- On phones the booking CTA fell below the fold; spacing was tightened (and the title kept for screen readers only) so the whole form fits at 375×812.
