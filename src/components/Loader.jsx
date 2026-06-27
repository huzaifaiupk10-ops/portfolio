import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1400); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="loader" initial={{ clipPath:'inset(0 0 0% 0)' }} exit={{ clipPath:'inset(0 0 100% 0)' }} transition={{ duration:0.9, ease:[0.76,0,0.24,1], delay:0.1 }} style={{ position:'fixed',inset:0,background:'#0A0A0A',zIndex:99990,display:'flex',alignItems:'center',justifyContent:'center' }}>
          <motion.span initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.4 }} style={{ fontFamily:'var(--font-display)',fontWeight:800,fontSize:'clamp(2.5rem,6vw,5rem)',color:'var(--gold)',letterSpacing:'-0.04em' }}>PORTFOLIO</motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
