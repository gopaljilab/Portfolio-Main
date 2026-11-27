import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { CreationOfAdamIllustration } from "@/components/sections/CreationOfAdamIllustration";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
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

  const binarySceneRef = useRef<HTMLDivElement>(null);
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

  // Transition from Stage 1 (Welcome Connection) -> Stage 2 (Binary Screen)
  const transitionToBinary = useCallback(() => {
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
      scale: 0.98,
      duration: 0.7,
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
          // Pause briefly for user appreciation then crossfade cleanly to Stage 2 (Binary screen)
          transitionToBinary();
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
      .to(textContainer, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .to({}, { duration: 1.6 });

    }, welcomeScene);

    return () => {
      ctx.revert();
    };
  }, [stage, isReducedMotion, transitionToBinary, handleFinish]);

  // Stage 2 (and pre-rendered under Stage 1): Canvas Binary Cyber-Gate Background & Throttled Shimmer Loop
  useEffect(() => {
    if (stage === 3) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Binary grid configuration
    const fontSize = 14;
    const colStep = 18;
    const rowStep = 22;
    let cols = Math.ceil(width / colStep);
    let rows = Math.ceil(height / rowStep);

    interface BinaryCell {
      char: string;
      baseOpacity: number;
      opacity: number;
      phase: number;
      speed: number;
    }

    let grid: BinaryCell[][] = [];

    const initGrid = () => {
      cols = Math.ceil(width / colStep);
      rows = Math.ceil(height / rowStep);
      grid = [];
      for (let c = 0; c < cols; c++) {
        grid[c] = [];
        for (let r = 0; r < rows; r++) {
          const base = 0.08 + Math.random() * 0.16;
          grid[c][r] = {
            char: Math.random() > 0.5 ? "1" : "0",
            baseOpacity: base,
            opacity: base,
            phase: Math.random() * Math.PI * 2,
            speed: 0.015 + Math.random() * 0.02,
          };
        }
      }
    };

    initGrid();

    // If user prefers reduced motion, draw once and don't animate
    if (isReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let c = 0; c < cols; c++) {
        const x = c * colStep + colStep / 2;
        for (let r = 0; r < rows; r++) {
          const cell = grid[c][r];
          ctx.fillStyle = `rgba(30, 35, 33, ${cell.baseOpacity})`;
          ctx.fillText(cell.char, x, r * rowStep + rowStep / 2);
        }
      }
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    let lastBitFlip = performance.now();
    let lastDraw = -Infinity;
    const BIT_FLIP_INTERVAL = 120; // Throttled updates every 120ms keeping CPU low and crisp

    const render = (time: number) => {
      // Keep the final grid frame in place while the reveal animates.
      if (revealTween.current) return;

      animId = requestAnimationFrame(render);
      const elapsed = time - lastDraw;
      if (elapsed < 1000 / 30 - 1) return;
      lastDraw = time;
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const shouldFlipBits = time - lastBitFlip > BIT_FLIP_INTERVAL;
      if (shouldFlipBits) {
        lastBitFlip = time;
      }

      for (let c = 0; c < cols; c++) {
        const x = c * colStep + colStep / 2;
        for (let r = 0; r < rows; r++) {
          const cell = grid[c][r];
          // Gentle sinusoidal shimmer without aggressive flickering
          cell.phase += cell.speed * Math.min(elapsed / (1000 / 60), 4);
          const shimmer = Math.sin(cell.phase) * 0.05;
          const currentOpacity = Math.max(0.04, Math.min(0.32, cell.baseOpacity + shimmer));

          // Throttled random bit flip across small subset of characters
          if (shouldFlipBits && Math.random() < 0.025) {
            cell.char = cell.char === "1" ? "0" : "1";
          }

          ctx.fillStyle = `rgba(30, 35, 33, ${currentOpacity})`;
          ctx.fillText(cell.char, x, r * rowStep + rowStep / 2);
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [stage, isReducedMotion]);

  useEffect(() => {
    if (!isOpen) return;
    if (isReducedMotion) {
      handleFinish();
      return;
    }
    const timeout = window.setTimeout(handleFinish, 7300);
    return () => window.clearTimeout(timeout);
  }, [isOpen, isReducedMotion, handleFinish]);

  const handleEnterClick = useCallback(() => {
    const scene = binarySceneRef.current;
    const dialog = containerRef.current;
    if (stage !== 2 || revealTween.current || !scene || !dialog) return;
    if (isReducedMotion) {
      handleFinish();
      return;
    }

    const reveal = { radius: 0 };
    const { width, height } = dialog.getBoundingClientRect();
    const edge = Math.hypot(width / 2, height / 2);
    revealTween.current = gsap.to(reveal, {
      radius: edge + 72,
      duration: 0.95,
      ease: "power1.inOut",
      onUpdate: () => {
        const feather = Math.min(72, reveal.radius);
        const mask = `radial-gradient(circle at center, transparent ${reveal.radius - feather}px, black ${reveal.radius}px)`;
        scene.style.maskImage = mask;
        scene.style.webkitMaskImage = mask;
      },
      onComplete: handleFinish,
    });
  }, [stage, isReducedMotion, handleFinish]);

  useEffect(() => {
    if (stage !== 2) return;
    const timeout = window.setTimeout(handleEnterClick, 1250);
    return () => window.clearTimeout(timeout);
  }, [stage, handleEnterClick]);

  // If intro has completed, unmount from DOM completely
  if (stage === 3) return null;

  return (
    <dialog
      ref={containerRef}
      className="fixed inset-0 m-0 h-full w-full max-h-none max-w-none overflow-hidden border-0 p-0 select-none bg-transparent backdrop:bg-transparent"
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
        className="absolute bottom-16 right-4 z-30 rounded-full border border-[#D5D0C5] bg-[#F5F2EB] px-4 py-2 font-mono text-xs text-[#292C28] focus-visible:outline focus-visible:outline-2"
      >
        Skip intro
      </button>
      {/* ===================================================================== */}
      {/* SCENE TWO (STAGE 2): BINARY CYBER-GATE SCREEN WITH "TAP TO ENTER →"    */}
      {/* Mounted underneath in background so it's seamlessly revealed          */}
      {/* ===================================================================== */}
      <div
        ref={binarySceneRef}
        aria-hidden={stage === 1}
        onClick={handleEnterClick}
        className="absolute inset-0 z-10 w-full h-full bg-[#E5E5E3] flex flex-col items-center justify-between py-8 px-4 sm:px-8 cursor-pointer"
      >
        {/* Dense Canvas Binary Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Identifier */}
        <div className="relative z-10 font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#555856] flex items-center gap-2 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DCA48B]" />
          <span>Gopal Gupta • Cyber-Gate Entry</span>
        </div>

        {/* Centered Entry Trigger: TAP TO ENTER → with High Contrast & Soft Halo Legibility */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center pointer-events-auto">
          {/* Soft Radial Backing to soften binary digits behind the central trigger */}
          <div className="absolute inset-0 -m-10 bg-[#E5E5E3]/85 rounded-full blur-xl pointer-events-none" />

          <button
            ref={ctaButtonRef}
            disabled={stage === 1}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleEnterClick();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.repeat) e.preventDefault();
            }}
            className="group relative inline-flex items-center gap-3.5 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#F5F2EB] text-[#292C28] border border-[#D5D0C5] shadow-[0_16px_40px_rgba(37,42,41,0.18)] hover:shadow-[0_20px_50px_rgba(37,42,41,0.25)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DCA48B]"
            aria-label="Tap to enter portfolio"
          >
            {/* Terracotta Circular Indicator with pulse hover */}
            <span className="w-2.5 h-2.5 rounded-full bg-[#DCA48B] shadow-[0_0_10px_rgba(220,164,139,0.9)] group-hover:scale-125 transition-transform" />

            {/* Dark Brown Monospaced Lettering */}
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#292C28]">
              TAP TO ENTER
            </span>

            {/* Arrow with subtle movement */}
            <span className="font-mono text-sm sm:text-base font-bold text-[#DCA48B] group-hover:translate-x-1.5 transition-transform">
              →
            </span>
          </button>

          {/* Subtle Helper hint */}
          <span className="relative z-10 mt-3 font-mono text-[10px] tracking-wider uppercase text-[#757876] select-none opacity-80 group-hover:opacity-100">
            Click anywhere or press Enter
          </span>
        </div>

        {/* Bottom subtle coordinate indicator */}
        <div className="relative z-10 font-mono text-[10px] text-[#7A7E7B] tracking-widest uppercase select-none">
          [SYS_READY // BENGALURU_IN]
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SCENE ONE (STAGE 1): WELCOME / CONNECTION ANIMATION                   */}
      {/* Positioned on top (z-20) with solid background, crossfading to Scene 2*/}
      {/* ===================================================================== */}
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
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center my-auto px-2">
            {/* Hand Illustrations */}
            <div
              ref={handsContainerRef}
              className="relative w-full max-w-[420px] sm:max-w-[720px] md:max-w-[840px] lg:max-w-[980px] px-2 flex items-center justify-center"
            >
              <CreationOfAdamIllustration />
            </div>

            {/* Translucent Blue Text-Highlight Surface: "Welcome to my corner of the internet." */}
            <div
              ref={textContainerRef}
              className="relative z-10 flex flex-col items-center text-center mt-2 sm:mt-6 max-w-xl px-4"
            >
              <div className="cxi-hl-block px-5 sm:px-10 py-2.5 sm:py-3.5 text-center rounded-2xl shadow-[0_14px_38px_rgba(8,28,140,0.55)]">
                <p className="font-serif text-base sm:text-2xl lg:text-[32px] text-white tracking-tight leading-snug">
                  Welcome to my corner of the internet.
                </p>
              </div>

              <p className="font-mono text-[10px] sm:text-xs text-[#0A1A5E]/80 tracking-widest uppercase mt-3">
                Gopal Gupta • Portfolio &amp; Engineering Showcase
              </p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
