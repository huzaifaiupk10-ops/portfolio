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

    const PARTICLE_COUNT = 40;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.3 + 0.05,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Single subtle glow
      const g1 = ctx.createRadialGradient(w * 0.7, h * 0.2, 0, w * 0.7, h * 0.2, w * 0.4);
      g1.addColorStop(0, 'rgba(30,64,175,0.07)');
      g1.addColorStop(1, 'rgba(5,7,10,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

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
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
        aria-hidden="true"
      />
      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(192,199,209,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(192,199,209,0.018) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </>
  );
}
