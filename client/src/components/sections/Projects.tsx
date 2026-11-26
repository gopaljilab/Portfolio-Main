import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Github, FileText, ExternalLink } from "lucide-react";

export interface ProjectItem {
  id: string;
  number: string;
  tabLabel: string;
  category: string;
  tagsLabel: string;
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  accentBadge: string;
  shadowColor: string;
  image: string;
  tags: string[];
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryLinks: { label: string; url: string; icon?: "github" | "docs" | "external" }[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "gavs-munim",
    number: "01",
    tabLabel: "MUNIM",
    category: "ENTERPRISE AI · FULL STACK",
    tagsLabel: "JAVA 21 · SPRING BOOT 4 · POSTGRESQL · REACT 18 · DOCKER",
    title: "MUNIM",
    description:
      "A mission-critical procurement, commercial quotation, and continuous supplier intelligence platform engineered for MSME sheet-metal fabrication factories to stop raw-material overpayment and unprofitable quoting. Features deterministic Java arithmetic, SHA-256 sealed approval gates, and 171 passing backend tests.",
    accentColor: "#E05A36", // Vibrant terracotta/burnt orange
    accentBg: "bg-[#E05A36]",
    accentBorder: "border-[#C24524]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(224, 90, 54, 0.45)",
    image: "/gavs-munim.png",
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "React", "TypeScript", "Docker"],
    primaryCtaText: "Explore codebase →",
    primaryCtaLink: "https://github.com/gopaljilab/GAVS-MUNIM",
    secondaryLinks: [
      { label: "Codebase", url: "https://github.com/gopaljilab/GAVS-MUNIM", icon: "github" },
      { label: "Docs", url: "https://github.com/gopaljilab/GAVS-MUNIM#readme", icon: "docs" },
    ],
  },
  {
    id: "clinical-insight-engine",
    number: "02",
    tabLabel: "Clinical Insight",
    category: "HEALTHCARE DECISION SUPPORT · AI & ML",
    tagsLabel: "PYTHON · SCIKIT-LEARN · REACT 18 · EXPRESS · POSTGRESQL · GSSOC'26",
    title: "Clinical Insight",
    description:
      "A clinical decision support platform surfacing early, interpretable diabetes risk signals from patient physiological data with dedicated physician and patient analytics modes. Built with an interpretable scikit-learn ML pipeline, SHAP factor importance, and interactive scenario simulations under GSSoC 2026 governance.",
    accentColor: "#10B981", // Emerald green
    accentBg: "bg-[#10B981]",
    accentBorder: "border-[#059669]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(16, 185, 129, 0.45)",
    image: "/clinical-insight.png",
    tags: ["Python", "Machine Learning", "React", "Express.js", "PostgreSQL", "Healthcare"],
    primaryCtaText: "Explore codebase →",
    primaryCtaLink: "https://github.com/gopaljilab/Clinical-Insight-Engine",
    secondaryLinks: [
      { label: "Codebase", url: "https://github.com/gopaljilab/Clinical-Insight-Engine", icon: "github" },
      { label: "Docs", url: "https://github.com/gopaljilab/Clinical-Insight-Engine#readme", icon: "docs" },
    ],
  },
  {
    id: "netshield",
    number: "03",
    tabLabel: "NetShield",
    category: "NETWORK DEFENSE · CYBERSECURITY",
    tagsLabel: "FASTAPI · XGBOOST · REACT 18 · TYPESCRIPT · DOCKER · CIC-IDS2017",
    title: "NetShield",
    description:
      "A high-throughput defensive security telemetry platform classifying high-velocity network packet flows into Benign or Malicious attack vectors in sub-10ms real-time latency. Trained zero-leakage XGBoost models with interactive SOC packet simulator and 70/70 comprehensive test coverage.",
    accentColor: "#3B82F6", // Cobalt blue
    accentBg: "bg-[#3B82F6]",
    accentBorder: "border-[#2563EB]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(59, 130, 246, 0.45)",
    image: "/netshield.png",
    tags: ["FastAPI", "Python", "XGBoost", "React", "TypeScript", "Cybersecurity", "Docker"],
    primaryCtaText: "Explore codebase →",
    primaryCtaLink: "https://github.com/gopaljilab/NetShield",
    secondaryLinks: [
      { label: "Codebase", url: "https://github.com/gopaljilab/NetShield", icon: "github" },
      { label: "Docs", url: "https://github.com/gopaljilab/NetShield#readme", icon: "docs" },
    ],
  },
  {
    id: "mealsync",
    number: "04",
    tabLabel: "MealSync",
    category: "SMART REDISTRIBUTION · FULL STACK",
    tagsLabel: "REACT 19 · TYPESCRIPT 5 · EXPRESS 5 · POSTGRESQL 16 · DRIZZLE ORM",
    title: "MealSync",
    description:
      "A smart food management and redistribution platform for hostels and shared-living communities that predicts demand, tracks kitchen waste analytics, and automates surplus redistribution to partner NGOs. Built with automated meal-confirmation flows, multi-stakeholder dashboards, and audit-ready food donation tracking.",
    accentColor: "#EAB308", // Golden yellow
    accentBg: "bg-[#EAB308]",
    accentBorder: "border-[#CA8A04]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(234, 179, 8, 0.45)",
    image: "/mealsync.png",
    tags: ["React 19", "TypeScript", "Express 5", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    primaryCtaText: "Explore codebase →",
    primaryCtaLink: "https://github.com/gopaljilab/MealSync",
    secondaryLinks: [
      { label: "Codebase", url: "https://github.com/gopaljilab/MealSync", icon: "github" },
      { label: "Docs", url: "https://github.com/gopaljilab/MealSync#readme", icon: "docs" },
    ],
  },
  {
    id: "om-restaurant",
    number: "05",
    tabLabel: "Om Restaurant",
    category: "RESTAURANT OPS · FULL STACK",
    tagsLabel: "JAVA · SPRING BOOT · MYSQL · REACT · VERCEL",
    title: "Om Restaurant",
    description:
      "A full-featured restaurant operations platform handling multi-table orders, live inventory tracking, staff shifts, and real-time sales dashboards. Reduced order-handling steps from 5 to 2 with Spring Boot REST services, JPA transactions, and a responsive React single-page frontend.",
    accentColor: "#EC4899", // Magenta/pink
    accentBg: "bg-[#EC4899]",
    accentBorder: "border-[#DB2777]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(236, 72, 153, 0.45)",
    image: "/OM.jpg",
    tags: ["Java", "Spring Boot", "MySQL", "React", "REST API", "Vercel"],
    primaryCtaText: "Visit live project →",
    primaryCtaLink: "https://omrestaurant.vercel.app/",
    secondaryLinks: [
      { label: "Live Website", url: "https://omrestaurant.vercel.app/", icon: "external" },
      { label: "Codebase", url: "https://github.com/gopaljilab/OmRestaurant", icon: "github" },
    ],
  },
  {
    id: "samarth-loan",
    number: "06",
    tabLabel: "SamarthLoan",
    category: "PUBLIC SERVICE TECH · FINANCIAL INCLUSION",
    tagsLabel: "REACT · TAILWIND CSS · EMI ENGINE · MULTILINGUAL (EN/HI/KN)",
    title: "SamarthLoan",
    description:
      "A public-service companion that turns India's complex government loan schemes into a clear digital pathway — calculate EMI, match schemes (MUDRA, Standup India), and track applications in English, Hindi, or Kannada with interactive facilitator guidance.",
    accentColor: "#8B5CF6", // Purple/violet
    accentBg: "bg-[#8B5CF6]",
    accentBorder: "border-[#7C3AED]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(139, 92, 246, 0.45)",
    image: "/SamarthLoan.png",
    tags: ["React", "Tailwind CSS", "i18n", "EMI Calculator", "Public Service"],
    primaryCtaText: "Visit live project →",
    primaryCtaLink: "https://samarthloan.netlify.app/",
    secondaryLinks: [
      { label: "Live Website", url: "https://samarthloan.netlify.app/", icon: "external" },
      { label: "Codebase", url: "https://github.com/gopaljilab/SamarthLoan", icon: "github" },
      { label: "Docs", url: "https://github.com/gopaljilab/SamarthLoan/blob/main/docs/phase-2-architecture.md", icon: "docs" },
    ],
  },
  {
    id: "ncvet-blockchain",
    number: "07",
    tabLabel: "NCVET Platform",
    category: "DECENTRALIZED CREDENTIALING · WEB3",
    tagsLabel: "REACT · WEB3.JS · SEPOLIA TESTNET · IPFS · HARDHAT",
    title: "NCVET Platform",
    description:
      "A decentralized credentialing platform engineered to eliminate certificate forgery and manual verification delays in India's vocational education ecosystem. Built on Ethereum Sepolia with IPFS storage, MetaMask cryptographic signing, and instant tamper-proof QR verification.",
    accentColor: "#06B6D4", // Cyan/teal
    accentBg: "bg-[#06B6D4]",
    accentBorder: "border-[#0891B2]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(6, 182, 212, 0.45)",
    image: "/NCVET.jpg",
    tags: ["React", "Web3.js", "Ethereum", "IPFS", "Hardhat", "Sepolia", "Smart Contracts"],
    primaryCtaText: "Explore prototype →",
    primaryCtaLink: "https://www.figma.com/make/AB1LEuPmvUhr1fMaDX3q3w/Blockchain-Certificate-Platform-Prototype?fullscreen=1&t=rLkYbttE95UaCYCf-1",
    secondaryLinks: [
      { label: "Live Prototype", url: "https://www.figma.com/make/AB1LEuPmvUhr1fMaDX3q3w/Blockchain-Certificate-Platform-Prototype?fullscreen=1&t=rLkYbttE95UaCYCf-1", icon: "external" },
      { label: "Codebase", url: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System", icon: "github" },
      { label: "Docs", url: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System#readme", icon: "docs" },
    ],
  },
];

export function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Observe which card is currently the active foreground card & apply subtle scale/dimming like Kamal's folio
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;

    const handleScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const viewportHeight = window.innerHeight;
        let foregroundIndex = 0;

        cardRefs.current.forEach((el, index) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const stickyTop = 90 + index * 14;

          // When card reaches sticky top (within 8px tolerance), it has settled
          if (rect.top <= stickyTop + 8) {
            foregroundIndex = index;
          }

          // Next card incoming progress
          const nextEl = cardRefs.current[index + 1];
          if (nextEl && !reducedMotion.matches) {
            const nextRect = nextEl.getBoundingClientRect();
            // Calculate progress of next card covering current card
            const coverProgress = Math.min(
              1,
              Math.max(0, 1 - (nextRect.top - stickyTop) / Math.max(1, viewportHeight - stickyTop))
            );
            if (coverProgress > 0) {
              const scale = (1 - coverProgress * 0.04).toFixed(4);
              el.style.transform = `scale(${scale})`;
              el.style.setProperty("--dim", (coverProgress * 0.12).toFixed(3));
            } else {
              el.style.transform = "";
              el.style.setProperty("--dim", "0");
            }
          } else {
            el.style.transform = "";
            el.style.setProperty("--dim", "0");
          }
        });

        setActiveProjectIndex(foregroundIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    reducedMotion.addEventListener("change", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      reducedMotion.removeEventListener("change", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative pt-20 md:pt-28 pb-32 md:pb-48 border-b border-border/80 overflow-visible select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* 1. EDITORIAL SECTION HEADER WITH DYNAMIC COUNTER           */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20 pb-8 border-b border-border">
          <div className="max-w-2xl">
            {/* Eyebrow Pill */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#111111] text-[#FFFFFF] dark:bg-[#FFFFFF] dark:text-[#111111] font-semibold">
                02.1
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                SELECTED WORK · 2024 → 2026
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground font-normal tracking-tight mb-4">
              Stuff I couldn&apos;t stop building<span className="text-primary italic">.</span>
            </h2>

            <p className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed">
              Projects designed, engineered and shipped end-to-end. A collection of experiments, products and systems built with curiosity and purpose.
            </p>
          </div>

          {/* Large Dynamic Project Counter */}
          <div className="flex items-baseline gap-1 font-mono shrink-0">
            <span className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground tabular-nums transition-all duration-300">
              {(activeProjectIndex + 1).toString().padStart(2, "0")}
            </span>
            <span className="text-xl sm:text-2xl text-muted-foreground font-normal tabular-nums">
              / {PROJECTS.length.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. THE MAIN DESIGN: PHYSICAL OVERLAPPING FOLDER STACK      */}
        {/* ========================================================= */}
        <div className="relative w-full overflow-visible pb-32 md:pb-40">
          {PROJECTS.map((project, index) => {
            // Incremental sticky top: 90px header offset + 14px per stack layer
            const stickyTop = `${90 + index * 14}px`;
            // Ascending z-index: later project sheets rise over earlier ones
            const zIndex = index + 1;

            return (
              <article
                key={project.id}
                ref={(el) => (cardRefs.current[index] = el)}
                id={`project-${project.id}`}
                style={{
                  top: stickyTop,
                  zIndex: zIndex,
                  transformOrigin: "50% 0px",
                }}
                className={`sticky w-full rounded-[24px] sm:rounded-[32px] md:rounded-[38px] bg-[#FFFFFF] dark:bg-[#1C1916] border-[1.5px] border-[#151515] dark:border-[#38332D] shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-shadow duration-300 overflow-visible ${
                  index === 0 ? "mt-0" : "mt-24 sm:mt-28 md:mt-32"
                }`}
              >
                {/* Protruding Folder Tab (Attached to Upper-Left Edge) */}
                <div
                  className={`absolute -top-10 left-6 sm:left-10 h-10 px-4 sm:px-6 rounded-t-xl sm:rounded-t-2xl border-t-[1.5px] border-x-[1.5px] border-[#151515] dark:border-[#38332D] flex items-center gap-2.5 shadow-xs ${project.accentBg} text-[#FFFFFF] font-mono text-xs sm:text-[13px] font-semibold tracking-wider`}
                >
                  {/* Small Black Circular Badge */}
                  <span className="w-5 h-5 rounded-full bg-[#111111] text-[#FFFFFF] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {project.number}
                  </span>
                  <span>{project.tabLabel}</span>
                </div>

                {/* Main Card Content: Split-Screen Layout */}
                <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* LEFT COLUMN: ~42% Width (Project Details & Actions) */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                      <div>
                        {/* Category Indicator with Colored Dot */}
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: project.accentColor }}
                          />
                          <span>{project.category}</span>
                        </div>

                        {/* Large Bold Project Title (Responsive Fluid 42px - 60px) */}
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-sans font-bold tracking-tight text-foreground mb-3 leading-[1.08]">
                          {project.title}
                        </h3>

                        {/* Technology Tagline Bar */}
                        <div className="font-mono text-[10px] sm:text-[11px] text-muted-foreground tracking-wider mb-4 uppercase">
                          {project.tagsLabel}
                        </div>

                        {/* Authentic Project Description */}
                        <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Technology Stack Badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md bg-secondary text-foreground/80 border border-border/80 font-mono text-[11px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions Group */}
                      <div className="pt-2 flex flex-col space-y-3">
                        {/* Primary Project CTA: Black pill with subtle colored accent shadow */}
                        <a
                          href={project.primaryCtaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full sm:w-fit px-7 py-3 rounded-full bg-[#111111] text-[#FFFFFF] hover:bg-black font-mono text-xs uppercase tracking-wider font-semibold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                          style={{
                            boxShadow: `0 4px 18px ${project.shadowColor}`,
                          }}
                        >
                          <span>{project.primaryCtaText}</span>
                        </a>

                        {/* Secondary Destination Outlined Pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {project.secondaryLinks.map((sec) => (
                            <a
                              key={sec.label}
                              href={sec.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 hover:bg-secondary text-foreground border border-border text-xs font-mono uppercase tracking-wider transition-colors"
                            >
                              {sec.icon === "github" && <Github className="w-3 h-3 text-muted-foreground" />}
                              {sec.icon === "docs" && <FileText className="w-3 h-3 text-primary" />}
                              {sec.icon === "external" && <ArrowUpRight className="w-3 h-3 text-primary" />}
                              <span>{sec.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: ~58% Width (Project Screenshot with Colored Offset Shadow) */}
                    <div className="lg:col-span-7 w-full">
                      <div className="relative group">
                        
                        {/* Colored Offset Backdrop Shadow Matching Project Accent */}
                        <div
                          className="absolute inset-0 translate-x-2 sm:translate-x-3 translate-y-2 sm:translate-y-3 rounded-2xl sm:rounded-3xl pointer-events-none transition-transform duration-300 group-hover:translate-x-3.5 group-hover:translate-y-3.5"
                          style={{
                            backgroundColor: project.accentColor,
                            opacity: 0.88,
                          }}
                          aria-hidden="true"
                        />

                        {/* Foreground Screenshot Frame with Thin Dark Border */}
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-[1.5px] border-[#151515] bg-[#F7F2E9] dark:bg-[#1C1916] shadow-md z-10 aspect-[16/10]">
                          <img
                            src={project.image}
                            alt={`${project.title} Preview`}
                            loading="lazy"
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
                          />

                          {/* Floating Interactive Action Badge (Open ↗) on Desktop Hover */}
                          <a
                            href={project.primaryCtaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 px-3.5 py-1.5 rounded-full text-[#FFFFFF] font-mono text-xs font-semibold tracking-wider shadow-lg flex items-center gap-1.5 opacity-90 group-hover:opacity-100 motion-safe:group-hover:scale-105 transition-all duration-200"
                            style={{
                              backgroundColor: project.accentColor,
                            }}
                          >
                            <span>Open</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
