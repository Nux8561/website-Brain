# Agent-Hinweise (Kundenkopie dieses Templates)

## Schnellpfad

1. **`WEBSITE-PLANE.md`** und **`GOOGLE.url.txt`** (eine Zeile URL) ins **Root dieses Projekts** legen — Vorlagen liegen im übergeordneten **Website Brain** unter `inputs/`.
2. Daten aus Google Maps in **`src/lib/content.ts`** (`GOOGLE_PLACE`, `BRAND`, `HERO`, …) und **`index.html`** übernehmen. Schritt-für-Schritt: **`../docs/GOOGLE-INGEST.md`** im Brain-Ordner (oder diese Datei mit ins Repo kopieren).

## Hero

- **`public/hero.mp4`** (H.264) + **`public/hero.webm`** + **`hero-poster.webp`** — siehe `../scripts/encode-hero.ps1` im Brain.

## Optional

- Cursor-Regel aus dem Brain: **`../.cursor/rules/website-brain.mdc`** nach `.cursor/rules/` im Kundenprojekt kopieren (Pfade in der Regel ggf. anpassen).
