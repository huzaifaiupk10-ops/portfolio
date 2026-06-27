import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let mouse = { x: -100, y: -100 };
    let pos = { x: -100, y: -100 };
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const onMove = (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      dot.style.opacity = '1'; ring.style.opacity = '1';
      dot.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0) translate(-50%,-50%)`;
    };
    const onOver = (e) => { if (e.target.closest('a,button,[role=button]')) { ring.classList.add('cursor-hover'); dot.style.opacity = '0'; } };
    const onOut = (e) => { if (e.target.closest('a,button,[role=button]')) { ring.classList.remove('cursor-hover'); dot.style.opacity = '1'; } };
    const tick = () => {
      pos.x = lerp(pos.x, mouse.x, 0.1); pos.y = lerp(pos.y, mouse.y, 0.1);
      ring.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); document.removeEventListener('mouseout', onOut); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:99999,width:5,height:5,borderRadius:'50%',background:'var(--gold)',opacity:0,willChange:'transform',transition:'opacity 0.2s' }} />
      <div ref={ringRef} className="cursor-ring" style={{ position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:99998,width:28,height:28,borderRadius:'50%',border:'1.5px solid rgba(201,168,76,0.45)',opacity:0,willChange:'transform' }} />
    </>
  );
}
