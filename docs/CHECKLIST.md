# Pre-Ship Checklist

Vor jedem Release. Anti-Slop-Regeln gelten für **beide** Modi.

## Build (immer)

- [ ] `npm run dev` startet ohne Error.
- [ ] `npm run build` ohne TypeScript- oder Vite-Fehler.
- [ ] `npm run preview` entspricht dev.

---

## Default-Modus — Video-Hero + Google

### Hero / Video

- [ ] `public/hero.mp4` vorhanden (H.264, `yuv420p`) — **Safari/iOS**.
- [ ] `public/hero.webm` vorhanden; im Markup **MP4-`<source>` vor WebM**.
- [ ] `hero-poster.webp` gesetzt; Preload im `index.html` für Poster sinnvoll.
- [ ] `HERO_VIDEO` in `content.ts` stimmt mit Dateinamen überein.
- [ ] Optional: `VITE_HERO_VIDEO_URL` getestet oder leer gelassen.

### Google / Karte

- [ ] `GOOGLE_PLACE.rating` / `reviewCount` plausibel; Links öffnen korrekt.
- [ ] `embedUrl` lädt Karte im iframe (`FindUsMap`).
- [ ] Keine falschen Behauptungen gegenüber Google-Branding (neutral formulieren, wenn unsicher).

### Sections

- [ ] Navbar: Scroll-Verhalten und Mobile-Menü ok.
- [ ] ServicesBento: 6 Karten auf Desktop-Layout.
- [ ] Pourquoi / Process / Testimonials / FAQ / CTA wie spezifiziert.

### Anti-Slop (Default)

- [ ] Keine Emoji in UI-Copy.
- [ ] Keine default violet/purple Gradients.
- [ ] Kein `<video>`-Only-WebM ohne MP4 in Produktion.
- [ ] Keine Lorem-Platzhalter.
- [ ] Nur lucide-react Icons.
- [ ] Keine `console.log`, keine toten Imports.

### Responsive & A11y

- [ ] 375px: kein horizontaler Scroll.
- [ ] Fokus-Ringe auf interaktiven Elementen.
- [ ] Sinnvolle `aria-` / `sr-only` wo nötig.

### Performance

- [ ] Hero-Videos nicht unnötig riesig (Bitrate/ Auflösung).
- [ ] Lighthouse-Ziel sinnvoll (z. B. Desktop ≥ 85), LCP beobachten.

---

## Cinematic-Scrub-Modus — Canvas + Frames

*Nur relevant, wenn der Hero bewusst auf `ScrubSequence` + `public/frames/` umgestellt ist.*

- [ ] Erster Frame schnell sichtbar; Scroll scrubbt flüssig.
- [ ] Keine 404 auf `frame_*` im Network.
- [ ] Preload für erstes Frame in `index.html`.
- [ ] `public/frames` Gesamtgröße im Hosting-Limit (z. B. Vercel Hobby).

---

## Konsole

- [ ] Keine React-Warnungen.
- [ ] Keine unhandled Promise Rejections.
- [ ] Keine 404 auf kritischen Assets.
