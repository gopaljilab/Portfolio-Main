import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Terminal, Code2, Globe, Database, Coffee, Briefcase, LucideIcon } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  summary: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
  logo: string;
  link?: string;
  accentColor: string;
  accentGlow: string;
  badgeBorder: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Project Admin & Contributor",
    company: "GirlScript Summer of Code",
    date: "May 2026 – Aug 2026",
    summary: "Leading project administration, reviewing PRs, and mentoring contributors across Java & web modules.",
    description:
      "Serving as Project Admin and Open Source Contributor for GirlScript Summer of Code (GSSoC). Managing repository roadmaps, triaging incoming GitHub issues, mentoring cohort participants on best Git/Java practices, and reviewing pull requests for full-stack modules.",
    skills: ["Project Management", "Open Source", "Code Review", "Java", "Git & GitHub"],
    icon: Code2,
    logo: "/experience/gssoc.png",
    link: "https://github.com/gopaljilab",
    accentColor: "#f97316", // Warm Orange matching GirlScript branding
    accentGlow: "rgba(249, 115, 22, 0.28)",
    badgeBorder: "border-orange-500/40",
  },
  {
    role: "ECWoC'26 Contributor",
    company: "Elite Coders",
    date: "Jan 2026 – Feb 2026",
    summary: "Resolving Spring Boot issues and optimizing test coverage via GitHub PRs.",
    description:
      "Selected as contributor for Elite Coders Winter of Code (ECWoC'26). Resolved 4 key issues including Spring Boot request-mapping conflicts (PR #112) and refactored DAO layer tests to increase test coverage by 18%. Collaborated via distributed GitHub pull requests and code reviews.",
    skills: ["Java", "Spring Boot", "REST APIs", "JUnit 5", "GitHub PRs"],
    icon: Code2,
    logo: "/experience/elite-coders.png",
    link: "https://github.com/gopaljilab",
    accentColor: "#f43f5e", // Rose/Pink accent matching the mascot
    accentGlow: "rgba(244, 63, 94, 0.28)",
    badgeBorder: "border-rose-500/40",
  },
  {
    role: "Open Source Contributor",
    company: "Social Winter of Code 2025",
    date: "Nov 2025 – Jan 2026",
    summary: "Merged pagination fix, documented 3 REST endpoints, and onboarded contributors.",
    description:
      "Selected as a contributor for WoC Social 2025. Shipped a fix for broken pagination in a React + Express admin dashboard (merged PR), added missing OpenAPI documentation for 3 REST endpoints, and onboarded 2 new contributors by improving the project's CONTRIBUTING.md.",
    skills: ["React", "Express.js", "OpenAPI", "Git", "Open Source"],
    icon: Globe,
    logo: "/experience/swoc.png",
    link: "https://github.com/gopaljilab",
    accentColor: "#3b82f6", // Tech Blue
    accentGlow: "rgba(59, 130, 246, 0.28)",
    badgeBorder: "border-blue-500/40",
  },
  {
    role: "SQL Intern",
    company: "RD Infro Technology",
    date: "Mar 2025 – Apr 2025",
    summary: "Optimized 500k-row queries: reduced average response from 2.1s to 340ms.",
    description:
      "Optimized slow-running queries on a 500k-row production table — reduced average query time from 2.1s to 340ms via indexing and query rewriting. Documented 12 stored procedures and assisted in migrating 3 legacy views to parameterized queries.",
    skills: ["SQL", "MySQL", "Query Optimization", "Indexing", "Stored Procedures"],
    icon: Database,
    logo: "/experience/rd-infro.png",
    accentColor: "#06b6d4", // Cyan
    accentGlow: "rgba(6, 182, 212, 0.28)",
    badgeBorder: "border-cyan-500/40",
  },
  {
    role: "Java Intern",
    company: "NativeSoftTech",
    date: "Dec 2024 – Feb 2025",
    summary: "Built 6 RESTful services in Spring Boot 3 with 80%+ test coverage.",
    description:
      "Built 6 RESTful API endpoints for an internal employee management module using Spring Boot 3 and Hibernate. Wrote JUnit 5 tests covering 80%+ of service-layer logic and fixed a critical NullPointerException in the JWT auth filter caught during QA.",
    skills: ["Java", "Spring Boot 3", "Hibernate", "JWT Auth", "JUnit 5"],
    icon: Coffee,
    logo: "/experience/nativesofttech.png",
    accentColor: "#f59e0b", // Amber/Gold
    accentGlow: "rgba(245, 158, 11, 0.26)",
    badgeBorder: "border-amber-500/40",
  },
  {
    role: "Java with JSP Training",
    company: "Arcane Programming Infotech",
    date: "Jul 2023 – Sep 2023",
    summary: "Delivered student portal with JSP, Servlets, and JDBC architecture.",
    description:
      "Completed intensive training in Java Server Pages and MVC architecture. Delivered a full CRUD student-portal project using JSP, Servlets, and JDBC — graded as top performer in the cohort.",
    skills: ["Core Java", "JSP", "Servlets", "JDBC", "MVC Architecture"],
    icon: Briefcase,
    logo: "/experience/arcane.png",
    accentColor: "#6366f1", // Indigo/Blue matching the logo
    accentGlow: "rgba(99, 102, 241, 0.26)",
    badgeBorder: "border-indigo-500/40",
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax transformations synced to scroll progress
  const logoY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = experiences.length;
    const progressPerItem = 1 / total;
    let index = Math.floor(latest / progressPerItem);
    if (index >= total) index = total - 1;
    if (index < 0) index = 0;
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const activeExp = experiences[activeIndex];

  return (
    <section id="experience" ref={containerRef} className="relative h-[360vh] w-full bg-slate-50 dark:bg-[#070b14] transition-colors">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* ================= BACKGROUND BRAND WATERMARK & GLOW LAYER ================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center md:justify-end pr-0 md:pr-12 z-0">
          
          {/* Dynamic Radial Ambient Glow */}
          <motion.div
            key={`glow-${activeExp.company}-${activeExp.role}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute w-[340px] h-[340px] md:w-[580px] md:h-[580px] rounded-full blur-[140px] pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeExp.accentGlow} 0%, rgba(0,0,0,0) 70%)`,
            }}
          />

          {/* Futuristic Orbital Decorative Ring */}
          <motion.div
            style={{ rotate: ringRotate }}
            className="absolute w-[300px] h-[300px] md:w-[520px] md:h-[520px] rounded-full border border-slate-300/40 dark:border-white/[0.05] pointer-events-none flex items-center justify-center"
          >
            <div className="w-[84%] h-[84%] rounded-full border border-dashed border-slate-400/30 dark:border-white/[0.06] animate-[spin_80s_linear_infinite]" />
            <div
              className="absolute top-0 w-3 h-3 rounded-full blur-[1px]"
              style={{ backgroundColor: activeExp.accentColor, opacity: 0.85 }}
            />
          </motion.div>

          {/* Brand Logo Watermark with smooth transition & parallax */}
          <motion.div
            style={{ y: logoY, rotate: logoRotate, scale: logoScale }}
            className="relative z-0 flex items-center justify-center w-[240px] h-[240px] md:w-[440px] md:h-[440px] select-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeExp.company}-${activeExp.role}`}
                initial={{ opacity: 0, scale: 0.82, filter: "blur(14px)", y: 15 }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, scale: 1.12, filter: "blur(14px)", y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex flex-col items-center justify-center p-4"
              >
                <div className={`relative w-44 h-44 md:w-72 md:h-72 rounded-2xl p-4 flex items-center justify-center overflow-hidden backdrop-blur-sm border border-white/10 shadow-2xl ${activeExp.company === "NativeSoftTech" ? "bg-slate-900/90 dark:bg-black/60" : "bg-white/10 dark:bg-black/30"}`}>
                  <img
                    src={activeExp.logo}
                    alt={`${activeExp.company} official logo`}
                    className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                    loading="lazy"
                  />
                </div>
                <div
                  className="mt-4 px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase border font-semibold backdrop-blur-sm"
                  style={{
                    borderColor: `${activeExp.accentColor}50`,
                    color: activeExp.accentColor,
                    backgroundColor: `${activeExp.accentColor}15`,
                  }}
                >
                  {activeExp.company}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ================= FOREGROUND CONTENT LAYER ================= */}
        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 relative z-10 py-4">
          
          {/* Header Column */}
          <div className="lg:w-5/12 flex flex-col justify-center">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Career Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Work Experience.
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 font-normal text-sm md:text-base leading-relaxed max-w-md">
              Scroll through my journey across open-source communities, real-world backend engineering, and database optimization roles.
            </p>

            {/* Quick Milestone Summary Bar */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Active Milestone
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-200">
                  {activeIndex + 1} of {experiences.length} • {activeExp.role}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose an experience">
              {experiences.map((experience, index) => (
                <button
                  key={`${experience.company}-${experience.role}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${experience.role} at ${experience.company}`}
                  aria-pressed={activeIndex === index}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                    activeIndex === index
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 bg-white text-slate-500 hover:border-primary/50 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline List Column */}
          <div className="lg:w-7/12 flex flex-col justify-center gap-3 sm:gap-4 relative w-full">
            
            {/* Continuous vertical progress bar */}
            <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-slate-200 dark:bg-slate-800">
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{
                  backgroundColor: activeExp.accentColor,
                  height: `${(activeIndex / (experiences.length - 1)) * 100}%`,
                  transition: "height 0.35s ease-out, background-color 0.4s ease",
                }}
              />
            </div>

            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`pl-7 sm:pl-8 relative cursor-pointer transition-all duration-500 ease-in-out ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-40 hover:opacity-70 scale-[0.98] blur-[0.3px]"
                  }`}
                >
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute left-[-5px] top-2.5 w-3 h-3 rounded-full transition-all duration-500 ${
                      isActive ? "scale-125" : "bg-slate-400 dark:bg-slate-700"
                    }`}
                    style={{
                      backgroundColor: isActive ? exp.accentColor : undefined,
                      boxShadow: isActive ? `0 0 14px ${exp.accentColor}` : "none",
                    }}
                  />

                  {/* Header Row: Date & Company Logo Badge */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className="font-mono text-xs md:text-sm tracking-wider font-semibold transition-colors duration-300"
                      style={{ color: isActive ? exp.accentColor : undefined }}
                    >
                      {exp.date}
                    </span>

                    {/* Company Logo Badge */}
                    <div
                      className={`px-2 py-1 rounded-md border text-[11px] font-mono flex items-center gap-2 transition-all duration-300 ${
                        isActive
                          ? `${exp.badgeBorder} bg-white dark:bg-slate-900 shadow-sm font-bold`
                          : "border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 text-slate-500"
                      }`}
                      style={{ color: isActive ? exp.accentColor : undefined }}
                    >
                      <div className={`w-4 h-4 rounded overflow-hidden flex items-center justify-center shrink-0 ${exp.company === "NativeSoftTech" ? "bg-slate-900" : "bg-white/90"}`}>
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-full h-full object-contain p-0.5"
                        />
                      </div>
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {exp.role}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {exp.company}
                  </p>

                  {/* Expandable Body */}
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-600 dark:text-slate-300 mt-2 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                      {exp.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3 mb-1">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono rounded-md hover:border-primary/50 transition-colors shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* GitHub / Contribution Link */}
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold uppercase tracking-wider transition-colors hover:underline"
                        style={{ color: exp.accentColor }}
                      >
                        View Contributions <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
