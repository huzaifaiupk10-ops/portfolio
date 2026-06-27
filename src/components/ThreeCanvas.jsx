import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Shape({ type }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.28;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.12;
  });
  const mat = (
    <meshPhysicalMaterial
      color="#C9A84C" metalness={1} roughness={0.02}
      envMapIntensity={4} clearcoat={1} clearcoatRoughness={0} reflectivity={1}
    />
  );
  return (
    <Float speed={1.6} rotationIntensity={0.15} floatIntensity={1.2}>
      <mesh ref={mesh} castShadow>
        {type === 'diamond' && <octahedronGeometry args={[1.6, 0]} />}
        {type === 'torus'   && <torusGeometry args={[1.1, 0.38, 32, 100]} />}
        {type === 'crystal' && <icosahedronGeometry args={[1.4, 1]} />}
        {type === 'knot'    && <torusKnotGeometry args={[0.8, 0.28, 128, 20]} />}
        {mat}
      </mesh>
      <Sparkles count={24} scale={5} size={1.8} speed={0.2} color="#C9A84C" opacity={0.55} />
    </Float>
  );
}

export default function ThreeCanvas({ type = 'diamond', style = {} }) {
  return (
    <Canvas
      style={{ background: 'transparent', ...style }}
      camera={{ position: [0, 0, 5.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.04} />
        <Environment preset="studio" />
        <Shape type={type} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.25} luminanceSmoothing={0.85} intensity={2.2} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
