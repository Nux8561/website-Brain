# Website Brain — Agent-Anweisungen

Wenn der Workspace **„website Brain“** oder ein daraus klonter **Vite-Ordner** (`template/`-Kopie) aktiv ist, gilt Folgendes.

## Standard-Modus (Default)

Das Template ist eine **einseitige Premium-Landing** mit:

- **Video-Hero** (`Hero.tsx`): `HERO_VIDEO` in `src/lib/content.ts` — lokal `public/hero.webm` + **`public/hero.mp4` (H.264)** für Safari/iOS; optional `VITE_HERO_VIDEO_URL` in `.env`.
- **Google / Maps**: `GOOGLE_PLACE` in `content.ts` + Komponenten `GoogleRating.tsx`, `FindUsMap.tsx`.
- **Copy & Struktur**: alles weitere in `src/lib/content.ts`; Styles/Tokens in `src/index.css`.

## Einstieg pro neuem Kundenprojekt

1. **`inputs/WEBSITE-PLANE.template.md`** im Brain kopieren → im Zielprojekt als `WEBSITE-PLANE.md` ablegen und ausfüllen (oder nur die Felder, die fehlen).
2. **`inputs/GOOGLE.url.example.txt`**: eine Zeile mit der öffentlichen Google-Maps-URL des Lokals (Profil oder Suche).
3. **`docs/GOOGLE-INGEST.md`** befolgen: Daten aus Maps/Bewertungen in `GOOGLE_PLACE` und ggf. Copy in `content.ts` übernehmen.
4. **`docs/FAST-TRACK.md`**: minimaler Ablauf bis `npm run dev`.

## Alternativ-Modus: Scroll-Scrub (Canvas-Frames)

Der ursprüngliche **AirPods-Style** mit Canvas und `public/frames/` ist weiterhin in **`prompt.md`** und **`docs/MODE-CINEMATIC-SCRUB.md`** beschrieben. Scripts: `scripts/extract-frames.sh` / `extract-frames.mjs`. Das aktuelle Default-`template/` nutzt **keinen** Frame-Scrub im Hero (Video statt Canvas).

## Was nicht tun

- Keine Emoji in UI-Copy, keine violetten Standard-Gradienten, keine Lorem-Reste (siehe `docs/CHECKLIST.md`).
- Hero für Produktion: **MP4 vor WebM** im Markup (bereits so im Template).

## Wichtige Dateien

| Zweck | Pfad |
|--------|------|
| Inhalte & Google | `template/src/lib/content.ts` |
| Hero-Video | `template/src/components/Hero.tsx` |
| Meta / Preload | `template/index.html` |
| Design-Tokens | `template/src/index.css` |
