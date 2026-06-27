import { motion } from 'framer-motion';
const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight:'100dvh', display:'flex', alignItems:'center', background:'var(--bg)', position:'relative', overflow:'hidden', paddingTop:64 }}>

      {/* Left: text */}
      <div style={{ flex:'0 0 52%', maxWidth:'52%', padding:'4rem var(--gutter) 4rem clamp(1.25rem,6vw,6rem)', position:'relative', zIndex:2 }}>

        <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:1.5,duration:0.5,ease}} style={{ fontFamily:'var(--font-body)', fontWeight:500, fontSize:'1rem', color:'var(--gold)', marginBottom:'0.9rem' }}>
          Hello, I'm
        </motion.p>

        <div style={{ marginBottom:'1.1rem' }}>
          {['Huzaifa','Imran'].map((w,i) => (
            <div key={w} style={{ overflow:'hidden' }}>
              <motion.div
                initial={{y:'110%'}} animate={{y:'0%'}}
                transition={{delay:1.35+i*0.13, duration:0.9, ease}}
                style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(3.8rem,8.5vw,7rem)', color:'var(--ink)', letterSpacing:'-0.045em', lineHeight:0.88, paddingBottom:'0.07em', display:'block' }}
              >{w}</motion.div>
            </div>
          ))}
        </div>

        <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.75,duration:0.55,ease}} style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'clamp(0.9rem,1.3vw,1.05rem)', color:'var(--ink-2)', marginBottom:'0.9rem' }}>
          Web Developer & UI/UX Designer & AI Builder
        </motion.p>

        <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.9,duration:0.55,ease}} style={{ fontFamily:'var(--font-body)', fontWeight:400, fontSize:'clamp(0.85rem,1vw,0.95rem)', color:'var(--ink-3)', maxWidth:'38ch', lineHeight:1.75, marginBottom:'2.25rem' }}>
          I create immersive digital experiences, refined interfaces, and AI-powered systems that elevate brands and engage users.
        </motion.p>

        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:2.05,duration:0.55,ease}} style={{ display:'flex', gap:'0.875rem', flexWrap:'wrap', marginBottom:'2.75rem' }}>
          <a href="#work"
            style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.9rem', color:'#0A0A0A', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, padding:'0.72rem 1.6rem', background:'var(--gold)', borderRadius:8, transition:'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 28px rgba(201,168,76,0.45)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}>
            View My Work
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
          <a href="#about"
            style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.9rem', color:'var(--ink)', textDecoration:'none', padding:'0.72rem 1.6rem', border:'1px solid var(--border)', borderRadius:8, transition:'border-color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
            About Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.3,duration:0.5}} style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:22, height:36, borderRadius:12, border:'1.5px solid var(--ink-3)', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'5px 0' }}>
            <motion.div animate={{y:[0,10,0]}} transition={{duration:1.8, repeat:Infinity, ease:'easeInOut'}} style={{ width:3, height:3, borderRadius:'50%', background:'var(--ink-3)' }} />
          </div>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'var(--ink-3)' }}>Scroll Down</span>
        </motion.div>
      </div>

      {/* Right: photo */}
      <motion.div
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:1.2}}
        style={{ position:'absolute', right:0, top:0, bottom:0, width:'50%', overflow:'hidden' }}
      >
        {/* Left fade so photo blends into bg */}
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'40%', background:'linear-gradient(to right, #0A0A0A 0%, transparent 100%)', zIndex:2, pointerEvents:'none' }} />
        {/* Top + bottom fades */}
        <div style={{ position:'absolute', left:0, right:0, top:0, height:'20%', background:'linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'20%', background:'linear-gradient(to top, #0A0A0A 0%, transparent 100%)', zIndex:2, pointerEvents:'none' }} />

        <img
          src="/hero-photo.png"
          alt="Huzaifa Imran"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }}
        />

        {/* Available card */}
        <motion.div
          initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:2.2,duration:0.6,ease}}
          style={{ position:'absolute', bottom:'10%', right:'8%', background:'rgba(20,20,20,0.9)', backdropFilter:'blur(16px)', border:'1px solid var(--border)', borderRadius:14, padding:'0.9rem 1.1rem', minWidth:185, zIndex:4 }}
        >
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', color:'var(--ink-3)', marginBottom:'0.35rem' }}>Available for</p>
          <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:'0.65rem' }}>
            <span style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:'0.9rem', color:'var(--ink)' }}>Freelance</span>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#4CAF50', boxShadow:'0 0 7px rgba(76,175,80,0.9)' }} />
          </div>
          <div style={{ display:'flex', alignItems:'center' }}>
            {['#C9A84C','#7C6FC4','#4CAF50','#C45C4C'].map((c,i) => (
              <div key={i} style={{ width:26, height:26, borderRadius:'50%', background:c, border:'2px solid #141414', marginLeft:i>0?-9:0, position:'relative', zIndex:4-i }} />
            ))}
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'var(--ink-3)', marginLeft:10 }}>+10</span>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
