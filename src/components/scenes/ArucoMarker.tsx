"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function makeMarkerTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#f5f3ee";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#0a0b0d";
  const cells = 6;
  const cell = size / cells;
  // deterministic pseudo-random pattern, aruco-like border + inner grid
  const pattern = [
    1, 1, 1, 1, 1, 1,
    1, 0, 1, 0, 1, 1,
    1, 0, 0, 1, 0, 1,
    1, 1, 0, 0, 1, 1,
    1, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1,
  ];
  pattern.forEach((v, i) => {
    if (v) {
      const x = (i % cells) * cell;
      const y = Math.floor(i / cells) * cell;
      ctx.fillRect(x, y, cell, cell);
    }
  });
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export default function ArucoMarker({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => makeMarkerTexture(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.5;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <planeGeometry args={[0.6, 0.6]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}
