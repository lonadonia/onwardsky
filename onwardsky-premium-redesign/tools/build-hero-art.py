"""Derive the two hero decorations from the client's own hero artwork (copied, never redrawn).

The production page shows a dotted globe with two flight paths as an <img> (base64 SVG data URI) inside the
`.os-book__art` element of the booking block. This script reads that image from the saved page and writes:
  assets/vectors/hero-globe.svg  the dotted globe, recoloured to the brand "accent" (#156970) at 28% opacity
  assets/vectors/hero-plane.svg  one plane with the start of its dashed path, cropped; path "accent", plane "heading"

Usage:  python3 tools/build-hero-art.py <path-to>/our_website.htm assets/vectors
Optional size pass used for the committed files (keeps the viewBox):
  npx svgo@3.3.2 --precision 1 assets/vectors/hero-globe.svg   (then re-add viewBox="0 0 882 517" if svgo drops it)
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

# 1) globe: the first group (opacity .1) holds the dots; the page paints it with a navy fill, we use the brand accent
globe_group = re.search(r'<g opacity="0\.1">.*?</g>', art, re.S).group(0)
globe = ('<svg xmlns="http://www.w3.org/2000/svg" width="882" height="517" viewBox="0 0 882 517" fill="#156970">'
         + globe_group.replace('opacity="0.1"', 'opacity="0.28"') + '</svg>')
open(f'{OUT}/hero-globe.svg', 'w', encoding='utf-8').write(globe)

# 2) plane: the second arc and plane, with the viewBox cropped around the plane and the first part of its path
rest = art[art.index('</g>', art.index('<g opacity="0.1">')) + 4:]
arcs = re.findall(r'<path fill="none" d="[^"]+" stroke="black" stroke-width="2" stroke-dasharray="4 4"/>', rest)
plane_groups = re.findall(r'<g transform="translate\([^"]+\)[^"]*">.*?</g>(?=<path fill="none"|<defs|</svg>)', rest, re.S)
assert len(arcs) == 2 and len(plane_groups) == 2, (len(arcs), len(plane_groups))
defs = re.search(r'<defs>.*?</defs>', rest, re.S).group(0)
plane = ('<svg xmlns="http://www.w3.org/2000/svg" width="190" height="70" viewBox="722 236 190 70" fill="#0E2F34">'
         + arcs[1].replace('stroke="black"', 'stroke="#156970"') + plane_groups[1] + defs + '</svg>')
open(f'{OUT}/hero-plane.svg', 'w', encoding='utf-8').write(plane)
print('wrote hero-globe.svg and hero-plane.svg')
