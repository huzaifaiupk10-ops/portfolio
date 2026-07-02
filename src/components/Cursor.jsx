import { useEffect, useRef } from 'react';

export default function Cursor() {
  const crossRef = useRef(null);

  useEffect(() => {
    const el = crossRef.current;
    if (!el) return;
    const hLine = el.querySelector('.ch-h');
    const vLine = el.querySelector('.ch-v');
    const dot   = el.querySelector('.ch-dot');
    let visible = false;
    let hovering = false;

    const onMove = (e) => {
      el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
      if (!visible) { el.style.opacity = '1'; visible = true; }
    };
    const onOver = (e) => {
      if (e.target.closest('a,button,[role=button]')) {
        hovering = true;
        hLine.style.width = '20px';
        vLine.style.height = '20px';
        dot.style.transform = 'translate(-50%,-50%) scale(2.5)';
        dot.style.opacity = '1';
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a,button,[role=button]')) {
        hovering = false;
        hLine.style.width = '28px';
        vLine.style.height = '28px';
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        dot.style.opacity = '0.7';
      }
    };
    const onLeave = () => { el.style.opacity = '0'; visible = false; };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const line = { position: 'absolute', background: 'var(--gold)', borderRadius: 1, transition: 'width 0.18s ease, height 0.18s ease' };

  return (
    <div data-cursor ref={crossRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999, opacity: 0, willChange: 'transform', transition: 'opacity 0.2s' }}>
      {/* Horizontal arm */}
      <div className="ch-h" style={{ ...line, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 28, height: 1.5 }} />
      {/* Vertical arm */}
      <div className="ch-v" style={{ ...line, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 1.5, height: 28 }} />
      {/* Center dot */}
      <div className="ch-dot" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) scale(1)', width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', opacity: 0.7, transition: 'transform 0.18s ease, opacity 0.18s' }} />
    </div>
  );
}
