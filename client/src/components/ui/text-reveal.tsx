import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  gradientWords?: string[];
  gradientClass?: string;
}

/**
 * TextReveal component inspired by Animaster Lib.
 * Splits incoming text into staggered animated words with subtle slide & blur masks,
 * giving high-end editorial and SaaS feel without degrading SEO or accessibility.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.5,
  as: Component = "h2",
  gradientWords = [],
  gradientClass = "text-primary text-glow",
}: TextRevealProps) {
  const ref = React.useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <Component ref={ref as any} className={cn("inline-block", className)}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {words.map((word, index) => {
          const isGradient = gradientWords.some((gw) =>
            word.toLowerCase().includes(gw.toLowerCase())
          );

          return (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariants}
              className={cn("inline-block", isGradient && gradientClass)}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </Component>
  );
}
