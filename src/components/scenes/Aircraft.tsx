"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Aircraft({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = position[1] + Math.sin(t * 0.6) * 0.08;
    group.current.rotation.z = Math.sin(t * 0.4) * 0.02;
  });

  const wire = "#4e7cff";
  const body = "#1a1d22";

  return (
    <group ref={group} position={position} scale={scale}>
      {/* fuselage */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.08, 2.4, 8]} />
        <meshStandardMaterial
          color={body}
          emissive={wire}
          emissiveIntensity={0.08}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.08, 2.4, 8, 1, true]} />
        <meshBasicMaterial color={wire} wireframe transparent opacity={0.25} />
      </mesh>

      {/* cockpit */}
      <mesh position={[0.95, 0.05, 0]}>
        <sphereGeometry args={[0.14, 8, 6]} />
        <meshStandardMaterial color={body} roughness={0.4} metalness={0.4} />
      </mesh>

      {/* wings */}
      <mesh position={[-0.1, -0.02, 0]}>
        <boxGeometry args={[0.5, 0.03, 2.6]} />
        <meshStandardMaterial color={body} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-0.1, -0.02, 0]}>
        <boxGeometry args={[0.52, 0.05, 2.65]} />
        <meshBasicMaterial color={wire} wireframe transparent opacity={0.3} />
      </mesh>

      {/* tail wing */}
      <mesh position={[-1.05, 0.02, 0]}>
        <boxGeometry args={[0.28, 0.02, 0.9]} />
        <meshStandardMaterial color={body} roughness={0.5} metalness={0.3} />
      </mesh>

      {/* tail fin */}
      <mesh position={[-1.05, 0.28, 0]}>
        <boxGeometry args={[0.28, 0.5, 0.03]} />
        <meshStandardMaterial color={body} roughness={0.5} metalness={0.3} />
      </mesh>

      {/* landing gear hint */}
      <mesh position={[0.15, -0.28, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.22, 4]} />
        <meshBasicMaterial color={wire} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
