<p align="center"><img src="assets/brand/aurelion-logo.svg" alt="AURELION" width="520"></p>

# AURELION — Aventador LP 700-4 landing page and configurator

AURELION is an unofficial student project. Not affiliated with or endorsed by Automobili Lamborghini S.p.A.
Lamborghini and Aventador are trademarks of their owner.

**Live site:** https://z10ren.github.io/LamborghiniWeb/ (GitHub Pages, published from the `main` branch)

## What's here

| Page | What it does |
|---|---|
| `index.html` | New landing page (hero with a looping test-drive video, "one part at a time" sequence, factory figures, starter builds), followed by the original site sections, rewritten for the Aventador LP 700-4 (see the edits listed below). |
| `configure.html` | Picture configurator (the default). Pre-rendered views, like Tesla's: fast on any device. Each option swaps only its own image layer. |
| `configure-3d.html` | Optional real-time 3D version (about 11 MB, needs a decent graphics chip). Linked from the picture page as "Rotate in 3D". |

```
index.html, configure.html, configure-3d.html
css/      fonts.css · site.css (original styles, moved) · tailwind.css (compiled) · landing.css · configurator.css
js/       site.js (original script, adapted) · configurator/ main, state, ui, image-stage (pictures), viewer (3D), parts, animations
data/     options.json — every option with its source · views.json — the picture layers (written by render_views.py)
assets/   video/ (test-drive loop + poster) · views/ (picture layers, 1600 px and 960 px "-sm") · img/ (landing renders)
          fonts/ (self-hosted woff2 + licences) · brand/ (AURELION logo, favicon) · models/aventador-lp700-4.glb (prepared)
vendor/   three.js r186 (pinned, MIT)
tools/    prep-model.mjs · render_views.py · render_stills.py · render_drive.py · render_outlines.py · build_illustrations.py · build_logo.py
          optimize_assets.py · check_isolation.py · copy-vendor.mjs
```

## Run it

The live version is on GitHub Pages (link above). To run it on your own computer, any static file server works, for example `python3 -m http.server` in this folder, then open http://localhost:8000.
Opening the files directly (`file://`) won't work because the browser blocks loading the model that way.

## How the picture configurator works

`tools/render_views.py` renders every view from the 3D model once: front ¾, side (lowered and raised), rear ¾ (wing stowed, 4°, 11°), wheel close-up, cabin (doors open) and night (lights on).
For each view it saves one full picture per paint colour, plus transparent overlays for the non-standard wheel finish, caliper colours and leather colours.
Overlays are rendered with the rest of the car as an invisible mask, so stacking them on any paint replaces exactly that part and nothing else.
The page shows a stack of at most four images (paint, wheels, calipers, leather) and crossfades a new stack in once it has fully loaded.
Opening the configurator downloads one picture of about 90 KB (about 50 KB on phones); the rest load in the background.

## The AURELION logo

`assets/brand/aurelion-logo.svg` is a vector redraw of the team's logo image (`assets/brand/source/aurelion-logo-original.jpg`).
`tools/build_logo.py` traces the letters from that image and gives them a polished-gold finish, so the logo stays sharp at any size.
It also writes a 2400 px transparent PNG (`aurelion-logo.png`, for slides and documents) and the browser tab icon (the gold "A").
The logo appears in the navigation bar, the configurator's top bar, the footer, and the corner of pictures saved from the configurator.

## The test-drive video

The hero plays an 8-second loop of the car driving through a lit road tunnel at about 86 km/h. It is a computer render made
from the same 3D model by `tools/render_drive.py`, not real footage (real Aventador footage would need a licence).
The car stays still while the tunnel moves past it; the wheels turn at road speed, the lamp reflections slide over the paint,
and every frame averages several sub-frames for motion blur. The loop is seamless.

How it loads, so it doesn't slow the page down:
- The first thing shown is the poster, a ~25 KB still of the video's first frame, so the page paints fast.
- The video file is requested only after the page has finished loading. Desktops get the 1280 px AV1 file (about 530 KB)
  or, if the browser can't play AV1, the H.264 one (1.2 MB); phones get an 854 px H.264 file (about 400 KB).
- It pauses when the hero is scrolled off screen or the tab is hidden, and there is a pause button.
- With "reduce motion" or Data Saver turned on it doesn't download at all unless the visitor presses Play.

## Speed

- Picture configurator: the first view needs one picture (about 90 KB, 50 KB on phones); phones (600 px wide or less) get 960 px copies of every layer, about half the size.
  The rest preload while the browser is idle (not on phones for the other paints, and not at all on Data Saver).
- Fonts are self-hosted (`css/fonts.css`, Latin subset, variable weights) instead of loading a stylesheet from Google Fonts first.
- Landing images are WebP with smaller copies for phones and 1x screens (`srcset`); the long sections far down the page
  use `content-visibility: auto`, so the browser skips drawing them until they are near the screen.
- Looping animations pause off screen; no full-screen blur or SVG noise filters.

## Options and what each one touches

| Group | Options | Changes only |
|---|---|---|
| Paint | 13 launch colours (2 standard solids, 1 optional solid, 4 metallic, 3 pearl, 3 matte) | `paint_body` material (body, doors, mirrors, wing) |
| Wheel finish | Silver (standard), Glossy black | `wheel_rim` material |
| Brake calipers | Black (standard), Red, Orange, Grey, Yellow | `brake_caliper` material |
| Interior leather | Nero Ade, Terra Dirce, Sabbia Nefertem | `interior_leather`, `interior_leather_insert` |
| Front axle lifting system | Not fitted, Fitted (+40 mm) | Body group rotation about the rear axle (preview) |
| Previews (not saved in the build) | Rear wing stowed / 4° / 11°, lights, doors | Wing pivot, lamp emission and studio lighting, door hinge |

`python tools/check_isolation.py` applies every option in both versions and fails if anything outside its own part changes, or if a picture file is missing.
Sources for every option are in `data/options.json` and listed at the bottom of the configurator panel.

## Limitations

- The picture version has fixed views (no free rotation); the 3D page is there for rotating.
- One wheel design in the model, so only the finish changes. A second design needs another licensed wheel model.
- Interior colour is one colour across seats, tunnel and dashboard; the model can't show two-tone or stitching.
- The transparent engine bonnet is the only engine cover in the model, so it isn't an option.
- Paint colours are on-screen approximations of the factory names. The renders are real-time 3D, not photorealistic.
- The hero video is 1280×720 (rendered in software), so it looks a little soft on very large screens. It shows one car colour and one camera angle.

## Edits made to the original page

- Site name AURELION: logo in the navigation bar and footer (it replaces the "LAMBORGHINI" wordmark), page titles, tab icon,
  footer notice, and the footer sign-up block, which now says plainly that it's a demo.

- The original sections were written for the Revuelto. They now describe the Aventador LP 700-4, using the factory technical data (2011):
  - Engineering: carbon monocoque (147.5 kg, 35,000 Nm/deg), the 700 CV 6.5-litre V12 with the 7-speed ISR gearbox and Haldex IV
    all-wheel drive, and the rear wing's three positions (stowed, 4°, 11°), which the wing buttons now switch between.
  - Tech specs, telemetry gauges and cockpit cards: Aventador figures and features (TFT instruments, Strada/Sport/Corsa, the start button under its red cover).
  - The drawings are traced from the 3D model (`tools/render_outlines.py` writes `data/outlines.json`, `tools/build_illustrations.py`
    puts the SVG into `index.html`), so they show the real Aventador shape: side view with the monocoque and aluminium frames,
    plan view of the drivetrain, and the side view with the moving wing.
  - The Revuelto photos from Wikimedia Commons are replaced by renders of this model; the "Drive the Revuelto" call to action is now "Drive the Aventador".

- Hero and "Apex of innovation" sections replaced by the new landing sections.
- Old single-photo configurator section removed; navigation, menu, footer and "Configure yours" now link to `configure.html`.
- "Unofficial student project" label next to the wordmark; the manufacturer copyright line replaced by an unofficial-project notice and model credit.
- Booking dialog: colour list replaced by the build from the configurator; it now says plainly that it's a demo and sends nothing.
- Inline CSS and JS moved to `css/site.css` and `js/site.js`; Tailwind compiled to `css/tailwind.css` instead of the play CDN.

## Rebuilding

```
npm install
npm run prep-model        # source GLB -> assets/models/aventador-lp700-4.glb (6.5 MB, parts kept separate)
npm run vendor            # copy pinned three.js files into vendor/
npm run css               # recompile Tailwind after changing classes in index.html or js/site.js
pip install playwright pillow && python -m playwright install chromium
python tools/render_views.py       # re-render the picture configurator layers (about 25 minutes)
python tools/render_stills.py      # re-render landing images from the configurator
python tools/optimize_assets.py    # WebP copies of the landing images, phone-size picture layers
python tools/render_drive.py       # re-render the hero video (about 50 minutes; needs ffmpeg)
python tools/render_outlines.py    # trace the car's outlines from the model (needs opencv-python)
python tools/build_illustrations.py  # rebuild the engineering drawings in index.html from those outlines
python tools/build_logo.py         # rebuild the AURELION logo files from the original image
python tools/check_isolation.py    # verify each option changes only its own part
```

The source model is not included here. Put the original `free__lamborghini_aventador_lp_700-4.glb` in `assets/models/source/` before running `prep-model`.

## Credits and licences

- 3D model: [“( FREE ) Lamborghini Aventador LP 700-4”](https://sketchfab.com/3d-models/free-lamborghini-aventador-lp-700-4-df69d51ba10146f79c8c765810ca2132) by SDC PERFORMANCE™️, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Modified: materials renamed and adjusted, rear wing separated into its own node, selected parts simplified, meshopt compression. CC BY covers the model's copyright only; it does not grant trademark rights.
- three.js — MIT licence (`vendor/three/LICENSE`).
- Fonts (self-hosted, files from Fontsource): Inter and Space Grotesk (SIL Open Font License 1.1), Syncopate (Apache License 2.0). Licence texts in `assets/fonts/`.
