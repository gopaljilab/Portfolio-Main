"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position refs for 60fps RAF loop
  const mousePos = useRef({ x: -100, y: -100 });
  const labelPos = useRef({ x: -100, y: -100 });
  const isMoving = useRef(false);
  const rafId = useRef<number | null>(null);

  const pointerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Strict fine-pointer & hover check: only enable on desktop with fine mouse pointer
    const hasFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isMoving.current) {
        // First move: snap initial coordinates immediately
        labelPos.current.x = e.clientX;
        labelPos.current.y = e.clientY;
        isMoving.current = true;
      }

      setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    // RAF smooth animation loop
    const render = () => {
      // Direct positioning for arrow pointer (0 lag)
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth subtle spring-like lag for "You" label (lerp factor 0.22)
      // Label target sits slightly below and to the right of pointer tip: (+12px X, +16px Y)
      const targetLabelX = mousePos.current.x + 12;
      const targetLabelY = mousePos.current.y + 16;

      labelPos.current.x += (targetLabelX - labelPos.current.x) * 0.22;
      labelPos.current.y += (targetLabelY - labelPos.current.y) * 0.22;

      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${labelPos.current.x}px, ${labelPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Black & White Arrow Pointer (Tip aligned at 0,0) */}
      <div
        ref={pointerRef}
        className="fixed top-0 left-0 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
        >
          {/* Outer crisp white stroke and solid black fill matching reference */}
          <path
            d="M3 2L10.5 20.5L14 13.5L21 10L3 2Z"
            fill="#111111"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating Black Rounded Rectangle Label "You" */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div className="bg-[#111111] text-[#FFFFFF] text-[15px] font-medium font-sans px-3 py-1 rounded-[10px] shadow-[0_3px_10px_rgba(0,0,0,0.28)] flex items-center justify-center select-none leading-tight border border-white/10">
          <span>You</span>
        </div>
      </div>
    </div>
  );
}
