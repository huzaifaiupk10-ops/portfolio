import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { personal } from '../data/portfolioData';

const projectTypes = [
  'Web Development',
  'AI Agent / Automation',
  'Branding & Identity',
  'UI/UX Design',
  'Full Project',
  'Other',
];

function InputField({ label, type = 'text', name, value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: '#CBD5E1' }}>
        {label} {required && <span style={{ color: '#D4A843' }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={{
          background: 'rgba(11,18,32,0.7)',
          border: '1px solid rgba(212,168,67,0.12)',
          color: '#F1F5F9',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.45)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.08)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(212,168,67,0.12)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Simulate submission (replace with real endpoint)
    setStatus('success');
    setForm({ name: '', email: '', projectType: '', message: '' });
  };

  return (
    <section id="contact" className="section-pad">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label mb-4 mx-auto">Contact</div>
          <h2
            className="font-display font-bold gradient-text"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
          >
            Let's Build Something Great
          </h2>
          <p className="text-brand-muted mt-3 max-w-lg mx-auto">
            Have a project in mind? I'd love to hear about it. Send a message and I'll be in touch.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: 'Email',
                value: personal.email,
                href: `https://mail.google.com/mail/?view=cm&fs=1&to=${personal.email}`,
                target: '_blank',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                ),
                label: 'Phone',
                value: personal.phone,
                href: `tel:${personal.phone}`,
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                ),
                label: 'LinkedIn',
                value: 'huzaifa-imran-6a132b330',
                href: personal.linkedin,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl group transition-all"
                style={{
                  background: 'rgba(5,13,26,0.65)',
                  border: '1px solid rgba(212,168,67,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,168,67,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: 'rgba(212,168,67,0.12)', color: '#D4A843', border: '1px solid rgba(212,168,67,0.2)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-brand-muted mb-0.5">{item.label}</div>
                  <div className="text-sm font-medium text-brand-silver group-hover:text-brand-silver-light transition-colors">
                    {item.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Availability badge */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(5,13,26,0.65)',
                border: '1px solid rgba(212,168,67,0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-green-400">Available for Projects</span>
              </div>
              <p className="text-sm text-brand-muted">
                Currently open to new projects — web development, AI systems, or branding. Let's talk.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-10 text-center"
                  style={{
                    background: 'rgba(5,13,26,0.65)',
                    border: '1px solid rgba(212,168,67,0.25)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-brand-silver-light mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-brand-muted text-sm mb-5">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-secondary text-sm">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-6 md:p-8 space-y-5"
                  style={{
                    background: 'rgba(5,13,26,0.65)',
                    border: '1px solid rgba(212,168,67,0.1)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <InputField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                      {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                      {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: '#CBD5E1' }}>
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
                      style={{
                        background: 'rgba(11,18,32,0.7)',
                        border: '1px solid rgba(212,168,67,0.12)',
                        color: form.projectType ? '#F1F5F9' : '#64748B',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.45)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212,168,67,0.12)';
                      }}
                    >
                      <option value="" disabled style={{ background: '#0A0A0A' }}>
                        Select a project type
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} style={{ background: '#0A0A0A' }}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: '#CBD5E1' }}>
                      Message <span style={{ color: '#D4A843' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{
                        background: 'rgba(11,18,32,0.7)',
                        border: '1px solid rgba(212,168,67,0.12)',
                        color: '#F1F5F9',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.45)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.08)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212,168,67,0.12)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full justify-center"
                  >
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
