import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleRatingBadge } from "@/components/GoogleRating";
import { BRAND, NAV_ITEMS, CTA } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <>
      <motion.header
        data-scrolled={scrolled}
        animate={{ top: scrolled ? 8 : 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-1/2 -translate-x-1/2 z-50 w-[min(1180px,calc(100vw-24px))]"
      >
        <div className="nav-shell rounded-full px-2 py-2 flex flex-wrap items-center justify-between gap-2 md:gap-3">
          <a href="#top" className="flex items-center gap-2 pl-2 shrink-0">
            <img src={BRAND.logoPath} alt={BRAND.name} className="h-7 w-auto opacity-90" />
            <span className="font-display text-lg tracking-tight text-foreground">{BRAND.name}</span>
          </a>
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center min-w-0">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-2.5 py-2 text-xs xl:text-sm text-foreground/75 hover:text-primary transition-colors font-body whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <GoogleRatingBadge className="hidden xl:inline-flex" />
            <Button variant="heroSolid" size="sm" className="rounded-full px-4 py-1.5 text-sm" asChild>
              <a href={CTA.href} target="_blank" rel="noopener noreferrer">
                {CTA.label} <ArrowUpRight className="ml-1 size-4" />
              </a>
            </Button>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <GoogleRatingBadge />
            <button
              onClick={() => setOpen(true)}
              className="size-9 rounded-full border border-primary/25 bg-background/80 grid place-items-center"
              aria-label="Menü öffnen"
            >
              <Menu className="size-4" />
            </button>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="hidden md:grid lg:hidden size-9 rounded-full border border-primary/25 bg-background/80 place-items-center"
            aria-label="Menü öffnen"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </motion.header>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-primary/15">
            <span className="font-display text-xl tracking-tight">{BRAND.name}</span>
            <button
              onClick={() => setOpen(false)}
              className="size-10 rounded-full border border-primary/25 grid place-items-center"
              aria-label="Menü schließen"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-0 px-6 mt-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display uppercase text-2xl py-4 border-b border-primary/10 text-foreground/90 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto p-6 space-y-4">
            <GoogleRatingBadge className="w-full justify-center py-2" />
            <Button variant="hero" asChild className="w-full">
              <a href={CTA.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                {CTA.label} <ArrowUpRight className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
