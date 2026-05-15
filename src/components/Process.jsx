import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { process } from '../data/portfolioData';

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="section-pad">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label mb-4 mx-auto">How I Work</div>
          <h2
            className="font-display font-bold gradient-text"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            My Process
          </h2>
          <p className="text-brand-muted mt-3 max-w-lg mx-auto">
            A clear, structured workflow from first conversation to final launch.
          </p>
        </motion.div>

        {/* Steps — desktop: horizontal, mobile: vertical */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 20%, rgba(59,130,246,0.3) 80%, transparent)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="relative"
              >
                {/* Vertical connector (mobile) */}
                {i < process.length - 1 && (
                  <div
                    className="lg:hidden absolute left-6 top-full w-px h-6 z-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), transparent)' }}
                  />
                )}

                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="rounded-2xl p-6 h-full relative overflow-hidden shine"
                  style={{
                    background: 'rgba(5,13,26,0.65)',
                    border: '1px solid rgba(212,168,67,0.1)',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3), 0 0 30px rgba(212,168,67,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,168,67,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Step number bubble */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm mb-5 relative z-10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(30,64,175,0.4), rgba(212,168,67,0.2))',
                      border: '1px solid rgba(59,130,246,0.35)',
                      color: '#D4A843',
                      boxShadow: '0 0 20px rgba(212,168,67,0.15)',
                    }}
                  >
                    {step.step}
                  </div>

                  <h3
                    className="font-display font-semibold text-lg mb-2 relative z-10"
                    style={{ color: '#F1F5F9' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed relative z-10">
                    {step.description}
                  </p>

                  {/* Background number watermark */}
                  <div
                    className="absolute -bottom-3 -right-2 font-display font-bold text-8xl opacity-[0.04] pointer-events-none select-none"
                    style={{ color: '#D4A843' }}
                  >
                    {step.step}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
