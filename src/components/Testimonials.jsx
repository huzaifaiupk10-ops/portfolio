import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '../data/portfolioData';

const accentColors = ['#3B82F6', '#06B6D4', '#A855F7'];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="section-pad" style={{ background: '#0B1220' }}>
      <div className="container-max" ref={ref}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          style={{ borderBottom: '1px solid rgba(192,199,209,0.08)', paddingBottom: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label mb-4 block">Testimonials</span>
            <h2
              className="font-display font-bold gradient-text"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              Client Feedback
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm max-w-xs"
            style={{ color: '#64748B' }}
          >
            What clients say about working together.
          </motion.p>
        </div>

        {/* Testimonial blocks */}
        <div className="flex flex-col gap-0">
          {testimonials.map((t, i) => {
            const accent = accentColors[i];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="grid md:grid-cols-12 gap-8 py-10"
                style={{
                  borderBottom: i < testimonials.length - 1 ? '1px solid rgba(192,199,209,0.08)' : 'none',
                  borderLeft: `2px solid ${accent}`,
                  paddingLeft: '2rem',
                }}
              >
                {/* Quote */}
                <div className="md:col-span-8">
                  <p
                    className="font-display leading-relaxed italic mb-0"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: '#C0C7D1' }}
                  >
                    "{t.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="md:col-span-4 flex flex-col justify-center md:items-end gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center font-display font-bold text-sm"
                    style={{
                      background: `${accent}15`,
                      color: accent,
                      border: `1px solid ${accent}30`,
                      borderRadius: '3px',
                    }}
                  >
                    {t.avatar || t.name.charAt(0)}
                  </div>
                  <div className="md:text-right">
                    <div className="font-semibold text-sm" style={{ color: '#E5E7EB' }}>{t.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>{t.role}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill={accent} opacity="0.7">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
