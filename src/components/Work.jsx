import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { rafWhenVisible } from '../lib/rafWhenVisible';

const ease = [0.16, 1, 0.3, 1];
const clamp = (n, a = 0, b = 1) => (n < a ? a : n > b ? b : n);
const lerp = (a, b, t) => a + (b - a) * t;

function CardInner({ p, big }) {
  return (
    <>
      <img src={p.image} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => (e.currentTarget.style.display = 'none')} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(3,8,18,0.9) 0%,rgba(3,8,18,0.25) 55%,transparent 100%)' }} />
      <div style={{ position: 'absolute', bottom: '1.4rem', left: '1.4rem', right: '1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '0.75rem' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: p.accent || 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{p.tags.slice(0, 2).join(' · ')}</p>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: big ? '1.5rem' : '1.15rem', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.05 }}>{p.title}</h3>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.accent || 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#030812" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
        </div>
      </div>
    </>
  );
}

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const navigate = useNavigate();
  const { isMobile, isTablet } = useBreakpoint();
  const isTouch = isMobile || isTablet;

  const items = projects.filter(p => !/jarvis/i.test(p.title)).slice(0, 8);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const barRef = useRef(null);
  const hintRef = useRef(null);
  const nowRef = useRef(null);

  const CENTER_GAP = 320, SIDE_GAP = 66, TILT = 56, BACK = 150;

  useEffect(() => {
    if (isTouch) return;
    let active = 0, target = 0, lastA = -1, stop = () => {};
    const read = () => {
      const el = sectionRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - window.innerHeight));
      target = p * (items.length - 1);
      if (barRef.current) barRef.current.style.width = (p * 100) + '%';
      if (hintRef.current) hintRef.current.style.opacity = String(clamp(1 - p * 8));
    };
    const loop = () => {
      active = lerp(active, target, 0.055);
      if (Math.abs(active - lastA) < 0.0005) return; // settled: skip DOM writes
      lastA = active;
      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        const o = i - active;
        const cl = clamp(o, -1, 1);
        const x = cl * CENTER_GAP + (o - cl) * SIDE_GAP;
        const ry = -cl * TILT;
        const z = -Math.abs(cl) * BACK - Math.abs(o - cl) * 30;
        c.style.transform = `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg)`;
        c.style.opacity = clamp(1 - Math.abs(o) * 0.28).toFixed(3);
        c.style.zIndex = String(Math.round(1000 - Math.abs(o) * 10));
      });
      const idx = clamp(Math.round(active), 0, items.length - 1);
      if (nowRef.current) nowRef.current.textContent = items[idx].title;
    };
    const onScroll = () => read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', read);
    read();
    if (sectionRef.current) stop = rafWhenVisible(sectionRef.current, loop, { margin: '0px' });
    return () => { stop(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', read); };
  }, [isTouch]); // eslint-disable-line

  const Heading = (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
      <h2 className="metallic" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.5rem,10vw,4rem)' : 'clamp(3rem,7vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.9 }}>Selected<br />Work.</h2>
    </motion.div>
  );

  // ---- Mobile / tablet: grid fallback ----
  if (isTouch) {
    const cols = isMobile ? '1fr' : 'repeat(2,1fr)';
    return (
      <section id="work" style={{ padding: '7rem var(--gutter)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', marginBottom: '2.5rem' }}>{Heading}</div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: cols, gap: '1.25rem' }}>
          {items.map((p, i) => (
            <div key={p.id} onClick={() => navigate('/project/' + p.id)} style={{ position: 'relative', height: i === 0 ? 260 : 200, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', gridColumn: i === 0 && !isMobile ? 'span 2' : 'auto' }}>
              <CardInner p={p} big={i === 0} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ---- Desktop: 3D cover flow ----
  return (
    <section id="work" ref={sectionRef} style={{ height: `${items.length * 95 + 100}vh`, position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', perspective: '1200px', perspectiveOrigin: '50% 44%', background: 'radial-gradient(90% 70% at 50% 28%, rgba(212,164,95,0.10) 0%, transparent 55%), #030812' }}>
        <div style={{ position: 'absolute', top: '46%', left: '50%', transformStyle: 'preserve-3d' }}>
          {items.map((p, i) => (
            <div
              key={p.id}
              ref={el => (cardRefs.current[i] = el)}
              onClick={() => navigate('/project/' + p.id)}
              style={{ position: 'absolute', top: 0, left: 0, width: 340, height: 400, transformStyle: 'preserve-3d', willChange: 'transform, opacity', cursor: 'pointer' }}
            >
              <div style={{ position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 30px 80px -30px rgba(0,0,0,0.8)' }}>
                <CardInner p={p} big={i === 0} />
              </div>
              {/* reflection */}
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, height: '65%', borderRadius: 16, overflow: 'hidden', transform: 'scaleY(-1)', transformOrigin: 'top', opacity: 0.24, WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,.7), transparent 68%)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,.7), transparent 68%)' }}>
                <img src={p.image} alt="" style={{ width: '100%', height: '154%', objectFit: 'cover', display: 'block' }} onError={e => (e.currentTarget.style.display = 'none')} />
              </div>
            </div>
          ))}
        </div>

        {/* overlays */}
        <div style={{ position: 'absolute', top: '3.5rem', left: 'var(--gutter)', zIndex: 20000, pointerEvents: 'none' }}>{Heading}</div>
        <div style={{ position: 'absolute', bottom: '8vh', left: '50%', transform: 'translateX(-50%)', zIndex: 20000, textAlign: 'center', pointerEvents: 'none' }}>
          <div ref={nowRef} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff' }}>—</div>
        </div>
        <div ref={hintRef} style={{ position: 'absolute', bottom: '3vh', left: '50%', transform: 'translateX(-50%)', zIndex: 20000, color: 'var(--ink-3)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', transition: 'opacity .4s' }}>Scroll to flip through · click to open</div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, height: 2, width: '100%', zIndex: 20000 }}><div ref={barRef} style={{ height: '100%', width: 0, background: 'var(--gold)' }} /></div>
      </div>
    </section>
  );
}
