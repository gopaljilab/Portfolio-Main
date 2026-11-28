import React, { useLayoutEffect, useRef, useState } from "react";
import { Github, CheckCheck, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { CreationOfAdamIllustration } from "./CreationOfAdamIllustration";

const EMAIL = "gopaljilab@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const illustrationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const illustration = illustrationRef.current;
    if (!illustration) return;

    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const left = illustration.querySelectorAll(".adh-l, .adk-l");
      const right = illustration.querySelectorAll(".adh-r, .adk-r");
      const spark = illustration.querySelector(".cxi-spark");

      const timeline = gsap.timeline({
        defaults: { duration: 1.3, ease: "power3.out" },
        scrollTrigger: { trigger: illustration, start: "top 82%", once: true },
      });

      timeline
        .from(left, { xPercent: -24, autoAlpha: 0 }, 0)
        .from(right, { xPercent: 24, autoAlpha: 0 }, 0)
        .from(spark, { autoAlpha: 0, duration: 0.32, ease: "sine.out" }, 0.98);
    });

    return () => motion.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="contact"
      className="contact-section relative isolate overflow-hidden border-t border-border px-4 pb-20 pt-6 sm:pb-24 md:pt-10 lg:pb-28"
    >
      <div className="cxi-grain -z-10" aria-hidden="true" />
      <div
        ref={illustrationRef}
        aria-hidden="true"
        className="contact-illustration pointer-events-none relative left-1/2 w-[min(112%,88rem)] -translate-x-1/2 sm:w-full sm:max-w-[88rem]"
      >
        <CreationOfAdamIllustration />
      </div>

      <div className="relative mx-auto -mt-2 flex max-w-4xl flex-col items-center text-center sm:-mt-8 lg:-mt-16">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#25221E]/80 backdrop-blur-md border border-border/80 shadow-sm text-xs font-mono text-[#0A1A5E] dark:text-[#C8D5FF] tracking-wide mb-6 sm:mb-8 z-10">
          <span className="w-2 h-2 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
          <span>Open to new work · Bengaluru or remote</span>
        </div>

        {/* Contact headline */}
        <h2 className="flex flex-col items-center gap-2 sm:gap-3 text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-sans font-bold tracking-tight text-white mb-8 sm:mb-10 z-10">
          {/* Top Line: Let's build */}
          <span className="cxi-hl-block px-7 sm:px-11 py-1.5 sm:py-2.5">
            Let&apos;s build{" "}
          </span>

          {/* Bottom Line: what's next. */}
          <span className="cxi-hl-block px-8 sm:px-14 py-1.5 sm:py-2.5">
            what&apos;s <em className="font-serif italic font-normal ml-2 sm:ml-3">next.</em>
          </span>
        </h2>

        {/* Contact actions */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 z-10">
          {/* Primary Email Mailto Action with Dark Pill */}
          <a
            href={`mailto:${EMAIL}`}
            className="relative isolate inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full border border-[#0A1A5E]/25 bg-[#F6F3FF] text-[#0A1A5E] hover:bg-white dark:bg-[#0A1A5E] dark:text-white dark:hover:bg-[#071345] font-sans text-sm sm:text-base font-bold shadow-[0_18px_40px_-18px_rgba(10,26,94,0.8)] motion-safe:hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200 cursor-pointer"
          >
            <span>{EMAIL}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Copy Button */}
          <button
            type="button"
            onClick={copyEmail}
            data-cursor="Copy"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-full bg-white/85 dark:bg-[#25221E]/85 hover:bg-white text-[#0A1A5E] dark:text-[#E2E8F0] border border-white/60 dark:border-border font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">COPIED</span>
              </>
            ) : (
              <span>COPY</span>
            )}
          </button>

          {/* LinkedIn Profile */}
          <a
            href="https://www.linkedin.com/in/guptagopal001/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-full bg-white/85 dark:bg-[#25221E]/85 hover:bg-white text-[#0A1A5E] dark:text-[#E2E8F0] border border-white/60 dark:border-border font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm hover:-translate-y-0.5"
          >
            <span>LinkedIn ↗</span>
          </a>

          {/* GitHub Profile */}
          <a
            href="https://github.com/gopaljilab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-full bg-white/85 dark:bg-[#25221E]/85 hover:bg-white text-[#0A1A5E] dark:text-[#E2E8F0] border border-white/60 dark:border-border font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm hover:-translate-y-0.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
    </div>
    </section>
  );
}
