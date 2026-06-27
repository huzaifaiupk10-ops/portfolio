export default function Marquee() {
  const items = ['Web Development','UI/UX Design','AI Automation','Branding','React','Figma','Claude Code','Motion Design','Responsive','Product Strategy'];
  const text = items.map(i => i + ' · ').join('');
  return (
    <div style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', overflow:'hidden', padding:'1rem 0', background:'var(--bg)' }}>
      <div style={{ display:'flex', width:'max-content', animation:'marquee 28s linear infinite' }}>
        {[...Array(3)].map((_,r) => (
          <span key={r} style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(0.8rem,1.1vw,1rem)', color:'var(--ink-3)', letterSpacing:'0.06em', textTransform:'uppercase', whiteSpace:'nowrap', paddingRight:'2rem' }}>{text}</span>
        ))}
      </div>
    </div>
  );
}
