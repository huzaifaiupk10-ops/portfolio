import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '../data/portfolioData';
const ease = [0.16,1,0.3,1];
export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:'-80px'});
  return (
    <section id="about" style={{ padding:'5rem var(--gutter)', borderBottom:'1px solid var(--border)' }}>
      <div ref={ref} style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
        <div>
          {['The person','behind the work.'].map((line,i)=>(
            <div key={i} style={{ overflow:'hidden' }}>
              <motion.div initial={{y:'105%'}} animate={inView?{y:'0%'}:{}} transition={{delay:i*0.12,duration:0.9,ease}} style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(2rem,4.5vw,3.25rem)', color: i===1?'var(--gold)':'var(--ink)', letterSpacing:'-0.045em', lineHeight:0.95, paddingBottom:'0.06em' }}>{line}</motion.div>
            </div>
          ))}
          <motion.p initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.35,duration:0.7}} style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--ink-3)', lineHeight:1.85, marginTop:'2rem', maxWidth:'44ch' }}>{personal.about}</motion.p>
          <motion.a initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.55,duration:0.5}} href={'mailto:'+personal.email} style={{ display:'inline-flex', alignItems:'center', gap:10, marginTop:'2.25rem', fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.875rem', color:'var(--ink)', textDecoration:'none', borderBottom:'1px solid var(--border)', paddingBottom:'0.3rem', transition:'color 0.2s, border-color 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='var(--gold)';e.currentTarget.style.borderColor='var(--gold)'}} onMouseLeave={e=>{e.currentTarget.style.color='var(--ink)';e.currentTarget.style.borderColor='var(--border)'}}>
            Get In Touch
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </motion.a>
        </div>
        <motion.div initial={{opacity:0,x:30}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.2,duration:0.9,ease}}>
          {[['Web Development','95'],['UI/UX Design','90'],['AI Systems','85'],['Branding','75'],['Prompt Engineering','80']].map(([name,pct],i)=>(
            <div key={name} style={{ marginBottom:'1.5rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem' }}>
                <span style={{ fontFamily:'var(--font-body)', fontWeight:500, fontSize:'0.85rem', color:'var(--ink-2)' }}>{name}</span>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.85rem', color:'var(--gold)' }}>{pct}%</span>
              </div>
              <div style={{ height:3, background:'rgba(255,255,255,0.07)', borderRadius:4, overflow:'hidden' }}>
                <motion.div initial={{width:0}} animate={inView?{width:pct+'%'}:{}} transition={{delay:0.3+i*0.1,duration:1,ease}} style={{ height:'100%', background:'linear-gradient(90deg,var(--gold),#E8C96A)', borderRadius:4 }} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
