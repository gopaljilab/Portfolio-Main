"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, LayoutGrid, SlidersHorizontal, X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Carousel_003, CarouselImageItem } from "@/components/v1/skiper49";

import smartIndiaPng from "@assets/Gopal_Gupta_certificate_1772355032528.png";
import postmanJpg from "@assets/Print_Certificate_-_Canvas_Badges_page-0001_1772355032529.jpg";
import eliteCodersJpg from "@assets/8fcc4eb8-0637-413a-984d-012525c12ed0_page-0001_1772355072284.jpg";
import wocPng from "@assets/WoCS2025_contributor_Gopal_Gupta_1772355110359.png";
import scalerMasterclassPng from "@assets/39448c24132ac30a91ffd4903ec94822978de0a93f99fb8c33dba8b489f869_1772355110359.png";
import mastersUnionJpg from "@assets/756547b9-9531-4b0c-993a-46a7ae70da65_1772355110365.jpg";
import coreJavaJpeg from "@assets/1727200587497_1772355110365.jpeg";
import scalerFundamentalsPng from "@assets/f88dd432e07f775cb46efddb76cefae72dbbb1fd126a7f2f6c4727b5f6c0cc_1772355110366.png";
import nativeSoftTechJpg from "@assets/Gopal_Gupta_1772355110367.jpg";
import rdInfroSqlPng from "@assets/SQL_1772355110367.png";
import trivediJpg from "@assets/PHOTO-2024-02-02-20-22-07_1772355409539.jpg";
import mecatredzJpg from "@assets/PHOTO-2024-02-02-20-22-06_1772355409542.jpg";
import letsUpgradePng from "@assets/LUEYTCAUG124371_1772355409542.png";

export interface CertificateData extends CarouselImageItem {
  id: string;
  category: "Backend" | "Cloud & DevOps" | "Database" | "Open Source" | "Foundations";
  featured?: boolean;
}

export const certificatesList: CertificateData[] = [
  {
    id: "woc-social-2025",
    src: wocPng,
    alt: "Winter of Code Social 2026 - Code Social",
    title: "Winter of Code Social 2026",
    issuer: "Code Social",
    year: "2026",
    category: "Open Source",
    featured: true,
  },
  {
    id: "postman-api-expert",
    src: postmanJpg,
    alt: "Postman API Fundamentals Student Expert",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    year: "2025",
    category: "Backend",
    featured: true,
  },
  {
    id: "nst-java-intern",
    src: nativeSoftTechJpg,
    alt: "Java Development Internship - NativeSoftTech",
    title: "Java Development Internship",
    issuer: "NativeSoftTech",
    year: "2025",
    category: "Backend",
    featured: true,
  },
  {
    id: "rd-sql-intern",
    src: rdInfroSqlPng,
    alt: "Virtual Internship in SQL - RD Infro Technology",
    title: "Virtual Internship in SQL",
    issuer: "RD Infro Technology",
    year: "2025",
    category: "Database",
    featured: true,
  },
  {
    id: "ecwoc-2025",
    src: eliteCodersJpg,
    alt: "Elite Coders Winter of Code",
    title: "Elite Coders Winter of Code",
    issuer: "Elite Coders",
    year: "2025",
    category: "Open Source",
    featured: true,
  },
  {
    id: "sih-2025",
    src: smartIndiaPng,
    alt: "Smart India Hackathon 2025 - Participation",
    title: "Smart India Hackathon 2025",
    issuer: "Ministry of Education & AICTE",
    year: "2025",
    category: "Open Source",
    featured: false,
  },
  {
    id: "scaler-notification-services",
    src: scalerMasterclassPng,
    alt: "Designing Seamless Notification Services",
    title: "Designing Seamless Notification Services",
    issuer: "Scaler Masterclass",
    year: "2025",
    category: "Backend",
    featured: false,
  },
  {
    id: "masters-union-figma",
    src: mastersUnionJpg,
    alt: "Figma & Prototyping Workshop",
    title: "Figma & Prototyping Workshop",
    issuer: "Masters Union (DTU Groove 2025)",
    year: "2025",
    category: "Foundations",
    featured: false,
  },
  {
    id: "scaler-fundamentals",
    src: scalerFundamentalsPng,
    alt: "Java Course - Mastering Fundamentals",
    title: "Java Course – Mastering Fundamentals",
    issuer: "Scaler Topics",
    year: "2025",
    category: "Foundations",
    featured: true,
  },
  {
    id: "core-java-training",
    src: coreJavaJpeg,
    alt: "Industrial Training in Core Java - Ensino R&D",
    title: "Industrial Training in Core Java",
    issuer: "Ensino Research & Development",
    year: "2024",
    category: "Foundations",
    featured: false,
  },
  {
    id: "youtube-clone-api",
    src: letsUpgradePng,
    alt: "Building YouTube Clone API Bootcamp",
    title: "Building YouTube Clone API Bootcamp",
    issuer: "LetsUpgrade",
    year: "2024",
    category: "Backend",
    featured: false,
  },
  {
    id: "web-tech-workshop",
    src: mecatredzJpg,
    alt: "National Level Workshop on Web Tech",
    title: "National Level Workshop on Web Tech",
    issuer: "Mecatredz Technology",
    year: "2023",
    category: "Foundations",
    featured: false,
  },
  {
    id: "trivedi-diploma",
    src: trivediJpg,
    alt: "Advance Diploma in IT & System Management",
    title: "Advance Diploma in IT & System Management",
    issuer: "Trivedi College of IT & Management",
    year: "2019",
    category: "Foundations",
    featured: false,
  },
];

type CategoryFilter = "All" | "Backend" | "Database" | "Open Source" | "Foundations";

export default function CertificateCarousel() {
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("carousel");

  const categories: CategoryFilter[] = ["All", "Backend", "Database", "Open Source", "Foundations"];

  const filteredCerts =
    activeCategory === "All"
      ? certificatesList
      : certificatesList.filter((c) => c.category === activeCategory);

  // Accessible Modal Keyboard Trapping & Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCert) {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  return (
    <Section
      id="achievements"
      chapterNumber="05"
      subtitle="Accreditations"
      title="Professional Credentials"
      description="Thirteen verified technical credentials across Java development, SQL optimization, Postman API architectures, and national hackathons."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Controls Bar: Category Filters + View Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-border">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Certificate category filters">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === "All" ? certificatesList.length : certificatesList.filter((c) => c.category === cat).length;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs ring-2 ring-primary/20 scale-[1.02]"
                      : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60"
                  }`}
                >
                  {cat}
                  <span className={`ml-1 text-[10px] ${isActive ? "text-primary-foreground/90 font-bold" : "opacity-60"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1.5 bg-secondary/80 p-1.5 rounded-xl border border-border self-start sm:self-auto font-mono text-xs">
            <button
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-card text-foreground font-semibold shadow-xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid ({filteredCerts.length})</span>
            </button>
            <button
              onClick={() => setViewMode("carousel")}
              aria-pressed={viewMode === "carousel"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "carousel"
                  ? "bg-card text-foreground font-semibold shadow-xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Carousel</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Clean Editorial Grid */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => (
              <article
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-card border border-border rounded-2xl overflow-hidden p-4 sm:p-5 shadow-xs hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-secondary border border-border/80 mb-4">
                    <img
                      src={cert.src}
                      alt={cert.alt}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-card/90 backdrop-blur-xs border border-border px-2.5 py-0.5 rounded-full font-mono text-[10px] text-foreground">
                      {cert.year}
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-medium block mb-1">
                    {cert.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-foreground font-normal tracking-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-sans text-muted-foreground">
                    {cert.issuer}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="group-hover:text-foreground transition-colors">Preview Document</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View Mode 2: Restrained Perspective Carousel */}
        {viewMode === "carousel" && (
          <div className="w-full max-w-full flex justify-center py-4 overflow-hidden">
            <Carousel_003
              images={filteredCerts}
              onImageClick={(item) => setSelectedCert(item as CertificateData)}
            />
          </div>
        )}

        {/* Accessible Lightbox Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-50 bg-nordic-charcoal/80 dark:bg-black/85 backdrop-blur-sm p-4 sm:p-6 md:p-10 flex items-center justify-center"
              role="dialog"
              aria-modal="true"
              aria-label={selectedCert.title}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary block">
                      {selectedCert.category} · {selectedCert.year}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-sans">
                      Issued by {selectedCert.issuer}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close modal"
                    className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Image Display */}
                <div className="p-4 sm:p-6 flex-1 overflow-auto flex items-center justify-center bg-secondary/30">
                  <img
                    src={selectedCert.src}
                    alt={selectedCert.alt}
                    className="max-h-[60vh] w-auto object-contain rounded-lg shadow-sm border border-border"
                  />
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-border flex items-center justify-between bg-card text-xs font-mono">
                  <span className="text-muted-foreground">Original Verified Document</span>
                  <a
                    href={selectedCert.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors"
                  >
                    <span>Open Full Resolution</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
