// Copies the pinned three.js files the site needs into vendor/three, so the site works offline
// and needs no CDN. Run after `npm install`: node tools/copy-vendor.mjs
import { cpSync, mkdirSync } from 'node:fs';
const files = [
  'LICENSE',
  'build/three.module.js',
  'build/three.core.js',
  'examples/jsm/loaders/GLTFLoader.js',
  'examples/jsm/utils/BufferGeometryUtils.js',
  'examples/jsm/utils/SkeletonUtils.js',
  'examples/jsm/controls/OrbitControls.js',
  'examples/jsm/libs/meshopt_decoder.module.js',
];
for (const f of files) {
  const to = `vendor/three/${f}`;
  mkdirSync(to.slice(0, to.lastIndexOf('/')), { recursive: true });
  cpSync(`node_modules/three/${f}`, to);
}
console.log(`Copied ${files.length} three.js files to vendor/three`);

# Automated touch for Day 1: 2026-10-01T10:00:00

# Automated touch for Day 2: 2026-10-02T10:00:00

# Automated touch for Day 3: 2026-10-03T10:00:00

# Automated touch for Day 4: 2026-10-04T10:00:00

# Automated touch for Day 5: 2026-10-05T10:00:00

# Automated touch for Day 6: 2026-10-06T10:00:00

# Automated touch for Day 7: 2026-10-07T10:00:00

# Automated touch for Day 8: 2026-10-08T10:00:00
