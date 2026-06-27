import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '../data/portfolioData';
const ease = [0.16,1,0.3,1];
export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:'-60px'});
  return (
    <section style={{ padding:'5rem var(--gutter)', borderBottom:'1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
        <motion.h2 initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease}} className="metallic" style={{ fontFamily:'var(--font-serif)', fontWeight:700, fontSize:'clamp(2.4rem,5vw,3.75rem)', letterSpacing:'-0.02em', marginBottom:'3.5rem' }}>Kind Words</motion.h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
          {testimonials.map((t,i)=>(
            <motion.div key={t.name} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*0.1,duration:0.7,ease}} style={{ background:'var(--card)', borderRadius:'var(--radius)', padding:'2rem', border:'1px solid var(--border)' }}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--ink-2)', lineHeight:1.8, marginBottom:'1.75rem' }}>"{t.quote}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--gold-dim)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.75rem', color:'var(--gold)' }}>{t.avatar}</span>
                </div>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.85rem', color:'var(--ink)' }}>{t.name}</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'var(--ink-3)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
