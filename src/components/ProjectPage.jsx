import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';

const ease = [0.16, 1, 0.3, 1];

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#000000' }}>
        <div className="text-center">
          <p className="text-brand-muted text-lg mb-4">Project not found.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div key={id} className="min-h-screen" style={{ background: '#000000' }}>

      {/* ── Curtain entrance overlay ── */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000000',
          transformOrigin: 'top',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />

      {/* ── Accent color flash strip ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 0.85, ease, times: [0, 0.4, 0.7, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: project.accent,
          transformOrigin: 'left',
          zIndex: 10000,
          pointerEvents: 'none',
        }}
      />

      {/* ── Back bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease }}
        className="sticky top-0 z-50 px-4 md:px-8 h-16 flex items-center"
        style={{
          background: 'rgba(5,7,10,0.88)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212,168,67,0.08)',
        }}
      >
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: '#64748B' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F1F5F9')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Portfolio
          </motion.button>
          <span className="text-xs text-brand-muted">Project {String(project.id).padStart(2, '0')}</span>
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-16 pb-10">

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-hidden">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.45, ease }}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: `${project.accent}15`,
                color: project.accent,
                border: `1px solid ${project.accent}30`,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Title — clip-path wipe reveal */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8, ease }}
            className="font-display font-bold mb-3 leading-tight"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              background: 'linear-gradient(135deg, #E5E7EB 0%, #C0C7D1 50%, #EDD07A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <div style={{ overflow: 'hidden' }}>
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7, ease }}
            className="text-brand-muted text-lg mb-10"
          >
            {project.subtitle}
          </motion.p>
        </div>

        {/* ── Preview image — scale + clip reveal ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease }}
          className="w-full rounded-2xl overflow-hidden mb-12 relative"
          style={{
            border: `1px solid ${project.accent}25`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${project.accent}10`,
          }}
        >
          {/* Sweep overlay that wipes left-to-right then disappears */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: ['−100%', '0%', '100%'] }}
            transition={{ delay: 0.75, duration: 0.9, ease, times: [0, 0.45, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, transparent, ${project.accent}30, transparent)`,
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          <div className="relative w-full" style={{ paddingBottom: '52%' }}>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: project.objectFit || 'cover', background: '#0A0A0A' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            <div
              className={`absolute inset-0 hidden items-center justify-center bg-gradient-to-br ${project.gradient}`}
              style={{ display: 'none' }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${project.accent}35 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${project.accent}25 0%, transparent 50%)`,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, ${project.accent}08 0px, ${project.accent}08 1px, transparent 1px, transparent 24px)`,
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center font-display font-bold opacity-10"
                  style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', color: project.accent }}
                >
                  0{project.id}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Content grid — staggered ── */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Description */}
          <div className="md:col-span-2 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6, ease }}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(5,13,26,0.65)', border: '1px solid rgba(212,168,67,0.1)' }}
            >
              <h2 className="font-display font-semibold text-lg mb-3" style={{ color: '#F1F5F9' }}>
                About This Project
              </h2>
              <p className="text-brand-muted leading-relaxed">{project.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease }}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(5,13,26,0.65)', border: '1px solid rgba(212,168,67,0.1)' }}
            >
              <h2 className="font-display font-semibold text-lg mb-3" style={{ color: '#F1F5F9' }}>
                What Was Delivered
              </h2>
              <ul className="space-y-2">
                {project.tags.map((tag, i) => (
                  <motion.li
                    key={tag}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.15 + i * 0.06, duration: 0.4, ease }}
                    className="flex items-center gap-3 text-sm text-brand-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                    {tag}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(5,13,26,0.65)', border: `1px solid ${project.accent}20` }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: project.accent }}>
                Project Info
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-brand-muted mb-0.5">Category</p>
                  <p className="text-sm font-medium" style={{ color: '#F1F5F9' }}>{project.subtitle}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-muted mb-0.5">Type</p>
                  <p className="text-sm font-medium" style={{ color: '#F1F5F9' }}>Concept / Portfolio</p>
                </div>
                <div>
                  <p className="text-xs text-brand-muted mb-1">Technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{
                          background: `${project.accent}12`,
                          color: project.accent,
                          border: `1px solid ${project.accent}22`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.5, ease }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/')}
              className="w-full btn-secondary justify-center text-sm"
            >
              ← View All Projects
            </motion.button>
          </div>
        </div>

        {/* ── Other projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease }}
        >
          <h2
            className="font-display font-semibold text-xl mb-6"
            style={{ color: '#F1F5F9', borderTop: '1px solid rgba(212,168,67,0.08)', paddingTop: '2rem' }}
          >
            Other Projects
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.25 + i * 0.1, duration: 0.5, ease }}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    navigate(`/project/${p.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left rounded-xl p-4 transition-all"
                  style={{ background: 'rgba(5,13,26,0.65)', border: '1px solid rgba(212,168,67,0.1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${p.accent}35`;
                    e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,168,67,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <p className="text-xs mb-1" style={{ color: p.accent }}>0{p.id}</p>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#F1F5F9' }}>{p.title}</p>
                  <p className="text-xs text-brand-muted">{p.subtitle}</p>
                </motion.button>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
