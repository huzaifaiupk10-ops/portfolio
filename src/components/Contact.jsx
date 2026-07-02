import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const ease = [0.16, 1, 0.3, 1];

function InputField({ label, type = 'text', value, onChange, placeholder, multiline, required }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${focused ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.1)'}`,
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
      <div style={{ position: 'absolute', right: '20%', top: '50%', transform: 'translate(50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2.5rem' : '5rem', alignItems: 'center', width: '100%' }}>

        {/* Left: heading + form */}
        <div>
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
                  <button type="submit" disabled={status === 'loading'} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', color: '#0A0A0A', border: 'none', padding: '0.9rem 2rem', background: status === 'loading' ? 'rgba(201,168,76,0.6)' : 'var(--gold)', borderRadius: 10, letterSpacing: '0.01em', cursor: status === 'loading' ? 'not-allowed' : 'pointer', transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s' }}
                    onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(201,168,76,0.4)'; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'block', width: 16, height: 16, border: '2px solid #0A0A0A', borderTopColor: 'transparent', borderRadius: '50%' }} />
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

        {/* Right: image */}
        {!isMobile && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.2, ease }} style={{ height: 560, borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
            <img src="/images/contact-visual.png" alt="Contact" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
            {/* Subtle gold overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 50%)', pointerEvents: 'none' }} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
