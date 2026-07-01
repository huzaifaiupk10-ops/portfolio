import { useScroll, useSpring, useTransform, motion } from 'framer-motion';

export default function ScrollLine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const opacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

  return (
    <motion.div
      style={{ opacity, position: 'fixed', left: 20, top: 0, bottom: 0, width: 1, zIndex: 40, pointerEvents: 'none' }}
    >
      {/* Track */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(201,168,76,0.1)', borderRadius: 1 }} />
      {/* Fill */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          scaleY, transformOrigin: 'top',
          background: 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.4))',
          borderRadius: 1,
          boxShadow: '0 0 6px rgba(201,168,76,0.5)',
        }}
      />
      {/* Glowing dot at tip */}
      <motion.div
        style={{
          position: 'absolute', left: '50%', translateX: '-50%',
          top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
          width: 5, height: 5, borderRadius: '50%',
          background: '#C9A84C',
          boxShadow: '0 0 10px 3px rgba(201,168,76,0.7)',
          translateY: '-50%',
        }}
      />
    </motion.div>
  );
}
