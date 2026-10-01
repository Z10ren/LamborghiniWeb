// Which model materials each option group is allowed to touch.
// The viewer only ever edits the materials listed here, so changing one option
// can't change any other part. tools/check-isolation (run in the browser) verifies this.

export const PART_MATERIALS = {
  paint: ['paint_body'],                                      // body panels, doors, mirrors and the rear wing
  wheels: ['wheel_rim'],
  calipers: ['brake_caliper'],
  interior: ['interior_leather', 'interior_leather_insert'],
  lift: [],                                                   // moves the body group, no material changes
};

// Plain-language names for announcements ("Only the brake calipers changed").
export const PART_LABELS = {
  paint: 'body paint',
  wheels: 'wheel rims',
  calipers: 'brake calipers',
  interior: 'leather',
  lift: 'lifting system',
};

// Paint finish presets for MeshPhysicalMaterial. Clearcoat and iridescence never reach exactly 0,
// so switching finish never forces a shader recompile mid-animation.
export const FINISHES = {
  solid:    { metalness: 0.0,  roughness: 0.32, clearcoat: 1.0,   clearcoatRoughness: 0.04, iridescence: 0.001 },
  metallic: { metalness: 0.62, roughness: 0.34, clearcoat: 1.0,   clearcoatRoughness: 0.03, iridescence: 0.001 },
  pearl:    { metalness: 0.32, roughness: 0.28, clearcoat: 1.0,   clearcoatRoughness: 0.03, iridescence: 0.45 },
  matte:    { metalness: 0.08, roughness: 0.74, clearcoat: 0.001, clearcoatRoughness: 0.6,  iridescence: 0.001 },
};

export const FINISH_LABELS = { solid: 'Solid', metallic: 'Metallic', pearl: 'Pearl', matte: 'Matte' };
