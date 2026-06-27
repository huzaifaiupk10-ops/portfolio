import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '../data/portfolioData';
const ease = [0.16,1,0.3,1];
const SKILLS = [
  { name:'Web Development', pct:95 },
  { name:'UI/UX Design', pct:90 },
  { name:'AI Systems', pct:85 },
  { name:'Branding', pct:75 },
];
export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  return (
    <section id="about" style={{ padding:'clamp(4rem,7vw,7rem) var(--gutter)', borderTop:'1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,ease}} style={{ background:'var(--card)', borderRadius:20, padding:'clamp(2rem,4vw,3rem)', display:'flex', gap:'2.5rem', alignItems:'center', flexWrap:'wrap' }}>
          <div style={{ flex:'0 0 130px', display:'flex', justifyContent:'center', alignItems:'center' }}>
            <div style={{ width:120, height:120, borderRadius:'50%', background:'radial-gradient(circle at 35% 35%, #2A2200, #0A0A00)', border:'1px solid rgba(201,168,76,0.2)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 40px rgba(201,168,76,0.08)' }}>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'2.75rem', color:'var(--gold)', letterSpacing:'-0.04em' }}>H</span>
            </div>
          </div>
          <div style={{ flex:'1 1 260px' }}>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.75rem', color:'var(--gold)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.75rem' }}>About Me</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(1.5rem,3vw,2.25rem)', color:'var(--ink)', letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'1rem', maxWidth:'20ch' }}>Crafting digital experiences with passion.</h2>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:400, fontSize:'0.9rem', color:'var(--ink-3)', lineHeight:1.75, marginBottom:'1.5rem', maxWidth:'42ch' }}>{personal.about.slice(0,200)}...</p>
            <a href="#contact" style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.875rem', color:'var(--ink)', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, padding:'0.55rem 1.25rem', border:'1px solid var(--border)', borderRadius:8, transition:'all 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-gold)';e.currentTarget.style.color='var(--gold)'}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--ink)'}}>More About Me <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a>
          </div>
          <div style={{ flex:'0 0 240px' }}>
            {SKILLS.map(({name,pct},i) => (
              <div key={name} style={{ marginBottom:'1.25rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                  <span style={{ fontFamily:'var(--font-body)', fontWeight:500, fontSize:'0.8rem', color:'var(--ink-2)' }}>{name}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.8rem', color:'var(--gold)' }}>{pct}%</span>
                </div>
                <div style={{ height:4, background:'rgba(255,255,255,0.07)', borderRadius:4, overflow:'hidden' }}>
                  <motion.div
                    initial={{ width:0 }}
                    animate={inView ? { width: pct + '%' } : { width: 0 }}
                    transition={{ delay:0.4+i*0.1, duration:0.9, ease }}
                    style={{ height:'100%', background:'linear-gradient(90deg, var(--gold), #E8C96A)', borderRadius:4 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
