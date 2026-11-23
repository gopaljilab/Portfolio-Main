import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ChevronDown, FileText, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";

type FilterKey = "All" | "Full Stack" | "AI & ML" | "Security" | "Web3";

interface Project {
  id: string;
  number: string;
  title: string;
  category: FilterKey;
  tagline: string;
  description: string;
  problem: string;
  outcome: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  documentation?: string;
}

const projects: Project[] = [
  {
    id: "gavs-munim",
    number: "01",
    title: "GAVS-MUNIM — AI Procurement & Profitability Engine",
    category: "Full Stack",
    tagline: "Java 21 · Spring Boot 4 · PostgreSQL · React 18 · TypeScript",
    description:
      "A mission-critical procurement, commercial quotation, and continuous supplier intelligence platform engineered for MSME sheet-metal fabrication factories to stop raw-material overpayment and unprofitable quoting.",
    problem:
      "Small manufacturing workshops fly blind on volatile metal pricing, quote customer RFQs at net losses due to hidden cutting/scrap overheads, and lack verifiable supplier lead-time and quality tracking.",
    outcome:
      "Engineered an advisory AI quote engine paired with deterministic Java arithmetic, SHA-256 sealed approval gates, 4-pillar supplier intelligence ratings, and 171 passing backend tests.",
    image: "/gavs-munim.png",
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "React", "TypeScript", "Docker"],
    link: "",
    github: "https://github.com/gopaljilab/GAVS-MUNIM",
    documentation: "https://github.com/gopaljilab/GAVS-MUNIM#readme",
  },
  {
    id: "clinical-insight-engine",
    number: "02",
    title: "Clinical Insight Engine",
    category: "AI & ML",
    tagline: "Python · React 18 · Express · PostgreSQL · Scikit-Learn · GSSoC'26",
    description:
      "A clinical decision support platform surfacing early, interpretable diabetes risk signals from patient physiological data with dedicated physician and patient analytics modes.",
    problem:
      "Clinicians lack rapid, interpretable risk stratification tools during routine consultations, while patients struggle with opaque medical jargon and uncontextualized diagnostic lab numbers.",
    outcome:
      "Built an interpretable scikit-learn ML pipeline with SHAP-style factor importance, dual clinician/patient dashboards, interactive scenario simulations, and full GSSoC 2026 open-source governance.",
    image: "/clinical-insight.png",
    tags: ["Python", "Machine Learning", "React", "Express.js", "PostgreSQL", "Healthcare"],
    link: "",
    github: "https://github.com/gopaljilab/Clinical-Insight-Engine",
    documentation: "https://github.com/gopaljilab/Clinical-Insight-Engine#readme",
  },
  {
    id: "netshield",
    number: "03",
    title: "NetShield — AI Network Intrusion Detection System",
    category: "Security",
    tagline: "FastAPI · XGBoost · React 18 · TypeScript · Vite · Docker",
    description:
      "A high-throughput defensive security telemetry platform classifying high-velocity network packet flows into Benign or Malicious attack vectors in sub-10ms real-time latency.",
    problem:
      "Modern SOCs face overwhelming telemetry volume and high false-positive alerts, while legacy rule-based firewalls fail against zero-day packet anomalies and polymorphic DDoS/Infiltration attacks.",
    outcome:
      "Trained zero-leakage XGBoost & Random Forest models on CIC-IDS2017 with sub-10ms FastAPI inference, live interactive SOC packet simulator, and 70/70 comprehensive test coverage.",
    image: "/netshield.png",
    tags: ["FastAPI", "Python", "XGBoost", "React", "TypeScript", "Cybersecurity", "Docker"],
    link: "",
    github: "https://github.com/gopaljilab/NetShield",
    documentation: "https://github.com/gopaljilab/NetShield#readme",
  },
  {
    id: "mealsync",
    number: "04",
    title: "MealSync — Intelligent Food Management Platform",
    category: "Full Stack",
    tagline: "React 19 · TypeScript 5 · Express 5 · PostgreSQL 16 · Drizzle ORM",
    description:
      "A smart food management and redistribution platform for hostels and shared-living communities that predicts demand, tracks kitchen waste analytics, and automates surplus redistribution to partner NGOs.",
    problem:
      "Hostels and PGs face chronic 20-35% daily food waste due to unpredictable attendance, uncoordinated bulk purchasing, and zero direct linkage to nearby food-rescue organizations.",
    outcome:
      "Engineered automated meal-confirmation flows, dynamic quantity forecasting, multi-stakeholder dashboards (Resident, PG Owner, NGO), and audit-ready food donation tracking.",
    image: "/mealsync.png",
    tags: ["React 19", "TypeScript", "Express 5", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    link: "",
    github: "https://github.com/gopaljilab/MealSync",
    documentation: "https://github.com/gopaljilab/MealSync#readme",
  },
  {
    id: "om-restaurant",
    number: "05",
    title: "Om Restaurant Management System",
    category: "Full Stack",
    tagline: "Java · Spring Boot · MySQL · React",
    description:
      "A full-featured restaurant management platform handling orders, inventory tracking, staff management, and real-time analytics dashboards.",
    problem:
      "Restaurant staff relied on paper-based order slips and manual inventory counts — leading to errors and slow service.",
    outcome:
      "Reduced order-handling steps from 5 to 2. Full CRUD across 6 entities with Spring Boot REST APIs and a React SPA front end.",
    image: "/OM.jpg",
    tags: ["Java", "Spring Boot", "MySQL", "React", "REST API"],
    link: "https://omrestaurant.vercel.app/",
    github: "https://github.com/gopaljilab/OmRestaurant",
  },
  {
    id: "samarth-loan",
    number: "06",
    title: "SamarthLoan — Smart Credit Navigator",
    category: "Full Stack",
    tagline: "React · Tailwind CSS · EMI Engine · Multilingual",
    description:
      "A public-service companion that turns India's confusing government loan schemes into a clear path — find your scheme, calculate EMI, and track your application, all in English, Hindi, or Kannada.",
    problem:
      "First-generation entrepreneurs and students couldn't navigate MUDRA, Standup India, and other schemes without a facilitator. Most platforms are English-only and jargon-heavy.",
    outcome:
      "Built a multilingual (EN/HI/KN) React SPA with a live EMI calculator, scheme-matching engine, application tracker, and a 'Talk to a Sathi' facilitator chat. Live on Netlify.",
    image: "/SamarthLoan.png",
    tags: ["React", "Tailwind CSS", "i18n", "EMI Calculator", "Public Service"],
    link: "https://samarthloan.netlify.app/",
    github: "https://github.com/gopaljilab/SamarthLoan",
    documentation: "https://github.com/gopaljilab/SamarthLoan/blob/main/docs/phase-2-architecture.md",
  },
  {
    id: "ncvet-blockchain",
    number: "07",
    title: "NCVET-BlockChain Certification System",
    category: "Web3",
    tagline: "React · Web3.js · Chart.js",
    description:
      "A blockchain-enabled platform providing tamper-proof, instantly verifiable digital credentials for India's vocational education ecosystem.",
    problem:
      "India's NCVET ecosystem faced certificate forgery, manual verification delays, and lack of interoperability between institutions.",
    outcome:
      "Built a React + Web3.js UI that reads/writes credentials on-chain. Includes a Chart.js analytics dashboard and live credential-lookup flow.",
    image: "/NCVET.jpg",
    tags: ["React", "Web3.js", "Chart.js", "Blockchain", "API"],
    link: "https://www.figma.com/make/AB1LEuPmvUhr1fMaDX3q3w/Blockchain-Certificate-Platform-Prototype?fullscreen=1&t=rLkYbttE95UaCYCf-1",
    github: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System",
    documentation: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System/blob/main/docs/architecture.md",
  },
];

const FILTERS: FilterKey[] = ["All", "Full Stack", "AI & ML", "Security", "Web3"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const toggleCaseStudy = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Section
      id="projects"
      chapterNumber="01"
      subtitle="Selected Works"
      title="Architecture & Engineering"
      description="Production software, client solutions, and technical prototypes built with Java Spring Boot, React, and modern system architectures."
    >
      <div>
        {/* Editorial Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-border/80" role="tablist" aria-label="Project category filters">
          {FILTERS.map((cat) => {
            const isActive = activeFilter === cat;
            const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                aria-pressed={isActive}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs ring-2 ring-primary/20 scale-[1.02]"
                    : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60"
                }`}
              >
                {cat}
                <span className={`ml-1.5 text-[10px] ${isActive ? "text-primary-foreground/90 font-bold" : "opacity-60"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Gallery - Editorial Layout */}
        <div className="space-y-12 md:space-y-16">
          {visibleProjects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            const isFeatured = index === 0 && activeFilter === "All";

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border rounded-2xl overflow-hidden p-6 sm:p-8 lg:p-10 shadow-sm transition-all hover:border-primary/40 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left: Project Imagery with Architectural Framing (6 cols or 7 cols) */}
                  <div className={`w-full ${isFeatured ? "lg:col-span-7" : "lg:col-span-6"} order-1`}>
                    <div className="relative rounded-xl overflow-hidden border border-border bg-secondary aspect-[16/10] group-hover:border-primary/30 transition-colors">
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
                          project.id === "om-restaurant" ? "object-cover object-center" : "object-cover object-top"
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-xs border border-border px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest text-foreground">
                        {project.number} / {project.category}
                      </div>
                    </div>
                  </div>

                  {/* Right: Project Storytelling & Action Links (6 cols or 5 cols) */}
                  <div className={`w-full ${isFeatured ? "lg:col-span-5" : "lg:col-span-6"} order-2`}>
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs text-primary font-medium tracking-wide">
                      <span>{project.tagline}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground font-normal tracking-tight mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Technology Chips */}
                    <div className="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-secondary text-foreground/80 border border-border/80 font-mono text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links & Expandable Case Study Button */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-border">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-xs"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : null}

                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Codebase</span>
                        </a>
                      ) : null}

                      {project.documentation ? (
                        <a
                          href={project.documentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-primary" />
                          <span>Docs</span>
                        </a>
                      ) : null}

                      <button
                        onClick={() => toggleCaseStudy(project.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`case-study-${project.id}`}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all border ${
                          isExpanded
                            ? "bg-secondary text-foreground border-primary/50 shadow-xs"
                            : "bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
                        } sm:ml-auto cursor-pointer`}
                      >
                        <span>{isExpanded ? "Hide Details" : "Read Breakdown"}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180 text-primary" : ""}`} />
                      </button>
                    </div>

                    {/* Expandable Case Study Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={`case-study-${project.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="mt-6 pt-5 border-t border-border overflow-hidden"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                              <span className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground font-semibold block mb-1">
                                The Challenge
                              </span>
                              <p className="text-foreground leading-relaxed">
                                {project.problem}
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                              <span className="font-mono uppercase tracking-wider text-[10px] text-primary font-semibold block mb-1">
                                Technical Outcome
                              </span>
                              <p className="text-foreground leading-relaxed">
                                {project.outcome}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
