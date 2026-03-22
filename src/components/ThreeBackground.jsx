import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShape() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate based on scroll position smoothly
      const scrollY = window.scrollY;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + scrollY * 0.001;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + scrollY * 0.0015;
      
      // Move slightly up and down based on scroll
      meshRef.current.position.y = Math.sin(scrollY * 0.002) * 2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <Icosahedron ref={meshRef} args={[2, 4]}>
        <MeshDistortMaterial
          color="#bc13fe"
          emissive="#00f0ff"
          emissiveIntensity={0.2}
          wireframe
          distort={0.4}
          speed={1.5}
        />
      </Icosahedron>
    </Float>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1, 
      pointerEvents: 'none',
      background: '#0a0a0a'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#bc13fe" />
        <AnimatedShape />
      </Canvas>
    </div>
  );
}
