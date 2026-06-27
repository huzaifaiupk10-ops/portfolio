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
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0A0A0A' }}>
        <div style={{ textAlign:'center' }}>
          <p style={{ color:'var(--ink-3)', fontSize:'1.1rem', marginBottom:'1.5rem' }}>Project not found.</p>
          <button onClick={() => navigate('/')} style={{ fontFamily:'var(--font-serif)', fontWeight:600, fontSize:'1rem', color:'#0A0A0A', padding:'0.72rem 1.6rem', background:'var(--gold)', borderRadius:8, border:'none', cursor:'pointer' }}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div key={id} style={{ minHeight:'100vh', background:'#0A0A0A' }}>

      {/* Curtain entrance */}
      <motion.div
        initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
        style={{ position:'fixed', inset:0, background:'#0A0A0A', transformOrigin:'top', zIndex:9999, pointerEvents:'none' }}
      />

      {/* Gold accent strip */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 0.85, ease, times: [0, 0.4, 0.7, 1] }}
        style={{ position:'fixed', top:0, left:0, right:0, height:'2px', background:'var(--gold)', transformOrigin:'left', zIndex:10000, pointerEvents:'none' }}
      />

      {/* Back bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease }}
        style={{ position:'sticky', top:0, zIndex:50, padding:'0 clamp(1.25rem,4vw,3.5rem)', height:64, display:'flex', alignItems:'center', background:'rgba(10,10,10,0.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid var(--border)' }}
      >
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <motion.button
            whileHover={{ x: -3 }} onClick={() => navigate('/')}
            style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--font-body)', fontSize:'0.875rem', fontWeight:500, color:'var(--ink-3)', background:'none', border:'none', cursor:'pointer', transition:'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-3)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Portfolio
          </motion.button>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'var(--ink-3)', letterSpacing:'0.08em' }}>Project {String(project.id).padStart(2, '0')}</span>
        </div>
      </motion.div>

      {/* Main content */}
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'4rem var(--gutter) 4rem' }}>

        {/* Tags */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:'1.5rem' }}>
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.45, ease }}
              style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', fontWeight:500, padding:'0.3rem 0.9rem', borderRadius:999, background:`${project.accent}15`, color:project.accent, border:`1px solid ${project.accent}30` }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Title */}
        <div style={{ overflow:'hidden' }}>
          <motion.h1
            initial={{ y: '100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8, ease }}
            className="metallic"
            style={{ fontFamily:'var(--font-serif)', fontWeight:700, fontSize:'clamp(2rem,4vw,3.2rem)', letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:'0.75rem' }}
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <div style={{ overflow:'hidden' }}>
          <motion.p
            initial={{ y: '100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7, ease }}
            style={{ fontFamily:'var(--font-body)', fontSize:'1.1rem', color:'var(--ink-3)', marginBottom:'2.5rem' }}
          >
            {project.subtitle}
          </motion.p>
        </div>

        {/* Preview image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease }}
          style={{ width:'100%', borderRadius:16, overflow:'hidden', marginBottom:'3rem', border:`1px solid ${project.accent}25`, boxShadow:`0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${project.accent}10`, position:'relative' }}
        >
          <motion.div
            initial={{ x: '-100%' }} animate={{ x: ['−100%', '0%', '100%'] }}
            transition={{ delay: 0.75, duration: 0.9, ease, times: [0, 0.45, 1] }}
            style={{ position:'absolute', inset:0, background:`linear-gradient(90deg, transparent, ${project.accent}30, transparent)`, zIndex:2, pointerEvents:'none' }}
          />
          <div style={{ position:'relative', width:'100%', paddingBottom:'52%' }}>
            <img
              src={project.image} alt={project.title}
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit: project.objectFit || 'cover', background:'#0A0A0A' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ position:'absolute', inset:0, display:'none', alignItems:'center', justifyContent:'center', background:`linear-gradient(135deg, #141414, #1C1C1C)` }}>
              <div style={{ fontFamily:'var(--font-serif)', fontWeight:700, fontSize:'clamp(6rem,18vw,14rem)', color:project.accent, opacity:0.1 }}>0{project.id}</div>
            </div>
          </div>
        </motion.div>

        {/* Content grid */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'2rem', marginBottom:'3rem' }}>

          {/* Description */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6, ease }}
              style={{ borderRadius:16, padding:'1.5rem', background:'#141414', border:'1px solid var(--border)' }}
            >
              <h2 style={{ fontFamily:'var(--font-serif)', fontWeight:600, fontSize:'1.15rem', color:'var(--ink)', marginBottom:'0.75rem' }}>About This Project</h2>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'var(--ink-3)', lineHeight:1.8 }}>{project.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease }}
              style={{ borderRadius:16, padding:'1.5rem', background:'#141414', border:'1px solid var(--border)' }}
            >
              <h2 style={{ fontFamily:'var(--font-serif)', fontWeight:600, fontSize:'1.15rem', color:'var(--ink)', marginBottom:'0.75rem' }}>What Was Delivered</h2>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.6rem' }}>
                {project.tags.map((tag, i) => (
                  <motion.li
                    key={tag}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.15 + i * 0.06, duration: 0.4, ease }}
                    style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'var(--font-body)', fontSize:'0.875rem', color:'var(--ink-3)' }}
                  >
                    <span style={{ width:6, height:6, borderRadius:'50%', background:project.accent, flexShrink:0 }} />
                    {tag}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease }}
              style={{ borderRadius:16, padding:'1.25rem', background:'#141414', border:`1px solid ${project.accent}20` }}
            >
              <h3 style={{ fontFamily:'var(--font-body)', fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem' }}>Project Info</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.9rem' }}>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'var(--ink-3)', marginBottom:2 }}>Category</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.875rem', fontWeight:500, color:'var(--ink)' }}>{project.subtitle}</p>
                </div>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'var(--ink-3)', marginBottom:2 }}>Type</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.875rem', fontWeight:500, color:'var(--ink)' }}>Concept / Portfolio</p>
                </div>
                <div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'var(--ink-3)', marginBottom:6 }}>Technologies</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', padding:'0.25rem 0.6rem', borderRadius:6, background:`${project.accent}12`, color:project.accent, border:`1px solid ${project.accent}22` }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.5, ease }}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/')}
              style={{ width:'100%', fontFamily:'var(--font-serif)', fontWeight:500, fontSize:'0.95rem', color:'var(--ink-2)', padding:'0.75rem 1.5rem', background:'transparent', border:'1px solid var(--border)', borderRadius:10, cursor:'pointer', transition:'border-color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              ← View All Projects
            </motion.button>
          </div>
        </div>

        {/* Other projects */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6, ease }}>
          <h2 style={{ fontFamily:'var(--font-serif)', fontWeight:600, fontSize:'1.4rem', color:'var(--ink)', borderTop:'1px solid var(--border)', paddingTop:'2rem', marginBottom:'1.5rem' }}>
            Other Projects
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}>
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.25 + i * 0.1, duration: 0.5, ease }}
                  whileHover={{ y: -4 }}
                  onClick={() => { navigate(`/project/${p.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ textAlign:'left', borderRadius:12, padding:'1rem', background:'#141414', border:'1px solid var(--border)', cursor:'pointer', transition:'border-color 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${p.accent}35`; e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:p.accent, marginBottom:4 }}>0{p.id}</p>
                  <p style={{ fontFamily:'var(--font-serif)', fontSize:'0.95rem', fontWeight:600, color:'var(--ink)', marginBottom:4 }}>{p.title}</p>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'var(--ink-3)' }}>{p.subtitle}</p>
                </motion.button>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
