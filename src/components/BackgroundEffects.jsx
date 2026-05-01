import { useEffect, useRef } from 'react';

// Canvas-based particle field + gradient orbs
export default function BackgroundEffects() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = 70;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Radial glow — top-right hero area
      const g1 = ctx.createRadialGradient(w * 0.75, h * 0.25, 0, w * 0.75, h * 0.25, w * 0.45);
      g1.addColorStop(0, 'rgba(30,64,175,0.12)');
      g1.addColorStop(1, 'rgba(5,7,10,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Radial glow — bottom-left
      const g2 = ctx.createRadialGradient(w * 0.15, h * 0.8, 0, w * 0.15, h * 0.8, w * 0.35);
      g2.addColorStop(0, 'rgba(11,18,32,0.2)');
      g2.addColorStop(1, 'rgba(5,7,10,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192,199,209,${p.alpha})`;
        ctx.fill();
      });

      // Connection lines between nearby particles
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            const op = (1 - dist / 100) * 0.08;
            ctx.strokeStyle = `rgba(147,197,253,${op})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      {/* Canvas particle field */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.9 }}
        aria-hidden="true"
      />

      {/* Static gradient noise layers */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 10%, rgba(30,64,175,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(11,18,32,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(192,199,209,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(192,199,209,0.022) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </>
  );
}
