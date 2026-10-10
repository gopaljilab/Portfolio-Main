import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";
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

interface Cert {
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  image: string;
  featured: boolean;
}

const certifications: Cert[] = [
  // ── Featured (shown by default) ──────────────────────────────────────────
  {
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    year: "2025",
    credentialId: "POSTMAN-API-EXPERT",
    image: postmanJpg,
    featured: true,
  },
  {
    title: "Java Development Internship",
    issuer: "NativeSoftTech",
    year: "2025",
    credentialId: "NST-JAVA-INTERN-COMP",
    image: nativeSoftTechJpg,
    featured: true,
  },
  {
    title: "Virtual Internship in SQL",
    issuer: "RD INFRO TECHNOLOGY",
    year: "2025",
    credentialId: "RDSQL10DD",
    image: rdInfroSqlPng,
    featured: true,
  },
  {
    title: "Winter of Code Social 2025",
    issuer: "Code Social",
    year: "2026",
    credentialId: "WOCS-2025-CONTRIB",
    image: wocPng,
    featured: true,
  },
  {
    title: "Elite Coders Winter of Code",
    issuer: "Elite Coders",
    year: "2025",
    credentialId: "ECWOC-2025",
    image: eliteCodersJpg,
    featured: true,
  },
  {
    title: "Java Course – Mastering Fundamentals",
    issuer: "Scaler Topics",
    year: "2025",
    credentialId: "SCALER-JAVA-FUNDAMENTALS",
    image: scalerFundamentalsPng,
    featured: true,
  },
  // ── Additional (hidden by default) ───────────────────────────────────────
  {
    title: "Smart India Hackathon 2025 – Participation",
    issuer: "Ministry of Education & AICTE",
    year: "2025",
    credentialId: "SIH-2025-GOPAL",
    image: smartIndiaPng,
    featured: false,
  },
  {
    title: "Industrial Training in Core Java",
    issuer: "Ensino Research & Development",
    year: "2024",
    credentialId: "ERD/D/21/07312",
    image: coreJavaJpeg,
    featured: false,
  },
  {
    title: "Building YouTube Clone API Bootcamp",
    issuer: "LetsUpgrade",
    year: "2024",
    credentialId: "LUEYTCAUG124371",
    image: letsUpgradePng,
    featured: false,
  },
  {
    title: "Designing Seamless Notification Services",
    issuer: "Scaler Masterclass",
    year: "2025",
    credentialId: "SCALER-MASTERCLASS-NS",
    image: scalerMasterclassPng,
    featured: false,
  },
  {
    title: "Figma & Prototyping Workshop",
    issuer: "Masters Union (DTU Groove 2025)",
    year: "2025",
    credentialId: "MU-FIGMA-DTU",
    image: mastersUnionJpg,
    featured: false,
  },
  {
    title: "Web Technologies Workshop",
    issuer: "Mecatredz Technology (MMIT Aligarh)",
    year: "2022",
    credentialId: "COMPLETION-2022",
    image: mecatredzJpg,
    featured: false,
  },
  {
    title: "Advance Diploma in IT & System Management",
    issuer: "Trivedi College of IT & Management",
    year: "2019",
    credentialId: "Reg. 269",
    image: trivediJpg,
    featured: false,
  },
];

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.07 }}
      className="h-full"
    >
      <TiltCard
        maxTilt={4}
        scale={1.015}
        className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all group hover:shadow-md flex flex-col h-full shadow-sm"
      >
        {/* Certificate thumbnail */}
        <div className="relative aspect-video mb-4 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ExternalLink className="w-7 h-7 text-white opacity-80" />
          </div>
        </div>

        <div className="flex-1">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-primary">
            <Award className="w-5 h-5" />
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {cert.title}
          </h3>

          <div className="flex flex-col gap-0.5 mb-3">
            <p className="text-slate-600 dark:text-slate-300 font-bold text-sm">{cert.issuer}</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">Issued {cert.year}</p>
          </div>

          {cert.credentialId && (
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mb-3 break-all opacity-60">
              ID: {cert.credentialId}
            </p>
          )}
        </div>

        <button
          onClick={() => window.open(cert.image, "_blank")}
          className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline group/link mt-auto uppercase tracking-wider"
        >
          View Certificate
          <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </button>
      </TiltCard>
    </motion.div>
  );
}

export function Achievements() {
  const [showAll, setShowAll] = useState(false);

  const featured = certifications.filter((c) => c.featured);
  const extra = certifications.filter((c) => !c.featured);
  const visibleCerts = showAll ? certifications : featured;

  return (
    <Section id="achievements" title="Certifications" subtitle="Professional Credentials">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCerts.map((cert, index) => (
          <CertCard key={cert.credentialId} cert={cert} index={index} />
        ))}
      </div>

      {/* View all / Collapse toggle */}
      {extra.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary/50 hover:text-primary transition-all shadow-sm"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show fewer certifications
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                View all {certifications.length} certifications
              </>
            )}
          </button>
        </div>
      )}
    </Section>
  );
}
