import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const actionSelector = '[data-cursor], a[href], button, [role="button"], summary';
const nativeCursorSelector = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), :disabled, [aria-disabled="true"], .cursor-not-allowed';

function getActionLabel(action: Element | null) {
  if (!action) return null;

  const label = action.getAttribute("data-cursor");
  if (label) return label;

  if (action.matches("a[href]")) {
    if (action.getAttribute("href")?.startsWith("mailto:")) return "Email";
    if (action.hasAttribute("download")) return "Download";
    return action.getAttribute("target") === "_blank" ? "Open ↗" : "Open";
  }

  if (action.getAttribute("aria-haspopup") === "dialog") return "Open";
  if (action.hasAttribute("aria-expanded")) {
    return action.getAttribute("aria-expanded") === "true" ? "Close" : "Open";
  }
  return "Select";
}

interface CursorPosition {
  x: number;
  y: number;
  label: string | null;
  showAccent: boolean;
  container: HTMLElement;
}

export function CustomCursor() {
  const [cursor, setCursor] = useState<CursorPosition | null>(null);
  const isVisible = cursor !== null;

  useLayoutEffect(() => {
    if (!isVisible) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor-active");
    return () => root.classList.remove("custom-cursor-active");
  }, [isVisible]);

  useEffect(() => {
    const mouseSupport = window.matchMedia("(any-pointer: fine) and (any-hover: hover)");
    const nativePreference = window.matchMedia("(prefers-reduced-motion: reduce), (forced-colors: active)");
    let point: { x: number; y: number } | null = null;
    let target: Element | null = null;
    let frame: number | null = null;

    const hide = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      point = null;
      target = null;
      setCursor(null);
    };

    const scheduleUpdate = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        if (!point || !target || target.closest(nativeCursorSelector)) {
          setCursor(null);
          return;
        }

        const action = target.closest(actionSelector);
        const label = getActionLabel(action);
        setCursor({
          ...point,
          label,
          showAccent: label !== null && action?.getAttribute("data-cursor-tone") !== "neutral",
          container: target.closest<HTMLDialogElement>("dialog[open]") ?? document.body,
        });
      });
    };

    const onPointer = (event: PointerEvent) => {
      if (!mouseSupport.matches || nativePreference.matches || event.pointerType !== "mouse" || !(event.target instanceof Element)) {
        hide();
        return;
      }
      point = { x: event.clientX, y: event.clientY };
      target = event.target;
      scheduleUpdate();
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    const refreshTarget = () => {
      if (!point) return;
      target = document.elementFromPoint(point.x, point.y);
      scheduleUpdate();
    };

    mouseSupport.addEventListener("change", hide);
    nativePreference.addEventListener("change", hide);
    window.addEventListener("pointerover", onPointer, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", refreshTarget, { capture: true, passive: true });
    window.addEventListener("resize", refreshTarget);
    window.addEventListener("portfolio:preloader-complete", refreshTarget);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      mouseSupport.removeEventListener("change", hide);
      nativePreference.removeEventListener("change", hide);
      window.removeEventListener("pointerover", onPointer);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", refreshTarget, true);
      window.removeEventListener("resize", refreshTarget);
      window.removeEventListener("portfolio:preloader-complete", refreshTarget);
    };
  }, []);

  if (!cursor) return null;

  const { x, y, label, showAccent, container } = cursor;
  const nearRightEdge = x > window.innerWidth - 200;
  const nearBottomEdge = y > window.innerHeight - 50;

  return createPortal(
    <div
      aria-hidden="true"
      data-custom-cursor=""
      className="pointer-events-none fixed left-0 top-0 z-[9999] select-none will-change-transform"
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute -left-[3px] -top-0.5 drop-shadow-[0_2px_3px_rgba(0,0,0,0.28)]"
      >
        <path
          d="M3 2L10.5 20.5L14 13.5L21 10L3 2Z"
          fill="#111111"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      <div
        className={`absolute whitespace-nowrap rounded-md px-2.5 py-1 font-sans text-[13px] font-medium leading-tight shadow-sm ${
          showAccent ? "bg-[#bc3b25] text-white" : "bg-[#171717] text-white dark:bg-[#f5f2eb] dark:text-[#171717]"
        } ${nearRightEdge ? "right-3" : "left-3.5"} ${nearBottomEdge ? "bottom-2.5" : "top-3.5"}`}
      >
        {label ?? "You"}
      </div>
    </div>,
    container,
  );
}
