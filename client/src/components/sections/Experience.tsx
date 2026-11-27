import { Section } from "@/components/layout/Section";
import { Calendar, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  date: string;
  summary: string;
  description: string;
  skills: string[];
  logo: string;
  link?: string;
  type: "Open Source Leadership" | "Contributor" | "Internship" | "Training";
}

const experiences: ExperienceItem[] = [
  {
    id: "gssoc-2026",
    role: "Project Admin & Contributor",
    company: "GirlScript Summer of Code",
    date: "May 2026 – Aug 2026",
    type: "Open Source Leadership",
    summary: "Leading project administration, reviewing PRs, and mentoring contributors across Java & web modules.",
    description:
      "Serving as Project Admin and Open Source Contributor for GirlScript Summer of Code (GSSoC). Managing repository roadmaps, triaging incoming GitHub issues, mentoring cohort participants on best Git/Java practices, and reviewing pull requests for full-stack modules.",
    skills: ["Project Management", "Open Source", "Code Review", "Java", "Git & GitHub"],
    logo: "/experience/gssoc.png",
    link: "https://github.com/gopaljilab",
  },
  {
    id: "ecwoc-2026",
    role: "ECWoC'26 Contributor",
    company: "Elite Coders",
    date: "Jan 2026 – Feb 2026",
    type: "Contributor",
    summary: "Resolving Spring Boot issues and optimizing test coverage via GitHub PRs.",
    description:
      "Selected as contributor for Elite Coders Winter of Code (ECWoC'26). Resolved 4 key issues including Spring Boot request-mapping conflicts (PR #112) and refactored DAO layer tests to increase test coverage by 18%. Collaborated via distributed GitHub pull requests and code reviews.",
    skills: ["Java", "Spring Boot", "REST APIs", "JUnit 5", "GitHub PRs"],
    logo: "/experience/elite-coders.png",
    link: "https://github.com/gopaljilab",
  },
  {
    id: "swoc-2025",
    role: "Open Source Contributor",
    company: "Social Winter of Code 2025",
    date: "Nov 2025 – Jan 2026",
    type: "Contributor",
    summary: "Merged pagination fix, documented 3 REST endpoints, and onboarded contributors.",
    description:
      "Selected as a contributor for WoC Social 2025. Shipped a fix for broken pagination in a React + Express admin dashboard (merged PR), added missing OpenAPI documentation for 3 REST endpoints, and onboarded 2 new contributors by improving the project's CONTRIBUTING.md.",
    skills: ["React", "Express.js", "OpenAPI", "Git", "Open Source"],
    logo: "/experience/swoc.png",
    link: "https://github.com/gopaljilab",
  },
  {
    id: "nativesofttech-2024",
    role: "Java Intern",
    company: "NativeSoftTech",
    date: "Dec 2024 – Feb 2025",
    type: "Internship",
    summary: "Built 6 RESTful services in Spring Boot 3 with 80%+ test coverage.",
    description:
      "Built 6 RESTful API endpoints for an internal employee management module using Spring Boot 3 and Hibernate. Wrote JUnit 5 tests covering 80%+ of service-layer logic and fixed a critical NullPointerException in the JWT auth filter caught during QA.",
    skills: ["Java", "Spring Boot 3", "Hibernate", "JWT Auth", "JUnit 5"],
    logo: "/experience/nativesofttech.png",
  },
  {
    id: "arcane-2023",
    role: "Java with JSP Training",
    company: "Arcane Programming Infotech",
    date: "Jul 2023 – Sep 2023",
    type: "Training",
    summary: "Delivered student portal with JSP, Servlets, and JDBC architecture.",
    description:
      "Completed intensive training in Java Server Pages and MVC architecture. Delivered a full CRUD student-portal project using JSP, Servlets, and JDBC — graded as top performer in the cohort.",
    skills: ["Core Java", "JSP", "Servlets", "JDBC", "MVC Architecture"],
    logo: "/experience/arcane.png",
  },
];

export function Experience() {
  const reducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(Math.max(activeIndex, 0), experiences.length - 1);
  const currentExperience = experiences[safeIndex] ?? experiences[0];
  const year = currentExperience.date.match(/\d{4}/)?.[0];

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 55%"],
  });

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const entries = Array.from(timeline.children);
    let frame: number | null = null;
    const updateActiveEntry = () => {
      frame = null;
      const readingLine = window.innerHeight * 0.44;
      const currentIndex = entries.findIndex((entry) => entry.getBoundingClientRect().bottom > readingLine);
      setActiveIndex(currentIndex === -1 ? entries.length - 1 : currentIndex);
    };

    const scheduleUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(updateActiveEntry);
    };

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(timeline);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <Section
      id="experience"
      chapterNumber="03"
      subtitle="Career Ledger"
      title="Experience & Open Source"
      description="Java development, open-source contributions, and project mentorship."
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10 lg:gap-16">
        <div className="sticky top-20 z-20 self-start rounded-xl border border-border bg-card px-4 py-3 shadow-sm md:top-[30vh] md:border-0 md:bg-transparent md:p-0 md:shadow-none">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 md:block">
            <div className="relative h-[1.05em] min-w-[2.5em] overflow-hidden font-serif text-4xl leading-none tabular-nums text-primary sm:text-5xl md:text-[clamp(4rem,8vw,7rem)]">
              <span className="sr-only">{year}</span>
              <AnimatePresence initial={false}>
                <motion.span
                  key={year}
                  aria-hidden="true"
                  initial={reducedMotion ? false : { y: "85%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { y: "-85%", opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut" }}
                  className="absolute inset-x-0 top-0"
                >
                  {year}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="min-w-0 md:mt-3">
              <p className="text-sm font-semibold text-foreground md:text-base">{currentExperience.company}</p>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground md:text-xs">{currentExperience.date}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 md:max-w-52" aria-hidden="true">
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{String(safeIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}</span>
            <span className="h-px flex-1 bg-border">
              <span className="block h-full origin-left bg-primary motion-safe:transition-transform" style={{ transform: `scaleX(${(safeIndex + 1) / experiences.length})` }} />
            </span>
          </div>
        </div>

        <div className="relative ml-2">
          {!reducedMotion && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-8 bottom-8 w-[1.5px] origin-top bg-primary/70 z-0"
              style={{ scaleY: timelineProgress }}
            />
          )}
          <ol ref={timelineRef} className="relative [--entry-gap:2rem] md:[--entry-gap:3rem]">
          {experiences.map((exp, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={exp.id}
                aria-current={isActive ? "step" : undefined}
                className="relative pb-[var(--entry-gap)] pl-7 last:pb-0 sm:pl-10"
              >
                {index < experiences.length - 1 && (
                  <span aria-hidden="true" className={`absolute left-0 top-8 h-full w-px ${index < activeIndex ? "bg-primary/40" : "bg-border"}`} />
                )}
                <span
                  aria-hidden="true"
                  className={`absolute -left-1.5 top-[25px] z-10 size-3.5 rounded-full border-2 border-primary motion-safe:transition-colors ${isActive ? "bg-primary ring-4 ring-primary/15" : "bg-card"}`}
                />
                <motion.article
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`rounded-2xl border bg-card p-5 shadow-sm motion-safe:transition-colors sm:p-8 ${isActive ? "border-primary/60" : "border-border"}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-4 border-b border-border">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-1">
                        {exp.type}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-foreground font-normal tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-sans font-semibold text-foreground/90">
                          {exp.company}
                        </span>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`${exp.company} link`}
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground shrink-0 bg-secondary px-3 py-1 rounded-full border border-border">
                      <Calendar className="w-3 h-3 text-primary" />
                      <span>{exp.date}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2" aria-label="Skills applied">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-secondary text-foreground/80 border border-border font-mono text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
