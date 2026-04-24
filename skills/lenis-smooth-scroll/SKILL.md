---
name: lenis-smooth-scroll
version: 1.0
triggers:
  - "lenis"
  - "smooth scroll"
  - "scroll ruckelt"
  - "scrub jank"
depends_on: []
description: >
  Lenis (Studio Freight) — buttersanftes Custom-Scrolling, Pflicht bei GSAP +
  Parallax + Scroll-Scrub. Ersetzt `html { scroll-behavior: smooth }`.
---

# Lenis Smooth Scroll — Skill

## Installation

```bash
npm install lenis
```

Paketname ist seit 2024 nur `lenis` (vorher `@studio-freight/lenis`).

## Setup

```ts
// src/main.tsx (ganz oben, vor createRoot)
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
  smoothWheel: true,
  syncTouch: false, // Mobile native lassen
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Für Debugging exportieren:
declare global { interface Window { lenis?: Lenis } }
window.lenis = lenis;
```

Seit Lenis 1.1 gibt es `autoRaf`:

```ts
const lenis = new Lenis({ autoRaf: true });
```

## Integration mit GSAP ScrollTrigger

```ts
import { ScrollTrigger } from "gsap/ScrollTrigger";

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

## Integration mit React

```tsx
// src/components/LenisProvider.tsx
import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
}
```

In `App.tsx`:

```tsx
<LenisProvider>
  <Navbar />
  <main>…</main>
</LenisProvider>
```

## Ausnahmen — wann Lenis NICHT einsetzen

- **Mobile Safari iOS:** `syncTouch: false` lassen, native Scrolling beibehalten.
- **Innerhalb scrollbarer Container** (Modal, Drawer): Lenis per `data-lenis-prevent` disablen:
  ```html
  <div data-lenis-prevent class="overflow-y-auto">…</div>
  ```
- **Bei Accessibility-Screen-Readern:** Prüfen, ob der User `prefers-reduced-motion` hat; dann Lenis skippen:
  ```ts
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) new Lenis({ autoRaf: true });
  ```

## Perf-Regeln

- `duration: 1.2` ist der Sweet-Spot. `> 1.8` fühlt sich träge.
- `syncTouch: true` nur, wenn Scroll-Scrub auf Mobile gebraucht wird — sonst `false`.
- Nicht mit `html { scroll-behavior: smooth }` kombinieren — sonst kämpfen zwei Systeme.

## Anti-Slop

- Kein Lenis, wenn keine Scroll-Animationen vorhanden sind. Macht die Seite langsamer ohne Gegenwert.
- Nicht vergessen, Lenis im SSR-Guard zu schützen (`typeof window !== "undefined"`).
