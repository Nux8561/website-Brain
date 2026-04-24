import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurText } from "@/components/BlurText";
import { iconMap } from "@/lib/icons";
import { SERVICES, SERVICES_HEADLINE, UI } from "@/lib/content";

const cardSpans = [
  "md:row-span-2 md:col-span-1 p-8 min-h-[480px]",
  "md:col-span-1 p-6 min-h-[228px]",
  "md:col-span-1 p-6 min-h-[228px]",
  "md:col-span-2 p-7 min-h-[228px]",
  "md:col-span-1 p-6 min-h-[228px]",
  "md:col-span-3 p-7 min-h-[200px]",
];

export function ServicesBento() {
  return (
    <section
      id="services"
      className="relative py-28 md:py-40 border-t border-primary/10 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,hsl(38_22%_14%/0.35),transparent_55%)]"
    >
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex flex-col items-start gap-5 mb-16">
          <span className="pill-label">{UI.servicesKicker}</span>
          <BlurText
            text={SERVICES_HEADLINE}
            className="font-display uppercase text-4xl md:text-6xl leading-[0.9] tracking-tight max-w-[20ch]"
          />
          <p className="font-ristorante text-lg md:text-xl italic text-primary/90 max-w-xl">
            Holzofen, frische Zutaten, Wein aus Italien — so schmeckt der Abend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-min">
          {SERVICES.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.div
                key={s.title}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className={`ristorante-card rounded-2xl relative overflow-hidden group ${cardSpans[i] ?? "md:col-span-1 p-6"}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${s.image})` }}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/55 to-black/25" />
                <div className="relative z-10 flex flex-col h-full min-h-0">
                  <div className="rounded-full w-11 h-11 flex items-center justify-center mb-5 bg-black/35 border border-primary/30 text-primary">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display uppercase text-2xl md:text-3xl leading-[0.95] tracking-tight mb-3 max-w-[18ch] text-foreground">
                    {s.title}
                  </h3>
                  <p className="font-body text-sm text-foreground/80 max-w-[38ch] leading-relaxed">
                    {s.body}
                  </p>
                  <ArrowUpRight className="absolute top-6 right-6 size-5 text-primary/70 group-hover:text-primary transition-colors z-20" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
