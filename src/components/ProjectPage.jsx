import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ease = [0.16, 1, 0.3, 1];

export default function ProjectPage() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { isMobile } = useBreakpoint();
  const heroRef     = useRef(null);
  const project     = projects.find((p) => p.id === parseInt(id));

  const { scrollY } = useScroll();
  const imgY        = useTransform(scrollY, [0, 700], [0, 140]);

  const idx         = projects.findIndex((p) => p.id === project?.id);
  const nextProject = projects[(idx + 1) % projects.length];

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--ink-3)', marginBottom: '1.5rem' }}>Project not found.</p>
          <button onClick={() => navigate('/')} style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#0A0A0A', padding: '0.72rem 1.6rem', background: 'var(--gold)', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div key={id} style={{ minHeight: '100vh', background: '#0A0A0A', overflowX: 'hidden' }}>

      {/* Curtain */}
      <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.85, ease, delay: 0.05 }} style={{ position: 'fixed', inset: 0, background: '#0A0A0A', transformOrigin: 'top', zIndex: 9999, pointerEvents: 'none' }} />
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1, 1, 0] }} transition={{ duration: 0.8, ease, times: [0, 0.4, 0.7, 1] }} style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: project.accent, transformOrigin: 'left', zIndex: 10000, pointerEvents: 'none' }} />

      {/* Floating back button */}
      <motion.button
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4, ease }}
        onClick={() => navigate('/')}
        style={{ position: 'fixed', top: '1.4rem', left: '1.4rem', zIndex: 200, display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.55rem 1.1rem', borderRadius: 999, cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = `${project.accent}55`; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        Back
      </motion.button>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ position: 'relative', height: isMobile ? '75vh' : '100vh', overflow: 'hidden' }}>

        {/* Parallax image */}
        <motion.img
          src={project.image} alt={project.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center top', y: imgY, display: 'block' }}
        />

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.35) 40%, rgba(10,10,10,0.97) 100%)' }} />

        {/* Project number watermark */}
        <div style={{ position: 'absolute', top: '50%', right: isMobile ? '-2rem' : '-1rem', transform: 'translateY(-55%)', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? '18rem' : '26rem', color: project.accent, opacity: 0.05, lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.05em' }}>
          {String(project.id).padStart(2, '0')}
        </div>

        {/* Hero text */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '2.5rem 1.5rem' : '3.5rem clamp(2rem,6vw,5rem)' }}>

          {/* Accent rule */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.65, duration: 0.55, ease }} style={{ width: 44, height: 2, background: project.accent, marginBottom: '1.25rem', transformOrigin: 'left' }} />

          {/* Tag strip */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: project.accent }}>
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '105%' }} animate={{ y: '0%' }}
              transition={{ delay: 0.5, duration: 0.9, ease }}
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2rem,9vw,3.2rem)' : 'clamp(2.8rem,5.5vw,5rem)', letterSpacing: '-0.03em', lineHeight: 1.05, color: '#fff', marginBottom: '0.65rem' }}
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72, duration: 0.5 }} style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '0.8rem' : '0.875rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.05em' }}>
            {project.subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── BODY ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: isMobile ? '4rem 1.5rem 0' : '6rem clamp(2rem,6vw,4rem) 0' }}>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease }}
          style={{ display: 'flex', gap: isMobile ? '1.25rem' : '2.5rem', marginBottom: isMobile ? '3.5rem' : '5rem', alignItems: 'flex-start' }}
        >
          <div style={{ width: 3, flexShrink: 0, background: `linear-gradient(to bottom, ${project.accent}, transparent)`, borderRadius: 2, alignSelf: 'stretch', minHeight: 80 }} />
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500, fontSize: isMobile ? 'clamp(1.15rem,4vw,1.4rem)' : 'clamp(1.3rem,2.2vw,1.75rem)', color: 'var(--ink-2)', lineHeight: 1.65 }}>
            {project.description}
          </p>
        </motion.div>

        {/* Gallery — only shown if project has multiple images */}
        {project.gallery && project.gallery.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease }}
            style={{ marginBottom: isMobile ? '3.5rem' : '5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: project.accent, flexShrink: 0 }}>Gallery</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '0.75rem' }}>
              {project.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease }}
                  style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${project.accent}18`, aspectRatio: '16/10', position: 'relative' }}
                >
                  <img src={src} alt={`${project.title} screenshot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.45s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Divider with label */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: project.accent, flexShrink: 0 }}>
            {project.gallery ? 'Tech Stack' : 'Deliverables'}
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </motion.div>

        {/* Editorial numbered deliverables */}
        <div style={{ marginBottom: isMobile ? '4rem' : '6rem' }}>
          {project.tags.map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.06, duration: 0.55, ease }}
              style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1.25rem' : '2rem', padding: '1.15rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'default' }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1.05rem', color: project.accent, opacity: 0.35, minWidth: isMobile ? 28 : 36 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 500, color: 'var(--ink-2)', flex: 1 }}>
                {tag}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.25">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── NEXT PROJECT TAKEOVER ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease }}
        onClick={() => { navigate(`/project/${nextProject.id}`); window.scrollTo({ top: 0 }); }}
        style={{ position: 'relative', height: isMobile ? 260 : 360, overflow: 'hidden', cursor: 'pointer', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 0 }}
      >
        <motion.img
          src={nextProject.image} alt={nextProject.title}
          initial={{ scale: 1 }} whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 100%)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            Next Project
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(1.5rem,6vw,2.2rem)' : 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', letterSpacing: '-0.025em', textAlign: 'center' }}>
            {nextProject.title}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
            {nextProject.subtitle}
          </p>
          <motion.div
            initial={{ opacity: 0.5, x: 0 }} whileHover={{ opacity: 1, x: 5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: nextProject.accent }}
          >
            Open
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.div>
        </div>

        {/* Corner project number */}
        <div style={{ position: 'absolute', top: '1.2rem', right: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.7rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>
          {String(nextProject.id).padStart(2, '0')}
        </div>
      </motion.div>

    </div>
  );
}
