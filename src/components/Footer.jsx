import { personal } from '../data/portfolioData';
export default function Footer() {
  return (
    <footer style={{ padding:'2.5rem var(--gutter)' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1.25rem' }}>
        <span className="metallic" style={{ fontFamily:'var(--font-serif)', fontWeight:700, fontSize:'2rem', letterSpacing:'-0.02em' }}>H</span>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--ink-3)' }}>© 2026 Huzaifa Imran — Web Developer, UI/UX Designer, AI Builder</p>
        <div style={{ display:'flex', gap:'1.5rem' }}>
          <a href={'mailto:'+personal.email} style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--ink-3)', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'} onMouseLeave={e=>e.currentTarget.style.color='var(--ink-3)'}>Email</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'var(--ink-3)', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'} onMouseLeave={e=>e.currentTarget.style.color='var(--ink-3)'}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
