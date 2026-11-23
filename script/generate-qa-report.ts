import fs from "fs";
import path from "path";

// Inventory definition matching actual client source code
const inventory = {
  generatedAt: new Date().toISOString(),
  portfolioVersion: "Nordic Paper v2.0",
  designAesthetic: {
    theme: "Nordic Paper / Nordic Night",
    primaryColors: {
      light: "#95573D (High-Contrast Terracotta, WCAG 2.2 AA compliant)",
      dark: "#DCA48B (Muted Terracotta)"
    },
    typography: {
      serifHeadings: "Instrument Serif",
      sansBody: "DM Sans",
      monoLabels: "JetBrains Mono"
    }
  },
  sections: [
    { id: "home", number: "--", title: "Hero", description: "Introduction, title, location, availability, and profile portrait" },
    { id: "stats", number: "00", title: "Snapshot & Engineering Activity", description: "4-metric ledger, full-width GitHub commit chart, and LeetCode problem solving breakdown" },
    { id: "projects", number: "01", title: "Selected Works", description: "7 editorial projects with interactive category filters and expandable case studies" },
    { id: "skills", number: "02", title: "Tools of the trade", description: "3 categorized skill columns, interactive system design pipeline strip, and deployment principles" },
    { id: "experience", number: "03", title: "Experience & Open Source", description: "Career ledger spanning 6 open-source leadership, contributor, internship, and training milestones" },
    { id: "education", number: "04", title: "Education & Foundations", description: "3 formal academic qualifications including B.E. in CSE, Diploma, and Advance Diploma" },
    { id: "achievements", number: "05", title: "Professional Credentials", description: "13 verified credentials available via default coverflow carousel or editorial grid with Radix Dialog modal" },
    { id: "contact", number: "06", title: "Collaboration & Contact", description: "Direct email card, copy-to-clipboard, social profiles, and validated EmailJS message dispatch" }
  ],
  projects: [
    {
      id: "gavs-munim",
      number: "01",
      title: "GAVS-MUNIM — AI Procurement & Profitability Engine",
      category: "Full Stack",
      tags: ["Java 21", "Spring Boot", "PostgreSQL", "React", "TypeScript", "Docker"],
      github: "https://github.com/gopaljilab/GAVS-MUNIM",
      documentation: "https://github.com/gopaljilab/GAVS-MUNIM#readme",
      liveDemo: null
    },
    {
      id: "clinical-insight-engine",
      number: "02",
      title: "Clinical Insight Engine",
      category: "AI & ML",
      tags: ["Python", "Machine Learning", "React", "Express.js", "PostgreSQL", "Healthcare"],
      github: "https://github.com/gopaljilab/Clinical-Insight-Engine",
      documentation: "https://github.com/gopaljilab/Clinical-Insight-Engine#readme",
      liveDemo: null
    },
    {
      id: "netshield",
      number: "03",
      title: "NetShield — AI Network Intrusion Detection System",
      category: "Security",
      tags: ["FastAPI", "Python", "XGBoost", "React", "TypeScript", "Cybersecurity", "Docker"],
      github: "https://github.com/gopaljilab/NetShield",
      documentation: "https://github.com/gopaljilab/NetShield#readme",
      liveDemo: null
    },
    {
      id: "mealsync",
      number: "04",
      title: "MealSync — Intelligent Food Management Platform",
      category: "Full Stack",
      tags: ["React 19", "TypeScript", "Express 5", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
      github: "https://github.com/gopaljilab/MealSync",
      documentation: "https://github.com/gopaljilab/MealSync#readme",
      liveDemo: null
    },
    {
      id: "om-restaurant",
      number: "05",
      title: "Om Restaurant Management System",
      category: "Full Stack",
      tags: ["Java", "Spring Boot", "MySQL", "React", "REST API"],
      github: "https://github.com/gopaljilab/OmRestaurant",
      documentation: null,
      liveDemo: "https://omrestaurant.vercel.app/"
    },
    {
      id: "samarth-loan",
      number: "06",
      title: "SamarthLoan — Smart Credit Navigator",
      category: "Full Stack",
      tags: ["React", "Tailwind CSS", "i18n", "EMI Calculator", "Public Service"],
      github: "https://github.com/gopaljilab/SamarthLoan",
      documentation: "https://github.com/gopaljilab/SamarthLoan/blob/main/docs/phase-2-architecture.md",
      liveDemo: "https://samarthloan.netlify.app/"
    },
    {
      id: "ncvet-blockchain",
      number: "07",
      title: "NCVET Blockchain Certification System",
      category: "Web3",
      tags: ["React", "Web3.js", "Ethereum", "IPFS", "Hardhat", "Sepolia", "Smart Contracts"],
      github: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System",
      documentation: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System#readme",
      liveDemo: "https://www.figma.com/make/AB1LEuPmvUhr1fMaDX3q3w/Blockchain-Certificate-Platform-Prototype?fullscreen=1&t=rLkYbttE95UaCYCf-1"
    }
  ],
  certificatesCount: 13,
  certificates: [
    { id: "woc-social-2025", title: "Winter of Code Social 2025", issuer: "Code Social", year: "2025", category: "Open Source" },
    { id: "postman-api-expert", title: "Postman API Fundamentals Student Expert", issuer: "Postman", year: "2025", category: "Backend" },
    { id: "nst-java-intern", title: "Java Development Internship", issuer: "NativeSoftTech", year: "2025", category: "Backend" },
    { id: "rd-sql-intern", title: "Virtual Internship in SQL", issuer: "RD Infro Technology", year: "2025", category: "Database" },
    { id: "ecwoc-2025", title: "Elite Coders Winter of Code", issuer: "Elite Coders", year: "2025", category: "Open Source" },
    { id: "sih-2025", title: "Smart India Hackathon 2025", issuer: "Ministry of Education & AICTE", year: "2025", category: "Open Source" },
    { id: "scaler-notification-services", title: "Designing Seamless Notification Services", issuer: "Scaler Masterclass", year: "2025", category: "Backend" },
    { id: "masters-union-figma", title: "Figma & Prototyping Workshop", issuer: "Masters Union (DTU Groove 2025)", year: "2025", category: "Foundations" },
    { id: "scaler-fundamentals", title: "Java Course – Mastering Fundamentals", issuer: "Scaler Topics", year: "2025", category: "Foundations" },
    { id: "core-java-training", title: "Industrial Training in Core Java", issuer: "Ensino Research & Development", year: "2024", category: "Foundations" },
    { id: "youtube-clone-api", title: "Building YouTube Clone API Bootcamp", issuer: "LetsUpgrade", year: "2024", category: "Backend" },
    { id: "web-tech-workshop", title: "National Level Workshop on Web Tech", issuer: "Mecatredz Technology", year: "2023", category: "Foundations" },
    { id: "trivedi-diploma", title: "Advance Diploma in IT & System Management", issuer: "Trivedi College of IT & Management", year: "2019", category: "Foundations" }
  ],
  experienceCount: 6,
  experiences: [
    { role: "Project Admin & Contributor", company: "GirlScript Summer of Code", date: "May 2026 – Aug 2026", type: "Open Source Leadership" },
    { role: "ECWoC'26 Contributor", company: "Elite Coders", date: "Jan 2026 – Feb 2026", type: "Contributor" },
    { role: "Open Source Contributor", company: "Social Winter of Code 2025", date: "Nov 2025 – Jan 2026", type: "Contributor" },
    { role: "SQL Intern", company: "RD Infro Technology", date: "Mar 2025 – Apr 2025", type: "Internship" },
    { role: "Java Intern", company: "NativeSoftTech", date: "Dec 2024 – Feb 2025", type: "Internship" },
    { role: "Java with JSP Training", company: "Arcane Programming Infotech", date: "Jul 2023 – Sep 2023", type: "Training" }
  ],
  educationCount: 3,
  education: [
    { degree: "B.E. in Computer Science & Engineering", institution: "Bengaluru Technological Institute", period: "2025 – 2028 (Expected)", status: "Pursuing" },
    { degree: "Diploma in Computer Science & Engineering", institution: "Mahamaya Polytechnic of Information Technology", period: "2021 – 2024", status: "Completed" },
    { degree: "Advance Diploma in IT & System Management", institution: "Trivedi College of IT & Management (NIELIT / DOEACC Approved)", period: "2018 – 2019", status: "Grade B (Honours)" }
  ],
  contact: {
    email: "gopaljilab@gmail.com",
    location: "Bengaluru, Karnataka, India",
    deliveryService: "EmailJS (@emailjs/browser) with client-side validation"
  },
  resumeUrl: "/resume.pdf"
};

const outputDir = path.resolve(process.cwd(), "docs/qa");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, "qa-full-report.json"), JSON.stringify(inventory, null, 2));
console.log("QA inventory written to docs/qa/qa-full-report.json");
