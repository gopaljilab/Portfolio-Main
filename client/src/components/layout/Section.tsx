import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  darker?: boolean;
}

export function Section({ id, title, subtitle, children, className = "", darker = false }: SectionProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.from(heading.querySelectorAll("[data-section-reveal]"), {
        immediateRender: false,
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          once: true,
        },
      });

      gsap.fromTo(
        heading,
        { x: -18 },
        {
          immediateRender: false,
          x: 18,
          ease: "none",
          scrollTrigger: {
            trigger: heading.closest("section") ?? heading,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, heading);

    return () => context.revert();
  }, []);

  return (
    <section 
      id={id} 
      className={`py-10 md:py-12 ${darker ? 'bg-slate-50/50 dark:bg-slate-950/50' : 'bg-white dark:bg-slate-950'} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div
            ref={headingRef}
            className="mb-6 md:mb-8"
          >
            {subtitle && (
              <span data-section-reveal className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block flex items-center gap-2">
                <span className="w-10 h-0.5 bg-primary"></span>
                {subtitle}
              </span>
            )}
            {title && (
              <h2 data-section-reveal className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
