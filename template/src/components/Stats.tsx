import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { BlurText } from "@/components/BlurText";
import { OPENING_ROWS, OPENING_NOTE, UI } from "@/lib/content";

export function Stats() {
  return (
    <section id="hours" className="relative py-24 md:py-32 overflow-hidden border-t border-primary/15 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,hsl(38_25%_12%/0.35),transparent_55%)]">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] relative z-10">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <span className="pill-label">{UI.statsKicker}</span>
          <BlurText
            text={UI.statsHeadline}
            className="font-display uppercase text-4xl md:text-6xl leading-[0.9] tracking-tight max-w-[20ch]"
          />
        </div>

        <div className="ristorante-card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8 text-primary">
            <Clock className="size-6 shrink-0" strokeWidth={1.5} />
            <span className="font-ristorante text-2xl md:text-3xl italic text-foreground/90">
              Küche & Service
            </span>
          </div>
          <ul className="space-y-5 font-body">
            {OPENING_ROWS.map((row) => (
              <motion.li
                key={row.days}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-primary/10 pb-5 last:border-0 last:pb-0"
              >
                <span className="text-foreground/80">{row.days}</span>
                <span className="font-medium text-primary tabular-nums">{row.hours}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-foreground/55 leading-relaxed">{OPENING_NOTE}</p>
        </div>
      </div>
    </section>
  );
}
