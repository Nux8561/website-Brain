# Fast-Track — neues Projekt in wenigen Schritten

Voraussetzung: Ordner **`website Brain/template`** wurde in den neuen Projektordner kopiert und `npm install` ist durch.

## Schritt A — Plane & Google (2 Dateien)

1. **`WEBSITE-PLANE.md`** — aus `inputs/WEBSITE-PLANE.template.md` erzeugen und ausfüllen.
2. **`GOOGLE.url.txt`** — eine Zeile mit der Google-Maps-URL zum Lokal (Profil oder Such-Link).

Diese beiden Dateien **im Projektroot** ablegen (gleiche Ebene wie `package.json`).

## Schritt B — Agent / Cursor

Prompt-Idee:

> Lies `WEBSITE-PLANE.md` und `GOOGLE.url.txt`. Folge `docs/GOOGLE-INGEST.md`: extrahiere sichtbare Fakten (Name, Adresse, Rating, Review-Count wenn sichtbar) und trage sie in `src/lib/content.ts` (`GOOGLE_PLACE`, `BRAND`, `HERO`, …) sowie `index.html` (title, meta description) ein. Ändere nichts an der Komponenten-Architektur, außer es ist nötig.

## Schritt C — Hero-Video

1. Quellvideo bereitstellen (kurz, stabil, 16:9 oder passend zum Layout).
2. **`public/hero.webm`** und **`public/hero.mp4`** (H.264) erzeugen — siehe `scripts/encode-hero.ps1` (Windows) oder eigene ffmpeg-Pipeline.
3. **`public/hero-poster.webp`** (erstes Frame oder Key Visual).
4. In `content.ts`: `HERO_VIDEO` (`srcWebm`, `srcMp4`, `poster`) prüfen; optional `.env` mit `VITE_HERO_VIDEO_URL` für CDN.

## Schritt D — Check & Ship

```bash
npm run build
npm run preview
```

Checkliste: [CHECKLIST.md](CHECKLIST.md) (Abschnitt **Default-Modus**).

## Optional — alter Cinematic-Scrub-Modus

Nur wenn du bewusst **Canvas + Frames** willst: [MODE-CINEMATIC-SCRUB.md](MODE-CINEMATIC-SCRUB.md) und `prompt.md`.
