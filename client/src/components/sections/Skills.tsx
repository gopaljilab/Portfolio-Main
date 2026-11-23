import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";

const ICONS: Record<string, string> = {
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
};

interface Skill {
  name: string;
  role: string;
  level?: "learning";
}

const skillGroups: {
  title: string;
  categoryNumber: string;
  description: string;
  skills: Skill[];
  summaryNote?: string;
  deploymentHighlights?: { title: string; desc: string }[];
}[] = [
  {
    title: "Daily Production Stack",
    categoryNumber: "01",
    description: "Technologies I build with daily across full-stack production projects",
    skills: [
      { name: "Java", role: "Backend Core & OOP" },
      { name: "Spring Boot", role: "REST APIs & Services" },
      { name: "React", role: "SPA & State Management" },
      { name: "JavaScript", role: "Modern ES6+ Logic" },
      { name: "TypeScript", role: "Type Safety & Interfaces" },
      { name: "SQL", role: "Relational Queries" },
      { name: "MySQL", role: "Database Architecture" },
      { name: "Tailwind CSS", role: "Utility Design System" },
    ],
  },
  {
    title: "Proficient Tools & Workflows",
    categoryNumber: "02",
    description: "Foundational standards, version control, and design tooling",
    skills: [
      { name: "HTML5", role: "Semantic Structure" },
      { name: "CSS3", role: "Layouts & Animations" },
      { name: "Git", role: "Branching & Versioning" },
      { name: "GitHub", role: "CI/CD & Open Source" },
      { name: "Figma", role: "UI/UX & Prototyping" },
      { name: "Postman", role: "API Testing & Docs" },
    ],
  },
  {
    title: "Cloud & Containerization",
    categoryNumber: "03",
    description: "Multi-container orchestration, microservice isolation, and cloud deployment pipelines",
    skills: [
      { name: "Docker", role: "Multi-Stage Builds & Compose" },
      { name: "AWS", role: "Cloud Services & Hosting (Active Learning)" },
    ],
    deploymentHighlights: [
      {
        title: "Microservice Isolation",
        desc: "Docker Compose multi-service networks linking FastAPI inference gateways with React SOC frontends and Nginx reverse proxies.",
      },
      {
        title: "Reproducible Builds",
        desc: "Alpine-based multi-stage container builds ensuring sub-100MB production runtimes with zero toolchain artifact bleed.",
      },
      {
        title: "Continuous CI/CD Delivery",
        desc: "GitHub Actions automated workflows running JUnit 5, PyTest, and Vite bundle validations on pull requests.",
      },
    ],
  },
];

const technicalRelationships = [
  { from: "Java", to: "Spring Boot", label: "Framework Foundation", projectAnchor: "#projects" },
  { from: "Spring Boot", to: "MySQL", label: "ORM / JDBC Persistence", projectAnchor: "#projects" },
  { from: "TypeScript", to: "React", label: "Component Architecture", projectAnchor: "#projects" },
  { from: "Git", to: "GitHub", label: "Distributed PR Workflows", projectAnchor: "#experience" },
];

function SkillIcon({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const src = ICONS[name];

  if (!src || failed) {
    return (
      <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary font-mono text-xs font-semibold">
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-105"
      loading="lazy"
    />
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      chapterNumber="02"
      subtitle="Technical Index"
      title="Tools of the trade."
      description="Engineering fundamentals grounded in Object-Oriented Programming, Data Structures, Relational Database Management, and scalable Web Architecture."
      darker
    >
      <div className="space-y-12">
        {/* Architectural Relationships Field-Guide Strip (Interactive) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              System Design Pipeline &amp; Architectural Connections
            </span>
            <span className="text-[11px] font-mono text-primary/80 hidden sm:inline-block">
              Click to view referenced builds →
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {technicalRelationships.map((rel) => (
              <a
                key={rel.from + rel.to}
                href={rel.projectAnchor}
                className="p-3.5 rounded-lg bg-secondary/50 hover:bg-secondary border border-border/80 hover:border-primary/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs group cursor-pointer"
                title={`Explore ${rel.from} → ${rel.to} implementation in portfolio`}
              >
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{rel.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{rel.to}</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-sans leading-tight">{rel.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* 3 Grouped Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between h-full"
            >
              <div>
                {/* Header */}
                <div className="pb-4 mb-5 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                      Section / {group.categoryNumber}
                    </span>
                    {group.title.includes("Cloud") && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono uppercase tracking-wider">
                        Production &amp; Expansion
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-foreground font-normal">
                    {group.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans mt-1">
                    {group.description}
                  </p>
                </div>

                {/* Skill Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-secondary/30 hover:bg-secondary/70 border border-border/80 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <SkillIcon name={skill.name} />
                        <div>
                          <div className="text-sm font-sans font-medium text-foreground flex items-center gap-2">
                            <span>{skill.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground block">
                            {skill.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section 03 Deployment & Orchestration Highlights (Fills vertical balance) */}
                {group.deploymentHighlights && (
                  <div className="mt-5 pt-5 border-t border-border space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold block">
                      Production Orchestration Principles
                    </span>
                    <div className="space-y-2.5">
                      {group.deploymentHighlights.map((hl) => (
                        <div key={hl.title} className="p-3 rounded-xl bg-secondary/40 border border-border/70 text-xs">
                          <span className="font-mono font-semibold text-foreground text-[11px] block mb-0.5">
                            {hl.title}
                          </span>
                          <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">
                            {hl.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
