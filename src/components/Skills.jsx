import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolioData';

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-pad relative" style={{ background: '#0B1220' }}>
      <div className="container-max" ref={ref}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          style={{ borderBottom: '1px solid rgba(192,199,209,0.08)', paddingBottom: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label mb-4 block">Expertise</span>
            <h2
              className="font-display font-bold gradient-text"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              Skills & Expertise
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm max-w-xs"
            style={{ color: '#64748B' }}
          >
            A broad skill set spanning development, design, and artificial intelligence.
          </motion.p>
        </div>

        {/* All categories grid */}
        <div className="grid md:grid-cols-2 gap-0"
          style={{ border: '1px solid rgba(192,199,209,0.08)', borderRadius: '4px' }}>
          {skills.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8"
              style={{
                borderRight: i % 2 === 0 ? '1px solid rgba(192,199,209,0.08)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(192,199,209,0.08)' : 'none',
              }}
            >
              {/* Category heading */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl">{cat.icon}</span>
                <h3 className="font-display font-semibold text-sm uppercase tracking-widest" style={{ color: '#60A5FA' }}>
                  {cat.category}
                </h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-col gap-0">
                {cat.items.map((item, j) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + j * 0.04 }}
                    className="flex items-center gap-3 py-2.5"
                    style={{ borderBottom: j < cat.items.length - 1 ? '1px solid rgba(192,199,209,0.05)' : 'none' }}
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#3B82F6' }} />
                    <span className="text-sm" style={{ color: '#C0C7D1' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
