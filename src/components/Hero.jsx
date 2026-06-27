import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
const ThreeHeroObject = lazy(() => import('./ThreeHeroObject'));
const ease = [0.16, 1, 0.3, 1];
export default function Hero() {
  return (
    <section id="hero" style={{ minHeight:'100dvh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'80px var(--gutter) 3rem', position:'relative', overflow:'hidden' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', width:'100%', display:'flex', alignItems:'center', gap:'2rem' }}>
        <div style={{ flex:'0 0 52%', maxWidth:'52%' }}>
          <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.5,duration:0.5,ease}} style={{fontFamily:'var(--font-body)',fontWeight:500,fontSize:'1rem',color:'var(--gold)',marginBottom:'0.75rem'}}>Hello, I am</motion.p>
          <div style={{marginBottom:'1.25rem'}}>
            {["Huzaifa","Imran"].map((w,i)=>(
              <div key={w} style={{overflow:'hidden',lineHeight:0.9}}>
                <motion.div initial={{y:"110%"}} animate={{y:"0%"}} transition={{delay:1.4+i*0.12,duration:0.85,ease}} style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'clamp(3.5rem,8vw,6.5rem)',color:'var(--ink)',letterSpacing:'-0.04em',lineHeight:0.9,paddingBottom:'0.08em',display:'block'}}>{w}</motion.div>
              </div>
            ))}
          </div>
          <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.75,duration:0.55,ease}} style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:'clamp(0.95rem,1.4vw,1.1rem)',color:'var(--ink-2)',marginBottom:'1rem'}}>Web Developer &amp; UI/UX Designer &amp; AI Builder</motion.p>
          <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.9,duration:0.55,ease}} style={{fontFamily:'var(--font-body)',fontWeight:400,fontSize:'clamp(0.875rem,1.1vw,0.975rem)',color:'var(--ink-3)',maxWidth:'40ch',lineHeight:1.7,marginBottom:'2.25rem'}}>I create immersive digital experiences, refined interfaces, and AI-powered systems that elevate brands and engage users.</motion.p>
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:2.05,duration:0.55,ease}} style={{display:'flex',gap:'0.875rem',flexWrap:'wrap',marginBottom:'2.5rem'}}>
            <a href="#work" style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.9rem',color:'#0A0A0A',textDecoration:'none',display:'flex',alignItems:'center',gap:8,padding:'0.7rem 1.5rem',background:'var(--gold)',borderRadius:8,transition:'transform 0.2s ease, box-shadow 0.2s ease'}} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(201,168,76,0.4)'}} onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}>View My Work <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a>
            <a href="#about" style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.9rem',color:'var(--ink)',textDecoration:'none',padding:'0.7rem 1.5rem',border:'1px solid var(--border)',borderRadius:8,transition:'border-color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>About Me</a>
          </motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.3,duration:0.5}} style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:22,height:36,borderRadius:12,border:'1.5px solid var(--ink-3)',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'5px 0'}}>
              <motion.div animate={{y:[0,10,0]}} transition={{duration:1.8,repeat:Infinity,ease:'easeInOut'}} style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-3)'}} />
            </div>
            <span style={{fontFamily:'var(--font-body)',fontSize:'0.8rem',color:'var(--ink-3)'}}>Scroll Down</span>
          </motion.div>
        </div>
        <motion.div className="hero-right" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.6,duration:1}} style={{flex:'0 0 48%',maxWidth:'48%',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',minHeight:480}}>
          <div style={{position:'absolute',width:'75%',paddingBottom:'75%',top:'12%',left:'50%',transform:'translateX(-50%)',borderRadius:'50%',background:'radial-gradient(circle at 40% 40%, #3A2C0A 0%, #1A1200 55%, #0A0A00 100%)',border:'1px solid rgba(201,168,76,0.15)'}} />
          <div style={{position:'relative',width:'80%',height:420,zIndex:2,animation:'float-y 5s ease-in-out infinite'}}>
            <Suspense fallback={null}><ThreeHeroObject /></Suspense>
          </div>
          <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:2.2,duration:0.6,ease}} style={{position:'absolute',bottom:'8%',right:'-2%',background:'var(--card)',border:'1px solid var(--border)',borderRadius:12,padding:'0.75rem 1rem',minWidth:180,zIndex:3}}>
            <p style={{fontFamily:'var(--font-body)',fontSize:'0.65rem',color:'var(--ink-3)',marginBottom:'0.3rem'}}>Available for</p>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:'0.6rem'}}>
              <span style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.875rem',color:'var(--ink)'}}>Freelance</span>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#4CAF50',display:'inline-block',boxShadow:'0 0 6px rgba(76,175,80,0.8)'}} />
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
              {['#C9A84C','#8B7FC4','#4CAF50','#C4624C'].map((c,i)=>(
                <div key={i} style={{width:24,height:24,borderRadius:'50%',background:c,border:'2px solid var(--card)',marginLeft:i>0?-8:0,position:'relative',zIndex:4-i}} />
              ))}
              <span style={{fontFamily:'var(--font-body)',fontSize:'0.7rem',color:'var(--ink-3)',marginLeft:10}}>+10</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
