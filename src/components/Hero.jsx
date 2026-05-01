import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { personal } from '../data/portfolioData';

const ThreeHeroObject = lazy(() => import('./ThreeHeroObject'));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const headlineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 48, skewY: 4 },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-brand-muted tracking-widest uppercase">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-px h-8 rounded-full"
        style={{ background: 'linear-gradient(to bottom, #3B82F6, transparent)' }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#05070A 0%,#0B1220 60%,#05070A 100%)' }}
    >
      {/* Glow blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(30,64,175,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(11,18,32,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 container-max w-full px-4 md:px-8 pt-24 pb-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-0">
          {/* Left — text */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="section-label mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Available for Work
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="font-display font-bold leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#E5E7EB' }}
            >
              {['Building', 'Digital'].map((word) => (
                <span key={word} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em', verticalAlign: 'bottom' }}>
                  <motion.span variants={wordReveal} style={{ display: 'inline-block' }}>{word}</motion.span>
                </span>
              ))}
              <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                <motion.span variants={wordReveal} className="gradient-text" style={{ display: 'inline-block' }}>Experiences</motion.span>
              </span>
              <br />
              {['That', 'Feel'].map((word) => (
                <span key={word} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em', verticalAlign: 'bottom' }}>
                  <motion.span variants={wordReveal} style={{ display: 'inline-block' }}>{word}</motion.span>
                </span>
              ))}
              <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                <motion.span
                  variants={wordReveal}
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg,#60A5FA,#93C5FD)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >Smarter</motion.span>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-brand-muted leading-relaxed mb-8 max-w-xl"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
            >
              {personal.subtagline}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#projects')}
                className="btn-primary"
              >
                View My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#contact')}
                className="btn-secondary"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Skill badges */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {['Web Development', 'UI/UX', 'Branding', 'AI Solutions'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    background: 'rgba(17,24,39,0.8)',
                    border: '1px solid rgba(192,199,209,0.12)',
                    color: '#94A3B8',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D object */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="flex-shrink-0 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] relative"
          >
            {/* Glow ring behind the orb */}
            <div
              className="absolute inset-8 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
                filter: 'blur(20px)',
                animation: 'glowPulse 3s ease-in-out infinite alternate',
              }}
            />
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="w-40 h-40 rounded-full animate-pulse"
                    style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.3),transparent)' }}
                  />
                </div>
              }
            >
              <ThreeHeroObject />
            </Suspense>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(192,199,209,0.07)' }}
        >
          {[
            { value: '20+', label: 'Projects Built' },
            { value: '3+', label: 'Years Experience' },
            { value: '100%', label: 'Responsive' },
            { value: '∞', label: 'AI-Powered' },
          ].map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <div className="font-display font-bold text-2xl gradient-text-blue">{s.value}</div>
              <div className="text-xs text-brand-muted mt-0.5 tracking-wide">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
