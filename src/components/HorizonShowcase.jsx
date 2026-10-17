import { useEffect, useRef, useState } from 'react';

// horizon.html effects, ported to the portfolio's idiom:
// word-lit reader · pinned horizontal scroll · stacking cards · scroll counters · parallax
const clamp = (n, a = 0, b = 1) => (n < a ? a : n > b ? b : n);

const READER = 'Each word ignites as it crosses the center line, so the sentence assembles itself from your scroll — not a timer.';

const PANELS = [
  { n: '01', h: 'The page scrolls down.', p: 'But the track slides sideways — mapped from vertical progress.' },
  { n: '02', h: 'Pinned while it pans.', p: 'position: sticky holds the frame; a tall parent gives the travel distance.' },
  { n: '03', h: 'One transform.', p: 'translateX = progress × (trackWidth − viewport).' },
  { n: '04', h: 'No scroll hijack.', p: 'Native scrolling the whole way. Nothing intercepts the wheel.' },
];

const CARDS = [
  { h: 'Cards that pile up.', p: 'Each sticks near the top, then the next slides over it — depth from plain sticky positioning.', g: 'linear-gradient(160deg,#1a2340,#0d1224)' },
  { h: 'Shared top offset.', p: 'They all pin at the same line, so later cards visually cover earlier ones.', g: 'linear-gradient(160deg,#3a1f42,#160d1e)' },
  { h: 'Pure CSS here.', p: 'This whole effect is position: sticky — the browser does the work.', g: 'linear-gradient(160deg,#123a34,#0a1f1b)' },
  { h: 'Release at the end.', p: 'When the section ends, the stack unpins and normal flow resumes.', g: 'linear-gradient(160deg,#101A2C,#08101F)' },
];

const STATS = [
  { to: 153, plus: '', label: 'rAF loops in the real bundle' },
  { to: 58, plus: '', label: 'IntersectionObservers' },
  { to: 0, plus: '× GSAP', label: 'animation libraries used' },
];

function Counter({ to, plus, label }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        setDone(true);
        const dur = 1100; let t0 = null;
        const step = (ts) => {
          if (!t0) t0 = ts;
          const p = clamp((ts - t0) / dur);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, done]);
  return (
    <div ref={ref} style={{ borderTop: '1px solid var(--border)', paddingTop: '1.4rem' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--ink)' }}>
        {val}{done ? plus : ''}
      </div>
      <div style={{ color: 'var(--ink-3)', marginTop: '0.75rem', fontSize: '0.9rem' }}>{label}</div>
    </div>
  );
}

export default function HorizonShowcase() {
  const readerRef = useRef(null);
  const hsRef = useRef(null);
  const trackRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const words = readerRef.current ? Array.from(readerRef.current.querySelectorAll('[data-w]')) : [];
    let ticking = false;

    const read = () => {
      ticking = false;
      const vh = window.innerHeight;

      // word-lit
      const mid = vh * 0.52;
      for (const w of words) {
        const r = w.getBoundingClientRect();
        w.style.color = (r.top + r.height / 2 < mid) ? 'var(--ink)' : 'var(--ink-3)';
      }
      // horizontal pin
      if (hsRef.current && trackRef.current) {
        const r = hsRef.current.getBoundingClientRect();
        const total = hsRef.current.offsetHeight - vh;
        const p = clamp(-r.top / total);
        const dist = trackRef.current.scrollWidth - window.innerWidth;
        trackRef.current.style.transform = `translate3d(${-p * dist}px,0,0)`;
      }
      // parallax glow
      if (glowRef.current) {
        const r = glowRef.current.parentElement.getBoundingClientRect();
        glowRef.current.style.transform = `translate3d(0,${(r.top + r.height / 2 - vh / 2) * -0.06}px,0)`;
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(read); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', read);
    read();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', read); };
  }, []);

  const kicker = (t) => (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.1rem' }}>{t}</p>
  );

  return (
    <section id="horizon" style={{ background: 'var(--bg)', position: 'relative', borderTop: '1px solid var(--border)' }}>

      {/* 1 — WORD-LIT READER */}
      <div ref={readerRef} style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '14vh var(--gutter)' }}>
        {kicker('01 — Read on scroll')}
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(1.6rem,4vw,3.2rem)', lineHeight: 1.35, letterSpacing: '-0.01em', maxWidth: '22ch' }}>
          {READER.split(' ').map((w, i) => (
            <span key={i} data-w style={{ color: 'var(--ink-3)', transition: 'color .18s cubic-bezier(.22,.61,.36,1)' }}>{w}{' '}</span>
          ))}
        </p>
      </div>

      {/* 2 — PINNED HORIZONTAL SCROLL */}
      <div ref={hsRef} style={{ height: '420vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <p style={{ position: 'absolute', top: '9vh', left: 0, right: 0, textAlign: 'center', color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>02 — Vertical scroll → horizontal travel</p>
          <div ref={trackRef} style={{ display: 'flex', gap: '2rem', paddingInline: 'var(--gutter)', willChange: 'transform' }}>
            {PANELS.map((p) => (
              <div key={p.n} style={{ flex: '0 0 min(74vw,620px)', height: '62vh', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--card)', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.16em', color: 'var(--gold)', textTransform: 'uppercase' }}>{p.n}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2.6rem)', letterSpacing: '-0.02em', marginBottom: '0.8rem' }}>{p.h}</h3>
                  <p style={{ color: 'var(--ink-2)', maxWidth: '40ch' }}>{p.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 — STACKING CARDS */}
      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '6vh var(--gutter) 0' }}>
        {kicker('03 — Stacking pin')}
        {CARDS.map((c, i) => (
          <div key={i} style={{ position: 'sticky', top: '14vh', margin: '0 auto 8vh', height: '58vh', borderRadius: '24px', padding: '2.75rem', border: '1px solid var(--border)', boxShadow: '0 30px 80px -40px #000', background: c.g, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,3.4vw,2.8rem)', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>{c.h}</h3>
            <p style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '44ch' }}>{c.p}</p>
          </div>
        ))}
      </div>

      {/* 4 — SCROLL-LINKED COUNTERS + parallax glow */}
      <div style={{ position: 'relative', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '16vh var(--gutter)', overflow: 'hidden' }}>
        <div ref={glowRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(50% 40% at 50% 30%, var(--gold-dim), transparent 70%)', willChange: 'transform' }} />
        <div style={{ position: 'relative' }}>
          {kicker('04 — Scroll-linked counters')}
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.025em', marginBottom: '3rem' }}>Numbers that count when seen.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.75rem' }}>
            {STATS.map((s) => <Counter key={s.label} {...s} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
