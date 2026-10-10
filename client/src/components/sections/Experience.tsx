import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Database, Coffee, Globe, Code, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";

const experiences = [
  {
    role: "Open Source Contributor",
    company: "Elite Coders",
    period: "Present",
    summary: "Resolving Spring Boot issues and improving test coverage via GitHub PRs.",
    description:
      "Contributing to Elite Coders' open-source Java ecosystem. Resolved 4 issues including a Spring Boot request-mapping conflict (PR #112) and refactored DAO layer tests to increase coverage by 18%. Collaborating via GitHub Issues, code reviews, and async team standups.",
    link: "https://github.com/gopaljilab",
    defaultOpen: true,
    icon: Code,
  },
  {
    role: "Open Source Contributor",
    company: "Social Winter of Code 2025",
    period: "Nov 2025 – Jan 2026",
    summary: "Merged a pagination fix, documented 3 REST endpoints, onboarded 2 contributors.",
    description:
      "Selected as a contributor for WoC Social 2025. Shipped a fix for broken pagination in a React + Express admin dashboard (merged PR), added missing OpenAPI documentation for 3 REST endpoints, and onboarded 2 new contributors by improving the project's CONTRIBUTING.md.",
    link: "https://github.com/gopaljilab",
    defaultOpen: false,
    icon: Globe,
  },
  {
    role: "SQL Intern",
    company: "NativeSoftTech",
    period: "Mar 2025 – Apr 2025",
    summary: "Cut average query time from 2.1s to 340ms via indexing and query rewrites.",
    description:
      "Optimized slow-running queries on a 500k-row production table — reduced average query time from 2.1s to 340ms via indexing and query rewriting. Documented 12 stored procedures and assisted in migrating 3 legacy views to parameterized queries.",
    link: "",
    defaultOpen: false,
    icon: Database,
  },
  {
    role: "Java Intern",
    company: "NativeSoftTech",
    period: "Dec 2024 – Feb 2025",
    summary: "Built 6 REST endpoints, wrote JUnit 5 tests covering 80%+ of service logic.",
    description:
      "Built 6 RESTful API endpoints for an internal employee management module using Spring Boot 3 and Hibernate. Wrote JUnit 5 tests covering 80%+ of service-layer logic and fixed a critical NullPointerException in the JWT auth filter caught during QA.",
    link: "",
    defaultOpen: false,
    icon: Coffee,
  },
  {
    role: "Java with JSP Training",
    company: "Arcane Programming Infotech",
    period: "Jul 2023 – Sep 2023",
    summary: "Delivered a full CRUD student portal using JSP, Servlets and JDBC.",
    description:
      "Completed intensive training in Java Server Pages and MVC architecture. Delivered a full CRUD student-portal project using JSP, Servlets, and JDBC — graded as top performer in the cohort.",
    link: "",
    defaultOpen: false,
    icon: Briefcase,
  },
];

export function Experience() {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    new Set(
      experiences
        .map((e, i) => (e.defaultOpen ? i : -1))
        .filter((i) => i !== -1),
    ),
  );

  const toggle = (idx: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <Section id="experience" title="Work Experience" subtitle="My Journey">
      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-0 md:pl-8 space-y-8">
        {experiences.map((exp, index) => {
          const isOpen = openIndexes.has(index);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline dot */}
              <div
                className={`absolute -left-[41px] md:-left-[41px] top-4 w-12 h-12 rounded-full bg-white dark:bg-slate-900 border flex items-center justify-center z-10 transition-colors shadow-sm ${
                  isOpen
                    ? "border-primary/50 text-primary"
                    : "border-slate-200 dark:border-slate-700 text-slate-400"
                }`}
              >
                <exp.icon className="w-5 h-5" />
              </div>

              <TiltCard
                maxTilt={3.5}
                scale={1.01}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all group relative overflow-hidden shadow-sm"
              >
                {/* Left accent bar */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/0 group-hover:bg-primary/10 transition-colors" />

                {/* Header — always visible, clickable */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left px-6 py-5 md:px-8 flex items-start justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-300 border border-slate-100 dark:border-slate-700 whitespace-nowrap w-fit font-bold shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    {/* One-line summary — always visible when collapsed */}
                    {!isOpen && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {exp.summary}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 mt-1 text-slate-400 group-hover:text-primary transition-colors">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Expandable body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 md:px-8 md:pb-6 pt-0 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base mt-4">
                          {exp.description}
                        </p>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-primary hover:underline uppercase tracking-wider"
                          >
                            View Contributions{" "}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
