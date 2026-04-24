"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls, Sky } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGame } from "@/lib/store";
import Player from "./Player";
import Target from "./Target";
import Rifle from "./Rifle";
import Tracers from "./Tracers";

export default function Scene() {
  const targets = useGame((s) => s.targets);
  const phase = useGame((s) => s.phase);
  const controlsRef = useRef<any>(null);
  const { gl } = useThree();

  useEffect(() => {
    // Dim clear color, enable tone mapping
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.1;
  }, [gl]);

  return (
    <>
      {/* Sky + fog for distance fade */}
      <color attach="background" args={["#0a0f1c"]} />
      <fog attach="fog" args={["#0a0f1c", 20, 90]} />

      {/* Lighting */}
      <ambientLight intensity={0.25} color="#6a7aa8" />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.8}
        color="#ffd6a0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      {/* Accent rim light */}
      <pointLight position={[-15, 6, -20]} intensity={40} color="#5ab9ff" distance={40} />
      <pointLight position={[15, 6, -20]} intensity={40} color="#ff4d7a" distance={40} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#141b2c" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Grid overlay */}
      <gridHelper args={[120, 60, "#2a3d66", "#1a2338"]} position={[0, 0.01, 0]} />

      {/* Arena walls */}
      <Wall position={[0, 3, -50]} size={[120, 6, 1]} />
      <Wall position={[0, 3, 10]} size={[120, 6, 1]} />
      <Wall position={[-30, 3, -20]} size={[1, 6, 60]} />
      <Wall position={[30, 3, -20]} size={[1, 6, 60]} />

      {/* Cover boxes */}
      <Cover position={[-4, 0.8, -6]} size={[2, 1.6, 2]} />
      <Cover position={[4, 0.8, -6]} size={[2, 1.6, 2]} />
      <Cover position={[0, 1, -10]} size={[4, 2, 0.6]} />
      <Cover position={[-10, 1.2, -18]} size={[2.5, 2.4, 2.5]} />
      <Cover position={[10, 1.2, -18]} size={[2.5, 2.4, 2.5]} />

      {/* Targets */}
      {targets.map((t) => (
        <Target key={t.id} target={t} />
      ))}

      {/* Player + controls */}
      <Player />
      <PointerLockControls ref={controlsRef} />

      {/* First-person rifle */}
      <Rifle />

      {/* Bullet tracers */}
      <Tracers />
    </>
  );
}

function Wall({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#1d2740" roughness={0.7} metalness={0.2} />
    </mesh>
  );
}

function Cover({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow userData={{ cover: true }}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#2a3452" roughness={0.5} metalness={0.4} emissive="#0c1220" emissiveIntensity={0.3} />
    </mesh>
  );
}
