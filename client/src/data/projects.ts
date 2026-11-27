export interface ProjectItem {
  id: string;
  number: string;
  tabLabel: string;
  category: string;
  title: string;
  description: string;
  highlight?: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  accentBadge: string;
  shadowColor: string;
  image: { name: string; width: number; height: number; smallWidth: number };
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
    title: "MUNIM",
    description: "Procurement and quoting software for sheet-metal fabrication businesses.",
    highlight: "Deterministic pricing calculations and SHA-256 approval seals.",
    accentColor: "#E05A36", // Vibrant terracotta/burnt orange
    accentBg: "bg-[#E05A36]",
    accentBorder: "border-[#C24524]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(224, 90, 54, 0.45)",
    image: { name: "gavs-munim", width: 1050, height: 586, smallWidth: 539 },
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "React", "TypeScript", "Docker"],
    primaryCtaText: "View codebase",
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
    title: "Clinical Insight",
    description: "Decision-support research prototype that surfaces interpretable diabetes risk signals.",
    highlight: "Built a scikit-learn pipeline with SHAP explanations and separate clinician and patient views.",
    accentColor: "#10B981", // Emerald green
    accentBg: "bg-[#10B981]",
    accentBorder: "border-[#059669]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(16, 185, 129, 0.45)",
    image: { name: "clinical-insight", width: 920, height: 296, smallWidth: 540 },
    tags: ["Python", "Machine Learning", "React", "Express.js", "PostgreSQL", "Healthcare"],
    primaryCtaText: "View codebase",
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
    title: "NetShield",
    description: "Defensive network monitoring platform that classifies traffic and visualizes detections.",
    highlight: "Integrated an XGBoost classifier with a FastAPI service and an interactive SOC dashboard.",
    accentColor: "#3B82F6", // Cobalt blue
    accentBg: "bg-[#3B82F6]",
    accentBorder: "border-[#2563EB]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(59, 130, 246, 0.45)",
    image: { name: "netshield", width: 1050, height: 586, smallWidth: 539 },
    tags: ["FastAPI", "Python", "XGBoost", "React", "TypeScript", "Cybersecurity", "Docker"],
    primaryCtaText: "View codebase",
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
    title: "MealSync",
    description: "Meal planning and surplus redistribution for hostels and shared-living communities.",
    highlight: "Built meal confirmation, demand forecasting, and donation tracking for partner NGOs.",
    accentColor: "#EAB308", // Golden yellow
    accentBg: "bg-[#EAB308]",
    accentBorder: "border-[#CA8A04]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(234, 179, 8, 0.45)",
    image: { name: "mealsync", width: 1024, height: 512, smallWidth: 540 },
    tags: ["React 19", "TypeScript", "Express 5", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    primaryCtaText: "View codebase",
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
    title: "Om Restaurant",
    description:
      "A full-featured restaurant operations platform handling multi-table orders, live inventory tracking, staff shifts, and real-time sales dashboards. Reduced order-handling steps from 5 to 2 with Spring Boot REST services, JPA transactions, and a responsive React single-page frontend.",
    accentColor: "#EC4899", // Magenta/pink
    accentBg: "bg-[#EC4899]",
    accentBorder: "border-[#DB2777]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(236, 72, 153, 0.45)",
    image: { name: "om", width: 1024, height: 539, smallWidth: 540 },
    tags: ["Java", "Spring Boot", "MySQL", "React", "REST API", "Vercel"],
    primaryCtaText: "Visit live project",
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
    title: "SamarthLoan",
    description:
      "A public-service companion that turns India's complex government loan schemes into a clear digital pathway — calculate EMI, match schemes (MUDRA, Standup India), and track applications in English, Hindi, or Kannada with interactive facilitator guidance.",
    accentColor: "#8B5CF6", // Purple/violet
    accentBg: "bg-[#8B5CF6]",
    accentBorder: "border-[#7C3AED]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(139, 92, 246, 0.45)",
    image: { name: "samarthloan", width: 1049, height: 579, smallWidth: 540 },
    tags: ["React", "Tailwind CSS", "i18n", "EMI Calculator", "Public Service"],
    primaryCtaText: "Visit live project",
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
    title: "NCVET Platform",
    description:
      "A decentralized credentialing platform engineered to eliminate certificate forgery and manual verification delays in India's vocational education ecosystem. Built on Ethereum Sepolia with IPFS storage, MetaMask cryptographic signing, and instant tamper-proof QR verification.",
    accentColor: "#06B6D4", // Cyan/teal
    accentBg: "bg-[#06B6D4]",
    accentBorder: "border-[#0891B2]",
    accentBadge: "bg-[#111111] text-[#FFFFFF]",
    shadowColor: "rgba(6, 182, 212, 0.45)",
    image: { name: "ncvet", width: 1050, height: 541, smallWidth: 540 },
    tags: ["React", "Web3.js", "Ethereum", "IPFS", "Hardhat", "Sepolia", "Smart Contracts"],
    primaryCtaText: "Explore prototype",
    primaryCtaLink: "https://www.figma.com/make/AB1LEuPmvUhr1fMaDX3q3w/Blockchain-Certificate-Platform-Prototype?fullscreen=1&t=rLkYbttE95UaCYCf-1",
    secondaryLinks: [
      { label: "Live Prototype", url: "https://www.figma.com/make/AB1LEuPmvUhr1fMaDX3q3w/Blockchain-Certificate-Platform-Prototype?fullscreen=1&t=rLkYbttE95UaCYCf-1", icon: "external" },
      { label: "Codebase", url: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System", icon: "github" },
      { label: "Docs", url: "https://github.com/gopaljilab/NVCET-Blockchain-Certification-System#readme", icon: "docs" },
    ],
  },
];
