# Design rationale (v5)

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
| 4 | “Only small changes to the old site. A real design improvement, more professional, inspired by the competitor, a wonderful professional touch on the hero.” Vectors from other sites are fine | v4: a deep-teal sky, two sample itinerary pages behind a boarding-pass booking bar |
| **5** | **“Redo the hero: more professional, more beautiful, more organised. Remove the two documents in the back. You may use a set of vectors and professional, high-quality images from a site or sites, consistent with the brand.”** | **v5: a photographic hero** |

## 3. Why v4 fell short (an honest diagnosis)

v4 replaced the live site's composition, but its focal object was the weakest thing in the picture. The two itinerary pages
behind the form were small, rotated and unreadable at hero size; they competed with the headline, added a second layer of
visual noise next to the dotted globe, the plane and the badge, and made the right-hand side busy rather than rich. The hero
had a lot of parts and no single image to carry the eye. The client asked for fewer, better things.

## 4. The v5 idea: one photograph, one ticket

**One sentence:** an airliner's wing against a sunset, graded to the brand teals, with a boarding-pass booking bar laid across
it.

- **One picture instead of four decorations.** The sample pages, the badge, the plane and the globe are gone. The right-hand
  side is simply the sky: the wing tip and the sunset glow above the form. The eye goes headline → sky → ticket → orange button.
- **The right photograph.** Candidates were compared on contact sheets (about a hundred frames from Unsplash and Pexels, four
  finalists). The sunset wing won because it is dark exactly where the interface sits (the ground under the form and the logo
  strip) and warm exactly where nothing sits (the sky), which makes the brand's two colours, deep teal and burnt orange, appear
  naturally. A sunrise wing over bright clouds went murky under a teal veil; a pastel pink one was off-brand; one frame showed
  an airline's logo on the winglet and was rejected as a trademark risk.
- **Brand grading, not a filter.** The picture is graded with a split tone (shadows pulled to `heading`, lower mid-tones lightly
  to `deep`) so it sits inside the palette while keeping its warm light. A full duotone was tried first and looked flat.
- **Text on a veil, measured.** Text never sits on the bare photograph. Brand-teal veils darken the text side and the foot, and
  the contrast was measured on the rendered page at eight widths, not assumed (section 9 shows what that caught).
- **The form is still a boarding pass.** The notches at its perforation now show the photograph through them.
- **One proof bar.** The three promises and the TrustScore are one glass object with four cells, instead of four boxes. That is
  tidier, easier to scan and the same width as the ticket above it.
- **Logos as the horizon.** The airline marquee stays the foot of the panel.
- **Vectors.** No new vector artwork was added: the one thing the page needed was a photograph, and the icons (Phosphor) and the
  client's artwork (the nine logos, the four “Be ready” drawings) already form a consistent set. Adding more would have undone
  the “fewer, better” request.

## 5. The two sites, compared

### Current Onward Sky page (kept)
- **The booking form lives in the hero.** The biggest advantage over the competitor, whose hero only has a “Book now” button.
- A clear promise (“verifiable onward ticket in 2 minutes”), a visible price and delivery time beside the action.
- Teal ink, the burnt-orange CTA, Figtree, ticket-stub cards, honest Trustpilot excerpts.
- Solid form engineering: accessible combobox, plugin-matched validation, multi-city, a sticky mobile CTA.

### What held it back
- **A flat hero.** A form card on a faded gradient, a dotted globe and two stray planes; nothing framed the content or
  carried emotion, and the first viewport ended in an empty strip (its logos were hosted elsewhere and missing).
- **A cramped form.** 11–12px labels, an empty circle where the swap icon belongs, field borders at about 1.4:1.
- **“Be ready” in unequal columns** (7fr / 5fr): the narrow cards wrapped their headings, the button and “TAKE-OFF”.

### The competitor (onwardticket.com): learned and avoided
- **Learned:** an inset, rounded hero panel that frames the message; a **ticket** as the visual idea (boarding pass with
  perforation and notch); three short proof statements near the hero; soft rounded surfaces; airline names as proof.
- **Avoided:** the form hidden behind a button; saturated mint with navy, lime and pink; gradient text; clouds; pill
  buttons; their boarding-pass graphic. Nothing was copied: no layout, asset, illustration, photograph or colour.
- Observed fonts and colours: Poppins, navy `#1f368d` on mint with lime and pink accents. None is used here.

## 6. Key decisions

| Change | Why it helps |
| --- | --- |
| **Aerial photograph** (airliner wing, sunset) behind the hero, graded to the teals | The emotional centre the hero lacked; warm light against deep teal echoes the orange button; one image replaces four decorations |
| **Two brand-teal veils** (text side, foot) | Keep every line of text above its contrast threshold while the sky stays luminous on the right |
| **Boarding-pass booking bar** (≥ 1180px): main half + stub, notches, perforation | The competitor's ticket idea built as a real, working form; route, date and passengers share one row, and the fare and CTA sit together on the stub; the whole hero, logo strip included, fits 1440×900 |
| **Return on two rows, multi-city one flight per row** | Five controls do not fit one row at 1240px; the route keeps its width and nothing is clipped |
| **Card below 1180px**, lowered in the two-column band | Touch-friendly; every control ≥ 44px; the sunset stays visible above the card on small laptops and large tablets |
| **One glass proof bar** (three promises + TrustScore) | Same words, one object, aligned to the ticket's width; the Trustpilot cell sizes to its content |
| **Header collapses below 1200px** | At 1100px “How it works” and “Verify a PNR” wrapped onto two lines; five links, WhatsApp and the CTA need about 1200px |
| **Airline marquee on the darkest teal** | Exactly what was asked; production speed (46s), masked edges, pause on hover, focus, off screen and with a button (WCAG 2.2.2), a static row under reduced motion |
| **Reviews and “Be ready” unchanged from v3** | The client asked to keep them; v3's improvements (equal columns, aligned copy, no wrapped buttons) stand |
| Pressed-orange error states | Matches the production form; red was off-brand |

## 7. Images and vectors: sources and licences

The client allowed vectors and professional images from other sites, in the brand's spirit. The page now contains:
- **one photograph**, from Unsplash (Unsplash License: free for commercial use, no attribution required), graded as above;
- **no third-party illustration**: the artwork is the client's own (the four “Be ready” drawings, the nine airline logos);
- **icons** from one family (Phosphor, MIT) and payment marks (Simple Icons, CC0).

Unsplash and Pexels block automated access to their pages, so the candidates were found by id on their image CDNs and judged by
eye; the photographer's name could not be read from the sandbox (see `assets/SOURCES.md`). Provenance and the exact grade are
reproducible with `tools/build-hero-photo.py`.

## 8. Content decisions (all factual copy preserved)

All headlines, descriptions, review excerpts, names, dates, prices, delivery promises, payment methods and the
TrustScore disclosure are the client's existing copy.

- **Proof points:** the same three promises, one glass bar under the form.
- **Trust line:** “TrustScore 4.0 on Trustpilot / All 4 reviews rated 5 stars”, with the green rating squares, as the fourth cell.
- **Be ready:** every label (“READY FOR”, stage words, audience labels) and paragraph is as on the live site.
- **New UI copy** (not claims): the ticket label “Choose your route” (the card's former title), “No airports found. Try another
  spelling, a nearby city or a 3-letter airport code.”, the prototype's “Search ready …” confirmation, and the pause/play label.
  v4's “Verifiable PNR” badge and the sample-page caption are gone with the pages.
- **Not added:** no testimonials, customer counts, years in business, certifications, guarantees or prices.

## 9. Self-critique during the build

Each issue was caught in a Playwright pass or a measurement and fixed:

- The first photograph (a sunrise wing over bright clouds) went murky and foggy under the teal veil, and a full duotone made it
  flat. The sunset wing, with a split-tone grade, kept its depth.
- **The first veil failed contrast where it mattered**: the lead measured 2.5–3.4 : 1 on desktop and the aqua key word 2.9 : 1
  at 1024px. The side veil was reshaped (darker to the middle of the page, then a quick fade) and the top given a light
  vignette; the worst measured value on desktop is now 4.85 : 1 for both the lead and the key word.
- With equal columns, the Trustpilot cell of the proof bar wrapped to four lines and pushed the logo strip below the fold; the
  last column now sizes to its content.
- At 900–1179px the photograph vanished behind the text and the card; the card now starts 44–84px lower so the sunset shows.
- The header navigation wrapped at 1100px (a long-standing defect that captures at other widths had missed); it now collapses at 1200px.
- A divider drawn as a one-sided border on a rounded cell is a pattern the detector (rightly) distrusts; the bar is now a clipped
  container with square cells.
- Unsplash's anti-bot challenge blocked its search pages, and a first attempt to use its undocumented search endpoint was refused
  by the session's safeguards; the final photograph was chosen from image-CDN candidates by eye instead.
