import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { services } from '../data/portfolioData';
const ease = [0.16,1,0.3,1];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:'-60px'});
  const [open, setOpen] = useState(null);
  return (
    <section id="services" style={{ padding:'5rem var(--gutter)', borderBottom:'1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease}} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3.5rem', flexWrap:'wrap', gap:'1rem' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(2.2rem,5vw,3.5rem)', color:'var(--ink)', letterSpacing:'-0.045em', lineHeight:0.95 }}>What I Do</h2>
        </motion.div>
        {services.map((s,i) => (
          <motion.div key={s.id} initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*0.08,duration:0.6,ease}}>
            <div
              onClick={()=>setOpen(open===s.id?null:s.id)}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.75rem 0', borderBottom:'1px solid var(--border)', cursor:'pointer', gap:'2rem' }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.8rem', color:'var(--gold)', letterSpacing:'0.05em', minWidth:'2rem' }}>0{i+1}</span>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1.2rem,2.5vw,1.75rem)', color: open===s.id ? 'var(--gold)' : 'var(--ink)', letterSpacing:'-0.03em', transition:'color 0.25s' }}>{s.title}</h3>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
                <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', justifyContent:'flex-end' }}>
                  {s.tags.map(t=>(
                    <span key={t} style={{ fontFamily:'var(--font-body)', fontSize:'0.7rem', color:'var(--ink-3)', padding:'0.2rem 0.6rem', border:'1px solid var(--border)', borderRadius:20, whiteSpace:'nowrap' }}>{t}</span>
                  ))}
                </div>
                <div style={{ width:36, height:36, borderRadius:'50%', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'transform 0.3s, border-color 0.25s', borderColor: open===s.id ? 'var(--border-gold)' : 'var(--border)', transform: open===s.id ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {open===s.id && (
                <motion.div key="content" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.4,ease}} style={{ overflow:'hidden' }}>
                  <div style={{ padding:'1.5rem 0 2rem 4rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', alignItems:'start' }}>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--ink-3)', lineHeight:1.8 }}>{s.longDescription}</p>
                    <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                      {s.features.map(f=>(
                        <li key={f} style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--ink-2)', padding:'0.5rem 0', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:'0.75rem' }}>
                          <span style={{ color:'var(--gold)', fontSize:'0.6rem' }}>◆</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
