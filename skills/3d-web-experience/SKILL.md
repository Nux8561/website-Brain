---
name: 3d-web-experience
version: 1.0
triggers:
  - "3d hero"
  - "3d szene"
  - "three.js"
  - "r3f"
  - "react three fiber"
  - "produkt konfigurator"
  - "glb"
  - "gltf"
  - "virtueller showroom"
  - "3d teller"
  - "3d dish"
depends_on:
  - react-three-fiber
  - lenis-smooth-scroll
description: >
  Immersive 3D-Web-Experiences mit Three.js + React Three Fiber. Scene Composition,
  GLTF/GLB-Assets, PBR-Lighting, Raycasting-Interaktivität, Scroll-getriggerte
  Kamerafahrten, LOD-Performance. Ideal für Produktkonfiguratoren, virtuelle
  Showrooms, 3D-Portfolios und immersive Marketing-Sites.
---

# 3D Web Experience — Skill

**Quelle:** Angelehnt an [3D Web Experience (MCPMarket)](https://mcpmarket.com/tools/skills/3d-web-experience) und erweitert um Vite/React-18-Setup, Performance-Guardrails und italienische-Gastro-Rezepte.

## Wann aktivieren

- Der Kunde will eine **rotierende Schale Pasta** im Hero, einen **Holzofen als 3D-Modell**, einen **Weinflaschen-Konfigurator** oder einen **virtuellen Showroom**.
- Statt einem Video-Hero (Default-Modus) eine **interaktive 3D-Szene**.
- Produkt-Visualisierung mit AR-Option (USDZ/GLB).

## Nicht aktivieren, wenn

- Mobile-First mit streng limitierter Bandbreite → Video-Hero nutzen.
- Das Lokal keine Assets/Modelle hat und das Budget keinen 3D-Artist vorsieht.
- SEO der einzige Traffic-Kanal ist (3D-Hero wird nicht gecrawlt; sr-only Fallback nötig).

## Stack (non-negotiable)

| Layer | Paket | Zweck |
|--------|--------|--------|
| Renderer | `three` 0.168+ | WebGL 2 |
| React | `@react-three/fiber` 9+ | Szene-Graph in JSX |
| Helpers | `@react-three/drei` | OrbitControls, useGLTF, Stage, Float |
| Postproc | `@react-three/postprocessing` | Bloom, DoF, Vignette |
| Physics (opt.) | `@react-three/rapier` | Wein schwenkt, Mehl fällt |
| Assets | `gltf-transform` CLI | Kompression, Draco, KTX2 |

## Installation

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three gltf-transform
```

Vite config — kein Extra-Setup nötig außer `optimizeDeps.exclude: ["three"]` bei HMR-Problemen.

## Boilerplate Component — `src/components/Scene3D.tsx`

```tsx
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Float, PresentationControls } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./Model";

export function Scene3D({ src }: { src: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 2.4], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-hidden
      className="absolute inset-0"
    >
      <Suspense fallback={null}>
        <Environment preset="warehouse" background={false} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 2]} intensity={1.1} castShadow />
        <PresentationControls
          global
          polar={[-0.2, 0.2]}
          azimuth={[-0.5, 0.5]}
          config={{ mass: 2, tension: 220 }}
        >
          <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
            <Model src={src} />
          </Float>
        </PresentationControls>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} makeDefault />
    </Canvas>
  );
}
```

```tsx
// src/components/Model.tsx
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

useGLTF.preload("/models/dish.glb");

export function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src) as unknown as GLTF;
  return <primitive object={scene} scale={1.2} />;
}
```

## Asset-Pipeline

1. 3D-Modell (Blender/Cinema4D) exportieren → `.glb`.
2. Mit `gltf-transform` optimieren:
   ```bash
   npx gltf-transform optimize input.glb output.glb \
     --compress draco --texture-compress webp --simplify
   ```
   Ziel: ≤ 500 KB pro Modell für Hero-Assets.
3. In `public/models/` ablegen.
4. **PNG-Poster** als Fallback rendern (headless-blender oder Screenshot der Szene).

## Performance-Guardrails

- **LOD**: Modelle mit 3 Detail-Stufen (`<Lod>`-Helper aus Drei).
- **Lazy-Mount**: Canvas erst rendern, wenn sichtbar (`IntersectionObserver` oder `<LazyScene>`).
- **dpr-Cap**: `dpr={[1, 2]}` — nie höher.
- **Shadow-Map**: nur wo nötig, `shadowMap.size = 1024`.
- **FPS-Guard**: Drei `PerformanceMonitor` → bei < 40 fps Effekte reduzieren.
- **Reduce-Motion**: bei `prefers-reduced-motion` Canvas gegen Poster tauschen.

## Accessibility

- `<canvas aria-hidden>` + visually-hidden `<p>` mit Szenenbeschreibung.
- Keine reine 3D-Navigation — immer CSS-Fallback-Content sichtbar.
- `tabindex=-1` auf Canvas, Keyboard-Controls auf Parent-Section.

## Rezepte für italienische Restaurants

### Rezept A — Rotierender Teller Pasta im Hero

**Asset:** `public/models/pasta-dish.glb` (Teller + Spaghetti + Basilikum, ~400 KB).
**Verwendung:** Ersetzt das `<video>` im [Hero.tsx](../../template/src/components/Hero.tsx).

```tsx
// Im Hero statt <video>:
<Scene3D src="/models/pasta-dish.glb" />
```

Stimmung: warme Env-Map (`preset="sunset"` oder eigene HDR), leichte Float-Animation, OrbitControls ohne Zoom. Der Nutzer schubst den Teller, er dreht sich sanft weiter.

### Rezept B — Holzofen mit Flammen-Shader

Kombiniere **3D-Geometrie des Ofens** (statisch) mit einem **Shader-Plane** im Ofeninneren (siehe [shader-backgrounds](../shader-backgrounds/SKILL.md)). Flammen-Shader als `fragmentShader` auf `<shaderMaterial>`.

### Rezept C — Weinkarten-Konfigurator

- 3 Flaschen als GLTF (Rosso/Bianco/Rosé).
- Klick → Kamera zoomt zur Flasche (`<CameraControls>` aus Drei).
- Seitliches Overlay mit Jahrgang/Region/Preis aus `content.ts`.
- CTA „Diese Flasche zum Tisch bestellen" öffnet Reservation-URL mit Query-Param.

### Rezept D — Virtueller Showroom (Galleria della Cucina)

Scrollgetriggerte Kamerafahrt durch eine 3D-Küche. Benötigt:

- **GSAP-ScrollTrigger** (siehe [gsap-scrollytelling](../gsap-scrollytelling/SKILL.md)) für die Kamera-Timeline.
- **Lenis** (siehe [lenis-smooth-scroll](../lenis-smooth-scroll/SKILL.md)) gegen Scroll-Jank.
- Statt `<OrbitControls>`: deterministische Kamera-Keyframes.

## Integration ins Default-Template

1. `<Hero>` in `template/src/components/Hero.tsx` kopieren → `HeroVideo.tsx`.
2. Neues `Hero.tsx` mit `<Scene3D>` anlegen.
3. `App.tsx` wählt anhand einer Flag in `content.ts`:
   ```ts
   export const HERO_MODE: "video" | "3d" = "3d";
   ```
4. Video-Dateien können im `public/` bleiben (kein Abriss nötig).

## Anti-Slop

- Kein generisches "rotating cube" — immer ein **markenrelevantes** Asset.
- Keine Default-Three.js-Farben (`0xff0000`). Palette aus `index.css` übernehmen.
- Keine `<Environment preset="city">` für italienisches Ambiente — `"sunset"`, `"dawn"`, `"warehouse"` passen besser.
- Canvas nie ohne Fallback-Poster (JPG/WebP) ausliefern.

## Quellen

- [3D Web Experience Skill — MCPMarket](https://mcpmarket.com/tools/skills/3d-web-experience)
- [React Three Fiber Docs](https://r3f.docs.pmnd.rs/)
- [Drei Helpers](https://drei.docs.pmnd.rs/)
- [gltf-transform CLI](https://gltf-transform.dev/)
