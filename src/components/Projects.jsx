import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/portfolioData";
const ease = [0.16,1,0.3,1];
function ProjectCard({project,index,inView}) {
  const navigate = useNavigate();
  const [hov,setHov] = [false,()=>{}];
  return (
    <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:index*0.08,duration:0.65,ease}} onClick={()=>navigate(`/project/${project.id}`)} onMouseEnter={e=>{e.currentTarget.querySelector(".card-img").style.transform="scale(1.05)";e.currentTarget.style.borderColor="var(--border-gold)"}} onMouseLeave={e=>{e.currentTarget.querySelector(".card-img").style.transform="scale(1)";e.currentTarget.style.borderColor="var(--border)"}} style={{background:"var(--card)",borderRadius:"var(--radius)",overflow:"hidden",border:"1px solid var(--border)",cursor:"pointer",transition:"border-color 0.3s"}}>
      <div style={{height:220,overflow:"hidden",position:"relative",background:"#0D0D0D"}}>
        <img className="card-img" src={project.image} alt={project.title} style={{width:"100%",height:"100%",objectFit:project.objectFit||"cover",display:"block",transition:"transform 0.55s ease"}} onError={e=>{e.currentTarget.style.display="none"}} />
      </div>
      <div style={{padding:"1.1rem 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <p style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"1rem",color:"var(--ink)",letterSpacing:"-0.02em",marginBottom:"0.2rem"}}>{project.title}</p>
          <p style={{fontFamily:"var(--font-body)",fontWeight:400,fontSize:"0.78rem",color:"var(--ink-3)"}}>{project.tags.slice(0,2).join(" & ")}</p>
        </div>
        <div style={{width:32,height:32,borderRadius:"50%",border:"1px solid var(--border-gold)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </div>
      </div>
    </motion.div>
  );
}
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:"-60px"});
  return (
    <section id="work" style={{padding:"clamp(4rem,7vw,7rem) var(--gutter)",borderTop:"1px solid var(--border)"}}>
      <div ref={ref} style={{maxWidth:"var(--max-w)",margin:"0 auto"}}>
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.65,ease}} style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"2.5rem",flexWrap:"wrap",gap:"1rem"}}>
          <div>
            <p style={{fontFamily:"var(--font-body)",fontWeight:600,fontSize:"0.75rem",color:"var(--gold)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"0.5rem"}}>Featured Work</p>
            <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",color:"var(--ink)",letterSpacing:"-0.04em",lineHeight:1}}>Designs That<br/>Speak.</h2>
          </div>
          <a href="#" style={{fontFamily:"var(--font-body)",fontWeight:600,fontSize:"0.875rem",color:"var(--ink)",textDecoration:"none",display:"flex",alignItems:"center",gap:8,padding:"0.6rem 1.25rem",background:"var(--card)",border:"1px solid var(--border)",borderRadius:8,transition:"border-color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="var(--border-gold)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>View All Work <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a>
        </motion.div>
        <div className="projects-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem"}}>
          {projects.slice(0,6).map((p,i)=><ProjectCard key={p.id} project={p} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}
