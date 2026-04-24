---
name: 3d-immersive
version: 1.0
base_template: template/
skills_required:
  - 3d-web-experience
  - react-three-fiber
  - lenis-smooth-scroll
skills_optional:
  - gsap-scrollytelling
  - shader-backgrounds
  - webgpu-ready
  - italian-restaurant-preset
triggers:
  - "3d hero"
  - "produkt konfigurator"
  - "virtueller showroom"
  - "3d immersive"
  - "3d teller"
  - "rotating pasta"
  - "wine configurator"
description: >
  Premium-Mode mit Three.js + React Three Fiber. Rotierende 3D-Modelle,
  scrollgetriggerte Kamerafahrten, Produkt-Konfiguratoren. Kombinierbar mit
  ristorante-Preset für High-End-Gastronomie.
---

# Mode: 3D Immersive

## Wann einsetzen

- Kunde hat **3D-Assets** (GLB/GLTF) oder Budget für 3D-Modellierung.
- **Produkt-Konfigurator** gewünscht (Weinflasche, Pizzasorten, Tisch-Arrangements).
- **Virtual Showroom** — Küche oder Restaurant als begehbare 3D-Szene.
- **Premium-Brand-Positionierung** — 3D = Budget-Signal zum User.

## Wann NICHT

- Mobile-First mit schwacher Hardware als Primary-Target (iPhone SE 2020 und darunter).
- Kein Foto-Material, kein 3D-Asset → erst Video-Hero nutzen, 3D als Phase 2.
- SEO ist Primary-Channel — 3D-Hero wird nicht gecrawlt (immer SR-Only-Fallback bauen).

## Stack (non-negotiable)

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing lenis
npm install -D @types/three
```

Optional:
- `@react-three/rapier` — Physik (Wein schwenkt, Mehl fällt)
- `gsap` + `@gsap/react` — Kamera-Scrollytelling
- `leva` — Dev-Controls

## Hero-Optionen

### Option A — Rotating Hero-Asset (simpelste Variante)

```tsx
// src/components/Hero.tsx
import { Scene3D } from "./Scene3D";

<section className="relative h-[100svh]">
  <Scene3D src="/models/pasta-dish.glb" />
  <div className="relative z-10 …">
    {/* Headline + CTA wie Ristorante */}
  </div>
</section>
```

Siehe [3d-web-experience Rezept A](../../skills/3d-web-experience/SKILL.md#rezept-a--rotierender-teller-pasta-im-hero).

### Option B — Scroll-gesteuerte Kamerafahrt

Kombiniere mit [gsap-scrollytelling](../../skills/gsap-scrollytelling/SKILL.md) für deterministische Keyframes:

```tsx
useGSAP(() => {
  gsap.to(camera.position, {
    x: 5, y: 2, z: 8,
    scrollTrigger: { trigger: "#hero", scrub: 1, end: "+=1500" },
  });
});
```

### Option C — Produkt-Konfigurator

Klickbare 3D-Varianten (Rosso/Bianco/Rosé Flaschen). Raycasting via R3F-Events. Siehe [3d-web-experience Rezept C](../../skills/3d-web-experience/SKILL.md#rezept-c--weinkarten-konfigurator).

## Content-Schema

```ts
export const SITE_MODE = "3d-immersive" as const;
export const HERO_MODE = "3d" as const;

export const HERO_3D = {
  modelUrl: "/models/pasta-dish.glb",
  posterFallback: "/img/hero-poster.webp",  // für Reduce-Motion und Mobile-Low-End
  environment: "sunset" as const,            // "sunset" | "warehouse" | "dawn" | "studio"
  cameraStart: [0, 0.4, 2.4] as const,
  cameraFov: 38,
};
```

## Asset-Pipeline

1. Blender/Cinema4D → GLB Export.
2. Optimieren:
   ```bash
   npx gltf-transform optimize in.glb out.glb \
     --compress draco --texture-compress webp --simplify
   ```
3. Ziel: ≤ 500 KB pro Hero-Asset, ≤ 1.2 MB für ganze Szenen.
4. Poster-Fallback rendern (Headless-Blender-Screenshot oder One-Off-Render).

## Performance-Guardrails

- `dpr={[1, 2]}` — nie höher.
- `<PerformanceMonitor>` aus Drei — bei < 40 fps Effekte reduzieren.
- **Lazy-Mount:** Canvas erst rendern wenn sichtbar (IntersectionObserver).
- **Mobile-Fallback:** Bei Touch-Device + Screen < 768px → Poster statt Canvas.
- **prefers-reduced-motion:** Canvas durch Poster ersetzen.

```tsx
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.innerWidth < 768;
const shouldRender3D = !reduced && !isMobile;

return shouldRender3D
  ? <Scene3D src={HERO_3D.modelUrl} />
  : <img src={HERO_3D.posterFallback} alt="" />;
```

## Kombination mit Ristorante-Preset

Wenn das italienische Restaurant Premium ist:

```ts
export const SITE_MODE = "3d-immersive" as const;
// Aber: italian-restaurant-preset aktivieren für Palette/Typo/Copy-Ton
```

Das 3D-Asset ersetzt das Video im Hero. Alles andere (Bento, Google Maps, Hours) bleibt identisch wie `ristorante`.

## Sections (3D-Immersive-spezifisch)

- **Hero** — 3D-Asset oder scroll-synced Szene.
- **Story-Scroll** (optional) — Scrollytelling mit Kamera-Keyframes.
- **Konfigurator** (optional) — Klickbare Produkt-Varianten.
- **Rest** wie im Basis-Mode (Services, Hours, Google Maps, FAQ).

## Accessibility

- `<canvas aria-hidden>` + visually-hidden `<p>` mit Szenenbeschreibung.
- Alle CTAs müssen **auch ohne** Canvas erreichbar sein (native HTML).
- `tabindex=-1` auf Canvas, Keyboard-Fokus auf Parent-Section.
- Wenn Konfigurator: Jede 3D-Variante auch als Radio-Button-Liste spiegeln.

## Prompt-Template

```
Ich baue eine 3d-immersive-Mode-Website.
Company: {Company Name}, {Industry}
3D-Asset: {Pfad zu .glb oder Beschreibung}
Kombinieren mit: {ristorante | generic | luxury-retail}

Gehe so vor:
1. Aktiviere Skills 3d-web-experience, react-three-fiber, lenis-smooth-scroll.
2. Optimiere Asset mit gltf-transform (Ziel ≤ 500 KB).
3. Baue <Scene3D> mit PresentationControls + Float.
4. Generate Poster-Fallback (Blender-Headless oder Screenshot).
5. Wire Reduce-Motion-Check + Mobile-Fallback.
6. Setze HERO_MODE = "3d".
7. Verify: LCP < 3.5 s, fps ≥ 45 auf M1 MacBook.
```

## Anti-Slop

- **Kein generic rotating cube.** Immer markenrelevantes Asset.
- Kein `<Environment preset="city">` für Gastro — `"sunset"` oder `"warehouse"`.
- Keine OrbitControls ohne `enableZoom={false}` — User zoomt sonst raus.
- Niemals 3D ohne Poster-Fallback ausliefern.
- Postprocessing: Max 2 Effekte (Bloom + Vignette reicht).
