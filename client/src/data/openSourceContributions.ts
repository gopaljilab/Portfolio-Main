export interface MergedPullRequest {
  prNumber: number;
  title: string;
  description: string;
  prUrl: string;
}

export interface OpenSourceRepo {
  id: string;
  name: string; // Clean display name, e.g. "PRism"
  fullName: string; // Exact GitHub repository path, e.g. "vishwaskr1/PRism--AI-Powered-Pull-Request-Triage-for-Open-Source-Projects"
  owner: string; // Repository owner handle, e.g. "vishwaskr1"
  repoUrl: string; // Canonical GitHub repo URL
  category: string;
  lineColor: string; // Transit route hex color
  lineName: string; // Transit route name, e.g. "PRism Line"
  code: string; // Transit line badge code, e.g. "PM", "EP"
  tags: string[];
  summary: string;
  prs: MergedPullRequest[];
  colorBg: string;
  colorBorder: string;
}

export const OPEN_SOURCE_REPOS: OpenSourceRepo[] = [
  {
    id: "prism",
    name: "PRism",
    fullName: "vishwaskr1/PRism--AI-Powered-Pull-Request-Triage-for-Open-Source-Projects",
    owner: "vishwaskr1",
    repoUrl: "https://github.com/vishwaskr1/PRism--AI-Powered-Pull-Request-Triage-for-Open-Source-Projects",
    category: "Full-Stack Development · AI Tooling",
    lineColor: "#E05A36", // Terracotta
    lineName: "PRism Line",
    code: "PM",
    tags: ["React", "TypeScript", "AI Triage", "API Docs"],
    summary: "AI-powered pull request triage engine engineered for high-velocity open-source maintainers.",
    colorBg: "rgba(224, 90, 54, 0.12)",
    colorBorder: "#E05A36",
    prs: [
      {
        prNumber: 1,
        title: "PR #1: Evidence-based PR triage dashboard",
        description: "Implemented an evidence-based dashboard with heuristic metrics, scoring cards, and responsive triage views for incoming pull requests.",
        prUrl: "https://github.com/vishwaskr1/PRism--AI-Powered-Pull-Request-Triage-for-Open-Source-Projects/pull/1",
      },
      {
        prNumber: 2,
        title: "PR #2: README architecture, setup and API documentation",
        description: "Authored end-to-end architectural setup guides, API schemas, and interactive developer onboarding documentation.",
        prUrl: "https://github.com/vishwaskr1/PRism--AI-Powered-Pull-Request-Triage-for-Open-Source-Projects/pull/2",
      },
    ],
  },
  {
    id: "ecoplay",
    name: "EcoPlay",
    fullName: "arzoo0511/ecoplay",
    owner: "arzoo0511",
    repoUrl: "https://github.com/arzoo0511/ecoplay",
    category: "Frontend · Accessibility & Performance",
    lineColor: "#10B981", // Emerald Green
    lineName: "EcoPlay Route",
    code: "EP",
    tags: ["Service Worker", "a11y", "Cache Strategy", "WCAG AA"],
    summary: "Educational environmental gamification platform built with accessible web standards and offline resilience.",
    colorBg: "rgba(16, 185, 129, 0.12)",
    colorBorder: "#10B981",
    prs: [
      {
        prNumber: 71,
        title: "PR #71: Login accessibility and contrast improvements",
        description: "Audited login flows to achieve WCAG 2.1 AA compliance, accessible focus indicators, and high-contrast color ratios.",
        prUrl: "https://github.com/arzoo0511/ecoplay/pull/71",
      },
      {
        prNumber: 112,
        title: "PR #112: Authentication page accessibility improvements",
        description: "Enhanced screen-reader compatibility, ARIA attributes, semantic form structures, and keyboard navigation on authentication routes.",
        prUrl: "https://github.com/arzoo0511/ecoplay/pull/112",
      },
      {
        prNumber: 130,
        title: "PR #130: Intelligent Service Worker caching strategies",
        description: "Architected cache-first and stale-while-revalidate asset caching to deliver instant second-load performance and offline resilience.",
        prUrl: "https://github.com/arzoo0511/ecoplay/pull/130",
      },
    ],
  },
  {
    id: "leetcode-city",
    name: "The Leetcode City",
    fullName: "Ixotic27/The-Leetcode-City",
    owner: "Ixotic27",
    repoUrl: "https://github.com/Ixotic27/The-Leetcode-City",
    category: "Backend · Code Quality & Reliability",
    lineColor: "#3B82F6", // Royal Cobalt Blue
    lineName: "Leetcode City Loop",
    code: "LC",
    tags: ["Supabase", "JSDoc", "API Routes", "Error Middleware"],
    summary: "Interactive collaborative problem-solving urban simulator powered by Supabase and structured API routes.",
    colorBg: "rgba(59, 130, 246, 0.12)",
    colorBorder: "#3B82F6",
    prs: [
      {
        prNumber: 94,
        title: "PR #94: JSDoc annotations across 57 API route handlers",
        description: "Standardized strict type annotations, request payload definitions, and responses across 57 backend API route handlers.",
        prUrl: "https://github.com/Ixotic27/The-Leetcode-City/pull/94",
      },
      {
        prNumber: 101,
        title: "PR #101: Supabase authentication error handling and middleware",
        description: "Hardened authentication middleware with defensive error boundaries, token refresh handling, and deterministic status codes.",
        prUrl: "https://github.com/Ixotic27/The-Leetcode-City/pull/101",
      },
    ],
  },
  {
    id: "dover",
    name: "DoVER",
    fullName: "yellowgram1543/DoVER",
    owner: "yellowgram1543",
    repoUrl: "https://github.com/yellowgram1543/DoVER",
    category: "Documentation · Developer Experience",
    lineColor: "#8B5CF6", // Violet / Purple
    lineName: "DoVER Shuttle",
    code: "DV",
    tags: ["DevEx", "Feature Matrix", "Hero Design", "Docs"],
    summary: "Modern software testing and verification tooling with comprehensive documentation architecture.",
    colorBg: "rgba(139, 92, 246, 0.12)",
    colorBorder: "#8B5CF6",
    prs: [
      {
        prNumber: 58,
        title: "PR #58: README hero section",
        description: "Designed a clean editorial hero section with technical value propositions, badges, and rapid command-line quickstart instructions.",
        prUrl: "https://github.com/yellowgram1543/DoVER/pull/58",
      },
      {
        prNumber: 59,
        title: "PR #59: Feature matrix and documentation improvements",
        description: "Compiled a multi-tier feature matrix, version comparability breakdown, and developer contribution guidelines.",
        prUrl: "https://github.com/yellowgram1543/DoVER/pull/59",
      },
    ],
  },
  {
    id: "bearbot",
    name: "Bearbot",
    fullName: "Eshwar02/bearbot",
    owner: "Eshwar02",
    repoUrl: "https://github.com/Eshwar02/bearbot",
    category: "Backend · Distributed Systems & Performance",
    lineColor: "#F59E0B", // Amber / Warm Orange
    lineName: "Bearbot Transit",
    code: "BB",
    tags: ["Upstash Redis", "Rate Limiting", "Sliding Window", "Distributed"],
    summary: "High-throughput community automation bot with distributed low-latency rate limiting.",
    colorBg: "rgba(245, 158, 11, 0.12)",
    colorBorder: "#F59E0B",
    prs: [
      {
        prNumber: 49,
        title: "PR #49: Distributed Upstash Redis rate limiting",
        description: "Implemented a sliding-window rate limiting algorithm via serverless Upstash Redis to safeguard API endpoints against burst traffic.",
        prUrl: "https://github.com/Eshwar02/bearbot/pull/49",
      },
    ],
  },
  {
    id: "the-algorithms-java",
    name: "TheAlgorithms / Java",
    fullName: "TheAlgorithms/Java",
    owner: "TheAlgorithms",
    repoUrl: "https://github.com/TheAlgorithms/Java",
    category: "Java · Algorithms & Unit Testing",
    lineColor: "#DC2626", // Crimson / Red
    lineName: "Algorithms Mainline",
    code: "TA",
    tags: ["Java", "Data Structures", "JUnit 5", "Clean Code"],
    summary: "World-renowned open-source algorithm repository maintained by 1,000+ contributors globally.",
    colorBg: "rgba(220, 38, 38, 0.12)",
    colorBorder: "#DC2626",
    prs: [
      {
        prNumber: 7057,
        title: "PR #7057: LengthOfLastWord algorithm and JUnit tests",
        description: "Implemented an optimized O(N) reverse-traversal string algorithm with comprehensive JUnit 5 parameterized edge-case test suites.",
        prUrl: "https://github.com/TheAlgorithms/Java/pull/7057",
      },
    ],
  },
  {
    id: "first-contributions",
    name: "First Contributions",
    fullName: "firstcontributions/first-contributions",
    owner: "firstcontributions",
    repoUrl: "https://github.com/firstcontributions/first-contributions",
    category: "Community · Open Source Ecosystem",
    lineColor: "#059669", // Dark Teal
    lineName: "Community Ring",
    code: "FC",
    tags: ["Git Workflow", "Community", "Open Source"],
    summary: "Global onboarding gateway helping software engineers master Git forks, branches, and upstream merges.",
    colorBg: "rgba(5, 150, 105, 0.12)",
    colorBorder: "#059669",
    prs: [
      {
        prNumber: 107464,
        title: "PR #107464: Added gopaljilab to contributors list",
        description: "Official contributor registry verification and branch merge establishing active presence in the open-source community.",
        prUrl: "https://github.com/firstcontributions/first-contributions/pull/107464",
      },
    ],
  },
];

// Derived statistics from actual repository and PR data
export const OPEN_SOURCE_STATS = {
  get mergedPRs() {
    return OPEN_SOURCE_REPOS.reduce((total, repo) => total + repo.prs.length, 0);
  },
  get repositories() {
    return OPEN_SOURCE_REPOS.length;
  },
  period: "2025–2026",
  statusLabel: "Merged to Upstream",
};
