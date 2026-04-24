"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "@/lib/store";

export default function Rifle() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const flashRef = useRef<THREE.Mesh>(null);
  const flashLightRef = useRef<THREE.PointLight>(null);
  const [flashUntil, setFlashUntil] = useState(0);
  const shots = useGame((s) => s.shots);
  const recoilUntil = useRef(0);

  // Trigger flash when shot count increments
  useEffect(() => {
    if (shots > 0) {
      setFlashUntil(performance.now() + 70);
      recoilUntil.current = performance.now() + 120;
    }
  }, [shots]);

  useFrame((_, dt) => {
    if (!groupRef.current) return;

    // Attach rifle to camera in world space each frame
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
    const down = new THREE.Vector3().crossVectors(forward, right).normalize();

    const basePos = camera.position
      .clone()
      .add(right.multiplyScalar(0.32))
      .add(down.multiplyScalar(0.28))
      .add(new THREE.Vector3().copy(forward).normalize().multiplyScalar(0.55));

    // Recoil kick
    const now = performance.now();
    let recoilOffset = 0;
    if (now < recoilUntil.current) {
      const t = (recoilUntil.current - now) / 120;
      recoilOffset = Math.sin(t * Math.PI) * 0.08;
    }

    // Bob while moving (simple)
    const bob = Math.sin(now * 0.005) * 0.008;

    groupRef.current.position.copy(basePos);
    groupRef.current.position.y += bob;
    groupRef.current.quaternion.copy(camera.quaternion);
    groupRef.current.translateZ(recoilOffset);

    // Flash visibility
    const flashOn = now < flashUntil;
    if (flashRef.current) {
      (flashRef.current.material as THREE.MeshBasicMaterial).opacity = flashOn ? 1 : 0;
      flashRef.current.scale.setScalar(flashOn ? 1 + Math.random() * 0.5 : 0.001);
    }
    if (flashLightRef.current) {
      flashLightRef.current.intensity = flashOn ? 20 : 0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[0.12, 0.16, 0.9]} />
        <meshStandardMaterial color="#1a1d24" metalness={0.8} roughness={0.35} />
      </mesh>
      {/* Barrel */}
      <mesh position={[0, 0.02, -0.95]}>
        <cylinderGeometry args={[0.035, 0.035, 0.6, 12]} />
        <meshStandardMaterial color="#0d0f14" metalness={0.9} roughness={0.2} />
        <group rotation={[Math.PI / 2, 0, 0]} />
      </mesh>
      {/* Magazine */}
      <mesh position={[0, -0.18, -0.3]}>
        <boxGeometry args={[0.1, 0.22, 0.15]} />
        <meshStandardMaterial color="#2a2e38" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Grip */}
      <mesh position={[0, -0.14, -0.05]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.09, 0.22, 0.12]} />
        <meshStandardMaterial color="#12141a" metalness={0.5} roughness={0.6} />
      </mesh>
      {/* Stock */}
      <mesh position={[0, -0.02, 0.25]}>
        <boxGeometry args={[0.09, 0.12, 0.35]} />
        <meshStandardMaterial color="#1a1d24" metalness={0.7} roughness={0.45} />
      </mesh>
      {/* Sight */}
      <mesh position={[0, 0.11, -0.3]}>
        <boxGeometry args={[0.06, 0.04, 0.14]} />
        <meshStandardMaterial color="#3a3f4d" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Accent trim */}
      <mesh position={[0.061, 0, -0.4]}>
        <boxGeometry args={[0.005, 0.08, 0.7]} />
        <meshStandardMaterial
          color="#5ab9ff"
          emissive="#5ab9ff"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-0.061, 0, -0.4]}>
        <boxGeometry args={[0.005, 0.08, 0.7]} />
        <meshStandardMaterial
          color="#5ab9ff"
          emissive="#5ab9ff"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Muzzle flash */}
      <mesh ref={flashRef} position={[0, 0.02, -1.3]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshBasicMaterial
          color="#ffd66b"
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={flashLightRef} position={[0, 0.02, -1.3]} color="#ffb347" distance={8} intensity={0} />
    </group>
  );
}
