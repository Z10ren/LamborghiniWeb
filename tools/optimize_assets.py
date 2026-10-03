"""Makes the web-ready image files. Run after render_stills.py or render_views.py.

  * assets/img/*.jpg (landing renders) -> .webp, plus smaller copies for phones and 1x screens
    (seq-* get 800 and 1200 px copies, starter-* a 600 px copy); the .jpg files are removed afterwards
  * assets/img/noise.png -> noise.webp
  * assets/views/*.webp (picture configurator, 1600x900) -> a 960x540 "-sm" copy of each, used on phones

Usage (from the project folder):  python tools/optimize_assets.py
"""
import glob, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'assets', 'img')
VIEWS = os.path.join(ROOT, 'assets', 'views')
SMALL = {'seq-': (800, 1200), 'starter-': (600,)}


def resize(im, width):
    h = round(im.height * width / im.width)
    if im.mode == 'RGBA':          # premultiply so transparent edges don't pick up dark fringes
        return im.convert('RGBa').resize((width, h), Image.LANCZOS).convert('RGBA')
    return im.resize((width, h), Image.LANCZOS)


def save(im, path, **kw):
    im.save(path, 'WEBP', method=6, **kw)
    return os.path.getsize(path)


def main():
    before = after = 0
    for src in sorted(glob.glob(os.path.join(IMG, '*.jpg'))):
        name = os.path.splitext(os.path.basename(src))[0]
        im = Image.open(src).convert('RGB')
        before += os.path.getsize(src)
        after += save(im, os.path.join(IMG, f'{name}.webp'), quality=80)
        for prefix, widths in SMALL.items():
            for width in widths if name.startswith(prefix) else ():
                save(resize(im, width), os.path.join(IMG, f'{name}-{width}.webp'), quality=78)
        os.remove(src)
    noise = os.path.join(IMG, 'noise.png')
    if os.path.exists(noise):
        before += os.path.getsize(noise)
        tile = Image.open(noise).convert('RGBA').resize((112, 112), Image.BILINEAR)   # shown at 160 px; grain, so softness is fine
        after += save(tile, os.path.join(IMG, 'noise.webp'), quality=40, alpha_quality=50)
        os.remove(noise)
    if before:
        print(f'landing images: {before // 1024} KB -> {after // 1024} KB')

    made = total = 0
    for src in sorted(glob.glob(os.path.join(VIEWS, '*.webp'))):
        if src.endswith('-sm.webp'):
            continue
        dst = src[:-5] + '-sm.webp'
        if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
            continue
        im = Image.open(src).convert('RGBA')
        overlay = '-paint-' not in os.path.basename(src)
        total += save(resize(im, 960), dst, quality=85 if overlay else 80, alpha_quality=90)
        made += 1
    if made:
        print(f'picture layers: {made} phone-size copies, {total / 1e6:.1f} MB')


if __name__ == '__main__':
    main()

# Automated touch for Day 1: 2026-10-01T10:00:00

# Automated touch for Day 2: 2026-10-02T10:00:00

# Automated touch for Day 3: 2026-10-03T10:00:00
