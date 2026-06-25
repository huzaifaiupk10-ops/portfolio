import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

function LocalEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromScene(new RoomEnvironment()).texture;
    scene.environment = envMap;
    pmrem.dispose();
    return () => { scene.environment = null; envMap.dispose(); };
  }, [gl, scene]);
  return null;
}

// ── Central AI Brain Core ────────────────────────────────────
function AICore() {
  const coreRef  = useRef();
  const innerRef = useRef();

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12;
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.material.emissiveIntensity =
        0.6 + Math.sin(t * 2.0) * 0.3;
      innerRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <group>
      {/* Outer clean black metallic sphere — kept black */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.88, 128, 128]} />
        <meshStandardMaterial
          color="#050D1A"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* Inner glowing core — beige warmth */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshStandardMaterial
          color="#1A100A"
          emissive="#C8A898"
          emissiveIntensity={0.7}
          metalness={0.4}
          roughness={0.1}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Core point light — warm beige */}
      <pointLight color="#C8A898" intensity={2.2} distance={5} />
    </group>
  );
}

// ── Neural network nodes + connections ───────────────────────
function NeuralNetwork() {
  const groupRef = useRef();
  const linesRef = useRef();

  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 28; i++) {
      const phi   = Math.acos(-1 + (2 * i) / 28);
      const theta = Math.sqrt(28 * Math.PI) * phi;
      pts.push(new THREE.Vector3(
        1.12 * Math.cos(theta) * Math.sin(phi),
        1.12 * Math.sin(theta) * Math.sin(phi),
        1.12 * Math.cos(phi)
      ));
    }
    return pts;
  }, []);

  const edges = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.05) {
          lines.push([nodes[i], nodes[j]]);
        }
      }
    }
    return lines;
  }, [nodes]);

  const lineGeometry = useMemo(() => {
    const pts = [];
    edges.forEach(([a, b]) => { pts.push(a, b); });
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [edges]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.09;
      groupRef.current.rotation.x = Math.sin(t * 0.22) * 0.18;
    }
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.18 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines — warm beige */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#C8A898" transparent opacity={0.22} linewidth={1} />
      </lineSegments>

      {nodes.map((pos, i) => (
        <NodeSphere key={i} position={pos} index={i} />
      ))}
    </group>
  );
}

function NodeSphere({ position, index }) {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity =
        0.4 + Math.sin(s.clock.elapsedTime * 1.8 + index * 0.45) * 0.35;
      const sc = 1 + Math.sin(s.clock.elapsedTime * 2 + index * 0.6) * 0.15;
      ref.current.scale.setScalar(sc);
    }
  });
  const colors = ['#C8A898', '#DEC0B0', '#C8A898', '#F0E0D8', '#8C6A5E'];
  const color  = colors[index % colors.length];
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0}
        metalness={0.3}
      />
    </mesh>
  );
}

// ── Data packets flowing along edges ─────────────────────────
function DataFlow({ edges }) {
  const refs = useRef([]);
  const PACKETS = 18;

  const assignments = useMemo(() =>
    Array.from({ length: PACKETS }, (_, i) => edges[i % edges.length]),
  [edges]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m || !assignments[i]) return;
      const [a, b] = assignments[i];
      const progress = ((t * 0.55 + i * 0.18) % 1);
      m.position.lerpVectors(a, b, progress);
      m.material.opacity = Math.sin(progress * Math.PI) * 0.9;
    });
  });

  return (
    <>
      {assignments.map((_, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial
            color="#F0E0D8"
            emissive="#DEC0B0"
            emissiveIntensity={1.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </>
  );
}

// ── Orbital rings ────────────────────────────────────────────
function OrbitalRings() {
  const r1 = useRef(), r2 = useRef(), r3 = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (r1.current) r1.current.rotation.z = t * 0.30;
    if (r2.current) { r2.current.rotation.x = t * 0.22; r2.current.rotation.y = t * 0.10; }
    if (r3.current) { r3.current.rotation.y = t * 0.18; r3.current.rotation.z = -t * 0.14; }
  });
  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.013, 16, 120]} />
        <meshStandardMaterial color="#C8A898" emissive="#8C6A5E" emissiveIntensity={0.7} metalness={1} roughness={0} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.85, 0.009, 16, 120]} />
        <meshStandardMaterial color="#DEC0B0" emissive="#C8A898" emissiveIntensity={0.4} metalness={1} roughness={0} transparent opacity={0.6} />
      </mesh>
      <mesh ref={r3} rotation={[-Math.PI / 5, Math.PI / 3, 0]}>
        <torusGeometry args={[2.1, 0.007, 12, 100]} />
        <meshStandardMaterial color="#F0E0D8" emissive="#C8A898" emissiveIntensity={0.15} metalness={1} roughness={0} transparent opacity={0.3} />
      </mesh>
    </>
  );
}

// ── Scene wrapper ────────────────────────────────────────────
function AIScene({ clicked }) {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 28; i++) {
      const phi   = Math.acos(-1 + (2 * i) / 28);
      const theta = Math.sqrt(28 * Math.PI) * phi;
      pts.push(new THREE.Vector3(
        1.12 * Math.cos(theta) * Math.sin(phi),
        1.12 * Math.sin(theta) * Math.sin(phi),
        1.12 * Math.cos(phi)
      ));
    }
    return pts;
  }, []);

  const edges = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++)
        if (nodes[i].distanceTo(nodes[j]) < 1.05)
          lines.push([nodes[i], nodes[j]]);
    return lines;
  }, [nodes]);

  useFrame((s) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (s.pointer.x * 0.5 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x +=
      (-s.pointer.y * 0.25 - groupRef.current.rotation.x) * 0.04;
    if (clicked) groupRef.current.rotation.y += 0.06;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.7}>
      <group ref={groupRef}>
        <AICore />
        <NeuralNetwork />
        <DataFlow edges={edges} />
        <OrbitalRings />
      </group>
    </Float>
  );
}

function ReadySignal({ onReady }) {
  useEffect(() => { onReady(); }, []);
  return null;
}

class CanvasErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

// ── Main export ──────────────────────────────────────────────
export default function ThreeHeroObject() {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ready, setReady]     = useState(false);

  return (
    <div className="w-full h-full relative" aria-hidden="true"
      style={{ cursor: hovered ? 'pointer' : 'default' }}>
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 6.0], fov: 42 }}
          gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false, powerPreference: 'default' }}
          style={{ background: 'transparent', opacity: ready ? 1 : 0, transition: 'opacity 0.8s ease' }}
          dpr={[1, 1.5]}
          onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 900); }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <ReadySignal onReady={() => setReady(true)} />
          <LocalEnv />
          <ambientLight intensity={0.1} />
          <directionalLight position={[5, 5, 5]}   intensity={0.5} color="#DEC0B0" />
          <directionalLight position={[-5,-3,-5]}   intensity={0.2} color="#8C6A5E" />
          <Suspense fallback={null}>
            <AIScene clicked={clicked} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>

      <div style={{
        position:'absolute', bottom:'10px', left:'50%',
        transform:'translateX(-50%)',
        opacity: hovered ? 1 : 0, transition:'opacity 0.25s ease',
        background:'rgba(2,8,16,0.85)', border:'1px solid rgba(200,168,152,0.3)',
        color:'#C8A898', fontSize:'11px', fontWeight:500,
        padding:'4px 14px', borderRadius:'999px', backdropFilter:'blur(8px)',
        whiteSpace:'nowrap', pointerEvents:'none', zIndex:10,
      }}>
        Click to interact ✦
      </div>
    </div>
  );
}
