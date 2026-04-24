import { BlurText } from "@/components/BlurText";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS, FAQ_HEADLINE, FAQ_SUB, CTA, UI } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="relative py-28 md:py-40 border-t border-primary/10">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-16">
        <div className="md:sticky md:top-24 md:self-start flex flex-col gap-5 items-start">
          <span className="pill-label">FAQ</span>
          <BlurText
            text={FAQ_HEADLINE}
            className="font-display uppercase text-5xl md:text-6xl leading-[0.9] tracking-tight mt-2"
          />
          <p className="font-body text-foreground/65 max-w-[36ch] leading-relaxed">
            {FAQ_SUB}
          </p>
          <Button variant="heroGlass" className="mt-3" asChild>
            <a href={CTA.href} target="_blank" rel="noopener noreferrer">
              {UI.faqCta}
            </a>
          </Button>
        </div>

        <Accordion type="single" collapsible className="ristorante-card rounded-2xl px-4 md:px-6">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-primary/15">
              <AccordionTrigger className="font-display uppercase text-lg md:text-xl tracking-tight py-6 hover:no-underline data-[state=open]:text-primary">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-foreground/70 text-[15px] leading-relaxed pb-6 max-w-[60ch]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
