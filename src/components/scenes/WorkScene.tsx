"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Aircraft from "./Aircraft";
import ArucoMarker from "./ArucoMarker";

const wire = "#4e7cff";
const surface = "#1a1d22";

function Bob({
  children,
  speed = 1,
  offset = 0,
  position,
}: {
  children: React.ReactNode;
  speed?: number;
  offset?: number;
  position: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    group.current.position.y = position[1] + Math.sin(t) * 0.12;
    group.current.rotation.y = t * 0.3;
  });
  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
}

function HighlightRing({ active }: { active: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ring.current) return;
    const s = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.05;
    ring.current.scale.setScalar(active ? s : 0);
  });
  return (
    <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.55, 0.62, 32]} />
      <meshBasicMaterial color={wire} transparent opacity={0.7} />
    </mesh>
  );
}

function QRTag({ active }: { active: boolean }) {
  return (
    <group scale={active ? 1.15 : 1}>
      <mesh>
        <boxGeometry args={[0.55, 0.75, 0.06]} />
        <meshStandardMaterial color={surface} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial color={active ? wire : "#f5f3ee"} />
      </mesh>
      <HighlightRing active={active} />
    </group>
  );
}

function DetectionCube({ active }: { active: boolean }) {
  return (
    <group scale={active ? 1.15 : 1}>
      <mesh>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshBasicMaterial color={wire} wireframe transparent opacity={0.8} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={surface}
          transparent
          opacity={0.4}
          roughness={0.4}
        />
      </mesh>
      <HighlightRing active={active} />
    </group>
  );
}

function MiniAircraft({ active }: { active: boolean }) {
  return (
    <group scale={active ? 0.85 : 0.7}>
      <Aircraft position={[0, 0, 0]} scale={1} />
      <HighlightRing active={active} />
    </group>
  );
}

function MiniMarker({ active }: { active: boolean }) {
  return (
    <group scale={active ? 1.15 : 1}>
      <ArucoMarker position={[0, 0, 0]} scale={1} />
      <HighlightRing active={active} />
    </group>
  );
}

const layout: { id: string; x: number; component: "aircraft" | "marker" | "tag" | "cube" }[] = [
  { id: "acs", x: -2.7, component: "aircraft" },
  { id: "arrester-barrier", x: -0.9, component: "marker" },
  { id: "safetag", x: 0.9, component: "tag" },
  { id: "yolo-vision", x: 2.7, component: "cube" },
];

export default function WorkScene({ activeId }: { activeId: string | null }) {
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(60 * 3);
    let s = 7;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    for (let i = 0; i < 60; i++) {
      arr[i * 3] = (rand() - 0.5) * 8;
      arr[i * 3 + 1] = (rand() - 0.5) * 2.4;
      arr[i * 3 + 2] = (rand() - 0.5) * 3;
    }
    return arr;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.6, 5.5], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 2]} intensity={0.7} color="#f5f3ee" />
      <fog attach="fog" args={["#0a0b0d", 6, 11]} />

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={wire} size={0.015} transparent opacity={0.35} />
      </points>

      {layout.map((item, i) => {
        const active = activeId === item.id;
        return (
          <Bob key={item.id} position={[item.x, 0, 0]} speed={0.6} offset={i * 1.7}>
            {item.component === "aircraft" && <MiniAircraft active={active} />}
            {item.component === "marker" && <MiniMarker active={active} />}
            {item.component === "tag" && <QRTag active={active} />}
            {item.component === "cube" && <DetectionCube active={active} />}
          </Bob>
        );
      })}
    </Canvas>
  );
}
