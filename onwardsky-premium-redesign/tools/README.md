# Asset tools

How the fetched vectors in `assets/` were produced. None of these scripts draw anything; they copy, recolor or crop
files from open libraries (see [`../assets/SOURCES.md`](../assets/SOURCES.md)). They are only needed to regenerate assets.

```bash
# 1. Fetch the libraries (npm registry; each command downloads a tarball into the current folder)
npm pack undraw-svg@2.0.0 soaring-symbols@0.5.2 @phosphor-icons/core@2.1.1 simple-icons@16.38.1
for f in *.tgz; do mkdir -p "${f%.tgz}" && tar -xzf "$f" -C "${f%.tgz}"; done
```

```bash
# 2. Illustrations: copy from unDraw and remap colors to the brand palette
python3 tools/recolor-undraw.py undraw-svg-2.0.0/package/svgs assets/vectors \
  at-the-airport connected-world luggage my-documents approve travel-mode reviews
```

```bash
# 3. Icons: rebuild the inline sprite inside index.html
python3 tools/build-sprite.py phosphor-icons-core-2.1.1/package/assets index.html
```

```bash
# 4. Airline and payment marks: crop each file's viewBox to the drawn bounds (needs Playwright)
node tools/crop-svg-viewbox.js '[["soaring-symbols-0.5.2/package/dist/assets/klm/logo-mono.svg","assets/airlines/klm.svg"]]'
```

`connected-world-soft.svg` is `connected-world.svg` with the lighter remap listed in `SOURCES.md`.
