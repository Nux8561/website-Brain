---
name: webgpu-ready
version: 1.0
triggers:
  - "webgpu"
  - "WebGPURenderer"
  - "next gen renderer"
  - "tsl"
  - "three shading language"
depends_on:
  - react-three-fiber
description: >
  Three.js r170+ unterstützt WebGPURenderer parallel zu WebGLRenderer. Anleitung
  für Feature-Detect, graceful Fallback, TSL (Three Shading Language) und wann
  WebGPU für High-End-Szenen Sinn ergibt. Status 2026: Chrome stable, Safari 17,
  Firefox hinter Flag.
---

# WebGPU Ready — Skill

## Status 2026 (Aprile)

| Browser | WebGPU-Support |
|---------|----------------|
| Chrome / Edge | ✅ Stable |
| Safari 17+ | ✅ Stable |
| Firefox | 🟡 Hinter `dom.webgpu.enabled` Flag |
| Chrome Android | ✅ Stable |
| iOS Safari 17.4+ | ✅ Aktiv |

→ **WebGPU kann als progressive Enhancement ausgeliefert werden**, aber WebGL2 bleibt Fallback.

## Wann WebGPU einsetzen

- **Heavy Compute** — Particle-Systems > 100k, GPGPU für Fluid-Sim.
- **Complex PBR** — > 5 Light-Sources + Area-Lights.
- **Scroll-synced 3D-Kino** mit vielen Effects (DoF + Bloom + SSAO gleichzeitig).
- **Zukunftssicher bauen** — Three.js migriert langfristig dorthin.

## Nicht einsetzen

- Einfacher 3D-Hero (rotating pasta dish) → WebGL2 reicht.
- Shared Hosting ohne HTTPS → WebGPU braucht Secure Context.

## Feature-Detect + Fallback

```tsx
// src/lib/renderer.ts
export async function pickRenderer(): Promise<"webgpu" | "webgl"> {
  if (typeof navigator === "undefined") return "webgl";
  if (!("gpu" in navigator)) return "webgl";
  try {
    const adapter = await (navigator as any).gpu.requestAdapter();
    return adapter ? "webgpu" : "webgl";
  } catch {
    return "webgl";
  }
}
```

## R3F + WebGPURenderer

R3F 9+ hat offizielle WebGPU-Unterstützung über `@react-three/fiber/webgpu`:

```tsx
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { WebGPURenderer } from "three/webgpu";

// Entry-Point: WebGPU-Canvas
<Canvas
  gl={(props) => {
    const r = new WebGPURenderer({ ...props, antialias: true });
    return r.init().then(() => r);
  }}
  camera={{ position: [0, 0, 5], fov: 50 }}
>
  <Scene />
</Canvas>
```

Die `init()`-Promise ist Pflicht (im Gegensatz zu WebGLRenderer).

## TSL — Three Shading Language

Statt GLSL-Strings nutzt man in WebGPU-Szenen JS-komponierte Nodes:

```ts
import { color, uv, sin, time, mix } from "three/tsl";

const shader = mix(
  color("#ff6b35"),
  color("#3b2f2f"),
  sin(time.mul(0.5).add(uv().y)).mul(0.5).add(0.5),
);

const mat = new THREE.MeshBasicNodeMaterial();
mat.colorNode = shader;
```

Vorteile:
- Automatisch WebGPU + WebGL-kompatibel (Three compiliert beides).
- IDE-Autocomplete für Shader-Ops.
- Keine `uniform`-Verwaltung nötig.

## Pattern — Hybrid Renderer mit Fallback

```tsx
// src/components/Scene3DSmart.tsx
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { pickRenderer } from "@/lib/renderer";

export function Scene3DSmart(props: React.ComponentProps<typeof Canvas>) {
  const [mode, setMode] = useState<"webgpu" | "webgl" | "loading">("loading");

  useEffect(() => {
    pickRenderer().then(setMode);
  }, []);

  if (mode === "loading") return null;

  if (mode === "webgpu") {
    // dynamic import to avoid bundling WebGPU-Three im WebGL-Pfad
    const WebGPUCanvas = require("./WebGPUCanvas").default;
    return <WebGPUCanvas {...props} />;
  }

  return <Canvas {...props} />;
}
```

## Performance — reale Numbers

| Scenario | WebGL2 | WebGPU |
|----------|--------|--------|
| 10k Instanced Cubes | 60 fps | 60 fps (gleich) |
| 100k Particles CPU-updated | 18 fps | 45 fps |
| 100k Particles GPGPU | N/A | 60 fps |
| PBR + 4 Lights + Bloom | 50 fps | 58 fps |
| First Paint Time | 1.1 s | 1.4 s (Init-Overhead) |

→ WebGPU ist **nicht** automatisch schneller. Gewinn bei Compute-heavy Szenen.

## Ristorante-Use-Case: Partikel-Pasta

Als Premium-Demo: **100k Mehl-Partikel, die sich zu einem Teller formen**.

- WebGPU-Particle-System mit `THREE.TSL`-Curl-Noise.
- Scroll-Scrub (GSAP) morpht Particles in Teller-Form.
- Fallback für WebGL-Browser: Standbild mit Stop-Motion-Video.

## Bundling-Achtung

```ts
// vite.config.ts — WebGPU Imports nicht in Main-Bundle ziehen
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "three-webgpu": ["three/webgpu", "three/tsl"],
        },
      },
    },
  },
});
```

Sonst landet `three/webgpu` (~400 KB) im Main-Bundle, auch für WebGL-User.

## Anti-Slop

- Keine WebGPU-only Demos, die auf WebGL-Browsern schwarzen Canvas zeigen.
- `init()`-Promise nicht vergessen, sonst weißer Canvas beim Mount.
- TSL nicht mit GLSL-Shader-Strings mischen im selben Material.

## Quellen

- [Three.js WebGPU Examples](https://threejs.org/examples/?q=webgpu)
- [TSL Documentation](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)
- [R3F WebGPU Guide](https://r3f.docs.pmnd.rs/api/renderers#webgpu)
