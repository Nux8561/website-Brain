# Usage — vom Werkzeugkoffer zur fertigen Website

## Modus wählen

- **A — Default (Video + Google):** dieser Ablauf, Abschnitte 1–6.
- **B — Cinematic Scrub (Canvas + Frames):** [MODE-CINEMATIC-SCRUB.md](MODE-CINEMATIC-SCRUB.md) und `prompt.md`; `Hero` muss auf `ScrubSequence` umgestellt werden (nicht Teil des aktuellen Default-Templates).

---

## A1. Projekt anlegen

Kopiere `website Brain/template` in deinen Zielordner, dann:

```bash
cd pfad/zum/projekt
npm install
```

## A2. Plane & Google (empfohlen)

1. Kopiere `inputs/WEBSITE-PLANE.template.md` → **`WEBSITE-PLANE.md`** ins Projektroot und fülle es aus.
2. Lege **`GOOGLE.url.txt`** an (eine Zeile: Google-Maps-URL zum Lokal).

Siehe [FAST-TRACK.md](FAST-TRACK.md) und [GOOGLE-INGEST.md](GOOGLE-INGEST.md).

## A3. Inhalte technisch einpflegen

- **`src/lib/content.ts`** — einzige zentrale Quelle für Copy, `GOOGLE_PLACE`, `HERO_VIDEO`, Navigation, Sektionen.
- **`index.html`** — `<title>`, `meta description`, `<html lang="…">` an `LANG` anpassen.

## A4. Hero-Video

- Dateien: `public/hero.webm`, `public/hero.mp4` (H.264 für Safari/iOS), `public/hero-poster.webp`.
- Windows-Hilfe: `scripts/encode-hero.ps1` (ffmpeg im PATH).
- Optional: `.env` mit `VITE_HERO_VIDEO_URL` für externes Hosting (siehe `Hero.tsx`).

## A5. Design feinjustieren

- **Palette / Tokens:** `src/index.css` (HSL-Variablen, `@theme`).
- **Fonts:** `@import` in `index.css` + `package.json` — nur benötigte Schnitte installieren.

## A6. Dev & Release

```bash
npm run dev
npm run build
npm run preview
```

[CHECKLIST.md](CHECKLIST.md) abhaken.

---

## B. Frame-Scrub (Legacy-Pfad)

1. `mkdir input` und Video als `input/source.mp4`.
2. `bash ../../website Brain/scripts/extract-frames.sh 30 jpg` (Pfade anpassen).
3. `public/frames/` befüllen; `Hero` auf `ScrubSequence` umbauen; `FRAME_COUNT` / Extension in Code pflegen (siehe MODE-Dokument — `constants.ts` ist im Default-Template entfernt).

---

## Platzhalter-Qualität (prompt.md)

Wenn du den **Mega-Prompt** nutzt: [PLACEHOLDER_EXAMPLES.md](PLACEHOLDER_EXAMPLES.md).
