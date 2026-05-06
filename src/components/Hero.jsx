import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { personal } from '../data/portfolioData';

const ThreeHeroObject = lazy(() => import('./ThreeHeroObject'));

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '5rem' }}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[80vh]">

          {/* Left — text */}
          <div className="flex flex-col gap-8 order-2 lg:order-1 py-12 lg:py-0">

            {/* Editorial label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Available for work</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1
                className="font-display font-bold leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: '#E5E7EB' }}
              >
                Building
                <br />
                <span className="gradient-text">Digital</span>
                <br />
                Experiences
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed max-w-sm"
              style={{ color: '#64748B' }}
            >
              {personal.subtagline}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <button onClick={() => scrollTo('projects')} className="btn-primary">
                View My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button onClick={() => scrollTo('contact')} className="btn-secondary">
                Contact Me
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex gap-10 pt-6"
              style={{ borderTop: '1px solid rgba(192,199,209,0.08)' }}
            >
              {[
                { value: '20+', label: 'Projects' },
                { value: '100%', label: 'Responsive' },
                { value: 'AI', label: 'Powered' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-2xl" style={{ color: '#E5E7EB' }}>{s.value}</div>
                  <div className="text-xs mt-0.5 uppercase tracking-widest" style={{ color: '#64748B' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="order-1 lg:order-2 relative flex items-center justify-center"
            style={{ height: '480px' }}
          >
            <Suspense fallback={null}>
              <ThreeHeroObject />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #05070A 0%, transparent 100%)' }}
      />
    </section>
  );
}
