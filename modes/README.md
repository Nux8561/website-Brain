# Modes — Project-Type Presets

Jeder **Mode** ist ein vordefinierter Kombinations-Setup aus mehreren Skills + Template-Konfig. Er beantwortet die Frage: „Welche Art von Website bauen wir?"

## Available Modes

| Mode | Wann einsetzen | Skills, die aktiviert werden |
|------|----------------|------------------------------|
| [`ristorante`](./ristorante/MODE.md) | **Default.** Italienische Gastronomie, Trattorien, Pizzerien. | italian-restaurant-preset, video-hero, google-maps-ingest |
| [`cinematic-scrub`](./cinematic-scrub/MODE.md) | High-End-Relocation, Apple-Style-Produkt-Launch, Scroll-Storytelling. | (prompt.md Default — Canvas-Frame-Scrub) |
| [`3d-immersive`](./3d-immersive/MODE.md) | Luxus-Brand, Produkt-Konfigurator, Virtual Showroom. | 3d-web-experience, react-three-fiber, gsap-scrollytelling, lenis-smooth-scroll |

## Flow — Mode wählen

1. User liefert Company-Brief (siehe `inputs/COMPANY-BRIEF.template.md`).
2. Cursor/Claude liest Brief, matched auf passenden Mode:
   - Italienisches Restaurant → `ristorante`
   - High-Budget-Produkt mit 3D-Assets → `3d-immersive`
   - Cinematic Story, keine Assets → `cinematic-scrub`
3. Mode zieht automatisch seine Skills (frontmatter `depends_on`).
4. Template wird entsprechend konfiguriert (`HERO_MODE` Flag, etc.).

## Modus-Wechsel nach dem Build

Jedes Template hat in `src/lib/content.ts` einen Mode-Flag:

```ts
export const SITE_MODE: "ristorante" | "cinematic-scrub" | "3d-immersive" = "ristorante";
export const HERO_MODE: "video" | "scrub" | "3d" = "video";
```

Diese Flags steuern, welche Hero-Komponente geladen wird. Siehe `template/src/App.tsx` für die Switch-Logik.

## Neuen Mode hinzufügen

```
modes/
└── mein-neuer-mode/
    └── MODE.md   # mit frontmatter: name, base_template, skills_required, overrides
```

Dann in `modes/README.md` eintragen und in `AGENTS.md` als Trigger-Keyword ergänzen.
