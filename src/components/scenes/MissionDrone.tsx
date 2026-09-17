"use client";

import { forwardRef, useMemo } from "react";
import * as THREE from "three";

const body = "#14161a";
const wire = "#4e7cff";
const bone = "#8b8f97";

function useWingGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.35);
    shape.lineTo(1.05, -0.55);
    shape.lineTo(0.85, -0.62);
    shape.lineTo(0.42, -0.3);
    shape.lineTo(0.16, -0.95);
    shape.lineTo(-0.16, -0.95);
    shape.lineTo(-0.42, -0.3);
    shape.lineTo(-0.85, -0.62);
    shape.lineTo(-1.05, -0.55);
    shape.lineTo(0, 1.35);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.09,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 1,
      curveSegments: 2,
    });
    geo.rotateX(Math.PI / 2);
    geo.translate(0, 0, 0);
    return geo;
  }, []);
}

type MissionDroneProps = {
  position?: [number, number, number];
  scale?: number;
};

const MissionDrone = forwardRef<THREE.Group, MissionDroneProps>(function MissionDrone(
  { position = [0, 0, 0], scale = 1 },
  ref
) {
  const wingGeo = useWingGeometry();

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* main flying-wing body */}
      <mesh geometry={wingGeo} castShadow>
        <meshStandardMaterial color={body} roughness={0.45} metalness={0.55} />
      </mesh>
      <mesh geometry={wingGeo} scale={[1.01, 1.01, 1.05]}>
        <meshBasicMaterial color={wire} wireframe transparent opacity={0.18} />
      </mesh>

      {/* raised spine / sensor hump */}
      <mesh position={[0, 0.07, 0.15]}>
        <boxGeometry args={[0.22, 0.1, 0.55]} />
        <meshStandardMaterial color={body} roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.03, 0.55]}>
        <sphereGeometry args={[0.07, 10, 8]} />
        <meshStandardMaterial
          color="#0a0b0d"
          emissive={wire}
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* wingtip fins */}
      <mesh position={[0.95, 0.08, -0.55]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.03, 0.28, 0.4]} />
        <meshStandardMaterial color={body} roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[-0.95, 0.08, -0.55]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.03, 0.28, 0.4]} />
        <meshStandardMaterial color={body} roughness={0.5} metalness={0.4} />
      </mesh>

      {/* rear engine glow */}
      <mesh position={[0, 0, -0.9]}>
        <circleGeometry args={[0.12, 12]} />
        <meshStandardMaterial
          color="#0a0b0d"
          emissive={bone}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* under-belly sensor pod */}
      <mesh position={[0, -0.1, 0.3]}>
        <boxGeometry args={[0.12, 0.08, 0.22]} />
        <meshStandardMaterial color="#0a0b0d" roughness={0.6} metalness={0.3} />
      </mesh>
    </group>
  );
});

export default MissionDrone;
