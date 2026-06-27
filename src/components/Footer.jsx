import { personal } from '../data/portfolioData';
export default function Footer() {
  return (
    <footer style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'2rem var(--gutter)'}}>
      <div style={{maxWidth:'var(--max-w)',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
        <span className="metallic" style={{fontFamily:'var(--font-serif)',fontWeight:700,fontSize:'2rem',letterSpacing:'-0.02em'}}>H</span>
        <p style={{fontFamily:'var(--font-body)',fontSize:'0.78rem',color:'var(--ink-3)'}}>© 2026 Huzaifa Imran — All rights reserved</p>
        <div style={{display:'flex',gap:'1.5rem'}}>
          {[['Email','mailto:'+personal.email],['LinkedIn',personal.linkedin]].map(([label,href])=>(
            <a key={label} href={href} target={label==='LinkedIn'?'_blank':undefined} rel="noreferrer" style={{fontFamily:'var(--font-body)',fontSize:'0.78rem',color:'var(--ink-3)',textDecoration:'none',transition:'color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'} onMouseLeave={e=>e.currentTarget.style.color='var(--ink-3)'}>{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
