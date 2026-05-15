import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolioData';

function SkillPill({ label, i }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.04, duration: 0.35 }}
      whileHover={{ scale: 1.06, y: -2 }}
      className="inline-block px-3 py-1.5 rounded-lg text-sm font-medium cursor-default"
      style={{
        background: 'rgba(5,13,26,0.75)',
        border: '1px solid rgba(212,168,67,0.12)',
        color: '#CBD5E1',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)';
        e.currentTarget.style.boxShadow = '0 0 14px rgba(212,168,67,0.15)';
        e.currentTarget.style.color = '#F1F5F9';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,168,67,0.12)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.color = '#CBD5E1';
      }}
    >
      {label}
    </motion.span>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const current = skills[activeTab];

  return (
    <section
      id="skills"
      className="section-pad relative"
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
          <div className="section-label mb-4 mx-auto">Expertise</div>
          <h2
            className="font-display font-bold gradient-text"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            Skills & Expertise
          </h2>
          <p className="text-brand-muted mt-3 max-w-lg mx-auto">
            A broad skill set spanning development, design, and artificial intelligence.
          </p>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {skills.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(i)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-25"
              style={{
                background:
                  activeTab === i ? 'rgba(212,168,67,0.15)' : 'rgba(5,13,26,0.65)',
                border:
                  activeTab === i
                    ? '1px solid rgba(59,130,246,0.4)'
                    : '1px solid rgba(212,168,67,0.1)',
                color: activeTab === i ? '#D4A843' : '#64748B',
              }}
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.category}
            </button>
          ))}
        </motion.div>

        {/* Skills panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-premium p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(212,168,67,0.12)', border: '1px solid rgba(212,168,67,0.2)' }}
            >
              {current.icon}
            </span>
            <div>
              <h3 className="font-display font-semibold text-brand-silver-light text-lg">
                {current.category}
              </h3>
              <p className="text-xs text-brand-muted">{current.items.length} skills</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {current.items.map((item, i) => (
              <SkillPill key={item} label={item} i={i} />
            ))}
          </div>
        </motion.div>

        {/* All categories mini overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
        >
          {skills.map((cat, i) => (
            <motion.button
              key={cat.category}
              onClick={() => setActiveTab(i)}
              whileHover={{ y: -3 }}
              className="card-premium p-4 text-left shine"
            >
              <span className="text-2xl mb-2 block">{cat.icon}</span>
              <div className="text-sm font-semibold text-brand-silver mb-1">{cat.category}</div>
              <div className="text-xs text-brand-muted">{cat.items.length} skills</div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
