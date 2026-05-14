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

  // Close mobile menu on resize
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
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? 'rgba(5,7,10,0.85)'
          : 'rgba(5,7,10,0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(37,99,235,0.08)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border 0.4s ease',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('#hero')}
          className="flex items-center group"
          aria-label="Go to top"
        >
          <span
            className="font-display font-semibold text-[15px] tracking-tight"
            style={{ color: '#F1F5F9' }}
          >
            Huzaifa <span style={{ color: '#60A5FA' }}>Portfolio</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="relative px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors"
              style={{
                color: active === l.href ? '#F1F5F9' : '#64748B',
                background: active === l.href ? 'rgba(59,130,246,0.12)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (active !== l.href) e.currentTarget.style.color = '#CBD5E1';
              }}
              onMouseLeave={(e) => {
                if (active !== l.href) e.currentTarget.style.color = '#64748B';
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNav('#contact')}
            className="btn-primary text-sm px-5 py-2"
          >
            Hire Me
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-0.5 bg-brand-silver rounded"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-0.5 bg-brand-silver rounded"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-0.5 bg-brand-silver rounded"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
            style={{
              background: 'rgba(5,7,10,0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(37,99,235,0.1)',
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className="text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                  style={{
                    color: active === l.href ? '#F1F5F9' : '#64748B',
                    background: active === l.href ? 'rgba(59,130,246,0.1)' : 'transparent',
                  }}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="btn-primary mt-3 justify-center"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
