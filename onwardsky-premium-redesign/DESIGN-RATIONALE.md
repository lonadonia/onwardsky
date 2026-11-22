# Design rationale (v3)

## 1. Scope (confirmed from the export and screenshot)

In order, from the top of the page:

1. Header and navigation (logo, five links, WhatsApp support, CTA; mobile menu)
2. Hero with the booking form, with the airline strip as its foot
3. Reviews: “Helping travelers get on with their journey.”
4. **“Be ready when proof of onward travel is requested”** (the last section in scope)

“A real onward ticket. See for yourself.” and everything after it are unchanged and not part of the prototype.

## 2. What the client asked for in this round

1. The colours are not carefully defined and do not match the brand.
2. Review the current site and the competitor again: the client wants inspiration from the competitor.
3. Make the hero more professional and more beautiful.
4. Put the supplied airline logos in the bottom strip, with a sideways scroll.
5. Leave “Be ready” as it was on the current site, with some improvements.

## 3. Why the colours were wrong, and how they are fixed

**Diagnosis.** v1 and v2 invented their colours: near-matches of the brand teal (`#0B2B30`, `#E3F2F3`, `#0B363C`), a
blue-grey and a sand pastel for the moments, and a red for errors. None of them exist on the production site, and there
were more of them than a system needs. A first reading of the production CSS also misled: it names variables after blues
(`--c-0B283D`, `--c-E4F5FB`, `--c-27A3B5`) but the page **remaps every one to a teal** (`#0E2F34`, `#E7F3F3`, `#21A1A3`).
Computed styles, not variable names, are the truth.

**Fix.** The palette is now exactly the production palette:
- the theme.json presets (`heading #0E2F34`, `accent #156970`, `accent-bright #21A1A3`, `deep #0F555B`, `surface #E7F3F3`,
  the border family, `cta #C94300` with its hover and active values), and
- the values the section styles resolve to (strip gradient `#186C73 → #156970`, mint `#C8E6E1`, peach `#FFD3BA`, orange text
  `#CC4700`, …).

Names are kept as in the theme, so porting is a 1:1 mapping into `theme.json`. Errors now use the production's own error
colour (the pressed orange, `#9C3200`) on its peach wash instead of red. `tools/palette-audit.js` renders the page and lists
every colour it paints; all are in the palette (details in `DESIGN-SYSTEM.md`). The typeface is Figtree only, as in
production. v2's second face (Manrope) is removed, and so is all stock illustration: the page uses the client's own art.

## 4. The two sites, compared

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
  perforation and notch); three short proof statements set as one strip below the hero; soft rounded surfaces; airline names as proof.
- **Avoided:** the form hidden behind a button; saturated mint with navy, lime and pink; gradient text; clouds; pill
  buttons; their boarding-pass graphic. Nothing was copied: no layout, asset, illustration or colour.
- Observed fonts and colours: Poppins, navy `#1f368d` on mint with lime and pink accents. None is used here.

## 5. Key decisions

| Change | Why it helps |
| --- | --- |
| **Inset hero panel** (28px radius, soft teal gradient) with the airline strip as its foot | Frames the hero like the competitor's panel, keeps the client's own gradient and strip, and lines the content up with the header |
| **Ticket language throughout.** The three promises become a boarding-pass strip with perforations and notches | The competitor's ticket idea, built from the client's own ticket-stub motif from “Be ready”; one visual idea from hero to last section |
| Booking card with a deep-teal header, trip tabs on the same row, compact fields | The form stays the most finished object, and the whole hero (card CTA, proof strip, logo strip) now fits the first viewport at 1440×900 |
| The client's **dotted globe and one plane** in place of two stray planes | Brand continuity; the plane flies out from behind the card instead of crossing the headline |
| **Airline strip as a marquee** of the client's nine logos | Exactly what was asked; production speed (46s), masked edges, pause on hover, a visible pause button (WCAG 2.2.2) and a static row under reduced motion |
| **Reviews as the production trio** (dark, tint, white), equal widths, aligned meta | Same identity as the live site; the carousel arrows are gone because three cards fit |
| **“Be ready” restored**, in equal columns with top-aligned copy | Same tickets, copy, art and order; no squeezed card, aligned rows, a button that never wraps |
| Pressed-orange error states | Matches the production form; red was off-brand |

## 6. Content decisions (all factual copy preserved)

All headlines, descriptions, review excerpts, names, dates, prices, delivery promises, payment methods and the
TrustScore disclosure are the client's existing copy.

- **Proof points:** the three bullets moved from the hero's left column into the boarding-pass strip under it (same words).
- **Trust line:** “TrustScore 4.0 on Trustpilot / All 4 reviews rated 5 stars”, with the green rating squares.
- **Be ready:** every label (“READY FOR”, stage words, audience labels) and paragraph is as on the live site.
- **New UI guidance copy** (not claims): “No airports found. Try another spelling, a nearby city or a 3-letter airport code.”,
  the prototype's “Search ready …” confirmation, and the pause/play control label.
- **Not added:** no testimonials, customer counts, years in business, certifications, guarantees or prices. Reviewer
  avatars are gone (the production cards have none).

## 7. Self-critique during the build

Each issue was caught in a Playwright pass and fixed:

- The first hero ended with the airline strip below the fold; the card header was compacted to one row and spacing tightened so the strip's logos are visible at 1440×900.
- Both of the client's planes were drawn first and one landed on the headline; the art was split so only the plane beside the card remains.
- The “Be ready” cards first stacked in one column on desktop (a missing breakpoint rule); fixed.
- Copy centred against a tall multi-city card drifted down the panel; it is now top-aligned.
- After pressing the pause button and then play, the marquee stayed paused because the button kept focus inside a `:focus-within` rule; the pause rule now applies to the logos only.
- A scroll-in effect that faded cards made automated contrast checks flaky while a card was mid-fade; the effect is transform-only now (three consecutive axe runs: 0 violations).
- On tablets the globe sat behind the lead paragraph; the lead is narrower there and the globe fainter. On phones it is hidden.
