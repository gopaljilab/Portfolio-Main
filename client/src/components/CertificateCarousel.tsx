"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import type { CarouselImageItem } from "@/components/v1/skiper49";
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
    alt: "Winter of Code Social 2025 Certificate of Participation",
    title: "Winter of Code Social 2025",
    issuer: "Code Social",
    year: "2025",
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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const totalCerts = certificatesList.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalCerts - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalCerts - 1 ? 0 : prev + 1));
  };

  const currentCert = certificatesList[activeIndex];

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
        className="w-full"
      >
        {/* Main 3D Deck Outer Paper Stage */}
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl border border-border bg-card/60 p-4 sm:p-6 md:p-8 shadow-xl overflow-hidden select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Ambient Background Gradient Grid */}
          <div className="absolute inset-0 bg-radial from-secondary/40 via-card/10 to-transparent pointer-events-none -z-10" />

          {/* HUD Top Bar */}
          <div className="flex items-center justify-between pb-6 mb-4 border-b border-border/80 font-mono text-xs text-muted-foreground">
            {/* Top Left: Status Label */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-semibold uppercase tracking-wider text-foreground">
                VERIFIED CREDENTIALS
              </span>
            </div>

            {/* Top Middle: Active Credential Title Preview (Hidden on Small Screens) */}
            <div className="hidden md:flex items-center gap-2 text-foreground font-sans text-xs">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span className="truncate max-w-[320px] font-medium">{currentCert.title}</span>
            </div>

            {/* Top Right: Counter HUD */}
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-foreground font-bold text-sm">
                {(activeIndex + 1).toString().padStart(2, "0")}
              </span>
              <span className="opacity-40">/</span>
              <span>{totalCerts.toString().padStart(2, "0")}</span>
            </div>
          </div>

          {/* 3D Fanned Deck Stage */}
          <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] flex items-center justify-center perspective-[1800px] overflow-hidden my-4">
            
            {/* Circular Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous certificate"
              className="absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-card/90 hover:bg-card border border-border/90 hover:border-primary text-foreground shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer group"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors -translate-x-0.5" />
            </button>

            {/* Circular Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next certificate"
              className="absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-card/90 hover:bg-card border border-border/90 hover:border-primary text-foreground shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer group"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors translate-x-0.5" />
            </button>

            {/* Ambient Floor Shadow under the cards */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] sm:w-[55%] h-8 bg-black/20 dark:bg-black/50 blur-xl rounded-full pointer-events-none" />

            {/* Fanned Cards Stack */}
            <div className="relative w-[82%] sm:w-[68%] md:w-[58%] lg:w-[50%] max-w-[580px] aspect-[16/11] flex items-center justify-center">
              {certificatesList.map((cert, index) => {
                // Calculate offset relative to active card
                let diff = (index - activeIndex + totalCerts) % totalCerts;
                // Normalize diff so cards wrap naturally: -3 to +9
                if (diff > totalCerts / 2) {
                  diff -= totalCerts;
                }

                const isActive = diff === 0;
                // Only render cards close enough to the active one for performance and clarity
                if (Math.abs(diff) > 5) return null;

                // 3D positioning:
                // Active card is centered, largest, highest z-index
                // Cards fan out toward the right and slightly behind, or queue from left
                const zIndex = 30 - Math.abs(diff) * 3;
                const translateX = diff * 38; // px offset
                const translateY = Math.abs(diff) * -6; // slight arc
                const rotateZ = diff * 2.8; // degrees
                const rotateY = diff > 0 ? -12 : diff < 0 ? 12 : 0;
                const scale = isActive ? 1.0 : Math.max(0.78, 1 - Math.abs(diff) * 0.055);
                const opacity = Math.abs(diff) > 4 ? 0 : Math.max(0.35, 1 - Math.abs(diff) * 0.16);

                return (
                  <motion.div
                    key={cert.id}
                    animate={{
                      x: translateX,
                      y: translateY,
                      rotateZ: rotateZ,
                      rotateY: rotateY,
                      scale: scale,
                      opacity: opacity,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      zIndex,
                      transformStyle: "preserve-3d",
                    }}
                    className={`absolute inset-0 cursor-pointer ${
                      isActive ? "pointer-events-auto" : "pointer-events-auto hover:opacity-100"
                    }`}
                    onClick={() => {
                      if (isActive) {
                        setSelectedCert(cert);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-2xl overflow-hidden border transition-all duration-300 bg-card ${
                        isActive
                          ? "border-primary/60 shadow-2xl ring-2 ring-primary/20 scale-[1.01]"
                          : "border-border shadow-md hover:border-border/90"
                      }`}
                    >
                      {/* Realistic Document Top Header Bar */}
                      <div className="flex items-center justify-between px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/80 border-b border-border text-[10px] sm:text-xs font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400/80 inline-block" />
                          <span className="w-2 h-2 rounded-full bg-yellow-400/80 inline-block" />
                          <span className="w-2 h-2 rounded-full bg-green-400/80 inline-block" />
                          <span className="ml-1 text-muted-foreground truncate max-w-[120px] sm:max-w-[200px]">
                            {cert.issuer}
                          </span>
                        </div>
                        <span className="text-primary font-semibold">{cert.year}</span>
                      </div>

                      {/* Certificate Full Image */}
                      <div className="relative w-full h-[calc(100%-26px)] sm:h-[calc(100%-32px)] bg-secondary/40 overflow-hidden">
                        <img
                          src={cert.src}
                          alt={cert.alt}
                          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                          loading="lazy"
                        />
                        {/* Overlay Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-card/30 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Active Card Bottom Details & Inspection Trigger */}
          <div className="mt-4 pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                  {currentCert.category}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  Verified in {currentCert.year}
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-foreground font-normal tracking-tight">
                {currentCert.title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground">
                Issued by {currentCert.issuer}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedCert(currentCert)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-xs cursor-pointer font-medium"
              >
                <span>Inspect Document</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Accessible Radix Dialog Modal */}
        <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
          <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-hidden p-0 gap-0 border-border bg-card shadow-2xl flex flex-col">
            {selectedCert && (
              <>
                <DialogHeader className="p-4 sm:p-5 border-b border-border text-left">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary block">
                    {selectedCert.category} · {selectedCert.year}
                  </span>
                  <DialogTitle className="font-serif text-xl sm:text-2xl text-foreground font-normal tracking-tight">
                    {selectedCert.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground font-sans">
                    Issued by {selectedCert.issuer}
                  </DialogDescription>
                </DialogHeader>

                <div className="p-4 sm:p-6 flex-1 overflow-auto flex items-center justify-center bg-secondary/30">
                  <img
                    src={selectedCert.src}
                    alt={selectedCert.alt}
                    className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-sm border border-border"
                  />
                </div>

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
              </>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </Section>
  );
}
