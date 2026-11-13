"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, LayoutGrid, Sparkles, X } from "lucide-react";
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
    issuer: "RD INFRO TECHNOLOGY",
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
    id: "woc-social-2025",
    src: wocPng,
    alt: "Winter of Code Social 2025",
    title: "Winter of Code Social 2025",
    issuer: "Code Social",
    year: "2026",
    category: "Open Source",
    featured: true,
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
    id: "web-tech-workshop",
    src: mecatredzJpg,
    alt: "Web Technologies Workshop - Mecatredz",
    title: "Web Technologies Workshop",
    issuer: "Mecatredz Technology (MMIT Aligarh)",
    year: "2022",
    category: "Foundations",
    featured: false,
  },
  {
    id: "trivedi-advance-diploma",
    src: trivediJpg,
    alt: "Advance Diploma in IT & System Management",
    title: "Advance Diploma in IT & System Management",
    issuer: "Trivedi College of IT & Management",
    year: "2019",
    category: "Foundations",
    featured: false,
  },
];

export default function CertificateCarousel() {
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  return (
    <section id="achievements" className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header styled with Instrument Serif */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 text-xs font-mono font-semibold tracking-widest uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Accreditations</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-slate-900 dark:text-slate-100 mb-4 leading-tight">
            Professional Credentials
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-sans text-sm sm:text-base leading-relaxed">
            Drag or swipe across the 3D perspective deck to explore my technical certifications,
            hackathon recognitions, and production-level developer internships.
          </p>

          {/* Controls toggle between 3D Carousel & Grid view */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setViewMode("carousel")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                viewMode === "carousel"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-foreground"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D Carousel</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All ({certificatesList.length}) Grid</span>
            </button>
          </div>
        </div>

        {/* Inverted Perspective Carousel Component View */}
        {viewMode === "carousel" ? (
          <div className="w-full flex justify-center">
            <Carousel_003
              images={certificatesList}
              showPagination={true}
              showNavigation={true}
              loop={true}
              autoplay={{ delay: 3200, disableOnInteraction: false }}
              spaceBetween={0}
              onImageClick={(item) => setSelectedCert(item as CertificateData)}
            />
          </div>
        ) : (
          /* Grid View of all 13 certificates */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificatesList.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="cursor-pointer group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={cert.src}
                    alt={cert.title || cert.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg">
                      View Certificate <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cert.issuer}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span>{cert.category}</span>
                    <span>{cert.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800">
                <div className="min-w-0 pr-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                    {selectedCert.issuer} • Issued {selectedCert.year}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={selectedCert.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950/20 p-2 sm:p-4 flex items-center justify-center">
                <img
                  src={selectedCert.src}
                  alt={selectedCert.title}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export { CertificateCarousel };
