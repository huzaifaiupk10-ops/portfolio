import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ease = [0.16, 1, 0.3, 1];

function InputField({ label, type = 'text', value, onChange, placeholder, multiline, required }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${focused ? 'rgba(212,164,95,0.5)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 10, color: 'var(--ink)', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s', resize: 'none', boxSizing: 'border-box',
  };
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: focused ? 'var(--gold)' : 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', transition: 'color 0.2s' }}>{label}</label>
      {multiline
        ? <textarea rows={4} value={value} onChange={onChange} placeholder={placeholder} required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ ...base, padding: '0.85rem 1rem' }} />
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ ...base, padding: '0.85rem 1rem' }} />
      }
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { isMobile } = useBreakpoint();
  const videoRef = useRef(null);

  // React doesn't reliably set the `muted` attribute, which blocks autoplay — set it and
  // play only while the section is on screen.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message || 'Failed to send. Please email directly.');
    }
  };

  return (
    <section id="contact" style={{ minHeight: isMobile ? 'auto' : '100vh', padding: isMobile ? '5rem 0' : undefined, display: 'flex', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      {/* Background video + navy overlay (darker on the left where the form sits) */}
      <video ref={videoRef} src="/videos/contact-bg.mp4" poster="/images/contact-bg-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: isMobile
        ? 'rgba(3,8,18,0.78)'
        : 'linear-gradient(90deg, rgba(3,8,18,0.95) 0%, rgba(3,8,18,0.9) 42%, rgba(3,8,18,0.55) 62%, rgba(3,8,18,0.3) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 14%, transparent 86%, var(--bg) 100%)' }} />

      <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Heading + form */}
        <div style={{ maxWidth: 560 }}>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Available Now
          </motion.p>

          {["Let's Work", "Together."].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div initial={{ y: '110%' }} animate={inView ? { y: '0%' } : {}} transition={{ delay: i * 0.12, duration: 1, ease }} className="metallic" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.8rem,12vw,5rem)' : 'clamp(3.5rem,8vw,6.5rem)', letterSpacing: '-0.04em', lineHeight: 0.88, paddingBottom: '0.06em' }}>{line}</motion.div>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, duration: 0.7 }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-3)', lineHeight: 1.85, marginTop: '1.75rem', marginBottom: '2rem', maxWidth: '42ch' }}>
            Have a project in mind? Fill in the form and I'll get back to you within 24 hours.
          </motion.p>

          {/* Form */}
          <motion.form initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45, duration: 0.7 }} onSubmit={handleSubmit}>
            <InputField label="Your Name" value={form.name} onChange={set('name')} placeholder="John Doe" required />
            <InputField label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" required />
            <InputField label="Message" value={form.message} onChange={set('message')} placeholder="Tell me about your project..." multiline required />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '1rem 1.25rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#22c55e', fontWeight: 500 }}>Message sent! I'll be in touch soon.</span>
                </motion.div>
              ) : (
                <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button type="submit" disabled={status === 'loading'} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', color: '#030812', border: 'none', padding: '0.9rem 2rem', background: status === 'loading' ? 'rgba(212,164,95,0.6)' : 'var(--gold)', borderRadius: 10, letterSpacing: '0.01em', cursor: status === 'loading' ? 'not-allowed' : 'pointer', transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s' }}
                    onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(212,164,95,0.4)'; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'block', width: 16, height: 16, border: '2px solid #030812', borderTopColor: 'transparent', borderRadius: '50%' }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                      </>
                    )}
                  </button>
                  {status === 'error' && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#f87171' }}>{errMsg}</motion.span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>

      </div>
    </section>
  );
}
