import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { process } from '../data/portfolioData';

const ease = [0.16, 1, 0.3, 1];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="process" style={{ padding: '7rem var(--gutter)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}
        >
          My Process
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
          <motion.div
            initial={{ y: '108%' }} animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.9, ease }}
            className="metallic"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(3rem,7vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.9 }}
          >
            How I Work.
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-3)', lineHeight: 1.8, maxWidth: '50ch', marginBottom: '4rem' }}
        >
          A clear, structured workflow from first conversation to final launch.
        </motion.p>

        {/* Steps grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }}>
          {process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease }}
              style={{ padding: '2rem', borderRadius: 16, background: '#141414', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', transition: 'border-color 0.25s, transform 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
            >
              {/* Step number */}
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--gold)', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>{step.step}</div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1.2rem,1.8vw,1.5rem)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.75rem', lineHeight: 1.1 }}>{step.title}</h3>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-3)', lineHeight: 1.8 }}>{step.description}</p>

              {/* Watermark */}
              <div style={{ position: 'absolute', bottom: '-0.5rem', right: '0.5rem', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '6rem', color: 'var(--gold)', opacity: 0.04, pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>{step.step}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
