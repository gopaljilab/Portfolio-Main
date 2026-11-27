import { LEETCODE, LEETCODE_SOLVED } from "@/data/leetCodeActivity";
import eliteCodersCredential from "@assets/8fcc4eb8-0637-413a-984d-012525c12ed0_page-0001_1772355072284.jpg";
import postmanCredential from "@assets/Print_Certificate_-_Canvas_Badges_page-0001_1772355032529.jpg";
import winterOfCodeCredential from "@assets/WoCS2025_contributor_Gopal_Gupta_1772355110359.png";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Trophy, GitMerge, ExternalLink, Code2, Users, Flame, Star, ArrowUpRight } from "lucide-react";

export type TrophyCategory = "All" | "Hackathons" | "Open Source" | "Coding Milestones" | "Recognition";

export interface TrophyItem {
  id: string;
  category: TrophyCategory;
  year: string;
  headline: string;
  title: string;
  organization: string;
  description: string;
  metricBadge?: string;
  evidenceLink?: string;
  evidenceLabel?: string;
  accentColor: string;
  iconType: "trophy" | "git" | "code" | "award" | "star";
}

const TROPHIES: TrophyItem[] = [
  {
    id: "gssoc-admin",
    category: "Open Source",
    year: "2026",
    headline: "PROJECT ADMIN & MENTOR",
    title: "GirlScript Summer of Code '26",
    organization: "GirlScript Foundation",
    description: "Appointed Project Admin and Contributor for GSSoC'26. Mentoring cohort developers on Git workflows, reviewing incoming Java PRs, and maintaining project governance.",
    metricBadge: "ADMIN / MAINTAINER",
    evidenceLink: "https://github.com/gopaljilab/Clinical-Insight-Engine",
    evidenceLabel: "Project Repository",
    accentColor: "#E2A03F",
    iconType: "star",
  },
  {
    id: "sih-national-finalist",
    category: "Hackathons",
    year: "2025",
    headline: "NATIONAL INNOVATION FINALIST",
    title: "Smart India Hackathon 2025",
    organization: "Ministry of Education & AICTE",
    description: "Shortlisted as a National Finalist in Smart India Hackathon 2025 by the Ministry of Education & AICTE. Built and pitched a vocational blockchain credentialing architecture under tight constraints.",
    metricBadge: "SIH FINALIST",
    evidenceLink: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System",
    evidenceLabel: "Project Repository",
    accentColor: "#95573D",
    iconType: "trophy",
  },
  {
    id: "leetcode-problems",
    category: "Coding Milestones",
    year: "2025–26",
    headline: `${LEETCODE_SOLVED} PROBLEMS SOLVED`,
    title: "LeetCode Algorithmic Mastery",
    organization: "LeetCode Global",
    description: "Consistent problem solving across Arrays, Trees, Dynamic Programming, and Graph algorithms with Java. Cultivated deterministic complexity analysis and rigorous edge-case testing.",
    metricBadge: `${LEETCODE_SOLVED} SOLVED`,
    evidenceLink: LEETCODE.profile,
    evidenceLabel: "LeetCode Profile",
    accentColor: "#E89B38",
    iconType: "code",
  },
  {
    id: "ecwoc-spring-boot",
    category: "Open Source",
    year: "2026",
    headline: "18% TEST COVERAGE ELEVATION",
    title: "Elite Coders Winter of Code '26",
    organization: "Elite Coders Community",
    description: "Selected as contributor for ECWoC'26. Shipped 4 merged PRs resolving Spring Boot request-mapping conflicts and refactoring DAO-layer unit tests to elevate test coverage by 18%.",
    metricBadge: "CONTRIBUTOR",
    evidenceLink: eliteCodersCredential,
    evidenceLabel: "View Credential",
    accentColor: "#2D5A4C",
    iconType: "git",
  },
  {
    id: "postman-api-expert",
    category: "Recognition",
    year: "2025",
    headline: "CERTIFIED STUDENT EXPERT",
    title: "Postman API Fundamentals",
    organization: "Postman Academy",
    description: "Earned the official Postman API Fundamentals Student Expert certification covering RESTful protocol design, automated collection test scripts, and dynamic API workflows.",
    metricBadge: "POSTMAN EXPERT",
    evidenceLink: postmanCredential,
    evidenceLabel: "View Credential",
    accentColor: "#FF6C37",
    iconType: "award",
  },
  {
    id: "woc-social-open-source",
    category: "Open Source",
    year: "2025",
    headline: "PAGINATION & OPENAPI MERGED",
    title: "Winter of Code Social 2025",
    organization: "Code Social Foundation",
    description: "Delivered merged open-source fixes for admin dashboard pagination and authored complete OpenAPI documentation across 3 REST endpoints while onboarding 2 new developers.",
    metricBadge: "MERGED PRs",
    evidenceLink: winterOfCodeCredential,
    evidenceLabel: "View Credential",
    accentColor: "#5C3D2E",
    iconType: "git",
  },
];

const CATEGORIES: TrophyCategory[] = [
  "All",
  "Hackathons",
  "Open Source",
  "Coding Milestones",
  "Recognition",
];

export function TrophyCabinet() {
  const [activeCategory, setActiveCategory] = useState<TrophyCategory>("All");
  const [activeYear, setActiveYear] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Filter items
  const filteredTrophies = TROPHIES.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchYear = activeYear === "All" || t.year.includes(activeYear);
    return matchCat && matchYear;
  });

  const total = filteredTrophies.length;
  const current = filteredTrophies[activeIndex] || filteredTrophies[0] || TROPHIES[0];

  // Dynamic available years based on category
  const availableYears = ["All", ...Array.from(new Set(TROPHIES.map((t) => t.year)))];

  const handleNext = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleCategorySelect = (cat: TrophyCategory) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  const renderIcon = (type: TrophyItem["iconType"], className: string) => {
    switch (type) {
      case "trophy":
        return <Trophy className={className} />;
      case "git":
        return <GitMerge className={className} />;
      case "code":
        return <Code2 className={className} />;
      case "star":
        return <Star className={className} />;
      case "award":
      default:
        return <Award className={className} />;
    }
  };

  return (
    <section
      id="trophy-cabinet"
      className="py-20 md:py-28 bg-card border-b border-border/80 relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                05.2
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                WINS · MILESTONES · RECOGNITION
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground font-normal tracking-tight">
              The Trophy Cabinet<span className="text-primary italic">.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base font-sans text-muted-foreground max-w-md leading-relaxed">
            A growing collection of things built, shipped, learned, and achieved.
          </p>
        </div>

        {/* Filter Controls: Category & Year Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-border/60">
          {/* Category Tabs */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Trophy categories"
          >
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? TROPHIES.length : TROPHIES.filter((t) => t.category === cat).length;
              if (count === 0) return null;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleCategorySelect(cat)}
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

          {/* Stepper Navigation Indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              MILESTONE
            </span>
            <div className="font-mono text-base font-bold text-foreground bg-secondary px-3 py-1 rounded-lg border border-border">
              {total > 0 ? (activeIndex + 1).toString().padStart(2, "0") : "00"} / {total.toString().padStart(2, "0")}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={total <= 1}
                aria-label="Previous trophy"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-secondary/80 disabled:opacity-40 disabled:cursor-not-allowed border border-border flex items-center justify-center transition-colors cursor-pointer text-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={total <= 1}
                aria-label="Next trophy"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-secondary/80 disabled:opacity-40 disabled:cursor-not-allowed border border-border flex items-center justify-center transition-colors cursor-pointer text-foreground"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Prominent Active Trophy Showcase Stage */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Left Visual Hero: Bold Milestone Card (7 cols) */}
                <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-8 sm:p-10 md:p-12 shadow-lg relative overflow-hidden flex flex-col justify-between">
                  {/* Subtle Accent Glow */}
                  <div
                    className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10 pointer-events-none blur-3xl"
                    style={{ backgroundColor: current.accentColor }}
                  />

                  <div>
                    {/* Top Kicker Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border/80">
                      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.accentColor }} />
                        <span>{current.category} · {current.year}</span>
                      </div>

                      {current.metricBadge && (
                        <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md bg-secondary text-foreground font-semibold border border-border">
                          {current.metricBadge}
                        </span>
                      )}
                    </div>

                    {/* Headline Metric / Highlight */}
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                      {current.headline}
                    </span>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground font-normal tracking-tight mb-4">
                      {current.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-xl">
                      {current.description}
                    </p>
                  </div>

                  {/* Card Footer: Organization & Evidence Link */}
                  <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary">
                        {renderIcon(current.iconType, "w-4 h-4")}
                      </div>
                      <span className="font-sans text-sm font-semibold text-foreground/90">
                        {current.organization}
                      </span>
                    </div>

                    {current.evidenceLink && (
                      <a
                        href={current.evidenceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border font-mono text-xs uppercase tracking-wider transition-colors"
                      >
                        <span>{current.evidenceLabel || "Verify Link"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Companion: Quick Milestone Tray (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                  <div className="space-y-3">
                    {filteredTrophies.map((item, idx) => {
                      const isSelected = item.id === current.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-secondary border-primary/60 shadow-sm ring-1 ring-primary/20 scale-[1.01]"
                              : "bg-card/70 hover:bg-card border-border/80 hover:border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-foreground/80">
                              {(idx + 1).toString().padStart(2, "0")}
                            </span>
                            <div>
                              <span className="font-serif text-base font-semibold text-foreground block truncate max-w-[200px] sm:max-w-[280px]">
                                {item.title}
                              </span>
                              <span className="font-mono text-[11px] text-foreground/80">
                                {item.category} · {item.year}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {renderIcon(item.iconType, "w-4 h-4 text-primary")}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 text-xs font-mono text-muted-foreground flex items-center justify-between">
                    <span>Authentic Verified Milestones</span>
                    <span className="text-foreground font-semibold">{total} Active Records</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
