import { motion } from 'framer-motion';
import { personal } from '../data/portfolioData';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-4 md:px-8 pt-16 pb-8" style={{ background: '#05070A', borderTop: '1px solid rgba(192,199,209,0.08)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="font-display font-bold text-2xl mb-4" style={{ color: '#E5E7EB' }}>
              HI<span style={{ color: '#3B82F6' }}>.</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#64748B' }}>
              Developer, Designer & AI Builder. Creating digital experiences that feel smarter.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#E5E7EB' }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#64748B' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C0C7D1')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#E5E7EB' }}>
              Get in Touch
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-colors duration-200 group" style={{ color: '#64748B' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C0C7D1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {personal.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personal.phone}`}
                  className="flex items-center gap-2.5 text-sm transition-colors duration-200" style={{ color: '#64748B' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C0C7D1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                  {personal.phone}
                </a>
              </li>
              <li>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-colors duration-200" style={{ color: '#64748B' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C0C7D1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{ borderTop: '1px solid rgba(192,199,209,0.08)' }}>
          <p className="text-xs" style={{ color: '#64748B' }}>© {year} Huzaifa Imran. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#64748B' }}>Developer · Designer · AI Builder</p>
        </div>
      </div>
    </footer>
  );
}
