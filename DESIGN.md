---
name: Onward Sky
description: A bright, human travel-document service: pale teal daylight, a traveler in the scene, and a booking card you step up to.
colors:
  ink: "#0B2B30"
  ink-secondary: "#2E474B"
  ink-muted: "#4F676B"
  placeholder: "#5E7478"
  brand-teal: "#156970"
  deep-teal: "#0F555B"
  night-teal: "#0B363C"
  logo-sky: "#2FB0C6"
  sky-soft: "#8FD3DF"
  mist: "#B8D3D2"
  action-orange: "#C94300"
  action-orange-hover: "#B33C00"
  action-orange-active: "#9C3200"
  stage: "#E3F2F3"
  stage-deep: "#D0E9EC"
  paper: "#F3F9F9"
  white: "#FFFFFF"
  hairline: "#D5E3E2"
  control-line: "#7E979A"
  selection: "#BFE3E7"
  star-muted: "#BCD3D2"
  tint-peach: "#FBE5D4"
  tint-teal: "#D6ECEF"
  tint-sky: "#D9E9F6"
  tint-sand: "#F5EADA"
  error: "#B3261E"
  error-wash: "#FDF1EF"
  confirm: "#17684A"
  confirm-wash: "#EAF5F0"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.25rem + 3.75vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.1rem + 2.6vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.12rem + 0.4vw, 1.5rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  price:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.125rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "'tnum' 1, 'lnum' 1"
  code:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.01em"
  lead:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  ui:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 650
    lineHeight: 1.3
  ui-compact:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.3
  button:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.15
  micro:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1
  price-compact:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  display-phone:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1.3rem + 5.2vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  small:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.25
rounded:
  chip: "8px"
  button-sm: "12px"
  field-inner: "13px"
  control: "14px"
  menu: "16px"
  panel: "24px"
  phone-card: "22px"
  card: "28px"
  pill: "999px"
spacing:
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "7": "32px"
  "8": "40px"
  "9": "48px"
  "10": "64px"
components:
  button-primary:
    backgroundColor: "{colors.action-orange}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.action-orange-hover}"
  button-primary-active:
    backgroundColor: "{colors.action-orange-active}"
  button-submit:
    backgroundColor: "{colors.action-orange}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "0 28px"
    height: "60px"
  button-quiet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "66px"
  booking-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "20px 22px"
  booking-card-head:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "14px 16px 14px 24px"
  segment-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep-teal}"
    rounded: "{rounded.chip}"
    padding: "8px 14px"
  stage:
    backgroundColor: "{colors.tint-peach}"
    rounded: "{rounded.card}"
  review-featured:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "48px"
  review:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.panel}"
    padding: "32px"
---

# Design System: Onward Sky

## Overview

**Creative North Star: "The Daylight Terminal"**

Onward Sky is drawn as a bright departure hall: pale teal daylight, a traveler on a phone with her luggage and a plane overhead, and a booking card that is the counter she steps up to. It keeps the brand's friendly identity (teal, the production orange, Figtree) and adds weight where a premium service needs it: confident Manrope headlines, a deep teal card header, real airline marks and illustration with a human in it.

Density is calm. Large type, generous space, and surfaces that change color by meaning: pale teal for the welcome, deep teal for the instrument and the proof, white for reading, four pastel stages for the four moments. Motion is one gentle entrance on load; after that, only answers to input.

Everything that looks drawn was fetched. Illustrations come from the unDraw collection and are only recolored; icons are Phosphor; airline and payment marks come from Soaring Symbols and Simple Icons; the full record is in `assets/SOURCES.md`.

**Key Characteristics:**
- Pale teal stage with one large soft halo behind the booking card and a faint vector atlas behind the traveler.
- Deep teal as the committed dark: the card header, the airline band and the featured review.
- Burnt orange appears only on actions (and on the plotted connector once a route is set).
- Manrope 800 for headlines, prices and airport codes; Figtree for sentences and controls.
- Fetched illustration, recolored to brand teal, ink and a peach accent; the figure stands on a real edge (the band).

## Colors

A cool, teal-tinted daylight palette with one hot action color.

### Primary
- **Action Orange** (action-orange): primary buttons and the plotted route connector. Hover deepens to action-orange-hover, press to action-orange-active.

### Secondary
- **Brand Teal** (brand-teal): links, rating stars, small icons, delivery note, illustration accent.
- **Deep Teal** (deep-teal): the booking card header, selected states, the featured review, identifier chips.
- **Night Teal** (night-teal): the airline band and the scope strip; carries white marks and mist text.

### Tertiary
- **Logo Sky** (logo-sky) and **Sky Soft** (sky-soft): quote mark, stars and icons on deep teal and night.
- **Mist** (mist): secondary text on night.

### Neutral
- **Ink** (ink): headlines and primary text, 14:1 on stage.
- **Ink Secondary** (ink-secondary) and **Ink Muted** (ink-muted): reading text and meta; both clear 5:1 on every light ground.
- **Stage** (stage) and **Stage Deep** (stage-deep): the hero ground and the halo.
- **Paper** (paper): section ground and quiet panels. **White** (white): reading surfaces, fields, the card body.
- **Hairline** (hairline): decorative dividers only. **Control Line** (control-line): every control boundary (3.1:1 on white).
- **Tints** (tint-peach, tint-teal, tint-sky, tint-sand): the four moment stages, one per moment.

### Named Rules
**The One Hot Color Rule.** Burnt orange marks what happens next (the action, the route) and nothing else: never a heading, badge or background wash.

**The Boundary Rule.** A control's edge uses control-line (3:1 minimum); hairline is for decoration and never the only boundary of something a person operates.

**The Fetched Art Rule.** Illustration, icons, logos and maps are fetched from open libraries and only recolored or cropped. Nothing figurative is drawn by hand; every source is recorded with its license.

## Typography

**Display Font:** Manrope variable (with the platform sans)
**Body Font:** Figtree variable (with the platform sans)

**Character:** A modern geometric headline voice over the brand's round, friendly text face: Manrope names things and sets prices, Figtree talks to people.

### Hierarchy
- **Display** (800, clamp(2.5rem…4.75rem), line-height 1.02, -0.035em): the hero headline only, broken on meaning.
- **Headline** (800, clamp(2rem…3.25rem), line-height 1.05, -0.03em): section titles, balanced.
- **Title** (800, clamp(1.25rem…1.5rem), line-height 1.15): moment questions, review titles.
- **Price and Code** (800, 2.125rem and 1.625rem, tabular lining numerals): the fare and chosen airport codes.
- **Lead** (400, clamp(1.0625rem…1.25rem), line-height 1.55, max 22em): the hero promise and section intros.
- **Body** (400, 1rem, line-height 1.6, max 34ch in columns): descriptions and quotes.
- **UI** (650, 1.0625rem), **UI compact** (600, 0.9375rem), **Button** (700, 1.125rem in the card) and **Label** (600, 0.8125rem, sentence case): fields, buttons, meta; **Micro** (700, 0.75rem) for payment chips.

### Named Rules
**The Two Voices Rule.** Manrope carries headings, prices and codes; Figtree carries sentences and controls. Never a paragraph in Manrope or a heading in Figtree.

**The Sentence Case Rule.** Labels, buttons and headings are sentence case; only airport and airline codes are capitals.

## Layout

A 12-column grid in a 1240px container with fluid gutters (16px on phones to 56px) and 16–28px column gaps. Sections breathe on a fluid rhythm (64px to 104px). The hero places copy at the left, the 480px booking card at the right and the traveler between them, standing on the top edge of the airline band; below 1024px the order becomes copy, card, traveler, and the proof points move into the band.

The booking card runs on its own two-column grid: route (From over To) full width, date and passengers side by side, fare, submit, status and foot. Return adds a return-date cell and moves passengers beside the fare; multi-city stacks labelled flights (2–6) with From and To side by side.

Reviews pair one featured quote (7 columns) with two supporting quotes (5 columns) under an intro and illustration. The moments run as four columns sharing rows through CSS subgrid (stage, title, body), then 2×2 on tablets and one column on phones.

## Elevation & Depth

Mostly flat and tonal; depth comes from color fields (stage, halo, deep teal) and from the booking card lifting off them. Shadows are reserved for things you operate, always with an offset and a soft blur tinted from ink or the action color.

### Shadow Vocabulary
- **Card** (`0 1px 1px rgba(11,43,48,.05), 0 10px 24px -10px rgba(11,43,48,.2), 0 44px 80px -36px rgba(11,43,48,.5)`): the booking card only.
- **Pop** (`0 2px 6px rgba(11,43,48,.08), 0 22px 44px -18px rgba(11,43,48,.36)`): the suggestions list.
- **Action** (`0 1px 1px rgba(122,51,0,.28), 0 10px 22px -12px rgba(201,67,0,.62)`): primary buttons; longer on hover, collapsed on press.

### Named Rules
**The Instrument Rule.** Only things you can operate float. Content panels sit on their ground with a tint or a hairline, never a shadow.

## Shapes

Radii follow hierarchy: 8px chips and tabs, 12px small buttons, 14px controls and the submit button (13px for the fields nested inside the route group), 16px for the suggestions menu, 24px panels, 28px for the booking card, featured review and moment stages (22px for the card on phones). Circles are reserved for the swap control, avatars and route markers. Illustration sits on tinted stages with the figure standing on the stage's bottom edge.

## Components

### Buttons
- **Shape:** 14px radius (12px compact).
- **Primary:** action orange with white text, 700 weight, 48px tall (44px compact, 60px in the card, 58px on phones); a trailing arrow nudges right on hover.
- **Hover / Focus:** darker orange and a longer shadow; focus shows a 2px ink outline offset by 3px; press drops 1px.
- **Quiet:** white with a control-line border and ink text; hover darkens the border and tints the ground.

### Inputs / Fields
- **Style:** a labelled cell (label above, value below) on white with a control-line border, 14px radius, 66px tall.
- **Focus:** the whole cell takes a brand-teal border, a 1px inner ring and a soft 5px teal halo.
- **Error:** error border, error wash and a red label, with the message and an alert icon inside the cell; the card shows one summary line and focus moves to the first invalid field.
- **Chosen airport:** the field shows the code as a departure-board entry with city and country beside it; editing shows the typed value again.

### Booking Card (signature)
- White, 28px radius, card shadow, on a soft halo; deep teal header with the title and a segmented trip control built on real radio buttons.
- Route: From over To in one bordered unit with a dashed vertical connector and a circular swap control; once both ends are set the connector turns solid orange.
- Foot: secure checkout and email delivery assurances, and payment marks as quiet monochrome chips.

### Airline Band
- Night teal; the heading at the left and eight white airline marks at equal optical weight; the hero traveler stands on its top edge.

### Reviews
- One featured quote on deep teal with a large quote mark and sky stars; two supporting quotes on paper; avatars are initials on tinted circles.

### Moments (signature)
- Four pastel stages, each holding one fetched illustration standing on the stage's bottom edge, a small white tag naming the moment, then title, body and an audience line.

### Navigation
- White sticky header; 600-weight links with an 8px-radius hover tint; the WhatsApp support link in brand teal; the CTA stays visible. Below 1080px the links collapse into a menu button that opens a full-width disclosure panel.

## Do's and Don'ts

### Do:
- **Do** keep the booking card the brightest, most finished object in the first viewport.
- **Do** break the display headline on meaning ("Get a verifiable / onward ticket / in 2 minutes.").
- **Do** fetch every illustration, icon, logo and map from an open library, recolor it to the palette, and record the source.
- **Do** give every control a 44px minimum target and a control-line boundary.
- **Do** answer input with motion (route connector, swap turn, flight added) and show final states under reduced motion.

### Don't:
- **Don't** hand-draw illustrations, icons or logos.
- **Don't** put eyebrow labels or kickers above headings.
- **Don't** use burnt orange for decoration, emphasis words or headings.
- **Don't** set the display face as body copy, or Figtree as a headline.
- **Don't** hide the booking form behind a button, modal or second page.
