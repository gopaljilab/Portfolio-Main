import { useEffect, useRef } from "react";

const JOINTS = 28;
const JOINT_SPACING = 11;
const INTERACTIVE = "a, button, [data-cursor]";
const GROW_SPEED = 0.012;
const SHRINK_SPEED = 0.05;
const IDLE_DELAY = 150;
const MIN_TAIL = 0;

type Point = { x: number; y: number };
type CursorPalette = { body: string; tail: string; joint: string; antenna: string };

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tail: Point[] = Array.from({ length: JOINTS }, () => ({ x: -100, y: -100 }));
    let targetX = -100;
    let targetY = -100;
    let headX = targetX;
    let headY = targetY;
    let angle = 0;
    let visible = false;
    let initialized = false;
    let opacity = 0;
    let hover = 0;
    let hovering = false;
    let grow = MIN_TAIL;
    let lastMove = 0;
    let facingAngle = 0;
    let blink = false;
    let blinkTimer = 0;
    let blinkCloseTimer = 0;
    let frame = 0;
    let dpr = 1;
    let palette: CursorPalette;

    const readPalette = (): CursorPalette => {
      const styles = getComputedStyle(document.documentElement);
      return {
        body: styles.getPropertyValue("--mascot-body").trim() || "#6f6f6f",
        tail: styles.getPropertyValue("--mascot-tail").trim() || "#4e4e4e",
        joint: styles.getPropertyValue("--mascot-joint").trim() || "#444",
        antenna: styles.getPropertyValue("--mascot-antenna").trim() || "#777",
      };
    };
    palette = readPalette();
    const themeObserver = new MutationObserver(() => { palette = readPalette(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        blink = true;
        blinkCloseTimer = window.setTimeout(() => { blink = false; }, 140);
        scheduleBlink();
      }, 3000 + Math.random() * 2000);
    };

    const drawHead = () => {
      context.save();
      context.translate(headX, headY);
      context.rotate(angle);
      const headScale = 1 + hover * 0.35;
      context.scale(headScale, headScale);

      // Two short antennae extend from the back of the head.
      context.strokeStyle = palette.antenna;
      context.lineWidth = 1.4;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(-7, -3); context.lineTo(-10, -7);
      context.moveTo(-8, 1); context.lineTo(-12, 1);
      context.stroke();

      context.fillStyle = palette.body;
      context.beginPath();
      context.ellipse(0, 0, 11, 8.5, 0, 0, Math.PI * 2);
      context.fill();

      const eyeScaleY = blink ? 0.12 : 1;
      for (const eye of [{ x: 1.5, y: -5 }, { x: 7, y: -3.8 }]) {
        context.save();
        context.translate(eye.x, eye.y);
        context.scale(1, eyeScaleY);
        context.fillStyle = "#fff";
        context.beginPath();
        context.arc(0, 0, 3.8, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = "#111";
        context.beginPath();
        context.arc(0.8, 0.4, 1.7, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      // Small open mouth, wider while hovering an interactive element.
      context.fillStyle = "#111";
      context.beginPath();
      context.ellipse(9.2, 2.5, 1.8 + hover * 1.2, 2.5 + hover * 1.1, 0.2, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const animate = () => {
      const previousX = headX;
      const previousY = headY;
      const noMotion = reducedMotion.matches;
      const follow = noMotion ? 1 : 0.22;
      headX += (targetX - headX) * follow;
      headY += (targetY - headY) * follow;
      if (noMotion && Math.hypot(headX - previousX, headY - previousY) > 4) {
        facingAngle = Math.atan2(headY - previousY, headX - previousX);
      }
      opacity += ((visible ? 1 : 0) - opacity) * (reducedMotion.matches ? 1 : 0.12);
      hover += ((hovering ? 1 : 0) - hover) * (noMotion ? 1 : 0.15);

      const moving = timeSinceMove() < IDLE_DELAY;
      if (!noMotion) {
        if (moving) grow = Math.min(1, grow + GROW_SPEED);
        else grow = Math.max(MIN_TAIL, grow - SHRINK_SPEED);
      } else {
        grow = MIN_TAIL;
      }
      const easedGrow = grow * grow * (3 - 2 * grow);
      const segmentLength = JOINT_SPACING * easedGrow;

      const back = { x: headX - Math.cos(angle) * 9, y: headY - Math.sin(angle) * 9 };
      let leader = back;
      for (let i = 0; i < tail.length; i++) {
        const joint = tail[i];
        const jx = joint.x - leader.x;
        const jy = joint.y - leader.y;
        const length = Math.hypot(jx, jy);
        if (length < 0.001 || segmentLength < 0.001) {
          joint.x = leader.x - Math.cos(angle) * segmentLength;
          joint.y = leader.y - Math.sin(angle) * segmentLength;
        } else {
          joint.x = leader.x + jx / length * segmentLength;
          joint.y = leader.y + jy / length * segmentLength;
        }
        leader = joint;
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (opacity > 0.005) {
        if (easedGrow > 0.01 && !noMotion) {
          context.lineCap = "round";
          for (let i = tail.length - 1; i >= 0; i--) {
            const k = 1 - i / tail.length;
            const previous = i === 0 ? back : tail[i - 1];
            context.strokeStyle = palette.tail;
            context.globalAlpha = opacity * easedGrow * (0.15 + 0.7 * k);
            context.lineWidth = (0.6 + 4.5 * k) * (0.4 + 0.6 * easedGrow);
            context.beginPath();
            context.moveTo(tail[i].x, tail[i].y);
            context.lineTo(previous.x, previous.y);
            context.stroke();
            context.fillStyle = palette.joint;
            context.beginPath();
            context.arc(tail[i].x, tail[i].y, 0.6 + 2 * k, 0, Math.PI * 2);
            context.fill();
          }
          context.globalAlpha = opacity;
        }
        if (!noMotion && easedGrow > 0.05) {
          const direction = Math.atan2(headY - tail[1].y, headX - tail[1].x);
          const delta = Math.atan2(Math.sin(direction - facingAngle), Math.cos(direction - facingAngle));
          facingAngle += delta * 0.2;
        }
        angle = facingAngle;
        drawHead();
      }
      frame = requestAnimationFrame(animate);
    };

    function timeSinceMove() {
      return lastMove ? performance.now() - lastMove : Infinity;
    }

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      lastMove = performance.now();
      if (!initialized) {
        headX = targetX;
        headY = targetY;
        tail.forEach((joint) => {
          joint.x = headX;
          joint.y = headY;
        });
        initialized = true;
      }
      visible = true;
    };
    const updateHover = (target: EventTarget | null) => {
      hovering = target instanceof Element && Boolean(target.closest(INTERACTIVE));
    };
    const onMouseOver = (event: MouseEvent) => updateHover(event.target);
    const onMouseOut = (event: MouseEvent) => updateHover(event.relatedTarget);
    const leave = () => { visible = false; };

    resize();
    frame = requestAnimationFrame(animate);
    scheduleBlink();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.clearTimeout(blinkTimer);
      window.clearTimeout(blinkCloseTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="mascot-cursor-canvas" aria-hidden="true" />;
}
