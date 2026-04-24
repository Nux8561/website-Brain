---
name: video-hero
version: 1.0
triggers:
  - "video hero"
  - "webm"
  - "mp4"
  - "hero video"
  - "ffmpeg"
  - "safari video"
  - "ios video"
  - "autoplay"
depends_on: []
description: >
  Produktions-Rezept für den Default-Hero: <video> mit dualem WebM (VP9/AV1) +
  MP4 (H.264) für Safari/iOS, Poster-Fallback, korrekte autoplay-Flags, ffmpeg-
  Encoding-Presets. Ersetzt die Canvas-Frame-Scrub-Variante in 95 % der Projekte.
---

# Video Hero — Skill

## Wann einsetzen

- **Default für Ristorante-Mode** — B-Roll aus Küche/Ofen/Teller.
- **Jeder Kunde, der ein 10–20 s Stimmungsvideo hat** (Drohnenflug, Barkeeper, Handwerk).
- Ersetzt `ScrubSequence.tsx` überall, wo keine Scroll-Interaktion mit Frames gebraucht wird.

## Nicht einsetzen, wenn

- User soll **Frames scrollen** können (AirPods-Effekt) → Canvas-Scrub.
- Datei > 4 MB unkomprimierbar → stattdessen Poster + animierte Elemente.
- Autoplay-Policies blockieren (z. B. EU-DSGVO-strenge Setups) → Poster + Click-to-Play.

## Das Recipe (production-ready)

```tsx
// src/components/Hero.tsx
import { useEffect, useRef } from "react";
import { HERO } from "@/lib/content";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Safari iOS braucht einen User-Gesture-Proxy — muted + playsInline ist der Workaround.
    v.muted = true;
    v.playsInline = true;
    v.play().catch(() => {
      // Autoplay geblockt → Poster bleibt sichtbar.
    });
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={HERO.posterUrl}
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        {/* Reihenfolge matters: WebM zuerst (Chrome/Firefox), MP4 als Fallback (Safari/iOS). */}
        <source src={HERO.videoWebm} type="video/webm" />
        <source src={HERO.videoMp4}  type="video/mp4" />
      </video>

      {/* Dim-Overlay für Text-Kontrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

      <div className="relative z-10 flex h-full items-end pb-24">
        {/* Headline + CTAs hier */}
      </div>
    </section>
  );
}
```

## ffmpeg-Presets

### H.264 MP4 (Safari / iOS / alles)

```bash
ffmpeg -i input.mov \
  -c:v libx264 -crf 23 -preset slow \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -vf "scale=1920:-2,fps=30" \
  -an \
  hero.mp4
```

- `yuv420p` ist Pflicht, sonst spielt Safari nicht ab.
- `+faststart` verschiebt den Moov-Atom an den Anfang → beginnt während des Downloads.
- `-an` entfernt Audio (Hero braucht keine Tonspur).

### VP9 WebM (Chrome / Firefox — 30–40 % kleiner)

```bash
ffmpeg -i input.mov \
  -c:v libvpx-vp9 -crf 32 -b:v 0 \
  -pix_fmt yuv420p \
  -vf "scale=1920:-2,fps=30" \
  -an -row-mt 1 \
  hero.webm
```

- 2-Pass für besseres Bitrate-Budget:
  ```bash
  ffmpeg -i in.mov -c:v libvpx-vp9 -b:v 2M -pass 1 -an -f null /dev/null && \
  ffmpeg -i in.mov -c:v libvpx-vp9 -b:v 2M -pass 2 -an hero.webm
  ```

### AV1 WebM (Next-Gen, ~50 % kleiner als H.264)

```bash
ffmpeg -i input.mov \
  -c:v libsvtav1 -crf 35 -preset 6 \
  -pix_fmt yuv420p10le \
  -vf "scale=1920:-2,fps=30" \
  -an \
  hero.av1.webm
```

Browser-Support: Chrome 120+, Edge, Firefox 132+. Als **dritte** `<source>` ausliefern, **vor** WebM/VP9.

### Poster (first-frame JPEG/WebP)

```bash
ffmpeg -i input.mov -vframes 1 -q:v 2 -vf "scale=1920:-2" hero-poster.webp
```

## Content-Schema

```ts
// src/lib/content.ts
export const HERO = {
  videoMp4: "/hero/hero.mp4",
  videoWebm: "/hero/hero.webm",
  posterUrl: "/hero/hero-poster.webp",
  // Optional: env-override für CDN-URL
  // videoMp4: import.meta.env.VITE_HERO_VIDEO_URL ?? "/hero/hero.mp4",
} as const;
```

## Performance-Guardrails

| Metrik | Ziel | Warum |
|--------|------|-------|
| Dateigröße MP4 | ≤ 2.5 MB | LCP-Budget auf 4G |
| Dateigröße WebM | ≤ 1.8 MB | Chrome-User profitieren |
| Auflösung | 1920×1080 max | Kein Gewinn auf 4K-Desktops im Cover-Mode |
| Framerate | 30 fps | 60 fps verdoppelt Size ohne visuellen Gewinn |
| Dauer | 8–15 s Loop | Länger → User verliert Interesse |
| Audio | keine | -40 % Size, Autoplay braucht eh muted |
| Poster | WebP, ≤ 120 KB | Wird immer gerendert, bevor Video startet |

## Accessibility

- `aria-hidden` auf `<video>` (kein semantischer Inhalt).
- `prefers-reduced-motion`: Video pausieren und nur Poster zeigen:

```tsx
useEffect(() => {
  const v = videoRef.current;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (v && reduce) v.pause();
}, []);
```

- Caption track weglassen — Hero-Video hat keinen narrativen Inhalt.

## Safari/iOS Troubleshooting

| Symptom | Ursache | Fix |
|---------|---------|-----|
| Video startet nicht | `muted` fehlt oder zu spät gesetzt | Attribut im JSX + `v.muted = true` im Effect |
| Schwarzer Frame statt Poster | Video lädt, Poster-URL kaputt | WebP statt JPG testen, 404 prüfen |
| Ruckeln auf iPhone | Pixel-Format nicht `yuv420p` | ffmpeg mit `-pix_fmt yuv420p` re-encoden |
| Kein Loop | `loop` Attribute fehlt oder Video > 30 s | Video kürzen, Attribut setzen |
| Autoplay blockiert trotz muted | User hat Low-Power-Mode | Poster sichtbar lassen, User tappt → `play()` |

## CDN / Hosting

- **Cloudflare Stream** — transcoded automatisch in multiple Renditions, liefert HLS.
- **Mux** — Premium, perfekt für >1 Video pro Site, Analytics inklusive.
- **Self-host** — Nur wenn < 5 Videos und CDN in Nähe der Target-Audience.
- Niemals aus `public/` für Traffic > 10k/Monat — Vite baut Assets ohne Edge-Cache.

## Integration mit Scroll-Scrub (Hybrid-Modus)

Wenn man **beide** Effekte will (Video im Hero, Scrub im zweiten Viewport):

```tsx
<Hero />           {/* <video> Loop */}
<ScrubSequence />  {/* Canvas-Frames beim zweiten Scroll-Viewport */}
```

→ Zwei Assets-Pakete. Nicht im gleichen Viewport kombinieren, sonst GPU-Konkurrenz.

## Anti-Slop

- **Keine Stock-Footage mit Drohnenflug über "Italy"-Landschaft**. Zu generisch.
- Nicht > 20 s Loop — User scrollt weiter, ehe er den Schnitt sieht.
- Kein `controls` auf Hero-Video. User soll nicht pausieren können.
- Keine `<video>` ohne `poster` — LCP-Killer.
- Keine `object-contain` — nur `object-cover`, sonst Letterbox.

## Quellen

- [WebM vs H.264 Bitrate Tests (Google Web Fundamentals)](https://web.dev/articles/media-mp4-vs-webm)
- [AV1 Encoding with SVT-AV1](https://trac.ffmpeg.org/wiki/Encode/AV1)
- [Safari Autoplay Policies](https://webkit.org/blog/6784/new-video-policies-for-ios/)
