---
name: google-maps-ingest
version: 1.0
triggers:
  - "google maps"
  - "google bewertungen"
  - "google rating"
  - "place id"
  - "embed map"
  - "anfahrt"
  - "findusmap"
depends_on: []
description: >
  Google-Maps-URL oder Place-ID in strukturiertes Content-Object umwandeln.
  Rating, Review-Count, Öffnungszeiten, Adresse, Embed-URL. Pflicht-Section
  für jedes Lokal-Business. Frontend-Komponenten: GoogleRatingBadge, FindUsMap.
---

# Google Maps Ingest — Skill

## Wann aktivieren

- **Immer** bei Local-Businesses (Restaurants, Shops, Praxen, Studios).
- Der Kunde hat einen **Google-Business-Eintrag**.
- SEO-relevant: Lokales Schema.org Markup.

## Input → Output

**Input vom Kunden** (irgendeine dieser Formen):

- Google-Maps-URL: `https://maps.google.com/?cid=12345678`
- Geteilte URL: `https://maps.app.goo.gl/Abc123`
- Place-ID: `ChIJN1t_tDeuEmsRUsoyG83frY4`
- Business-Name + Adresse: „Barist Ristorante, Hackescher Markt, Berlin"

**Output** — `GOOGLE_PLACE` Object in `content.ts`:

```ts
export const GOOGLE_PLACE = {
  name: "Barist — Ristorante",
  placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
  rating: 4.8,
  reviewCount: 324,
  address: "Rosenthaler Str. 40, 10178 Berlin",
  phone: "+49 30 1234 5678",
  hours: {
    mon: "17:00–23:00",
    tue: "17:00–23:00",
    wed: "17:00–23:00",
    thu: "17:00–23:00",
    fri: "17:00–24:00",
    sat: "17:00–24:00",
    sun: "12:00–22:00",
  },
  coords: { lat: 52.5246, lng: 13.4017 },
  embedUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=place_id:ChIJ...",
  mapsUrl: "https://maps.app.goo.gl/Abc123",
  reviewsUrl: "https://search.google.com/local/reviews?placeid=ChIJ...",
} as const;
```

## Ingest-Varianten

### Variante 1 — Mit Google Places API (ideal)

```ts
// scripts/fetch-place.mjs
const KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_ID = process.argv[2];

const fields = "name,rating,user_ratings_total,formatted_address," +
               "formatted_phone_number,opening_hours,geometry,url";

const res = await fetch(
  `https://maps.googleapis.com/maps/api/place/details/json` +
  `?place_id=${PLACE_ID}&fields=${fields}&language=de&key=${KEY}`
);
const { result } = await res.json();
console.log(JSON.stringify(mapToContent(result), null, 2));
```

Lauf: `node scripts/fetch-place.mjs ChIJN1t_tDeuEmsRUsoyG83frY4`

### Variante 2 — Manuell aus URL extrahieren

Wenn API-Key nicht vorhanden:

1. URL `maps.app.goo.gl/Abc123` im Browser öffnen.
2. Rechts im Panel: Name, Rating, Reviews, Adresse, Öffnungszeiten abschreiben.
3. Place-ID aus Developer-Tool: `window.APP_INITIALIZATION_STATE` oder via [Place-ID-Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).
4. In `content.ts` eintragen.

### Variante 3 — Scraping (notlast)

```bash
# Nur für One-Shot bei kleinen Lokalen mit <10 Reviews
npx playwright codegen https://maps.google.com/?q=PLACE_ID
```

## Frontend-Komponenten

### `<GoogleRatingBadge>`

```tsx
// src/components/GoogleRatingBadge.tsx
import { Star } from "lucide-react";
import { GOOGLE_PLACE } from "@/lib/content";

export function GoogleRatingBadge({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={GOOGLE_PLACE.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full
                 border border-ochre/30 bg-ink/40 backdrop-blur
                 px-3 py-1.5 text-sm font-medium text-cream
                 hover:bg-ink/60 transition"
      aria-label={`${GOOGLE_PLACE.rating} Sterne auf Google, ${GOOGLE_PLACE.reviewCount} Bewertungen`}
    >
      <Star className="h-3.5 w-3.5 fill-ochre text-ochre" />
      <span className="tabular-nums">{GOOGLE_PLACE.rating}</span>
      {!compact && (
        <>
          <span className="text-muted">·</span>
          <span className="text-muted">{GOOGLE_PLACE.reviewCount} Reviews</span>
        </>
      )}
    </a>
  );
}
```

### `<FindUsMap>`

```tsx
// src/components/FindUsMap.tsx
import { MapPin, Phone, Clock } from "lucide-react";
import { GOOGLE_PLACE } from "@/lib/content";

export function FindUsMap() {
  return (
    <section id="kontakt" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <span className="pill-label">Come trovarci</span>
        <h2 className="font-display text-4xl md:text-5xl mt-3">
          So findest du uns.
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <InfoRow icon={<MapPin />} label="Adresse">
              {GOOGLE_PLACE.address}
            </InfoRow>
            <InfoRow icon={<Phone />} label="Telefon">
              <a href={`tel:${GOOGLE_PLACE.phone}`}>{GOOGLE_PLACE.phone}</a>
            </InfoRow>
            <InfoRow icon={<Clock />} label="Öffnungszeiten">
              <HoursList hours={GOOGLE_PLACE.hours} />
            </InfoRow>
            <a
              href={GOOGLE_PLACE.mapsUrl}
              target="_blank"
              className="inline-flex text-ochre underline underline-offset-4"
            >
              In Google Maps öffnen →
            </a>
          </div>

          <div className="ristorante-card aspect-video md:aspect-auto">
            <iframe
              src={GOOGLE_PLACE.embedUrl}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps — Standort"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Schema.org Markup (SEO)

```tsx
// In index.html oder als React-Helmet-Komponente:
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: GOOGLE_PLACE.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: GOOGLE_PLACE.address,
  },
  telephone: GOOGLE_PLACE.phone,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: GOOGLE_PLACE.rating,
    reviewCount: GOOGLE_PLACE.reviewCount,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GOOGLE_PLACE.coords.lat,
    longitude: GOOGLE_PLACE.coords.lng,
  },
  openingHoursSpecification: [
    // ...aus GOOGLE_PLACE.hours mappen
  ],
})}
</script>
```

## API-Key-Handling

```env
# .env.local (niemals committen)
VITE_GOOGLE_MAPS_EMBED_KEY=AIza…
```

```ts
const embedUrl = `https://www.google.com/maps/embed/v1/place?` +
  `key=${import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY}&q=place_id:${GOOGLE_PLACE.placeId}`;
```

**Restrictions in Google Cloud Console:**
- HTTP Referrer: `https://deinedomain.de/*`
- API: nur Maps Embed API aktivieren.

## Review-Integration im Testimonials-Section

Die besten 3 Google-Reviews manuell in `content.ts` spiegeln:

```ts
TESTIMONIALS: [
  {
    author: "Maria S.",
    text: "Die beste Carbonara außerhalb Roms. Der Holzofen ist ein Traum.",
    rating: 5,
    date: "2026-03-14",
    source: "google",
  },
  // …
]
```

(Keine Live-API-Abfrage — zu langsam, kostenpflichtig bei hohem Traffic.)

## Anti-Slop

- **Kein iframe ohne `loading="lazy"`** — Google-Maps = 1 MB+.
- **Kein API-Key im Public-Repo**. Immer `VITE_*` mit Referrer-Restriction.
- **Keine fake Reviews**. Ehrlichkeit > Marketing.
- **Kein Embed ohne Link „In Google Maps öffnen"** — User will Navigation.
