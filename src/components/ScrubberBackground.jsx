import { useEffect, useRef } from 'react';
import { rafWhenVisible } from '../lib/rafWhenVisible';

// scrubber.html's morphing 3D point-cloud, retuned for the portfolio:
// gold points on dark, additive glow, subtle — rotation/morph scrubbed by the
// host section's progress through the viewport.
const clamp = (n, a = 0, b = 1) => (n < a ? a : n > b ? b : n);
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// gold hsl ~43°, brighter/nearer points warmer — precomputed per depth bucket
const BUCKETS = 12;
const BUCKET_STYLES = Array.from({ length: BUCKETS }, (_, i) => {
  const d = (i + 0.5) / BUCKETS;
  return `hsla(43, ${42 + d * 26}%, ${38 + d * 34}%, ${0.10 + d * 0.5})`;
});

export default function ScrubberBackground({ opacity = 0.55, align = 'center', variant = 'knot' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, smoothP = 0, lastP = -1;

    // point cloud with a base shape (a) → morph target (b), built once
    const pts = [];
    let scaleMul = 0.17, tiltBias = 0.42;
    if (variant === 'grid') {
      // rippling lattice → torus
      scaleMul = 0.13; tiltBias = 0.85;
      const side = 30;
      for (let gy = 0; gy < side; gy++) {
        for (let gx = 0; gx < side; gx++) {
          const u = gx / (side - 1), v = gy / (side - 1);
          const px = (u - 0.5) * 5.2, pz = (v - 0.5) * 5.2;
          const py = Math.sin(u * Math.PI * 3) * 0.5 + Math.cos(v * Math.PI * 3) * 0.5;
          const a1 = u * Math.PI * 2, a2 = v * Math.PI * 2, R = 2.2, rr = 0.95;
          const tx = (R + rr * Math.cos(a2)) * Math.cos(a1);
          const ty = rr * Math.sin(a2);
          const tz = (R + rr * Math.cos(a2)) * Math.sin(a1);
          pts.push({ a: [px, py, pz], b: [tx, ty, tz] });
        }
      }
    } else {
      // torus-knot → sphere
      const N = 900;
      for (let i = 0; i < N; i++) {
        const u = (i / N) * Math.PI * 2 * 3, v = (i / N) * Math.PI * 2 * 2, r = 2 + Math.cos(v);
        const y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(Math.max(0, 1 - y * y)), th = i * 2.399963;
        pts.push({ a: [r * Math.cos(u), r * Math.sin(u), -Math.sin(v)], b: [Math.cos(th) * rad * 3, y * 3, Math.sin(th) * rad * 3] });
      }
    }

    const fit = () => {
      const rect = parent.getBoundingClientRect();
      W = canvas.width = Math.max(1, Math.round(rect.width * DPR));
      H = canvas.height = Math.max(1, Math.round(rect.height * DPR));
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(parent);

    const render = () => {
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      const progressRaw = clamp((vh - rect.top) / (vh + rect.height)); // 0 → 1 as it passes through
      smoothP = lerp(smoothP, progressRaw, 0.05);
      const progress = smoothP;
      if (Math.abs(progress - lastP) < 0.00005) return; // settled: nothing to redraw
      lastP = progress;

      ctx.clearRect(0, 0, W, H);
      const morph = ease(clamp((progress - 0.12) / 0.72));
      const rotY = progress * Math.PI * 2.4 + 0.6;
      const rotX = tiltBias + Math.sin(progress * Math.PI) * 0.4;
      const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);

      const S = Math.min(W, H), scale = S * scaleMul, focal = 7;
      const cxp = align === 'right' ? W * 0.72 : align === 'left' ? W * 0.28 : W * 0.5;
      const cyp = H * 0.5;

      // 'lighter' blending is order-independent, so no depth sort: bucket points by
      // depth and draw each bucket as one path (12 fills instead of ~900).
      const buckets = BUCKET_STYLES.map(() => new Path2D());
      for (const pt of pts) {
        const x = lerp(pt.a[0], pt.b[0], morph);
        const y = lerp(pt.a[1], pt.b[1], morph);
        const z = lerp(pt.a[2], pt.b[2], morph);
        const X = x * cy - z * sy, Z = x * sy + z * cy, Y = y;
        const Y2 = Y * cx - Z * sx, Z2 = Y * sx + Z * cx;
        const persp = focal / (focal + Z2);
        const px = cxp + X * scale * persp, py = cyp + Y2 * scale * persp;
        const d = clamp((Z2 + 3) / 6);            // depth 0..1
        const rad = Math.max(0.5, persp * S * 0.0038);
        const path = buckets[Math.min(BUCKETS - 1, (d * BUCKETS) | 0)];
        path.moveTo(px + rad, py);
        path.arc(px, py, rad, 0, Math.PI * 2);
      }

      ctx.globalCompositeOperation = 'lighter';
      buckets.forEach((path, i) => { ctx.fillStyle = BUCKET_STYLES[i]; ctx.fill(path); });
    };
    const stop = rafWhenVisible(parent, render);

    return () => { stop(); ro.disconnect(); };
  }, [align, variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity }}
    />
  );
}
