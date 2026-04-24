"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGame } from "@/lib/store";

const SPEED = 6;
const PLAYER_HEIGHT = 1.7;

export default function Player() {
  const { camera, scene } = useThree();
  const keys = useRef<Record<string, boolean>>({});
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const addShot = useGame((s) => s.addShot);
  const addTracer = useGame((s) => s.addTracer);
  const killTarget = useGame((s) => s.killTarget);
  const phase = useGame((s) => s.phase);

  // Keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const up = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Shooting
  useEffect(() => {
    const onClick = () => {
      // Only shoot when pointer is locked
      if (!document.pointerLockElement) return;
      if (phase !== "playing") return;

      addShot();

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

      // Collect target meshes by userData flag
      const hittable: THREE.Object3D[] = [];
      scene.traverse((obj) => {
        if (obj.userData?.targetId || obj.userData?.cover) hittable.push(obj);
      });

      const hits = raycaster.intersectObjects(hittable, true);

      // Tracer endpoints
      const origin = camera.position.clone();
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      const end = hits.length > 0 ? hits[0].point.clone() : origin.clone().add(forward.multiplyScalar(60));

      // Offset origin slightly down-right so tracer emerges from muzzle, not eyeballs
      const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
      const muzzle = origin
        .clone()
        .add(right.multiplyScalar(0.25))
        .add(camera.up.clone().multiplyScalar(-0.2))
        .add(new THREE.Vector3().copy(forward).normalize().multiplyScalar(0.6));

      addTracer([muzzle.x, muzzle.y, muzzle.z], [end.x, end.y, end.z]);

      // Resolve target hit
      for (const h of hits) {
        let obj: THREE.Object3D | null = h.object;
        while (obj && !obj.userData?.targetId) obj = obj.parent;
        if (obj?.userData?.targetId) {
          killTarget(obj.userData.targetId as number);
          break;
        }
        if (h.object.userData?.cover) break; // cover blocks
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [camera, scene, addShot, addTracer, killTarget, phase]);

  useFrame((_, dt) => {
    camera.position.y = PLAYER_HEIGHT;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    direction.current.set(0, 0, 0);
    if (keys.current["KeyW"] || keys.current["ArrowUp"]) direction.current.add(forward);
    if (keys.current["KeyS"] || keys.current["ArrowDown"]) direction.current.sub(forward);
    if (keys.current["KeyD"] || keys.current["ArrowRight"]) direction.current.add(right);
    if (keys.current["KeyA"] || keys.current["ArrowLeft"]) direction.current.sub(right);
    direction.current.normalize();

    const boost = keys.current["ShiftLeft"] ? 1.6 : 1;
    velocity.current.lerp(direction.current.multiplyScalar(SPEED * boost), Math.min(dt * 10, 1));

    camera.position.addScaledVector(velocity.current, dt);

    // Clamp inside arena
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -28, 28);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -48, 8);
  });

  return null;
}
