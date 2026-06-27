import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '../data/portfolioData';
const ease = [0.16,1,0.3,1];
export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const emailHref = 'mailto:' + personal.email;
  return (
    <section id="contact" style={{ padding:'clamp(4rem,7vw,7rem) var(--gutter)', borderTop:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',pointerEvents:'none' }} />
      <div ref={ref} style={{ maxWidth:700,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1 }}>
        <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.5}} style={{ fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.75rem',color:'var(--gold)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'1.5rem' }}>Get In Touch</motion.p>
        {["Let's create something","extraordinary together."].map((line,i)=>(
          <div key={i} style={{ overflow:'hidden' }}>
            <motion.div initial={{y:'110%'}} animate={inView?{y:'0%'}:{}} transition={{delay:i*0.12,duration:0.85,ease}} style={{ fontFamily:'var(--font-display)',fontWeight:800,fontSize:'clamp(2rem,5vw,4rem)',color:i===0?'var(--ink)':'var(--gold)',letterSpacing:'-0.04em',lineHeight:0.95,paddingBottom:'0.06em',display:'block' }}>{line}</motion.div>
          </div>
        ))}
        <motion.p initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.4,duration:0.6}} style={{ fontFamily:'var(--font-body)',fontSize:'0.9rem',color:'var(--ink-3)',lineHeight:1.7,margin:'1.75rem auto 2.25rem',maxWidth:'38ch' }}>I design, build, and ship. Let us build something that stands out.</motion.p>
        <motion.a initial={{opacity:0,scale:0.96}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:0.5,duration:0.5}} href={emailHref} style={{ fontFamily:'var(--font-body)',fontWeight:600,fontSize:'1rem',color:'#0A0A0A',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:10,padding:'0.875rem 2rem',background:'var(--gold)',borderRadius:10,boxShadow:'0 8px 32px rgba(201,168,76,0.25)',transition:'transform 0.2s, box-shadow 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 16px 48px rgba(201,168,76,0.35)'}} onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 8px 32px rgba(201,168,76,0.25)'}}>
          {personal.email}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </motion.a>
      </div>
    </section>
  );
}
