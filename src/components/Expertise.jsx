import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const ease = [0.16,1,0.3,1];
const SKILLS = ['React & Next.js','UI/UX Design','AI Agents & Automation','Brand Identity','Figma & Framer','Prompt Engineering'];
export default function Expertise() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:'-80px'});
  return (
    <section id="about" style={{minHeight:'100vh',display:'flex',alignItems:'center',borderTop:'1px solid rgba(255,255,255,0.06)',position:'relative',overflow:'hidden'}}>
      {/* ambient glow */}
      <div style={{position:'absolute',left:'30%',top:'50%',transform:'translate(-50%,-50%)',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)',pointerEvents:'none'}} />
      <div ref={ref} style={{maxWidth:'var(--max-w)',margin:'0 auto',padding:'0 var(--gutter)',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'center',width:'100%'}}>
        {/* Left: image */}
        <motion.div initial={{opacity:0,scale:0.9}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:1.2,ease}} style={{height:500,position:'relative',borderRadius:16,overflow:'hidden'}}>
          <img src="/images/expertise-visual.png" alt="About" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',display:'block'}} />
        </motion.div>
        {/* Right: text */}
        <div>
          <motion.p initial={{opacity:0,y:8}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5}} style={{fontFamily:'var(--font-body)',fontWeight:500,fontSize:'0.72rem',color:'var(--gold)',letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:'1.5rem'}}>About</motion.p>
          {['About','Me.'].map((line,i)=>(
            <div key={i} style={{overflow:'hidden'}}>
              <motion.div initial={{y:'108%'}} animate={inView?{y:'0%'}:{}} transition={{delay:i*0.12,duration:0.9,ease}} className="metallic" style={{fontFamily:'var(--font-serif)',fontWeight:700,fontSize:'clamp(3rem,6vw,5rem)',letterSpacing:'-0.03em',lineHeight:0.9,paddingBottom:'0.06em'}}>{line}</motion.div>
            </div>
          ))}
          <motion.p initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.35,duration:0.7}} style={{fontFamily:'var(--font-body)',fontSize:'0.88rem',color:'var(--ink-3)',lineHeight:1.9,marginTop:'2rem',marginBottom:'2.5rem',maxWidth:'46ch'}}>
            I am currently pursuing a <span style={{color:'var(--ink)',fontWeight:600}}>Bachelor's degree in Information Technology</span>, with a strong focus on modern web development, AI automation, agentic systems, and strategic branding. I specialize in creating premium digital solutions that combine clean design, responsive development, intelligent workflows, and strong brand identity.
            <br /><br />
            My focus is on building visually refined websites that not only look professional but also perform smoothly across every device. I also create AI-powered automation systems that help businesses save time, improve efficiency, and scale with confidence. Every project is built with a strong focus on user experience, technical quality, and real business impact.
          </motion.p>
          <motion.div initial={{opacity:0,y:10}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.5,duration:0.6}} style={{display:'flex',flexWrap:'wrap',gap:'0.6rem'}}>
            {SKILLS.map(s=>(
              <span key={s} style={{fontFamily:'var(--font-body)',fontSize:'0.8rem',color:'var(--ink-2)',padding:'0.45rem 1rem',border:'1px solid rgba(255,255,255,0.1)',borderRadius:999,background:'rgba(255,255,255,0.03)',transition:'all 0.2s',cursor:'default'}} onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.4)';e.currentTarget.style.color='var(--gold)'}} onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='var(--ink-2)'}}>{s}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
