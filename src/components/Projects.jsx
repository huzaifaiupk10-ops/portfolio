import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/portfolioData';
const ease = [0.16,1,0.3,1];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:'-60px'});
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const list = projects.slice(0,6);
  return (
    <section id="work" style={{ padding:'5rem var(--gutter)', borderBottom:'1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease}} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3.5rem', flexWrap:'wrap', gap:'1rem' }}>
          <h2 className="metallic" style={{ fontFamily:'var(--font-serif)', fontWeight:700, fontSize:'clamp(2.4rem,5vw,3.75rem)', letterSpacing:'-0.02em', lineHeight:0.95 }}>Selected Work</h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--ink-3)' }}>{list.length} Projects</p>
        </motion.div>
        <div style={{ position:'relative' }}>
          {list.map((p,i) => (
            <motion.div
              key={p.id}
              initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*0.07,duration:0.6,ease}}
              onMouseEnter={()=>setHovered(p.id)}
              onMouseLeave={()=>setHovered(null)}
              onClick={()=>navigate('/project/'+p.id)}
              style={{ display:'grid', gridTemplateColumns:'3.5rem 1fr auto', alignItems:'center', gap:'2rem', padding:'1.6rem 0', borderBottom:'1px solid var(--border)', cursor:'pointer', transition:'padding 0.25s', position:'relative' }}
            >
              {/* hover bg */}
              <AnimatePresence>
                {hovered===p.id && (
                  <motion.div key="bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.2}} style={{ position:'absolute', inset:0, background:'rgba(201,168,76,0.04)', borderRadius:8, pointerEvents:'none' }} />
                )}
              </AnimatePresence>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.8rem', color: hovered===p.id ? 'var(--gold)' : 'var(--ink-3)', transition:'color 0.2s', letterSpacing:'0.05em' }}>0{i+1}</span>
              <div>
                <p style={{ fontFamily:'var(--font-serif)', fontWeight:600, fontSize:'clamp(1.2rem,2.2vw,1.6rem)', color:'var(--ink)', letterSpacing:'-0.01em', marginBottom:'0.3rem', transition:'color 0.2s' }}>{p.title}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                  {p.tags.slice(0,3).map(t=>(
                    <span key={t} style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'var(--ink-3)', padding:'0.2rem 0.6rem', border:'1px solid var(--border)', borderRadius:20 }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
                <AnimatePresence>
                  {hovered===p.id && (
                    <motion.div key="img" initial={{opacity:0,scale:0.9,x:20}} animate={{opacity:1,scale:1,x:0}} exit={{opacity:0,scale:0.9,x:20}} transition={{duration:0.3,ease}} style={{ width:130, height:85, borderRadius:10, overflow:'hidden', flexShrink:0 }}>
                      <img src={p.image} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>e.currentTarget.style.display='none'} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div style={{ width:40, height:40, borderRadius:'50%', border:'1px solid', borderColor: hovered===p.id ? 'var(--gold)' : 'var(--border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'border-color 0.2s, background 0.2s', background: hovered===p.id ? 'var(--gold)' : 'transparent' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hovered===p.id?'#0A0A0A':'var(--ink-3)'} strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
