import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '../data/portfolioData';
const ease = [0.16,1,0.3,1];
export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:'-60px'});
  return (
    <section id="contact" style={{ padding:'7rem var(--gutter) 6rem', borderBottom:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 80% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div ref={ref} style={{ maxWidth:'var(--max-w)', margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.5}} style={{ fontFamily:'var(--font-body)', fontWeight:500, fontSize:'0.8rem', color:'var(--ink-3)', marginBottom:'1.5rem' }}>Available for new projects</motion.p>
        <div style={{ overflow:'hidden', marginBottom:'0.25rem' }}>
          <motion.div initial={{y:'110%'}} animate={inView?{y:'0%'}:{}} transition={{duration:0.95,ease}} style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(3rem,8vw,7rem)', color:'var(--ink)', letterSpacing:'-0.05em', lineHeight:0.9 }}>Let's build</motion.div>
        </div>
        <div style={{ overflow:'hidden', marginBottom:'2.5rem' }}>
          <motion.div initial={{y:'110%'}} animate={inView?{y:'0%'}:{}} transition={{delay:0.1,duration:0.95,ease}} style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(3rem,8vw,7rem)', color:'var(--gold)', letterSpacing:'-0.05em', lineHeight:0.9 }}>something great.</motion.div>
        </div>
        <motion.a initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.35,duration:0.6}} href={'mailto:'+personal.email} style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(1rem,2vw,1.4rem)', color:'var(--ink-2)', textDecoration:'none', borderBottom:'1px solid var(--border)', paddingBottom:'0.25rem', display:'inline-block', transition:'color 0.2s, border-color 0.2s', letterSpacing:'-0.02em' }} onMouseEnter={e=>{e.currentTarget.style.color='var(--gold)';e.currentTarget.style.borderColor='var(--gold)'}} onMouseLeave={e=>{e.currentTarget.style.color='var(--ink-2)';e.currentTarget.style.borderColor='var(--border)'}}>
          {personal.email}
        </motion.a>
      </div>
    </section>
  );
}
