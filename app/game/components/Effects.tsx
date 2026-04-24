"use client";

import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export default function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.1}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.6}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0008, 0.0008)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.15} darkness={0.85} />
    </EffectComposer>
  );
}
