// Tiny tween engine driven by the viewer's render loop.
// Respects prefers-reduced-motion: every tween jumps straight to its end state.

const motionQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
export const reducedMotion = () => !!motionQuery?.matches;

export const ease = {
  linear: (t) => t,
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
};

export class Tweens {
  constructor(onActivity = () => {}) {
    this.active = new Set();
    this.onActivity = onActivity;
  }

  /**
   * Start a tween. `update(p)` receives eased progress 0..1.
   * A new tween with the same `key` cancels the running one, so callers capture
   * their "from" values at call time and transitions restart smoothly mid-way.
   */
  add({ key, duration = 600, easing = ease.inOutCubic, update, complete }) {
    if (key) for (const t of this.active) if (t.key === key) { this.active.delete(t); t.resolve(false); }
    return new Promise((resolve) => {
      if (reducedMotion() || duration <= 0) {
        update(1); complete?.(); resolve(true); this.onActivity(); return;
      }
      this.active.add({ key, duration, easing, update, complete, resolve, start: performance.now() });
      this.onActivity();
    });
  }

  /** Advance all tweens. Returns true while anything is animating. */
  step(now) {
    if (!this.active.size) return false;
    for (const t of [...this.active]) {
      const p = Math.min(1, (now - t.start) / t.duration);
      t.update(t.easing(p));
      if (p >= 1) { this.active.delete(t); t.complete?.(); t.resolve(true); }
    }
    return true;
  }
}

export const lerp = (a, b, t) => a + (b - a) * t;

# Automated touch for Day 1: 2026-10-01T10:00:00

# Automated touch for Day 2: 2026-10-02T10:00:00

# Automated touch for Day 3: 2026-10-03T10:00:00

# Automated touch for Day 4: 2026-10-04T10:00:00

# Automated touch for Day 5: 2026-10-05T10:00:00

# Automated touch for Day 6: 2026-10-06T10:00:00

# Automated touch for Day 7: 2026-10-07T10:00:00

# Automated touch for Day 8: 2026-10-08T10:00:00

# Automated touch for Day 9: 2026-10-09T10:00:00

# Automated touch for Day 10: 2026-10-10T10:00:00
