"""Derive the two hero decorations from the client's own hero artwork (copied, never redrawn).

The production page shows a dotted globe with two flight paths as an <img> (base64 SVG data URI) inside the
`.os-book__art` element of the booking block. This script reads that image from the saved page and writes, for the
dark teal sky of the redesign:
  assets/vectors/hero-globe-light.svg  the dotted globe, recoloured white at 20% opacity
  assets/vectors/hero-plane-light.svg  one plane with the start of its dashed path (viewBox cropped);
                                        plane white, path in the brand aqua (#86D6D2)

Usage:  python3 tools/build-hero-art.py <path-to>/our_website.htm assets/vectors
Optional size pass used for the committed files (svgo drops the viewBox; add it back, "0 0 882 517" for the globe,
"722 236 190 70" for the plane):
  npx svgo@3.3.2 --precision 1 assets/vectors/hero-globe-light.svg
  npx svgo@3.3.2 --precision 2 assets/vectors/hero-plane-light.svg
"""
import base64
import re
import sys

SRC, OUT = sys.argv[1], sys.argv[2].rstrip('/')
page = open(SRC, encoding='utf-8', errors='ignore').read()

start = page.index('class="os-book__art"')
art = None
for m in re.finditer(r'data:image/svg\+xml;base64,([A-Za-z0-9+/=]+)', page[start:start + 600000]):
    try:
        candidate = base64.b64decode(m.group(1)).decode('utf-8')
    except Exception:
        continue
    if 'width="882"' in candidate[:200]:
        art = candidate
        break
assert art, 'hero art (882 x 517 svg) not found after class="os-book__art"'

# 1) globe: the first group (opacity .1) holds the dots; the page paints it navy, the sky gets white
globe_group = re.search(r'<g opacity="0\.1">.*?</g>', art, re.S).group(0)
globe = ('<svg xmlns="http://www.w3.org/2000/svg" width="882" height="517" viewBox="0 0 882 517" fill="#ffffff">'
         + globe_group.replace('opacity="0.1"', 'opacity="0.2"') + '</svg>')
open(f'{OUT}/hero-globe-light.svg', 'w', encoding='utf-8').write(globe)

# 2) plane: the second arc and plane, viewBox cropped around the plane and the first part of its path
rest = art[art.index('</g>', art.index('<g opacity="0.1">')) + 4:]
arcs = re.findall(r'<path fill="none" d="[^"]+" stroke="black" stroke-width="2" stroke-dasharray="4 4"/>', rest)
plane_groups = re.findall(r'<g transform="translate\([^"]+\)[^"]*">.*?</g>(?=<path fill="none"|<defs|</svg>)', rest, re.S)
assert len(arcs) == 2 and len(plane_groups) == 2, (len(arcs), len(plane_groups))
defs = re.search(r'<defs>.*?</defs>', rest, re.S).group(0)
plane = ('<svg xmlns="http://www.w3.org/2000/svg" width="190" height="70" viewBox="722 236 190 70" fill="#ffffff">'
         + arcs[1].replace('stroke="black"', 'stroke="#86D6D2"') + plane_groups[1] + defs + '</svg>')
open(f'{OUT}/hero-plane-light.svg', 'w', encoding='utf-8').write(plane)
print('wrote hero-globe-light.svg and hero-plane-light.svg')
