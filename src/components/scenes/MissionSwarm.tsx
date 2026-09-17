"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export default function MissionSwarm({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const nodeMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const { positions, lineGeometry, count } = useMemo(() => {
    const rand = seededRand(77);
    const cols = 7;
    const rows = 5;
    const n = cols * rows;
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * 1.5 + (rand() - 0.5) * 0.6;
      const z = (row - (rows - 1) / 2) * 1.3 + (rand() - 0.5) * 0.6;
      const y = (rand() - 0.5) * 0.5;
      pos.push(new THREE.Vector3(x, y, z));
    }

    // connect each node to its 2 nearest neighbours for a mesh-like web
    const linePoints: number[] = [];
    for (let i = 0; i < pos.length; i++) {
      const dists = pos
        .map((p, j) => ({ j, d: p.distanceTo(pos[i]) }))
        .filter((d) => d.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      dists.forEach(({ j }) => {
        linePoints.push(pos[i].x, pos[i].y, pos[i].z, pos[j].x, pos[j].y, pos[j].z);
      });
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePoints, 3)
    );

    return { positions: pos, lineGeometry: lineGeo, count: n };
  }, []);

  useFrame((state) => {
    const t = progressRef.current;
    const opacity =
      smoothstep(0.32, 0.45, t) * (1 - smoothstep(0.62, 0.78, t));

    if (group.current) {
      group.current.visible = opacity > 0.01;
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.15;
    }
    if (lineMatRef.current) lineMatRef.current.opacity = opacity * 0.35;
    if (nodeMatRef.current) nodeMatRef.current.opacity = opacity;

    if (nodesRef.current) {
      const t = state.clock.getElapsedTime();
      const dummy = new THREE.Object3D();
      positions.forEach((p, i) => {
        dummy.position.set(p.x, p.y + Math.sin(t * 0.8 + i) * 0.08, p.z);
        dummy.scale.setScalar(0.06);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={[0, -0.4, -1]}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          ref={lineMatRef}
          color="#8b8f97"
          transparent
          opacity={0.35}
        />
      </lineSegments>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, count]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          ref={nodeMatRef}
          color="#4e7cff"
          transparent
          opacity={1}
        />
      </instancedMesh>
    </group>
  );
}
