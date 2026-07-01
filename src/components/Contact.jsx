import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '../data/portfolioData';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ease = [0.16, 1, 0.3, 1];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { isMobile } = useBreakpoint();

  return (
    <section id="contact" style={{ minHeight: isMobile ? 'auto' : '100vh', padding: isMobile ? '5rem 0' : undefined, display: 'flex', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '20%', top: '50%', transform: 'translate(50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2.5rem' : '4rem', alignItems: 'center', width: '100%' }}>
        {/* Left: text */}
        <div>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}
          >Available Now</motion.p>

          {["Let's Work", "Together."].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={inView ? { y: '0%' } : {}}
                transition={{ delay: i * 0.12, duration: 1, ease }}
                className="metallic"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.8rem,12vw,5rem)' : 'clamp(3.5rem,8vw,6.5rem)', letterSpacing: '-0.04em', lineHeight: 0.88, paddingBottom: '0.06em' }}
              >{line}</motion.div>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-3)', lineHeight: 1.85, marginTop: '2rem', marginBottom: '2.5rem', maxWidth: '40ch' }}
          >
            Have a project in mind? I am always open to new collaborations and creative challenges.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            href={'mailto:' + personal.email}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: isMobile ? '0.9rem' : '1.1rem', color: '#0A0A0A', textDecoration: 'none', padding: isMobile ? '0.75rem 1.4rem' : '0.9rem 2rem', background: 'var(--gold)', borderRadius: 10, letterSpacing: '0.01em', transition: 'transform 0.2s,box-shadow 0.2s', wordBreak: 'break-all' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(201,168,76,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            {personal.email}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
          </motion.a>
        </div>

        {/* Right: image (hidden on mobile) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease }}
            style={{ height: 500, borderRadius: 16, overflow: 'hidden' }}
          >
            <img src="/images/contact-visual.png" alt="Contact" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
