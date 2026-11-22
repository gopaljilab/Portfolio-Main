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

    // Fast editorial reveal under 1.1s so user content is never blocked
    const safetyTimeout = window.setTimeout(finish, 1300);
    let revertAnimation: (() => void) | null = null;

    try {
      const context = gsap.context(() => {
        gsap
          .timeline({ onComplete: finish })
          .fromTo(name, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" })
          .fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.inOut" }, "-=0.05")
          .to(overlay, { autoAlpha: 0, duration: 0.35, ease: "power2.out" }, "+=0.08");
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-3">
        <span
          ref={nameRef}
          className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground"
        >
          Gopal Gupta
        </span>
        <div className="w-36 h-[1.5px] bg-border overflow-hidden rounded-full">
          <div
            ref={progressRef}
            className="w-full h-full bg-primary origin-left"
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
          Portfolio &amp; Selected Works
        </span>
      </div>
    </div>
  );
}
