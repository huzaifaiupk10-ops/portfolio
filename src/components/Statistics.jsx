import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { soundReady, fmTone, tone } from '../lib/sfx';

const ease = [0.16, 1, 0.3, 1];

// Numbers come from the stats in portfolioData plus the certification count.
const STATS = [
  { value: 14, suffix: '+', label: 'Projects Built' },
  { value: 12, suffix: '', label: 'Certifications' },
  { value: 10, suffix: '+', label: 'AI Solutions' },
  { value: 90, suffix: '%', label: 'Responsive' },
];

const BARS = [0.35, 0.55, 0.45, 0.7, 0.62, 0.85, 1];

function Counter({ value, suffix, run }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, v => `${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (!run) return;
    mv.set(0);
    const c = animate(mv, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [run, value, mv]);
  return <motion.span>{text}</motion.span>;
}

export default function Statistics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { isMobile } = useBreakpoint();
  const [run, setRun] = useState(0); // bumps each time the stats row enters view, replaying counters + rings

  // Sound ("Radar Ping"): sonar-style pings that speed up while the numbers count, like a radar locking on.
  // Plays only during the count-up — no ending sound.
  useEffect(() => {
    if (!run || !soundReady()) return;
    const timers = [0, 520, 920, 1240, 1480, 1660, 1790].map((t, k) => setTimeout(() => {
      fmTone({ freq: 1568, ratio: 2, depth: 120, duration: 0.5 - k * 0.04, volume: 0.09 });
      tone({ freq: 1568, volume: 0.03, release: 0.25, delay: 0.12 }); // soft echo
    }, t));
    return () => timers.forEach(clearTimeout);
  }, [run]);

  return (
    <section id="statistics" style={{ padding: isMobile ? '5rem 0' : '7rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%,-50%)', width: 800, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,164,95,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', position: 'relative' }}>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }}
          style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Statistics
        </motion.p>
        {['By the', 'Numbers.'].map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.div initial={{ y: '108%' }} animate={inView ? { y: '0%' } : {}} transition={{ delay: i * 0.12, duration: 0.9, ease }} className="metallic"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.8rem,12vw,4rem)' : 'clamp(3rem,6vw,5rem)', letterSpacing: '-0.03em', lineHeight: 0.9, paddingBottom: '0.06em' }}>
              {line}
            </motion.div>
          </div>
        ))}

        <motion.div
          onViewportEnter={() => setRun(r => r + 1)} viewport={{ amount: 0.5 }}
          style={{ marginTop: isMobile ? '2.5rem' : '3.5rem', padding: isMobile ? '2rem 1.25rem' : '3rem 2.5rem', borderRadius: 18, border: '1px solid rgba(212,164,95,0.15)', background: 'radial-gradient(70% 90% at 50% 50%, #0C1729, #030812)', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '2rem 1rem' : '1.5rem' }}
        >
          {STATS.map((s, k) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '0.75rem' : '1rem', justifyContent: 'center', textAlign: isMobile ? 'center' : 'left' }}>
              <svg width={isMobile ? 76 : 92} height={isMobile ? 76 : 92} viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(212,164,95,0.15)" strokeWidth="6" />
                <motion.circle key={run} cx="50" cy="50" r="42" fill="none" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round" transform="rotate(-90 50 50)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: run ? 1 : 0 }} transition={{ delay: k * 0.15, duration: 1.6, ease }} />
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? '2.2rem' : '2.6rem', color: 'var(--ink)', lineHeight: 1 }}>
                  <Counter value={s.value} suffix={s.suffix} run={run} />
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-2)', marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}

          {/* Rising bar chart (decorative), replays with the counters */}
          <div key={'bars' + run} style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'flex-end', gap: isMobile ? '0.5rem' : '0.8rem', height: isMobile ? 100 : 130, maxWidth: 560, width: '100%', margin: isMobile ? '0.5rem auto 0' : '1.5rem auto 0', borderBottom: '1px solid rgba(212,164,95,0.3)' }}>
            {BARS.map((h, k) => (
              <motion.div key={k} initial={{ height: 0 }} animate={{ height: run ? `${h * 100}%` : 0 }} transition={{ delay: 0.4 + k * 0.1, duration: 1, ease }}
                style={{ flex: 1, borderRadius: '6px 6px 0 0', background: k === BARS.length - 1 ? 'var(--gold)' : 'rgba(212,164,95,0.35)' }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
