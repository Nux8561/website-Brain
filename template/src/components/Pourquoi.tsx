import { motion } from "motion/react";
import { BlurText } from "@/components/BlurText";
import { iconMap } from "@/lib/icons";
import { REASONS, REASONS_HEADLINE, REASONS_SUB, UI } from "@/lib/content";

export function Pourquoi() {
  return (
    <section id="why" className="relative py-28 md:py-40 border-t border-primary/10">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="pill-label">{UI.whyKicker}</span>
          <BlurText
            text={REASONS_HEADLINE}
            className="font-display uppercase text-4xl md:text-6xl leading-[0.9] max-w-[18ch] mx-auto tracking-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-foreground/65 max-w-xl"
          >
            {REASONS_SUB}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {REASONS.map((r) => {
            const Icon = iconMap[r.icon];
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="ristorante-card rounded-2xl p-7 flex flex-col gap-5 min-h-[260px]"
              >
                <div className="rounded-full w-11 h-11 flex items-center justify-center bg-primary/15 border border-primary/25 text-primary">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-display uppercase text-xl tracking-tight">{r.title}</h3>
                <p className="font-body text-sm text-foreground/70 leading-relaxed">{r.body}</p>
                <div className="mt-auto h-px w-10 bg-gradient-to-r from-primary to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
