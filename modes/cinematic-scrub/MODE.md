---
name: cinematic-scrub
version: 1.0
base_template: template/
skills_required: []
skills_optional:
  - lenis-smooth-scroll
  - shader-backgrounds
triggers:
  - "cinematic scrub"
  - "airpods hero"
  - "scroll scrub"
  - "frame sequence"
  - "relocation"
  - "kinematisches scrolling"
description: >
  Legacy-Mode aus prompt.md. Canvas-Frame-Scrub-Hero (Apple AirPods Pro Pattern).
  Für Cinematic Storytelling ohne Video — wenn Scroll-Interaktivität mit den
  Frames gebraucht wird. Default für Relocation-Use-Cases, Apple-Style-Launches.
---

# Mode: Cinematic Scrub

## Wann einsetzen

- User will **Scroll-Scrub-Effect** wie [Apple AirPods Pro](https://www.apple.com/airpods-pro/) — Frames ändern sich mit Scroll.
- Storytelling benötigt **Frame-Genauigkeit** (z. B. Produkt-Öffnung, Transformation).
- Kein Video-Autoplay gewünscht (DSGVO-strenge Branchen, strenger Energiesparer-Modus).
- **Relocation-Storytelling** — Umzug-Metaphor mit Bildsequenz.

## Wann NICHT

- Italienisches Restaurant (dann `ristorante`-Mode).
- Kunde liefert Video → `ristorante` oder generischer `video`-Mode.
- Mobile-First mit strengem Bandbreiten-Budget (Frames = 240 × 80 KB = 19 MB).

## Stack

- **Template:** `template/` (Vite + React 18 + Tailwind v4 + shadcn/ui).
- **Hero:** `ScrubSequence.tsx` — Canvas mit IntersectionObserver + rAF.
- **Frame-Extraktion:** `scripts/extract-frames.sh` (ffmpeg) oder `scripts/extract-frames.mjs` (WASM-Fallback).

## Quellen

Die komplette Spezifikation liegt in [`prompt.md`](../../prompt.md) (Root-Level). Dieser Mode ist die kanonische Referenz-Implementierung dieses Prompts.

**Key Constants** in `src/lib/constants.ts`:

```ts
export const FRAMES_PATH = "/frames";
export const FRAME_COUNT = 240;
export const FRAME_EXT = "webp";
export const FPS = 30;
```

## Flow

1. **Input-Video** in `input/video.mp4` legen.
2. Frame-Extraktion:
   ```bash
   bash scripts/extract-frames.sh   # ffmpeg
   # or
   node scripts/extract-frames.mjs  # WASM-Fallback (langsamer)
   ```
3. Frames landen in `template/public/frames/0001.webp` … `0240.webp`.
4. `HERO_MODE = "scrub"` setzen in `content.ts`.
5. `<ScrubSequence>` wird gerendert statt `<Hero>` mit Video.

## Content-Schema

Wie [ristorante](../ristorante/MODE.md), aber **ohne** `HERO.videoMp4/WebM`. Stattdessen:

```ts
export const HERO_MODE = "scrub" as const;

export const HERO = {
  framesPath: "/frames",
  frameCount: 240,
  frameExt: "webp",
  fps: 30,
  eyebrow: "Your Eyebrow",
  headline: ["Zeile 1", "Zeile 2", "Zeile 3"],
  sub: "Untertitel mit Story.",
  ctaPrimary: { label: "CTA", href: "#cta" },
  ctaSecondary: { label: "Mehr erfahren", href: "#more" },
};
```

## Performance-Budget

| Asset | Budget |
|-------|--------|
| 240 WebP-Frames (1920px) | ≤ 18 MB total |
| Erste 30 Frames (Preload) | ≤ 2.5 MB |
| LCP (erster Frame sichtbar) | < 2.5 s |
| Scroll-FPS | 60 fps auf Mid-Range-Laptop |

## Pflicht-Begleiter: Lenis

Scroll-Scrub ohne Lenis ruckelt auf Windows-Trackpads. Siehe [lenis-smooth-scroll](../../skills/lenis-smooth-scroll/SKILL.md).

## Anti-Slop

- **Niemals** ein Video in Frames zerlegen, wenn das Video selbst ausreicht. Ressourcenverschwendung.
- **Keine PNG-Frames** in Production. WebP ist 3 × kleiner bei gleicher Qualität.
- Keine Frame-Counts > 300. User scrollt nicht so lang.
- Kein Scrub ohne `prefers-reduced-motion` Fallback (→ Standbild).
