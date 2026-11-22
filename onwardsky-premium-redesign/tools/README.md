# Tools

Small scripts that reproduce or check the assets in this folder. None of them draws anything: artwork is copied
from the client's own page or from open libraries (see [`../assets/SOURCES.md`](../assets/SOURCES.md)). They are only
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
# 3. Hero decoration: the dotted globe and one plane, cut from the client's hero artwork and recoloured for the dark sky
python3 tools/build-hero-art.py path/to/our_website.htm assets/vectors
```

```bash
# 4. Sample itinerary pages: the client's two redacted pages, cut from its saved page (needs Pillow)
python3 tools/build-itinerary-images.py path/to/our_website.htm assets/img
```

```bash
# 5. Colour audit: every colour the rendered page paints (error state included, transitions settled),
#    checked against the brand palette (needs Playwright). Expect "not in palette: 0".
python3 -m http.server 8765 &
URL=http://127.0.0.1:8765/index.html node tools/palette-audit.js
```

The airline logos in `assets/airlines/` are the client's own `.webp` files, copied unchanged (white marks with a
transparent background).
