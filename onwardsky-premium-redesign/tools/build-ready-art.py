"""Inline the four "Be ready" illustrations of the current Onward Sky site into index.html.

The artwork is the client's own (it ships inside the production page, not from a stock library), so it is copied,
not redrawn. The only changes are mechanical:
  * the production page paints it with legacy CSS variables, so each variable is replaced by the value the
    production page resolves it to (the brand palette, see assets/SOURCES.md);
  * markup lost its camelCase when the page was saved, so it is restored (viewBox, feTurbulence, ...);
  * presentation-only wrappers are swapped for a class.

Usage:  python3 tools/build-ready-art.py <path-to>/our_website.htm index.html
Each svg lands between <!--ART:<name>:START--> and <!--ART:<name>:END--> markers in index.html (idempotent).
"""
import re
import sys

SRC, HTML = sys.argv[1], sys.argv[2]
NAMES = ['checkin', 'arrival', 'visa', 'takeoff']

CAMEL = {
    'viewbox': 'viewBox', 'feturbulence': 'feTurbulence', 'fedisplacementmap': 'feDisplacementMap',
    'basefrequency': 'baseFrequency', 'numoctaves': 'numOctaves',
    'xchannelselector': 'xChannelSelector', 'ychannelselector': 'yChannelSelector',
}

page = open(SRC, encoding='utf-8', errors='ignore').read()

# The production page defines legacy names such as --c-0B283D and remaps them to its real palette
# (theme.json presets or fixed values). Resolve each one exactly as the page does.
VARS = {}
for m in re.finditer(r'(--c-[0-9A-Fa-f]{6})\s*:\s*(?:var\([^,)]+,\s*)?(#[0-9A-Fa-f]{6})', page):
    VARS.setdefault(m.group(1), m.group(2).upper())
start = page.index('data-v9="travel-use-cases"')
end = page.index('</section>', start)
articles = re.findall(r'<article.*?</article>', page[start:end], re.S)
assert len(articles) == 4, f'expected 4 articles, found {len(articles)}'


def normalise(svg: str, name: str) -> str:
    svg = re.sub(r'\s*bis_skin_checked="[^"]*"', '', svg)
    for lower, camel in CAMEL.items():
        svg = re.sub(rf'(?<![A-Za-z]){lower}(?![A-Za-z])', camel, svg)
    for var, value in VARS.items():
        svg = svg.replace(f'var({var})', value)
    svg = svg.replace('font-family="var(--os-font)"', 'font-family="Figtree, system-ui, sans-serif"')
    svg = svg.replace(' style="display:block; overflow:visible"', ' class="tk-svg" overflow="visible" focusable="false"')
    svg = svg.replace(' width="100%"', '')
    svg = re.sub(r'id="i3([a-d])"', lambda m: f'id="art-{name}"', svg).replace('url(#i3a)', 'url(#art-checkin)') \
        .replace('url(#i3b)', 'url(#art-arrival)').replace('url(#i3c)', 'url(#art-visa)').replace('url(#i3d)', 'url(#art-takeoff)')
    assert 'var(' not in svg, f'unresolved variable in {name}'
    return svg


html = open(HTML, encoding='utf-8').read()
for name, article in zip(NAMES, articles):
    svg = normalise(re.search(r'<svg.*?</svg>', article, re.S).group(0), name)
    pattern = rf'<!--ART:{name}:START-->.*?<!--ART:{name}:END-->'
    assert re.search(pattern, html, re.S), f'marker for {name} missing in {HTML}'
    html = re.sub(pattern, lambda m: f'<!--ART:{name}:START-->{svg}<!--ART:{name}:END-->', html, flags=re.S)
open(HTML, 'w', encoding='utf-8').write(html)
print('injected', len(NAMES), 'illustrations')
