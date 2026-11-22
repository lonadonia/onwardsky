"""Grade the hero photograph to the brand and write the two WebP files the hero uses.

Source: Unsplash, photo-1506012787146-f92b2d7d6d96 (the wing of an airliner against a sunset; Unsplash License: free
for commercial use, no attribution required). It is not stored in the repository; download the original first:

    curl -L "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=2400&q=85" -o hero-original.jpg

Grade (the only edit): a split tone in the production teals. The shadows are pulled towards heading #0E2F34 and the lower
mid-tones lightly towards deep #0F555B, so the dark ground under the form reads as brand teal; the highlights keep the
photograph's own warm sunset light, which is the burnt-orange family of the booking button. No retouching, no text, no
logos, no people.

Usage:  python3 tools/build-hero-photo.py hero-original.jpg assets/img
  writes hero-photo.webp (2000 px wide) and hero-photo-portrait.webp (900 px wide crop for phones)
Needs Pillow and NumPy (pip install pillow numpy).
"""
import sys

import numpy as np
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2].rstrip('/')
HEADING = np.array((14, 47, 52), dtype=np.float32) / 255.0   # production preset `heading`
DEEP = np.array((15, 85, 91), dtype=np.float32) / 255.0      # production preset `deep`


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def grade(im):
    a = np.asarray(im.convert('RGB')).astype(np.float32) / 255.0
    lum = (0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2])[..., None]
    shadows = (np.clip(1.0 - lum, 0, 1) ** 1.6) * 0.58
    out = a * (1 - shadows) + HEADING * shadows
    mids = (smoothstep(0.18, 0.5, lum) * (1.0 - smoothstep(0.5, 0.85, lum))) * 0.16
    out = out * (1 - mids) + DEEP * mids
    return Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))


src = Image.open(SRC).convert('RGB')

# landscape: the whole frame, 2000 px wide
w = 2000
land = src.resize((w, round(src.height * w / src.width)), Image.LANCZOS)
grade(land).save(f'{OUT}/hero-photo.webp', 'WEBP', quality=78, method=6)

# portrait (phones): the right-hand part of the frame, with the wing tip and the sun
x0 = round(src.width * 0.35)
crop = src.crop((x0, 0, src.width, src.height))
pw = 900
port = crop.resize((pw, round(crop.height * pw / crop.width)), Image.LANCZOS)
grade(port).save(f'{OUT}/hero-photo-portrait.webp', 'WEBP', quality=78, method=6)
print('wrote hero-photo.webp and hero-photo-portrait.webp', land.size, port.size)
