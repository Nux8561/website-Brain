# Modus: Cinematic Scroll-Scrub (Canvas + Frames)

Der **Default** im aktuellen `template/` ist ein **Video-Hero** (WebM + MP4) plus Google-Block — siehe [FAST-TRACK.md](FAST-TRACK.md).

Dieses Dokument beschreibt den **älteren alternativen Modus**: Hero als **Canvas**, Bildfolge aus `public/frames/`, gesteuert über Scroll (AirPods-Pro-Stil).

## Komponenten im Template

- `src/components/ScrubSequence.tsx` — wiederverwendbare Canvas-Logik (Props: `framesPath`, `frameCount`, `ext`, `scrollTargetRef`).
- `prompt.md` — vollständige Spezifikation inkl. Layout- und Anti-Slop-Regeln.

## Setup

1. Video nach `input/source.mp4` (oder vergleichbar).
2. Frames extrahieren:
   - `bash scripts/extract-frames.sh 30 jpg` (Pfad ggf. anpassen), **oder**
   - `node scripts/extract-frames.mjs` (WASM-Variante, siehe Script-Kopf).
3. Ausgabe nach `public/frames/frame_0001.jpg` … (oder `.webp`).
4. **`Hero.tsx`** so umbauen, dass statt `<video>` die `ScrubSequence` mit passendem `scrollTargetRef` und `frameCount` gerendert wird (Referenz: frühere `template`-Versionen oder `prompt.md` Sektion Hero).
5. **`index.html`**: Preload auf **erstes Frame** statt Video-Poster.

## Wann welcher Modus?

| Kriterium | Video-Hero (Default) | Frame-Scrub |
|-----------|----------------------|-------------|
| Safari/iOS | MP4 + WebM | Canvas-Bilder |
| Asset-Größe | 2 Video-Dateien | Viele JPEG/WebP |
| „Apple-like“ Scrub | weniger | stärker |
