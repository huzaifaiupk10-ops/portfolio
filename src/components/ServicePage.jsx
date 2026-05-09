import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/portfolioData';

const ease = [0.16, 1, 0.3, 1];

const icons = {
  '⬡': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
    </svg>
  ),
  '◈': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  ),
  '◇': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
    </svg>
  ),
};

export default function ServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === parseInt(id));

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#05070A' }}>
        <div className="text-center">
          <p className="text-brand-muted text-lg mb-4">Service not found.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#05070A' }}>

      {/* ── Curtain entrance overlay ── */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#05070A',
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
          background: service.accent,
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
          <span className="text-xs text-brand-muted">Service 0{service.id}</span>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-16 pb-20">

        {/* ── Hero ── */}
        <div className="mb-14">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.6, ease }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: `${service.accent}18`,
              border: `1px solid ${service.accent}30`,
              color: service.accent,
              boxShadow: `0 0 40px ${service.accent}20`,
            }}
          >
            {icons[service.icon]}
          </motion.div>

          {/* Title wipe-up */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease }}
              className="font-display font-bold mb-4 leading-tight"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                background: 'linear-gradient(135deg, #E5E7EB 0%, #C0C7D1 50%, #93C5FD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {service.title}
            </motion.h1>
          </div>

          {/* Description wipe-up */}
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7, ease }}
              className="text-brand-muted text-lg max-w-2xl leading-relaxed"
            >
              {service.longDescription}
            </motion.p>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease }}
            className="md:col-span-2 rounded-2xl p-6 md:p-8"
            style={{ background: 'rgba(11,18,32,0.6)', border: '1px solid rgba(192,199,209,0.08)' }}
          >
            <h2 className="font-display font-semibold text-lg mb-6" style={{ color: '#E5E7EB' }}>
              What's Included
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.95 + i * 0.07, duration: 0.4, ease }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-1 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}30` }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={service.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-sm text-brand-silver leading-snug">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(11,18,32,0.6)', border: `1px solid ${service.accent}20` }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: service.accent }}>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + i * 0.07, duration: 0.35, ease }}
                    className="text-xs px-2.5 py-1 rounded-md font-medium"
                    style={{
                      background: `${service.accent}12`,
                      color: service.accent,
                      border: `1px solid ${service.accent}22`,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5, ease }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/#contact')}
              className="w-full btn-primary justify-center text-sm"
              style={{ background: `linear-gradient(135deg, ${service.accent}cc, ${service.accent})` }}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/')}
              className="w-full btn-secondary justify-center text-sm"
            >
              ← All Services
            </motion.button>
          </div>
        </div>

        {/* ── Process steps ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease }}
          className="mb-14"
        >
          <h2 className="font-display font-semibold text-xl mb-6" style={{ color: '#E5E7EB' }}>
            How It Works
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {service.process.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease }}
                className="rounded-2xl p-5 text-center"
                style={{ background: 'rgba(11,18,32,0.6)', border: '1px solid rgba(192,199,209,0.08)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm mx-auto mb-3"
                  style={{
                    background: `${service.accent}15`,
                    border: `1px solid ${service.accent}30`,
                    color: service.accent,
                  }}
                >
                  0{i + 1}
                </div>
                <p className="text-sm font-medium" style={{ color: '#E5E7EB' }}>{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Other services ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease }}
        >
          <h2
            className="font-display font-semibold text-xl mb-6"
            style={{ color: '#E5E7EB', borderTop: '1px solid rgba(192,199,209,0.07)', paddingTop: '2rem' }}
          >
            Other Services
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {services
              .filter((s) => s.id !== service.id)
              .map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.35 + i * 0.1, duration: 0.5, ease }}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    navigate(`/service/${s.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left rounded-xl p-5 transition-all flex items-start gap-4"
                  style={{ background: 'rgba(11,18,32,0.6)', border: '1px solid rgba(192,199,209,0.08)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${s.accent}35`;
                    e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(192,199,209,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.accent}15`, color: s.accent, border: `1px solid ${s.accent}25` }}
                  >
                    {icons[s.icon]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: '#E5E7EB' }}>{s.title}</p>
                    <p className="text-xs text-brand-muted leading-relaxed">{s.description}</p>
                  </div>
                </motion.button>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
