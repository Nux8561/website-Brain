import { motion } from "motion/react";
import { MapPin, ExternalLink } from "lucide-react";
import { BlurText } from "@/components/BlurText";
import { GOOGLE_PLACE, CONTACT, UI } from "@/lib/content";

export function FindUsMap() {
  return (
    <section id="lage" className="relative py-24 md:py-32 border-t border-primary/15">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <span className="pill-label mb-4 inline-block">{UI.mapKicker}</span>
            <BlurText
              text={UI.mapHeadline}
              className="font-display uppercase text-4xl md:text-5xl leading-[0.95] tracking-tight max-w-[16ch]"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-5 font-body text-foreground/70 max-w-md leading-relaxed"
            >
              {GOOGLE_PLACE.description}
            </motion.p>
            <div className="mt-8 flex flex-col gap-3 font-body text-foreground/85">
              <p className="flex items-start gap-2">
                <MapPin className="size-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <span>
                  {CONTACT.street}
                  <br />
                  {CONTACT.zip}
                </span>
              </p>
              <a
                href={GOOGLE_PLACE.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/85 text-sm font-medium w-fit"
              >
                Route in Google Maps <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="ristorante-card rounded-2xl overflow-hidden p-1 md:p-2 shadow-lg shadow-black/30"
          >
            <iframe
              title="Barist auf der Karte"
              src={GOOGLE_PLACE.embedUrl}
              className="w-full h-[min(52vh,420px)] rounded-xl border-0 bg-muted"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
