import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/portfolioData';
const ease = [0.16,1,0.3,1];
export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:'-60px'});
  const navigate = useNavigate();
  const featured = projects.slice(0,4);
  return (
    <section id="work" style={{padding:'7rem var(--gutter)',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
      <div ref={ref} style={{maxWidth:'var(--max-w)',margin:'0 auto'}}>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,ease}} style={{marginBottom:'4rem'}}>
          <h2 className="metallic" style={{fontFamily:'var(--font-serif)',fontWeight:700,fontSize:'clamp(3rem,7vw,5.5rem)',letterSpacing:'-0.03em',lineHeight:0.9}}>Selected<br/>Work.</h2>
        </motion.div>
        {/* Large featured card */}
        <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1,duration:0.8,ease}} onClick={()=>navigate('/project/'+featured[0].id)} style={{position:'relative',height:480,borderRadius:20,overflow:'hidden',marginBottom:'1.25rem',cursor:'pointer',border:'1px solid rgba(255,255,255,0.06)'}}>
          <img src={featured[0].image} alt={featured[0].title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform 0.7s ease'}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'} onError={e=>e.currentTarget.style.display='none'} />
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,10,10,0.85) 0%,rgba(10,10,10,0.2) 50%,transparent 100%)'}} />
          <div style={{position:'absolute',bottom:'2rem',left:'2rem',right:'2rem',display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
            <div>
              <p style={{fontFamily:'var(--font-body)',fontSize:'0.72rem',color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.5rem'}}>{featured[0].tags.slice(0,2).join(' · ')}</p>
              <h3 style={{fontFamily:'var(--font-serif)',fontWeight:700,fontSize:'clamp(1.5rem,3vw,2.2rem)',color:'#fff',letterSpacing:'-0.02em'}}>{featured[0].title}</h3>
            </div>
            <div style={{width:48,height:48,borderRadius:'50%',background:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </div>
          </div>
        </motion.div>
        {/* 3-col smaller cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.25rem'}}>
          {featured.slice(1).map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.2+i*0.1,duration:0.7,ease}} onClick={()=>navigate('/project/'+p.id)} style={{position:'relative',height:280,borderRadius:16,overflow:'hidden',cursor:'pointer',border:'1px solid rgba(255,255,255,0.06)'}}>
              <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform 0.6s ease'}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'} onError={e=>e.currentTarget.style.display='none'} />
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,10,10,0.82) 0%,transparent 55%)'}} />
              <div style={{position:'absolute',bottom:'1.25rem',left:'1.25rem',right:'1.25rem'}}>
                <p style={{fontFamily:'var(--font-body)',fontSize:'0.68rem',color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.3rem'}}>{p.tags[0]}</p>
                <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:'1.1rem',color:'#fff',letterSpacing:'-0.01em'}}>{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
