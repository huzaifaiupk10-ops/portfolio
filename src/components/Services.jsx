import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/portfolioData';

const accentColors = ['#3B82F6', '#06B6D4', '#A855F7'];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();

  return (
    <section id="services" className="section-pad" style={{ background: '#0B1220' }}>
      <div className="container-max" ref={ref}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          style={{ borderBottom: '1px solid rgba(192,199,209,0.08)', paddingBottom: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label mb-4 block">Services</span>
            <h2
              className="font-display font-bold gradient-text"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              What I Do
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm max-w-xs"
            style={{ color: '#64748B' }}
          >
            Focused services combining design thinking, technical skill, and AI intelligence.
          </motion.p>
        </div>

        {/* Service rows */}
        <div className="flex flex-col">
          {services.map((service, i) => {
            const accent = accentColors[i];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                onClick={() => navigate(`/service/${service.id}`)}
                className="group grid md:grid-cols-12 gap-6 py-10 cursor-pointer"
                style={{
                  borderBottom: '1px solid rgba(192,199,209,0.08)',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(11,18,32,0.6)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Number */}
                <div className="md:col-span-1 flex items-start pt-1">
                  <span
                    className="font-display font-bold text-sm tabular-nums"
                    style={{ color: accent }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-3">
                  <h3
                    className="font-display font-bold text-xl leading-tight transition-colors duration-200"
                    style={{ color: '#E5E7EB' }}
                  >
                    {service.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 font-medium"
                        style={{
                          color: accent,
                          border: `1px solid ${accent}30`,
                          borderRadius: '2px',
                          background: `${accent}0D`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-6">
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="md:col-span-2 flex items-center justify-end">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: accent }}
                  >
                    <span className="hidden md:inline">View</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
