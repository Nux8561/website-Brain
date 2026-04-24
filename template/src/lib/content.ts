/**
 * Zentrale Inhalte — Referenz: Barist (de-DE). Für neue Projekte:
 * WEBSITE-PLANE.md + GOOGLE.url.txt im Projektroot, dann docs/GOOGLE-INGEST.md (Ordner „website Brain“).
 */

export const LANG = "de-DE";
export const IS_FR = LANG.startsWith("fr");

/** Leer lassen oder volle Video-URL (WebM/MP4). Überschreibt lokales `public/hero.webm`. */
export const HERO_VIDEO_REMOTE = "";

export const UI = {
  trustedBy: "Aus der Region & aus Italien",
  servicesKicker: "Speisekarte & Stimmung",
  whyKicker: "La dolce vita",
  processKicker: "Ihr Abend bei uns",
  testimonialsKicker: "Gästestimmen",
  statsKicker: "Öffnungszeiten",
  statsHeadline: "Wann wir für Sie kochen",
  faqCta: "Tisch reservieren",
  mapKicker: "Anfahrt",
  mapHeadline: "Mitten in Berlin-Mitte",
};

export const BRAND = {
  name: "Barist",
  tagline: "Ristorante · Hackescher Markt",
  logoPath: "/logo.svg",
};

/** Google Maps / Bewertungen — Zahlen bei Bedarf anpassen, wenn sich der Place aktualisiert. */
export const GOOGLE_PLACE = {
  rating: 4.4,
  reviewCount: 2847,
  label: "Restaurant am Hackescher Markt",
  description:
    "Zwischen Museumsinsel, Hackeschen Höfen und Oranienburger Straße — ideal für einen Abend mit Aperitivo, Pasta oder Pizza aus dem Holzofen.",
  /** Öffnet die Google-Suche zum Lokal (funktioniert ohne Place-ID). */
  reviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Barist+Am+Zwirngraben+11+10178+Berlin&hl=de",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Am+Zwirngraben+11,+10178+Berlin&hl=de",
  embedUrl:
    "https://maps.google.com/maps?q=Barist+Restaurant+Am+Zwirngraben+11,+10178+Berlin,+Deutschland&hl=de&z=16&ie=UTF8&iwloc=B&output=embed",
};

export const RESERVE_URL =
  "https://www.quandoo.de/checkout-widget/widget?agentId=2&merchantId=39204&primaryColor=d8b892&theme=dark&widgetType=calendar&utm_source=barist-website&utm_medium=widget-link-home";

export const MENU_URL = "https://barist.de/speisekarte/";

export const HERO_VIDEO: {
  srcWebm: string;
  srcMp4?: string;
  poster?: string;
} = {
  srcWebm: "/hero.webm",
  /** H.264 für Safari / iOS (WebM allein reicht dort oft nicht). */
  srcMp4: "/hero.mp4",
  poster: "/hero-poster.webp",
};

export const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Speisekarte", href: "#services" },
  { label: "Stimmung", href: "#why" },
  { label: "Ablauf", href: "#process" },
  { label: "Zeiten", href: "#hours" },
  { label: "Gäste", href: "#testimonials" },
  { label: "Anfahrt", href: "#lage" },
  { label: "Fragen", href: "#faq" },
];

export const CTA = {
  label: "Tisch reservieren",
  href: RESERVE_URL,
};

export const HERO = {
  badge: "Hackescher Markt · Berlin-Mitte",
  headline: "Italienischer Genuss",
  headlineLine2: "im Herzen Berlins",
  sub:
    "Holzofen, gedämpftes Licht, der Duft von Kräutern und frischem Teig — hier trifft italienische Küche auf die Seele der Stadt. Kommen Sie vorbei: ein Glas Wein, ein Teller Pasta, und der Abend gehört Ihnen.",
  primary: "Tisch reservieren",
  secondary: "Zur Speisekarte",
};

export const PARTNERS: string[] = [
  "Pizza al forno",
  "Pasta fatta in casa",
  "Vini italiani",
  "Cocktail & Aperitivo",
];

export type IconName =
  | "Flame"
  | "UtensilsCrossed"
  | "Wine"
  | "MapPin"
  | "Clock"
  | "Heart";

export const SERVICES_HEADLINE = "Was Sie bei uns erwarten dürfen";

export const SERVICES: {
  icon: IconName;
  title: string;
  body: string;
  image: string;
}[] = [
  {
    icon: "Flame",
    title: "Holzofen & Pizza",
    body: "Knuspriger Boden, sanftes Raucharoma — so, wie Pizza in Neapel gemeint ist.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=75",
  },
  {
    icon: "UtensilsCrossed",
    title: "Pasta & Antipasti",
    body: "Frische Saucen, bestes Olivenöl, ehrliche Portionen zum Teilen oder für sich allein.",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=75",
  },
  {
    icon: "Wine",
    title: "Wein & Bar",
    body: "Vom Hauswein bis zur Flasche Barolo — und dazu ein Negroni, der sitzt.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=75",
  },
  {
    icon: "MapPin",
    title: "Die Lage",
    body: "Zwischen Hackeschen Höfen und Museumsinsel — perfekt vor dem Theater oder der Galerie.",
    image:
      "https://images.unsplash.com/photo-1560969184-10fb871307e9?auto=format&fit=crop&w=900&q=75",
  },
  {
    icon: "Clock",
    title: "Service",
    body: "Herzlich, aufmerksam, mit Berliner Tempo — auch wenn alle Tische besetzt sind.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=75",
  },
  {
    icon: "Heart",
    title: "Ambiente",
    body: "Kerzenlicht, warme Wände, leise Musik — ein Ort für Dates, Familie und alte Freunde.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=75",
  },
];

export const REASONS_HEADLINE = "Warum Gäste wiederkommen";

export const REASONS_SUB = "Kurz gesagt: ehrliches Essen, echte Atmosphäre, mitten im schönsten Berlin.";

export const REASONS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "Heart",
    title: "Gastfreundschaft",
    body: "Bei uns ist jeder willkommen — ob Berliner Stammgast oder Besuch aus der Ferne.",
  },
  {
    icon: "Clock",
    title: "Berliner Puls",
    body: "Draußen die Stadt, drinnen ein Innehalten — und trotzdem kein steifer Salon.",
  },
  {
    icon: "Wine",
    title: "Zum Anstoßen",
    body: "Aperitivo an der Bar, Wein zum Gang, Digestif zum Ausklang — wie in Italien üblich.",
  },
  {
    icon: "Flame",
    title: "Aus dem Ofen",
    body: "Was aus dem Feuer kommt, schmeckt man — und riecht man schon beim Reinkommen.",
  },
];

export const PROCESS_HEADLINE = "So läuft Ihr Abend";

export const PROCESS_STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "1",
    title: "Tisch sichern",
    body: "Online reservieren oder anrufen — abends besonders empfohlen.",
  },
  {
    n: "2",
    title: "Ankommen & anstoßen",
    body: "Wir bringen Sie zu Ihrem Platz, Wasser und Brot stehen bereit, der Aperitivo wartet.",
  },
  {
    n: "3",
    title: "Genießen",
    body: "Von der Vorspeise bis zum Dolce — in Ihrem Tempo, mit unseren Empfehlungen.",
  },
  {
    n: "4",
    title: "Noch ein Glas?",
    body: "Espresso, Grappa oder ein letzter Spritz — der Abend endet, wenn Sie es sagen.",
  },
];

export const OPENING_ROWS: { days: string; hours: string }[] = [
  { days: "Montag – Donnerstag", hours: "12:00 – 24:00 Uhr" },
  { days: "Freitag – Samstag", hours: "12:00 – 01:00 Uhr" },
  { days: "Sonntag", hours: "12:00 – 24:00 Uhr" },
];

export const OPENING_NOTE =
  "Küche durchgehend warm — bei schönem Wetter zusätzlich Sitzplätze draußen (je nach Saison).";

export const TESTIMONIALS_HEADLINE = "Was Google-Gäste sagen";

export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "Pizza und Pasta sind zu empfehlen. Auch die Steaks waren bisher immer super. Großer Außenbereich ist vorhanden. Der Service ist auf Zack und gibt wirklich sein Bestes.",
    name: "Thorsten Dreistein",
    role: "Google Bewertung",
  },
  {
    quote:
      "Salat und Pizza top. Preis-Leistung ist angemessen für die Gegend. Gerne wieder. Uns allen hat es super gut gefallen, das Essen war lecker, ebenso die Getränke.",
    name: "Carolyn Silverpine",
    role: "Google Bewertung",
  },
  {
    quote:
      "Sehr nette Bedienung, tolles Essen und super Cocktails. Die Preise hier sind sehr akzeptabel, da man hier auch was für sein Geld bekommt. Ich kann das Barist nur empfehlen.",
    name: "Marlies Dohr",
    role: "Google Bewertung",
  },
];

export const FAQ_HEADLINE = "Häufige Fragen";

export const FAQ_SUB = "Wenn Ihre Frage nicht dabei ist, rufen Sie uns an — wir beraten Sie gern.";

export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Brauche ich eine Reservierung?",
    a: "Mittags oft spontan möglich. Abends und am Wochenende empfehlen wir eine Reservierung — am schnellsten über den Link auf dieser Seite.",
  },
  {
    q: "Wo liegt das Restaurant?",
    a: "Am Zwirngraben 11–12, 10178 Berlin, direkt am Hackescher Markt. Routenplaner finden Sie weiter unten auf der Karte.",
  },
  {
    q: "Gibt es die Speisekarte online?",
    a: "Ja — unter „Zur Speisekarte“ öffnet sich unsere aktuelle Karte.",
  },
  {
    q: "Ist das Restaurant für Feiern geeignet?",
    a: "Für kleinere Runden und besondere Abende sehr gut — sprechen Sie uns für größere Gruppen am besten direkt an.",
  },
  {
    q: "Telefonisch erreichbar?",
    a: "Unter +49 (0)30 24722613 — wir helfen bei Tischwünschen und Fragen zum Lokal.",
  },
];

export const CTA_SECTION = {
  headline: "Buon appetito in Berlin",
  sub: "Wir freuen uns darauf, Sie mit italienischer Herzlichkeit zu bewirten — buchen Sie Ihren Tisch und kommen Sie vorbei.",
  secondary: "Speisekarte öffnen",
};

export const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: "Speisekarte", href: MENU_URL },
  { label: "Reservierung", href: RESERVE_URL },
  { label: "Google & Karte", href: "#lage" },
  { label: "Kontakt", href: "#kontakt" },
];

export const COPYRIGHT = `© ${new Date().getFullYear()} ${BRAND.name} · Am Zwirngraben 11–12, Berlin`;

export const CONTACT = {
  street: "Am Zwirngraben 11–12",
  zip: "10178 Berlin",
  phone: "+49 (0)30 24722613",
  phoneHref: "tel:+493024722613",
};
