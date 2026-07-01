import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const CATEGORIES = [
  {
    num: '01', icon: '⬡', title: 'Development & Web', count: 7,
    dur: 34, dir: 'left',
    skills: ['Front-End Development','Web Development','Web Design','HTML / CSS','UI/UX Design','Responsive Design','Product Development'],
  },
  {
    num: '02', icon: '◈', title: 'AI & Automation', count: 5,
    dur: 26, dir: 'right',
    skills: ['Artificial Intelligence','Agentic AI Development','AI Agents','Prompt Engineering','Workflow Automation'],
  },
  {
    num: '03', icon: '◇', title: 'Branding & Creative', count: 9,
    dur: 40, dir: 'left',
    skills: ['Branding & Identity','Brand Identity','Logo Design','Typography','Color Theory','Visual Design','Creative Concept Design','Content Creation','Image Editing'],
  },
  {
    num: '04', icon: '◎', title: 'AI Tools', count: 11,
    dur: 32, dir: 'right',
    skills: ['ChatGPT','Claude','Claude Code','Google Gemini','Groq','Perplexity','Midjourney','Leonardo AI','Runway','ElevenLabs','n8n'],
  },
];

const TOTAL = CATEGORIES.reduce((a, c) => a + c.count, 0);

function MarqueeRow({ cat, index, inView }) {
  const [paused, setPaused] = useState(false);
  const repeated = [...cat.skills, ...cat.skills, ...cat.skills, ...cat.skills];
  const animName = cat.dir === 'left' ? 'skillsLeft' : 'skillsRight';

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
      transition={{ delay: 0.2 + index * 0.14, duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
      className="skills-row"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        borderTop: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        alignItems: 'center',
        transition: 'background 0.3s',
        background: paused ? 'rgba(201,168,76,0.03)' : 'transparent',
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Gold left accent on hover */}
      <motion.div
        animate={{ scaleY: paused ? 1 : 0, opacity: paused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--gold)', transformOrigin: 'top', borderRadius: 1 }}
      />

      {/* Left: category info */}
      <div style={{ padding: '2rem 2rem 2rem 0', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.1em' }}>{cat.num}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: paused ? 'var(--gold)' : 'var(--ink-3)', transition: 'color 0.25s' }}>{cat.icon}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1rem,1.6vw,1.25rem)', color: paused ? 'var(--ink)' : 'var(--ink-2)', letterSpacing: '-0.01em', lineHeight: 1.2, transition: 'color 0.25s', marginBottom: '0.4rem' }}>{cat.title}</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--ink-3)', letterSpacing: '0.06em' }}>{cat.count} skills</p>
      </div>

      {/* Right: marquee */}
      <div style={{ overflow: 'hidden', position: 'relative', padding: '1.5rem 0' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            width: 'max-content',
            animation: `${animName} ${cat.dur}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
            willChange: 'transform',
          }}
        >
          {repeated.map((skill, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: paused ? 'var(--gold)' : 'var(--ink-2)',
                  padding: '0.4rem 1.1rem',
                  border: `1px solid ${paused ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 999,
                  background: paused ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.02)',
                  transition: 'color 0.3s, border-color 0.3s, background 0.3s',
                  whiteSpace: 'nowrap',
                }}
              >
                {skill}
              </span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: paused ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.15)', flexShrink: 0, transition: 'background 0.3s' }} />
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" style={{ padding: '7rem var(--gutter)', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>

      <style>{`
        @keyframes skillsLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes skillsRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{ position: 'absolute', right: '10%', top: '40%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}
            >
              Skills
            </motion.p>

            {['My', 'Expertise.'].map((word, i) => (
              <div key={word} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }} animate={inView ? { y: '0%' } : {}}
                  transition={{ delay: i * 0.12, duration: 0.9, ease }}
                  className="metallic"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(3rem,7vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.9, paddingBottom: '0.06em' }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Total count badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}
          >
            <span className="metallic" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '3.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>{TOTAL}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Total Skills</span>
          </motion.div>
        </div>

        {/* Category rows */}
        <div>
          {CATEGORIES.map((cat, i) => (
            <MarqueeRow key={cat.num} cat={cat} index={i} inView={inView} />
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>

        {/* Bottom label row */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}
        >
          {CATEGORIES.map(cat => (
            <div key={cat.num} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--gold)' }}>{cat.icon}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--ink-3)' }}>{cat.title}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--ink-3)', opacity: 0.5 }}>({cat.count})</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
