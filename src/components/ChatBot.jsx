import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ── Booking flow steps ────────────────────────────────────────
const BOOKING_STEPS = [
  { key: 'name',        prompt: "What's your name?",                           placeholder: 'Your full name' },
  { key: 'email',       prompt: "What's your email address?",                  placeholder: 'you@example.com' },
  { key: 'date',        prompt: "What date works best for you?",               placeholder: 'e.g. Monday May 5th, or any weekday' },
  { key: 'time',        prompt: "Preferred time? (include your timezone)",     placeholder: 'e.g. 3pm EST' },
  { key: 'projectType', prompt: "What type of project do you need help with?", placeholder: 'e.g. Website, AI system, Branding...' },
];

const PROJECT_TYPE_OPTIONS = [
  'Web Development',
  'AI Agents & Automation',
  'Branding & Identity',
  'General Consultation',
];

// ── Inline parser: **bold** and [[text|url]] ──────────────────
function parseInline(text, onNavigate) {
  const parts = text.split(/(\*\*.*?\*\*|\[\[.*?\]\])/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: '#E5E7EB', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const inner = part.slice(2, -2);
      const pipe  = inner.lastIndexOf('|');
      const label = inner.slice(0, pipe);
      const url   = inner.slice(pipe + 1);
      return (
        <button key={i} onClick={() => onNavigate(url)}
          style={{ color: '#60A5FA', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit', display: 'inline' }}>
          {label} →
        </button>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function RenderText({ text, onNavigate }) {
  return (
    <span>
      {text.split('\n').map((line, i, arr) => (
        <span key={i}>
          {parseInline(line, onNavigate)}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm w-fit"
      style={{ background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(192,199,209,0.1)' }}>
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#60A5FA' }}
          animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </div>
  );
}

function Message({ msg, onNavigate }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5"
          style={{ background: 'linear-gradient(135deg,#1E40AF,#3B82F6)', color: 'white' }}>H</div>
      )}
      <div className="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed"
        style={isUser
          ? { background: 'linear-gradient(135deg,#1E40AF,#3B82F6)', color: 'white', borderRadius: '1rem 1rem 0.25rem 1rem' }
          : { background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(192,199,209,0.1)', color: '#C0C7D1', borderRadius: '1rem 1rem 1rem 0.25rem' }
        }>
        <RenderText text={msg.content} onNavigate={onNavigate} />
      </div>
    </motion.div>
  );
}

const SUGGESTIONS = [
  'Tell me about yourself',
  'Skills & Expertise',
  'What services do you offer?',
  'Show me your projects',
  "What's your pricing?",
];

// ── Main export ───────────────────────────────────────────────
export default function ChatBot() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Hey! 👋 I'm Huzaifa's assistant. Ask me anything — about his work, services, pricing, or anything else. I'm here to help!",
  }]);
  const [input, setInput]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Booking state
  const [booking, setBooking]         = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({});

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300); }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const pushMsg = (role, content) => setMessages((p) => [...p, { role, content }]);

  const handleNavigate = (url) => {
    setOpen(false);
    if (url.startsWith('#')) {
      setTimeout(() => {
        const el = document.querySelector(url);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      navigate(url);
      window.scrollTo(0, 0);
    }
  };

  // ── Start booking flow ──────────────────────────────────────
  const startBooking = () => {
    setShowSuggestions(false);
    setBooking(true);
    setBookingStep(0);
    setBookingData({});
    setLoading(true);
    setTimeout(() => {
      pushMsg('assistant', "Great! Let's set up a call with Huzaifa. I just need a few quick details. 📅\n\n" + BOOKING_STEPS[0].prompt);
      setLoading(false);
    }, 500);
  };

  // ── Handle booking step input ───────────────────────────────
  const handleBookingInput = (value) => {
    const step    = BOOKING_STEPS[bookingStep];
    const newData = { ...bookingData, [step.key]: value };
    setBookingData(newData);
    pushMsg('user', value);
    setLoading(true);
    const nextStep = bookingStep + 1;
    setTimeout(() => {
      if (nextStep < BOOKING_STEPS.length) {
        pushMsg('assistant', BOOKING_STEPS[nextStep].prompt);
        setBookingStep(nextStep);
        setLoading(false);
      } else {
        const summary =
          `Perfect! Here's your booking summary:\n\n` +
          `**Name:** ${newData.name}\n` +
          `**Email:** ${newData.email}\n` +
          `**Date:** ${newData.date}\n` +
          `**Time:** ${newData.time}\n` +
          `**Project:** ${newData.projectType}\n\n` +
          `Click **Confirm & Send** below to send this to Huzaifa. He'll confirm your appointment by email!`;
        pushMsg('assistant', summary);
        setBookingStep(nextStep);
        setLoading(false);
      }
    }, 600);
  };

  // ── Confirm booking ─────────────────────────────────────────
  const confirmBooking = () => {
    const subject = encodeURIComponent(`Appointment Request from ${bookingData.name}`);
    const body = encodeURIComponent(
      `Hi Huzaifa,\n\nI'd like to schedule a call with you.\n\n` +
      `Name: ${bookingData.name}\n` +
      `Email: ${bookingData.email}\n` +
      `Preferred Date: ${bookingData.date}\n` +
      `Preferred Time: ${bookingData.time}\n` +
      `Project Type: ${bookingData.projectType}\n\n` +
      `Please confirm the appointment at your earliest convenience.\n\nThanks!`
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=huzaifaiupk10@gmail.com&su=${subject}&body=${body}`, '_blank');
    setBooking(false);
    setBookingStep(0);
    setLoading(true);
    setTimeout(() => {
      pushMsg('assistant', "Your appointment request has been sent! ✅ Huzaifa will get back to you at **" + bookingData.email + "** to confirm. Is there anything else I can help with?");
      setLoading(false);
    }, 500);
  };

  // ── Cancel booking ──────────────────────────────────────────
  const cancelBooking = () => {
    setBooking(false);
    setBookingStep(0);
    setBookingData({});
    pushMsg('assistant', "No problem! Feel free to ask me anything else or book a call whenever you're ready.");
  };

  // ── AI chat send ────────────────────────────────────────────
  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');
    setShowSuggestions(false);

    const history = messages.filter((m) => m.role !== 'system');
    pushMsg('user', content);
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history }),
      });
      const data = await res.json();
      pushMsg('assistant', data.reply || "I had trouble responding — please reach out to Huzaifa directly at huzaifaiupk10@gmail.com");
    } catch {
      pushMsg('assistant', "I'm having connection issues right now. You can reach Huzaifa directly at huzaifaiupk10@gmail.com or +1 571 477 4920");
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (booking && bookingStep < BOOKING_STEPS.length) handleBookingInput(input.trim());
      else send();
      setInput('');
    }
  };

  const handleSend = () => {
    if (booking && bookingStep < BOOKING_STEPS.length) {
      if (!input.trim()) return;
      handleBookingInput(input.trim());
      setInput('');
    } else {
      send();
    }
  };

  const isBookingDone    = booking && bookingStep >= BOOKING_STEPS.length;
  const currentStepMeta = booking && bookingStep < BOOKING_STEPS.length ? BOOKING_STEPS[bookingStep] : null;
  const showProjectPills = booking && bookingStep === 4 && !loading;

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              bottom: '88px',
              right: '1rem',
              left: '1rem',
              maxWidth: '380px',
              marginLeft: 'auto',
              background: '#000000',
              border: '1px solid rgba(59,130,246,0.25)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.08)',
              maxHeight: 'calc(100dvh - 110px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: 'rgba(0,0,0,0.98)', borderBottom: '1px solid rgba(192,199,209,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg,#1E40AF,#3B82F6)', color: 'white' }}>H</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#E5E7EB' }}>Huzaifa's Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-xs" style={{ color: '#94A3B8' }}>
                      {booking ? `Booking — Step ${Math.min(bookingStep + 1, BOOKING_STEPS.length)} of ${BOOKING_STEPS.length}` : 'Online · AI Powered'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {booking && (
                  <button onClick={cancelBooking}
                    className="text-xs px-2 py-1 rounded-md mr-1 transition-colors"
                    style={{ color: '#94A3B8', border: '1px solid rgba(192,199,209,0.1)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E5E7EB')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}>
                    Cancel
                  </button>
                )}
                <button onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  style={{ color: '#94A3B8' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(192,199,209,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => <Message key={i} msg={msg} onNavigate={handleNavigate} />)}

              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg,#1E40AF,#3B82F6)', color: 'white' }}>H</div>
                  <TypingIndicator />
                </div>
              )}

              {/* Quick suggestions */}
              {showSuggestions && messages.length === 1 && !loading && (
                <div className="space-y-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)}
                      className="w-full text-left text-xs px-3 py-2 rounded-xl transition-all"
                      style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#93C5FD' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.15)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.08)')}>
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Project type pills (booking step 4) */}
              {showProjectPills && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {PROJECT_TYPE_OPTIONS.map((opt) => (
                    <button key={opt} onClick={() => handleBookingInput(opt)}
                      className="text-xs px-3 py-1.5 rounded-xl transition-all"
                      style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#93C5FD' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.15)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.08)')}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Confirm / cancel buttons after booking summary */}
              {isBookingDone && !loading && (
                <div className="flex gap-2 pt-1">
                  <motion.button whileTap={{ scale: 0.96 }} onClick={confirmBooking}
                    className="flex-1 text-sm py-2.5 rounded-xl font-medium transition-all"
                    style={{ background: 'linear-gradient(135deg,#1E40AF,#3B82F6)', color: 'white' }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                    Confirm & Send ✓
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.96 }} onClick={cancelBooking}
                    className="px-4 text-sm py-2.5 rounded-xl font-medium transition-all"
                    style={{ background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(192,199,209,0.12)', color: '#94A3B8' }}>
                    Edit
                  </motion.button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Book a Call banner */}
            {!booking && (
              <div className="px-3 pb-2 flex-shrink-0">
                <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} onClick={startBooking}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#93C5FD' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.18)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.1)')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Book a Call with Huzaifa
                </motion.button>
              </div>
            )}

            {/* Input */}
            {!isBookingDone && (
              <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
                style={{ borderTop: '1px solid rgba(192,199,209,0.07)' }}>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey} disabled={loading}
                  placeholder={currentStepMeta ? currentStepMeta.placeholder : 'Ask me anything...'}
                  className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
                  style={{ background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(192,199,209,0.1)', color: '#E5E7EB' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(192,199,209,0.1)')} />
                <motion.button whileTap={{ scale: 0.92 }} onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: input.trim() && !loading ? 'linear-gradient(135deg,#1E40AF,#3B82F6)' : 'rgba(17,24,39,0.6)',
                    color: input.trim() && !loading ? 'white' : '#4B5563',
                    border: '1px solid rgba(192,199,209,0.1)',
                  }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: open ? 'rgba(17,24,39,0.95)' : 'linear-gradient(135deg,#1E40AF,#3B82F6)',
          border: open ? '1px solid rgba(59,130,246,0.4)' : 'none',
          boxShadow: open ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(59,130,246,0.4)',
          color: 'white',
        }} aria-label="Open chat">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
