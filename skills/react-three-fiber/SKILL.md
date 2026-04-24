---
name: react-three-fiber
version: 1.0
triggers:
  - "r3f"
  - "react three fiber"
  - "<Canvas>"
  - "useFrame"
  - "useGLTF"
depends_on: []
description: >
  React Three Fiber 9+ Quickstart und Pattern-Sammlung. Setup, Hooks (useFrame,
  useLoader, useGLTF), Drei-Helpers, Leva-Controls, Postprocessing, Debugging.
---

# React Three Fiber — Skill

## Installation

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three

# Optional
npm install @react-three/postprocessing @react-three/rapier leva
```

## Pattern-Bibliothek

### 1. Canvas Setup (Vite + React 18)

```tsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 50 }}
  dpr={[1, 2]}
  gl={{ antialias: true, powerPreference: "high-performance" }}
  frameloop="demand" // ← wichtig für stille Szenen, spart Strom
>
  …
</Canvas>
```

### 2. GLTF-Modell laden (mit Preload)

```tsx
import { useGLTF } from "@react-three/drei";
useGLTF.preload("/models/hero.glb"); // top-level, lädt parallel zu Fonts
```

### 3. Frame-Loop kontrollieren

```tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

function Spinner() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
  });
  return <mesh ref={ref}>…</mesh>;
}
```

### 4. Drei-Helpers, die 95 % der Fälle abdecken

| Helper | Zweck |
|--------|--------|
| `<OrbitControls>` | User-Kamera |
| `<PresentationControls>` | Sanfter, gedämpfter Drag statt Free-Orbit |
| `<Float>` | Weiches Schweben ohne Code |
| `<Environment preset="sunset">` | IBL-Lighting in einer Zeile |
| `<ContactShadows>` | Fake-Schatten ohne Shadow-Map-Kosten |
| `<Stage>` | Environment + Lights + ContactShadows in einem |
| `<Text3D>` | 3D-Typografie |
| `<Html>` | HTML-Overlays in der 3D-Szene |
| `<Lod>` | Level-of-Detail |
| `<PerformanceMonitor>` | Auto-Adaptive Qualität |

### 5. Postprocessing (dezent)

```tsx
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

<EffectComposer>
  <Bloom intensity={0.4} luminanceThreshold={0.9} mipmapBlur />
  <Vignette eskil={false} offset={0.1} darkness={0.7} />
</EffectComposer>
```

Regel: **Max 2 Effekte** gleichzeitig. Mehr killt Performance.

### 6. Leva für Dev-Controls

```tsx
import { useControls } from "leva";

const { intensity, color } = useControls({
  intensity: { value: 1, min: 0, max: 3 },
  color: "#ffaa55",
});
```

Leva nur in `import.meta.env.DEV` rendern.

### 7. Debugging

```tsx
import { Perf } from "r3f-perf";

{import.meta.env.DEV && <Perf position="top-left" />}
```

## Perf-Regeln

- `dpr={[1, 2]}` — nie `3`.
- `frameloop="demand"` bei statischen Szenen, `"always"` bei Animationen.
- `useGLTF.preload()` bei jedem Top-Level-Asset.
- `<Suspense fallback={…}>` immer setzen.
- Instance-Mesh ab 100+ gleichen Objekten.
- Shadow-Maps nur wenn nötig, `shadowMap.size ≤ 1024`.

## Anti-Slop

- Keine `<mesh>` mit Default-`MeshNormalMaterial` in Produktion.
- Keine Emoji in `<Html>`-Overlays.
- Keine `<OrbitControls>` ohne `enableZoom={false}` bei Hero-Szenen — User soll nicht rauszoomen können.
