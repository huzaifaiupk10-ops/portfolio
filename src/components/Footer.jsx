import { personal } from '../data/portfolioData';
export default function Footer() {
  const emailHref = 'mailto:' + personal.email;
  return (
    <footer style={{ borderTop:'1px solid var(--border)', padding:'3rem var(--gutter)' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'3rem', marginBottom:'3rem' }}>
          <div>
            <div style={{ fontFamily:'var(--font-display)',fontWeight:800,fontSize:'2rem',color:'var(--gold)',marginBottom:'1rem' }}>H</div>
            <p style={{ fontFamily:'var(--font-body)',fontSize:'0.875rem',color:'var(--ink-3)',lineHeight:1.7,maxWidth:'28ch' }}>Creating premium digital experiences that elevate brands.</p>
          </div>
          <div>
            <p style={{ fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.7rem',color:'var(--ink-3)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.75rem' }}>Email</p>
            <a href={emailHref} style={{ fontFamily:'var(--font-body)',fontSize:'0.85rem',color:'var(--ink-2)',textDecoration:'none',transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'} onMouseLeave={e=>e.currentTarget.style.color='var(--ink-2)'}>{personal.email}</a>
          </div>
          <div>
            <p style={{ fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.7rem',color:'var(--ink-3)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.75rem' }}>Location</p>
            <p style={{ fontFamily:'var(--font-body)',fontSize:'0.85rem',color:'var(--ink-2)' }}>Virginia, US</p>
          </div>
          <div>
            <p style={{ fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.7rem',color:'var(--ink-3)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.75rem' }}>Connect</p>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" style={{ fontFamily:'var(--font-body)',fontSize:'0.85rem',color:'var(--ink-2)',textDecoration:'none',display:'block',marginBottom:'0.4rem',transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'} onMouseLeave={e=>e.currentTarget.style.color='var(--ink-2)'}>LinkedIn</a>
          </div>
        </div>
        <div style={{ borderTop:'1px solid var(--border)',paddingTop:'1.5rem',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem' }}>
          <p style={{ fontFamily:'var(--font-body)',fontSize:'0.8rem',color:'var(--ink-3)' }}>© 2026 Huzaifa Imran</p>
          <p style={{ fontFamily:'var(--font-body)',fontSize:'0.8rem',color:'var(--ink-3)' }}>Web Developer · UI/UX · AI Builder</p>
        </div>
      </div>
    </footer>
  );
}
