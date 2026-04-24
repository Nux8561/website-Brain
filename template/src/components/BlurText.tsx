import { createElement, useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

type BlurTag = "h1" | "h2" | "h3" | "p";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  startDelay?: number;
  as?: BlurTag;
};

export function BlurText({
  text,
  className = "",
  delay = 0.07,
  startDelay = 0,
  as = "h2",
}: Props) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(" ");

  const children: ReactNode = words.map((w, i) => (
    <motion.span
      key={i}
      className="inline-block will-change-[filter,transform,opacity]"
      initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
      animate={inView ? { filter: "blur(0)", opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: startDelay + i * delay,
      }}
    >
      {w}
      {i < words.length - 1 ? "\u00A0" : ""}
    </motion.span>
  ));

  return createElement(as, { ref, className }, children);
}
