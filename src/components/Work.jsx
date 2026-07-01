import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ease = [0.16, 1, 0.3, 1];

function TiltCard({ children, style, onClick, strength = 7 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 300, damping: 25 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 300, damping: 25 });
  const sx = useTransform(x, [-0.5, 0.5], [15, 85]);
  const sy = useTransform(y, [-0.5, 0.5], [15, 85]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sx}% ${sy}%, rgba(201,168,76,0.14), transparent 55%)`;

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <div style={{ perspective: 1200, cursor: 'pointer', ...style }} onClick={onClick}>
      <motion.div
        onMouseMove={move} onMouseLeave={leave}
        style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {children}
        <motion.div style={{ position: 'absolute', inset: 0, background: sheen, pointerEvents: 'none', zIndex: 10, borderRadius: 'inherit' }} />
      </motion.div>
    </div>
  );
}

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const navigate = useNavigate();
  const { isMobile, isTablet } = useBreakpoint();
  const featured = projects.slice(0, 4);

  const smallCols = isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)';

  return (
    <section id="work" style={{ padding: '7rem var(--gutter)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }} style={{ marginBottom: '4rem' }}>
          <h2 className="metallic" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.5rem,10vw,4rem)' : 'clamp(3rem,7vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.9 }}>Selected<br />Work.</h2>
        </motion.div>

        {/* Large featured card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.8, ease }} style={{ marginBottom: '1.25rem', borderRadius: 20 }}>
          <TiltCard strength={isMobile ? 0 : 4} onClick={() => navigate('/project/' + featured[0].id)} style={{ height: isMobile ? 240 : 480, borderRadius: 20 }}>
            <div style={{ position: 'relative', height: '100%', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <img src={featured[0].image} alt={featured[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.currentTarget.style.display = 'none'} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,10,10,0.85) 0%,rgba(10,10,10,0.2) 50%,transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{featured[0].tags.slice(0, 2).join(' · ')}</p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? '1.3rem' : 'clamp(1.5rem,3vw,2.2rem)', color: '#fff', letterSpacing: '-0.02em' }}>{featured[0].title}</h3>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Smaller cards */}
        <div style={{ display: 'grid', gridTemplateColumns: smallCols, gap: '1.25rem' }}>
          {featured.slice(1).map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease }} style={{ borderRadius: 16 }}>
              <TiltCard strength={isMobile ? 0 : 8} onClick={() => navigate('/project/' + p.id)} style={{ height: isMobile ? 180 : 280, borderRadius: 16 }}>
                <div style={{ position: 'relative', height: '100%', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => e.currentTarget.style.display = 'none'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,10,10,0.82) 0%,transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{p.tags[0]}</p>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', color: '#fff', letterSpacing: '-0.01em' }}>{p.title}</h3>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
