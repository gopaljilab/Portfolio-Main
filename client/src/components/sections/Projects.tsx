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
    title: "NCVET Blockchain Certification System",
    category: "Web3",
    tagline: "React · Web3.js · Sepolia Testnet · IPFS · Hardhat",
    description:
      "A decentralized credentialing platform engineered to eliminate certificate forgery and manual verification delays in India's vocational education ecosystem with tamper-proof, instantly verifiable on-chain digital credentials.",
    problem:
      "India's vocational education ecosystem faces rampant certificate forgery, multi-day manual verification delays, and a critical lack of cross-institution interoperability between training providers and employers.",
    outcome:
      "Engineered an immutable credentialing pipeline on the Sepolia Ethereum testnet with decentralized IPFS document storage, MetaMask wallet signing, instant QR-code verification, and multi-language support (English and Hindi).",
    image: "/NCVET.jpg",
    tags: ["React", "Web3.js", "Ethereum", "IPFS", "Hardhat", "Sepolia", "Smart Contracts"],
    link: "https://www.figma.com/make/AB1LEuPmvUhr1fMaDX3q3w/Blockchain-Certificate-Platform-Prototype?fullscreen=1&t=rLkYbttE95UaCYCf-1",
    github: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System",
    documentation: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System#readme",
  },
];

const FILTERS: FilterKey[] = ["All", "Full Stack", "AI & ML", "Security", "Web3"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [activeTabId, setActiveTabId] = useState<string>(projects[0].id);

  // If activeFilter doesn't match activeTabId, auto-select first available project in filter
  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Keep active project valid
  const currentProject =
    visibleProjects.find((p) => p.id === activeTabId) || visibleProjects[0] || projects[0];

  const toggleCaseStudy = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Distinct but restrained accents for the 7 folder tabs (Nordic Paper palette)
  const tabAccents: Record<string, { bg: string; text: string; border: string; badge: string }> = {
    "gavs-munim": {
      bg: "bg-[#EAE0D2] dark:bg-[#2A241E]",
      text: "text-[#5C3D2E] dark:text-[#E8C4A2]",
      border: "border-[#D6C4B0] dark:border-[#42372E]",
      badge: "bg-[#5C3D2E] text-[#FDFBF7] dark:bg-[#E8C4A2] dark:text-[#1F1914]",
    },
    "clinical-insight-engine": {
      bg: "bg-[#DFE7E2] dark:bg-[#1E2824]",
      text: "text-[#2D5A4C] dark:text-[#9ECBB9]",
      border: "border-[#C5D5CC] dark:border-[#2F423B]",
      badge: "bg-[#2D5A4C] text-[#FDFBF7] dark:bg-[#9ECBB9] dark:text-[#12201B]",
    },
    "netshield": {
      bg: "bg-[#E3E4EA] dark:bg-[#22242E]",
      text: "text-[#3D4566] dark:text-[#A8B2DE]",
      border: "border-[#CBD0DD] dark:border-[#35394B]",
      badge: "bg-[#3D4566] text-[#FDFBF7] dark:bg-[#A8B2DE] dark:text-[#181924]",
    },
    "mealsync": {
      bg: "bg-[#EFE8DC] dark:bg-[#29261E]",
      text: "text-[#6B512E] dark:text-[#E2C798]",
      border: "border-[#DDD2BF] dark:border-[#3F392B]",
      badge: "bg-[#6B512E] text-[#FDFBF7] dark:bg-[#E2C798] dark:text-[#1C1810]",
    },
    "om-restaurant": {
      bg: "bg-[#EFE3DB] dark:bg-[#2B211D]",
      text: "text-[#7A3F2A] dark:text-[#E8A590]",
      border: "border-[#DFC7BC] dark:border-[#43312A]",
      badge: "bg-[#7A3F2A] text-[#FDFBF7] dark:bg-[#E8A590] dark:text-[#1F1410]",
    },
    "samarth-loan": {
      bg: "bg-[#E6E8DE] dark:bg-[#23271F]",
      text: "text-[#4B5A38] dark:text-[#B6CD9B]",
      border: "border-[#CDD3C1] dark:border-[#363E2D]",
      badge: "bg-[#4B5A38] text-[#FDFBF7] dark:bg-[#B6CD9B] dark:text-[#181E12]",
    },
    "ncvet-blockchain": {
      bg: "bg-[#EBE2EA] dark:bg-[#282029]",
      text: "text-[#623E63] dark:text-[#D5A7D8]",
      border: "border-[#D7C6D6] dark:border-[#3E303F]",
      badge: "bg-[#623E63] text-[#FDFBF7] dark:bg-[#D5A7D8] dark:text-[#1D141E]",
    },
  };

  const isExpanded = expandedId === currentProject.id;

  return (
    <Section
      id="projects"
      chapterNumber="01"
      subtitle="Selected Works"
      title="Architecture & Engineering"
      description="Production software, client solutions, and technical prototypes built with Java Spring Boot, React, and modern system architectures."
    >
      <div className="w-full">
        {/* Editorial Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-border/80">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project category filters">
            {FILTERS.map((cat) => {
              const isActive = activeFilter === cat;
              const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveFilter(cat);
                    const matching = cat === "All" ? projects : projects.filter((p) => p.category === cat);
                    if (matching.length > 0 && !matching.some((p) => p.id === activeTabId)) {
                      setActiveTabId(matching[0].id);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
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

          <div className="font-mono text-xs text-muted-foreground tracking-wide">
            FOLDER <span className="font-semibold text-foreground">{currentProject.number}</span> / {projects.length.toString().padStart(2, "0")}
          </div>
        </div>

        {/* Layered Folder Stack Container */}
        <div className="relative pt-12 md:pt-14">
          
          {/* Top Folder Tabs Rail */}
          <div
            className="flex items-end gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-0 px-2 sm:px-4 -mb-[1px] relative z-20"
            role="tablist"
            aria-label="Layered project folder tabs"
          >
            {visibleProjects.map((project) => {
              const isActive = project.id === currentProject.id;
              const accent = tabAccents[project.id] || tabAccents["gavs-munim"];

              return (
                <button
                  key={project.id}
                  role="tab"
                  id={`tab-${project.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${project.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTabId(project.id)}
                  className={`group relative flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-t-xl sm:rounded-t-2xl font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer select-none shrink-0 border-t border-x ${
                    isActive
                      ? `${accent.bg} ${accent.text} ${accent.border} shadow-sm -translate-y-1 font-semibold z-30 ring-1 ring-border/20`
                      : "bg-card/70 hover:bg-card text-muted-foreground hover:text-foreground border-border/70 hover:border-border -translate-y-0 z-10"
                  }`}
                >
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? accent.badge : "bg-secondary text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {project.number}
                  </span>
                  <span className="truncate max-w-[110px] sm:max-w-[160px] md:max-w-none">
                    {project.title.split("—")[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Foreground Project Sheet */}
          <div className="relative z-10">
            {/* Background Layering Shadow Effect (simulates underlying sheets) */}
            <div className="absolute inset-0 translate-y-3 sm:translate-y-4 translate-x-1 sm:translate-x-2 bg-secondary/60 rounded-2xl sm:rounded-3xl border border-border/60 -z-10" />
            <div className="absolute inset-0 translate-y-1.5 sm:translate-y-2 -translate-x-1 sm:-translate-x-1.5 bg-card/80 rounded-2xl sm:rounded-3xl border border-border/80 -z-10" />

            {/* Foreground Paper Sheet Card */}
            <div
              id={`panel-${currentProject.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${currentProject.id}`}
              className="bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl relative overflow-hidden transition-all"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* LEFT COLUMN: Project Information & Actions */}
                  <div className="w-full lg:col-span-6 flex flex-col justify-between order-2 lg:order-1">
                    <div>
                      {/* Status / Category Kicker */}
                      <div className="flex items-center gap-2 mb-3 font-mono text-xs text-primary font-medium tracking-wide">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span>{currentProject.tagline}</span>
                      </div>

                      {/* Large Project Title */}
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground font-normal tracking-tight mb-4">
                        {currentProject.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed mb-6">
                        {currentProject.description}
                      </p>

                      {/* Technology Chips */}
                      <div className="flex flex-wrap gap-2 mb-8" aria-label="Technologies used">
                        {currentProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-secondary text-foreground/80 border border-border/80 font-mono text-[11px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs and Case Study Toggle */}
                    <div className="pt-6 border-t border-border flex flex-wrap items-center gap-3">
                      {currentProject.link ? (
                        <a
                          href={currentProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-xs font-medium"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : null}

                      {currentProject.github ? (
                        <a
                          href={currentProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Codebase</span>
                        </a>
                      ) : null}

                      {currentProject.documentation ? (
                        <a
                          href={currentProject.documentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-primary" />
                          <span>Docs</span>
                        </a>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => toggleCaseStudy(currentProject.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`case-study-${currentProject.id}`}
                        className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all border ${
                          isExpanded
                            ? "bg-secondary text-foreground border-primary/50 shadow-xs"
                            : "bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
                        } sm:ml-auto cursor-pointer`}
                      >
                        <span>{isExpanded ? "Hide Breakdown" : "Read Breakdown"}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180 text-primary" : ""}`} />
                      </button>
                    </div>

                    {/* Expandable Case Study Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={`case-study-${currentProject.id}`}
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
                                {currentProject.problem}
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                              <span className="font-mono uppercase tracking-wider text-[10px] text-primary font-semibold block mb-1">
                                Technical Outcome
                              </span>
                              <p className="text-foreground leading-relaxed">
                                {currentProject.outcome}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* RIGHT COLUMN: Large Project Screenshot with Architectural Frame */}
                  <div className="w-full lg:col-span-6 order-1 lg:order-2">
                    <div className="relative rounded-2xl overflow-hidden border border-border bg-secondary aspect-[16/10] shadow-md group">
                      <img
                        src={currentProject.image}
                        alt={`${currentProject.title} preview`}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                          currentProject.id === "om-restaurant" ? "object-center" : "object-top"
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-xs border border-border px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest text-foreground shadow-xs">
                        {currentProject.number} / {currentProject.category}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
