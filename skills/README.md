# Skills — Werkzeuge für Cursor & Claude Code

Jeder Unterordner ist ein **wiederverwendbares Fähigkeits-Modul**. Cursor/Claude liest die passende `SKILL.md` **on-demand**, wenn ein Task dazu passt — nicht alle auf einmal.

## Wie ein Skill aktiviert wird

- Im Chat: `@skills/3d-web-experience` (Cursor) oder im Claude-Code-Slash `/skill 3d-web-experience`.
- Automatisch via **Trigger-Keywords** in der `SKILL.md`-Frontmatter (siehe dort).
- Manuell: `Lies skills/<name>/SKILL.md und folge der Anleitung.`

## Skill-Index

| Skill | Zweck | Stack | Ideal für |
|--------|-------|-------|-----------|
| **[3d-web-experience](3d-web-experience/SKILL.md)** | Immersive 3D-Szenen, GLTF, PBR, Raycasting | Three.js, R3F, Drei | Produkt-Konfigurator, 3D-Teller, virtueller Showroom |
| **[react-three-fiber](react-three-fiber/SKILL.md)** | R3F Setup, Patterns, Hooks | R3F 9+, Drei, Leva | Jede React-Szene |
| **[gsap-scrollytelling](gsap-scrollytelling/SKILL.md)** | Pin, Scrub, Timeline | GSAP 3, ScrollTrigger | Long-form Storytelling, Scroll-getriggerte Szenen |
| **[lenis-smooth-scroll](lenis-smooth-scroll/SKILL.md)** | Smooth Scroll ohne Jank | `lenis` | Pflicht bei GSAP + Parallax |
| **[shader-backgrounds](shader-backgrounds/SKILL.md)** | GLSL-Fragment-Shader als Hintergrund | Raw WebGL oder R3F | Fluid-Gradient, Noise-Hintergrund, Fire-Shader |
| **[video-hero](video-hero/SKILL.md)** | Video-Hero Best Practices | HTML5 video, ffmpeg | Default-Mode (Barist-Stil) |
| **[webgpu-ready](webgpu-ready/SKILL.md)** | WebGPU-Pfad, Three.js r183+ | WebGPURenderer | Modern-Chrome-Experiments |
| **[italian-restaurant-preset](italian-restaurant-preset/SKILL.md)** | Design-DNA für Ristoranti | Copy, Palette, Typo | Alle italienischen Gastro-Projekte |
| **[google-maps-ingest](google-maps-ingest/SKILL.md)** | Maps-URL → `GOOGLE_PLACE` | - | Jedes lokale Business |

## Komposition

Skills kombinieren:

- **Ristorante + Video-Hero + Google-Ingest** → Default-Modus (siehe `modes/ristorante/`).
- **Ristorante + 3D-Web-Experience + R3F + Lenis** → Premium-Modus mit 3D-Teller im Hero.
- **GSAP + Lenis + Shader-Backgrounds** → Scrollytelling mit animiertem Hintergrund.

## Neue Skills hinzufügen

1. Ordner `skills/<name>/` anlegen.
2. `SKILL.md` mit dieser Frontmatter:
   ```md
   ---
   name: <name>
   triggers: ["keyword1", "keyword2"]
   depends_on: ["react-three-fiber"]
   ---
   ```
3. In diese Tabelle eintragen.
