import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Opening screen: a film title sequence. Letterbox bars open, a warm light leak sweeps through,
// the name tightens into focus with an anamorphic flare, then the bars close to black and cut
// to the hero (whose own letterbox bars open right after).
const ease = [0.16, 1, 0.3, 1];
const cinematic = [0.76, 0, 0.24, 1];
const CLOSE_AT = 2.8;   // bars start closing (s)
const DONE_AT = 3300;   // loader removed (ms)
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), DONE_AT); return () => clearTimeout(t); }, []);
  const bar = { initial: { height: '50%' }, animate: { height: ['50%', '12%', '12%', '50%'] }, transition: { duration: CLOSE_AT + 0.5, times: [0, 1.0 / (CLOSE_AT + 0.5), CLOSE_AT / (CLOSE_AT + 0.5), 1], ease: cinematic } };
  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ position: 'fixed', inset: 0, background: '#030812', zIndex: 99990, overflow: 'hidden' }}>
          <style>{`@keyframes grain-shift { 0% { transform: translate(0,0) } 25% { transform: translate(-3%,2%) } 50% { transform: translate(2%,-3%) } 75% { transform: translate(-2%,-1%) } 100% { transform: translate(1%,3%) } }`}</style>

          {/* warm light leak */}
          <motion.div initial={{ x: '-60%', opacity: 0 }} animate={{ x: '60%', opacity: [0, 0.9, 0] }} transition={{ duration: 2.6, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: '-20%', background: 'radial-gradient(40% 60% at 50% 50%, rgba(232,160,80,0.55), rgba(212,100,50,0.18) 45%, transparent 70%)', filter: 'blur(30px)' }} />

          {/* title */}
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', padding: '0 1rem' }}>
            <div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--ink-2)', marginBottom: '1.4rem', marginRight: '-0.5em' }}>A Portfolio by</motion.p>
              <motion.h1 initial={{ opacity: 0, letterSpacing: '0.9em', filter: 'blur(12px)' }} animate={{ opacity: 1, letterSpacing: '0.18em', filter: 'blur(0px)' }} transition={{ delay: 0.5, duration: 1.9, ease }}
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1.8rem,6vw,5rem)', color: '#F8F4EE', textTransform: 'uppercase', whiteSpace: 'nowrap', marginRight: '-0.18em' }}>Huzaifa Imran</motion.h1>
              <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0.5] }} transition={{ delay: 1.1, duration: 1.4, ease }}
                style={{ height: 2, margin: '1.2rem auto 0', width: '80%', background: 'linear-gradient(90deg, transparent, rgba(255,240,220,0.9), transparent)', boxShadow: '0 0 18px 4px rgba(212,164,95,0.6)' }} />
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.8 }}
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--gold)', marginTop: '1.2rem' }}>Design · Code · Story</motion.p>
            </div>
          </div>

          {/* letterbox bars: open, hold, then close to black */}
          <motion.div {...bar} style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#000', zIndex: 10 }} />
          <motion.div {...bar} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#000', zIndex: 10 }} />

          {/* film grain */}
          <div style={{ position: 'absolute', inset: '-50%', backgroundImage: GRAIN, opacity: 0.1, mixBlendMode: 'overlay', pointerEvents: 'none', animation: 'grain-shift 0.6s steps(4) infinite', zIndex: 20 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
