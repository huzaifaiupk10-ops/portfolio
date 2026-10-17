import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

// Scroll-linked section entrance: the next section rises in as a rounded,
// slightly scaled-down card and settles to full-bleed as it reaches the top.
// overflow: clip (not hidden) so sticky children inside keep working.
// No permanent will-change: these wrappers are many screens tall, and a pinned GPU
// layer that size is costly. Once settled, framer writes transform:none and the layer drops.
export default function SectionTransition({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const scale = useTransform(p, [0, 1], [0.9, 1]);
  const y = useTransform(p, [0, 1], [90, 0]);
  const radius = useTransform(p, [0, 1], [48, 0]);
  const opacity = useTransform(p, [0, 0.6], [0.35, 1]);

  if (reduce) return <div>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{
        scale, y, opacity,
        borderTopLeftRadius: radius, borderTopRightRadius: radius,
        transformOrigin: '50% 0%',
        overflow: 'clip',
        position: 'relative',
        background: 'var(--bg)',
        boxShadow: '0 -40px 90px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(212,164,95,0.18)',
      }}
    >
      {children}
    </motion.div>
  );
}
