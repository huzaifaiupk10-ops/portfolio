import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';

// Demo page (/motion-demo), round 6: motion-design styles (loops, data, diagrams, code).

const GOLD = '#D4A45F';
const CREAM = '#F8F4EE';
const ease = [0.16, 1, 0.3, 1];
const serif = 'Cormorant Garamond, Georgia, serif';

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
const stage = { position: 'relative', maxWidth: 1200, minHeight: 'min(520px, 70vh)', margin: '0 auto', borderRadius: 18, overflow: 'hidden', background: 'radial-gradient(70% 70% at 50% 50%, #0C1729, #030812)', border: '1px solid rgba(212,164,95,0.15)' };

/* ── 31. Shape morph loop ─────────────────────────────────────── */
const PTS = 72;
function samplePolygon(verts) {
  const segs = verts.map((v, k) => { const w = verts[(k + 1) % verts.length]; return { a: v, b: w, len: Math.hypot(w[0] - v[0], w[1] - v[1]) }; });
  const total = segs.reduce((s, g) => s + g.len, 0);
  const out = [];
  for (let i = 0; i < PTS; i++) {
    let d = (i / PTS) * total, k = 0;
    while (d > segs[k].len) { d -= segs[k].len; k++; }
    const t = d / segs[k].len;
    out.push([segs[k].a[0] + (segs[k].b[0] - segs[k].a[0]) * t, segs[k].a[1] + (segs[k].b[1] - segs[k].a[1]) * t]);
  }
  return out;
}
const poly = (k, r, rot = -Math.PI / 2, inner = null) => Array.from({ length: inner ? k * 2 : k }, (_, i) => { const a = rot + (Math.PI * 2 * i) / (inner ? k * 2 : k); const rr = inner && i % 2 ? inner : r; return [200 + Math.cos(a) * rr, 200 + Math.sin(a) * rr]; });
const toPath = pts => 'M ' + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ') + ' Z';
const circle = Array.from({ length: PTS }, (_, i) => { const a = -Math.PI / 2 + (Math.PI * 2 * i) / PTS; return [200 + Math.cos(a) * 140, 200 + Math.sin(a) * 140]; });
const SHAPES = [circle, samplePolygon(poly(4, 170, -Math.PI / 4)), samplePolygon(poly(3, 175)), samplePolygon(poly(5, 170, -Math.PI / 2, 72)), samplePolygon(poly(6, 155)), circle].map(toPath);
function DemoMorph() {
  return (
    <section style={section}>
      <DemoHeader n={31} title="Shape Morph Loop" desc="A classic motion-design loop: one shape flows smoothly from circle to square to triangle to star to hexagon, spinning and shifting tone, with orbiting satellites." />
      <div style={{ ...stage, display: 'grid', placeItems: 'center' }}>
        <svg viewBox="0 0 400 400" style={{ width: 'min(420px, 80vw)', height: 'auto', overflow: 'visible' }}>
          <g style={{ animation: 'svg-spin 20s linear infinite', transformBox: 'view-box', transformOrigin: '200px 200px' }}>
            <motion.path d={SHAPES[0]} animate={{ d: SHAPES, fill: [GOLD, CREAM, '#B8894A', GOLD, '#E8C590', GOLD] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.path d={SHAPES[2]} fill="none" stroke={CREAM} strokeWidth="1.2" opacity="0.5" animate={{ d: [...SHAPES].reverse() }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} transform="translate(200 200) scale(1.25) translate(-200 -200)" />
          </g>
          {[0, 1, 2].map(k => (
            <g key={k} style={{ animation: `svg-spin ${6 + k * 3}s linear infinite ${k % 2 ? 'reverse' : ''}`, transformBox: 'view-box', transformOrigin: '200px 200px' }}>
              <circle cx={200 + 190 + k * 10} cy="200" r={6 - k} fill={k === 1 ? CREAM : GOLD} />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

/* ── 32. Wave typography ─────────────────────────────────────── */
function DemoWaveType() {
  const words = ['MOTION', 'DESIGN'];
  return (
    <section style={section}>
      <DemoHeader n={32} title="Wave Typography" desc="Letters ride a continuous wave — rising, stretching and shifting from cream to beige in sequence. Eye-catching for a section title or a big statement." />
      <div style={{ ...stage, display: 'grid', placeItems: 'center', padding: '3rem 1rem' }}>
        <div style={{ textAlign: 'center' }}>
          {words.map((w, wi) => (
            <div key={w} style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(3.4rem,11vw,9rem)', lineHeight: 1, whiteSpace: 'nowrap' }}>
              {[...w].map((ch, i) => {
                const k = wi * 6 + i;
                return (
                  <motion.span key={i} style={{ display: 'inline-block', transformOrigin: '50% 100%' }}
                    animate={{ y: [0, -28, 0, 0], scaleY: [1, 1.12, 0.94, 1], color: [CREAM, GOLD, CREAM, CREAM] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: k * 0.09, ease: 'easeInOut', times: [0, 0.3, 0.55, 1] }}>{ch}</motion.span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 33. Animated stats ───────────────────────────────────────── */
const STATS = [{ value: 20, suffix: '+', label: 'Projects Built', pct: 0.8 }, { value: 12, suffix: '', label: 'Certifications', pct: 0.6 }, { value: 10, suffix: '+', label: 'AI Solutions', pct: 0.5 }, { value: 100, suffix: '%', label: 'Responsive', pct: 1 }];
function Counter({ value, suffix, run }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, v => `${Math.round(v)}${suffix}`);
  useEffect(() => { if (!run) return; mv.set(0); const c = animate(mv, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] }); return () => c.stop(); }, [run, value, mv]);
  return <motion.span>{text}</motion.span>;
}
function DemoStats() {
  const [run, setRun] = useState(0);
  const bars = [0.35, 0.55, 0.45, 0.7, 0.62, 0.85, 1];
  return (
    <section style={section}>
      <DemoHeader n={33} title="Animated Stats" desc="Your numbers come alive: counters tick up, progress rings draw themselves and a growth chart rises — using the stats already in your portfolio. Replays on view." />
      <motion.div style={{ ...stage, padding: '3rem 2rem', display: 'grid', alignContent: 'center', gap: '3rem' }} onViewportEnter={() => setRun(r => r + 1)} viewport={{ amount: 0.5 }}>
        <div key={run} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.5rem' }}>
          {STATS.map((s, k) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              <svg width="92" height="92" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(212,164,95,0.15)" strokeWidth="6" />
                <motion.circle cx="50" cy="50" r="42" fill="none" stroke={GOLD} strokeWidth="6" strokeLinecap="round" transform="rotate(-90 50 50)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: s.pct }} transition={{ delay: k * 0.15, duration: 1.6, ease }} />
              </svg>
              <div>
                <div style={{ fontFamily: serif, fontWeight: 700, fontSize: '2.6rem', color: CREAM, lineHeight: 1 }}><Counter value={s.value} suffix={s.suffix} run={run} /></div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-2)', marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div key={'b' + run} style={{ display: 'flex', alignItems: 'flex-end', gap: '0.8rem', height: 130, maxWidth: 560, width: '100%', margin: '0 auto', borderBottom: '1px solid rgba(212,164,95,0.3)' }}>
          {bars.map((h, k) => (
            <motion.div key={k} initial={{ height: 0 }} animate={{ height: `${h * 100}%` }} transition={{ delay: 0.4 + k * 0.1, duration: 1, ease }}
              style={{ flex: 1, borderRadius: '6px 6px 0 0', background: k === bars.length - 1 ? GOLD : 'rgba(212,164,95,0.35)' }} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ── 34. Isometric assembly ───────────────────────────────────── */
const ISO = 34;
const isoPt = (x, y, z) => [(x - y) * ISO * 0.866 + 300, (x + y) * ISO * 0.5 - z * ISO + 230];
const LAYOUT = [[0, 0, 3], [1, 0, 2], [2, 0, 1], [0, 1, 2], [1, 1, 4], [2, 1, 2], [0, 2, 1], [1, 2, 2], [2, 2, 3], [3, 1, 1], [1, 3, 1], [3, 3, 2]];
const CUBES = LAYOUT.flatMap(([x, y, h]) => Array.from({ length: h }, (_, z) => ({ x, y, z }))).sort((a, b) => (a.x + a.y) - (b.x + b.y) || a.z - b.z);
function Cube({ c, i, p }) {
  const s = (i / CUBES.length) * 0.7;
  const y = useTransform(p, [s, s + 0.15], [-420, 0]);
  const opacity = useTransform(p, [s, s + 0.05], [0, 1]);
  const P = (dx, dy, dz) => isoPt(c.x + dx, c.y + dy, c.z + dz).join(',');
  const top = [P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)].join(' ');
  const left = [P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1)].join(' ');
  const right = [P(1, 0, 0), P(1, 1, 0), P(1, 1, 1), P(1, 0, 1)].join(' ');
  return (
    <motion.g style={{ y, opacity }}>
      <polygon points={top} fill="#E8C590" stroke="#030812" strokeWidth="0.6" />
      <polygon points={left} fill="#B8894A" stroke="#030812" strokeWidth="0.6" />
      <polygon points={right} fill="#8C6A3A" stroke="#030812" strokeWidth="0.6" />
    </motion.g>
  );
}
function DemoIso() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });
  const label = useTransform(p, [0.75, 0.9], [0, 1]);
  return (
    <section ref={ref} style={{ height: '300vh', position: 'relative', ...border }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <DemoHeader n={34} title="Isometric Assembly" desc="Beige 3D blocks drop in one by one and stack into an isometric structure as you scroll — a visual metaphor for building products piece by piece." />
        <svg viewBox="0 0 600 420" style={{ width: 'min(640px, 92vw)', margin: '0 auto', display: 'block', overflow: 'visible' }}>
          {CUBES.map((c, i) => <Cube key={i} c={c} i={i} p={p} />)}
        </svg>
        <motion.p style={{ opacity: label, textAlign: 'center', fontFamily: serif, fontSize: '1.6rem', color: CREAM, marginTop: '1rem' }}>Built <span style={{ color: GOLD, fontStyle: 'italic' }}>block by block.</span></motion.p>
      </div>
    </section>
  );
}

/* ── 35. Flow diagram ─────────────────────────────────────────── */
const STEPS = [{ t: 'Discover', d: 'Goals & research' }, { t: 'Design', d: 'UI/UX & brand' }, { t: 'Build', d: 'Code & AI' }, { t: 'Launch', d: 'Ship & grow' }];
function DemoFlow() {
  const xs = [110, 370, 630, 890];
  const paths = [0, 1, 2].map(k => `M ${xs[k] + 46} 200 C ${xs[k] + 120} ${k % 2 ? 260 : 140}, ${xs[k + 1] - 120} ${k % 2 ? 260 : 140}, ${xs[k + 1] - 46} 200`);
  return (
    <section style={section}>
      <DemoHeader n={35} title="Flow Diagram" desc="Your process as a living diagram: nodes pop in, connectors draw between them and glowing pulses travel along the lines on a loop. Perfect for the Process section." />
      <motion.div style={{ ...stage, display: 'grid', placeItems: 'center' }} initial="hide" whileInView="show" viewport={{ once: false, amount: 0.5 }}>
        <svg viewBox="0 0 1000 400" style={{ width: '100%', maxWidth: 1100 }}>
          {paths.map((d, k) => (
            <g key={k}>
              <motion.path d={d} fill="none" stroke="rgba(212,164,95,0.35)" strokeWidth="2" variants={{ hide: { pathLength: 0 }, show: { pathLength: 1, transition: { delay: 0.4 + k * 0.35, duration: 0.7 } } }} />
              <path d={d} fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="4 12" style={{ animation: 'dash-flow 1s linear infinite' }} opacity="0.8" />
              <circle r="6" fill={CREAM} style={{ filter: `drop-shadow(0 0 6px ${GOLD})` }}>
                <animateMotion dur="2.2s" begin={`${k * 0.7}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          ))}
          {STEPS.map((s, k) => (
            <motion.g key={s.t} variants={{ hide: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { delay: k * 0.35, type: 'spring', stiffness: 220, damping: 14 } } }} style={{ originX: `${xs[k]}px`, originY: '200px' }}>
              <circle cx={xs[k]} cy="200" r="58" fill="none" stroke="rgba(212,164,95,0.25)" strokeWidth="1" style={{ animation: `node-pulse 2.4s ${k * 0.3}s infinite`, transformOrigin: `${xs[k]}px 200px` }} />
              <circle cx={xs[k]} cy="200" r="46" fill="#0C1729" stroke={GOLD} strokeWidth="2" />
              <text x={xs[k]} y="208" textAnchor="middle" fontFamily={serif} fontWeight="700" fontSize="24" fill={GOLD}>{String(k + 1).padStart(2, '0')}</text>
              <text x={xs[k]} y="290" textAnchor="middle" fontFamily={serif} fontWeight="700" fontSize="28" fill={CREAM}>{s.t}</text>
              <text x={xs[k]} y="318" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="14" fill="rgba(248,244,238,0.55)">{s.d}</text>
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </section>
  );
}

/* ── 36. Code terminal ────────────────────────────────────────── */
const SCRIPT = [
  { t: '$ npx create-site --client "your-brand"', c: CREAM },
  { t: '✔ Design system loaded  (navy · beige · white)', c: GOLD },
  { t: '✔ UI components generated  (24 files)', c: GOLD },
  { t: '$ connect --ai-agent "lead-assistant"', c: CREAM },
  { t: '✔ AI agent online  ·  replies in 0.8s', c: GOLD },
  { t: '$ deploy --prod', c: CREAM },
  { t: '▸ Building... optimising images... done', c: 'rgba(248,244,238,0.6)' },
  { t: '✔ Live. Ready for your project →', c: GOLD },
];
function Terminal() {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (line >= SCRIPT.length) return;
    const full = SCRIPT[line].t.length;
    const typing = SCRIPT[line].t.startsWith('$');
    const id = setTimeout(() => {
      if (chars < full) setChars(typing ? chars + 1 : full);
      else { setLine(line + 1); setChars(0); }
    }, chars < full ? (typing ? 38 : 260) : 380);
    return () => clearTimeout(id);
  }, [line, chars]);
  return (
    <div style={{ fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace', fontSize: 'clamp(0.78rem,1.3vw,0.98rem)', lineHeight: 1.9, padding: '1.4rem 1.6rem' }}>
      {SCRIPT.slice(0, line + 1).map((l, k) => (
        <div key={k} style={{ color: l.c, whiteSpace: 'pre-wrap' }}>
          {k < line ? l.t : l.t.slice(0, chars)}
          {k === line && <span style={{ display: 'inline-block', width: '0.6em', height: '1.1em', verticalAlign: 'text-bottom', background: GOLD, marginLeft: 2, animation: 'caret 1s steps(2) infinite' }} />}
        </div>
      ))}
    </div>
  );
}
function DemoTerminal() {
  const [run, setRun] = useState(0);
  return (
    <section style={section}>
      <DemoHeader n={36} title="Code Terminal" desc="A terminal window types out commands and results in real time — building, connecting an AI agent and deploying. Shows the developer and AI-builder side of you." />
      <motion.div style={{ ...stage, maxWidth: 860, minHeight: 420, background: '#05080F', textAlign: 'left' }} onViewportEnter={() => setRun(r => r + 1)} viewport={{ amount: 0.5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.8rem 1rem', borderBottom: '1px solid rgba(212,164,95,0.15)', background: '#0A0F1A' }}>
          {['#E5484D', '#F5A524', '#30A46C'].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
          <span style={{ marginLeft: 12, fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(248,244,238,0.5)' }}>huzaifa@studio — zsh</span>
        </div>
        <Terminal key={run} />
      </motion.div>
    </section>
  );
}

export default function MotionDemo() {
  const links = ['Shape Morph Loop', 'Wave Typography', 'Animated Stats', 'Isometric Assembly', 'Flow Diagram', 'Code Terminal'];
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <style>{`
        @keyframes dash-flow { to { stroke-dashoffset: -32 } }
        @keyframes svg-spin { to { transform: rotate(360deg) } }
        @keyframes node-pulse { 0% { transform: scale(1); opacity: 0.8 } 100% { transform: scale(1.5); opacity: 0 } }
        @keyframes caret { 0% { opacity: 1 } 100% { opacity: 0 } }
      `}</style>
      <header style={{ minHeight: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Motion graphics · Round 6</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(3rem,8vw,6rem)', color: 'var(--ink)', lineHeight: 0.95, marginBottom: '1.5rem' }}>Motion design<br />demos.</h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)', marginBottom: '2rem' }}>Six motion-design styles (31–36) — loops, data, diagrams and code. Scroll slowly.</p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {links.map((l, i) => <span key={l} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', padding: '0.4rem 0.9rem', borderRadius: 999, border: '1px solid rgba(212,164,95,0.35)', color: 'var(--ink-2)' }}>{i + 31}. {l}</span>)}
        </div>
      </header>
      <DemoMorph />
      <DemoWaveType />
      <DemoStats />
      <DemoIso />
      <DemoFlow />
      <DemoTerminal />
      <div style={{ height: '30vh' }} />
    </div>
  );
}
