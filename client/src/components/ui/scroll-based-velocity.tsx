"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView,
  useReducedMotion,
  wrap,
} from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollBasedVelocityProps {
  text: string;
  defaultVelocity?: number;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

interface ParallaxTextProps {
  children: string;
  baseVelocity: number;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
  isActive: boolean;
}

function ParallaxText({
  children,
  baseVelocity = 3,
  className,
  containerRef,
  isActive,
}: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll(containerRef ? { container: containerRef } : undefined);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-1, 0, 1]);

  const x = useTransform(baseX, (v) => `${wrap(-12.5, 0, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    if (reducedMotion || !isActive) return;

    const vf = velocityFactor.get();

    if (vf < 0) {
      directionFactor.current = -1;
    } else if (vf > 0) {
      directionFactor.current = 1;
    }

    const speed = directionFactor.current * baseVelocity * (1 + Math.abs(vf));
    const moveBy = speed * (Math.min(delta, 100) / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  if (reducedMotion) {
    return (
      <div className="overflow-hidden whitespace-nowrap flex flex-nowrap justify-center">
        <div className={cn("flex whitespace-nowrap", className)}>
          <span className="block px-4">{children}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className={cn("flex whitespace-nowrap will-change-transform", className)} style={{ x }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} aria-hidden={i > 0} className="block mr-8 last:mr-8">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Adapted from componentry.dev (@componentry/scroll-based-velocity)
 * Powered by motion.dev scroll & velocity springs; pauses when offscreen or reduced-motion.
 */
export function ScrollBasedVelocity({
  text,
  defaultVelocity = 2.6,
  className,
  containerRef,
}: ScrollBasedVelocityProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { margin: "120px 0px" });

  return (
    <div ref={wrapperRef} className="relative w-full select-none overflow-hidden" aria-label={text}>
      <ParallaxText
        baseVelocity={defaultVelocity}
        className={className}
        containerRef={containerRef}
        isActive={isInView}
      >
        {text}
      </ParallaxText>
      <ParallaxText
        baseVelocity={-defaultVelocity}
        className={className}
        containerRef={containerRef}
        isActive={isInView}
      >
        {text}
      </ParallaxText>
    </div>
  );
}
