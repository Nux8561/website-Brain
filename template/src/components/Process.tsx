import { motion } from "motion/react";
import { BlurText } from "@/components/BlurText";
import { PROCESS_STEPS, PROCESS_HEADLINE, UI } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="relative py-28 md:py-40 border-t border-primary/10 bg-[linear-gradient(180deg,transparent,hsl(28_18%_7%/0.5))]">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex flex-col items-start gap-5 mb-16">
          <span className="pill-label">{UI.processKicker}</span>
          <BlurText
            text={PROCESS_HEADLINE}
            className="font-display uppercase text-4xl md:text-6xl leading-[0.9] tracking-tight max-w-[20ch]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="relative px-6 md:px-8 py-10 md:py-12 flex flex-col gap-4 items-start ristorante-card rounded-2xl"
            >
              <span className="font-ristorante italic text-[96px] md:text-[120px] leading-none text-primary/35 -mb-6 select-none">
                {step.n.padStart(2, "0")}
              </span>
              <h3 className="font-display uppercase text-2xl md:text-3xl tracking-tight">
                {step.title}
              </h3>
              <p className="font-body text-sm text-foreground/70 leading-relaxed max-w-[30ch]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
