import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { process } from '../data/portfolioData';
import { useBreakpoint } from '../hooks/useBreakpoint';
import DnaBackground from './DnaBackground';
import { rafWhenVisible } from '../lib/rafWhenVisible';

const ease = [0.16, 1, 0.3, 1];
const clamp = (n, a = 0, b = 1) => (n < a ? a : n > b ? b : n);
const lerp = (a, b, t) => a + (b - a) * t;

const N = process.length;
const ANGLE = 58;    // deg between steps around the axis
const YSTEP = 168;   // px of vertical rise per step
const RADIUS = 360;

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { isMobile, isTablet } = useBreakpoint();
  const isTouch = isMobile || isTablet;

  const sectionRef = useRef(null);
  const liftRef = useRef(null);
  const spinRef = useRef(null);
  const cardRefs = useRef([]);
  const barRef = useRef(null);
  const hintRef = useRef(null);
  const nowRef = useRef(null);

  useEffect(() => {
    if (isTouch) return;
    let p = 0, tp = 0, lastF = -1, lastP = -1;
    const loop = () => {
      const el = sectionRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        tp = clamp(-r.top / (r.height - window.innerHeight));
        if (barRef.current) barRef.current.style.width = (tp * 100) + '%';
        if (hintRef.current) hintRef.current.style.opacity = String(clamp(1 - tp * 8));
      }
      p = lerp(p, tp, 0.05);
      if (Math.abs(p - lastP) < 0.0002) return; // settled: skip DOM writes
      lastP = p;
      const active = p * (N - 1);
      if (liftRef.current) liftRef.current.style.transform = `translateY(${-active * YSTEP}px)`;
      if (spinRef.current) spinRef.current.style.transform = `rotateY(${-active * ANGLE}deg)`;

      let best = 0, bestD = 1e9;
      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        const d = Math.abs(i - active);
        c.style.opacity = clamp(1 - d * 0.42).toFixed(3);
        c.style.filter = `brightness(${(0.45 + 0.55 * clamp(1 - d * 0.4)).toFixed(2)})`;
        c.style.zIndex = String(Math.round(1000 - d * 10));
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best !== lastF) { lastF = best; if (nowRef.current) nowRef.current.textContent = `Step ${process[best].step} — ${process[best].title}`; }
    };
    return rafWhenVisible(sectionRef.current, loop, { margin: '0px' });
  }, [isTouch]);

  const Heading = (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem' }}>My Process</p>
      <h2 className="metallic" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.5rem,10vw,4rem)' : 'clamp(3rem,7vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.9 }}>How I<br />Work.</h2>
    </motion.div>
  );

  // ---- Mobile / tablet: simple card list ----
  if (isTouch) {
    return (
      <section id="process" style={{ padding: '7rem var(--gutter)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', marginBottom: '2.5rem' }}>{Heading}</div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: '1.25rem' }}>
          {process.map((s) => (
            <div key={s.step} style={{ padding: '2rem', borderRadius: 16, background: '#08101F', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--gold)', marginBottom: '1rem' }}>{s.step}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.6rem' }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-3)', lineHeight: 1.75 }}>{s.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ---- Desktop: 3D helix spiral ----
  return (
    <section id="process" ref={sectionRef} style={{ height: `${N * 100 + 110}vh`, position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', perspective: '1500px', perspectiveOrigin: '50% 48%', background: 'radial-gradient(85% 90% at 50% 44%, rgba(212,164,95,0.07) 0%, transparent 55%), #030812' }}>
        {/* DNA double helix backdrop */}
        <DnaBackground opacity={0.4} align="center" />
        {/* faint gold axis */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(180deg, transparent, rgba(212,164,95,0.16) 30%, rgba(212,164,95,0.16) 70%, transparent)', zIndex: 1 }} />

        <div ref={liftRef} style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', willChange: 'transform', zIndex: 2 }}>
          <div ref={spinRef} style={{ position: 'absolute', top: '50%', left: '50%', transformStyle: 'preserve-3d', willChange: 'transform' }}>
            {process.map((s, i) => (
              <div
                key={s.step}
                ref={el => (cardRefs.current[i] = el)}
                style={{
                  position: 'absolute', top: 0, left: 0, width: 360, height: 240, margin: '-120px 0 0 -180px',
                  borderRadius: 18, overflow: 'hidden', border: '1px solid var(--border)', borderTop: '1px solid var(--border-gold)',
                  boxShadow: '0 30px 90px -36px #000', backfaceVisibility: 'hidden', willChange: 'opacity, filter',
                  background: 'linear-gradient(160deg,#091221,#030812)',
                  padding: '1.8rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  transform: `translateY(${i * YSTEP}px) rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)`,
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 70% at 28% 8%, rgba(212,164,95,0.16), transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)' }}>Step {s.step} / {String(N).padStart(2, '0')}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '2rem', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.7rem', lineHeight: 1 }}>{s.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.65 }}>{s.description}</p>
                </div>
                <div style={{ position: 'absolute', bottom: '-0.8rem', right: '0.6rem', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '6rem', color: 'var(--gold)', opacity: 0.05, lineHeight: 1, pointerEvents: 'none' }}>{s.step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* overlays */}
        <div style={{ position: 'absolute', top: '3.5rem', left: 'var(--gutter)', zIndex: 20000, pointerEvents: 'none' }}>{Heading}</div>
        <div style={{ position: 'absolute', bottom: '8vh', left: '50%', transform: 'translateX(-50%)', zIndex: 20000, textAlign: 'center', pointerEvents: 'none' }}>
          <div ref={nowRef} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#fff' }}>{`Step ${process[0].step} — ${process[0].title}`}</div>
        </div>
        <div ref={hintRef} style={{ position: 'absolute', bottom: '3.5vh', left: '50%', transform: 'translateX(-50%)', zIndex: 20000, color: 'var(--ink-3)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', transition: 'opacity .4s' }}>Scroll to descend the spiral</div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, height: 2, width: '100%', zIndex: 20000 }}><div ref={barRef} style={{ height: '100%', width: 0, background: 'var(--gold)' }} /></div>
      </div>
    </section>
  );
}
