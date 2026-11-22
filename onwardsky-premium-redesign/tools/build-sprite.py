"""Build the inline icon sprite from the fetched Phosphor package and inject it into index.html.
Usage: python3 tools/build-sprite.py <path-to>/@phosphor-icons/core/assets index.html
Icons: b- = bold (controls), d- = duotone (proof tiles), f- = fill (stars, quote mark)."""
import re, sys
PH, HTML = sys.argv[1].rstrip('/') + '/', sys.argv[2]
ICONS = {
  'b': 'list x arrows-down-up plus warning-circle check-circle arrow-right arrow-up-right caret-down lock-simple envelope-simple clock whatsapp-logo headset'.split(),
  'd': 'seal-check clock headset'.split(),
  'f': 'star pause play airplane-tilt quotes'.split(),
}
WEIGHT = {'b': 'bold', 'd': 'duotone', 'f': 'fill'}
out = []
for k, names in ICONS.items():
    for n in names:
        svg = open(f"{PH}{WEIGHT[k]}/{n}-{WEIGHT[k]}.svg", encoding='utf-8').read()
        inner = re.search(r'<svg[^>]*>(.*)</svg>', svg, re.S).group(1).strip()
        out.append(f'<symbol id="{k}-{n}" viewBox="0 0 256 256">{inner}</symbol>')
sprite = '<svg class="sprite" aria-hidden="true" focusable="false" width="0" height="0">' + ''.join(out) + '</svg>'
h = open(HTML, encoding='utf-8').read()
h = re.sub(r'<!--SPRITE:START-->.*?<!--SPRITE:END-->', lambda m: '<!--SPRITE:START-->' + sprite + '<!--SPRITE:END-->', h, flags=re.S)
open(HTML, 'w', encoding='utf-8').write(h)
print(len(out), 'symbols injected')
