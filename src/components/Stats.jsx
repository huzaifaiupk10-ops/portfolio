import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const ease = [0.16,1,0.3,1];
const DATA = [
  { value:'20+', label:'Projects Built' },
  { value:'3+', label:'Years Experience' },
  { value:'10+', label:'AI Systems' },
  { value:'100%', label:'Client Focused' },
];
export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:'-60px'});
  return (
    <section ref={ref} style={{ padding:'5rem var(--gutter)', borderBottom:'1px solid var(--border)' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2rem' }}>
        {DATA.map(({value,label},i) => (
          <motion.div key={label} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*0.1,duration:0.7,ease}} style={{ borderLeft:'1px solid var(--border)', paddingLeft:'1.5rem' }}>
            <p style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(2.5rem,4vw,3.5rem)', color:'var(--ink)', letterSpacing:'-0.05em', lineHeight:1, marginBottom:'0.4rem' }}>{value}</p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--ink-3)', fontWeight:500 }}>{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
