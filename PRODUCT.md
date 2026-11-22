# Product

<!-- impeccable:product-schema 1 -->

> Written from the client brief and the audited production export (onwardsky.com, captured Nov 2026).
> The client asked for no interview rounds where the references already answer, so facts marked
> *(inferred)* come from the site and brief rather than a confirmed conversation.

## Platform

web

## Stack

Delegated: static HTML, CSS and vanilla JavaScript prototype, no framework or build step.
The production site is WordPress (block theme + Interactivity API booking block), so the
prototype stays framework-free to port cleanly into blocks and patterns.

## Users

- **Visa applicants** assembling a visa file (Schengen/VFS appointments are named in real reviews)
  who need a flight itinerary without buying the full fare before approval.
- **One-way travelers** (digital nomads, backpackers) asked for proof of onward travel at airline
  check-in.
- **Travelers facing immigration checks** on arrival who keep the reservation with their documents.
- **Last-minute fliers** who need the reservation within minutes.

Context *(inferred)*: international, price-sensitive, often on a phone, frequently under time
pressure or mid-journey, and skeptical about whether a cheap reservation is legitimate.

## Product Purpose

Onward Sky issues a temporary flight reservation with a real airline PNR (booking reference)
that the traveler can verify, delivered by email as a PDF itinerary in about two minutes,
without paying for a full ticket. Success: the traveler leaves the homepage booking form with a
valid route search handed to the booking wizard, confident the document will be accepted.

## Positioning

A verifiable airline PNR, not a mock itinerary: the reservation can be checked on the airline's
side, it expires automatically (no cancellation needed), and human support (email or WhatsApp)
backs it. Price starts at $9.99.

## Operating Context

- Visa application files and VFS appointments, airline check-in counters, border/immigration
  checks, last-minute bookings.
- The deliverable is a PDF itinerary with flight details and the airline booking reference.
- Booking flow: homepage form (route, dates, passengers) → `/flight-booking-wizard/` → secure
  checkout. Wizard and checkout re-validate and re-quote server-side.

## Capabilities and Constraints

- Trip types: one way, return, multi-city (2 to 6 flights).
- Route fields use airport autocomplete (plugin dataset: flag, country code, city, IATA, country).
- Dates: earliest bookable date is today + 10 days in the site timezone (Asia/Kolkata); return
  must be after departure; each multi-city flight departs on or after the previous one.
- Passengers: 1 to 5.
- Date label reads "Depart date" for return trips, "Travel date" otherwise.
- Validation copy is fixed by the plugin (see the prototype's message table).
- Payments shown: PayPal, Stripe, UPI, Visa, Mastercard. Secure checkout; delivery by email.
- Mobile shows a sticky price + CTA bar once the form scrolls out of view.
- Header links: How it works, Verify a PNR, Help, Guides, Contact; WhatsApp support; primary CTA.

## Brand Commitments

- Name **Onward Sky** (™ used in "Onward Sky™ works with 100+ airlines") and the existing logo
  mark (navy/teal/sky-cyan swoosh). Colours must match the brand exactly: after two rounds of
  invented palettes the client asked for colours "carefully defined" and on brand, so only the
  production palette ships (theme.json presets such as heading #0E2F34, accent #156970, deep
  #0F555B, surface #E7F3F3, cta #C94300, plus the values its section styles resolve to).
  Typeface: Figtree only. Artwork: the client's own (illustrations, dotted globe, airline logos).
- Primary CTA wording: "Get my onward ticket".
- Voice: plain, reassuring, factual; sentence case.

## Evidence on Hand

- Trustpilot: TrustScore 4.0; "All 4 reviews rated 5 stars"; three published review excerpts
  (Zeeshan Khan, IN, Sep 28 2026; Md Manam, IN, Sep 27 2026; Elena Fernández, ES, Aug 16 2026).
- Claim on site: works with 100+ airlines; examples named: British Airways, Malaysia Airlines,
  SriLankan Airlines, Turkish Airlines, Emirates, Qatar Airways, Iberia, KLM, AirAsia.
- Delivery "in 2 minutes"; "under 2 minutes, guaranteed" (last-minute card); "From $9.99".
- Absent and never to be fabricated: customer counts, "since" years, ratings beyond the above,
  certifications, accreditation, acceptance guarantees by embassies or airlines.

## Product Principles

1. The booking form is the product's front door: always visible, never gated behind a click.
2. Prove legitimacy with specifics (PNR, verification, expiry, support), never with hype.
3. Calm speed: fast to complete, nothing that adds steps or doubt.
4. Every claim on the page is one the business already makes publicly.
5. Brand fidelity: colour, type and artwork come from the production site; a redesign changes structure and craft, never the palette.

## Accessibility & Inclusion

WCAG 2.1 AA target. International audience on mobile networks: readable type, large touch
targets, keyboard-complete combobox and form, reduced-motion support, light pages.
