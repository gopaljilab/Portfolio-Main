import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

const istTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function BengaluruClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <p className="mt-1 font-mono text-xs tabular-nums text-muted-foreground">
      <time dateTime={now.toISOString()}>{istTime.format(now)}</time> IST
    </p>
  );
}

const verseLines = [
  [
    { sanskrit: "काकचेष्टा", roman: "Kāka-ceṣṭā", meaning: "Persist like a crow." },
    { sanskrit: "बको ध्यानं", roman: "Bako dhyānaṃ", meaning: "Focus like a heron." },
    { sanskrit: "श्वाननिद्रा तथैव च\u00a0।", roman: "Śvāna-nidrā tathaiva ca", meaning: "Sleep lightly like a dog." },
  ],
  [
    { sanskrit: "अल्पहारी", roman: "Alpāhārī", meaning: "Eat in moderation." },
    { sanskrit: "गृहत्यागी", roman: "Gṛhatyāgī", meaning: "Leave familiar comforts to learn." },
    { sanskrit: "विद्यार्थी पञ्च लक्षणम्\u00a0॥", roman: "Vidyārthī pañca lakṣaṇam", meaning: "The five marks of a learner." },
  ],
];

function SanskritPlaque() {
  const plaqueId = useId();
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const meaning = hovered ?? focused ?? selected;

  const plaqueRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!meaning) return;

    const dismissMeaning = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      setHovered(null);
      setFocused(null);
      setSelected(null);
    };

    window.addEventListener("keydown", dismissMeaning);
    return () => window.removeEventListener("keydown", dismissMeaning);
  }, [meaning]);

  useLayoutEffect(() => {
    const plaque = plaqueRef.current;
    if (!plaque) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (forced-colors: none)", () => {
      const lines = plaque.querySelectorAll<HTMLElement>(".sanskrit-ink-line");
      const translation = plaque.querySelector("figcaption");
      if (!translation) return;

      gsap.set(lines, { "--pen-progress": "0%", "--pen-opacity": 0 });
      gsap.set(plaque.querySelectorAll(".sanskrit-phrase-script"), { "--ink-progress": "0%" });
      gsap.set(translation, { opacity: 0, y: 12 });
      const reveal = gsap.timeline({
        scrollTrigger: { trigger: plaque, start: "top 80%", once: true },
      });

      lines.forEach((line) => {
        const phrases = line.querySelectorAll(".sanskrit-phrase-script");
        reveal
          .to(line, { "--pen-opacity": 1, duration: 0.2, ease: "sine.out" })
          .to(line, { "--pen-progress": "100%", duration: 1.55, ease: "sine.inOut" })
          .to(phrases, { "--ink-progress": "100%", duration: 0.65, stagger: 0.45, ease: "sine.inOut" }, "<")
          .to(line, { "--pen-opacity": 0, duration: 0.22, ease: "sine.in" }, "-=0.06");
      });

      reveal.to(translation, { opacity: 1, y: 0, duration: 0.55, ease: "sine.out" });
    });

    return () => media.revert();
  }, []);

  return (
    <figure ref={plaqueRef} className="py-9 text-center sm:px-8 sm:py-14 lg:px-12">
      <div className="sanskrit-plaque relative mx-auto max-w-5xl border px-2 pb-6 pt-10 sm:px-12 sm:py-10">
        <span className="sanskrit-plaque-hole sanskrit-plaque-hole-left" aria-hidden="true" />
        <span className="sanskrit-plaque-hole sanskrit-plaque-hole-right" aria-hidden="true" />
        <svg className="sanskrit-plaque-cord" viewBox="0 0 100 70" fill="none" aria-hidden="true" focusable="false">
          <path d="M 98 4 C 63 5 45 17 29 37 C 20 48 15 58 9 63" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="9" cy="63" r="3.6" fill="currentColor" />
          <path d="M 9 64 L 4 68 M 9 64 L 10 69 M 9 64 L 14 67" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <blockquote aria-label="Sanskrit verse with phrase meanings" className="mx-auto grid gap-1 sm:gap-3">
          {verseLines.map((line, lineIndex) => (
            <div key={line[0].sanskrit} className="sanskrit-ink-line grid grid-cols-2 gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.65fr)] sm:gap-x-3">
              {line.map((phrase, phraseIndex) => {
                const isActive = meaning === phrase.meaning;
                const tooltipId = `${plaqueId}-${lineIndex}-${phraseIndex}`;

                return (
                  <div
                    key={phrase.sanskrit}
                    className={`relative flex min-w-0 justify-center last:col-span-2 sm:last:col-span-1 ${isActive ? "z-10" : ""}`}
                    onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(phrase.meaning); }}
                    onPointerLeave={() => setHovered(null)}
                  >
                    <button
                      type="button"
                      aria-pressed={selected === phrase.meaning}
                      aria-describedby={tooltipId}
                      data-cursor="Open"
                      data-cursor-tone="neutral"
                      data-active={isActive}
                      onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setFocused(phrase.meaning); }}
                      onBlur={() => setFocused(null)}
                      onClick={() => setSelected((current) => current === phrase.meaning ? null : phrase.meaning)}
                      className="sanskrit-phrase w-full rounded-xl px-2 py-2 sm:px-3 sm:py-3"
                    >
                      <span lang="sa" className="sanskrit-script sanskrit-phrase-script block text-[clamp(1.3rem,3.4vw,2.65rem)] leading-relaxed">{phrase.sanskrit}</span>
                      <span lang="sa-Latn" className="block font-serif text-base italic leading-tight opacity-80 sm:text-xl">{phrase.roman}</span>
                    </button>
                    <span
                      id={tooltipId}
                      role="tooltip"
                      hidden={!isActive}
                      className="absolute bottom-full left-1/2 w-max max-w-36 -translate-x-1/2 rounded-md bg-[#332219] px-3 py-1.5 font-sans text-sm font-medium leading-snug text-[#fff2d7] shadow-md after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-x-[6px] after:border-t-[6px] after:border-x-transparent after:border-t-[#332219] sm:max-w-48 lg:max-w-56"
                    >
                      {phrase.meaning}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </blockquote>
      </div>
      <figcaption className="mx-auto mt-6 max-w-3xl space-y-2 px-2 sm:mt-8">
        <p className="font-serif text-xl italic leading-snug text-foreground sm:text-3xl">
          The five marks of a true student: effort like a crow, focus like a heron, light sleep like a dog, eating in moderation, and stepping away from comfort and distractions.
        </p>
        <p className="font-mono text-xs text-muted-foreground">Sanskrit Subhashita · Five Marks of a Learner</p>
        <p className="font-mono text-xs text-muted-foreground">Shared with me by my father</p>
      </figcaption>
    </figure>
  );
}

export function Footer() {
  const lenisRef = useLenis();

  const scrollToTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 0.9 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  };

  return (
    <footer className="py-12 border-t border-border bg-card/80 transition-colors overflow-x-clip w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <section aria-label="Closing notes">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-b border-border pb-7 sm:grid-cols-3 lg:grid-cols-[0.75fr_0.9fr_1.35fr_2fr] lg:gap-x-8 lg:pb-10">
            <div>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">Talk</h2>
              <a href="https://www.linkedin.com/in/guptagopal001/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm hover:text-primary">
                LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
            <div>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">More work</h2>
              <a href="https://github.com/gopaljilab" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm hover:text-primary">
                GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">Based in</h2>
              <p className="text-sm">Bengaluru, Karnataka</p>
              <BengaluruClock />
            </div>
            <div className="col-span-2 border-l-2 border-primary/45 pl-4 sm:col-span-3 lg:col-span-1">
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">A note from Gopal</h2>
              <p className="max-w-sm font-serif text-xl leading-snug">
                I like building things that are easy to use and easy to maintain.
              </p>
            </div>
          </div>

          <SanskritPlaque />

          <div className="grid gap-2 border-t border-border py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:pt-0.5">Colophon</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Built by Gopal Gupta in Bengaluru with React, TypeScript, Vite, and Tailwind CSS.
              Set in Instrument Serif, DM Sans, and JetBrains Mono, with Tiro Devanagari Hindi on the Sanskrit plaque.
            </p>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-border pt-5">
          <p className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} Gopal Gupta</p>
          <button type="button" onClick={scrollToTop} className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2 text-sm hover:text-primary">
            Back to Top <ArrowUp className="size-3.5 text-primary" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
