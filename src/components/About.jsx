import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { personal, stats } from '../data/portfolioData';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-pad relative">
      <div className="container-max" ref={ref}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="section-label">About Me</span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-20"
          style={{ borderTop: '1px solid rgba(192,199,209,0.08)', borderBottom: '1px solid rgba(192,199,209,0.08)' }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="py-8 px-6 flex flex-col gap-1"
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(192,199,209,0.08)' : 'none' }}
            >
              <span
                className="font-display font-bold"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#E5E7EB', lineHeight: 1 }}
              >
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-widest" style={{ color: '#64748B' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#E5E7EB', letterSpacing: '-0.02em' }}
            >
              The Mind<br />
              <span className="gradient-text">Behind the Work</span>
            </h2>

            {/* Status */}
            <div
              className="inline-flex items-center gap-2 mt-6 px-4 py-2"
              style={{ border: '1px solid rgba(59,130,246,0.25)', borderRadius: '3px' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm" style={{ color: '#93C5FD' }}>Open to new projects</span>
            </div>
          </motion.div>

          {/* Right — bio + highlights + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-8"
          >
            <p className="leading-relaxed" style={{ color: '#94A3B8' }}>{personal.about}</p>

            {/* Highlight list */}
            <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(192,199,209,0.08)' }}>
              {[
                { label: 'Web Development', detail: 'React, Vite, Tailwind, Framer Motion, Three.js' },
                { label: 'AI & Automation', detail: 'AI Agents, Prompt Engineering, Workflow Automation' },
                { label: 'Branding & Design', detail: 'Identity, Typography, Color Systems, Visual Direction' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start justify-between py-4 gap-6"
                  style={{ borderBottom: '1px solid rgba(192,199,209,0.08)' }}
                >
                  <span className="font-medium text-sm" style={{ color: '#E5E7EB' }}>{item.label}</span>
                  <span className="text-xs text-right" style={{ color: '#64748B', maxWidth: '55%' }}>{item.detail}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}`} target="_blank" rel="noreferrer" className="btn-primary text-sm">
                Get in Touch
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
