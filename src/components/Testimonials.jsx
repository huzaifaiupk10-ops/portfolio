import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '../data/portfolioData';

function QuoteIcon({ color = '#3B82F6' }) {
  return (
    <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
      <path
        d="M0 22V13.4C0 9.8 1.06667 6.66667 3.2 4C5.33333 1.33333 8.26667 0 12 0V3.6C10.1333 3.6 8.6 4.26667 7.4 5.6C6.2 6.8 5.6 8.26667 5.6 10H11.2V22H0ZM16.8 22V13.4C16.8 9.8 17.8667 6.66667 20 4C22.1333 1.33333 25.0667 0 28.8 0V3.6C26.9333 3.6 25.4 4.26667 24.2 5.6C23 6.8 22.4 8.26667 22.4 10H28V22H16.8Z"
        fill={color}
        fillOpacity="0.3"
      />
    </svg>
  );
}

const accentColors = ['#3B82F6', '#06B6D4', '#A855F7'];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="testimonials"
      className="section-pad"
      style={{ background: 'linear-gradient(180deg,#000000 0%,#050d1a 50%,#000000 100%)' }}
    >
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label mb-4 mx-auto">Testimonials</div>
          <h2
            className="font-display font-bold gradient-text"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            Client Feedback
          </h2>
          <p className="text-brand-muted mt-3 max-w-lg mx-auto">
            What clients say about working together.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const accent = accentColors[i];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl p-6 overflow-hidden"
                style={{
                  background: 'rgba(5,13,26,0.65)',
                  border: '1px solid rgba(37,99,235,0.1)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent}30`;
                  e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3), 0 0 35px ${accent}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }}
                />

                {/* Quote icon */}
                <div className="mb-4">
                  <QuoteIcon color={accent} />
                </div>

                {/* Quote text */}
                <p className="text-brand-silver text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                    style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}30` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#F1F5F9' }}>
                      {t.name}
                    </div>
                    <div className="text-xs text-brand-muted">{t.role}</div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mt-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={accent} opacity="0.8">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
