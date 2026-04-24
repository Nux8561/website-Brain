# Company Brief — Template

**Ausfüllen und in Cursor/Claude reinpasten.** Je mehr Felder, desto autonomer arbeitet der Agent. Minimum für einen 1-Prompt-Build sind die Felder mit ⭐.

---

## 1. Basics ⭐

- **Firmenname:** _Barist_
- **Branche:** _Italienisches Restaurant / Ristorante_
- **Stadt / Standort:** _Berlin, Hackescher Markt_
- **Sprache der Website:** _Deutsch_
- **Ungefähres Alter der Firma:** _seit 1998_

## 2. Mode-Hinweise ⭐

Welche Mode soll der Agent wählen? _(Wenn leer: er matched aus Branche & Assets.)_

- [x] `ristorante` — italienische Gastronomie
- [ ] `cinematic-scrub` — Scroll-Scrub-Story (AirPods-Style)
- [ ] `3d-immersive` — 3D-Hero / Konfigurator / Showroom
- [ ] andere / automatisch wählen

## 3. Google-Präsenz ⭐

- **Google-Maps-URL oder Place-ID:** _https://maps.app.goo.gl/..._
- **Aktuelle Rating:** _4.8 (wird beim Ingest überschrieben)_
- **Anzahl Reviews:** _324_

## 4. Kontakt & Hours ⭐

- **Telefon:** _+49 30 1234 5678_
- **E-Mail:** _info@barist.de_
- **Adresse:** _Rosenthaler Str. 40, 10178 Berlin_
- **Öffnungszeiten:**
  ```
  Mo–Do  17:00–23:00
  Fr–Sa  17:00–24:00
  So     12:00–22:00
  ```

## 5. Assets

### Hero
- [ ] **Video** liegt vor unter: _./input/hero.mp4_ → Mode: `ristorante` (Video-Hero)
- [ ] **Frame-Sequence / Video für Scrub** unter: _…_ → Mode: `cinematic-scrub`
- [ ] **3D-Modell (.glb)** unter: _./input/model.glb_ → Mode: `3d-immersive`
- [ ] **Nichts vorhanden** — Agent soll Platzhalter verwenden

### Fotos für Services/Bento (4 Stück ideal)
- _./input/img/cucina.jpg_
- _./input/img/forno.jpg_
- _./input/img/cantina.jpg_
- _./input/img/eventi.jpg_

### Logo
- [ ] SVG liegt unter: _./input/logo.svg_
- [ ] JPG/PNG liegt unter: _…_
- [ ] **Nichts** → Agent generiert simples Wordmark-SVG

## 6. Copy & Tonalität

- **Tagline (ein Satz):** _„Autentica cucina italiana — seit 1998."_
- **Du oder Sie?** _Du_
- **Wichtige Stichwörter, die vorkommen müssen:**
  _Holzofen, Handgemachte Pasta, Nonna, 380 °C, Apulien, Chianti_
- **Wörter, die vermieden werden sollen:**
  _„Mamma Mia", „La Dolce Vita" als Klischee_

## 7. Services / Angebote (3–4 Bento-Cards)

1. **Cucina** — Handgemachte Pasta, täglich frisch aus der Küche. Orecchiette, Tagliatelle, Ravioli.
2. **Forno a legna** — Holzofen-Pizza auf 380 °C. Neapolitanische Teigführung 72 h.
3. **Cantina** — 80+ Weine aus 12 Regionen, Schwerpunkt Marken + Toskana.
4. **Eventi** — Private Dining bis 40 Personen. Hochzeiten, Firmenfeiern, Weinproben.

## 8. „Warum wir?" — 3 Gründe

1. _Die Nonna kocht noch selbst. 45 Jahre Erfahrung, Rezepte aus Apulien._
2. _Mehl direkt aus der Mühle in Altamura — BIO Grano Duro, wöchentliche Lieferung._
3. _Olivenöl kalt gepresst, Fattoria Umbria, direkt vom Erzeuger._

## 9. Call-to-Actions

- **Primary CTA:** _„Tisch reservieren"_ → Ziel: _https://booking.opentable.de/...  oder  #kontakt_
- **Secondary CTA:** _„Karte ansehen"_ → Ziel: _/menu.pdf  oder  #menu_

## 10. Technisches (optional)

- **Domain:** _www.barist.de_
- **Hosting:** _Vercel / Cloudflare Pages / Netlify_
- **Analytics:** _Plausible / Umami / keine_
- **Reservations-Tool:** _OpenTable / Resmio / quandoo / keine_
- **Datenschutz:** _Impressum + Datenschutz-Seite, DSGVO-konform_

## 11. Sonstiges / Free-Form

> _Hier kannst du Geschichten, Besonderheiten, Branding-Memos, Konkurrenzlinks einfügen._

---

## Wie der Agent damit arbeitet

1. Liest `inputs/COMPANY-BRIEF.md` (nach Ausfüllen dieses Templates).
2. Wählt Mode (siehe `modes/README.md`).
3. Aktiviert Skills via frontmatter-Triggers.
4. Kopiert `template/` in `site/` (oder nutzt direkt `template/`).
5. Füllt `src/lib/content.ts` mit den Werten aus dem Brief.
6. Verarbeitet Assets (Video encoden, Frames extrahieren, 3D optimieren).
7. Ingestet Google-Place → `GOOGLE_PLACE` Object.
8. Startet `npm install && npm run dev` und meldet Preview-URL.

**Erwartung:** Nach 1–3 Prompts läuft ein Staging-fähiger Build.
