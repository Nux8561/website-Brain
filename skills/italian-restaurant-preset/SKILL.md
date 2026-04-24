---
name: italian-restaurant-preset
version: 1.0
triggers:
  - "ristorante"
  - "italienisches restaurant"
  - "trattoria"
  - "pizzeria"
  - "osteria"
  - "italian food"
  - "barist"
  - "italian gastro"
depends_on:
  - video-hero
  - google-maps-ingest
description: >
  Design-DNA und Content-Presets für italienische Gastronomie-Websites.
  Farbpalette (Ink/Terra/Ochre/Cream), Typo (Oswald + Inter + Cormorant Garamond
  italic für "ristorante"), Copy-Bibliothek, ristorante-card-Styles, Bento-Struktur
  mit Food-Imagery.
---

# Italian Restaurant Preset — Skill

Die Default-Wahl für 80 % der Kunden-Projekte in Dominiks Pipeline. Reference-Projekt: **Barist — Ristorante am Hackescher Markt**.

## Wann einsetzen

- **Immer**, wenn der Kunde ein italienisches Restaurant / Trattoria / Pizzeria / Osteria / Enoteca betreibt.
- Auch für deutsche Gastronomie mit italienischem Konzept (Bar Italia, Aperitivo-Bars).

## Design-DNA

### Farb-Palette

```css
/* src/index.css — @theme Block */
@theme {
  --color-ink:       oklch(0.20 0.02 40);    /* Espresso-Schwarz */
  --color-terra:     oklch(0.38 0.11 55);    /* Gebrannte Erde / Salsiccia */
  --color-ochre:     oklch(0.70 0.14 75);    /* Ochre / Tortellini-Gelb */
  --color-cream:     oklch(0.96 0.02 85);    /* Parmigiano-Cream */
  --color-basilico:  oklch(0.50 0.13 140);   /* Basilikum — sparsam! */
  --color-vino:      oklch(0.30 0.15 25);    /* Chianti-Rot — nur für Akzente */

  /* Semantic */
  --color-bg:        var(--color-ink);
  --color-fg:        var(--color-cream);
  --color-primary:   var(--color-ochre);
  --color-muted:     oklch(0.45 0.04 50);
}
```

**Regel:** Terra + Ochre sind die Hauptfarben. Basilico **nur** für 1–2 Akzente (Blätter-Icons). Vino **nur** für CTA-Hover oder Rating-Sterne.

### Typografie

| Rolle | Font | Weight | Einsatz |
|-------|------|--------|---------|
| Display | **Oswald** | 500–700 | Headlines, Navbar-Logo |
| Body | **Inter** | 400–500 | Fließtext, Buttons, UI |
| Accent Italic | **Cormorant Garamond** | 400 italic | Das Wort „ristorante", Speisekarten-Untertitel |
| Numerals | **Inter Tabular** | 500 | Öffnungszeiten, Preise |

```tsx
// Installation
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/cormorant-garamond/400-italic.css";
```

```css
@theme {
  --font-display: "Oswald", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-ristorante: "Cormorant Garamond", "Georgia", serif;
}
```

**Das Signature-Detail:** Das Wort „ristorante" wird **immer** in Cormorant Italic gesetzt, egal wo es auftritt:

```tsx
<h1 className="font-display text-6xl">
  Barist <span className="font-ristorante italic">ristorante</span>
</h1>
```

### ristorante-card (Liquid-Glass-Mask)

Statt regulärer CSS-Borders nutzt jede Karte eine `::before`-Mask für den dünnen Glow-Rand:

```css
/* src/index.css */
.ristorante-card {
  @apply relative overflow-hidden rounded-2xl bg-ink/60 backdrop-blur-md;
}
.ristorante-card::before {
  content: "";
  @apply pointer-events-none absolute inset-0 rounded-[inherit];
  padding: 1px;
  background: linear-gradient(135deg,
    oklch(0.70 0.14 75 / 0.5),
    oklch(0.38 0.11 55 / 0.15) 30%,
    transparent 60%,
    oklch(0.70 0.14 75 / 0.3));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
}
```

### pill-label

```css
.pill-label {
  @apply inline-flex items-center gap-1.5 rounded-full
         border border-ochre/30 bg-ochre/10
         px-3 py-1 text-xs font-medium uppercase tracking-wider text-ochre;
}
```

Einsatz: Über jeder Section-Headline. „La Cucina", „Il Menu", „Le Recensioni".

## Content-Templates (auf Deutsch)

### Hero

```ts
HERO: {
  eyebrow: "Hackescher Markt, Berlin",
  headline: ["Autentica cucina", "italiana —", "seit 1998."],
  italicWord: "ristorante",  // wird in Cormorant gesetzt
  sub: "Handgemachte Pasta, Pizza aus dem Holzofen, Weine aus den Marken und der Toskana.",
  ctaPrimary: { label: "Tisch reservieren", href: "#reservieren" },
  ctaSecondary: { label: "Karte ansehen", href: "#karte" },
}
```

### Services-Bento (4 Cards)

1. **Cucina** — Handgemachte Pasta am Tag frisch.
2. **Forno a legna** — Holzofen-Pizza auf 380 °C.
3. **Cantina** — 80+ Weine aus 12 Regionen.
4. **Eventi** — Private Dining bis 40 Personen.

### Pourquoi (3 Gründe)

1. **Die Nonna kocht noch selbst.** — 45 Jahre Erfahrung, Rezepte aus Apulien.
2. **Mehl kommt aus der Mühle in Altamura.** — BIO Grano Duro, wöchentliche Lieferung.
3. **Olivenöl direkt vom Erzeuger.** — Fattoria in Umbria, kalt gepresst.

### Stats / Hours

Statt Standard-„50+ Kunden"-Stats → **Öffnungszeiten + Rating**:

```
★ 4.8   |   320 Google-Bewertungen
Mo–Do   17:00–23:00
Fr–Sa   17:00–24:00
So      12:00–22:00 (Brunch)
```

### Testimonials

Google-Reviews direkt einbinden (siehe [google-maps-ingest](../google-maps-ingest/SKILL.md)).

## Food-Imagery-Regeln

- **Immer Natural Light, never Ring-Light**. Schatten sind erlaubt — sie erzählen.
- **Dark Moody** > heller skandinavischer Look. Food-Photography Credo: „If you can count the noodles, the photo is too bright."
- **Close-up > Wide**. User sehen die Textur der Pasta, nicht den ganzen Teller.
- Keine Stockfotos von „Italy Scenery" (Toskana-Hügel, Kolosseum). **Nur** echte Fotos des Lokals.
- Falls keine Fotos vorhanden: Mid-Journey-Prompt:
  ```
  "freshly plated [DISH], dark moody food photography, natural window light
  from the left, raw wood table, hands visible holding a fork, shallow depth
  of field, film grain, Sony A7 --ar 3:2 --style raw"
  ```

## Bento-Layout für Services

```tsx
<div className="grid gap-4 md:grid-cols-12">
  <Card className="md:col-span-7 md:row-span-2" bg="/img/cucina.jpg" />
  <Card className="md:col-span-5" bg="/img/forno.jpg" />
  <Card className="md:col-span-3" bg="/img/cantina.jpg" />
  <Card className="md:col-span-2" bg="/img/eventi.jpg" />
</div>
```

Unsymmetrisch, ein Hero-Tile + 3 kleinere → erzählt visuell Hierarchie.

## Hero-Video-Empfehlungen

Siehe [video-hero](../video-hero/SKILL.md) für Encoding. Content-Tipps:

- **Shot 1 (0–3 s):** Mehl fällt auf Holztisch, Hände kneten.
- **Shot 2 (3–6 s):** Pasta-Schneide-Close-up, Dampf.
- **Shot 3 (6–9 s):** Pizza geht in Holzofen, Flammen.
- **Shot 4 (9–12 s):** Weinglas wird gefüllt, tiefes Rot.
- **Loop-Point:** Zurück zu Shot 1.

## Navbar

- Sticky + frosted glass ab Scroll > 80 px.
- Items: `Menu | Locale | Cantina | Eventi | Kontakt`.
- **Rechts:** Google-Rating-Badge (★ 4.8) + „Reservieren"-Button.

## FindUsMap-Section (Pflicht)

Siehe [google-maps-ingest](../google-maps-ingest/SKILL.md). Immer zwei Spalten:

- Links: Adresse, Telefon, Öffnungszeiten, Anfahrt.
- Rechts: Eingebettete Google Map.

## Copy-Ton

- **Du-Form**, nicht Sie. „Komm vorbei", „Reservier einen Tisch".
- **Italienische Wörter sparsam streuen**: „Buona sera", „La cucina", „Il cuore della casa".
- **Keine Superlative ohne Beweis**. Statt „das beste Restaurant" → „seit 1998 am gleichen Ort".
- **Geschichten > Features**. „Die Tomatensauce kocht 6 h" > „Hausgemachte Sauce".

## Anti-Slop

- **Kein Chianti-Flaschen-Laternen-Klischee.** Niemals.
- **Keine roten-weiß-karierten Tischdecken** in Hero-Shots.
- **Kein „Mamma Mia"-Emoji-Spam**.
- **Kein Blau in der Palette** — Italien-Brand ist warmtonig.
- **Keine langen About-Us-Romane**. 3 Sätze über die Nonna reichen.

## Reference

Barist (Hackescher Markt, Berlin) — siehe `template/` im Repo-Root für den kompletten Live-Build.
