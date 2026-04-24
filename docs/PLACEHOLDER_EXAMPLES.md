# Placeholder-Beispiele

Für den **aktuellen Default** (Video-Hero + Google) siehe auch [FAST-TRACK.md](FAST-TRACK.md) und `inputs/WEBSITE-PLANE.template.md` — dort ist der Copy-Flow ohne `{{PLACEHOLDER}}`-Syntax beschrieben.

Jeder Placeholder aus `prompt.md` mit einem guten + einem schlechten Beispiel.
Gut = editorial, cinematic, spezifisch. Schlecht = generic AI-slop.

## `{{LANG}}`
- ✅ `fr-CH`, `en-US`, `de-CH`
- ❌ `FR`, `english`

## `{{BRAND_NAME}}`
Kurz. 1–2 Wörter. Kapitälchen-fähig.
- ✅ `Atelier`, `ABP`, `Maison Nord`
- ❌ `The Best Moving Company Ever`

## `{{BRAND_TAGLINE}}`
3–6 Wörter. Editorial, nicht sales-y.
- ✅ `Déménagement d'exception`, `Built for what's next`, `The quiet way to move`
- ❌ `We are the #1 trusted moving solution`

## `{{HERO_HEADLINE}}`
2–5 Wörter. Die Caps-Typographie mit `leading-[0.92]` braucht kurze, harte Worte.
- ✅ `Bouger, sans bruit.`, `Move, quietly.`, `Built to last.`
- ❌ `Welcome to our amazing moving service platform`

## `{{HERO_SUB}}`
1–2 Sätze. Liefert Kontext, nicht Hype.
- ✅ `Du studio au penthouse. L'art du déménagement, signé Atelier.`
- ❌ `We offer the best services with amazing customer support and competitive pricing!`

## `{{CTA_LABEL}}` / `{{HERO_CTA_PRIMARY}}`
1–3 Wörter. Verb oder Substantiv.
- ✅ `Devis gratuit`, `Get Started`, `Start now`, `Book a call`
- ❌ `Click here to get your free quote today`

## `{{PARTNERS}}`
5–6 Markennamen. Italic Display-Type rendered, also gut lesbar im Italic.
- ✅ `["Christie's", "Sotheby's", "Piaget", "Hermès"]`
- ❌ Lorem-Firmen wie `"Brand A", "Brand B"`

## `{{SERVICES}}` (exakt 6)
Jeweils `{icon, title, body}`. Titel 1–2 Wörter. Body 1–2 Sätze.

```ts
{ icon: "Truck",    title: "Relocation", body: "Door-to-door white-glove. Every object logged, wrapped, insured." }
```

Icons aus dem iconMap (`src/lib/icons.ts`): `Truck`, `Package`, `Warehouse`,
`Globe`, `Building2`, `Sparkles`, `ShieldCheck`, `Clock`, `Leaf`, `Award`.
Neue Icons → in `icons.ts` ergänzen und IconName-Type erweitern.

## `{{REASONS}}` (exakt 4)
Rational counterpart zum emotionalen Hero. 4 Säulen der Reassurance.

## `{{PROCESS_STEPS}}` (3–4)
`n` ist String `"1".."4"`. Die Nummer wird in 140px Display-Type gerendert.

## `{{STATS}}` (exakt 4)
`value` ist ein String. Die Zahl am Anfang wird hochgezählt, der Rest bleibt Suffix.
- ✅ `"2500+"`, `"98%"`, `"24h"`, `"15 yrs"`
- ❌ `"over 2500"`, `"98 percent"` (keine Zahl am Anfang → kein Counter)

## `{{STATS_BG_VIDEO}}` / `{{CTA_BG_VIDEO}}`
HLS (`.m3u8`) oder MP4. Bei HLS: `hls.js` installieren und im Component wiren.

## `{{TESTIMONIALS}}` (≥ 6)
`{quote, name, role}`. Quote 1–2 Sätze, spezifisch (nicht "great service").
- ✅ `"They moved a 400-year-old harpsichord without a scratch."`
- ❌ `"Amazing team, highly recommend!"`

## `{{FAQ_ITEMS}}` (5–8)
`{q, a}`. Fragen in Nutzersprache, keine Marketing-FAQ.
- ✅ Q: `"How far in advance should I book?"` → A: spezifische Zeiträume
- ❌ Q: `"Why are you the best?"` → A: Eigenlob

## `{{COLOR_*}}` (HSL-Triplets, OHNE `hsl()`-Wrapper)
Format: `H S% L%` mit Leerzeichen. Beispiel: `20 15% 9%`.
- ✅ `20 15% 9%`, `32 55% 65%`
- ❌ `#1a1a1a`, `hsl(20, 15%, 9%)`, `rgb(26, 26, 26)`

Grund: Tailwind v4 rendert `hsl(var(--ink) / 0.4)` für Alpha-Varianten.

## `{{FONT_DISPLAY}}` / `{{FONT_BODY}}`
Google Fonts Family Name (exakt). Das `@fontsource`-Paket muss existieren.
- ✅ `Oswald`, `Inter`, `Playfair Display`, `Bebas Neue`
- ❌ `Custom Studio Font` (nicht auf fontsource)

Paketnamen sind kleingeschrieben, Spaces als `-`:
- `"Playfair Display"` → `npm i @fontsource/playfair-display`
