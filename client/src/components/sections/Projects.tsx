import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Github, FileText } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

import { PROJECTS } from "@/data/projects";

export function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const [useStack, setUseStack] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const preference = window.matchMedia("(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)");
    const cards = cardRefs.current.filter((card): card is HTMLElement => card !== null);
    let frame: number | null = null;
    let stack = false;

    const update = () => {
      frame = null;
      const viewportHeight = window.innerHeight;
      const positions = cards.map((card) => card.getBoundingClientRect().top);
      const readingLine = stack ? positions[0] + (viewportHeight - positions[0]) * 0.54 : viewportHeight * 0.45;
      let foreground = 0;

      cards.forEach((card, index) => {
        if (positions[index] <= readingLine) foreground = index;
        const nextTop = positions[index + 1];
        const threshold = 90 + index * 14;
        const progress = stack && nextTop !== undefined
          ? Math.max(0, Math.min(1, (viewportHeight * 0.88 - nextTop) / Math.max(1, viewportHeight * 0.88 - threshold)))
          : 0;
        card.style.setProperty("--project-covered", String(progress));
      });
      setActiveProjectIndex(foreground);
    };

    const scheduleUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      stack = preference.matches && cards.every((card, index) => card.offsetHeight + 90 + index * 14 + 24 <= window.innerHeight);
      setUseStack(stack);
      scheduleUpdate();
    };

    const observer = new ResizeObserver(measure);
    cards.forEach((card) => observer.observe(card));
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    preference.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", measure);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-stacked={useStack}
      className="relative pt-20 md:pt-28 pb-32 md:pb-48 border-b border-border/80 overflow-visible select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================= */}
        {/* 1. EDITORIAL SECTION HEADER WITH DYNAMIC COUNTER           */}
        {/* ========================================================= */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20 pb-8 border-b border-border">
          <motion.div
            className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary origin-left"
            style={{ scaleX: smoothProgress }}
            aria-hidden="true"
          />
          <div className="max-w-2xl">
            {/* Eyebrow Pill */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#111111] text-[#FFFFFF] dark:bg-[#FFFFFF] dark:text-[#111111] font-semibold">
                01
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                SELECTED WORK · 2024 → 2026
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground font-normal tracking-tight mb-4">
              Stuff I couldn&apos;t stop building<span className="text-primary italic">.</span>
            </h2>

            <p className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed">
              Projects designed, engineered and shipped end-to-end. A collection of experiments, products and systems built with curiosity and purpose.
            </p>
          </div>

          {/* Large Dynamic Project Counter */}
          <div className="flex items-baseline gap-1 font-mono shrink-0">
            <span className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground tabular-nums transition-all duration-300">
              {(activeProjectIndex + 1).toString().padStart(2, "0")}
            </span>
            <span className="text-xl sm:text-2xl text-muted-foreground font-normal tabular-nums">
              / {PROJECTS.length.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. THE MAIN DESIGN: PHYSICAL OVERLAPPING FOLDER STACK      */}
        {/* ========================================================= */}
        <div className="relative w-full overflow-visible pb-32 md:pb-40">
          {PROJECTS.map((project, index) => {
            // Incremental sticky top: 90px header offset + 14px per stack layer
            const stickyTop = `${90 + index * 14}px`;
            // Ascending z-index: later project sheets rise over earlier ones
            const zIndex = index + 1;

            return (
              <article
                key={project.id}
                ref={(el) => (cardRefs.current[index] = el)}
                id={`project-${project.id}`}
                style={{ "--project-top": stickyTop, "--project-layer": zIndex } as React.CSSProperties}
                className={`project-folder relative w-full rounded-[24px] sm:rounded-[32px] md:rounded-[38px] bg-[#FFFFFF] dark:bg-[#1C1916] border-[1.5px] border-[#151515] dark:border-[#38332D] shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-shadow duration-300 overflow-visible ${
                  index === 0 ? "mt-0" : "mt-24 sm:mt-28 md:mt-32"
                }`}
              >
                {/* Protruding Folder Tab (Attached to Upper-Left Edge) */}
                <div
                  className={`absolute -top-10 left-6 sm:left-10 h-10 px-4 sm:px-6 rounded-t-xl sm:rounded-t-2xl border-t-[1.5px] border-x-[1.5px] border-[#151515] dark:border-[#38332D] flex items-center gap-2.5 shadow-sm ${project.accentBg} text-[#0A0807] font-mono text-xs sm:text-[13px] font-semibold tracking-wider`}
                >
                  {/* Small Black Circular Badge */}
                  <span className="w-5 h-5 rounded-full bg-[#111111] text-[#FFFFFF] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {project.number}
                  </span>
                  <span>{project.tabLabel}</span>
                </div>

                {/* Main Card Content: Split-Screen Layout */}
                <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* LEFT COLUMN: ~42% Width (Project Details & Actions) */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                      <div>
                        {/* Category Indicator with Colored Dot */}
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: project.accentColor }}
                          />
                          <span>{project.category}</span>
                        </div>

                        {/* Large Bold Project Title (Responsive Fluid 42px - 60px) */}
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-sans font-bold tracking-tight text-foreground mb-3 leading-[1.08]">
                          {project.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Primary Project CTA: Black pill with subtle colored accent shadow */}
                        <a
                          href={project.primaryCtaLink}
                          data-cursor={project.primaryCtaText}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#111111] text-[#FFFFFF] hover:bg-black font-mono text-xs uppercase tracking-wider font-semibold shadow-md motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] transition-all cursor-pointer"
                          style={{
                            boxShadow: `0 4px 18px ${project.shadowColor}`,
                          }}
                        >
                          <span>{project.primaryCtaText}</span>
                          <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </a>

                        {/* Secondary Destination Outlined Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                          {project.secondaryLinks.filter((link) => link.url !== project.primaryCtaLink).map((sec) => (
                            <a
                              key={sec.label}
                              href={sec.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 hover:bg-secondary text-foreground border border-border text-xs font-mono uppercase tracking-wider transition-colors"
                            >
                              {sec.icon === "github" && <Github aria-hidden="true" className="w-3 h-3 text-muted-foreground" />}
                              {sec.icon === "docs" && <FileText aria-hidden="true" className="w-3 h-3 text-primary" />}
                              {sec.icon === "external" && <ArrowUpRight aria-hidden="true" className="w-3 h-3 text-primary" />}
                              <span>{sec.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>

                      {project.highlight && (
                        <p className="border-l-2 border-primary/50 pl-3 text-sm leading-relaxed text-foreground">
                          {project.highlight}
                        </p>
                      )}
                      <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                        {project.tags.map((tag) => (
                          <li key={tag} className="rounded-md border border-border/80 bg-secondary px-2.5 py-1 font-mono text-[11px] text-foreground">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* RIGHT COLUMN: ~58% Width (Project Screenshot with Colored Offset Shadow) */}
                    <div className="lg:col-span-7 w-full">
                      <div className="relative group">

                        {/* Colored Offset Backdrop Shadow Matching Project Accent */}
                        <div
                          className="absolute inset-0 translate-x-2 sm:translate-x-3 translate-y-2 sm:translate-y-3 rounded-2xl sm:rounded-3xl pointer-events-none transition-transform duration-300 group-hover:translate-x-3.5 group-hover:translate-y-3.5"
                          style={{
                            backgroundColor: project.accentColor,
                            opacity: 0.88,
                          }}
                          aria-hidden="true"
                        />

                        {/* Foreground Screenshot Frame with Thin Dark Border */}
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-[1.5px] border-[#151515] bg-[#F7F2E9] dark:bg-[#1C1916] shadow-md z-10 aspect-[16/10]">
                          <div
                            className="absolute inset-0 motion-safe:[@media(pointer:fine)]:inset-y-[-3.5dvh]"
                            data-scroll
                            data-scroll-speed="0.035"
                          >
                            <img
                              src={`/projects/${project.image.name}.webp`}
                              srcSet={`/projects/${project.image.name}-small.webp ${project.image.smallWidth}w, /projects/${project.image.name}.webp ${project.image.width}w`}
                              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 90vw"
                              width={project.image.width}
                              height={project.image.height}
                              decoding="async"
                              alt={`${project.title} Preview`}
                              loading="lazy"
                              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
