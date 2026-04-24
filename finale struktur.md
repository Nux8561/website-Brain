# Website Brain — finale Struktur (Stand 2026)

Der Werkzeugkoffer ist in zwei **klare Einstiege** geteilt: **Default = Video-Hero + Google**, optional **Cinematic Scrub** (Canvas-Frames) per Doku + `prompt.md`.

```
website Brain/
├── AGENTS.md                      # Cursor / Agent — Plane + Google → content.ts
├── README.md                      # Überblick + Workflow
├── prompt.md                      # Mega-Prompt: Frame-Scrub-Spezifikation (Legacy-Hero-Pfad)
├── finale struktur.md             # diese Datei
├── inputs/
│   ├── README.md
│   ├── WEBSITE-PLANE.template.md  # → pro Projekt: WEBSITE-PLANE.md
│   └── GOOGLE.url.example.txt     # → pro Projekt: GOOGLE.url.txt (eine Zeile URL)
├── docs/
│   ├── FAST-TRACK.md
│   ├── GOOGLE-INGEST.md
│   ├── MODE-CINEMATIC-SCRUB.md
│   ├── USAGE.md
│   ├── CHECKLIST.md
│   └── PLACEHOLDER_EXAMPLES.md
├── scripts/
│   ├── extract-frames.sh
│   ├── extract-frames.mjs
│   └── encode-hero.ps1            # WebM + MP4 + Poster (Windows / ffmpeg)
├── .cursor/rules/
│   └── website-brain.mdc          # optional ins Kundenprojekt kopieren
└── template/                      # Vite-App (Default = Barist-Stand: Video, Google, Bento, …)
    ├── package.json, vite.config.ts, tsconfig.json, index.html, …
    ├── public/
    │   ├── logo.svg
    │   ├── hero.webm, hero.mp4, hero-poster.webp
    │   └── frames/                # nur für Scrub-Modus nötig
    └── src/
        ├── App.tsx, main.tsx, index.css
        ├── lib/content.ts, icons.ts, utils.ts
        └── components/
            ├── Hero.tsx           # Default: <video>
            ├── GoogleRating.tsx, FindUsMap.tsx
            ├── ScrubSequence.tsx # vorhanden für optionalen Modus
            └── … (Navbar, Bento, FAQ, …)
```

## Workflow neues Kundenprojekt (Default)

1. `template/` kopieren → `npm install`.
2. `WEBSITE-PLANE.md` + `GOOGLE.url.txt` im **Projektroot** anlegen (Vorlagen unter `inputs/`).
3. `docs/GOOGLE-INGEST.md` befolgen → `content.ts` + `index.html`.
4. Hero encoden (`encode-hero.ps1` o. Ä.) → `public/`.
5. `npm run dev` → `docs/CHECKLIST.md` (Default-Abschnitt).

## Workflow Scrub-Modus

Siehe `docs/MODE-CINEMATIC-SCRUB.md` + Frame-Scripts + Anpassung von `Hero.tsx`.
