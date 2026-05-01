import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#05070A' }}>
        <div className="text-center">
          <p className="text-brand-muted text-lg mb-4">Project not found.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#05070A' }}>
      {/* Back bar */}
      <div
        className="sticky top-0 z-50 px-4 md:px-8 h-16 flex items-center"
        style={{
          background: 'rgba(5,7,10,0.88)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(192,199,209,0.07)',
        }}
      >
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: '#94A3B8' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E5E7EB')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Portfolio
          </motion.button>
          <span className="text-xs text-brand-muted">Project {String(project.id).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: `${project.accent}15`,
                  color: project.accent,
                  border: `1px solid ${project.accent}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="font-display font-bold mb-3 leading-tight"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              background: 'linear-gradient(135deg, #E5E7EB 0%, #C0C7D1 50%, #93C5FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {project.title}
          </h1>
          <p className="text-brand-muted text-lg mb-10">{project.subtitle}</p>
        </motion.div>

        {/* Preview image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="w-full rounded-2xl overflow-hidden mb-12"
          style={{
            border: `1px solid ${project.accent}25`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${project.accent}10`,
          }}
        >
          <div className="relative w-full" style={{ paddingBottom: '52%' }}>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: project.objectFit || 'cover', background: '#0B1220' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            {/* Gradient fallback */}
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

        {/* Content grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {/* Description */}
          <div className="md:col-span-2 space-y-5">
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(11,18,32,0.6)',
                border: '1px solid rgba(192,199,209,0.08)',
              }}
            >
              <h2 className="font-display font-semibold text-lg mb-3" style={{ color: '#E5E7EB' }}>
                About This Project
              </h2>
              <p className="text-brand-muted leading-relaxed">{project.description}</p>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(11,18,32,0.6)',
                border: '1px solid rgba(192,199,209,0.08)',
              }}
            >
              <h2 className="font-display font-semibold text-lg mb-3" style={{ color: '#E5E7EB' }}>
                What Was Delivered
              </h2>
              <ul className="space-y-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="flex items-center gap-3 text-sm text-brand-muted">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: project.accent }}
                    />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(11,18,32,0.6)',
                border: `1px solid ${project.accent}20`,
              }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: project.accent }}>
                Project Info
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-brand-muted mb-0.5">Category</p>
                  <p className="text-sm font-medium" style={{ color: '#E5E7EB' }}>{project.subtitle}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-muted mb-0.5">Type</p>
                  <p className="text-sm font-medium" style={{ color: '#E5E7EB' }}>Concept / Portfolio</p>
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
            </div>

            {/* Back CTA */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/')}
              className="w-full btn-secondary justify-center text-sm"
            >
              ← View All Projects
            </motion.button>
          </div>
        </motion.div>

        {/* Other projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2
            className="font-display font-semibold text-xl mb-6"
            style={{ color: '#E5E7EB', borderTop: '1px solid rgba(192,199,209,0.07)', paddingTop: '2rem' }}
          >
            Other Projects
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p) => (
                <motion.button
                  key={p.id}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    navigate(`/project/${p.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left rounded-xl p-4 transition-all"
                  style={{
                    background: 'rgba(11,18,32,0.6)',
                    border: '1px solid rgba(192,199,209,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${p.accent}35`;
                    e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(192,199,209,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <p className="text-xs mb-1" style={{ color: p.accent }}>0{p.id}</p>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#E5E7EB' }}>{p.title}</p>
                  <p className="text-xs text-brand-muted">{p.subtitle}</p>
                </motion.button>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
