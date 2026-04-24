# Website Brain — Werkzeugkoffer

Wiederverwendbares Toolkit für **Premium-Landingpages** (Vite + React 18 + TypeScript + Tailwind v4). Der referenzierte Stand in **`template/`** entspricht dem **Barist-Erfolgsprojekt**: Video-Hero (WebM + **MP4 für Safari**), Google-Bewertung, Karten-Embed, Bento, FAQ — alles zentral in **`src/lib/content.ts`**.

## Ordnerstruktur

```
website Brain/
├── AGENTS.md                 # Kurzbrief für Cursor / Coding-Agenten
├── README.md                 # diese Datei
├── prompt.md                 # Mega-Prompt für den Cinematic FRAME-SCRUB-Modus (Legacy-Spezifikation)
├── inputs/                   # Vorlagen pro Kundenprojekt
│   ├── README.md
│   ├── WEBSITE-PLANE.template.md
│   └── GOOGLE.url.example.txt
├── docs/
│   ├── FAST-TRACK.md         # schnellster Einstieg (Plane + Google)
│   ├── GOOGLE-INGEST.md      # Maps-Daten → content.ts
│   ├── MODE-CINEMATIC-SCRUB.md
│   ├── USAGE.md              # beide Modi
│   ├── CHECKLIST.md
│   └── PLACEHOLDER_EXAMPLES.md
├── scripts/
│   ├── extract-frames.sh / .mjs   # nur für Scrub-Modus
│   └── encode-hero.ps1            # Windows: Hero WebM + MP4 + Poster
└── template/                 # kopierfertiges Vite-Projekt (Default = Video + Google)
```

## Workflow — neues Projekt (empfohlen)

1. **`template/`** in den Zielordner kopieren → `npm install`.
2. **`inputs/WEBSITE-PLANE.template.md`** → im Zielprojekt als **`WEBSITE-PLANE.md`** speichern und ausfüllen.
3. **`GOOGLE.url.txt`** im Zielprojektroot: **eine Zeile** Google-Maps-URL (siehe `inputs/GOOGLE.url.example.txt`).
4. Cursor mit **`AGENTS.md`** + **`docs/GOOGLE-INGEST.md`** füttern oder Regel **`/.cursor/rules/website-brain.mdc`** ins Projekt übernehmen.
5. Hero-Assets: **`encode-hero.ps1`** oder eigene Pipeline → `public/hero.webm`, `public/hero.mp4`, `public/hero-poster.webp`.
6. **`npm run dev`** → [docs/CHECKLIST.md](docs/CHECKLIST.md) (Abschnitt Default).

## Zwei Modi

| Modus | Hero | Doku |
|--------|------|------|
| **Default** | `<video>` WebM + MP4, `HERO_VIDEO` in `content.ts` | [docs/FAST-TRACK.md](docs/FAST-TRACK.md) |
| **Cinematic Scrub** | Canvas + `public/frames/*` | [prompt.md](prompt.md), [docs/MODE-CINEMATIC-SCRUB.md](docs/MODE-CINEMATIC-SCRUB.md) |

## Tech (unverändert zentral)

- Vite, React 18, TS, Tailwind v4 `@theme`, shadcn/ui (Button, Accordion), `motion`, lucide-react, `@fontsource/*`.
