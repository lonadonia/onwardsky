---
name: Onward Sky
description: Verifiable onward tickets, set as a precise route chart with the booking console as its instrument.
colors:
  chart-ink: "#0B2B30"
  ink-secondary: "#2E474B"
  ink-muted: "#4F676B"
  placeholder: "#5E7478"
  route-teal: "#156970"
  deep-teal: "#0F555B"
  night-chart: "#0B363C"
  logo-sky: "#2FB0C6"
  sky-soft: "#8FD3DF"
  mist: "#B8D3D2"
  burnt-orange: "#C94300"
  burnt-orange-hover: "#B33C00"
  burnt-orange-active: "#9C3200"
  chart-paper: "#F4F8F7"
  chart-paper-tint: "#EAF2F1"
  chart-paper-deep: "#DDEBEA"
  white: "#FFFFFF"
  hairline: "#D5E3E2"
  control-line: "#7E979A"
  error: "#B3261E"
  error-wash: "#FDF1EF"
  confirm: "#17684A"
  confirm-wash: "#EAF5F0"
  illustration-line: "#9DB6B7"
  illustration-tint: "#E2EEED"
  illustration-peach: "#F6D7C3"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 1.05rem + 5.1vw, 5.75rem)"
    fontWeight: 780
    lineHeight: 0.93
    letterSpacing: "-0.014em"
    fontVariation: "'wdth' 74"
  headline:
    fontFamily: "Archivo, Arial Narrow, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.125rem, 1.45rem + 2.1vw, 3.5rem)"
    fontWeight: 760
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 76"
  title:
    fontFamily: "Archivo, Arial Narrow, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.3125rem, 1.15rem + 0.45vw, 1.5rem)"
    fontWeight: 740
    lineHeight: 1.12
    fontVariation: "'wdth' 80"
  identifier:
    fontFamily: "Archivo, Arial Narrow, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 780
    lineHeight: 1
    fontVariation: "'wdth' 76"
    fontFeature: "'tnum' 1, 'lnum' 1"
  lead:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 650
    lineHeight: 1.25
rounded:
  chip: "6px"
  control: "12px"
  panel: "20px"
  console: "24px"
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
    backgroundColor: "{colors.burnt-orange}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.burnt-orange-hover}"
  button-primary-active:
    backgroundColor: "{colors.burnt-orange-active}"
  button-submit:
    backgroundColor: "{colors.burnt-orange}"
    textColor: "{colors.white}"
    rounded: "14px"
    padding: "0 30px"
    height: "68px"
  button-quiet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.chart-ink}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.chart-ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "68px"
  segment-selected:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.white}"
    rounded: "10px"
    padding: "9px 18px"
  identifier:
    textColor: "{colors.deep-teal}"
    rounded: "{rounded.chip}"
    padding: "6px 6px 5px"
  console:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.console}"
    padding: "24px"
---

# Design System: Onward Sky

## Overview

**Creative North Star: "The Enroute Chart"**

Onward Sky is drawn like an aeronautical enroute chart: cool chart paper ruled with a faint Lambert-conic graticule, a deep night-chart field where the network lives, and condensed chart lettering that names places the way a pilot reads them. The booking console is the instrument on that chart. It is the brightest, most finished object on the page, and it turns the traveller's input into identifiers and a plotted route, so the product proves itself the moment it is used.

Density is calm and exact. Hairlines, identifier boxes and waypoint markers are the whole ornament vocabulary; everything else is type, spacing and two committed fields of color (paper and night). Motion is rare and earned: the graticule plots itself once on load, and every other movement answers a person's action.

The system is light by choice: travellers read it on phones in airports and on laptops while assembling visa files, often in bright ambient light, and official paperwork is read on light grounds.

**Key Characteristics:**
- Chart paper and night-chart teal as the two grounds; white reserved for the console, panels and controls.
- Condensed Archivo for headlines, airport codes and fares; Figtree for reading and every control.
- Burnt orange appears only where something happens: the action, the plotted route, the proof mark in an illustration.
- Hairline graticules and great-circle airways as the world's texture, always behind content and never crossing copy.
- One signature moment: a chosen airport becomes a chart identifier and both ends join with an orange route line.

## Colors

A cool, teal-tinted chart palette with one hot action color.

### Primary
- **Burnt Orange** (burnt-orange): the primary action, the plotted route in the console and the journey profile, and the single proof mark in each illustration. Hover deepens to burnt-orange-hover, press to burnt-orange-active.

### Secondary
- **Route Teal** (route-teal): links, icons in proof lists, focus rings, the rating stars and the delivery note.
- **Deep Teal** (deep-teal): selected segments, identifier boxes, passport and signage fills in illustrations.

### Tertiary
- **Night Chart** (night-chart): the committed dark field under the console and the closing band. Carries white type, the graticule in sky at low alpha, and cyan airways.
- **Logo Sky** (logo-sky) and **Sky Soft** (sky-soft): airways and graticule on night, identifier boxes and icons on night, the focus ring on night.

### Neutral
- **Chart Ink** (chart-ink): headlines and primary text, 14:1 on chart paper.
- **Ink Secondary** (ink-secondary) and **Ink Muted** (ink-muted): reading text and meta; both clear 5:1 on every light ground.
- **Chart Paper** (chart-paper), **Chart Paper Tint** (chart-paper-tint), **Chart Paper Deep** (chart-paper-deep): page grounds, hover tints, quiet surfaces.
- **Hairline** (hairline): decorative rules and dividers only.
- **Control Line** (control-line): the boundary of every control, 3.1:1 against white.
- **Mist** (mist): secondary text on night.

### Named Rules
**The One Hot Color Rule.** Burnt orange marks what happens next (the action, the route, the proof) and nothing else: never a heading, a badge, an eyebrow or a background wash.

**The Boundary Rule.** A control's edge uses control-line (3:1 minimum); hairline is for decoration and never the only boundary of something a person operates.

## Typography

**Display Font:** Archivo variable (with Arial Narrow, Helvetica Neue)
**Body Font:** Figtree variable (with the platform sans)

**Character:** Condensed industrial chart lettering against a round, friendly text face: the chart names places, the text face talks to people.

### Hierarchy
- **Display** (780, width 74%, clamp(2.6rem…5.75rem), line-height 0.93): the hero headline only, broken on meaning, one thought per line.
- **Headline** (760, width 76%, clamp(2.125rem…3.5rem), line-height 1.0): section titles, balanced.
- **Title** (720–740, width 80–82%, 1.3125–1.5rem, line-height 1.12–1.18): journey questions and review titles.
- **Identifier** (780, width 76%, 1.875rem, tabular lining numerals): chosen airport codes and the fare.
- **Lead** (400, clamp(1.0625rem…1.1875rem), line-height 1.55, max 46ch): the hero promise and section intros.
- **Body** (400, 1rem, line-height 1.6, max 34–48ch in columns): descriptions and review quotes.
- **Label** (650, 0.8125rem, sentence case): field labels, legal and meta lines.

### Named Rules
**The Chart Lettering Rule.** Archivo carries names, codes, prices and headings; Figtree carries sentences and controls. Never set a paragraph in Archivo or a headline in Figtree.

**The Sentence Case Rule.** Labels, buttons and headings are sentence case; identifiers (DEL, AMS, BA) are the only capitals that run together.

## Layout

A 12-column grid in a 1240px container with fluid gutters (16px on phones to 56px on wide screens) and 16–24px column gaps. Sections breathe on a fluid rhythm (64px to 112px). The hero places the headline over seven columns and the promise, proof and rating over the remaining five, aligned to the headline's last line; below 1024px they stack and the proof list moves under the console on phones.

The console spans the full container and reaches 112px into the night field below it (96px on tablets, none on phones). It runs on its own grid: one row for route, dates, passengers and action at 1200px and above, two rows to 768px, and a stacked single column on phones where date and passengers share a row. Multi-city flights stack as labelled rows.

The journey runs as four columns sharing three rows (illustration, title, body) through CSS subgrid, then 2×2 on tablets and a single column on phones.

## Elevation & Depth

Mostly flat and tonal: depth comes from the two committed grounds and from the console sitting across them. Shadows are reserved for objects a person operates, always with an offset and a soft blur, tinted from chart ink or from the action color.

### Shadow Vocabulary
- **Console** (`0 1px 1px rgba(11,43,48,.05), 0 6px 14px -6px rgba(11,43,48,.12), 0 32px 64px -28px rgba(11,43,48,.38)`): the booking console only.
- **Pop** (`0 2px 6px rgba(11,43,48,.08), 0 22px 44px -18px rgba(11,43,48,.36)`): the suggestions list.
- **Action** (`0 1px 1px rgba(122,51,0,.28), 0 10px 22px -12px rgba(201,67,0,.62)`): primary buttons; grows on hover, collapses on press.

### Named Rules
**The Instrument Rule.** Only things you can operate float. Content panels sit on the page with a hairline or a tint, never a shadow.

## Shapes

Radii follow hierarchy, not habit: 6px identifier boxes and chips, 12px controls, 14px for the submit button, 20px panels, 24px for the console. Circles are reserved for the swap control and waypoint markers. Lines are 1px hairlines or 2px route strokes with round caps.

## Components

### Buttons
- **Shape:** gently rounded (12px; the console submit 14px).
- **Primary:** burnt orange with white text, 700 weight, 48px tall (44px compact, 68px in the console, 56px on phones).
- **Hover / Focus:** darker orange and a longer shadow; focus shows a 2px chart-ink outline offset by 3px; press drops 1px.
- **Quiet:** white with a control-line border and chart-ink text; hover darkens the border and tints the ground.

### Identifier boxes
- **Style:** condensed Archivo capitals with wide tracking inside a 1.25px box (6px radius). Deep teal on light grounds, sky-soft on night; filled deep teal when it marks the active suggestion.

### Inputs / Fields
- **Style:** a labelled cell (label above, value below) on white with a control-line border, 12px radius, 68px tall.
- **Focus:** the whole cell takes a route-teal border, a 1px inner ring and a soft 5px teal halo.
- **Error:** error border, error wash and a red label, with the message and an alert icon inside the cell; the console shows one summary line and focus moves to the first invalid field.
- **Chosen airport:** the cell shows the code as an identifier with city and country beside it; editing reveals the typed value again.

### Navigation
- **Style:** Figtree 550 links on white, 8px-radius hover tint; the WhatsApp support link in route teal; the header CTA stays visible. Below 1080px the links collapse into a menu button that opens a full-width panel (a disclosure, not a modal).

### Booking Console (signature)
- White, 24px radius, console shadow, straddling chart paper and night chart.
- Trip type is a segmented control of real radio buttons (selected in deep teal).
- The From and To cells form one route unit with a circular swap control on their divider; once both ends are set an orange route line draws from origin to destination through the swap control (a dashed vertical line with ring and dot markers on phones).

### Journey Line (signature)
- Four illustrated checkpoints share one continuous line: a hairline ground through Visa and Check-in, an orange climb from the Take-off marker, level cruise across the gap, and descent to the Arrival marker. Illustrations use deep-teal ink, chart tints and one orange proof mark each.

## Do's and Don'ts

### Do:
- **Do** keep the booking console the brightest, most finished object in the first viewport.
- **Do** break display lines on meaning ("Get a verifiable / onward ticket / in 2 minutes.").
- **Do** draw chart texture (graticule, airways) behind content and stop it before it crosses copy.
- **Do** give every control a 44px minimum target and a control-line boundary.
- **Do** answer input with motion (route draw, swap rotation, flight added) and show the final state under reduced motion.

### Don't:
- **Don't** put eyebrow labels or kickers above headings.
- **Don't** use burnt orange for decoration, emphasis words or headings.
- **Don't** set the display face as body copy, or Figtree as a headline.
- **Don't** introduce gradients, glass, glow halos or offset block shadows.
- **Don't** hide the booking form behind a button, modal or second page.
