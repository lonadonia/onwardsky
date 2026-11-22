---
version: 1
slug: "onwardsky-premium-redesign-index-html"
primary_target: "onwardsky-premium-redesign/index.html"
related_targets: []
---

# Surface: Onward Sky homepage, header through "Be ready when proof of onward travel is requested"

Mode: Persuade. Audience: visa applicants, one-way travelers, travelers facing immigration checks, last-minute fliers (see PRODUCT.md). Job: start a route search in the hero booking form and hand it to the booking wizard. Proof on hand: verifiable PNR, auto-expiry, human support, 100+ airlines with nine named examples, Trustpilot 4.0 and three review excerpts, from $9.99, delivered in 2 minutes. Constraints: form visible above the fold on desktop, every form capability preserved, no invented claims, scope ends with the "Be ready" section, and every vector (illustration, icon, logo, map) must be fetched from an open library, never drawn by the designer. Revision history: v1 (cold "enroute chart", hand-drawn vignettes) was rejected by the client; v2 returns to the brand's friendly identity and rebuilds the visuals from fetched libraries.

## Direction contract

THESIS: The page is airport daylight with a traveler in it: someone about to be asked for proof stands between the promise and the booking card, and the card is the counter they step up to. It refuses the cold technical look of v1 and the floating form card on a bare gradient.

OWN-WORLD: Pale teal stage with one soft circular halo behind the card and a faint vector atlas; deep teal (#0F555B and night #0B363C) for the card header, the airline band and the featured review; burnt orange reserved for the action; illustrations from unDraw (via the undraw-svg package) recolored to brand teal, ink and a peach accent; Phosphor icons; real airline marks from Soaring Symbols; Manrope 800 headlines over Figtree text; four pastel stages (peach, teal, sky, sand) for the moments.

STORY: In one line the visitor learns what they get; price, delivery and secure checkout sit next to the action; a traveler on a phone at the airport says why it matters now; proof follows in order: real PNR, auto-expiry, human support, real airline marks, real review excerpts; then each person finds their own moment (check-in, arrival, visa, take-off) and acts.

FIRST VIEWPORT: White header (logo, five links, WhatsApp support, orange CTA). On pale teal: a three-line 76px headline and lead at left with three proof points and the TrustScore line; at right a 480px booking card (deep teal header with title and trip tabs, route From over To with swap, date and passengers, price and delivery, orange CTA, assurances and payment marks) on a large soft halo; between them the traveler with luggage and a plane, standing on the top edge of the deep teal airline band that carries eight white airline marks.

FORM: Airport daylight x Onward Sky brand; position 5 of 7 on the ordered list, reworked after client rejection of v1; seed:9e5708a9b0030f67. Raises: wayfinding clarity (one message per panel, large labels); itinerary document (the route becomes visible codes and a plotted connector as soon as airports are chosen).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: choosing an airport turns its field into a departure-board entry (code plus city); once both ends are set the connector between them turns from dashed teal to solid orange and the swap control follows.
Motion grammar: one entrance on load (copy, card, traveler rise in sequence), then motion only in answer to input; reduced motion shows final states.
