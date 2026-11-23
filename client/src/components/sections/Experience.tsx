import { Section } from "@/components/layout/Section";
import { ExternalLink, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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
    id: "rd-infro-2025",
    role: "SQL Intern",
    company: "RD Infro Technology",
    date: "Mar 2025 – Apr 2025",
    type: "Internship",
    summary: "Optimized 500k-row queries: reduced average response from 2.1s to 340ms.",
    description:
      "Optimized slow-running queries on a 500k-row production table — reduced average query time from 2.1s to 340ms via indexing and query rewriting. Documented 12 stored procedures and assisted in migrating 3 legacy views to parameterized queries.",
    skills: ["SQL", "MySQL", "Query Optimization", "Indexing", "Stored Procedures"],
    logo: "/experience/rd-infro.png",
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
  return (
    <Section
      id="experience"
      chapterNumber="03"
      subtitle="Career Ledger"
      title="Experience & Open Source"
      description="Professional industry internships, distributed open-source governance, and enterprise Java development."
    >
      <div className="relative border-l border-border pl-5 sm:pl-8 ml-3 sm:ml-4 space-y-12 md:space-y-16">
        {experiences.map((exp, index) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, x: -16, y: 24 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-card border border-border rounded-2xl p-5 sm:p-8 shadow-xs hover:border-primary/50 transition-colors group"
          >
            {/* Timeline Dot Marker */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring" }}
              className="absolute -left-[27px] sm:-left-[39px] top-8 w-3.5 h-3.5 rounded-full bg-card border-2 border-primary group-hover:bg-primary transition-colors"
            />

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
        ))}
      </div>
    </Section>
  );
}
