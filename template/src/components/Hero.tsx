import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurText } from "@/components/BlurText";
import { GoogleRatingHero } from "@/components/GoogleRating";
import {
  HERO,
  BRAND,
  PARTNERS,
  RESERVE_URL,
  MENU_URL,
  UI,
  HERO_VIDEO,
  HERO_VIDEO_REMOTE,
} from "@/lib/content";

function heroVideoSrc(): string {
  const env = import.meta.env.VITE_HERO_VIDEO_URL?.trim();
  if (env) return env;
  const local = HERO_VIDEO_REMOTE.trim();
  if (local) return local;
  return "";
}

function tryPlay(el: HTMLVideoElement | null) {
  if (!el) return;
  const p = el.play();
  if (p !== undefined) void p.catch(() => {});
}

export function Hero() {
  const poster = HERO_VIDEO.poster;
  const mp4 = HERO_VIDEO.srcMp4;
  const remote = heroVideoSrc();
  const isRemote = remote.length > 0;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    tryPlay(el);
    const onVis = () => {
      if (document.visibilityState === "visible") tryPlay(el);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [isRemote, remote]);

  return (
    <section id="top" className="relative min-h-screen bg-background overflow-hidden">
      {isRemote ? (
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden
          src={remote}
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden
        >
          {mp4 ? <source src={mp4} type="video/mp4" /> : null}
          <source src={HERO_VIDEO.srcWebm} type="video/webm" />
        </video>
      )}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(90%_70%_at_50%_25%,hsl(38_40%_18%/0.25),transparent_60%)]" />
      <div className="absolute inset-0 z-[3] noise opacity-35" />
      <div className="absolute bottom-0 inset-x-0 h-[26vh] z-[4] gradient-fade-b" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="pill-label inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2">
            <span className="text-primary font-medium tracking-wide">{HERO.badge}</span>
            <span className="text-foreground/70 hidden sm:inline">·</span>
            <span className="font-ristorante italic text-foreground/90 text-base md:text-lg">
              {BRAND.tagline}
            </span>
          </div>
          <GoogleRatingHero />
        </motion.div>

        <BlurText
          text={HERO.headline}
          as="h1"
          className="mt-8 font-display uppercase text-[clamp(38px,7.5vw,108px)] leading-[0.92] tracking-[-0.02em] text-foreground max-w-[20ch]"
          delay={0.08}
          startDelay={0.12}
        />
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-ristorante text-[clamp(1.35rem,3.5vw,2.4rem)] italic text-primary tracking-wide"
        >
          {HERO.headlineLine2}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-body text-base md:text-lg text-foreground/82 max-w-2xl leading-relaxed"
        >
          {HERO.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <Button variant="hero" asChild>
            <a href={RESERVE_URL} target="_blank" rel="noopener noreferrer">
              {HERO.primary} <ArrowUpRight className="ml-1 size-4" />
            </a>
          </Button>
          <Button variant="heroGlass" asChild>
            <a href={MENU_URL} target="_blank" rel="noopener noreferrer">
              <UtensilsCrossed className="mr-1.5 size-4" /> {HERO.secondary}
            </a>
          </Button>
        </motion.div>

        <div className="mt-auto pt-14 flex flex-col items-center gap-4 w-full max-w-3xl">
          <span className="font-ristorante text-sm md:text-base italic text-foreground/60">
            {UI.trustedBy}
          </span>
          <div className="flex items-center gap-6 md:gap-12 flex-wrap justify-center px-4">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="font-ristorante italic text-lg md:text-xl text-primary/85 tracking-wide"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
