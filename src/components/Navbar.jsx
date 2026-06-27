import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['Home','About','Work','Services','Contact'];
  const hrefs = ['#hero','#about','#work','#services','#contact'];
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,height:64,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(1.25rem,4vw,3.5rem)',background:scrolled?'rgba(10,10,10,0.92)':'transparent',backdropFilter:scrolled?'blur(20px)':'none',borderBottom:scrolled?'1px solid var(--border)':'none',transition:'all 0.3s ease'}}>
      <a href='/' style={{textDecoration:'none'}}><span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.75rem',color:'var(--gold)',letterSpacing:'-0.04em'}}>H</span></a>
      <div className='nav-links' style={{display:'flex',gap:'2rem'}}>
        {links.map((l,i)=><a key={l} href={hrefs[i]} style={{fontFamily:'var(--font-body)',fontWeight:500,fontSize:'0.875rem',color:'var(--ink-2)',textDecoration:'none',transition:'color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='var(--ink-2)'}>{l}</a>)}
      </div>
      <a href='#contact' style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.875rem',color:'var(--ink)',textDecoration:'none',display:'flex',alignItems:'center',gap:8,padding:'0.5rem 1.25rem',background:'rgba(255,255,255,0.06)',border:'1px solid var(--border)',borderRadius:999,transition:'all 0.2s'}} onMouseEnter={e=>{e.currentTarget.style.background='var(--gold-dim)';e.currentTarget.style.borderColor='var(--border-gold)'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.borderColor='var(--border)'}}>Let's Talk <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'><line x1='7' y1='17' x2='17' y2='7'/><polyline points='7 7 17 7 17 17'/></svg></a>
    </nav>
  );
}