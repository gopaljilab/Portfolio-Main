import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const name = nameRef.current;
    const progress = progressRef.current;
    if (!overlay || !name || !progress) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(false);
      return;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      root.style.overflow = previousOverflow;
      setIsVisible(false);
    };

    // Never leave the portfolio covered if an animation fails to finish.
    const safetyTimeout = window.setTimeout(finish, 2200);
    let revertAnimation: (() => void) | null = null;

    try {
      const context = gsap.context(() => {
        gsap
          .timeline({ onComplete: finish })
          .fromTo(name, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" })
          .fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, "-=0.08")
          .to(overlay, { yPercent: -100, duration: 0.65, ease: "power3.inOut" }, "+=0.12");
      }, overlay);
      revertAnimation = () => context.revert();
    } catch {
      finish();
    }

    return () => {
      window.clearTimeout(safetyTimeout);
      root.style.overflow = previousOverflow;
      revertAnimation?.();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background"
    >
      <span ref={nameRef} className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        Gopal Gupta.
      </span>
      <div className="mt-6 h-[2px] w-32 overflow-hidden rounded-full bg-primary/15 sm:w-40">
        <div ref={progressRef} className="h-full w-full origin-left rounded-full bg-primary" />
      </div>
    </div>
  );
}
