"""Copy unDraw illustrations out of the `undraw-svg` npm package and remap their colors to the Onward Sky palette.

Nothing is drawn here: unDraw ships its accent as `currentColor`, and this only replaces color values.
Usage:  python3 tools/recolor-undraw.py <path-to>/undraw-svg/package/svgs assets/vectors at-the-airport luggage ...
"""
import re, sys, os
SRC, OUT, names = sys.argv[1], sys.argv[2], sys.argv[3:]
MAP = {
  'currentcolor': '#156970',
  '#3f3d56': '#0F4C54', '#2f2e41': '#0B2B30', '#090814': '#0B2B30', '#000': '#0B2B30', '#000000': '#0B2B30',
  '#e6e6e6': '#D8E8E7', '#f2f2f2': '#E8F2F1', '#f0f0f0': '#E8F2F1', '#e4e4e4': '#D8E8E7', '#cbcbcb': '#C3D9D8',
  '#d6d6e3': '#C9E0E0', '#e1e7ef': '#D3E6E6', '#ccc': '#C3D9D8', '#e5e5e5': '#D8E8E7',
  '#ed9da0': '#F08A57', '#e8989b': '#F08A57', '#ff6584': '#F08A57', '#6c63ff': '#156970',
}
def recolor(svg):
    svg = re.sub(r'((?:fill|stroke)=")(currentColor|#[0-9a-fA-F]{3,6})(?=")', lambda m: m.group(1) + MAP.get(m.group(2).lower(), m.group(2)), svg)
    svg = re.sub(r'(fill:|stroke:)(currentColor|#[0-9a-fA-F]{3,6})', lambda m: m.group(1) + MAP.get(m.group(2).lower(), m.group(2)), svg)
    return re.sub(r'<title>.*?</title>', '', svg)
os.makedirs(OUT, exist_ok=True)
for n in names:
    open(os.path.join(OUT, n + '.svg'), 'w', encoding='utf-8').write(recolor(open(os.path.join(SRC, n + '.svg'), encoding='utf-8').read()))
    print('recolored', n)
