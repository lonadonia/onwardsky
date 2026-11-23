# Design rationale (v7)

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
| 4 | “Only small changes to the old site. A real design improvement, more professional, inspired by the competitor.” Vectors from other sites are fine | v4: a deep-teal sky, two sample itinerary pages behind a boarding-pass booking bar |
| 5 | Redo the hero (more professional, beautiful and organised); remove the two documents; professional images and vectors are welcome | v5: a photographic hero (a wing at sunset) |
| 6 | “Remove the image; make it vectors only. And improve the other sections too.” | v6: a vector route-map hero, a redesigned reviews section, a refined “Be ready” |
| **7** | **“Make the hero card a little wider and right for every size. Improve the other sections, more beauty and professionalism; professional vectors from a site are fine, on brand and in the same style as the ‘Be ready’ section.”** | **v7: a wider, fluid hero panel with the map running to its edge; the reviews rebuilt as tickets with three pictures in the “Be ready” style** |

## 3. Reading the round-7 request

- **“The card in the hero” is the teal panel.** The client's crop shows the panel's right edge with white beyond it: at 1440px
  and above the panel stopped at 1320px, so on a 1920 monitor it filled only 69% of the width and the margins grew from 16px
  (1280px) to 300px. “Wider and right for every size” means one rule at every width: a slim margin to the window until the
  panel reaches a generous maximum (1640px), with its content still on the page's one left edge.
- **The same style as “Be ready”.** What the client likes in that section is its ticket stubs and the client's own drawings:
  soft peach and mint blocks, one ink line, white paper, a warm orange accent, a slight hand-drawn wobble. “Vectors from a
  site” in that style means professional source objects built into pictures with that exact construction, not a stock set
  with its own look.
- **“The other sections.”** In scope that is the reviews (“Be ready” is the reference itself). They had to become part of the
  same family visibly, with every word, name, date and link kept.

## 4. The v7 changes

- **Hero panel:** `width: min(100% - 2 × (8–20px), 1640px)`; its content box is the page container, which grows from 1240 to
  1320px. 1408px wide at 1440, 1502 at 1536, 1640 from 1680; below 1280 as in v6, to a pixel or two. The route map is rebuilt 600 units wider by
  its script, and its routes stay in a 16:9 box (the panel up to 1320px, centred on the content), so the dots run on to the edge
  of a wide panel (Japan, Australia) while the routes keep their place beside the headline and above the form.
- **Reviews as tickets:** the Trustpilot summary becomes a small ticket (the score on the stub, as the stage word on the client's
  stubs); each review becomes the “Be ready” ticket stood upright: stub with the rating and a picture, perforation and notches,
  an orange topic label, the title, the quote, the reviewer and a barcode. They lie down on tablets exactly like “Be ready”.
- **Three pictures:** composed by `tools/build-review-art.py` from Tabler Icons (MIT) with the client's recipe, each showing what
  its reviewer wrote about (a PNR under a magnifier beside the appointment date; a phone receiving the email inside the
  stopwatch's two minutes; the itinerary's route beside a checked ID). Tabler was chosen over Lucide, IconPark and Hugeicons
  after rendering the same objects from all four in the client's line: its rounded 2-unit outlines match the client's drawings.

## 5. Reading the round-6 request (v6)

- **No photograph.** The hero has to be drawn with vectors. Round 2 still applies: vectors are taken from a source, not drawn
  by hand, and they have to be organised and on brand.
- **“The other sections too.”** The reviews and “Be ready” sections had not changed since v3 while the hero moved twice; they
  now looked like a different site from the hero above them. They needed a visible improvement, not a re-skin, while keeping
  every word and the client's “Be ready” illustrations.

## 6. The v6 idea: a route map, and one visual language down the page

**One sentence:** the hero is a map of where onward tickets go: a dot-matrix world drawn from open map data, with flight
routes between real airports, beside the headline and above a boarding-pass booking bar.

- **Vectors from data, not from a stock set.** The continents are Natural Earth's land polygons (public domain) sampled as a
  dot matrix; the routes are computed arcs between the real coordinates of London, Lisbon, Istanbul, Dubai, Delhi, Bangkok and
  Singapore; the airplane is Phosphor's icon. The build is a script (`tools/build-route-map.mjs`), so the art is exact and
  reproducible, and nothing is hand-drawn.
- **It continues the client's own motif.** The live site's hero art is a dotted globe; v6 turns that into a precise dotted world
  with routes, so the idea is the client's and the execution is new.
- **It says what the product does.** Routes, airport codes in departure-board tags and a plane in flight read as “flights between
  real airports” before a word is read, and they sit above an airline-logo strip that says the same thing.
- **Organised by construction.** The map is masked out across the text column, so the copy always sits on the plain gradient;
  it reaches full strength only on the right, above the form, and it is not shown below 900px where the text spans the width.
- **One language down the page.** The same dot matrix, in the brand teal at 16%, is the texture of the “Be ready” section; the
  reviews use the same card shape, radius and shadow as the tickets.

## 7. The other sections (v6)

### Reviews (redesigned)
- **Before:** three different cards (dark, tinted, white), a quote glyph, meta in one small line, and the Trustpilot link as a
  separate button under the grid.
- **Now:** the heading at the left and a **Trustpilot summary** at the right (the score “4.0” large, four of five green squares,
  “All 4 reviews rated 5 stars”, “Read more reviews on Trustpilot ↗”), so the proof is visible before the cards; then **three
  cards of one kind** with the rating and a quote mark on top, the title, the quote, and a footer with the reviewer's initials,
  name and country · date. The copy, names, dates and links are unchanged; countries are spelled out (IN → India, ES → Spain).

### Be ready (refined)
- **Before:** four tickets, the fourth one taller because it carried the button.
- **Now:** the button sits in the section's heading row, so the four tickets are the same shape and the action is easier to find;
  the section ground carries the hero's dotted map in the brand teal. The client's tickets, illustrations,
  copy and order are as on the live site, as round 3 asked.

## 8. The two sites, compared

### Current Onward Sky page (kept)
- **The booking form lives in the hero.** The biggest advantage over the competitor, whose hero only has a “Book now” button.
- A clear promise (“verifiable onward ticket in 2 minutes”), a visible price and delivery time beside the action.
- Teal ink, the burnt-orange CTA, Figtree, ticket-stub cards, honest Trustpilot excerpts, a dotted-globe motif.
- Solid form engineering: accessible combobox, plugin-matched validation, multi-city, a sticky mobile CTA.

### What held it back
- **A flat hero.** A form card on a faded gradient, a dotted globe and two stray planes; nothing framed the content, and the first
  viewport ended in an empty strip (its logos were hosted elsewhere and missing).
- **A cramped form.** 11–12px labels, an empty circle where the swap icon belongs, field borders at about 1.4:1.
- **Mixed review cards and “Be ready” in unequal columns** (7fr / 5fr), which wrapped headings, the button and “TAKE-OFF”.

### The competitor (onwardticket.com): learned and avoided
- **Learned:** an inset, rounded hero panel that frames the message; a **ticket** as the visual idea (boarding pass with
  perforation and notch); short proof statements near the hero; soft rounded surfaces; airline names as proof.
- **Avoided:** the form hidden behind a button; saturated mint with navy, lime and pink; gradient text; clouds; pill
  buttons; their boarding-pass graphic. Nothing was copied: no layout, asset, illustration or colour.

## 9. Key decisions

| Change | Why it helps |
| --- | --- |
| **Dot-matrix route map** (Natural Earth data, computed routes, Phosphor airplane) on the brand-teal gradient | Vectors only, from open sources, precise and on brand; it shows flights between real airports and continues the client's dotted-globe motif |
| **Map masked out under the text, hidden below 900px** | The copy always sits on the plain gradient; contrast measured at eight widths |
| **Boarding-pass booking bar** (≥ 1180px) | The competitor's ticket idea built as a real, working form; the fare and CTA sit together on the stub; the whole hero fits 1440×900 |
| **One glass proof bar** | Three promises and the TrustScore as one object, the width of the ticket |
| **Reviews: Trustpilot summary + three uniform cards with initials** | Proof is visible first; one card style instead of three; a human touch without invented photos |
| **“Be ready”: action in the heading row, map texture** | Four tickets of one shape; the section belongs to the same page as the hero |
| **Header collapses below 1200px** | Five links, WhatsApp and the CTA need about 1200px; below that the links wrapped |
| Pressed-orange error states | Matches the production form; red was off-brand |

## 10. Content decisions (all factual copy preserved)

All headlines, descriptions, review excerpts, names, dates, prices, delivery promises, payment methods and the TrustScore
disclosure are the client's existing copy.

- **Reviews:** the same three excerpts, titles, names, dates and links; “IN”/“ES” spelled out as India/Spain; the note under the
  cards repeats the client's disclosure (“Excerpts from individual 5-star reviews… Overall TrustScore 4.0”).
- **Initials** (ZK, MM, EF) are derived from the reviewers' names; no avatar photo is invented.
- **Airport codes** on the map (LHR, DXB, DEL, BKK) are illustrative real airports, not a claim about routes sold.
- **Be ready:** every label and paragraph is as on the live site; the button text is unchanged.
- **Not added:** no testimonials, customer counts, years in business, certifications, guarantees or prices.
- **v7 adds three short labels** on the review tickets, *Visa appointment*, *Delivery time* and *Itinerary details*, in the
  place of the audience labels on the “Be ready” tickets. Each names what that reviewer wrote about (a Schengen visa VFS
  appointment; receiving the reservation within the promised time; the passenger and route details); they add no claim.
  The stubs' “TRUSTPILOT” and “TRUSTSCORE” are labels for data already on the page. Flag the three topic labels for sign-off.

## 11. Self-critique during the build

Each issue was caught in a Playwright pass or a measurement and fixed:

- The first map placed its routes and dots under the right end of the lead and the trip tabs: the lead measured **3.1–3.7 : 1**,
  the tabs 4.0 : 1, and on phones an aqua route line crossed the aqua word “verifiable” (1.1 : 1). The map's focus was moved
  further right, the mask now clears the whole text column, and the map is hidden below 900px. Worst measured now: lead 4.9 : 1,
  tabs 4.8 : 1, the aqua word 3.5 : 1 (large text).
- The first dots (aqua at 42% over an aqua glow) were almost invisible; they are white at 30% on a softer glow.
- The review quote marks rendered black (the sprite symbol had no fill); they now take the mint colour.
- The masks used a black that the design-system lint flagged as an undocumented colour; they use the white token (a mask reads
  only alpha).
- The map image was downloaded on phones although it is hidden there; it is lazy-loaded now (phones load 264 KB, desktops 309 KB).
- The final skill passes found two more: the reviewers' name links were 21px tall (under the 24px target size, WCAG 2.5.8), now
  25px; and the “Be ready” tickets lifted on hover although they are not links (a false affordance, flagged by the frontend-design
  check), so the lift was removed.
- Measuring the airport tags showed that from 900 to 1179px three of them sat under the booking card (at 900px one peeked out
  from under its edge); below 1180px only the London tag is shown now. The tags measure at least 8.8 : 1 where they show.

In round 7:

- Widening the gutter to give the phone hero more air pushed the booking CTA below the first viewport at 360 × 740 and wrapped
  “Delivered in 2 minutes”; the change was reverted, and phones are as in v6.
- The first review grid kept three columns on phones (the old one-column rule had been removed with the old cards); fixed with
  a phone rule, then checked at 390, 600, 768, 900, 1100 and 1440.
- Moving each reviewer's `figcaption` inside the ticket's main column made it invalid inside `figure`; it is a direct child
  again and the grid places it (under the main column, or beside the stub when the ticket lies down).
- Measuring the hero at fourteen widths (v6 measured eight) found the lead at 4.3 : 1 at 1100px, on faint dots; in the
  900–1179px band the map now shows only above the card, and the lead's worst is 4.9 : 1.
- The review rating read “Trustpilot, Rated 5 out of 5 on Trustpilot” to a screen reader; it now reads “Trustpilot, Rated 5 out
  of 5”. The unused quote-mark symbol left the sprite.
