# Website Brain — Agent-Anweisungen

Wenn der Workspace **„website Brain"** oder ein daraus geklonter **Vite-Ordner** (`template/`-Kopie) aktiv ist, gilt Folgendes.

---

## 🧭 Entry-Point: Das solltest du als Agent zuerst tun

1. **`inputs/COMPANY-BRIEF.template.md`** lesen — dort hat der User die Firmendaten eingetragen.
2. **`modes/README.md`** öffnen — dort steht die Liste der Modes (ristorante, cinematic-scrub, 3d-immersive) und wann welcher gewählt wird.
3. **`skills/README.md`** öffnen — dort ist der Index aller aktivierbaren Skills.
4. Anhand von Brief + Assets den passenden Mode wählen und dessen `MODE.md` lesen.
5. Die dort aufgelisteten `skills_required` aktivieren (d. h. deren `SKILL.md` als Kontext laden).
6. Template-Konfig füllen (`template/src/lib/content.ts`) und Assets verarbeiten.
7. `npm install && npm run dev`, Preview-URL melden.

**Ziel:** Mit 1–3 Prompts läuft eine produktionsnahe Website — der User muss nur den Ordner + Firmendaten liefern.

---

## Modes (Projekt-Type-Presets)

| Mode | Default für | Skills |
|------|-------------|--------|
| [`ristorante`](./modes/ristorante/MODE.md) | **Italienische Gastronomie** (Default für 80 % der Projekte) | italian-restaurant-preset, video-hero, google-maps-ingest |
| [`cinematic-scrub`](./modes/cinematic-scrub/MODE.md) | Apple-Style Scroll-Scrub / Relocation-Storytelling | (prompt.md-Spec) |
| [`3d-immersive`](./modes/3d-immersive/MODE.md) | 3D-Hero, Konfigurator, Virtual Showroom | 3d-web-experience, react-three-fiber, lenis-smooth-scroll |

Mode-Switch im Template: `SITE_MODE` + `HERO_MODE` in `src/lib/content.ts`.

---

## Skills — aktivier-bare Wissenspakete

Jede Skill-Datei in `skills/<name>/SKILL.md` hat YAML-Frontmatter mit **triggers** (Keyword-Array). Wenn der User etwas in der Nähe dieser Keywords schreibt, aktiviert der Agent die Skill:

| Skill | Triggers (auszugsweise) |
|-------|------------------------|
| [3d-web-experience](./skills/3d-web-experience/SKILL.md) | `3d hero`, `three.js`, `produkt konfigurator`, `glb`, `virtueller showroom` |
| [react-three-fiber](./skills/react-three-fiber/SKILL.md) | `r3f`, `<Canvas>`, `useFrame`, `useGLTF` |
| [gsap-scrollytelling](./skills/gsap-scrollytelling/SKILL.md) | `gsap`, `scrolltrigger`, `pin`, `scrub`, `timeline` |
| [lenis-smooth-scroll](./skills/lenis-smooth-scroll/SKILL.md) | `lenis`, `smooth scroll`, `scroll ruckelt` |
| [shader-backgrounds](./skills/shader-backgrounds/SKILL.md) | `shader`, `glsl`, `flammen`, `fluid gradient` |
| [video-hero](./skills/video-hero/SKILL.md) | `video hero`, `webm`, `mp4`, `ffmpeg`, `autoplay` |
| [webgpu-ready](./skills/webgpu-ready/SKILL.md) | `webgpu`, `WebGPURenderer`, `tsl` |
| [italian-restaurant-preset](./skills/italian-restaurant-preset/SKILL.md) | `ristorante`, `trattoria`, `pizzeria`, `italienisches restaurant`, `barist` |
| [google-maps-ingest](./skills/google-maps-ingest/SKILL.md) | `google maps`, `google bewertungen`, `place id`, `embed map` |

**Depends_on** im Frontmatter: wenn Skill A `depends_on: [B]` hat, wird B automatisch mitaktiviert.

---

## Standard-Modus (Default = Ristorante)

Das Template ist eine **einseitige Premium-Landing** mit:

- **Video-Hero** (`Hero.tsx`): `HERO_VIDEO` in `src/lib/content.ts` — lokal `public/hero.webm` + **`public/hero.mp4` (H.264)** für Safari/iOS; optional `VITE_HERO_VIDEO_URL` in `.env`.
- **Google / Maps**: `GOOGLE_PLACE` in `content.ts` + Komponenten `GoogleRating.tsx`, `FindUsMap.tsx`.
- **Copy & Struktur**: alles weitere in `src/lib/content.ts`; Styles/Tokens in `src/index.css`.

## Einstieg pro neuem Kundenprojekt (Quick-Path)

1. **`inputs/COMPANY-BRIEF.template.md`** kopieren → als `COMPANY-BRIEF.md` füllen.
2. **`inputs/GOOGLE.url.example.txt`**: eine Zeile mit der öffentlichen Google-Maps-URL.
3. **`docs/GOOGLE-INGEST.md`** befolgen: Daten aus Maps/Bewertungen in `GOOGLE_PLACE` + ggf. Copy in `content.ts` übernehmen.
4. **`docs/FAST-TRACK.md`**: minimaler Ablauf bis `npm run dev`.
5. Für 3D oder Scrub: den passenden Mode-Ordner in `modes/` nutzen.

## Alternativ-Modus: Scroll-Scrub (Canvas-Frames)

Der ursprüngliche **AirPods-Style** mit Canvas und `public/frames/` ist in **`prompt.md`** und **`modes/cinematic-scrub/MODE.md`** beschrieben. Scripts: `scripts/extract-frames.sh` / `extract-frames.mjs`. Das aktuelle Default-`template/` nutzt **keinen** Frame-Scrub im Hero (Video statt Canvas).

## Alternativ-Modus: 3D Immersive

Siehe **`modes/3d-immersive/MODE.md`**. Nutzt Three.js + R3F + Lenis. Ideal für Premium-Brand-Positionierung, Konfiguratoren, Virtual Showrooms. Assets via `gltf-transform` auf ≤ 500 KB optimieren.

---

## Skill-Aktivierung — wie der Agent das macht

**Pattern 1 — Expliziter Trigger im User-Prompt:**

> „Baue einen rotierenden 3D-Teller im Hero."

→ Trigger `3d hero`, `3d teller` matchen → Agent lädt `skills/3d-web-experience/SKILL.md`.
→ Dessen `depends_on: [react-three-fiber, lenis-smooth-scroll]` → auch diese laden.
→ Arbeitet mit dem dort dokumentierten Boilerplate.

**Pattern 2 — Mode-basiert:**

User wählt `ristorante`-Mode → `modes/ristorante/MODE.md` listet `skills_required: [italian-restaurant-preset, video-hero, google-maps-ingest]` → Agent lädt diese automatisch.

**Pattern 3 — Implizit aus Content-Brief:**

Wenn im Brief „Ristorante am Hackescher Markt" steht → matched auf `italienisches restaurant` → italian-restaurant-preset wird aktiv, Mode wird automatisch `ristorante`.

---

## Was nicht tun

- Keine Emoji in UI-Copy.
- Keine violetten Standard-Gradienten (Palette steht in [italian-restaurant-preset](./skills/italian-restaurant-preset/SKILL.md)).
- Keine Lorem-Reste (siehe `docs/CHECKLIST.md`).
- Hero für Produktion: **MP4 vor WebM** im Markup (bereits so im Template).
- GSAP **nicht** in den Default-Ristorante-Mode einführen — nur im `3d-immersive` oder explizit via gsap-scrollytelling Skill aktiviert.
- Keine 3D-Szene ohne Poster-Fallback + `prefers-reduced-motion` Check.
- Keine Canvas-Hero ohne LCP-Ziel-Prüfung.

## Wichtige Dateien

| Zweck | Pfad |
|--------|------|
| Company-Brief-Template | `inputs/COMPANY-BRIEF.template.md` |
| Modes-Index | `modes/README.md` |
| Skills-Index | `skills/README.md` |
| Inhalte & Google | `template/src/lib/content.ts` |
| Hero-Video | `template/src/components/Hero.tsx` |
| Meta / Preload | `template/index.html` |
| Design-Tokens | `template/src/index.css` |
| Original-Spec (Scrub-Mode) | `prompt.md` |
