import { useEffect, useRef } from 'react';
import { rafWhenVisible } from '../lib/rafWhenVisible';

// scroll3d-dna's double helix, scoped to a container + themed gold, sits behind content.
const clamp = (n, a = 0, b = 1) => (n < a ? a : n > b ? b : n);

export default function DnaBackground({ opacity = 0.4, align = 'center' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, t = 0;

    const fit = () => {
      const r = parent.getBoundingClientRect();
      W = canvas.width = Math.max(1, Math.round(r.width * DPR));
      H = canvas.height = Math.max(1, Math.round(r.height * DPR));
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(parent);

    const RUNGS = 26, R = 1.05, SPAN = 6.6;
    const cxFrac = align === 'right' ? 0.72 : align === 'left' ? 0.28 : 0.5;

    const proj = (x, y, z) => {
      const focal = 6, persp = focal / (focal + z), S = Math.min(W, H) * 0.5;
      return { x: W * cxFrac + x * S * persp, y: H / 2 + y * S * persp, z, persp };
    };

    const render = () => {
      t += 0.016;
      const ry = (window.scrollY || window.pageYOffset) * 0.004 + t * 0.15; // turns with scroll
      const tiltX = 0.2;
      const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(tiltX), sx = Math.sin(tiltX);
      const place = (ang, yy) => {
        let x = Math.cos(ang) * R, z = Math.sin(ang) * R, y = yy;
        const X = x * cy - z * sy, Z = x * sy + z * cy;
        const Y = y * cx - Z * sx, Z2 = y * sx + Z * cx;
        return proj(X, Y, Z2);
      };

      ctx.clearRect(0, 0, W, H);
      const items = [];
      for (let i = 0; i < RUNGS; i++) {
        const f = i / (RUNGS - 1);
        const yy = (f - 0.5) * SPAN * 0.5;
        const ang = f * Math.PI * 2 * 2.2;
        const a = place(ang, yy), b = place(ang + Math.PI, yy);
        items.push({ z: (a.z + b.z) / 2, type: 'rung', a, b });
        items.push({ z: a.z, type: 'node', p: a });
        items.push({ z: b.z, type: 'node', p: b });
      }
      items.sort((u, v) => u.z - v.z);

      for (const it of items) {
        if (it.type === 'rung') {
          const d = clamp(((it.a.z + it.b.z) / 2 + 2) / 4);
          ctx.strokeStyle = `hsla(43,45%,${40 + d * 25}%,${0.08 + d * 0.25})`;
          ctx.lineWidth = (0.7 + d) * DPR;
          ctx.beginPath(); ctx.moveTo(it.a.x, it.a.y); ctx.lineTo(it.b.x, it.b.y); ctx.stroke();
        } else {
          const p = it.p, d = clamp((p.z + 2) / 4), rad = (2 + d * 3.4) * DPR;
          ctx.globalCompositeOperation = 'lighter';
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 3);
          g.addColorStop(0, `hsla(45,85%,${60 + d * 20}%,${0.4 + d * 0.5})`);
          g.addColorStop(1, 'hsla(45,85%,60%,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, rad * 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `hsla(46,90%,${72 + d * 16}%,0.72)`;
          ctx.beginPath(); ctx.arc(p.x, p.y, rad, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        }
      }
    };
    const stop = rafWhenVisible(parent, render);
    return () => { stop(); ro.disconnect(); };
  }, [align]);

  return (
    <canvas ref={ref} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity }} />
  );
}
