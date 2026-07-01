import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  const links = ['Home', 'About', 'Work', 'Services', 'Contact'];
  const hrefs = ['#hero', '#about', '#work', '#services', '#contact'];

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1.25rem,4vw,3.5rem)', background: scrolled || menuOpen ? 'rgba(10,10,10,0.95)' : 'transparent', backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : 'none', transition: 'all 0.3s ease' }}>
        <a href='/' style={{ textDecoration: 'none', zIndex: 110, position: 'relative' }}>
          <span className="metallic" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block' }}>PORTFOLIO</span>
        </a>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '2rem' }}>
            {links.map((l, i) => (
              <a key={l} href={hrefs[i]} className="metallic-hover" style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', letterSpacing: '0.01em', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = ''}>{l}</a>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 110 }}>
          {!isMobile && (
            <a href='#contact' style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', color: 'var(--gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '0.5rem 1.25rem', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 999, letterSpacing: '0.01em', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.14)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)' }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.07)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)' }}>
              Let's Talk
              <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'><line x1='7' y1='17' x2='17' y2='7' /><polyline points='7 7 17 7 17 17' /></svg>
            </a>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu" style={{ background: 'none', border: 'none', padding: '8px', display: 'flex', flexDirection: 'column', gap: 5, cursor: 'pointer' }}>
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--gold)', borderRadius: 1, transformOrigin: 'center' }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--gold)', borderRadius: 1 }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--gold)', borderRadius: 1, transformOrigin: 'center' }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, background: 'rgba(10,10,10,0.98)', zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l} href={hrefs[i]}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMenuOpen(false)}
                className="metallic"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '2.2rem', textDecoration: 'none', letterSpacing: '-0.02em' }}
              >{l}</motion.a>
            ))}
            <motion.a
              href='#contact'
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.06 + 0.05, duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', color: 'var(--gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 2rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 999, marginTop: '0.5rem' }}
            >
              Let's Talk
              <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'><line x1='7' y1='17' x2='17' y2='7' /><polyline points='7 7 17 7 17 17' /></svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
