"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MissionTerrain from "./MissionTerrain";
import MissionDrone from "./MissionDrone";
import MissionSwarm from "./MissionSwarm";
import MissionGlobe from "./MissionGlobe";

type ProgressRef = React.MutableRefObject<number>;

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

// camera keyframes: [progress, position, lookAt]
const KEYFRAMES: { p: number; pos: [number, number, number]; look: [number, number, number] }[] = [
  { p: 0.0, pos: [0.6, 1.3, 6.2], look: [0, 0.3, -1] },
  { p: 0.2, pos: [1.6, 0.55, 3.1], look: [0.6, 0.15, -1.4] },
  { p: 0.4, pos: [0.2, 2.6, 4.2], look: [0, 0.1, -1] },
  { p: 0.6, pos: [0, 1.6, 4.6], look: [0, -0.2, -1] },
  { p: 0.8, pos: [0.4, 0.6, 4.6], look: [0, 0.2, -3] },
  { p: 1.0, pos: [0, 0.75, 4.4], look: [0, 0.1, 0] },
];

function lerpKeyframes(t: number) {
  let i = 0;
  while (i < KEYFRAMES.length - 2 && t > KEYFRAMES[i + 1].p) i++;
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  const local = smoothstep(a.p, b.p, t);
  const pos = new THREE.Vector3(...a.pos).lerp(new THREE.Vector3(...b.pos), local);
  const look = new THREE.Vector3(...a.look).lerp(new THREE.Vector3(...b.look), local);
  return { pos, look };
}

function Rig({ progressRef }: { progressRef: ProgressRef }) {
  const droneRef = useRef<THREE.Group>(null);
  const fogRef = useRef<THREE.Fog>(null);
  const lookTarget = useRef(new THREE.Vector3());

  useFrame(({ camera, scene }, delta) => {
    const t = progressRef.current;
    const { pos, look } = lerpKeyframes(t);
    const damp = 1 - Math.pow(0.001, delta);

    camera.position.lerp(pos, damp);
    lookTarget.current.lerp(look, damp);
    camera.lookAt(lookTarget.current);

    // background + fog darken from misty terrain green-grey to deep space black
    const bgT = smoothstep(0.0, 0.85, t);
    const bg = new THREE.Color("#1b1f1c").lerp(new THREE.Color("#05060a"), bgT);
    scene.background = bg;
    if (fogRef.current) {
      fogRef.current.color = bg;
      fogRef.current.near = 4 + bgT * 4;
      fogRef.current.far = 15 - bgT * 4;
    }

    if (droneRef.current) {
      const elapsed = performance.now() / 1000;
      const settle = smoothstep(0.85, 1, t);
      // final stretch of the scroll: the aircraft rushes the camera and
      // punches past it, off the edge of the viewport, for a pop-out 3D exit
      const flyOut = smoothstep(0.9, 1, t);

      droneRef.current.position.y =
        Math.sin(elapsed * 0.6) * 0.06 - settle * 0.1 + flyOut * 0.35;
      droneRef.current.rotation.z =
        Math.sin(elapsed * 0.4) * 0.05 -
        smoothstep(0.15, 0.35, t) * 0.35 +
        smoothstep(0.35, 0.5, t) * 0.35;
      droneRef.current.rotation.x = -smoothstep(0.15, 0.3, t) * 0.08 - flyOut * 0.5;
      droneRef.current.position.x =
        THREE.MathUtils.lerp(0, 0.15, smoothstep(0.15, 0.35, t)) -
        smoothstep(0.35, 0.55, t) * 0.15 +
        flyOut * 0.6;
      droneRef.current.position.z =
        THREE.MathUtils.lerp(-0.3, 0.5, smoothstep(0.6, 1, t)) + flyOut * flyOut * 7;
      // bigger overall silhouette throughout, then a dramatic blow-up as it exits
      droneRef.current.scale.setScalar(
        THREE.MathUtils.lerp(1.3, 1.6, smoothstep(0.8, 1, t)) + flyOut * 2.2
      );
    }
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={["#1b1f1c", 4, 15]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 5, 2]} intensity={0.9} color="#f5f3ee" />
      <directionalLight position={[-4, 2, -3]} intensity={0.25} color="#4e7cff" />

      <MissionTerrain progressRef={progressRef} />
      <MissionDrone ref={droneRef} position={[0, 0.15, 0]} scale={1.3} />
      <MissionSwarm progressRef={progressRef} />
      <MissionGlobe progressRef={progressRef} />
    </>
  );
}

export default function MissionCanvas({ progressRef }: { progressRef: ProgressRef }) {
  return (
    <Canvas
      camera={{ position: [0.6, 1.3, 6.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
    >
      <Rig progressRef={progressRef} />
    </Canvas>
  );
}
