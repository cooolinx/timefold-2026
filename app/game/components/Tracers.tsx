"use client";

import { useFrame } from "@react-three/fiber";
import { useGame } from "@/lib/store";
import * as THREE from "three";
import { useMemo } from "react";

export default function Tracers() {
  const tracers = useGame((s) => s.tracers);
  const pruneTracers = useGame((s) => s.pruneTracers);

  useFrame(() => {
    pruneTracers(performance.now());
  });

  return (
    <>
      {tracers.map((t) => {
        const from = new THREE.Vector3(...t.from);
        const to = new THREE.Vector3(...t.to);
        const mid = from.clone().add(to).multiplyScalar(0.5);
        const dir = to.clone().sub(from);
        const length = dir.length();
        const age = (performance.now() - t.bornAt) / 120;
        const opacity = Math.max(0, 1 - age);

        // Quaternion to point cylinder along dir
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );

        return (
          <group key={t.id} position={mid} quaternion={quaternion}>
            <mesh>
              <cylinderGeometry args={[0.015, 0.015, length, 6]} />
              <meshBasicMaterial
                color="#ffe58a"
                transparent
                opacity={opacity}
                toneMapped={false}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}
