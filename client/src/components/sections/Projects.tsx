import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { gsap } from "@/lib/gsap";
import { TiltCard } from "@/components/ui/tilt-card";

type FilterKey = "All" | "Full Stack" | "Frontend" | "UI/UX" | "Web3";

interface Project {
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
}

const projects: Project[] = [
  {
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
    link: "https://omrestaurant.netlify.app/",
    github: "https://gopaljilab.github.io/OmRestaurant/",
  },
  {
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
  },
  {
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
  },
  {
    title: "Portfolio Website",
    category: "Frontend",
    tagline: "React · TypeScript · GSAP · Framer Motion",
    description:
      "A highly interactive personal portfolio with GSAP scroll animations, 3D tilt cards, and a live full-stack architecture visualizer — built to show skills, not just describe them.",
    problem:
      "Generic portfolio templates don't communicate technical depth — recruiters see a list of skills, not working systems.",
    outcome:
      "Signature hero element (FullStack Visualizer) simulates real Spring Boot → MySQL API flows. 100% TypeScript, Lighthouse-optimised, deployed on Vercel.",
    image: "/Portfolio.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
    link: "https://potfoliogopal.netlify.app/",
    github: "https://github.com/gopaljilab/portfolio",
  },
  {
    title: "Wash'n Vibe",
    category: "UI/UX",
    tagline: "Figma · UI/UX · Mobile Prototype",
    description:
      "A sleek mobile app prototype for a modern on-demand laundry service, designed with a focus on frictionless booking and visual delight.",
    problem:
      "Existing laundry-app UX flows required 7+ taps to place an order and had no real-time order-status feedback loop.",
    outcome:
      "Designed a 3-tap booking flow and a live order-tracker screen. Interactive Figma prototype with 40+ frames and micro-interaction states.",
    image: "/Wash.jpg",
    tags: ["Figma", "UI/UX", "Prototyping", "Mobile Design"],
    link: "https://www.figma.com/proto/2mdtYq2x2Y6Kjgx1QDHbhr/Wash-N-Vibe?node-id=6-3980&starting-point-node-id=1%3A3&t=IJ0sJ9JfeJj3YfqH-1",
    github: "",
  },
];

const FILTERS: FilterKey[] = ["All", "Full Stack", "Frontend", "UI/UX", "Web3"];

export function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card-wrapper",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="projects" title="Featured Projects" subtitle="My Work" darker>
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setActiveFilter(f);
              setExpandedIndex(null);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
              activeFilter === f
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:text-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="project-card-wrapper"
              >
                <TiltCard
                  maxTilt={4}
                  scale={1.015}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col h-full"
                >
                  {/* Project image */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Category badge — bottom-left so it never overlaps the logo area */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">
                      {project.tagline}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* Case-study expand */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mb-4 space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                            <div>
                              <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
                                Problem
                              </span>
                              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                                {project.problem}
                              </p>
                            </div>
                            <div>
                              <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
                                Outcome
                              </span>
                              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                                {project.outcome}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300 border border-slate-100 dark:border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action row — always visible */}
                    <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} live demo`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:border-primary/50 hover:text-primary transition-all"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      )}
                      <button
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : index)
                        }
                        className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 hover:text-primary transition-all"
                      >
                        {isExpanded ? "Hide ↑" : "Case study ↓"}
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Section>
  );
}
