import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ease = [0.16, 1, 0.3, 1];

const SERVICES = [
  { num: '01', title: 'Web Development', desc: 'Fast, responsive, modern websites and web apps built with React. Every project is optimised for performance, accessibility, and conversion.' },
  { num: '02', title: 'AI Agents & Automation', desc: 'Custom AI agents, prompt engineering, and n8n automation workflows that eliminate manual work and scale your operations intelligently.' },
  { num: '03', title: 'Brand Identity', desc: 'Logo design, typography systems, colour palettes, and full brand guidelines. Visual identities that communicate authority and elegance.' },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState(null);
  const { isMobile } = useBreakpoint();

  return (
    <section id="services" style={{ padding: '7rem var(--gutter)', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/services-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: isMobile ? 'rgba(10,10,10,0.6)' : 'linear-gradient(to right, #0A0A0A 30%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)', pointerEvents: 'none', zIndex: 0 }} />

      <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="metallic"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.5rem,10vw,4rem)' : 'clamp(3rem,7vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '4rem' }}
        >What I Do.</motion.h2>

        {SERVICES.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.7, ease }}
            onMouseEnter={() => setActive(s.num)}
            onMouseLeave={() => setActive(null)}
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '2rem 0', display: 'grid', gridTemplateColumns: isMobile ? '48px 1fr' : '80px 1fr auto', gap: isMobile ? '1rem' : '2rem', alignItems: 'center', cursor: 'default', transition: 'padding 0.3s', paddingLeft: active === s.num ? '0.5rem' : '0' }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.75rem', color: active === s.num ? 'var(--gold)' : 'var(--ink-3)', letterSpacing: '0.08em', transition: 'color 0.25s' }}>{s.num}</span>
            <div>
              <h3 className={active === s.num ? 'metallic' : ''} style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(1.4rem,5vw,2rem)' : 'clamp(1.8rem,3.5vw,3rem)', color: active === s.num ? 'transparent' : 'var(--ink)', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: active === s.num ? '0.75rem' : 0, transition: 'color 0.25s, margin 0.3s' }}>{s.title}</h3>
              <AnimatePresence>
                {active === s.num && (
                  <motion.p key="desc" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink-3)', lineHeight: 1.75, maxWidth: '55ch', overflow: 'hidden' }}>{s.desc}</motion.p>
                )}
              </AnimatePresence>
            </div>
            {!isMobile && (
              <motion.div animate={{ x: active === s.num ? 0 : 8, opacity: active === s.num ? 1 : 0.3 }} transition={{ duration: 0.25 }} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid', borderColor: active === s.num ? 'var(--gold)' : 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: active === s.num ? 'var(--gold)' : 'transparent', transition: 'background 0.25s, border-color 0.25s' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={active === s.num ? '#0A0A0A' : 'var(--ink-3)'} strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
              </motion.div>
            )}
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
      </div>
    </section>
  );
}
