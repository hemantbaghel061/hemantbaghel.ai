"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

// deterministic pseudo-random + value-noise so the terrain is stable across renders
function makeNoise2D(seed: number) {
  const perm = new Uint8Array(512);
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number) => {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return (h & 1 ? -u : u) + (h & 2 ? -v : v);
  };

  return (x: number, y: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[X + perm[Y]];
    const ab = perm[X + perm[Y + 1]];
    const ba = perm[X + 1 + perm[Y]];
    const bb = perm[X + 1 + perm[Y + 1]];
    return lerp(
      lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
      lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
      v
    );
  };
}

function fbm(noise: (x: number, y: number) => number, x: number, y: number) {
  let total = 0;
  let amp = 0.55;
  let freq = 1;
  for (let i = 0; i < 5; i++) {
    total += noise(x * freq, y * freq) * amp;
    freq *= 2.02;
    amp *= 0.52;
  }
  return total;
}

export default function MissionTerrain({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const o = 1 - smoothstep(0.3, 0.55, progressRef.current);
    if (group.current) group.current.visible = o > 0.01;
    if (matRef.current) matRef.current.opacity = o;
  });

  const geometry = useMemo(() => {
    const size = 60;
    const segments = 140;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const noise = makeNoise2D(1337);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);

    const ridgeColorLow = new THREE.Color("#0d120d");
    const ridgeColorMid = new THREE.Color("#1c2a1a");
    const ridgeColorHigh = new THREE.Color("#3a4a34");

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const falloff = Math.max(0, 1 - dist / (size * 0.62));
      let h = fbm(noise, x * 0.08, z * 0.08) * 3.4;
      h *= 0.35 + 0.65 * falloff;
      pos.setY(i, h);

      const t = THREE.MathUtils.clamp((h + 1.2) / 3, 0, 1);
      const c =
        t < 0.5
          ? ridgeColorLow.clone().lerp(ridgeColorMid, t / 0.5)
          : ridgeColorMid.clone().lerp(ridgeColorHigh, (t - 0.5) / 0.5);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group ref={group} position={[0, -2.4, -6]}>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial
          ref={matRef}
          vertexColors
          roughness={0.95}
          metalness={0.05}
          transparent
          fog
        />
      </mesh>
    </group>
  );
}
