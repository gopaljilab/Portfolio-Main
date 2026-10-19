import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let unsubscribeScroll: (() => void) | null = null;
    let refreshFrame = 0;
    let initialHashFrame = 0;
    let disposed = false;

    const refreshScrollTriggers = () => ScrollTrigger.refresh();

    const destroyLenis = () => {
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      unsubscribeScroll?.();
      lenis?.destroy();
      tickerCallback = null;
      unsubscribeScroll = null;
      lenis = null;
      lenisRef.current = null;
    };

    const setupLenis = () => {
      destroyLenis();
      if (reducedMotion.matches) {
        ScrollTrigger.refresh();
        return;
      }

      lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        duration: 0.9,
        easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        anchors: { offset: -80, duration: 0.9 },
      });
      lenisRef.current = lenis;

      unsubscribeScroll = lenis.on("scroll", () => ScrollTrigger.update());
      tickerCallback = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerCallback);

      ScrollTrigger.refresh();
    };

    setupLenis();
    // React mounts the page after the browser's initial fragment lookup.
    initialHashFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      let target: HTMLElement | null = null;
      try {
        target = document.getElementById(decodeURIComponent(hash));
      } catch {
        return;
      }
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target, { immediate: true, offset: -80 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
      }
    });
    reducedMotion.addEventListener("change", setupLenis);
    window.addEventListener("load", refreshScrollTriggers);

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
      reducedMotion.removeEventListener("change", setupLenis);
      window.removeEventListener("load", refreshScrollTriggers);
      resizeObserver.disconnect();
      cancelAnimationFrame(refreshFrame);
      cancelAnimationFrame(initialHashFrame);
      destroyLenis();
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
