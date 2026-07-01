import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];
const cinematic = [0.76, 0, 0.24, 1];

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY    = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} id="hero" style={{ minHeight:'100dvh', display:'flex', alignItems:'center', background:'var(--bg)', position:'relative', overflow:'hidden', paddingTop:64 }}>

      {/* ── Cinematic letterbox bars ── */}
      <motion.div
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ delay: 0.7, duration: 1.1, ease: cinematic }}
        style={{ position:'absolute', top:0, left:0, right:0, height:'10%', background:'#0A0A0A', transformOrigin:'top', zIndex:25, pointerEvents:'none' }}
      />
      <motion.div
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ delay: 0.7, duration: 1.1, ease: cinematic }}
        style={{ position:'absolute', bottom:0, left:0, right:0, height:'10%', background:'#0A0A0A', transformOrigin:'bottom', zIndex:25, pointerEvents:'none' }}
      />

      {/* ── Gold scan line ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [1, 1, 0.6, 0] }}
        transition={{ delay: 0.8, duration: 1.4, ease, times: [0, 0.45, 0.7, 1] }}
        style={{ position:'absolute', top:'50%', left:0, right:0, height:'1px', background:'linear-gradient(to right, transparent 0%, rgba(201,168,76,0.7) 30%, rgba(201,168,76,0.9) 50%, rgba(201,168,76,0.7) 70%, transparent 100%)', transformOrigin:'left', zIndex:26, pointerEvents:'none' }}
      />

      {/* ── Left: text ── */}
      <motion.div style={{ y: textY, flex:'0 0 52%', maxWidth:'52%', padding:'4rem var(--gutter) 4rem clamp(1.25rem,6vw,6rem)', position:'relative', zIndex:10 }}>

        {/* "Hello, I'm" with gold underline draw */}
        <div style={{ marginBottom:'0.9rem', position:'relative', display:'inline-block' }}>
          <motion.p
            initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:1.5, duration:0.6, ease }}
            style={{ fontFamily:'var(--font-serif)', fontWeight:500, fontSize:'1.2rem', color:'var(--gold)', letterSpacing:'0.02em' }}
          >
            Hello, I'm
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.6, ease }}
            style={{ height:'1px', background:'linear-gradient(to right, var(--gold), transparent)', transformOrigin:'left', marginTop:'0.2rem' }}
          />
        </div>

        {/* Name — clip reveal */}
        <div style={{ marginBottom:'1.1rem' }}>
          {['Huzaifa','Imran'].map((w,i) => (
            <div key={w} style={{ overflow:'hidden' }}>
              <motion.div
                initial={{ y:'110%', rotateX:12 }} animate={{ y:'0%', rotateX:0 }}
                transition={{ delay:1.35+i*0.15, duration:1.0, ease }}
                className="metallic"
                style={{ fontFamily:'var(--font-serif)', fontWeight:700, fontSize:'clamp(3.8rem,8.5vw,7rem)', letterSpacing:'-0.03em', lineHeight:0.88, paddingBottom:'0.07em', display:'block', transformOrigin:'bottom' }}
              >{w}</motion.div>
            </div>
          ))}
        </div>

        {/* Role — blur in */}
        <motion.p
          initial={{ opacity:0, filter:'blur(8px)', y:6 }} animate={{ opacity:1, filter:'blur(0px)', y:0 }}
          transition={{ delay:1.8, duration:0.8, ease }}
          style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'clamp(0.9rem,1.3vw,1.05rem)', color:'var(--ink-2)', marginBottom:'0.9rem' }}
        >
          Web Developer & UI/UX Designer & AI Builder
        </motion.p>

        {/* Description — blur in */}
        <motion.p
          initial={{ opacity:0, filter:'blur(6px)', y:8 }} animate={{ opacity:1, filter:'blur(0px)', y:0 }}
          transition={{ delay:1.95, duration:0.8, ease }}
          style={{ fontFamily:'var(--font-body)', fontWeight:400, fontSize:'clamp(0.85rem,1vw,0.95rem)', color:'var(--ink-3)', maxWidth:'38ch', lineHeight:1.75, marginBottom:'2.25rem' }}
        >
          I create immersive digital experiences, refined interfaces, and AI-powered systems that elevate brands and engage users.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:2.1, duration:0.6, ease }}
          style={{ display:'flex', gap:'0.875rem', flexWrap:'wrap', marginBottom:'2.75rem' }}
        >
          <a href="#work"
            style={{ fontFamily:'var(--font-serif)', fontWeight:600, fontSize:'1rem', color:'#0A0A0A', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, padding:'0.72rem 1.6rem', background:'var(--gold)', borderRadius:8, letterSpacing:'0.01em', transition:'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 28px rgba(201,168,76,0.45)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}>
            View My Work
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
          <a href="#about"
            style={{ fontFamily:'var(--font-serif)', fontWeight:500, fontSize:'1rem', color:'var(--ink)', textDecoration:'none', padding:'0.72rem 1.6rem', border:'1px solid var(--border)', borderRadius:8, letterSpacing:'0.01em', transition:'border-color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
            About Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:2.4, duration:0.6 }}
          style={{ display:'flex', alignItems:'center', gap:10 }}
        >
          <div style={{ width:22, height:36, borderRadius:12, border:'1.5px solid var(--ink-3)', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'5px 0' }}>
            <motion.div animate={{ y:[0,10,0] }} transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }} style={{ width:3, height:3, borderRadius:'50%', background:'var(--ink-3)' }} />
          </div>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'var(--ink-3)' }}>Scroll Down</span>
        </motion.div>
      </motion.div>

      {/* ── Right: photo ── */}
      <motion.div
        style={{ opacity: imageOpacity, position:'absolute', right:0, top:0, bottom:0, width:'50%', overflow:'hidden' }}
      >
        {/* Clip-path wipe reveal */}
        <motion.div
          initial={{ clipPath:'inset(0 100% 0 0)' }} animate={{ clipPath:'inset(0 0% 0 0)' }}
          transition={{ delay:1.1, duration:1.3, ease: [0.65, 0, 0.35, 1] }}
          style={{ position:'absolute', inset:0 }}
        >
          {/* Ken Burns slow zoom */}
          <motion.div
            initial={{ scale:1.15 }} animate={{ scale:1 }}
            transition={{ delay:1.1, duration:4.5, ease:'easeOut' }}
            style={{ width:'100%', height:'100%', willChange:'transform' }}
          >
            {/* Parallax on scroll */}
            <motion.div style={{ y: imageY, width:'100%', height:'108%', marginTop:'-4%' }}>
              <img
                src="/hero-photo.png" alt="Huzaifa Imran"
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'80% top', display:'block' }}
              />
            </motion.div>
          </motion.div>

          {/* Film grain overlay */}
          <div style={{
            position:'absolute', inset:0, zIndex:3, pointerEvents:'none',
            backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            opacity:0.045, mixBlendMode:'overlay',
          }} />

          {/* Light flare sweep */}
          <motion.div
            initial={{ x:'-100%', opacity:0 }}
            animate={{ x:'220%', opacity:[0, 0.7, 0] }}
            transition={{ delay:2.0, duration:1.2, ease:'easeOut' }}
            style={{ position:'absolute', top:0, bottom:0, width:'25%', background:'linear-gradient(90deg, transparent, rgba(201,168,76,0.18), rgba(255,255,255,0.06), transparent)', zIndex:4, pointerEvents:'none', transform:'skewX(-12deg)' }}
          />

          {/* Second subtle flare */}
          <motion.div
            initial={{ x:'-100%', opacity:0 }}
            animate={{ x:'220%', opacity:[0, 0.4, 0] }}
            transition={{ delay:2.35, duration:1.0, ease:'easeOut' }}
            style={{ position:'absolute', top:0, bottom:0, width:'12%', background:'linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)', zIndex:4, pointerEvents:'none', transform:'skewX(-12deg)' }}
          />
        </motion.div>

        {/* Edge gradients (outside clip so they always show) */}
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'42%', background:'linear-gradient(to right, #0A0A0A 0%, transparent 100%)', zIndex:5, pointerEvents:'none' }} />
        <div style={{ position:'absolute', left:0, right:0, top:0, height:'22%', background:'linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)', zIndex:5, pointerEvents:'none' }} />
        <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'22%', background:'linear-gradient(to top, #0A0A0A 0%, transparent 100%)', zIndex:5, pointerEvents:'none' }} />

        {/* Cinematic gold corner accent */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:2.5, duration:0.8 }}
          style={{ position:'absolute', top:'10%', right:'6%', zIndex:6, pointerEvents:'none' }}
        >
          <div style={{ width:40, height:1, background:'var(--gold)', opacity:0.5, marginBottom:4 }} />
          <div style={{ width:1, height:40, background:'var(--gold)', opacity:0.5 }} />
        </motion.div>
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:2.6, duration:0.8 }}
          style={{ position:'absolute', bottom:'10%', right:'6%', zIndex:6, pointerEvents:'none' }}
        >
          <div style={{ width:1, height:40, background:'var(--gold)', opacity:0.5, marginBottom:4 }} />
          <div style={{ width:40, height:1, background:'var(--gold)', opacity:0.5 }} />
        </motion.div>
      </motion.div>

    </section>
  );
}
