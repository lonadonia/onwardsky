---
version: 1
slug: "onwardsky-premium-redesign-index-html"
primary_target: "onwardsky-premium-redesign/index.html"
related_targets: []
---

# Surface: Onward Sky homepage, header through "Be ready when proof of onward travel is requested"

Mode: Persuade. Audience: visa applicants, one-way travelers, travelers facing immigration checks, last-minute fliers (see PRODUCT.md). Job: start a route search in the hero booking form and hand it to the booking wizard. Proof on hand: verifiable PNR, auto-expiry, human support, 100+ airlines with nine named examples (the client's own logos), Trustpilot 4.0 and three review excerpts, from $9.99, delivered in 2 minutes. Constraints: form visible above the fold on desktop, every form capability preserved, no invented claims, scope ends with the "Be ready" section, UI colours only from the production palette, artwork only the client's own, fetched from open libraries, or one free-licence photograph graded to the brand. Revision history: v1 (cold "enroute chart") and v2 (invented palette, stock illustration, a second typeface) were rejected by the client; v3 kept the client's colours, type and art but also the live site's composition, and was rejected as "only small changes"; v4 replaced the composition (a deep-teal sky, two sample itinerary pages behind a boarding-pass form); the client then asked for a more professional, beautiful and organised hero, with the two documents removed and professional photographs and vectors allowed; v5 is photographic: one aerial photograph under brand-teal veils, the boarding-pass form laid across it.

## Direction contract

THESIS: The page is one family of tickets, and the hero is one photograph with a ticket laid across it. An airliner's wing against a sunset, graded to the brand teals, fills the panel; brand-teal veils keep the text side dark; a boarding-pass booking bar spans the panel; one glass bar holds the promises; the airline logos run along the foot like a horizon. It refuses the flat form-on-a-gradient hero of the live site, the invented colours of v1 and v2, the re-skin of v3 and the clutter of v4's documents, plane, globe and badge.

OWN-WORLD: Production teal ink (#0E2F34), brand teal (#156970), deep teal (#0F555B, #0F5A60), soft teal surfaces (#E7F3F3, #F5FAFA), aqua (#86D6D2) for the key word and icons on dark, and one burnt-orange action (#C94300) that the sunset in the photograph echoes; Figtree only, 800 for the hero and 700 for sections; ticket vocabulary (dashed perforation, semicircle notches, barcode bar, small-caps ticket and stub labels); the client's four illustrations and nine airline logos; Phosphor icons; one Unsplash photograph with no people or brand marks.

STORY: In one line the visitor learns what they get; the sky and the wing say "travel" before a word is read; a ticket-shaped form starts the search, with price and delivery on its stub beside the orange action; the three promises and the Trustpilot score follow as one bar; real airline logos drift past as proof; real review excerpts follow; then each person finds their own moment (check-in, arrival, visa, take-off) on a ticket stub and acts.

FIRST VIEWPORT: White header (logo, five links, WhatsApp support, orange CTA). An inset rounded panel filled by the photograph: at the left a three-line 62px white headline with "verifiable" in aqua and the 19px lead over the dark teal side veil; at the right the wing tip and the sunset glow; the trip tabs and, across the full panel width, a boarding-pass bar (white half: label, From | To with swap, travel date, passengers; tinted stub: "From $9.99", "Delivered in 2 minutes", the orange CTA) with two notches and a perforation that show the photograph; assurances and payment marks beneath it; one glass proof bar with four cells; and as the panel's foot the darkest teal strip with the nine logos scrolling sideways and a pause button. Below 1180px the ticket becomes a white card; from 900px the copy and the card sit side by side with the card set lower so the sunset shows above it; below 900px the photograph recedes behind the text.

FORM: Boarding pass x Onward Sky brand; rebuilt after the client asked for a more professional, beautiful and organised hero; seed:9e5708a9b0030f67. Raises: wayfinding clarity (one message per panel, large labels); itinerary document (the route becomes visible codes and a plotted connector as soon as airports are chosen; the form is literally a ticket); atmosphere (the photograph carries the emotion so the interface can stay exact).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: choosing an airport turns its field into a departure-board entry (code plus city); once both ends are set the connector between them turns from dashed to solid accent-bright and the swap control follows. The airline strip scrolls sideways, pauses on hover, on focus, off screen and with a visible pause button.
Motion grammar: one entrance on load (headline and lead, then the form, then the proof bar slide up without fading; the photograph fades in behind them), one slow marquee, cards slide in on scroll (transform only), then motion only in answer to input; reduced motion shows final states and a static logo row.
