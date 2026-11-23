"""Build the reviews section's sky and inline it into index.html (v7.3: the three review pictures were retired at the
client's request; the helpers for pictures in the "Be ready" construction are kept for future use).

Nothing is drawn freehand: every object is an icon from Tabler Icons (MIT, https://tabler.io/icons), taken unchanged
from the npm package and composed the way the client's own illustrations are built:
  * two soft colour blocks (peach and mint, 20-unit corners) and at most one accent dot, behind the drawing;
  * the objects outlined in the heading ink at 2.4 units on a 200 x 140 box, with round caps and joins
    (each icon's stroke is rescaled so every object has the same line weight);
  * paper objects filled white, one warm accent in the illustration orange;
  * the same slight hand-drawn wobble (an feTurbulence + feDisplacementMap filter with the client's values).

It also builds the reviews section's sky (`review-sky`): Tabler's filled cloud, unchanged, as soft cloud banks (a surface
shadow, a mint outline, white paper) and a dashed flight path ending in Tabler's filled plane, as on the hero map.

Usage:  python3 tools/build-review-art.py <path-to>/@tabler/icons/icons/outline index.html [preview.html]
(the filled icons are read from the sibling `filled` folder of the package).
Each svg lands between <!--ART:<name>:START--> and <!--ART:<name>:END--> markers in index.html (idempotent).
"""
import math
import os
import re
import sys

TABLER, HTML = sys.argv[1].rstrip('/'), sys.argv[2]
PREVIEW = sys.argv[3] if len(sys.argv) > 3 else None

# The client's illustration palette (assets/SOURCES.md): ink, paper, the two blocks, the accent dot, orange, aqua.
INK, PAPER, MINT, PEACH, TEAL, ORANGE, AQUA = '#0E2F34', '#fff', '#C8E6E1', '#FFD3BA', '#21A1A3', '#CC4700', '#86D6D2'
LINE = 2.4  # the client's line weight on the 200 x 140 box
FILTER = ('<filter id="{id}" x="-6%" y="-6%" width="112%" height="112%"><feTurbulence type="fractalNoise" '
          'baseFrequency=".04" numOctaves="2" seed="16" /><feDisplacementMap in="SourceGraphic" scale="2.6" '
          'xChannelSelector="R" yChannelSelector="G" /></filter>')


def paths(name):
    """The drawing elements of one Tabler outline icon (24 x 24 grid), without its invisible bounding box."""
    svg = open(f'{TABLER}/{name}.svg', encoding='utf-8').read()
    els = re.findall(r'<(?:path|circle|rect|line|polyline|ellipse)\b[^>]*/>', svg)
    return [e for e in els if 'stroke="none"' not in e]


def icon(name, x, y, size, rot=0, fill=None, keep=None, style=None, extra=''):
    """Place a Tabler icon: its 24-unit grid maps to a size x size square at (x, y), rotated about its centre.
    fill:  {element index: colour} for closed outlines that are paper (white) or ink.
    keep:  element indexes to keep (default: all).  style: {index: extra attributes}.
    extra: marks added on the icon's own grid (dates on a calendar, a hand on a dial), in the same line weight."""
    s = size / 24
    fill, style = fill or {}, style or {}
    els = paths(name)
    out = []
    for i, el in enumerate(els):
        if keep is not None and i not in keep:
            continue
        attrs = ''
        if i in fill:
            attrs += f' fill="{fill[i]}"'
        if i in style:
            attrs += ' ' + style[i]
        out.append(el.replace('/>', f'{attrs} />').replace('  />', ' />'))
    rotate = f' rotate({rot:g} 12 12)' if rot else ''
    return (f'<g transform="translate({x:g} {y:g}) scale({s:.4g}){rotate}" stroke-width="{LINE / s:.3g}">'
            + ''.join(out) + extra + '</g>')


def art(name, blocks, drawing):
    fid = f'art-{name}'
    return (f'<svg viewBox="0 0 200 140" class="tk-svg" overflow="visible" focusable="false" aria-hidden="true">'
            f'<defs>{FILTER.format(id=fid)}</defs>{blocks}'
            f'<g filter="url(#{fid})" fill="none" stroke="{INK}" stroke-width="{LINE}" stroke-linecap="round" '
            f'stroke-linejoin="round">{drawing}</g></svg>')


def text(x, y, s, size=12.5, rot=0, spacing=1.4, color=INK):
    r = f' transform="rotate({rot:g} {x:g} {y:g})"' if rot else ''
    return (f'<text x="{x:g}" y="{y:g}"{r} font-family="Figtree, system-ui, sans-serif" font-size="{size:g}" '
            f'font-weight="800" fill="{color}" stroke="none" letter-spacing="{spacing:g}">{s}</text>')


def filled(name):
    """The outline of one Tabler filled icon (24 x 24 grid)."""
    svg = open(os.path.join(os.path.dirname(TABLER), 'filled', f'{name}.svg'), encoding='utf-8').read()
    return re.findall(r'<path d="([^"]+)"', svg)[-1]


ARTS = {}

# 4. The reviews section's sky: cloud banks behind the section and one flight path with a plane across its top.
#    Each cloud is Tabler's filled `cloud` (bounding box 1 4 22 15), alone or with a smaller copy at its lower left; drawn
#    as a surface shadow, then the shapes' union outlined in mint (a 4px stroke under the paper leaves 2px showing),
#    then white paper. Positions are set in the stylesheet (.sky-*), so the composition answers the layout.
SURFACE, ACCENT = '#E7F3F3', '#156970'
CLOUD_D, PLANE_D = filled('cloud'), filled('plane')
BANK = 'translate(-3.62 8.52) scale(.62)'          # the small cloud: bounding box from (-3, 11), 13.6 x 9.3


def cloud(cls, bank=False):
    shapes = ['<use href="#sky-c" />'] + ([f'<use href="#sky-c" transform="{BANK}" />'] if bank else [])
    vb = '-3.6 3.4 28 18.2' if bank else '.4 3.4 24 16.4'
    group = ''.join(shapes)
    return (f'<svg class="sky-cloud {cls}" viewBox="{vb}" overflow="visible" focusable="false">'
            f'<g transform="translate(.9 .9)" fill="{SURFACE}">{group}</g>'
            f'<g fill="{MINT}" stroke="{MINT}" stroke-width="4" stroke-linejoin="round">{group}</g>'
            f'<g fill="{PAPER}">{group}</g></svg>')


# the flight path: a cubic arc on a 1200 x 90 box (the stylesheet shows it 1:1), the plane just past its end
P0, C1, C2, P1 = (0, 62), (380, 4), (800, 0), (1146, 35)
angle = math.degrees(math.atan2(P1[1] - C2[1], P1[0] - C2[0]))   # Tabler's plane points right
plane_at = (P1[0] + 22 * math.cos(math.radians(angle)), P1[1] + 22 * math.sin(math.radians(angle)))
ROUTE = (f'<svg class="sky-route" viewBox="0 0 1200 90" overflow="visible" focusable="false">'
         f'<path d="M{P0[0]} {P0[1]}C{C1[0]} {C1[1]} {C2[0]} {C2[1]} {P1[0]} {P1[1]}" fill="none" stroke="{ACCENT}" '
         f'stroke-opacity=".34" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 7" />'
         f'<g transform="translate({plane_at[0]:.1f} {plane_at[1]:.1f}) rotate({angle:.1f}) scale(1.1) translate(-12 -12)">'
         f'<path d="{PLANE_D}" fill="{ACCENT}" fill-opacity=".8" /></g></svg>')

ARTS['review-sky'] = (f'<svg class="sky-defs" width="0" height="0" focusable="false"><defs>'
                      f'<path id="sky-c" d="{CLOUD_D}" vector-effect="non-scaling-stroke" /></defs></svg>'
                      + ROUTE + cloud('sky-a') + cloud('sky-b', bank=True) + cloud('sky-c', bank=True)
                      + cloud('sky-d') + cloud('sky-e') + cloud('sky-f', bank=True))


html = open(HTML, encoding='utf-8').read()
for name, svg in ARTS.items():
    pattern = rf'<!--ART:{name}:START-->.*?<!--ART:{name}:END-->'
    if re.search(pattern, html, re.S):
        html = re.sub(pattern, lambda m: f'<!--ART:{name}:START-->{svg}<!--ART:{name}:END-->', html, flags=re.S)
    elif not PREVIEW:
        sys.exit(f'marker for {name} missing in {HTML}')
if not PREVIEW:
    open(HTML, 'w', encoding='utf-8').write(html)
    print('injected', len(ARTS), 'illustrations')
else:
    # a side-by-side sheet: the client's four drawings, then the new ones
    ready = re.findall(r'<!--ART:(?:checkin|arrival|visa|takeoff):START-->(.*?)<!--ART', html, re.S)
    cells = ''.join(f'<div class="c">{s}</div>' for s in ready)
    open(PREVIEW, 'w', encoding='utf-8').write(
        '<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:20px;background:#F5FAFA;'
        'display:grid;grid-template-columns:repeat(4,300px);gap:20px}.c{background:#E7F3F3;border-radius:18px;'
        'padding:18px}</style>' + cells)
    print('preview written')
