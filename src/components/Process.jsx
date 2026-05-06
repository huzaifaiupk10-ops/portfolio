import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { process } from '../data/portfolioData';

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="section-pad">
      <div className="container-max" ref={ref}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          style={{ borderBottom: '1px solid rgba(192,199,209,0.08)', paddingBottom: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label mb-4 block">How I Work</span>
            <h2
              className="font-display font-bold gradient-text"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              My Process
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm max-w-xs"
            style={{ color: '#64748B' }}
          >
            A clear, structured workflow from first conversation to final launch.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0"
          style={{ border: '1px solid rgba(192,199,209,0.08)', borderRadius: '4px' }}>
          {process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="p-8 relative"
              style={{
                borderRight: i < process.length - 1 ? '1px solid rgba(192,199,209,0.08)' : 'none',
              }}
            >
              {/* Large number watermark */}
              <div
                className="absolute top-4 right-4 font-display font-bold text-6xl pointer-events-none select-none"
                style={{ color: 'rgba(59,130,246,0.05)', lineHeight: 1 }}
              >
                {step.step}
              </div>

              {/* Step number badge */}
              <div
                className="inline-flex items-center justify-center w-10 h-10 font-display font-bold text-sm mb-6"
                style={{
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#60A5FA',
                  borderRadius: '3px',
                  background: 'rgba(59,130,246,0.06)',
                }}
              >
                {step.step}
              </div>

              <h3 className="font-display font-semibold text-lg mb-3" style={{ color: '#E5E7EB' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                {step.description}
              </p>

              {/* Connector arrow (desktop) */}
              {i < process.length - 1 && (
                <div
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center z-10"
                  style={{ background: '#05070A' }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
