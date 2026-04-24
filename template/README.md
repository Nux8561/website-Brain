# Website Brain — Site Template (Default)

Vite + React 18 + TypeScript + Tailwind v4 + shadcn/ui + Motion. **Hero:** Fullscreen-**Video** (WebM + **MP4** für Safari/iOS). **Google:** Bewertungszeile + eingebettete Karte (`GOOGLE_PLACE` in `src/lib/content.ts`).

> Referenz-Implementierung entspricht dem Projekt **Barist**; für neue Kunden: Copy ersetzen, Assets tauschen, `GOOGLE_PLACE` aktualisieren.

## Schnellstart

```bash
npm install
npm run dev
```

## Wo du editierst

| Thema | Datei |
|--------|--------|
| Alle Texte, Links, Google, Video-Pfade | `src/lib/content.ts` |
| Meta, Poster-Preload | `index.html` |
| Farben, Fonts, Komponenten-Utilities | `src/index.css` |
| Hero-Verhalten | `src/components/Hero.tsx` |

## Hero-Assets

Lege ab (oder ersetze die mitgelieferten Beispiele):

- `public/hero.webm` — VP9, möglichst moderate Bitrate
- `public/hero.mp4` — **H.264**, `yuv420p`, `+faststart` (Pflicht für iOS)
- `public/hero-poster.webp` — Standbild

Im Brain-Repo: `../scripts/encode-hero.ps1 -Source pfad\quelle.mp4`

Optional `.env`:

```env
# CDN-URL überschreibt lokale Pfade im Hero (siehe Hero.tsx)
# VITE_HERO_VIDEO_URL=
```

## Google Maps

`GOOGLE_PLACE` in `content.ts`: `rating`, `reviewCount`, `label`, `description`, `reviewsUrl`, `directionsUrl`, `embedUrl`. Anleitung zum Ableiten aus der Browser-Maps-Seite: **`../docs/GOOGLE-INGEST.md`** (im übergeordneten „website Brain“-Ordner).

## Projektstart mit Plane + Google-URL

1. Kopiere aus dem Brain-Ordner `inputs/WEBSITE-PLANE.template.md` → **`WEBSITE-PLANE.md`** hier ins Root.
2. **`GOOGLE.url.txt`** — eine Zeile Maps-URL.
3. Cursor / Agent: `AGENTS.md` und `docs/GOOGLE-INGEST.md` aus dem Brain lesen und `content.ts` befüllen.

## Optional: Cinematic Frame-Scrub

Komponente `ScrubSequence.tsx` ist enthalten; der **aktuelle** `Hero` nutzt sie nicht. Umbau und Frames: **`../docs/MODE-CINEMATIC-SCRUB.md`** + `../prompt.md`.

## Build

```bash
npm run build
npm run preview
```

Checkliste: `../docs/CHECKLIST.md` (Abschnitt Default).
