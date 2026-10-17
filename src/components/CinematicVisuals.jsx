import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { rafWhenVisible } from '../lib/rafWhenVisible';

const ease = [0.16, 1, 0.3, 1];
const clamp = (n, a = 0, b = 1) => (n < a ? a : n > b ? b : n);
const lerp = (a, b, t) => a + (b - a) * t;

const REELS = [
  { src: '/videos/ugc-motion.mp4', title: 'AI UGC' },
  { src: '/videos/poster-3d-commercial.mp4', title: 'Poster → 3D Commercial' },
  { src: '/videos/motion-graphic.mp4', title: 'Motion Graphic' },
  { src: '/videos/reel-8.mp4', title: 'Static → Motion' },
  { src: '/videos/reel-7.mp4', title: 'Brand Story' },
  { src: '/videos/reel-2.mp4', title: 'Product Reveal' },
  { src: '/videos/reel-4.mp4', title: 'Brand Film' },
  { src: '/videos/reel-6.mp4', title: 'Motion Study' },
];

const GAP = 900, APPROACH = 600;
// camera travels from just-before the first reel to just-past the last
const RANGE = (REELS.length - 1) * GAP + APPROACH + 900;

// Mobile reels: each video plays only while it's on screen.
const playWhenVisible = (v) => {
  if (!v || v._io) return;
  v.muted = true;
  v._io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
  v._io.observe(v);
};

export default function CinematicVisuals() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { isMobile, isTablet } = useBreakpoint();
  const isTouch = isMobile || isTablet;

  const sectionRef = useRef(null);
  const worldRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);
  const barRef = useRef(null);
  const hintRef = useRef(null);
  const nowRef = useRef(null);

  useEffect(() => {
    if (isTouch) return;
    let mx = 0, my = 0, tmx = 0, tmy = 0, lastCenter = -1;
    const onMouse = (e) => { tmx = e.clientX / window.innerWidth - 0.5; tmy = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('mousemove', onMouse);

    const loop = () => {
      const el = sectionRef.current;
      if (el) {
        const vh = window.innerHeight;
        const r = el.getBoundingClientRect();
        const prog = clamp(-r.top / (r.height - vh));
        if (barRef.current) barRef.current.style.width = (prog * 100) + '%';
        if (hintRef.current) hintRef.current.style.opacity = String(clamp(1 - prog * 8));

        const camZ = -APPROACH + prog * RANGE;
        mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
        if (worldRef.current) worldRef.current.style.transform = `rotateY(${-mx * 6}deg) rotateX(${my * 6}deg)`;

        let nearest = 0, nd = 1e9;
        cardRefs.current.forEach((c, i) => {
          if (!c) return;
          const z = -i * GAP + camZ;
          let op = 1;
          if (z > 180) op = clamp(1 - (z - 180) / 340);
          else if (z < -1700) op = clamp(1 - (-z - 1700) / 900);
          const ox = (i % 2 ? 1 : -1) * Math.min(window.innerWidth * 0.16, 210);
          const oy = ((i % 3) - 1) * 60;
          c.style.opacity = op;
          c.style.transform = `translate(-50%,-50%) translate3d(${ox}px,${oy}px,${z}px) rotateY(${ox * 0.015}deg)`;
          c.style.zIndex = String(Math.round(10000 + z));
          const d = Math.abs(z);
          if (op > 0.4 && d < nd) { nd = d; nearest = i; }
        });

        if (nearest !== lastCenter) {
          lastCenter = nearest;
          // only the reel in front plays; the rest stay paused (8 decoding videos at once is heavy)
          videoRefs.current.forEach((v, i) => { if (!v) return; if (i === nearest) v.play?.().catch(() => {}); else v.pause(); });
          if (nowRef.current) nowRef.current.textContent = REELS[nearest].title;
        }
      }
    };
    const stop = rafWhenVisible(sectionRef.current, loop, {
      margin: '0px',
      onVisibleChange: (on) => { if (!on) { lastCenter = -1; videoRefs.current.forEach(v => v?.pause()); } },
    });
    return () => { stop(); window.removeEventListener('mousemove', onMouse); };
  }, [isTouch]); // eslint-disable-line

  const Heading = (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.72rem', color: '#8C6A3A', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem' }}>Motion</p>
      <h2 style={{ color: '#030812', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? 'clamp(2.5rem,10vw,4rem)' : 'clamp(3rem,7vw,5.5rem)', letterSpacing: '-0.03em', lineHeight: 0.9 }}>Cinematic<br />Visuals.</h2>
    </motion.div>
  );

  // ---- Mobile / tablet: stacked reels ----
  if (isTouch) {
    return (
      <section id="cinematic" style={{ padding: '7rem var(--gutter)', background: 'radial-gradient(55% 50% at 50% 45%, #D9AE6E 0%, #EBCE9F 35%, #F8EEDC 65%, #FFFFFF 100%)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', marginBottom: '2.5rem' }}>{Heading}</div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: '1.5rem', justifyItems: 'center' }}>
          {REELS.map((r) => (
            <div key={r.src} style={{ position: 'relative', width: '100%', maxWidth: 300, aspectRatio: '9 / 16', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(3,8,18,0.1)', boxShadow: '0 30px 80px -30px rgba(3,8,18,0.4)' }}>
              <video ref={playWhenVisible} src={r.src} muted loop playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span style={{ position: 'absolute', bottom: 14, left: 14, fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', textShadow: '0 1px 8px #000' }}>{r.title}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ---- Desktop: 3D corridor fly-through of the reels ----
  return (
    <section id="cinematic" ref={sectionRef} style={{ height: `${REELS.length * 100 + 110}vh`, position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', perspective: '1200px', perspectiveOrigin: '50% 46%', background: 'radial-gradient(55% 50% at 50% 45%, #D9AE6E 0%, #EBCE9F 35%, #F8EEDC 65%, #FFFFFF 100%)' }}>
        {/* letterbox bars */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '7vh', background: 'linear-gradient(rgba(255,255,255,0.85), transparent)', zIndex: 3, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '7vh', background: 'linear-gradient(transparent, rgba(255,255,255,0.85))', zIndex: 3, pointerEvents: 'none' }} />

        <div ref={worldRef} style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', willChange: 'transform' }}>
          {REELS.map((r, i) => (
            <div
              key={r.src}
              ref={el => (cardRefs.current[i] = el)}
              style={{ position: 'absolute', top: '50%', left: '50%', width: 270, height: 480, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(3,8,18,0.1)', boxShadow: '0 40px 100px -30px rgba(3,8,18,0.45)', transformStyle: 'preserve-3d', willChange: 'transform, opacity', background: '#08101F' }}
            >
              <video
                ref={el => { videoRefs.current[i] = el; if (el) el.muted = true; }}
                src={r.src}
                muted loop playsInline preload="metadata"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,8,18,0.5), transparent 40%)', pointerEvents: 'none' }} />
            </div>
          ))}
        </div>

        {/* overlays */}
        <div style={{ position: 'absolute', top: '3.5rem', left: 'var(--gutter)', zIndex: 20000, pointerEvents: 'none' }}>{Heading}</div>
        <div style={{ position: 'absolute', bottom: '9vh', left: '50%', transform: 'translateX(-50%)', zIndex: 20000, textAlign: 'center', pointerEvents: 'none' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.66rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#8C6A3A', marginBottom: '0.5rem' }}>Now Playing</div>
          <div ref={nowRef} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#030812' }}>{REELS[0].title}</div>
        </div>
        <div ref={hintRef} style={{ position: 'absolute', bottom: '3.5vh', left: '50%', transform: 'translateX(-50%)', zIndex: 20000, color: 'rgba(3,8,18,0.55)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', transition: 'opacity .4s' }}>Scroll to fly through the reels · move mouse to look</div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, height: 2, width: '100%', zIndex: 20000 }}><div ref={barRef} style={{ height: '100%', width: 0, background: 'var(--gold)' }} /></div>
      </div>
    </section>
  );
}
