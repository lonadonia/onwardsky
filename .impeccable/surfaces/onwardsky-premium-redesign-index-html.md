---
version: 1
slug: "onwardsky-premium-redesign-index-html"
primary_target: "onwardsky-premium-redesign/index.html"
related_targets: []
---

# Surface: Onward Sky homepage, header through "Be ready when proof of onward travel is requested"

Mode: Persuade. Audience: visa applicants, one-way travelers, travelers facing immigration checks, last-minute fliers (see PRODUCT.md). Job: start a route search in the hero booking form and hand it to the booking wizard. Proof on hand: verifiable PNR, auto-expiry, human support, 100+ airlines with nine named examples (the client's own logos), the client's own redacted sample itinerary pages, Trustpilot 4.0 and three review excerpts, from $9.99, delivered in 2 minutes. Constraints: form visible above the fold on desktop, every form capability preserved, no invented claims, scope ends with the "Be ready" section, colours only from the production palette, artwork only the client's own or fetched from open libraries. Revision history: v1 (cold "enroute chart") and v2 (invented palette, stock illustration, a second typeface) were rejected by the client; v3 kept the client's colours, type and art but also the live site's composition (copy left, tall card right), and was rejected as "only small changes"; v4 replaces the hero composition: a deep-teal sky in which the product (the sample itinerary) rises from behind a boarding-pass-shaped booking bar.

## Direction contract

THESIS: The page is one family of tickets, and the hero shows the product. A deep-teal sky panel holds the headline, the client's own redacted itinerary pages rising from behind a booking form drawn as a boarding pass, three promises and the Trustpilot score as quiet glass chips, and the airline logos along its foot like a horizon. It refuses the flat form-on-a-gradient hero of the live site, the invented colours of v1 and v2, and the re-skin of v3.

OWN-WORLD: Production teal ink (#0E2F34), brand teal (#156970), deep teal (#0F555B, #0F5A60), soft teal surfaces (#E7F3F3, #F5FAFA), aqua (#86D6D2) for the key word and icons on the sky, mint (#C8E6E1) and one burnt-orange action (#C94300); Figtree only, 800 for the hero and 700 for sections; ticket vocabulary (dashed perforation, semicircle notches, barcode bar, small-caps ticket and stub labels); the client's dotted globe, plane, two sample itinerary pages, four illustrations and nine airline logos; Phosphor icons.

STORY: In one line the visitor learns what they get; the sample itinerary shows it; a ticket-shaped form starts the search, with price and delivery on its stub beside the orange action; three promises and the Trustpilot score follow as chips; real airline logos drift past as proof; real review excerpts follow; then each person finds their own moment (check-in, arrival, visa, take-off) on a ticket stub and acts.

FIRST VIEWPORT: White header (logo, five links, WhatsApp support, orange CTA). An inset rounded sky panel (gradient from brand teal to deep teal): at the left a three-line 62px white headline with "verifiable" in aqua and the 19px lead; at the right two rotated sample itinerary pages with a white "Verifiable PNR" badge and one plane on a dashed path; the trip tabs on the sky and, across the full panel width, a boarding-pass bar (white half: label, From | To with swap, travel date, passengers; tinted stub: "From $9.99", "Delivered in 2 minutes", the orange CTA) with two notches and a perforation; assurances and payment marks beneath it; four glass chips; and as the panel's foot the darkest teal strip with the nine logos scrolling sideways and a pause button. Below 1180px the ticket becomes a white card; from 900px the copy and the card sit side by side.

FORM: Boarding pass x Onward Sky brand; rebuilt after the client called v3 "small changes"; seed:9e5708a9b0030f67. Raises: wayfinding clarity (one message per panel, large labels); itinerary document (the sample pages show the deliverable; the route becomes visible codes and a plotted connector as soon as airports are chosen; the form is literally a ticket).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: choosing an airport turns its field into a departure-board entry (code plus city); once both ends are set the connector between them turns from dashed to solid accent-bright and the swap control follows. The airline strip scrolls sideways, pauses on hover, on focus, off screen and with a visible pause button.
Motion grammar: one entrance on load (headline and lead, then the form, then the chips slide up without fading; the two sample pages rise and fade in), one slow marquee, cards slide in on scroll (transform only), then motion only in answer to input; reduced motion shows final states and a static logo row.
