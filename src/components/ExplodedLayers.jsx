import { useEffect, useRef } from 'react';
import { rafWhenVisible } from '../lib/rafWhenVisible';

// Exploded 3D AI-processor teardown, driven by the About section's scroll.
// The chip's layers (PCB, substrate, HBM memory, neural die, heat spreader, thermal glow)
// fan apart as the section enters view, then reassemble. Themed gold/dark.
const clamp = (n, a = 0, b = 1) => (n < a ? a : n > b ? b : n);
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const GOLD = '#D4A45F';
const W = 260, H = 230;
const LAYERS = ['pcb', 'substrate', 'memory', 'die', 'spreader', 'glow'];
const N = LAYERS.length;
const LABEL = { pcb: 'PCB Board', substrate: 'Substrate', memory: 'HBM Memory', die: 'Neural Die', spreader: 'Heat Spreader', glow: 'Thermal' };

function Cores() {
  // grid of compute cores; a scattered set glow gold
  const cols = 9, rows = 7;
  return (
    <div style={{ position: 'absolute', inset: '34px 20px 34px', display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gridTemplateRows: `repeat(${rows},1fr)`, gap: 3 }}>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const hot = (i * 7 + 3) % 5 === 0;
        return <div key={i} style={{ borderRadius: 2, background: hot ? 'rgba(212,164,95,.85)' : 'rgba(212,164,95,.14)', boxShadow: hot ? '0 0 8px rgba(212,164,95,.7)' : 'none' }} />;
      })}
    </div>
  );
}

function LayerContent({ type }) {
  if (type === 'pcb') return (
    <>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(90deg,rgba(212,164,95,.12) 1px,transparent 1px), linear-gradient(rgba(212,164,95,.12) 1px,transparent 1px)`, backgroundSize: '18px 18px' }} />
      {/* traces */}
      <div style={{ position: 'absolute', left: 20, top: 40, width: 120, height: 2, background: 'rgba(212,164,95,.4)' }} />
      <div style={{ position: 'absolute', left: 140, top: 40, width: 2, height: 60, background: 'rgba(212,164,95,.4)' }} />
      <div style={{ position: 'absolute', right: 24, top: 90, width: 90, height: 2, background: 'rgba(212,164,95,.3)' }} />
      {/* small SMD chips */}
      {[[28, 150], [80, 170], [W - 70, 150]].map(([x, y], i) => <div key={i} style={{ position: 'absolute', left: x, top: y, width: 30, height: 16, borderRadius: 2, background: '#08101F', border: '1px solid rgba(212,164,95,.35)' }} />)}
      {/* gold edge connector */}
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 0, height: 12, display: 'flex', gap: 3 }}>
        {Array.from({ length: 22 }).map((_, i) => <div key={i} style={{ flex: 1, background: 'linear-gradient(180deg,#E2BC82,#9A7640)' }} />)}
      </div>
    </>
  );
  if (type === 'substrate') return (
    <div style={{ position: 'absolute', inset: '22px', display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gridTemplateRows: 'repeat(10,1fr)', gap: 4, placeItems: 'center' }}>
      {Array.from({ length: 120 }).map((_, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#E8C590,#9A7640)' }} />)}
    </div>
  );
  if (type === 'memory') return (
    <div style={{ position: 'absolute', inset: '30px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14 }}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{ borderRadius: 6, background: 'linear-gradient(160deg,#1a1a1f,#0d0d10)', border: '1px solid rgba(212,164,95,.3)', position: 'relative', overflow: 'hidden' }}>
          {Array.from({ length: 5 }).map((_, k) => <div key={k} style={{ position: 'absolute', left: 8, right: 8, top: 8 + k * 8, height: 3, background: 'rgba(212,164,95,.22)' }} />)}
          <span style={{ position: 'absolute', bottom: 5, right: 7, fontSize: 7, color: 'rgba(255,255,255,.4)', letterSpacing: '.1em' }}>HBM</span>
        </div>
      ))}
    </div>
  );
  if (type === 'die') return (
    <>
      <div style={{ position: 'absolute', inset: 14, borderRadius: 6, background: 'linear-gradient(160deg,#08101F,#030812)', border: `1px solid rgba(212,164,95,.5)`, boxShadow: 'inset 0 0 40px rgba(212,164,95,.12)' }} />
      <Cores />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 54, height: 54, borderRadius: 6, background: 'linear-gradient(150deg,#131E31,#060E1B)', border: `1px solid ${GOLD}`, boxShadow: '0 0 26px rgba(212,164,95,.5)', display: 'grid', placeItems: 'center', zIndex: 2 }}>
        <span style={{ fontWeight: 800, fontSize: 18, color: GOLD, letterSpacing: '.05em' }}>AI</span>
      </div>
      <span style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', fontSize: 8, color: 'rgba(212,164,95,.7)', letterSpacing: '.24em' }}>NEURAL CORE</span>
    </>
  );
  if (type === 'spreader') return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#091221 0%,#02050B 45%,#08101F 60%,#02050B 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg,rgba(255,255,255,.03) 0 2px,transparent 2px 6px)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'rgba(212,164,95,.7)' }}>◆</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, letterSpacing: '.28em', color: 'var(--gold)', marginTop: 6 }}>AI</div>
      </div>
      <span style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', fontSize: 8, color: 'rgba(255,255,255,.4)', letterSpacing: '.2em' }}>NPU · 4nm</span>
    </>
  );
  if (type === 'glow') return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 55% at 50% 45%, rgba(212,164,95,.28), transparent 65%)' }} />
      <div style={{ position: 'absolute', left: 200, top: 150, width: 14, height: 14, borderRadius: '50%', background: GOLD, boxShadow: `0 0 22px ${GOLD}` }} />
    </>
  );
  return null;
}

export default function ExplodedLayers() {
  const wrapRef = useRef(null);
  const stackRef = useRef(null);
  const layerRefs = useRef([]);

  useEffect(() => {
    let p = 0, lastP = -1;
    const loop = () => {
      const el = wrapRef.current;
      if (el && stackRef.current) {
        const vh = window.innerHeight;
        const r = el.getBoundingClientRect();
        const tp = clamp((vh - r.top - r.height * 0.15) / (vh * 0.72));
        p = lerp(p, tp, 0.06);
        if (Math.abs(p - lastP) < 0.0002) return; // settled
        lastP = p;
        const e = ease(clamp(p * 1.12));
        const gap = lerp(1, 58, e);
        const rx = lerp(46, 60, e);
        const rz = lerp(-18, -32, e);
        stackRef.current.style.transform = `rotateX(${rx}deg) rotateZ(${rz}deg)`;
        layerRefs.current.forEach((L, i) => {
          if (!L) return;
          const z = (i - (N - 1) / 2) * gap;
          L.style.transform = `translate(-50%,-50%) translateZ(${z}px)`;
          L.style.zIndex = String(1000 + i);
        });
      }
    };
    return rafWhenVisible(wrapRef.current, loop);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, perspective: '1300px', perspectiveOrigin: '50% 42%', transform: 'scale(1.25)', transformOrigin: '74% 50%' }}>
      <div ref={stackRef} style={{ position: 'absolute', top: '50%', left: '78%', transformStyle: 'preserve-3d', willChange: 'transform' }}>
        {LAYERS.map((type, i) => (
          <div
            key={type}
            ref={el => (layerRefs.current[i] = el)}
            style={{
              position: 'absolute', top: 0, left: 0, width: W, height: H, margin: `${-H / 2}px 0 0 ${-W / 2}px`,
              borderRadius: 14, overflow: 'hidden', willChange: 'transform',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 26px 64px -26px rgba(0,0,0,0.8)',
              background: type === 'spreader' ? '#030812' : type === 'glow' ? 'transparent' : 'linear-gradient(160deg,#0C1629,#030812)',
            }}
          >
            <span style={{ position: 'absolute', top: 9, left: 12, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', zIndex: 4 }}>
              {String(i + 1).padStart(2, '0')} · <b style={{ color: GOLD }}>{LABEL[type]}</b>
            </span>
            <LayerContent type={type} />
          </div>
        ))}
      </div>
    </div>
  );
}
