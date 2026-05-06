import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(5,7,10,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(192,199,209,0.08)' : 'none',
        transition: 'background 0.3s ease, border 0.3s ease',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => handleNav('#hero')} aria-label="Go to top">
          <span className="font-display font-bold text-base tracking-tight" style={{ color: '#E5E7EB' }}>
            HI<span style={{ color: '#3B82F6' }}>.</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
              style={{ color: active === l.href ? '#E5E7EB' : '#64748B' }}
              onMouseEnter={(e) => { if (active !== l.href) e.currentTarget.style.color = '#C0C7D1'; }}
              onMouseLeave={(e) => { if (active !== l.href) e.currentTarget.style.color = '#64748B'; }}
            >
              {l.label}
              {active === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-px"
                  style={{ background: '#3B82F6' }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button onClick={() => handleNav('#contact')} className="btn-primary text-sm px-5 py-2">
            Hire Me
          </button>
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1.5" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="block w-5 h-0.5 rounded" style={{ background: '#C0C7D1' }} />
          <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.18 }} className="block w-5 h-0.5 rounded" style={{ background: '#C0C7D1' }} />
          <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="block w-5 h-0.5 rounded" style={{ background: '#C0C7D1' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{ background: '#05070A', borderBottom: '1px solid rgba(192,199,209,0.08)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-0.5">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className="text-left px-3 py-2.5 text-sm font-medium transition-colors"
                  style={{
                    color: active === l.href ? '#E5E7EB' : '#64748B',
                    borderLeft: active === l.href ? '2px solid #3B82F6' : '2px solid transparent',
                  }}
                >
                  {l.label}
                </button>
              ))}
              <button onClick={() => handleNav('#contact')} className="btn-primary mt-3 justify-center">
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
