"""Cut the two sample itinerary pages the hero shows out of the client's saved page.

The client's homepage shows two redacted sample itineraries in its "A real onward ticket. See for yourself." section
(base64 WebP data URIs inside <picture> elements of `section#verify`). They already carry the "SAMPLE - PRIVACY
REDACTED" watermark. This script decodes them and writes 680 px wide WebP copies (about 35 KB each).

Usage:  python3 tools/build-itinerary-images.py <path-to>/our_website.htm assets/img
Needs Pillow (pip install pillow).
"""
import base64
import io
import re
import sys

from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2].rstrip('/')
page = open(SRC, encoding='utf-8', errors='ignore').read()
start = page.index('id="verify"')
images = []
for m in re.finditer(r'data:image/webp;base64,([A-Za-z0-9+/=]+)', page[start:start + 4000000]):
    im = Image.open(io.BytesIO(base64.b64decode(m.group(1)))).convert('RGB')
    if im.size[1] > im.size[0] and im.size[0] >= 600:          # tall document pages only
        images.append(im)
assert len(images) >= 2, f'found {len(images)} itinerary pages'
# the page lists the second page of the itinerary first, so the order is reversed: page 1 is the one dated 16 Oct
for n, im in enumerate(reversed(images[:2]), start=1):
    w = 680
    h = round(im.size[1] * w / im.size[0])
    im.resize((w, h), Image.LANCZOS).save(f'{OUT}/itinerary-page-{n}.webp', 'WEBP', quality=84, method=6)
print('wrote itinerary-page-1.webp and itinerary-page-2.webp')
