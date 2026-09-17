"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Aircraft from "./Aircraft";
import ArucoMarker from "./ArucoMarker";

function makeParticlePositions(count: number, seed: number) {
  // simple deterministic pseudo-random generator so this stays a pure function
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (rand() - 0.5) * 8;
    arr[i * 3 + 1] = (rand() - 0.5) * 5;
    arr[i * 3 + 2] = (rand() - 0.5) * 6;
  }
  return arr;
}

function Particles({ count = 140 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => makeParticlePositions(count, 42), [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#4e7cff" size={0.02} transparent opacity={0.5} />
    </points>
  );
}

function GroundGrid() {
  return (
    <gridHelper
      args={[14, 28, "#26292f", "#1a1d22"]}
      position={[0, -1.1, 0]}
    />
  );
}

function RigWithMouse({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y +=
      (mouse.current.x * 0.25 - group.current.rotation.y) * 0.04;
    group.current.rotation.x +=
      (-mouse.current.y * 0.12 - group.current.rotation.x) * 0.04;
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [2.4, 0.9, 4.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={0.8} color="#f5f3ee" />
      <fog attach="fog" args={["#0a0b0d", 5, 12]} />

      <RigWithMouse>
        <Aircraft position={[0.2, 0.15, 0]} scale={1.1} />
        <ArucoMarker position={[1.7, -0.75, 0.6]} scale={1} />
        <GroundGrid />
        <Particles />
      </RigWithMouse>
    </Canvas>
  );
}
