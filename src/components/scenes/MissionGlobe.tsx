"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function makeArc(a: THREE.Vector3, b: THREE.Vector3, r: number) {
  const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(r * 1.35);
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  return new THREE.TubeGeometry(curve, 32, 0.012, 6, false);
}

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export default function MissionGlobe({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const wireMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const arcMatRefs = useRef<THREE.MeshBasicMaterial[]>([]);

  const radius = 2.1;

  const arcs = useMemo(() => {
    const routes: [number, number, number, number][] = [
      [37.4, -119.8, 51.5, -0.12],
      [28.6, 77.2, 35.6, 139.7],
      [37.4, -119.8, 28.6, 77.2],
    ];
    return routes.map(([lat1, lon1, lat2, lon2]) =>
      makeArc(latLonToVec3(lat1, lon1, radius), latLonToVec3(lat2, lon2, radius), radius)
    );
  }, []);

  useFrame((state) => {
    const t = progressRef.current;
    const opacity = smoothstep(0.62, 0.75, t);

    if (group.current) {
      group.current.visible = opacity > 0.01;
      group.current.rotation.y = state.clock.getElapsedTime() * 0.06;
    }
    if (wireMatRef.current) wireMatRef.current.opacity = opacity * 0.35;
    arcMatRefs.current.forEach((m) => {
      if (m) m.opacity = opacity;
    });
  });

  return (
    <group ref={group} position={[0, 0.2, -3]}>
      <mesh>
        <sphereGeometry args={[radius, 28, 20]} />
        <meshBasicMaterial
          ref={wireMatRef}
          color="#8b8f97"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 0.985, 32, 24]} />
        <meshBasicMaterial color="#0a0b0d" transparent opacity={0.9} />
      </mesh>
      {arcs.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial
            ref={(el) => {
              if (el) arcMatRefs.current[i] = el;
            }}
            color="#4e7cff"
            transparent
            opacity={1}
          />
        </mesh>
      ))}
    </group>
  );
}
