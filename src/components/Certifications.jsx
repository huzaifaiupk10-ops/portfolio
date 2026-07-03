import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ease = [0.16, 1, 0.3, 1];

const FILTERS = [
  { id: 'all',        label: 'All',        count: 12 },
  { id: 'anthropic',  label: 'Anthropic',  count: 3  },
  { id: 'google',     label: 'Google',     count: 4  },
  { id: 'ibm',        label: 'IBM',        count: 1  },
  { id: 'maryland',   label: 'Maryland',   count: 1  },
  { id: 'forage',     label: 'Forage',     count: 2  },
  { id: 'vanderbilt', label: 'Vanderbilt', count: 1  },
];

const THUMBS = {
  anthropic:  '/images/certificates/ANTHROPIC.png',
  google:     '/images/certificates/Google.png',
  ibm:        '/images/certificates/IBM.png',
  forage:     '/images/certificates/Forage.png',
  maryland:   '/images/certificates/University of Maryland - Robert H. Smith School of Business.png',
  vanderbilt: '/images/certificates/Vanderbilt University.png',
};

const CERTS = [
  { id:  1, issuerId: 'anthropic', issuer: 'Anthropic',        title: 'AI Fluency: Framework & Foundations',    color: '#C9A84C', image: '/images/certificates/cert-ai-fluency.png'      },
  { id:  2, issuerId: 'anthropic', issuer: 'Anthropic',        title: 'Claude 101',                             color: '#C9A84C', image: '/images/certificates/cert-claude-101.png'       },
  { id:  3, issuerId: 'anthropic', issuer: 'Anthropic',        title: 'Claude Code in Action',                  color: '#C9A84C', image: '/images/certificates/cert-claude-code.png'      },
  { id:  4, issuerId: 'google',    issuer: 'Google',           title: 'Google AI',                              color: '#4285F4', image: '/images/certificates/cert-google-ai.png'         },
  { id:  5, issuerId: 'google',    issuer: 'Google',           title: 'Google Prompting Essentials',            color: '#4285F4', image: '/images/certificates/cert-google-prompting.png'  },
  { id:  6, issuerId: 'google',    issuer: 'Google',           title: 'Generative AI Leader',                   color: '#4285F4', image: '/images/certificates/cert-gen-ai-leader.png'     },
  { id:  7, issuerId: 'google',    issuer: 'Google',           title: 'Google Cybersecurity',                   color: '#4285F4', image: '/images/certificates/cert-google-cyber.png'      },
  { id:  8, issuerId: 'ibm',       issuer: 'IBM',              title: 'IBM Generative AI Engineering',          color: '#0F62FE', image: '/images/certificates/cert-ibm-genai.png'         },
  { id:  9, issuerId: 'maryland',  issuer: 'Univ. of Maryland',title: 'AI and Career Empowerment',              color: '#E21833', image: '/images/certificates/cert-umd-ai-career.png'     },
  { id: 10, issuerId: 'forage',    issuer: 'Forage × Tata',   title: 'GenAI Powered Data Analytics',           color: '#00A3E0', image: '/images/certificates/cert-forage-tata.png'       },
  { id: 11, issuerId: 'forage',     issuer: 'Forage × Vista',        title: 'AI in Action Job Simulation',          color: '#00A3E0', image: '/images/certificates/cert-forage-vista.png'         },
  { id: 12, issuerId: 'vanderbilt', issuer: 'Vanderbilt University', title: 'Agentic AI and AI Agents for Leaders', color: '#C9A84C', image: '/images/certificates/cert-vanderbilt-agentic.png' },
];

/* ── Shared TiltCard ───────────────────────────────────────── */
function TiltCard({ children, onClick }) {
  const x  = useMotionValue(0);
  const y  = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [ 9, -9]), { stiffness: 300, damping: 26 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-9,  9]), { stiffness: 300, damping: 26 });
  const sx = useTransform(x, [-0.5, 0.5], [15, 85]);
  const sy = useTransform(y, [-0.5, 0.5], [15, 85]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sx}% ${sy}%, rgba(201,168,76,0.11), transparent 55%)`;
  const move  = (e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <div style={{ perspective: 1100 }}>
      <motion.div onMouseMove={move} onMouseLeave={leave} onClick={onClick} style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', position: 'relative', cursor: 'pointer' }}>
        {children}
        <motion.div style={{ position: 'absolute', inset: 0, background: sheen, pointerEvents: 'none', zIndex: 5, borderRadius: 'inherit' }} />
      </motion.div>
    </div>
  );
}

/* ── Cert card ─────────────────────────────────────────────── */
function CertCard({ cert, index, inView, onClick }) {
  const [hov, setHov] = useState(false);
  const num = String(cert.id).padStart(2, '0');
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.045, duration: 0.65, ease }}
    >
      <TiltCard onClick={() => onClick(cert)}>
        <div
          onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{ borderRadius: 14, border: `1px solid ${hov ? cert.color + '55' : 'rgba(255,255,255,0.07)'}`, position: 'relative', overflow: 'hidden', transition: 'border-color 0.28s', cursor: 'pointer' }}
        >
          {/* Thumbnail — natural size, no crop */}
          <img
            src={THUMBS[cert.issuerId]} alt={cert.issuer}
            style={{ display: 'block', width: '100%', height: 'auto', transition: 'transform 0.55s ease', transform: hov ? 'scale(1.04)' : 'scale(1)' }}
          />

          {/* Text — below image */}
          <div style={{ padding: '1rem 1.2rem 1.2rem', background: hov ? '#141414' : '#0E0E0E', transition: 'background 0.25s' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(0.9rem,1.3vw,1rem)', color: hov ? 'var(--ink)' : 'var(--ink-2)', lineHeight: 1.35, marginBottom: '0.6rem', transition: 'color 0.25s' }}>{cert.title}</h3>
            <motion.div animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }} transition={{ duration: 0.3, ease }} style={{ height: 1, background: `linear-gradient(to right, ${cert.color}, transparent)`, transformOrigin: 'left', borderRadius: 1 }} />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ── Lightbox ──────────────────────────────────────────────── */
function Lightbox({ cert, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,5,0.94)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
    >
      <motion.div
        initial={{ scale: 0.86, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.86, opacity: 0, y: 24 }}
        transition={{ duration: 0.32, ease }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 'min(700px, 92vw)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: cert.color + '1A', border: `1px solid ${cert.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.72rem', color: cert.color }}>{cert.issuer[0]}</span>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.66rem', color: cert.color, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>{cert.issuer}</p>
            <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.2 }}>{cert.title}</p>
          </div>
        </div>

        {/* Certificate image */}
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px ${cert.color}20` }}>
          <img src={cert.image} alt={cert.title} style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', display: 'block' }} />
        </div>

        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: -14, right: -14, width: 32, height: 32, borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--ink-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', lineHeight: 1, zIndex: 10 }}>✕</button>
      </motion.div>

      {/* Keyboard hint */}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', marginTop: '1.25rem' }}>
        Click anywhere to close
      </motion.p>
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────── */
export default function Certifications() {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { isMobile, isTablet } = useBreakpoint();

  const [activeFilter, setActiveFilter] = useState('all');
  const [selected, setSelected]         = useState(null);

  const filtered = activeFilter === 'all' ? CERTS : CERTS.filter(c => c.issuerId === activeFilter);
  const cols     = isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)';

  return (
    <>
      <section id="certifications" style={{ padding: '7rem var(--gutter)', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>

        {/* Ambient glow */}
        <div style={{ position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%,-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

          {/* ── Header ─────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Credentials
              </motion.p>
              <div style={{ overflow: 'hidden' }}>
                <motion.div initial={{ y: '110%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 0.9, ease }} className="metallic" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.5rem,10vw,4rem)' : 'clamp(3rem,7vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.9, paddingBottom: '0.06em' }}>
                  Certified.
                </motion.div>
              </div>
            </div>

            {/* Count */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3, duration: 0.7, ease }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
              <span className="metallic" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? '2.5rem' : '3.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>12</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Certifications</span>
            </motion.div>
          </div>

          {/* Issuers strip */}
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.25, duration: 0.5 }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--ink-3)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Issued by <span style={{ color: 'var(--ink-2)' }}>Anthropic</span>, <span style={{ color: 'var(--ink-2)' }}>Google</span>, <span style={{ color: 'var(--ink-2)' }}>IBM</span>, <span style={{ color: 'var(--ink-2)' }}>Univ. of Maryland</span> &amp; <span style={{ color: 'var(--ink-2)' }}>Forage</span>
          </motion.p>

          {/* ── Filter pills with sliding indicator ────────────── */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, duration: 0.6 }} style={{ display: 'flex', gap: '0.45rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {FILTERS.map((f) => {
              const active = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  style={{ position: 'relative', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.03em', padding: '0.42rem 1rem', borderRadius: 999, border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.1)'}`, background: 'transparent', color: active ? '#0A0A0A' : 'var(--ink-3)', cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s', overflow: 'hidden' }}
                >
                  {active && (
                    <motion.div layoutId="certFilter" style={{ position: 'absolute', inset: 0, background: 'var(--gold)', borderRadius: 999 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{f.label}</span>
                  <span style={{ position: 'relative', zIndex: 1, marginLeft: '0.3rem', fontSize: '0.68rem', opacity: active ? 0.65 : 0.45 }}>{f.count}</span>
                </button>
              );
            })}
          </motion.div>

          {/* ── Grid ───────────────────────────────────────────── */}
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: cols, gap: '1.2rem' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} inView={inView} onClick={setSelected} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom note */}
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.6 }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: '2.5rem', letterSpacing: '0.04em' }}>
            Click any certificate to view the full credential.
          </motion.p>

        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && <Lightbox key="lightbox" cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
