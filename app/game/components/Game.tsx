"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import HUD from "./HUD";
import Effects from "./Effects";

export default function Game() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#05070d" }}>
      <Canvas
        shadows
        camera={{ fov: 80, near: 0.05, far: 200, position: [0, 1.7, 0] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
          <Effects />
        </Suspense>
      </Canvas>
      <HUD />
    </div>
  );
}
