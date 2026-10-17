import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ease = [0.16, 1, 0.3, 1];
const clamp = (n, a = 0, b = 1) => (n < a ? a : n > b ? b : n);

const SERVICES = [
  { num: '01', title: 'Web Development', desc: 'Fast, responsive, modern websites and web apps built with React. Every project is optimised for performance, accessibility, and conversion.', image: '/images/svc-web-dev.png' },
  { num: '02', title: 'AI Agents & Automation', desc: 'Custom AI agents, prompt engineering, and n8n automation workflows that eliminate manual work and scale your operations intelligently.', image: '/images/svc-ai-automation.png' },
  { num: '03', title: 'Brand Identity', desc: 'Logo design, typography systems, colour palettes, and full brand guidelines. Visual identities that communicate authority and elegance.', image: '/images/svc-brand.png' },
  { num: '04', title: 'AI UGC & Cinematic Visuals', desc: 'AI-generated UGC ads, product videos, and cinematic brand visuals — from script to final cut. Scroll-stopping content that looks premium and converts, produced at a fraction of the time and cost.', image: '/images/svc-ugc.png' },
];

// image + left-to-right dark overlay so the text stays readable on the left
const cardBg = (img) => `linear-gradient(90deg, rgba(3,8,18,0.96) 0%, rgba(3,8,18,0.82) 34%, rgba(3,8,18,0.35) 66%, rgba(3,8,18,0.5) 100%), url(${img}) center/cover no-repeat`;

const TOP_VH = 16;   // where the first card pins
const STEP = 2.2;    // rem each successive card is nudged down → visible deck

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { isMobile } = useBreakpoint();
  const cardRefs = useRef([]);

  // Depth: scale/dim a card as the next one slides over it
  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    const read = () => {
      ticking = false;
      const cards = cardRefs.current.filter(Boolean);
      for (let i = 0; i < cards.length; i++) {
        const next = cards[i + 1];
        const shade = cards[i].lastElementChild;
        if (!next) { cards[i].style.transform = 'scale(1)'; shade.style.opacity = '0'; continue; }
        const r = cards[i].getBoundingClientRect();
        const nr = next.getBoundingClientRect();
        // how far the next card has advanced over this one (0 → 1)
        const p = clamp((r.bottom - nr.top) / r.height);
        cards[i].style.transform = `scale(${1 - p * 0.08})`;
        // dim with an overlay's opacity (GPU-composited) instead of filter: brightness (repaints every frame)
        shade.style.opacity = String(p * 0.35);
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(read); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', read);
    read();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', read); };
  }, [isMobile]);

  return (
    <section id="services" style={{ padding: '7rem var(--gutter)', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/services-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: isMobile ? 'rgba(3,8,18,0.6)' : 'linear-gradient(to right, #030812 30%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #030812 0%, transparent 20%, transparent 80%, #030812 100%)', pointerEvents: 'none', zIndex: 0 }} />

      <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="metallic"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.5rem,10vw,4rem)' : 'clamp(3rem,7vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: isMobile ? '3rem' : '4rem' }}
        >What I Do.</motion.h2>

        {/* Overlapping card stack: each pins a little lower than the last */}
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            style={{
              position: isMobile ? 'static' : 'sticky',
              top: isMobile ? 'auto' : `calc(${TOP_VH}vh + ${i * STEP}rem)`,
              marginBottom: isMobile ? '1.25rem' : '8vh',
              zIndex: i + 1,
            }}
          >
            <div
              ref={el => (cardRefs.current[i] = el)}
              style={{
                transformOrigin: 'center top',
                willChange: 'transform',
                position: 'relative',
                minHeight: isMobile ? 'auto' : '58vh',
                borderRadius: 24,
                border: '1px solid var(--border)',
                borderTop: '1px solid var(--border-gold)',
                boxShadow: '0 40px 90px -50px #000',
                background: cardBg(s.image),
                padding: isMobile ? '2rem' : '3rem clamp(2rem,4vw,3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '2rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.14em' }}>{s.num} / {String(SERVICES.length).padStart(2, '0')}</span>
                <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(1.6rem,7vw,2.2rem)' : 'clamp(2rem,4vw,3.4rem)', color: 'var(--ink)', letterSpacing: '-0.025em', lineHeight: 1.02, marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '0.9rem' : '1rem', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: '55ch' }}>{s.desc}</p>
              </div>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: '#000', opacity: 0, pointerEvents: 'none' }} />
            </div>
          </div>
        ))}

        {/* tail spacer so the last card can settle before the section ends */}
        {!isMobile && <div style={{ height: '30vh' }} />}
      </div>
    </section>
  );
}
