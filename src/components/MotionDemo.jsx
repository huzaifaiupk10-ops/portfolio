import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion';

// Demo page (/motion-demo), round 7: interactive + generative motion-graphic styles (37–42).

const GOLD = '#D4A45F';
const CREAM = '#F8F4EE';
const serif = 'Cormorant Garamond, Georgia, serif';
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

function DemoHeader({ n, title, desc }) {
  return (
    <div style={{ maxWidth: 'var(--max-w)', width: '100%', margin: '0 auto', padding: '0 var(--gutter)', marginBottom: '2.5rem', textAlign: 'center', position: 'relative', zIndex: 30 }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.7rem' }}>Style {n}</p>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(2rem,4.5vw,3.4rem)', color: 'var(--ink)', lineHeight: 1, marginBottom: '0.7rem' }}>{title}</h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--ink-2)', maxWidth: '62ch', lineHeight: 1.6, margin: '0 auto' }}>{desc}</p>
    </div>
  );
}
const border = { borderTop: '1px solid rgba(255,255,255,0.06)' };
const section = { padding: '7rem var(--gutter)', ...border };
const stage = { position: 'relative', maxWidth: 1200, height: 'min(540px, 70vh)', margin: '0 auto', borderRadius: 18, overflow: 'hidden', background: 'radial-gradient(70% 70% at 50% 50%, #0C1729, #030812)', border: '1px solid rgba(212,164,95,0.15)' };

/* ── 37. Magnetic letters ─────────────────────────────────────── */
function MagLetter({ ch, mx, my }) {
  const ref = useRef(null);
  const calc = axis => ([x, y]) => {
    const el = ref.current; if (!el || x < -1e5) return 0;
    const r = el.getBoundingClientRect();
    const dx = r.left + r.width / 2 - x, dy = r.top + r.height / 2 - y, d = Math.hypot(dx, dy) || 1;
    const f = Math.max(0, 1 - d / 170) ** 1.6;
    return (axis === 'x' ? dx : dy) / d * f * 70;
  };
  const x = useSpring(useTransform([mx, my], calc('x')), { stiffness: 180, damping: 14 });
  const y = useSpring(useTransform([mx, my], calc('y')), { stiffness: 180, damping: 14 });
  const rotate = useTransform(x, v => v * 0.35);
  const color = useTransform(x, v => (Math.abs(v) > 6 ? GOLD : CREAM));
  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      <motion.span style={{ display: 'inline-block', x, y, rotate, color }}>{ch === ' ' ? ' ' : ch}</motion.span>
    </span>
  );
}
function DemoMagnetic() {
  const mx = useMotionValue(-1e6), my = useMotionValue(-1e6);
  return (
    <section style={section}>
      <DemoHeader n={37} title="Magnetic Letters" desc="Move your mouse through the words — each letter is pushed away from the cursor, tilts and lights up beige, then springs back into place. Playful and interactive." />
      <div style={{ ...stage, display: 'grid', placeItems: 'center', cursor: 'crosshair' }}
        onMouseMove={e => { mx.set(e.clientX); my.set(e.clientY); }} onMouseLeave={() => { mx.set(-1e6); my.set(-1e6); }}>
        <div style={{ textAlign: 'center', fontFamily: serif, fontWeight: 700, fontSize: 'clamp(3rem,9vw,7.5rem)', lineHeight: 1, userSelect: 'none' }}>
          {['Move your', 'cursor here.'].map(line => <div key={line}>{[...line].map((ch, k) => <MagLetter key={k} ch={ch} mx={mx} my={my} />)}</div>)}
        </div>
      </div>
    </section>
  );
}

/* ── 38. Aurora mesh ──────────────────────────────────────────── */
const ORBS = [
  { c: 'rgba(212,164,95,0.55)', s: 520, x: ['-10%', '30%', '-5%'], y: ['10%', '40%', '10%'], d: 14 },
  { c: 'rgba(242,223,192,0.35)', s: 420, x: ['60%', '20%', '60%'], y: ['-10%', '30%', '-10%'], d: 18 },
  { c: 'rgba(140,90,40,0.5)', s: 600, x: ['40%', '70%', '40%'], y: ['50%', '10%', '50%'], d: 16 },
  { c: 'rgba(40,70,140,0.45)', s: 560, x: ['70%', '-10%', '70%'], y: ['40%', '60%', '40%'], d: 20 },
  { c: 'rgba(232,197,144,0.3)', s: 380, x: ['10%', '50%', '10%'], y: ['70%', '20%', '70%'], d: 12 },
];
function DemoAurora() {
  return (
    <section style={section}>
      <DemoHeader n={38} title="Aurora Mesh" desc="Soft beige, bronze and deep-blue light blobs drift and blend into a living gradient, like an aurora. A premium, calm background for the hero or any section." />
      <div style={{ ...stage, background: '#030812' }}>
        <div style={{ position: 'absolute', inset: 0, filter: 'blur(70px) saturate(1.2)' }}>
          {ORBS.map((o, k) => (
            <motion.div key={k} animate={{ x: o.x, y: o.y, scale: [1, 1.2, 1] }} transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', left: 0, top: 0, width: o.s, height: o.s, borderRadius: '50%', background: `radial-gradient(circle, ${o.c}, transparent 70%)`, mixBlendMode: 'screen' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', inset: '-50%', backgroundImage: GRAIN, opacity: 0.08, mixBlendMode: 'overlay', animation: 'grain-shift 0.6s steps(4) infinite' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(2.6rem,7vw,5.6rem)', color: CREAM, textAlign: 'center', lineHeight: 1 }}>Ideas in<br /><span style={{ color: GOLD, fontStyle: 'italic' }}>motion.</span></h3>
        </div>
      </div>
    </section>
  );
}

/* ── 39. Split-flap board ─────────────────────────────────────── */
const FLAP_WORDS = ['DESIGN', 'BUILD', 'AUTOMATE', 'CREATE', 'LAUNCH'];
const FLAP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const PAD = 8;
function FlapCell({ target, delay }) {
  const [ch, setCh] = useState(target);
  const [flip, setFlip] = useState(0);
  useEffect(() => {
    const timers = [];
    const steps = 6 + Math.floor(Math.random() * 6);
    for (let k = 0; k <= steps; k++) {
      timers.push(setTimeout(() => {
        setCh(k === steps ? target : FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)]);
        setFlip(f => f + 1);
      }, delay + k * 60));
    }
    return () => timers.forEach(clearTimeout);
  }, [target, delay]);
  return (
    <div style={{ position: 'relative', width: 'clamp(38px,7vw,74px)', height: 'clamp(54px,10vw,104px)', perspective: 300 }}>
      <motion.div key={flip} initial={{ rotateX: -80, opacity: 0.4 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.06 }}
        style={{ position: 'absolute', inset: 0, borderRadius: 6, background: 'linear-gradient(#141c2b 0 49.5%, #0b111c 50.5% 100%)', boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.5), 0 6px 14px rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace', fontWeight: 700, fontSize: 'clamp(1.6rem,5vw,3.4rem)', color: ch.trim() ? CREAM : 'transparent', transformOrigin: '50% 50%' }}>
        {ch.trim() || '·'}
      </motion.div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, marginTop: -1, background: '#030812' }} />
    </div>
  );
}
function DemoSplitFlap() {
  const [w, setW] = useState(0);
  useEffect(() => { const id = setInterval(() => setW(v => (v + 1) % FLAP_WORDS.length), 3200); return () => clearInterval(id); }, []);
  const word = FLAP_WORDS[w].padEnd(PAD, ' ').slice(0, PAD);
  return (
    <section style={section}>
      <DemoHeader n={39} title="Split-Flap Board" desc="An airport / train-station departure board: each tile rapidly flips through letters before clicking onto the next word. Retro, mechanical and satisfying." />
      <div style={{ ...stage, display: 'grid', placeItems: 'center' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.35em', color: GOLD, marginBottom: '1rem', textAlign: 'center' }}>NOW BOARDING</p>
          <div style={{ display: 'flex', gap: 'clamp(4px,0.8vw,8px)', padding: '1rem', borderRadius: 12, background: '#05080F', border: '1px solid rgba(212,164,95,0.2)' }}>
            {[...word].map((c, k) => <FlapCell key={k} target={c} delay={k * 70} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 40. Wormhole tunnel ──────────────────────────────────────── */
const RINGS = 28, SPACING = 140, DEPTH = RINGS * SPACING;
function Ring({ i, p }) {
  const z = useTransform(p, v => ((i * SPACING + v * DEPTH * 2.2) % DEPTH) - DEPTH + 400);
  const opacity = useTransform(z, v => Math.max(0, Math.min(1, (v + DEPTH) / (DEPTH * 0.6))) * (v > 250 ? Math.max(0, 1 - (v - 250) / 150) : 1));
  const rotate = useTransform(p, v => i * 12 + v * 220);
  return (
    <motion.div style={{ position: 'absolute', left: '50%', top: '50%', width: 520, height: 520, margin: '-260px 0 0 -260px', borderRadius: i % 3 === 0 ? '50%' : '42%', border: `${i % 4 === 0 ? 3 : 1.5}px solid ${i % 4 === 0 ? GOLD : 'rgba(212,164,95,0.45)'}`, z, opacity, rotate, boxShadow: i % 4 === 0 ? `0 0 24px rgba(212,164,95,0.35)` : 'none' }} />
  );
}
function DemoWormhole() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const textOp = useTransform(p, [0.75, 0.92], [0, 1]);
  const textScale = useTransform(p, [0.75, 0.95], [0.6, 1]);
  return (
    <section ref={ref} style={{ height: '320vh', position: 'relative', ...border }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'radial-gradient(40% 40% at 50% 50%, #0C1729, #01030A)' }}>
        <div style={{ position: 'absolute', inset: 0, perspective: 500, transformStyle: 'preserve-3d' }}>
          {Array.from({ length: RINGS }, (_, i) => <Ring key={i} i={i} p={p} />)}
        </div>
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: 160, height: 160, margin: '-80px 0 0 -80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,215,0.9), rgba(212,164,95,0.3) 40%, transparent 70%)' }} />
        <motion.div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: textOp, scale: textScale }}>
          <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(2.6rem,7vw,5.6rem)', color: CREAM, textShadow: '0 0 40px rgba(3,8,18,0.9)' }}>Into the future.</h3>
        </motion.div>
        <div style={{ position: 'absolute', top: '6vh', left: 0, right: 0 }}><DemoHeader n={40} title="Wormhole Tunnel" desc="Scroll to fly through a tunnel of glowing, spinning rings that rush past the camera — hyperspace / time-travel energy, arriving at a title." /></div>
      </div>
    </section>
  );
}

/* ── 41. Particle text ────────────────────────────────────────── */
function DemoParticleText() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, pts = [];
    const mouse = { x: -1e4, y: -1e4 };
    const build = () => {
      w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const off = document.createElement('canvas'); off.width = w; off.height = h;
      const o = off.getContext('2d');
      o.fillStyle = '#fff'; o.textAlign = 'center'; o.textBaseline = 'middle';
      o.font = `700 ${Math.min(w / 5.2, 190)}px ${serif}`;
      o.fillText('HUZAIFA', w / 2, h / 2);
      const data = o.getImageData(0, 0, w, h).data;
      const step = Math.max(4, Math.round(w / 260));
      const targets = [];
      for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) if (data[(y * w + x) * 4 + 3] > 128) targets.push([x, y]);
      pts = targets.map(([tx, ty]) => ({ x: Math.random() * w, y: Math.random() * h, tx, ty, vx: 0, vy: 0, c: Math.random() > 0.3 ? GOLD : CREAM }));
    };
    build();
    const onMove = e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = mouse.y = -1e4; };
    cv.addEventListener('mousemove', onMove); cv.addEventListener('mouseleave', onLeave); window.addEventListener('resize', build);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.vx += (p.tx - p.x) * 0.012; p.vy += (p.ty - p.y) * 0.012;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 90) { const f = (1 - d / 90) * 6; p.vx += dx / (d || 1) * f; p.vy += dy / (d || 1) * f; }
        p.vx *= 0.86; p.vy *= 0.86; p.x += p.vx; p.y += p.vy;
        ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, 2, 2);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); cv.removeEventListener('mousemove', onMove); cv.removeEventListener('mouseleave', onLeave); window.removeEventListener('resize', build); };
  }, []);
  return (
    <section style={section}>
      <DemoHeader n={41} title="Particle Text" desc="Thousands of beige particles fly in from everywhere and assemble into your name. Sweep your mouse through it and they scatter, then swarm back into place." />
      <div style={stage}><canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }} /></div>
    </section>
  );
}

/* ── 42. Text on a path ───────────────────────────────────────── */
const PATH_TEXT = 'WEB DEVELOPMENT ✦ UI/UX DESIGN ✦ AI AGENTS ✦ AI UGC & CONTENT ✦ BRANDING ✦ SHOPIFY STORES ✦ ';
function PathLine({ id, d, p, dir, color, size }) {
  const ref = useRef(null);
  const offset = useTransform(p, [0, 1], dir > 0 ? [0, -50] : [-50, 0]);
  useMotionValueEvent(offset, 'change', v => ref.current?.setAttribute('startOffset', `${v}%`));
  return (
    <>
      <path id={id} d={d} fill="none" stroke="rgba(212,164,95,0.18)" strokeWidth="1" />
      <text fontFamily={serif} fontWeight="700" fontSize={size} fill={color} letterSpacing="2">
        <textPath ref={ref} href={`#${id}`} startOffset={dir > 0 ? '0%' : '-50%'}>{PATH_TEXT.repeat(4)}</textPath>
      </text>
    </>
  );
}
function DemoTextPath() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  return (
    <section ref={ref} style={{ ...section, overflow: 'hidden' }}>
      <DemoHeader n={42} title="Text on a Path" desc="Your services flow along curving ribbons of type, sliding in opposite directions as you scroll — like text riding a wave. Great between sections." />
      <svg viewBox="0 0 1200 420" style={{ width: '110%', marginLeft: '-5%', display: 'block' }}>
        <PathLine id="tp1" d="M -100 150 C 200 30, 400 270, 650 150 S 1100 30, 1400 150" p={p} dir={1} color={GOLD} size={46} />
        <PathLine id="tp2" d="M -100 300 C 250 400, 450 180, 700 300 S 1100 400, 1400 290" p={p} dir={-1} color={CREAM} size={34} />
      </svg>
    </section>
  );
}

export default function MotionDemo() {
  const links = ['Magnetic Letters', 'Aurora Mesh', 'Split-Flap Board', 'Wormhole Tunnel', 'Particle Text', 'Text on a Path'];
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <style>{`@keyframes grain-shift { 0% { transform: translate(0,0) } 25% { transform: translate(-3%,2%) } 50% { transform: translate(2%,-3%) } 75% { transform: translate(-2%,-1%) } 100% { transform: translate(1%,3%) } }`}</style>
      <header style={{ minHeight: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Motion graphics · Round 7</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(3rem,8vw,6rem)', color: 'var(--ink)', lineHeight: 0.95, marginBottom: '1.5rem' }}>Interactive<br />motion demos.</h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)', marginBottom: '2rem' }}>Six new styles (37–42) — several react to your mouse. Scroll slowly and move your cursor over them.</p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {links.map((l, i) => <span key={l} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', padding: '0.4rem 0.9rem', borderRadius: 999, border: '1px solid rgba(212,164,95,0.35)', color: 'var(--ink-2)' }}>{i + 37}. {l}</span>)}
        </div>
      </header>
      <DemoMagnetic />
      <DemoAurora />
      <DemoSplitFlap />
      <DemoWormhole />
      <DemoParticleText />
      <DemoTextPath />
      <div style={{ height: '30vh' }} />
    </div>
  );
}
