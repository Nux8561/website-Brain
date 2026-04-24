---
name: ristorante
version: 1.0
base_template: template/
skills_required:
  - italian-restaurant-preset
  - video-hero
  - google-maps-ingest
skills_optional:
  - shader-backgrounds
  - 3d-web-experience
triggers:
  - "italienisches restaurant"
  - "trattoria"
  - "pizzeria"
  - "osteria"
  - "enoteca"
  - "ristorante"
  - "barist"
description: >
  Default-Mode. Italienische Gastro-Website mit Video-Hero, Google-Maps-Section,
  Bento-Services, Testimonials aus Google-Reviews. Reference: Barist (Hackescher
  Markt, Berlin).
---

# Mode: Ristorante

## Stack

- **Template:** `template/` (Vite + React 18 + Tailwind v4 + shadcn/ui).
- **Hero:** `<video>` mit WebM + MP4 Dual-Source.
- **Sections (in Reihenfolge):** Hero → Pourquoi (3 Gründe) → ServicesBento (4 Cards) → Process → Hours → Testimonials → FindUsMap → CtaFooter → FAQ.

## Content-Schema — `src/lib/content.ts`

```ts
export const SITE_MODE = "ristorante" as const;
export const HERO_MODE = "video" as const;

export const BRAND = {
  name: "Barist",
  italicWord: "ristorante",
  tagline: "Autentica cucina italiana — seit 1998.",
  logoUrl: "/logo.svg",
};

export const HERO = {
  videoMp4: "/hero/hero.mp4",
  videoWebm: "/hero/hero.webm",
  posterUrl: "/hero/hero-poster.webp",
  eyebrow: "Hackescher Markt, Berlin",
  headline: ["Autentica cucina", "italiana —", "seit 1998."],
  sub: "Handgemachte Pasta, Pizza aus dem Holzofen, Weine aus den Marken und der Toskana.",
  ctaPrimary: { label: "Tisch reservieren", href: "#kontakt" },
  ctaSecondary: { label: "Karte ansehen", href: "#menu" },
};

export const SERVICES = [
  { title: "Cucina", icon: "UtensilsCrossed", text: "…", img: "/img/cucina.jpg" },
  { title: "Forno a legna", icon: "Flame", text: "…", img: "/img/forno.jpg" },
  { title: "Cantina", icon: "Wine", text: "…", img: "/img/cantina.jpg" },
  { title: "Eventi", icon: "Heart", text: "…", img: "/img/eventi.jpg" },
];

export const GOOGLE_PLACE = {
  /* siehe skills/google-maps-ingest/SKILL.md */
};

export const TESTIMONIALS = [
  /* 3 beste Google-Reviews manuell gespiegelt */
];
```

## Pflicht-Sections

### 1. Hero
- `<video>` cover, 12 s Loop, muted/autoplay/loop/playsInline.
- Eyebrow-Chip mit Standort oben.
- Italic-Wort in Headline (Cormorant Garamond).
- 2 CTAs: Reservieren (primary) + Karte (ghost).

### 2. Pourquoi
3 Gründe + kleine Icons. Kein Hero-Image — Typo carry.

### 3. ServicesBento
Bento-Grid mit Food-Photography als Hintergrund. Siehe [italian-restaurant-preset](../../skills/italian-restaurant-preset/SKILL.md#bento-layout-für-services).

### 4. Hours
Statt „50+ Kunden" Stats → Öffnungszeiten + Google-Rating-Badge.

### 5. Testimonials
3 beste Google-Reviews. Quelle: "google". Call-to-Action unten: „Alle Reviews ansehen →" → `GOOGLE_PLACE.reviewsUrl`.

### 6. FindUsMap
Zwei Spalten: Adresse/Telefon/Hours links, iframe rechts. Siehe [google-maps-ingest](../../skills/google-maps-ingest/SKILL.md).

### 7. CtaFooter
Letzte Reservierungs-Einladung. Warme Farben (Terra/Ochre Gradient).

### 8. FAQ (optional)
Allergene, Parkplätze, Kinderstühle, Hunde erlaubt?

## Asset-Checklist

Der Kunde muss liefern (oder wir beschaffen):

- [ ] Logo (SVG, monochromes Wordmark)
- [ ] Hero-Video Roh-Footage 10–15 s (wir encoden MP4 + WebM)
- [ ] Hero-Poster (first-frame WebP, wir generieren)
- [ ] 4 Food-Fotos für Services (je ≥ 1200px breit)
- [ ] Google-Place-URL oder Place-ID
- [ ] Öffnungszeiten
- [ ] Telefon
- [ ] Speisekarte als PDF (optional Download-Link)

## Prompt-Template für 1-Shot-Generation

```
Ich baue eine ristorante-Mode-Website mit dem Template.
Company: {Company Name}, {Location}, {Cuisine Type}
Google-Place: {URL oder Place-ID}
Hero-Video: {Path oder VIDEO_URL}
4 Services: {Cucina, Forno, Cantina, Eventi} — passe an falls anders.

Gehe so vor:
1. Aktiviere Skills italian-restaurant-preset, video-hero, google-maps-ingest.
2. Fülle template/src/lib/content.ts mit den Werten oben.
3. Ingest Google-Place → GOOGLE_PLACE Object.
4. Encode Hero-Video (ffmpeg-Preset aus video-hero Skill).
5. Setze HERO_MODE = "video", SITE_MODE = "ristorante".
6. Verify: npm run dev, LCP < 2.5 s, Lighthouse ≥ 90.
```

## Wann NICHT Ristorante-Mode

- Kunde ist Fine-Dining > € 200 pro Kopf → evaluate `3d-immersive` für Premium-Feel.
- Kunde ist Fast-Casual / Lieferdienst → simpler Landingpage ohne Video-Hero reicht.
- Kunde hat noch keine Fotos/Videos → zuerst Foto-Shooting beauftragen.

## Anti-Slop

- Niemals `ristorante` als Mode zu **französischen / spanischen / asiatischen** Restaurants. Die Design-DNA ist spezifisch italienisch.
- Palette nicht ändern. Ink/Terra/Ochre/Cream sind gesetzt.
- Headline nicht ohne Italic-Wort — das ist der Brand-Anker.
