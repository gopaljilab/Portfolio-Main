import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  chapterNumber?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  darker?: boolean;
}

export function Section({
  id,
  title,
  subtitle,
  chapterNumber,
  description,
  children,
  className = "",
  darker = false,
}: SectionProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.from(heading.querySelectorAll("[data-section-reveal]"), {
        immediateRender: false,
        autoAlpha: 0,
        y: 20,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          once: true,
        },
      });
    }, heading);

    return () => context.revert();
  }, []);

  return (
    <section
      id={id}
      className={`py-16 md:py-24 border-b border-border ${
        darker ? "bg-secondary/40" : "bg-background"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div ref={headingRef} className="mb-12 md:mb-16 pb-6 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2 font-mono text-xs text-muted-foreground uppercase tracking-widest" data-section-reveal>
                  {chapterNumber && <span className="text-primary font-semibold">{chapterNumber}</span>}
                  {chapterNumber && subtitle && <span className="text-border">/</span>}
                  {subtitle && <span>{subtitle}</span>}
                </div>
                {title && (
                  <h2
                    className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground font-normal tracking-tight"
                    data-section-reveal
                  >
                    {title}
                  </h2>
                )}
              </div>
              {description && (
                <p
                  className="text-sm font-sans text-muted-foreground max-w-md leading-relaxed"
                  data-section-reveal
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
