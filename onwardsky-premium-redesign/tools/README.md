# Tools

Small scripts that reproduce or check the assets in this folder. None of them draws anything: artwork is copied
from the client's own page, from open libraries or from a free-licence photo site (see [`../assets/SOURCES.md`](../assets/SOURCES.md)). They are only
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
# 3. Hero photograph: grade the Unsplash original to the brand and write the two WebP files (needs Pillow and NumPy)
curl -L "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=2400&q=85" -o hero-original.jpg
python3 tools/build-hero-photo.py hero-original.jpg assets/img
```

```bash
# 4. Colour audit: every colour the rendered page paints (error state included, transitions settled),
#    checked against the brand palette (needs Playwright). Expect "not in palette: 0".
python3 -m http.server 8765 &
URL=http://127.0.0.1:8765/index.html node tools/palette-audit.js
```

The airline logos in `assets/airlines/` are the client's own `.webp` files, copied unchanged (white marks with a
transparent background).
