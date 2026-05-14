import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/portfolioData';

function ProjectCard({ project, i }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.1, duration: 0.55 }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s ease',
        cursor: 'pointer',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${project.id}`)}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Card inner */}
      <div
        className="relative h-full shine"
        style={{
          background: 'rgba(5,13,26,0.65)',
          border: '1px solid rgba(37,99,235,0.1)',
          borderRadius: '1rem',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${project.accent}40`;
          e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${project.accent}18`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(37,99,235,0.1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Preview image / gradient placeholder */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            style={{ objectFit: project.objectFit || 'cover', background: '#0A0A0A' }}
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
            {/* Abstract pattern */}
            <div className="relative w-full h-full overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 30% 50%, ${project.accent}30 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${project.accent}20 0%, transparent 50%)`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, ${project.accent}08 0px, ${project.accent}08 1px, transparent 1px, transparent 20px)`,
                }}
              />
              {/* Project number watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center font-display font-bold text-8xl opacity-10"
                style={{ color: project.accent }}
              >
                0{project.id}
              </div>
            </div>
          </div>

          {/* Hover shine overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 30%, ${project.accent}12 50%, transparent 70%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="font-display font-semibold text-brand-silver-light text-base leading-tight">
                {project.title}
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">{project.subtitle}</p>
            </div>
            <span
              className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold opacity-60"
              style={{ background: `${project.accent}20`, color: project.accent }}
            >
              0{project.id}
            </span>
          </div>

          <p className="text-sm text-brand-muted leading-relaxed mb-4">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md font-medium"
                style={{
                  background: `${project.accent}12`,
                  color: project.accent,
                  border: `1px solid ${project.accent}25`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => navigate(`/project/${project.id}`)}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: project.accent }}
          >
            View Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section-pad">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label mb-4 mx-auto">Portfolio</div>
          <h2
            className="font-display font-bold gradient-text"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            Featured Projects
          </h2>
          <p className="text-brand-muted mt-3 max-w-lg mx-auto">
            A selection of work spanning web development, AI systems, and creative direction.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
