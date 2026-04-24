"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Target as TargetData } from "@/lib/store";

export default function Target({ target }: { target: TargetData }) {
  const groupRef = useRef<THREE.Group>(null);
  const [shards, setShards] = useState<
    { pos: THREE.Vector3; vel: THREE.Vector3; rot: THREE.Euler; rotVel: THREE.Vector3 }[]
  >([]);
  const [spawned, setSpawned] = useState(false);

  // When alive -> dead, spawn shards
  useEffect(() => {
    if (!target.alive && !spawned) {
      const newShards = Array.from({ length: 14 }).map(() => ({
        pos: new THREE.Vector3(
          target.position[0] + (Math.random() - 0.5) * 0.4,
          target.position[1] + (Math.random() - 0.5) * 0.4,
          target.position[2] + (Math.random() - 0.5) * 0.4
        ),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          Math.random() * 6 + 2,
          (Math.random() - 0.5) * 8
        ),
        rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        rotVel: new THREE.Vector3(Math.random() * 6, Math.random() * 6, Math.random() * 6),
      }));
      setShards(newShards);
      setSpawned(true);
    }
  }, [target.alive, target.position, spawned]);

  // Animate live target: gentle hover + bob
  useFrame((state, dt) => {
    if (target.alive && groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = target.position[1] + Math.sin(t * 2 + target.id) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.8 + target.id) * 0.3;
    }

    // Animate shards
    if (!target.alive && shards.length > 0) {
      const now = performance.now();
      const age = (now - target.killedAt) / 1000;
      if (age > 1.8) {
        setShards([]);
        return;
      }
      setShards((prev) =>
        prev.map((s) => {
          s.vel.y -= 20 * dt; // gravity
          s.pos.addScaledVector(s.vel, dt);
          s.rot.x += s.rotVel.x * dt;
          s.rot.y += s.rotVel.y * dt;
          s.rot.z += s.rotVel.z * dt;
          return s;
        })
      );
    }
  });

  if (!target.alive) {
    // Render shards
    return (
      <group>
        {shards.map((s, i) => (
          <mesh
            key={i}
            position={[s.pos.x, s.pos.y, s.pos.z]}
            rotation={[s.rot.x, s.rot.y, s.rot.z]}
          >
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial
              color="#ff2e5c"
              emissive="#ff2e5c"
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group ref={groupRef} position={target.position} userData={{ targetId: target.id }}>
      {/* Body */}
      <mesh castShadow userData={{ targetId: target.id }}>
        <capsuleGeometry args={[0.5, 1.4, 6, 12]} />
        <meshStandardMaterial
          color="#ff2e5c"
          emissive="#ff0a3c"
          emissiveIntensity={0.8}
          roughness={0.3}
          metalness={0.6}
          toneMapped={false}
        />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.1, 0]} castShadow userData={{ targetId: target.id }}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color="#ffb347"
          emissive="#ff8c00"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>
      {/* Ring above head (marks it as an AI agent) */}
      <mesh position={[0, 1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.04, 8, 24]} />
        <meshStandardMaterial
          color="#5ab9ff"
          emissive="#5ab9ff"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
