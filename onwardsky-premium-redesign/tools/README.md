# Tools

Small scripts that reproduce or check the assets in this folder. None of them draws anything: artwork is copied
from the client's own page or from open libraries, and the map is computed from open data (see [`../assets/SOURCES.md`](../assets/SOURCES.md)). They are only
needed to regenerate assets or to re-run the colour audit.

The client's saved page (`our_website.htm`) is not part of this repository; the scripts that read it take its path.

```bash
# 1. Icons (Phosphor, MIT): rebuild the inline sprite inside index.html
npm pack @phosphor-icons/core@2.1.1 && mkdir -p phosphor && tar -xzf phosphor-icons-core-2.1.1.tgz -C phosphor
python3 tools/build-sprite.py phosphor/package/assets index.html
```

```bash
# 2. "Be ready" illustrations: copied from the client's page, production variables resolved to their real values
python3 tools/build-ready-art.py path/to/our_website.htm index.html
```

```bash
# 3. Hero route map and the "Be ready" texture: Natural Earth land (world-atlas, ISC) projected with d3-geo,
#    routes computed between airport coordinates, Phosphor's airplane (from step 1). Prints the pin positions
#    that index.html uses for the airport tags.
npm install --prefix mapgen world-atlas@2.0.2 topojson-client@3.1.0 d3-geo@3.1.1
NODE_PATH=mapgen/node_modules node tools/build-route-map.mjs mapgen/node_modules/world-atlas/land-110m.json \
  phosphor/package/assets/fill/airplane-fill.svg assets/vectors/route-map.svg assets/vectors/world-dots.svg
```

```bash
# 4. Colour audit: every colour the rendered page paints (error state included, transitions settled),
#    checked against the brand palette (needs Playwright). Expect "not in palette: 0".
python3 -m http.server 8765 &
URL=http://127.0.0.1:8765/index.html node tools/palette-audit.js
```

The airline logos in `assets/airlines/` are the client's own `.webp` files, copied unchanged (white marks with a
transparent background).
