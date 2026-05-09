import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ── Keyword response engine ───────────────────────────────────
const RESPONSES = [
  {
    keywords: ['hello', 'hi', 'hey', 'sup', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'],
    reply: "Hey! 👋 Great to have you here. I'm Huzaifa's assistant — I can tell you about his work, background, services, or help you book a call. What's on your mind?",
  },
  {
    keywords: ['who is', 'who are', 'about huzaifa', 'tell me about', 'introduce', 'bio', 'background', 'story', 'huzaifa imran'],
    reply: "Huzaifa Imran is a Virginia-based web developer, UI/UX designer, and digital creator. He got into this field because he's always loved the combination of technology and creativity — building things that look great and actually work.\n\nHe combines **web development, branding, design, and AI** to create premium digital experiences for personal brands, businesses, and creators. He's a student and also self-taught in many areas — constantly learning, building, and experimenting with new tools and technologies.",
  },
  {
    keywords: ['where', 'location', 'based', 'country', 'city', 'virginia', 'remote', 'local'],
    reply: "Huzaifa is based in **Virginia, United States**. He works mainly online, so he can collaborate with clients locally and from anywhere in the world — timezone differences are no problem!",
  },
  {
    keywords: ['service', 'services', 'offer', 'what do you do', 'what can you do', 'help me with', 'provide'],
    reply: "Huzaifa offers three core services:\n\n• [[Web Development|/service/1]] — Modern, responsive websites with smooth animations\n• [[AI Agents & Automation|/service/2]] — Custom AI systems and workflow automation\n• [[Branding & Identity|/service/3]] — Logos, color systems, and full brand packages\n\nClick any service above to see full details. Which one interests you?",
  },
  {
    keywords: ['web', 'website', 'web development', 'web design', 'landing page', 'frontend', 'react', 'html', 'responsive'],
    reply: "Web development is one of Huzaifa's core strengths. He builds modern, responsive sites using **React, Vite, Tailwind CSS, and Framer Motion** — with smooth animations, 3D elements, and clean UI that works beautifully on any device.\n\n[[View Web Development Service|/service/1]]",
  },
  {
    keywords: ['ai', 'agent', 'automation', 'workflow', 'prompt', 'agentic', 'artificial intelligence', 'chatbot', 'gpt', 'claude'],
    reply: "AI is something Huzaifa is actively building with every day. He works with tools like **Claude Code, ChatGPT, and agentic AI workflows** to design systems that automate repetitive tasks, speed up creative work, and add real intelligence to digital products.\n\n[[View AI Agents & Automation Service|/service/2]]",
  },
  {
    keywords: ['brand', 'branding', 'logo', 'identity', 'typography', 'color', 'visual identity', 'brand design'],
    reply: "Huzaifa approaches branding as a full visual language — not just a logo. He creates **logos, color palettes, type systems, and brand guidelines** that feel premium, consistent, and built to stand out.\n\n[[View Branding & Identity Service|/service/3]]",
  },
  {
    keywords: ['project', 'projects', 'work', 'portfolio', 'built', 'made', 'example', 'case study'],
    reply: "Here are Huzaifa's featured projects:\n\n• [[Gold's Gym Redesign|/project/1]] — Premium fitness website redesign concept\n• [[Virginia Webs|/project/2]] — Branding & website for a web agency\n• [[AI Assistant|/project/3]] — VirginiaWebs AI-powered chatbot UI\n• [[AI Lead Dashboard|/project/4]] — AI automation & lead gen system\n• [[Lumière Fashion Web|/project/5]] — Luxury fashion website design\n• [[Lumière Editorial|/project/6]] — Fashion campaign & creative direction\n• [[Lumière Visual System|/project/7]] — Full luxury brand identity\n• [[Sol Slice|/project/8]] — Creative agency landing page\n\nClick any project above to open it!",
  },
  {
    keywords: ['lumiere', 'lumière', 'fashion', 'luxury', 'editorial'],
    reply: "The Lumière series is one of Huzaifa's most complete concept projects — all built around the same premium aesthetic:\n\n• [[Lumière Fashion Web|/project/2]] — Luxury fashion website\n• [[Lumière Editorial|/project/3]] — Fashion campaign design\n• [[Lumière Visual System|/project/4]] — Full brand identity",
  },
  {
    keywords: ['sol slice', 'virginia webs', 'ai lead', 'dashboard'],
    reply: "Three great projects worth checking out:\n\n• [[Virginia Webs|/project/2]] — Branding & website for a web agency\n• [[AI Lead Dashboard|/project/4]] — AI-powered lead generation system\n• [[Sol Slice|/project/8]] — Bold creative agency landing page",
  },
  {
    keywords: ['skill', 'skills', 'tech', 'technology', 'know', 'stack', 'expertise', 'capable', 'skills & expertise'],
    reply: "Here's a full breakdown of Huzaifa's skills & expertise:\n\n🖥️ **Web Development**\nReact, Vite, HTML, CSS, Tailwind CSS, Responsive Design, Framer Motion, Three.js, UI/UX Design\n\n🤖 **AI & Automation**\nAI Agents, Agentic AI Development, Prompt Engineering, Workflow Automation, Claude Code, ChatGPT\n\n🎨 **Branding & Design**\nLogo Design, Brand Identity, Typography, Color Theory, Visual Design, Creative Direction, Figma, Canva\n\n🛠️ **Tools & Platforms**\nVS Code, GitHub, Netlify, Vercel, Wix, CapCut, AutoDS\n\n[[View Full Skills Section|#skills]]",
  },
  {
    keywords: ['tool', 'tools', 'software', 'figma', 'canva', 'vscode', 'tailwind', 'framer', 'netlify', 'vercel', 'github'],
    reply: "Huzaifa's go-to toolkit includes:\n\n**Dev:** React, Vite, Tailwind CSS, Framer Motion, Three.js, VS Code\n**AI:** Claude Code, ChatGPT, AI prompt workflows\n**Design:** Figma, Canva, CapCut\n**Deployment:** Netlify, Vercel, GitHub\n**Other:** Wix, AutoDS\n\nHe picks the right tool for each job — not just the trendy one.",
  },
  {
    keywords: ['different', 'unique', 'stand out', 'why you', 'why huzaifa', 'better', 'special', 'why choose'],
    reply: "What makes Huzaifa different is the **combination** — most people focus on one thing. He brings web development, UI/UX design, branding, and AI together in one person.\n\nHe doesn't just build websites that work — he makes sure they look premium, feel smooth, load fast, and represent the brand properly. That attention to design detail and user experience is what clients notice first.",
  },
  {
    keywords: ['education', 'degree', 'college', 'university', 'study', 'learn', 'self-taught', 'student', 'school'],
    reply: "Huzaifa is currently a **student** who also self-teaches extensively. He learns through college coursework, hands-on projects, and a lot of real practice — building websites, experimenting with AI tools, and working on creative projects.\n\nHe's a firm believer that the best way to learn is to actually build things.",
  },
  {
    keywords: ['experience', 'years', 'how long have', 'how experienced', 'junior', 'senior', 'level'],
    reply: "Huzaifa is an **emerging professional** — he's still growing but already building real projects with modern tools. His experience spans web development, UI/UX design, branding, AI prompt engineering, and agentic workflows.\n\nHe brings fresh energy, modern knowledge, and a strong eye for detail to every project.",
  },
  {
    keywords: ['language', 'languages', 'speak', 'english', 'urdu', 'hindi'],
    reply: "Huzaifa speaks **English, Urdu, and Hindi** — so if you're more comfortable communicating in any of those, that works perfectly!",
  },
  {
    keywords: ['worldwide', 'international', 'global', 'country', 'timezone', 'remote work', 'online'],
    reply: "Huzaifa works with clients **worldwide**. He's based in Virginia, USA, but collaborates fully online — so location and timezone aren't an issue. Whether you're in the US, UK, Middle East, or South Asia, he can work with you.",
  },
  {
    keywords: ['hobby', 'hobbies', 'fun', 'personal', 'outside work', 'free time', 'workout', 'gym', 'interest'],
    reply: "Outside of work, Huzaifa enjoys **working out** — it keeps him disciplined, focused, and motivated (which honestly shows in the quality of his work). He also spends a lot of time experimenting with new AI tools, web design ideas, animations, and creative digital workflows. He genuinely enjoys building things, even when no one's paying him to.",
  },
  {
    keywords: ['style', 'work style', 'process style', 'personality', 'approach', 'how you work'],
    reply: "Huzaifa's work style is **focused, creative, and detail-oriented**. He cares a lot about clean layouts, strong visual hierarchy, smooth animations, and designs that look just as good on mobile as they do on desktop.\n\nHe communicates clearly, takes feedback well, and likes to make sure the final product actually reflects the client's vision — not just what looks good on a template.",
  },
  {
    keywords: ['price', 'pricing', 'cost', 'charge', 'rate', 'how much', 'budget', 'fee', 'quote', 'affordable'],
    reply: "Pricing depends on the scope and complexity of the project. A simple landing page is going to cost less than a full animated website with custom branding and AI features.\n\nThe best move is to book a quick call or send a message — Huzaifa will give you a clear quote based on exactly what you need.\n\n📧 huzaifaiupk10@gmail.com\n📞 +1 571 477 4920",
  },
  {
    keywords: ['how long', 'timeline', 'time', 'turnaround', 'deadline', 'fast', 'quick', 'delivery', 'when'],
    reply: "Timeline depends on the project:\n\n• **Simple landing page** — a few days to a week\n• **Multi-section animated website** — 1 to 3 weeks\n• **Brand identity package** — 1 to 2 weeks\n• **AI automation system** — varies by complexity\n\nRevisions, content, and feature requests can affect timing. Book a call to get a realistic estimate for your specific project.",
  },
  {
    keywords: ['hire', 'work with', 'collaborate', 'get started', 'start a project', 'available', 'availability', 'open', 'working'],
    reply: "Huzaifa is **currently open to new projects!** Whether it's a website, brand, or AI system — he'd love to hear about what you're building.\n\nHit the **Book a Call** button below, or reach out directly:\n📧 huzaifaiupk10@gmail.com\n📞 +1 571 477 4920",
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'message', 'get in touch', 'touch', 'connect'],
    reply: "Here's how to reach Huzaifa directly:\n\n📧 huzaifaiupk10@gmail.com\n📞 +1 571 477 4920\n💼 linkedin.com/in/huzaifa-imran-6a132b330\n\nOr scroll down to the Contact section and send a message right from this page.",
  },
  {
    keywords: ['linkedin', 'social', 'social media', 'instagram', 'twitter', 'profile'],
    reply: "You can find and connect with Huzaifa on LinkedIn:\n💼 linkedin.com/in/huzaifa-imran-6a132b330\n\nFeel free to reach out there too — he's active and responds.",
  },
  {
    keywords: ['thank', 'thanks', 'awesome', 'great', 'nice', 'cool', 'perfect', 'helpful', 'appreciate', 'love it'],
    reply: "Really glad I could help! 😊 If you ever want to chat about a project or just have more questions, I'm always here. You can also reach Huzaifa directly at huzaifaiupk10@gmail.com",
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'cya', 'take care'],
    reply: "Take care! 👋 Come back anytime — and if you decide you want to work with Huzaifa, the Book a Call button is right here whenever you're ready.",
  },
];

const FALLBACK = "That's a good question — I might not have a specific answer for that one. Your best bet is to reach out to Huzaifa directly at huzaifaiupk10@gmail.com or +1 571 477 4920. He's pretty responsive and happy to chat!";

function getReply(input) {
  const lower = input.toLowerCase();
  for (const item of RESPONSES) {
    if (item.keywords.some((kw) => lower.includes(kw))) return item.reply;
  }
  return FALLBACK;
}

// ── Booking flow steps ────────────────────────────────────────
const BOOKING_STEPS = [
  { key: 'name',        prompt: "What's your name?",                              placeholder: 'Your full name' },
  { key: 'email',       prompt: "What's your email address?",                     placeholder: 'you@example.com' },
  { key: 'date',        prompt: "What date works best for you?",                  placeholder: 'e.g. Monday May 5th, or any weekday' },
  { key: 'time',        prompt: "Preferred time? (include your timezone)",        placeholder: 'e.g. 3pm EST' },
  { key: 'projectType', prompt: "What type of project do you need help with?",    placeholder: 'e.g. Website, AI system, Branding...' },
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
    content: "Hey! 👋 I'm Huzaifa's assistant. Ask me about his work, background, services, or pricing — or hit the button below to book a call directly.",
  }]);
  const [input, setInput]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Booking state
  const [booking, setBooking]       = useState(false);
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
    const step   = BOOKING_STEPS[bookingStep];
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

  // ── Confirm booking — opens mailto ──────────────────────────
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

  // ── Normal chat send ────────────────────────────────────────
  const send = (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');
    setShowSuggestions(false);
    pushMsg('user', content);
    setLoading(true);
    setTimeout(() => {
      pushMsg('assistant', getReply(content));
      setLoading(false);
    }, 600 + Math.random() * 400);
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
            className="fixed bottom-24 right-5 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: '#0B1220',
              border: '1px solid rgba(59,130,246,0.25)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.08)',
              maxHeight: '560px',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: 'rgba(11,18,32,0.95)', borderBottom: '1px solid rgba(192,199,209,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg,#1E40AF,#3B82F6)', color: 'white' }}>H</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#E5E7EB' }}>Huzaifa's Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-xs" style={{ color: '#94A3B8' }}>
                      {booking ? `Booking — Step ${Math.min(bookingStep + 1, BOOKING_STEPS.length)} of ${BOOKING_STEPS.length}` : 'Online'}
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

              {/* Quick suggestions (first open) */}
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
                    <button key={opt} onClick={() => { handleBookingInput(opt); }}
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

            {/* Book a Call banner (only when not in booking flow) */}
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
            {(!isBookingDone) && (
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
