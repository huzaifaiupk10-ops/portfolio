// Runs `tick` every animation frame, but only while `el` is near the viewport.
// Off-screen sections stop costing anything. Returns a cleanup function.
export function rafWhenVisible(el, tick, { margin = '200px', onVisibleChange } = {}) {
  let raf = 0, on = false;
  const loop = (t) => { tick(t); raf = requestAnimationFrame(loop); };
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !on) { on = true; raf = requestAnimationFrame(loop); onVisibleChange?.(true); }
    else if (!entry.isIntersecting && on) { on = false; cancelAnimationFrame(raf); onVisibleChange?.(false); }
  }, { rootMargin: margin });
  io.observe(el);
  return () => { io.disconnect(); cancelAnimationFrame(raf); };
}
