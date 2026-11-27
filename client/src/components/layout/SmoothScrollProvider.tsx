import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import type Lenis from "lenis";
import LocomotiveScroll from "locomotive-scroll";
import { ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let locomotive: LocomotiveScroll | null = null;
    let startFrame = 0;
    let refreshFrame = 0;
    let initialHashFrame = 0;
    let disposed = false;

    const refreshScrollTriggers = () => {
      locomotive?.resize();
      ScrollTrigger.refresh();
    };

    const destroyScroll = () => {
      cancelAnimationFrame(startFrame);
      locomotive?.destroy();
      locomotive = null;
      lenisRef.current = null;
    };

    const setupScroll = () => {
      destroyScroll();
      if (reducedMotion.matches) {
        ScrollTrigger.refresh();
        return;
      }

      locomotive = new LocomotiveScroll({
        autoStart: false,
        lenisOptions: {
          autoRaf: false,
          smoothWheel: true,
          syncTouch: false,
          duration: 0.9,
          easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
          anchors: { offset: -80, duration: 0.9 },
        },
        scrollCallback: () => ScrollTrigger.update(),
      });
      lenisRef.current = locomotive.lenisInstance;
      // The library registers its scroll elements on the next frame.
      startFrame = requestAnimationFrame(() => locomotive?.start());

      ScrollTrigger.refresh();
    };

    setupScroll();
    // React mounts the page after the browser's initial fragment lookup.
    initialHashFrame = requestAnimationFrame(() => {
      refreshScrollTriggers();
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      let target: HTMLElement | null = null;
      try {
        target = document.getElementById(decodeURIComponent(hash));
      } catch {
        return;
      }
      if (!target) return;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { immediate: true, offset: -80 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
      }
    });
    reducedMotion.addEventListener("change", setupScroll);
    window.addEventListener("load", refreshScrollTriggers);
    window.addEventListener("portfolio:preloader-complete", refreshScrollTriggers);

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(refreshScrollTriggers);
    });
    resizeObserver.observe(document.body);

    document.fonts?.ready.then(() => {
      if (!disposed) refreshScrollTriggers();
    });

    return () => {
      disposed = true;
      reducedMotion.removeEventListener("change", setupScroll);
      window.removeEventListener("load", refreshScrollTriggers);
      window.removeEventListener("portfolio:preloader-complete", refreshScrollTriggers);
      resizeObserver.disconnect();
      cancelAnimationFrame(refreshFrame);
      cancelAnimationFrame(initialHashFrame);
      destroyScroll();
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
