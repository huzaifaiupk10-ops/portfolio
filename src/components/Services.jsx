import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const ease = [0.16,1,0.3,1];
const S = [
  { icon:'◈', title:'Web Development', desc:'Fast, responsive, modern websites built to perform and convert.' },
  { icon:'◇', title:'UI/UX Design', desc:'Intuitive interfaces that look premium and feel effortless to use.' },
  { icon:'⬡', title:'AI Automation', desc:'Intelligent agents and workflows that save time and scale operations.' },
  { icon:'✦', title:'Brand Identity', desc:'Visual identity systems that make your brand impossible to ignore.' },
];
export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  return (
    <section id="services" style={{ padding:'clamp(4rem,7vw,7rem) var(--gutter)', borderTop:'1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
        <motion.h2 initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.65,ease}} style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)', color:'var(--ink)', letterSpacing:'-0.04em', marginBottom:'2.5rem' }}>What I Do</motion.h2>
        <div className="services-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.25rem' }}>
          {S.map(({icon,title,desc},i) => (
            <motion.div key={title} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*0.08,duration:0.65,ease}} style={{ background:'var(--card)', borderRadius:'var(--radius)', padding:'1.75rem 1.5rem', border:'1px solid var(--border)', transition:'border-color 0.25s, transform 0.25s' }} onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-gold)';e.currentTarget.style.transform='translateY(-4px)'}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform=''}}>
              <div style={{ width:44,height:44,borderRadius:10,background:'var(--gold-dim)',border:'1px solid var(--border-gold)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1.25rem' }}>
                <span style={{ fontFamily:'var(--font-display)',fontSize:'1.1rem',color:'var(--gold)' }}>{icon}</span>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1rem',color:'var(--ink)',letterSpacing:'-0.02em',marginBottom:'0.6rem' }}>{title}</h3>
              <p style={{ fontFamily:'var(--font-body)',fontSize:'0.83rem',color:'var(--ink-3)',lineHeight:1.7,marginBottom:'1.25rem' }}>{desc}</p>
              <a href="#contact" style={{ fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.8rem',color:'var(--gold)',textDecoration:'none',display:'flex',alignItems:'center',gap:6 }}>Learn More <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
