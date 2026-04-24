import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GOOGLE_PLACE } from "@/lib/content";

function Stars({ rating, size }: { rating: number; size: "sm" | "md" }) {
  const s = size === "sm" ? "size-3.5" : "size-4";
  const nodes: ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    const fill = Math.min(1, Math.max(0, rating - (i - 1)));
    nodes.push(
      <span key={i} className="relative inline-flex shrink-0">
        <Star className={cn(s, "text-foreground/15")} strokeWidth={1.2} />
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fill * 100}%` }}
          aria-hidden
        >
          <Star className={cn(s, "fill-primary text-primary")} strokeWidth={1.2} />
        </span>
      </span>
    );
  }
  return <span className="flex items-center gap-0.5">{nodes}</span>;
}

export function GoogleRatingBadge({ className }: { className?: string }) {
  const r = GOOGLE_PLACE.rating.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return (
    <a
      href={GOOGLE_PLACE.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "nav-shell inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-foreground/90 hover:text-foreground transition-colors",
        className
      )}
    >
      <Stars rating={GOOGLE_PLACE.rating} size="sm" />
      <span className="font-body font-medium tabular-nums">{r}</span>
      <span className="text-foreground/45 text-xs hidden sm:inline">
        ({GOOGLE_PLACE.reviewCount.toLocaleString("de-DE")} Google)
      </span>
    </a>
  );
}

export function GoogleRatingHero() {
  const r = GOOGLE_PLACE.rating.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return (
    <a
      href={GOOGLE_PLACE.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="ristorante-card inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl px-5 py-4 max-w-md hover:border-primary/40 transition-colors"
    >
      <div className="flex items-center gap-2">
        <Stars rating={GOOGLE_PLACE.rating} size="md" />
        <span className="font-display text-3xl md:text-4xl text-primary tabular-nums">{r}</span>
      </div>
      <div className="text-center sm:text-left">
        <p className="font-ristorante text-lg text-foreground/90 italic">Google Bewertungen</p>
        <p className="font-body text-xs text-foreground/55">
          {GOOGLE_PLACE.reviewCount.toLocaleString("de-DE")} Bewertungen · {GOOGLE_PLACE.label}
        </p>
      </div>
    </a>
  );
}
