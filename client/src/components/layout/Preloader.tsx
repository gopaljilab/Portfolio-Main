import React, { useEffect, useLayoutEffect, useRef, useState, useCallback, useId } from "react";
import { gsap } from "@/lib/gsap";
import { CreationOfAdamIllustration } from "@/components/sections/CreationOfAdamIllustration";

interface PreloaderProps {
  onComplete?: () => void;
}

const columnWidth = 11;
const rowHeight = 15;

export function Preloader({ onComplete }: PreloaderProps) {
  const pixelFilterId = useId();
  const [isReducedMotion, setIsReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Welcome scene, entry gate, then portfolio.
  const [stage, setStage] = useState<1 | 2 | 3>(() => {
    if (window.location.pathname !== "/") return 3;
    return isReducedMotion ? 3 : 1;
  });

  const containerRef = useRef<HTMLDialogElement>(null);
  const welcomeSceneRef = useRef<HTMLDivElement>(null);
  const handsContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const sparkGlowRef = useRef<HTMLDivElement>(null);

  const gateBackdropRef = useRef<HTMLDivElement>(null);
  const gatePromptRef = useRef<HTMLDivElement>(null);
  const revealPosition = useRef<{ x: number; y: number; radius: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const finishing = useRef(false);
  const transitionTween = useRef<gsap.core.Tween | null>(null);
  const revealTween = useRef<gsap.core.Tween | null>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  const isOpen = stage !== 3;

  useLayoutEffect(() => {
    const dialog = containerRef.current;
    if (!isOpen || !dialog) return;

    dialog.showModal();
    skipButtonRef.current?.focus();
    return () => {
      transitionTween.current?.kill();
      revealTween.current?.kill();
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (stage === 2 && document.activeElement === skipButtonRef.current) {
      ctaButtonRef.current?.focus();
    }
    if (stage === 3 && finishing.current) {
      window.dispatchEvent(new CustomEvent("portfolio:preloader-complete"));
      const sectionId = window.location.hash.slice(1);
      const section = sectionId ? document.getElementById(sectionId) : null;
      const heading = section?.querySelector<HTMLElement>("h1, h2")
        ?? document.getElementById("portfolio-heading");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
  }, [stage]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  // Lock scroll while intro is visible
  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const body = document.body;
    const originalRootOverflow = root.style.overflow;
    const originalBodyOverflow = body.style.overflow;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      root.style.overflow = originalRootOverflow;
      body.style.overflow = originalBodyOverflow;
    };
  }, [isOpen]);

  // Completion handler to exit preloader smoothly into portfolio
  const handleFinish = useCallback(() => {
    if (finishing.current) return;
    finishing.current = true;
    transitionTween.current?.kill();
    revealTween.current?.kill();
    setStage(3);
    onComplete?.();
  }, [onComplete]);

  // Transition from the welcome scene to the entry gate.
  const transitionToGate = useCallback(() => {
    if (finishing.current) return;
    const welcomeScene = welcomeSceneRef.current;
    if (!welcomeScene) {
      setStage((current) => current === 1 ? 2 : current);
      return;
    }

    // Cross-fade Scene 1 cleanly into Scene 2 which is sitting directly underneath
    transitionTween.current?.kill();
    transitionTween.current = gsap.to(welcomeScene, {
      opacity: 0,
      duration: 0.38,
      ease: "power2.inOut",
      onComplete: () => {
        setStage((current) => current === 1 ? 2 : current);
      },
    });
  }, []);

  // Stage 1: Welcome Connection Animation (Runs on mount)
  useEffect(() => {
    if (stage !== 1) return;

    if (isReducedMotion) {
      handleFinish();
      return;
    }

    const welcomeScene = welcomeSceneRef.current;
    const handsContainer = handsContainerRef.current;
    const textContainer = textContainerRef.current;
    const sparkGlow = sparkGlowRef.current;

    if (!welcomeScene || !handsContainer || !textContainer) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(welcomeScene, { opacity: 1 });
      gsap.set(handsContainer, { scale: 0.94, opacity: 0 });
      gsap.set(textContainer, { y: 28, opacity: 0 });
      if (sparkGlow) gsap.set(sparkGlow, { scale: 0, opacity: 0 });

      // Target the hands paths inside CreationOfAdamIllustration
      const leftElements = handsContainer.querySelectorAll(".adh-l, .adk-l");
      const rightElements = handsContainer.querySelectorAll(".adh-r, .adk-r");
      const sparkEl = handsContainer.querySelector(".cxi-spark");

      if (leftElements.length > 0 && rightElements.length > 0) {
        gsap.set(leftElements, { x: -70, opacity: 0 });
        gsap.set(rightElements, { x: 70, opacity: 0 });
      }

      if (sparkEl) {
        gsap.set(sparkEl, { scale: 0, opacity: 0, transformOrigin: "center center" });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          transitionToGate();
        },
      });

      // 1. Hands container appears and slides both hands toward center
      tl.to(handsContainer, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" })

      // 2. Left and right hands converge to meet at the center
      .to(leftElements, { x: 0, opacity: 1, duration: 1.3, ease: "power3.out" }, "-=0.2")
      .to(rightElements, { x: 0, opacity: 1, duration: 1.3, ease: "power3.out" }, "<")

      // 3. Spark point illuminates at contact point with expanding halo rings
      .to(sparkEl, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.2")
      .to(sparkGlow, { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }, "<")

      // 4. Text reveal: "Welcome to my corner of the internet."
      .to(textContainer, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, "-=0.3")
      .to({}, { duration: 0.53 });

    }, welcomeScene);

    return () => {
      ctx.revert();
    };
  }, [stage, isReducedMotion, transitionToGate, handleFinish]);

  // Draw the binary grid beneath the welcome scene.
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width: number;
    let height: number;
    let lastRadius: number | undefined;
    const onResize = () => {
      lastRadius = undefined;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };

    onResize();
    window.addEventListener("resize", onResize, { passive: true });

    const grain = Array.from({ length: 4096 }, () => Math.random());
    const bits = Uint8Array.from(grain, () => Number(Math.random() < 0.5));
    let lastDraw = -Infinity;
    let lastFlip = performance.now();

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (time - lastDraw < 1000 / 30 - 1) return;
      const reveal = revealPosition.current;
      const radius = reveal?.radius ?? 0;
      const shouldFlip = !reveal && time - lastFlip >= 140;
      if (radius === lastRadius && !shouldFlip) return;
      if (shouldFlip) {
        lastFlip = time;
        for (let index = 0; index < bits.length; index++) {
          if (Math.random() < 0.12) bits[index] = 1 - bits[index];
        }
      }
      lastDraw = time;
      lastRadius = radius;
      ctx.clearRect(0, 0, width, height);
      ctx.font = "600 11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let row = 0; row * rowHeight < height; row++) {
        const y = (row + 0.5) * rowHeight;
        for (let column = 0; column * columnWidth < width; column++) {
          const x = (column + 0.5) * columnWidth;
          const index = (column * 31 + row * 67) % grain.length;
          const noise = grain[index];
          const distance = reveal ? Math.hypot(x - reveal.x, y - reveal.y) - reveal.radius : Infinity;
          if (distance < -noise * 70) continue;

          ctx.globalAlpha = noise * 0.16;
          ctx.fillStyle = "#221e1b";
          ctx.fillRect(column * columnWidth, row * rowHeight, columnWidth, rowHeight);
          ctx.globalAlpha = distance < 36 ? 0.7 + noise * 0.25 : 0.45 + noise * 0.4;
          ctx.fillStyle = "#fff6e7";
          ctx.fillText(bits[index] === 0 ? "0" : "1", x, y);
        }
      }
      ctx.globalAlpha = 1;
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isReducedMotion) handleFinish();
  }, [isOpen, isReducedMotion, handleFinish]);

  const revealPortfolio = useCallback((origin?: { x: number; y: number }) => {
    const backdrop = gateBackdropRef.current;
    const prompt = gatePromptRef.current;
    const dialog = containerRef.current;
    if (stage !== 2 || revealTween.current || !backdrop || !prompt || !dialog) return;

    const bounds = dialog.getBoundingClientRect();
    const x = origin ? origin.x - bounds.left : bounds.width / 2;
    const y = origin ? origin.y - bounds.top : bounds.height / 2;
    const reveal = { x, y, radius: 0 };
    revealPosition.current = reveal;
    const edge = Math.hypot(Math.max(x, bounds.width - x), Math.max(y, bounds.height - y));
    revealTween.current = gsap.to(reveal, {
      radius: edge + 80,
      duration: 0.85,
      ease: "power2.inOut",
      onUpdate: () => {
        const innerRadius = Math.max(0, reveal.radius - 40);
        backdrop.style.maskImage = `radial-gradient(circle at ${x}px ${y}px, transparent ${innerRadius}px, black ${reveal.radius}px)`;
        prompt.style.opacity = String(Math.max(0, 1 - reveal.radius / 100));
      },
      onComplete: handleFinish,
    });
  }, [stage, handleFinish]);

  useEffect(() => {
    const dialog = containerRef.current;
    if (stage !== 2 || !dialog) return;

    let touchStart: Touch | undefined;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (event.cancelable) event.preventDefault();
      revealPortfolio({ x: event.clientX, y: event.clientY });
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStart = event.touches.length === 1 ? event.touches[0] : undefined;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!touchStart || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const verticalDistance = Math.abs(touch.clientY - touchStart.clientY);
      if (verticalDistance < 24 || verticalDistance <= Math.abs(touch.clientX - touchStart.clientX)) return;
      revealPortfolio({ x: touch.clientX, y: touch.clientY });
      touchStart = undefined;
    };

    dialog.addEventListener("wheel", onWheel, { passive: false });
    dialog.addEventListener("touchstart", onTouchStart, { passive: true });
    dialog.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      dialog.removeEventListener("wheel", onWheel);
      dialog.removeEventListener("touchstart", onTouchStart);
      dialog.removeEventListener("touchmove", onTouchMove);
    };
  }, [stage, revealPortfolio]);

  // If intro has completed, unmount from DOM completely
  if (stage === 3) return null;

  return (
    <dialog
      ref={containerRef}
      className="fixed inset-0 m-0 h-full w-full max-h-none max-w-none touch-pinch-zoom overflow-hidden overscroll-none border-0 p-0 select-none bg-transparent backdrop:bg-transparent"
      data-lenis-prevent
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        event.preventDefault();
        const nextButton = stage === 2 && document.activeElement === skipButtonRef.current
          ? ctaButtonRef.current
          : skipButtonRef.current;
        nextButton?.focus();
      }}
      onCancel={(event) => {
        event.preventDefault();
        handleFinish();
      }}
      aria-label="Portfolio Introduction"
    >
      <button
        ref={skipButtonRef}
        type="button"
        onClick={handleFinish}
        data-cursor="Skip"
        className="absolute bottom-16 right-4 z-30 rounded-full border border-[#D5D0C5] bg-[#F5F2EB] px-4 py-2 font-mono text-xs text-[#292C28] focus-visible:outline focus-visible:outline-2"
      >
        Skip intro
      </button>
      <div
        aria-hidden={stage === 1}
        onClick={(event) => revealPortfolio(event.detail ? { x: event.clientX, y: event.clientY } : undefined)}
        className="absolute inset-0 z-10 cursor-pointer"
      >
        {/* Sample the live page once per cell, then expand each sample to fill its tile. */}
        <svg className="pointer-events-none absolute" width="0" height="0" aria-hidden="true">
          <filter id={pixelFilterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feFlood floodColor="white" x={(columnWidth - 1) / 2} y={(rowHeight - 1) / 2} width="1" height="1" result="sample" />
            <feComposite in="sample" in2="sample" operator="in" x="0" y="0" width={columnWidth} height={rowHeight} result="tile" />
            <feTile in="tile" result="grid" />
            <feComposite in="SourceGraphic" in2="grid" operator="in" />
            <feMorphology operator="dilate" radius={`${(columnWidth - 1) / 2} ${(rowHeight - 1) / 2}`} />
          </filter>
        </svg>
        <div
          ref={gateBackdropRef}
          className="absolute inset-0 bg-black/15 backdrop-blur-sm"
          style={{ backdropFilter: `url("#${pixelFilterId}") brightness(0.8) saturate(1.1)` }}
          aria-hidden="true"
        />
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
        <div ref={gatePromptRef} className="absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] flex justify-center sm:bottom-9">
          <button
            ref={ctaButtonRef}
            data-cursor="Enter"
            disabled={stage === 1}
            type="button"
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;
              event.preventDefault();
              revealPortfolio();
            }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#d5d0c5] bg-[#f5f2eb] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-[#292c28] shadow-lg transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6 sm:py-3"
          >
            <span className="size-1.5 rounded-full bg-[#b44b32]" aria-hidden="true" />
            Tap to enter
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {stage === 1 && (
        <div
          ref={welcomeSceneRef}
          className="absolute inset-0 z-20 w-full h-full bg-[#FFFFFF] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6"
        >
          {/* Atmospheric Rich Cobalt Blue Lighting and Soft Radial Gradient */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-white">
            <div className="cxi-sky opacity-95">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="cxi-grain" />

            {/* Central Glow Diffusion Behind Contact Nexus */}
            <div
              ref={sparkGlowRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-blue-500/25 rounded-full blur-[90px] pointer-events-none"
            />
          </div>

          {/* Central Content Area */}
          <div className="relative z-10 w-full max-w-[1376px] flex flex-col items-center justify-center my-auto">
            {/* Hand Illustrations */}
            <div
              ref={handsContainerRef}
              className="relative w-full flex items-center justify-center"
            >
              <CreationOfAdamIllustration />
            </div>

            {/* Translucent Blue Text-Highlight Surface: "Welcome to my corner of the internet." */}
            <div
              ref={textContainerRef}
              className="relative z-10 flex flex-col items-center text-center mt-2 sm:mt-6 max-w-xl px-4"
            >
              <p className="text-center text-lg font-semibold leading-[1.23] tracking-tight text-white sm:text-3xl">
                <span className="inline-block rounded bg-[#234bd4] px-2">Welcome to my <em className="font-serif font-normal">corner</em></span>
                <br />
                <span className="inline-block rounded bg-[#234bd4] px-2">of the internet.</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
