---
name: gsap-scrollytelling
version: 1.0
triggers:
  - "gsap"
  - "scrolltrigger"
  - "pin"
  - "scrub"
  - "scrollytelling"
  - "timeline"
depends_on:
  - lenis-smooth-scroll
description: >
  GSAP 3 + ScrollTrigger für pinning, scrubbing, horizontales Scrolling und
  getimete Section-Timelines. Pflicht-Partner: Lenis für Smooth-Scroll.
---

# GSAP ScrollTrigger — Skill

## Installation

```bash
npm install gsap
```

GSAP 3 ist kostenlos für kommerzielle Nutzung (seit 2024). Keine Club-GreenSock Premium-Plugins verwenden (SplitText, DrawSVG, MorphSVG).

## Setup mit React 18 + Strict Mode

```ts
// src/lib/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export { gsap, ScrollTrigger };
```

## React-Hook für Timelines

```tsx
import { useGSAP } from "@gsap/react"; // offizieller React-Helper
// npm install @gsap/react

function Section() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".headline", {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=500",
          scrub: 1,
          pin: true,
        },
      });
    },
    { scope: ref }
  );

  return <div ref={ref}>…</div>;
}
```

## Pattern-Bibliothek

### 1. Pin + Scrub

```ts
ScrollTrigger.create({
  trigger: "#hero",
  start: "top top",
  end: "+=2500",
  pin: true,
  scrub: 1,
});
```

### 2. Timeline mit Scrub

```ts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#story",
    start: "top top",
    end: "bottom top",
    scrub: 1,
    pin: true,
  },
});

tl.to(".step-1", { opacity: 0, y: -100 })
  .to(".step-2", { opacity: 1, y: 0 }, "<")
  .to(".step-3", { opacity: 1 }, "+=0.3");
```

### 3. Horizontal Scroll

```ts
const sections = gsap.utils.toArray<HTMLElement>(".h-section");
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".h-wrapper",
    pin: true,
    scrub: 1,
    end: () => `+=${(sections.length - 1) * window.innerWidth}`,
  },
});
```

### 4. Counter (Stats)

```ts
gsap.to({ v: 0 }, {
  v: 2500,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: { trigger: ".stats", start: "top 80%" },
  onUpdate() {
    statsEl.textContent = Math.round(this.targets()[0].v) + "+";
  },
});
```

### 5. Kombination mit R3F — Kamera-Keyframes

```tsx
// Im R3F-Component
import { useThree } from "@react-three/fiber";
const { camera } = useThree();

useGSAP(() => {
  gsap.to(camera.position, {
    x: 5, y: 2, z: 8,
    scrollTrigger: { trigger: "#hero", scrub: 1, end: "+=1000" },
    onUpdate: () => camera.updateProjectionMatrix(),
  });
});
```

## Pflicht-Integration mit Lenis

Ohne Lenis ruckelt GSAP-Scrub auf Trackpads und Windows-Mausrädern. Setup:

```ts
// main.tsx
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

const lenis = new Lenis({ autoRaf: true });
lenis.on("scroll", ScrollTrigger.update);
```

Siehe [lenis-smooth-scroll](../lenis-smooth-scroll/SKILL.md) für vollständiges Setup.

## Perf-Regeln

- ScrollTrigger.create nie in einem Loop ohne `invalidateOnRefresh`.
- `.kill()` im Cleanup-Hook, sonst Memory-Leak bei SPA-Nav.
- `markers: true` nur in Dev.
- Bei > 10 Triggers: `ScrollTrigger.batch()` verwenden.

## Anti-Slop

- Kein Easing `"power4.inOut"` mit `duration > 1.5` — fühlt sich schwammig.
- Keine Timelines, die länger als 3000px Scroll brauchen.
- `scrub: true` (ohne Zahl) ist oft zu direkt — `scrub: 1` oder `scrub: 1.5` fühlt sich teurer an.
