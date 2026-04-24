# Google Maps / Places — Daten ins Template übernehmen

Ziel: Aus der **öffentlichen Google-Maps-Seite** (Browser) die Felder füllen, die `src/lib/content.ts` und die Komponenten erwarten — **ohne** Places API Key.

## 1. Quelle

- Öffne die URL aus **`GOOGLE.url.txt`** (oder die vom Kunden gelieferte Maps-URL).
- Notiere alles, was **sichtbar** ist: Name, Adresse, Sterne, Anzahl Bewertungen, Kurzbeschreibung/Kategorien.

> Hinweis: Exakte API-Daten ohne Key gibt es nicht; für Marketing-Landing reichen die sichtbaren Werte. Bei Abweichungen später: Zahlen manuell anpassen.

## 2. Zielobjekt `GOOGLE_PLACE` in `content.ts`

```ts
export const GOOGLE_PLACE = {
  rating: 4.4,           // sichtbare Sterne (Zahl)
  reviewCount: 2847,    // „X Bewertungen“ wenn angezeigt
  label: "…",          // kurzer Ort-Titel unter dem Rating
  description: "…",    // 1–3 Sätze Lage / Stimmung (eigen Text, inspiriert von Maps)
  reviewsUrl: "https://…",   // Link „Alle Bewertungen“ / Google-Suche zum Lokal
  directionsUrl: "https://…", // Google Maps „Route“-Deep-Link
  embedUrl: "https://…",      // Karten-Embed (siehe unten)
};
```

### `reviewsUrl` (einfacher Weg)

Google-Suche mit Lokalname + Straße + PLZ + Stadt, Parameter `hl=` zur Sprache:

`https://www.google.com/maps/search/?api=1&query=NAME+STRASSE+PLZ+STADT&hl=de`

### `directionsUrl`

`https://www.google.com/maps/dir/?api=1&destination=ADRESSE_URLENCODED&hl=de`

### `embedUrl`

In Google Maps: **Teilen → Karte einbetten** (wenn verfügbar) und den `src` des iframe kopieren.

Alternative (ohne Embed-Dialog): klassisches Query-Embed, z. B.

`https://maps.google.com/maps?q=ENCODED_QUERY&hl=de&z=16&output=embed`

`FindUsMap.tsx` nutzt `GOOGLE_PLACE.embedUrl` als iframe-`src`.

## 3. Weitere `content.ts`-Felder aus Maps

- **`BRAND.name`**, **`BRAND.tagline`**: aus Profil / WEBSITE-PLANE.
- **`HERO.badge`**: oft Stadtteil + Stadt.
- **`UI.mapHeadline`**, **`UI.mapKicker`**: Anfahrt-Sektion.
- Adresse im Fließtext: z. B. in `GOOGLE_PLACE.description` oder eigene Konstante, falls du sie separat anzeigst.

## 4. `index.html`

- `<title>` und `<meta name="description">` an Marke + Lage anpassen.
- `lang`-Attribut am `<html>` an `LANG` in `content.ts` angleichen.

## 5. Rechtliches

- Google-Logo und „Google“-Bewertungstext: nur nutzen, wenn es dem **geltenden Google-Branding** entspricht; bei Unsicherheit neutrale Formulierung („Bewertungen auf Google Maps“) und verlinkte Quelle.
