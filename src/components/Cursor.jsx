import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const [state, setState] = useState('default'); // default | hover | drag

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    let visible = false;

    const onMove = (e) => {
      el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
      if (!visible) { el.style.opacity = '1'; visible = true; }
    };

    const onOver = (e) => {
      const link = e.target.closest('a,button,[role=button]');
      const draggable = e.target.closest('[data-drag]');
      if (draggable) { setState('drag'); return; }
      if (link) { setState('hover'); return; }
    };

    const onOut = (e) => {
      const link = e.target.closest('a,button,[role=button]');
      const draggable = e.target.closest('[data-drag]');
      if (link || draggable) setState('default');
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

  const isHover = state === 'hover';
  const isDrag  = state === 'drag';
  const expanded = isHover || isDrag;
  const label = isDrag ? 'DRAG' : 'VIEW';

  return (
    <div
      data-cursor
      ref={cursorRef}
      style={{
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999,
        opacity: 0, willChange: 'transform',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width:  expanded ? (isDrag ? 72 : 64) : 10,
        height: expanded ? (isDrag ? 72 : 64) : 10,
        borderRadius: '999px',
        background: expanded ? 'var(--gold)' : 'var(--gold)',
        transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: '0.6rem',
        letterSpacing: '0.14em',
        color: '#0A0A0A',
        opacity: expanded ? 1 : 0,
        transform: expanded ? 'scale(1)' : 'scale(0.5)',
        transition: 'opacity 0.2s 0.1s, transform 0.25s 0.05s cubic-bezier(0.16,1,0.3,1)',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}
