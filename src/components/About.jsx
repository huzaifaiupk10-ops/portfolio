import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { personal, stats } from '../data/portfolioData';

function StatCard({ value, label, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="card-premium p-5 text-center shine"
    >
      <div className="font-display font-bold text-2xl mb-1 gradient-text-blue">{value}</div>
      <div className="text-xs text-brand-muted tracking-wide">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="section-pad relative">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4 mx-auto">About Me</div>
          <h2
            className="font-display font-bold gradient-text"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            The Mind Behind the Work
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Avatar card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex flex-col items-center lg:items-start"
          >
            {/* Profile visual */}
            <div className="relative mb-8">
              <div
                className="w-80 h-80 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg,#0A0A0A,#111827)',
                  border: '1px solid rgba(192,199,209,0.12)',
                  boxShadow: '0 0 60px rgba(59,130,246,0.12)',
                }}
              >
                {/* Profile photo — drop your image at public/images/profile.jpg */}
                {!imgError ? (
                  <img
                    src="/images/profile.jpg"
                    alt="Huzaifa Imran"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* Fallback initials if no photo found */
                  <span
                    className="font-display font-bold text-5xl"
                    style={{
                      background: 'linear-gradient(135deg,#60A5FA,#93C5FD,#C0C7D1)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    HI
                  </span>
                )}
                {/* Shimmer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
                  }}
                />
              </div>
              {/* Status badge */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
                style={{
                  background: 'rgba(5,7,10,0.9)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#60A5FA',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to projects
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {stats.map((s, i) => (
                <StatCard key={s.label} value={s.value} label={s.label} i={i} />
              ))}
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <h3
                className="font-display font-bold mb-3"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#F1F5F9' }}
              >
                {personal.name}
              </h3>
              <p
                className="text-sm font-medium mb-4"
                style={{ color: '#60A5FA', letterSpacing: '0.04em' }}
              >
                {personal.title}
              </p>
              <p className="text-brand-muted leading-relaxed">{personal.about}</p>
            </div>

            {/* Highlight pills */}
            <div className="space-y-2">
              {[
                { icon: '⬡', text: 'Full-stack Web Development & Modern UI/UX' },
                { icon: '◈', text: 'AI Agents, Prompt Engineering & Automation' },
                { icon: '◇', text: 'Branding, Identity Design & Visual Systems' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{
                    background: 'rgba(17,24,39,0.5)',
                    border: '1px solid rgba(37,99,235,0.08)',
                  }}
                >
                  <span className="text-blue-400 text-lg leading-none mt-0.5">{item.icon}</span>
                  <span className="text-sm text-brand-silver leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}`} target="_blank" rel="noreferrer"
                className="btn-primary text-sm"
              >
                Get in Touch
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
