import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/portfolioData';

const icons = {
  '⬡': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
    </svg>
  ),
  '◈': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  ),
  '◇': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
    </svg>
  ),
};

const accentColors = ['#D4A843', '#06B6D4', '#A855F7'];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();

  return (
    <section
      id="services"
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
          <div className="section-label mb-4 mx-auto">Services</div>
          <h2
            className="font-display font-bold gradient-text"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            What I Do
          </h2>
          <p className="text-brand-muted mt-3 max-w-lg mx-auto">
            Focused services that combine design thinking, technical skill, and AI intelligence.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const accent = accentColors[i];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/service/${service.id}`)}
                className="group relative rounded-2xl p-6 shine cursor-pointer"
                style={{
                  background: 'rgba(5,13,26,0.65)',
                  border: '1px solid rgba(212,168,67,0.1)',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent}35`;
                  e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3), 0 0 40px ${accent}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,168,67,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}
                >
                  {icons[service.icon]}
                </div>

                <h3
                  className="font-display font-semibold text-xl mb-3"
                  style={{ color: '#F1F5F9' }}
                >
                  {service.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md font-medium"
                      style={{
                        background: `${accent}10`,
                        color: accent,
                        border: `1px solid ${accent}20`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Number watermark */}
                <div
                  className="absolute bottom-4 right-5 font-display font-bold text-6xl opacity-5 pointer-events-none select-none"
                  style={{ color: accent }}
                >
                  0{i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
