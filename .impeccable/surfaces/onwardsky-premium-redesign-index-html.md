---
version: 1
slug: "onwardsky-premium-redesign-index-html"
primary_target: "onwardsky-premium-redesign/index.html"
related_targets: []
---

# Surface: Onward Sky homepage, header through "Be ready when proof of onward travel is requested"

Mode: Persuade. Audience: visa applicants, one-way travelers, travelers facing immigration checks, last-minute fliers (see PRODUCT.md). Job: start a route search in the hero booking form and hand it to the booking wizard. Proof on hand: verifiable PNR, auto-expiry, human support, 100+ airlines with nine named examples (the client's own logos), Trustpilot 4.0 and three review excerpts, from $9.99, delivered in 2 minutes. Constraints: form visible above the fold on desktop, every form capability preserved, no invented claims, scope ends with the "Be ready" section, colours only from the production palette, artwork only the client's own or fetched from open libraries. Revision history: v1 (cold "enroute chart") and v2 (invented palette, stock illustration, a second typeface) were rejected by the client; v3 keeps the client's colours, type and art and takes the competitor's idea of a framed hero and a ticket.

## Direction contract

THESIS: The page is one family of tickets. The hero is an inset teal panel that frames the booking card; the three promises are a boarding-pass strip; the airline logos run along the panel's foot; and the "Be ready" cards are the client's own ticket stubs. It refuses the flat form-on-a-gradient hero of the live site and the invented colours of v1 and v2.

OWN-WORLD: Production teal ink (#0E2F34), brand teal (#156970), deep teal (#0F555B), soft teal surfaces (#E7F3F3, #F5FAFA), mint (#C8E6E1) and one burnt-orange action (#C94300); Figtree only, 800 for the hero and 700 for sections; ticket vocabulary (dashed perforation, semicircle notches, barcode bar, small-caps stub labels); the client's dotted globe, plane, four illustrations and nine airline logos; Phosphor icons.

STORY: In one line the visitor learns what they get; price, delivery and secure checkout sit beside the action; the three promises follow as a ticket under the form; real airline logos drift past as proof; real review excerpts follow; then each person finds their own moment (check-in, arrival, visa, take-off) on a ticket stub and acts.

FIRST VIEWPORT: White header (logo, five links, WhatsApp support, orange CTA). An inset rounded panel in pale teal: a three-line 72px headline with "verifiable" in the brand teal, the lead and the TrustScore line at left; at right a 468px booking card (deep-teal header with the title and trip tabs on one row, route From over To with swap, date and passengers, price and delivery, orange CTA, assurances and payment marks) with the client's dotted globe behind it and one plane flying out from behind its edge; under them the boarding-pass proof strip; and as the panel's foot the teal airline strip with the nine logos scrolling sideways.

FORM: Boarding pass x Onward Sky brand; rebuilt after the client rejected v2's colours; seed:9e5708a9b0030f67. Raises: wayfinding clarity (one message per panel, large labels); itinerary document (the route becomes visible codes and a plotted connector as soon as airports are chosen; the promises are literally a ticket).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: choosing an airport turns its field into a departure-board entry (code plus city); once both ends are set the connector between them turns from dashed to solid accent-bright and the swap control follows. The airline strip scrolls sideways, pauses on hover and has a visible pause button.
Motion grammar: one entrance on load (copy, card and proof strip rise in sequence), one slow marquee, cards slide in on scroll (transform only), then motion only in answer to input; reduced motion shows final states and a static logo row.
