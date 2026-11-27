"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import smartIndiaPng from "@assets/Gopal_Gupta_certificate_1772355032528.png";
import postmanJpg from "@assets/Print_Certificate_-_Canvas_Badges_page-0001_1772355032529.jpg";
import eliteCodersJpg from "@assets/8fcc4eb8-0637-413a-984d-012525c12ed0_page-0001_1772355072284.jpg";
import wocPng from "@assets/WoCS2025_contributor_Gopal_Gupta_1772355110359.png";
import scalerMasterclassPng from "@assets/39448c24132ac30a91ffd4903ec94822978de0a93f99fb8c33dba8b489f869_1772355110359.png";
import mastersUnionJpg from "@assets/756547b9-9531-4b0c-993a-46a7ae70da65_1772355110365.jpg";
import coreJavaJpeg from "@assets/1727200587497_1772355110365.jpeg";
import scalerFundamentalsPng from "@assets/f88dd432e07f775cb46efddb76cefae72dbbb1fd126a7f2f6c4727b5f6c0cc_1772355110366.png";
import nativeSoftTechJpg from "@assets/Gopal_Gupta_1772355110367.jpg";
import trivediJpg from "@assets/PHOTO-2024-02-02-20-22-07_1772355409539.jpg";
import mecatredzJpg from "@assets/PHOTO-2024-02-02-20-22-06_1772355409542.jpg";
import letsUpgradePng from "@assets/LUEYTCAUG124371_1772355409542.png";

export type CertificateCategory =
  | "All"
  | "Backend & Java"
  | "APIs & Tools"
  | "Hackathons & Programs";

export interface CertificateItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  issuer: string;
  year: string;
  category: CertificateCategory;
  verified?: boolean;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  themeColor?: string;
}

export const certificatesList: CertificateItem[] = [
  {
    id: "woc-social-2025",
    src: wocPng,
    alt: "Winter of Code Social 2025 Certificate of Participation",
    title: "Winter of Code Social 2025",
    subtitle: "Open Source Contributor (Nov 2025 – Jan 2026)",
    issuer: "Code Social",
    year: "2025",
    category: "Hackathons & Programs",
    verified: true,
    credentialId: "WoCS-2025-GG",
    skills: ["Git", "GitHub", "Open Source Collaboration", "Code Review"],
    themeColor: "#5C3D2E",
  },
  {
    id: "postman-api-expert",
    src: postmanJpg,
    alt: "Postman API Fundamentals Student Expert",
    title: "Postman API Fundamentals Student Expert",
    subtitle: "REST API Design, Testing & Collections",
    issuer: "Postman",
    year: "2025",
    category: "APIs & Tools",
    verified: true,
    credentialId: "POSTMAN-STU-EXP-2025",
    skills: ["REST APIs", "API Testing", "Postman Collections", "Automation"],
    themeColor: "#FF6C37",
  },
  {
    id: "nst-java-intern",
    src: nativeSoftTechJpg,
    alt: "Java Development Internship - NativeSoftTech",
    title: "Java Development Internship",
    subtitle: "Enterprise Backend Engineering",
    issuer: "NativeSoftTech",
    year: "2025",
    category: "Backend & Java",
    verified: true,
    credentialId: "NST/2025/JAVA/104",
    skills: ["Java", "OOP", "Backend Engineering", "Modular Architecture"],
    themeColor: "#2D5A4C",
  },
  {
    id: "ecwoc-2025",
    src: eliteCodersJpg,
    alt: "Elite Coders Winter of Code",
    title: "Elite Coders Winter of Code",
    subtitle: "Open Source Contributor",
    issuer: "Elite Coders",
    year: "2025",
    category: "Hackathons & Programs",
    verified: true,
    credentialId: "ECWOC-2025-089",
    skills: ["Open Source", "Software Engineering", "Collaboration"],
    themeColor: "#6B512E",
  },
  {
    id: "sih-2025",
    src: smartIndiaPng,
    alt: "Smart India Hackathon 2025 - Participation",
    title: "Smart India Hackathon 2025",
    subtitle: "National Innovation Finalist Team",
    issuer: "Ministry of Education & AICTE",
    year: "2025",
    category: "Hackathons & Programs",
    verified: true,
    credentialId: "SIH2025/NAT/GG",
    skills: ["Product Prototyping", "Hackathon Problem Solving", "Team Leadership"],
    themeColor: "#95573D",
  },
  {
    id: "scaler-notification-services",
    src: scalerMasterclassPng,
    alt: "Designing Seamless Notification Services",
    title: "Designing Seamless Notification Services",
    subtitle: "Distributed Notification Architectures",
    issuer: "Scaler Masterclass",
    year: "2025",
    category: "APIs & Tools",
    verified: true,
    credentialId: "SCALER-NS-2025",
    skills: ["System Design", "Notification Pipelines", "Pub/Sub", "Rate Limiting"],
    themeColor: "#7A3F2A",
  },
  {
    id: "masters-union-figma",
    src: mastersUnionJpg,
    alt: "Figma & Prototyping Workshop",
    title: "Figma & Prototyping Workshop",
    subtitle: "UI/UX & Interactive Design Systems",
    issuer: "Masters Union (DTU Groove 2025)",
    year: "2025",
    category: "APIs & Tools",
    verified: true,
    credentialId: "MU-DTU-FIG-2025",
    skills: ["Figma", "UI/UX Prototyping", "Design Systems", "Micro-interactions"],
    themeColor: "#623E63",
  },
  {
    id: "scaler-fundamentals",
    src: scalerFundamentalsPng,
    alt: "Java Course - Mastering Fundamentals",
    title: "Java Course – Mastering Fundamentals",
    subtitle: "Core Language Primitives & Memory Model",
    issuer: "Scaler Topics",
    year: "2025",
    category: "Backend & Java",
    verified: true,
    credentialId: "SCALER-JAVA-FUND",
    skills: ["Java Core", "Memory Management", "Multithreading", "Data Structures"],
    themeColor: "#2D5A4C",
  },
  {
    id: "core-java-training",
    src: coreJavaJpeg,
    alt: "Industrial Training in Core Java - Ensino R&D",
    title: "Industrial Training in Core Java",
    subtitle: "Enterprise Java Programming",
    issuer: "Ensino Research & Development",
    year: "2024",
    category: "Backend & Java",
    verified: true,
    credentialId: "ENSINO-JAVA-2024",
    skills: ["Core Java", "JDBC", "OOP", "Software Patterns"],
    themeColor: "#4B5A38",
  },
  {
    id: "youtube-clone-api",
    src: letsUpgradePng,
    alt: "Building YouTube Clone API Bootcamp",
    title: "Building YouTube Clone API Bootcamp",
    subtitle: "Media Streaming & REST Architecture",
    issuer: "LetsUpgrade",
    year: "2024",
    category: "Backend & Java",
    verified: true,
    credentialId: "LU-YT-API-2024",
    skills: ["RESTful APIs", "Express.js", "Media Streaming", "Authentication"],
    themeColor: "#C4302B",
  },
  {
    id: "web-tech-workshop",
    src: mecatredzJpg,
    alt: "National Level Workshop on Web Tech",
    title: "National Level Workshop on Web Tech",
    subtitle: "Full-Stack Web Foundations",
    issuer: "Mecatredz Technology",
    year: "2023",
    category: "APIs & Tools",
    verified: true,
    credentialId: "MECAT-WEB-2023",
    skills: ["Modern Web Standards", "HTTP Protocol", "Frontend Integration"],
    themeColor: "#3D4566",
  },
  {
    id: "trivedi-diploma",
    src: trivediJpg,
    alt: "Advance Diploma in IT & System Management",
    title: "Advance Diploma in IT & System Management",
    subtitle: "Applied Computer Science Foundations",
    issuer: "Trivedi College of IT & Management",
    year: "2019",
    category: "APIs & Tools",
    verified: true,
    credentialId: "TCIM-ADIT-2019",
    skills: ["Systems Management", "Operating Systems", "Networking", "Database Systems"],
    themeColor: "#5C3D2E",
  },
];

const CATEGORIES: CertificateCategory[] = [
  "All",
  "Backend & Java",
  "APIs & Tools",
  "Hackathons & Programs",
];

export default function CertificateCarousel() {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const certificateTrigger = useRef<HTMLElement | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Filter certificates based on category
  const filteredCerts =
    activeCategory === "All"
      ? certificatesList
      : certificatesList.filter((c) => c.category === activeCategory);

  const totalCerts = filteredCerts.length;

  // Reset active index when category changes
  const handleSelectCategory = (cat: CertificateCategory) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  const handlePrev = useCallback(() => {
    if (totalCerts === 0) return;
    setActiveIndex((prev) => (prev === 0 ? totalCerts - 1 : prev - 1));
  }, [totalCerts]);

  const handleNext = useCallback(() => {
    if (totalCerts === 0) return;
    setActiveIndex((prev) => (prev === totalCerts - 1 ? 0 : prev + 1));
  }, [totalCerts]);

  const currentCert = filteredCerts[activeIndex] || filteredCerts[0] || certificatesList[0];

  const handleStageKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (selectedCert) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    } else if (event.key === "Enter" && event.target === event.currentTarget) {
      event.preventDefault();
      certificateTrigger.current = event.currentTarget;
      setSelectedCert(currentCert);
    }
  };

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full">
      {/* Category Filters Pill Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-border/80" role="group" aria-label="Certificate category filters">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count = cat === "All" ? certificatesList.length : certificatesList.filter((c) => c.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm ring-2 ring-primary/20 scale-[1.02]"
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

      {/* Outer 3D Browser Stage Frame (Nordic Paper Aesthetic) */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label="Certificate carousel"
        onKeyDown={handleStageKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full rounded-2xl sm:rounded-3xl border border-border bg-card/70 p-4 sm:p-6 md:p-8 shadow-xl overflow-hidden select-none transition-colors"
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, hsl(var(--secondary) / 0.5) 0%, hsl(var(--card) / 0.2) 50%, transparent 100%)",
          }}
        />

        {/* Section HUD Top Bar */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 mb-4 border-b border-border/80 font-mono text-xs text-muted-foreground">
          {/* Top Left: Radar pulse + CERTIFICATE ARCHIVE */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-semibold uppercase tracking-wider text-foreground">
              CERTIFICATE ARCHIVE
            </span>
            <span className="hidden sm:inline-block text-[11px] text-muted-foreground/60">
              · {totalCerts} Total Documents
            </span>
          </div>

          {/* Top Right: Dynamic Active Counter */}
          <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
            <span className="text-foreground font-bold">
              {(activeIndex + 1).toString().padStart(2, "0")}
            </span>
            <span className="opacity-40">/</span>
            <span>{totalCerts.toString().padStart(2, "0")}</span>
          </div>
        </div>

        {/* 3D Browser Deck Stage (Awwwards Kamal style coverflow) */}
        <div
          className="relative w-full h-[380px] sm:h-[460px] md:h-[530px] flex items-center justify-center perspective-[1800px] overflow-hidden my-2 sm:my-4"
          style={{ perspective: "1800px" }}
        >
          {/* Previous Circular Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous certificate"
            className="absolute left-1 sm:left-4 md:left-6 lg:left-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/95 hover:bg-card border border-border/90 hover:border-primary text-foreground shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer group backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors -translate-x-0.5" />
          </button>

          {/* Next Circular Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next certificate"
            className="absolute right-1 sm:right-4 md:right-6 lg:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/95 hover:bg-card border border-border/90 hover:border-primary text-foreground shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer group backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors translate-x-0.5" />
          </button>

          {/* Floating Speech-Bubble Tooltip on Active Card (Inspired by Awwwards Build 365 popup) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCert.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-2 sm:top-4 z-40 hidden sm:flex flex-col items-center pointer-events-none"
            >
              <div className="bg-card/95 backdrop-blur-md border border-border text-foreground px-4 py-2 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-[280px]">
                <span className="font-serif text-sm font-semibold tracking-tight text-foreground truncate max-w-full">
                  {currentCert.title}
                </span>
                <span className="text-[11px] font-sans text-muted-foreground truncate max-w-full">
                  {currentCert.issuer} · {currentCert.year}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-primary font-bold">
                  Click to Inspect ↗
                </span>
              </div>
              {/* Speech Bubble Arrow Indicator */}
              <div className="w-2.5 h-2.5 bg-card border-r border-b border-border rotate-45 -mt-1.5 shadow-sm" />
            </motion.div>
          </AnimatePresence>

          {/* Ambient Floor Shadow under Deck */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[72%] sm:w-[58%] h-10 bg-black/20 dark:bg-black/60 blur-xl rounded-full pointer-events-none" />

          {/* 3D Browser Windows Container */}
          <div className="relative w-[72%] sm:w-[62%] md:w-[56%] lg:w-[48%] max-w-[560px] aspect-[16/11] flex items-center justify-center">
            {filteredCerts.map((cert, index) => {
              // Symmetrical shortest signed circular offset relative to activeIndex (-floor(N/2) to +floor(N/2))
              let diff = (index - activeIndex + totalCerts) % totalCerts;
              const half = Math.floor(totalCerts / 2);
              if (diff > half) {
                diff -= totalCerts;
              }

              const isActive = diff === 0;
              const isHovered = hoveredIndex === index;

              // Max visible side cards (4 on each side for desktop, clipped dynamically)
              if (Math.abs(diff) > 4) return null;

              // 3D coverflow values tuned for browser-deck perspective and responsive clearance
              const zIndex = 30 - Math.abs(diff) * 3;
              const translateX = diff * 58; // Symmetrical horizontal translation in px (clears arrows)
              const translateZ = Math.abs(diff) * -80; // Depth in 3D space
              const rotateY = diff > 0 ? -12 : diff < 0 ? 12 : 0; // Symmetrical Y-rotation angle
              const rotateZ = diff * 1.5; // Slight natural Z tilt
              const scale = isActive ? (isHovered ? 1.02 : 1.0) : Math.max(0.76, 1 - Math.abs(diff) * 0.055);
              const opacity = Math.abs(diff) > 3 ? 0.35 : Math.max(0.55, 1 - Math.abs(diff) * 0.12);

              return (
                <motion.div
                  key={cert.id}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    rotateZ: rotateZ,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (isActive) {
                      certificateTrigger.current = stageRef.current;
                      setSelectedCert(cert);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  className={`absolute inset-0 cursor-pointer ${
                    isActive ? "pointer-events-auto" : "pointer-events-auto hover:opacity-100"
                  }`}
                >
                  {/* Miniature Browser Window Container */}
                  <div
                    className={`w-full h-full rounded-2xl overflow-hidden border transition-all duration-300 bg-card flex flex-col ${
                      isActive
                        ? "border-primary/80 shadow-2xl ring-2 ring-primary/20"
                        : "border-border shadow-md hover:border-border/90"
                    }`}
                  >
                    {/* Browser Window Header Chrome Bar */}
                    <div className="flex items-center justify-between px-3.5 py-2 bg-secondary/80 border-b border-border text-[11px] font-mono select-none">
                      {/* Three Traffic Light Window Dots */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/10 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/10 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/10 inline-block" />
                      </div>

                      {/* Centered Window Address Title */}
                      <div className="flex-1 mx-3 px-2.5 py-0.5 rounded-md bg-card/60 border border-border/60 text-center truncate text-[10px] text-muted-foreground font-sans">
                        <span className="font-medium text-foreground">{cert.issuer}</span>
                        <span className="mx-1 opacity-50">·</span>
                        <span>{cert.year}</span>
                      </div>

                      {/* Top Right Neutral Document Badge */}
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold">
                        <span className="text-[9px] uppercase tracking-wider opacity-70">DOC</span>
                      </div>
                    </div>

                    {/* Browser Window Body: Full Certificate Image Surface */}
                    <div className="relative flex-1 w-full bg-[#FAF7F2] dark:bg-[#1A1815] overflow-hidden p-2 sm:p-3 flex items-center justify-center">
                      <img
                        src={cert.src}
                        alt={cert.alt}
                        className="max-h-full max-w-full object-contain rounded-md shadow-sm transition-transform duration-500 hover:scale-[1.01]"
                        loading={isActive ? "eager" : "lazy"}
                      />
                      {/* Soft Vignette Overlay for Physical Paper Depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Active Certificate Information Area & Inspection Actions */}
        <div className="mt-4 pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                {currentCert.category}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Verified Accreditation · {currentCert.year}
              </span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-foreground font-normal tracking-tight">
              {currentCert.title}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground">
              Issued by <span className="font-medium text-foreground">{currentCert.issuer}</span>
              {currentCert.subtitle ? ` — ${currentCert.subtitle}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={(event) => {
                certificateTrigger.current = event.currentTarget;
                setSelectedCert(currentCert);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-sm cursor-pointer font-medium"
            >
              <span>Inspect Document</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Radix Dialog Modal for High-Resolution Certificate Inspection */}
      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            certificateTrigger.current?.focus();
          }}
          className="max-w-3xl w-full max-h-[92vh] overflow-hidden p-0 gap-0 border-border bg-card shadow-2xl flex flex-col"
        >
          {selectedCert && (
            <>
              <DialogHeader className="p-4 sm:p-5 border-b border-border text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {selectedCert.category}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    Accreditation Year: {selectedCert.year}
                  </span>
                </div>
                <DialogTitle className="font-serif text-xl sm:text-2xl text-foreground font-normal tracking-tight">
                  {selectedCert.title}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground font-sans">
                  Issued by <strong className="text-foreground">{selectedCert.issuer}</strong>
                  {selectedCert.subtitle ? ` · ${selectedCert.subtitle}` : ""}
                </DialogDescription>
              </DialogHeader>

              {/* Document Display Area */}
              <div className="p-4 sm:p-6 flex-1 overflow-auto flex items-center justify-center bg-secondary/30">
                <img
                  src={selectedCert.src}
                  alt={selectedCert.alt}
                  className="max-h-[62vh] w-auto max-w-full object-contain rounded-lg shadow-md border border-border bg-[#FAF7F2] dark:bg-[#1A1815]"
                />
              </div>

              {/* Footer with Metadata & High-Resolution Link */}
              <div className="p-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-card text-xs font-mono">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4 text-primary" />
                  <span>ID: {selectedCert.credentialId || "VERIFIED-PORTFOLIO-CERT"}</span>
                </div>
                <a
                  href={selectedCert.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors"
                >
                  <span>Open Full Resolution</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
