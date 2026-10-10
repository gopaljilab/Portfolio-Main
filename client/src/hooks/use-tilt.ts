import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export interface UseTiltOptions {
  /** Maximum tilt angle in degrees (recommended 3 - 6) */
  maxTilt?: number;
  /** Scale / lift factor on hover */
  scale?: number;
  /** Perspective in pixels */
  perspective?: number;
  /** Whether tilt is disabled */
  disabled?: boolean;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(
  options: UseTiltOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    maxTilt = 4.5,
    scale = 1.015,
    perspective = 1000,
    disabled = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Disable tilt on touch-only devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, {
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
      });

      // quickTo provides optimized, high-frame-rate tracking without allocating new tweens on each tick
      const rotateYTo = gsap.quickTo(el, "rotateY", {
        duration: 0.35,
        ease: "power2.out",
      });
      const rotateXTo = gsap.quickTo(el, "rotateX", {
        duration: 0.35,
        ease: "power2.out",
      });
      const scaleTo = gsap.quickTo(el, "scale", {
        duration: 0.35,
        ease: "power2.out",
      });

      const handlePointerMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // Relative coordinates from center of element: -0.5 to 0.5
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        // Subtle tilt in the direction of the pointer
        rotateYTo(relX * maxTilt * 2);
        rotateXTo(-relY * maxTilt * 2);
      };

      const handlePointerEnter = () => {
        scaleTo(scale);
      };

      const handlePointerLeave = () => {
        rotateYTo(0);
        rotateXTo(0);
        scaleTo(1);
      };

      el.addEventListener("pointerenter", handlePointerEnter);
      el.addEventListener("pointermove", handlePointerMove);
      el.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        el.removeEventListener("pointerenter", handlePointerEnter);
        el.removeEventListener("pointermove", handlePointerMove);
        el.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, el);

    return () => {
      ctx.revert();
      if (el) {
        gsap.set(el, { clearProps: "transform,rotateX,rotateY,scale" });
      }
    };
  }, [maxTilt, scale, perspective, disabled]);

  return ref;
}
