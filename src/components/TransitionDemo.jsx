import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';

// Demo page (/transition-demo): page-to-page transitions (home → project page and back).
// Each option plays inside a mini browser; "Full screen" plays it at real size.

const GOLD = '#D4A45F';
const NAVY = '#030812';
const CREAM = '#F8F4EE';
const serif = 'var(--font-serif)';
const mono = 'ui-monospace, SFMono-Regular, Consolas, monospace';
const cine = [0.76, 0, 0.24, 1];
const full = { position: 'absolute', inset: 0, pointerEvents: 'none' };

// deterministic pseudo-random so every play looks the same
const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/* ── Mock pages ─────────────────────────────────────────────── */
function HomePage() {
  return (
    <div style={{ ...full, background: NAVY, padding: '6% 7%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(6px,1.15cqw,13px)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
        <span style={{ color: GOLD, fontWeight: 700 }}>HI</span><span>About · Work · Services · Contact</span>
      </div>
      <div style={{ marginTop: '7%', fontFamily: serif, color: GOLD, fontSize: 'clamp(6px,1.495cqw,18px)' }}>Hello, I'm</div>
      <div style={{ fontFamily: serif, fontWeight: 700, color: GOLD, fontSize: 'clamp(14px,6.325cqw,84px)', lineHeight: 0.9, letterSpacing: '-0.03em' }}>Huzaifa<br />Imran</div>
      <div style={{ marginTop: '2%', color: CREAM, fontSize: 'clamp(6px,1.15cqw,14px)', fontFamily: 'var(--font-body)' }}>Web Developer · UI/UX Designer · AI Builder</div>
      <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '3%' }}>
        {['SOLVRA AI Studio', 'UGC Portfolio', 'Shopify Store'].map((t, i) => (
          <div key={t} style={{ aspectRatio: '16/10', borderRadius: 10, background: `linear-gradient(135deg, ${['#1B2A44', '#2A2216', '#3A2C18'][i]}, #0A1324)`, border: i === 2 ? `1px solid ${GOLD}` : '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'flex-end', padding: '4%', color: CREAM, fontSize: 'clamp(6px,1.035cqw,12px)', fontFamily: 'var(--font-body)' }}>{t}</div>
        ))}
      </div>
    </div>
  );
}
function ProjectPage() {
  return (
    <div style={{ ...full, background: '#06101F', padding: '6% 7%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(6px,1.15cqw,13px)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>← Back</div>
      <div style={{ marginTop: '5%', color: GOLD, fontSize: 'clamp(6px,1.035cqw,12px)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Client Work · E-commerce</div>
      <div style={{ fontFamily: serif, fontWeight: 700, color: CREAM, fontSize: 'clamp(13px,5.75cqw,76px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>Shopify Store</div>
      <div style={{ marginTop: '4%', flex: 1, borderRadius: 14, background: `radial-gradient(60% 80% at 70% 40%, ${GOLD}, #7A5A2E 45%, #0A1324 100%)`, border: '1px solid rgba(212,164,95,0.3)' }} />
    </div>
  );
}

/* ── Transitions ────────────────────────────────────────────────
   Each: D (total seconds), swap (seconds: when the page changes underneath),
   Overlay (optional, drawn on top), pageOut / pageIn (optional page motion). */
const T = [];

// 1 Curtain Rise
T.push({ n: 1, name: 'Curtain Rise', desc: 'A beige curtain rises over the page and keeps travelling up to reveal the next one.', D: 1.4, swap: 0.7,
  Overlay: ({ D }) => (
    <motion.div style={{ ...full, background: GOLD }} initial={{ y: '100%' }} animate={{ y: ['100%', '0%', '0%', '-100%'] }} transition={{ duration: D, times: [0, 0.42, 0.55, 1], ease: cine }} />
  ) });

// 2 Letterbox Cut
T.push({ n: 2, name: 'Letterbox Cut', desc: 'Cinema bars close to black, a gold anamorphic line flashes, the bars open on the new page. Matches your opener.', D: 1.6, swap: 0.8,
  Overlay: ({ D }) => (<>
    <motion.div style={{ ...full, bottom: '50%', background: NAVY, transformOrigin: 'top' }} initial={{ scaleY: 0 }} animate={{ scaleY: [0, 1, 1, 0] }} transition={{ duration: D, times: [0, 0.4, 0.6, 1], ease: cine }} />
    <motion.div style={{ ...full, top: '50%', background: NAVY, transformOrigin: 'bottom' }} initial={{ scaleY: 0 }} animate={{ scaleY: [0, 1, 1, 0] }} transition={{ duration: D, times: [0, 0.4, 0.6, 1], ease: cine }} />
    <motion.div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, #fff, ${GOLD}, transparent)`, boxShadow: `0 0 18px ${GOLD}` }} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 0, 1, 1], opacity: [0, 1, 1, 0] }} transition={{ duration: D, times: [0, 0.38, 0.52, 0.64] }} />
  </>) });

// 3 Column Cascade
T.push({ n: 3, name: 'Column Cascade', desc: 'Seven navy columns drop in one after another (gold edges), then fall away to reveal the page.', D: 1.6, swap: 0.82,
  Overlay: () => (
    <div style={{ ...full, display: 'flex' }}>
      {Array.from({ length: 7 }, (_, i) => (
        <motion.div key={i} style={{ flex: 1, height: '100%', background: NAVY, borderBottom: `2px solid ${GOLD}`, borderTop: `2px solid ${GOLD}` }} initial={{ y: '-102%' }} animate={{ y: ['-102%', '0%', '0%', '102%'] }} transition={{ duration: 1.2, delay: i * 0.05, times: [0, 0.4, 0.6, 1], ease: cine }} />
      ))}
    </div>
  ) });

// 4 Iris
T.push({ n: 4, name: 'Iris In / Out', desc: 'A navy circle grows from the centre to swallow the page, then shrinks away from the edges like an old-film iris.', D: 1.5, swap: 0.72,
  Overlay: ({ D }) => (
    <motion.div style={{ ...full, background: NAVY }} initial={{ clipPath: 'circle(0% at 50% 50%)' }} animate={{ clipPath: ['circle(0% at 50% 50%)', 'circle(75% at 50% 50%)', 'circle(75% at 50% 50%)', 'circle(0% at 50% 50%)'] }} transition={{ duration: D, times: [0, 0.45, 0.52, 1], ease: cine }}>
      <motion.div style={{ ...full, border: `2px solid ${GOLD}`, borderRadius: '50%', margin: 'auto', width: 40, height: 40 }} animate={{ opacity: [0, 0, 1, 0] }} transition={{ duration: D, times: [0, 0.42, 0.5, 0.6] }} />
    </motion.div>
  ) });

// 5 Title Card
T.push({ n: 5, name: 'Title Card', desc: 'Fades to black like a film cut, the project name tightens into focus, then fades up on the page.', D: 2.2, swap: 1.1,
  Overlay: ({ D, toB }) => (
    <motion.div style={{ ...full, background: NAVY, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: D, times: [0, 0.2, 0.8, 1] }}>
      <motion.div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(6px,1.035cqw,12px)', letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', marginBottom: '1em' }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: D, times: [0, 0.2, 0.35, 0.75, 0.85] }}>{toB ? 'Project 03' : 'Back to'}</motion.div>
      <motion.div style={{ fontFamily: serif, fontWeight: 700, color: CREAM, fontSize: 'clamp(10px,4.6cqw,60px)', whiteSpace: 'nowrap' }} initial={{ opacity: 0, letterSpacing: '0.6em', filter: 'blur(10px)' }} animate={{ opacity: [0, 1, 1, 0], letterSpacing: ['0.6em', '0.08em', '0.06em', '0.06em'], filter: ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'] }} transition={{ duration: D, times: [0.1, 0.45, 0.75, 0.85], ease: 'easeOut' }}>{toB ? 'SHOPIFY STORE' : 'HUZAIFA IMRAN'}</motion.div>
    </motion.div>
  ) });

// 6 Glitch Cut
T.push({ n: 6, name: 'Glitch Cut', desc: 'Digital: the page tears into RGB-split slices that jitter sideways, then snaps to the new page.', D: 0.9, swap: 0.45,
  pageOut: { animate: { x: [0, -8, 6, -4, 0], filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(-60deg)', 'hue-rotate(0deg)', 'hue-rotate(0deg)'] }, transition: { duration: 0.45 } },
  Overlay: ({ D }) => (
    <div style={full}>
      {Array.from({ length: 9 }, (_, i) => {
        const dx = (rnd(i) - 0.5) * 60;
        return (
          <motion.div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 11.11}%`, height: `${4 + rnd(i + 9) * 9}%`, background: i % 3 === 0 ? 'rgba(255,40,80,0.55)' : i % 3 === 1 ? 'rgba(40,220,255,0.5)' : GOLD, mixBlendMode: 'screen' }}
            initial={{ opacity: 0, x: 0 }} animate={{ opacity: [0, 1, 0, 1, 0.8, 0], x: [0, dx, -dx * 0.6, dx * 0.3, -dx, 0] }} transition={{ duration: D, delay: rnd(i + 3) * 0.08, times: [0, 0.2, 0.35, 0.5, 0.7, 1], ease: 'linear' }} />
        );
      })}
      <motion.div style={{ ...full, background: NAVY }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 0] }} transition={{ duration: D, times: [0, 0.4, 0.5, 0.62] }} />
    </div>
  ) });

// 7 Pixel Dissolve
T.push({ n: 7, name: 'Pixel Dissolve', desc: 'Digital: the page breaks into a grid of navy pixels that switch on at random, then switch off on the new page.', D: 1.7, swap: 0.82,
  Overlay: () => (
    <div style={{ ...full, display: 'grid', gridTemplateColumns: 'repeat(14,1fr)', gridTemplateRows: 'repeat(8,1fr)' }}>
      {Array.from({ length: 14 * 8 }, (_, i) => (
        <motion.div key={i} style={{ background: rnd(i) > 0.93 ? GOLD : NAVY }} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.25, delay: rnd(i + 50) * 0.4, times: [0, 0.3, 0.62, 1], ease: 'steps(1)' }} />
      ))}
    </div>
  ) });

// 8 Diagonal Slash
T.push({ n: 8, name: 'Diagonal Slash', desc: 'A slanted beige blade leads a navy panel across the screen in one fast diagonal swipe.', D: 1.3, swap: 0.62,
  Overlay: ({ D }) => (
    <motion.div style={{ position: 'absolute', top: '-10%', bottom: '-10%', left: '-30%', width: '160%', display: 'flex', skewX: -18 }} initial={{ x: '-110%' }} animate={{ x: ['-110%', '0%', '0%', '110%'] }} transition={{ duration: D, times: [0, 0.44, 0.52, 1], ease: cine }}>
      <div style={{ width: '6%', background: GOLD }} />
      <div style={{ flex: 1, background: NAVY }} />
      <div style={{ width: '6%', background: GOLD }} />
    </motion.div>
  ) });

// 9 Zoom Through
T.push({ n: 9, name: 'Zoom Through', desc: 'The camera pushes into the page (scale up + blur), punching through to the new page settling in.', D: 1.2, swap: 0.5,
  pageOut: { animate: { scale: 1.6, opacity: 0, filter: 'blur(12px)' }, transition: { duration: 0.5, ease: [0.55, 0, 1, 0.45] } },
  pageIn: { initial: { scale: 0.82, opacity: 0, filter: 'blur(10px)' }, animate: { scale: 1, opacity: 1, filter: 'blur(0px)' }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } });

// 10 Card Lift
T.push({ n: 10, name: 'Card Lift', desc: 'The page shrinks back into a rounded card, and the new page slides up over it as a card that settles full-screen.', D: 1.3, swap: 0.45,
  pageOut: { animate: { scale: 0.86, y: -20, borderRadius: 24, opacity: 0.4 }, transition: { duration: 0.45, ease: cine } },
  pageIn: { initial: { y: '100%', scale: 0.92, borderRadius: 28 }, animate: { y: '0%', scale: 1, borderRadius: 0 }, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } } });

// 11 Light Leak
T.push({ n: 11, name: 'Light Leak Burn', desc: 'A warm film light-leak blooms across the frame, burns out to cream, and fades into the new page.', D: 1.6, swap: 0.75,
  Overlay: ({ D }) => (<>
    <motion.div style={{ ...full, inset: '-30%', background: 'radial-gradient(40% 50% at 35% 50%, rgba(255,190,110,0.95), rgba(212,120,60,0.55) 40%, transparent 70%)', filter: 'blur(20px)' }} initial={{ opacity: 0, x: '-20%', scale: 0.6 }} animate={{ opacity: [0, 1, 1, 0], x: ['-20%', '0%', '10%', '25%'], scale: [0.6, 1.4, 1.6, 1.8] }} transition={{ duration: D, times: [0, 0.4, 0.55, 1] }} />
    <motion.div style={{ ...full, background: '#FFF3DE' }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 0] }} transition={{ duration: D, times: [0, 0.3, 0.47, 0.8] }} />
  </>) });

// 12 Split Doors
T.push({ n: 12, name: 'Split Doors', desc: 'Two navy doors slide shut with a glowing gold seam, then part to open on the new page.', D: 1.6, swap: 0.78,
  Overlay: ({ D }) => (<>
    <motion.div style={{ ...full, right: '50%', background: NAVY, borderRight: `1px solid ${GOLD}` }} initial={{ x: '-100%' }} animate={{ x: ['-100%', '0%', '0%', '-100%'] }} transition={{ duration: D, times: [0, 0.42, 0.58, 1], ease: cine }} />
    <motion.div style={{ ...full, left: '50%', background: NAVY, borderLeft: `1px solid ${GOLD}` }} initial={{ x: '100%' }} animate={{ x: ['100%', '0%', '0%', '100%'] }} transition={{ duration: D, times: [0, 0.42, 0.58, 1], ease: cine }} />
    <motion.div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, marginLeft: -1, background: GOLD, boxShadow: `0 0 20px 4px ${GOLD}` }} initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: [0, 0, 1, 0], scaleY: [0, 0, 1, 1] }} transition={{ duration: D, times: [0, 0.4, 0.48, 0.6] }} />
  </>) });

// 13 Scan Line
T.push({ n: 13, name: 'HUD Scan', desc: 'Digital: a glowing scan line sweeps down laying a navy screen with a loading readout, then sweeps again to reveal.', D: 1.8, swap: 0.88,
  Overlay: ({ D, toB }) => (<>
    <motion.div style={{ ...full, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center' }} initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)', 'inset(0% 0 0 0)', 'inset(100% 0 0 0)'] }} transition={{ duration: D, times: [0, 0.42, 0.56, 1], ease: 'easeInOut' }}>
      <div style={{ fontFamily: mono, fontSize: 'clamp(6px,1.15cqw,14px)', color: GOLD, letterSpacing: '0.2em', textAlign: 'center', lineHeight: 2 }}>
        <div>{toB ? 'LOADING › PROJECT_03' : 'LOADING › HOME'}</div>
        <div style={{ color: 'rgba(248,244,238,0.5)' }}>████████████░░ 86%</div>
      </div>
    </motion.div>
    <motion.div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: GOLD, boxShadow: `0 0 16px 3px ${GOLD}` }} initial={{ top: '0%' }} animate={{ top: ['0%', '100%', '0%', '0%', '100%'], opacity: [1, 1, 0, 1, 1] }} transition={{ duration: D, times: [0, 0.42, 0.421, 0.56, 1], ease: 'easeInOut' }} />
  </>) });

// 14 Counter Loader
function Counter({ D }) {
  const v = useMotionValue(0);
  const txt = useTransform(v, (x) => String(Math.round(x)).padStart(3, '0'));
  useEffect(() => { const c = animate(v, 100, { duration: D * 0.45, delay: D * 0.2, ease: 'easeInOut' }); return () => c.stop(); }, [D, v]);
  return <motion.span>{txt}</motion.span>;
}
T.push({ n: 14, name: 'Counter Loader', desc: 'A navy panel slides up with a big 000→100 counter, then lifts away to show the page.', D: 2.0, swap: 1.0,
  Overlay: ({ D }) => (
    <motion.div style={{ ...full, background: NAVY, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '5%' }} initial={{ y: '100%' }} animate={{ y: ['100%', '0%', '0%', '-100%'] }} transition={{ duration: D, times: [0, 0.22, 0.75, 1], ease: cine }}>
      <div style={{ fontFamily: serif, fontWeight: 700, color: GOLD, fontSize: 'clamp(20px,11.5cqw,160px)', lineHeight: 0.8 }}><Counter D={D} /></div>
    </motion.div>
  ) });

// 15 Liquid Rise
T.push({ n: 15, name: 'Liquid Rise', desc: 'A beige wave with curved edges floods up the screen like liquid and drains off the top.', D: 1.6, swap: 0.78,
  Overlay: ({ D }) => (
    <motion.div style={{ position: 'absolute', left: '-15%', right: '-15%', top: '-25%', height: '150%', background: GOLD, borderRadius: '50% / 16%' }} initial={{ y: '100%' }} animate={{ y: ['100%', '0%', '0%', '-100%'] }} transition={{ duration: D, times: [0, 0.45, 0.52, 1], ease: cine }} />
  ) });

// 16 Blur Dissolve
T.push({ n: 16, name: 'Blur Dissolve', desc: 'Soft and minimal: the page melts into blur and the new one comes into focus.', D: 1.2, swap: 0.55,
  pageOut: { animate: { opacity: 0, filter: 'blur(16px)', scale: 1.04 }, transition: { duration: 0.55, ease: 'easeIn' } },
  pageIn: { initial: { opacity: 0, filter: 'blur(16px)', scale: 0.98 }, animate: { opacity: 1, filter: 'blur(0px)', scale: 1 }, transition: { duration: 0.65, ease: 'easeOut' } } });

/* ── Stage ─────────────────────────────────────────────────── */
function Stage({ t, ctrlRef }) {
  const [page, setPage] = useState('A');
  const [phase, setPhase] = useState('idle'); // idle | out | in
  const [run, setRun] = useState(0);
  const [fs, setFs] = useState(false);
  const timers = useRef([]);
  const toB = page === 'A';

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const busy = useRef(false);
  const play = (fullScreen = false) => {
    if (busy.current) return;
    busy.current = true;
    const lead = fullScreen ? 450 : 0; // full screen: show the page for a beat first
    const at = (ms, fn) => timers.current.push(setTimeout(fn, lead + ms));
    if (fullScreen) setFs(true);
    at(0, () => { setRun((r) => r + 1); setPhase('out'); });
    at(t.swap * 1000, () => { setPage((p) => (p === 'A' ? 'B' : 'A')); setPhase('in'); });
    at(t.D * 1000 + 150, () => { setPhase('idle'); busy.current = false; });
    if (fullScreen) at(t.D * 1000 + 900, () => setFs(false));
  };
  useEffect(() => { if (ctrlRef) ctrlRef.current = play; });

  const pageMotion = phase === 'out' && t.pageOut
    ? { animate: t.pageOut.animate, transition: t.pageOut.transition }
    : phase === 'in' && t.pageIn
      ? { initial: t.pageIn.initial, animate: t.pageIn.animate, transition: t.pageIn.transition }
      : { animate: { x: 0, scale: 1, y: 0, opacity: 1, borderRadius: 0, filter: 'blur(0px) hue-rotate(0deg)' }, transition: { duration: 0 } };

  const Overlay = t.Overlay;
  return (
    <div onClick={() => play(false)} style={fs
      ? { position: 'fixed', inset: 0, containerType: 'size', zIndex: 99000, overflow: 'hidden', background: '#000', cursor: 'pointer' }
      : { position: 'relative', containerType: 'size', aspectRatio: '16 / 10', borderRadius: 14, overflow: 'hidden', background: '#000', border: '1px solid rgba(212,164,95,0.18)', cursor: 'pointer' }}>
      <motion.div key={page} style={{ ...full, overflow: 'hidden' }} {...pageMotion}>
        {page === 'A' ? <HomePage /> : <ProjectPage />}
      </motion.div>
      {Overlay && phase !== 'idle' && <div key={run} style={{ ...full, overflow: 'hidden' }}><Overlay D={t.D} toB={toB !== (phase === 'in')} /></div>}
    </div>
  );
}

function Option({ t }) {
  const [k, setK] = useState(0); // remount to reset to the home page
  const ctrlRef = useRef(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <Stage key={k} t={t} ctrlRef={ctrlRef} />
      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.16em', color: GOLD, textTransform: 'uppercase' }}>Option {t.n}</div>
        <div style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.45rem', color: 'var(--ink)', lineHeight: 1.1 }}>{t.name}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.55, marginTop: 4 }}>{t.desc}</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => ctrlRef.current?.(true)} style={btn(true)}>▶ Full screen</button>
        <button onClick={() => setK((x) => x + 1)} style={btn(false)}>Reset</button>
      </div>
    </div>
  );
}

const btn = (primary) => ({
  fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em',
  padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer',
  background: primary ? GOLD : 'transparent', color: primary ? NAVY : 'var(--ink)',
  border: primary ? 'none' : '1px solid var(--border)',
});

export default function TransitionDemo() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '7rem var(--gutter) 8rem' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.7rem' }}>Page transitions</p>
        <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4rem)', color: 'var(--ink)', lineHeight: 1 }}>Switching pages</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--ink-2)', marginTop: '0.8rem' }}>Click any preview to play it (home → project page, click again to go back). Use “Full screen” to see it at real size.</p>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))', gap: '3rem 2rem' }}>
        {T.map((t) => <Option key={t.n} t={t} />)}
      </div>
    </div>
  );
}
