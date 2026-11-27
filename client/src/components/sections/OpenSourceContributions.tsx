import { GitHubActivityDashboard } from "@/components/sections/GitHubActivityDashboard";
import { useState, useId, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GitPullRequest, 
  GitMerge, 
  ExternalLink, 
  X, 
  FolderGit2, 
  CheckCircle2, 
  ArrowRight
} from "lucide-react";
import { OPEN_SOURCE_REPOS, OPEN_SOURCE_STATS, OpenSourceRepo } from "@/data/openSourceContributions";

export function OpenSourceContributions() {
  const [selectedRepo, setSelectedRepo] = useState<OpenSourceRepo | null>(null);
  const [hoveredRepoId, setHoveredRepoId] = useState<string | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const mapRef = useRef<SVGSVGElement | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // 1. Observe prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);

  // 2. IntersectionObserver to only animate SVG pulses when section is in viewport
  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "100px 0px 100px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  // 3. Modal Open / Close handling with Focus Management & Scroll Locking
  const handleOpenModal = useCallback((repo: OpenSourceRepo) => {
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    setSelectedRepo(repo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedRepo(null);
    // Restore focus to the trigger element
    setTimeout(() => {
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    }, 50);
  }, []);

  // Background scroll locking when modal is open
  useEffect(() => {
    if (selectedRepo) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedRepo]);

  // Initial focus into modal & focus trapping
  useEffect(() => {
    if (selectedRepo) {
      // Focus the close button or first interactive element inside the modal
      const timer = setTimeout(() => {
        modalCloseButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedRepo]);

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      handleCloseModal();
      return;
    }

    // Focus trap inside modal
    if (e.key === "Tab" && modalContainerRef.current) {
      const focusableElements = modalContainerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  // Transit map geometry constants (1200 x 640 SVG system)
  const hubX = 130;
  const hubY = 320;
  const trunkSharedEndX = 220;
  const routeOriginY = (stationY: number) => hubY + (stationY - hubY) * 0.62;

  // Check if animations should actively run
  const shouldAnimate = isSectionVisible && !prefersReducedMotion;
  const highlightedRepo = OPEN_SOURCE_REPOS.find((repo) => repo.id === hoveredRepoId);

  return (
    <section 
      id="open-source" 
      className="relative py-20 sm:py-28 border-b border-border/80 overflow-hidden"
      aria-label="Open Source Contributions"
    >
      {/* Decorative Blueprint Transit Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-1/4 inset-x-0 h-[400px] pointer-events-none"
        data-scroll
        data-scroll-speed="-0.16"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header — Editorial Presentation */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12 sm:pb-16 border-b border-border">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border text-xs font-mono text-muted-foreground tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>01.1 • OPEN SOURCE • {OPEN_SOURCE_STATS.period}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.08]">
              Public contributions &amp; open infrastructure.
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
              Explore a selection of pull requests merged into upstream repositories. 
              From high-throughput rate limiters and accessible UI standards to JSDoc schemas and algorithmic primitives.
            </p>
          </div>

          {/* Accurate Derived Statistics Callout Box */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 bg-card/60 backdrop-blur-sm border border-border p-4 sm:p-5 rounded-2xl shadow-sm">
            <div className="space-y-0.5 pr-4 border-r border-border">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                {OPEN_SOURCE_STATS.mergedPRs}
              </span>
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                Merged PRs
              </p>
            </div>

            <div className="space-y-0.5 pr-4 border-r border-border">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                {OPEN_SOURCE_STATS.repositories}
              </span>
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                Repositories
              </p>
            </div>

            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{OPEN_SOURCE_STATS.statusLabel}</span>
              </div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                Pull Request Status
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <GitHubActivityDashboard />
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET VIEW: Interactive Transit Map SVG Visualization          */}
        {/* ========================================================================= */}
        <div className="hidden md:block mt-6 bg-card/40 backdrop-blur-sm border border-border rounded-3xl p-6 sm:p-8 relative shadow-sm overflow-hidden">
          
          {/* Legend / Control Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-border/60 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span>Central Hub (@gopaljilab)</span>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-muted-foreground/70">
                <span>•</span>
                <span>Click or press Enter on station to inspect pull requests</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded bg-muted text-[11px] text-muted-foreground font-mono">
                {OPEN_SOURCE_REPOS.length} Active Lines
              </span>
              <span className="hidden min-w-[12rem] text-right lg:inline">
                {highlightedRepo ? `${highlightedRepo.name} · ${highlightedRepo.prs.length} merged` : "Hover a route to highlight it"}
              </span>
            </div>
          </div>

          {/* SVG Transit Map */}
          <div className="relative w-full overflow-x-auto py-4">
            <svg
              ref={mapRef}
              viewBox="0 0 1200 600"
              className="w-full h-auto min-w-[880px] select-none"
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.02))" }}
              aria-label="Interactive Open Source Transit Map"
            >
              <line
                x1={trunkSharedEndX}
                x2={trunkSharedEndX}
                y1={routeOriginY(OPEN_SOURCE_REPOS[0].lineY)}
                y2={routeOriginY(OPEN_SOURCE_REPOS[OPEN_SOURCE_REPOS.length - 1].lineY)}
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                className="text-muted-foreground/40"
              />

              {/* ------------------------------------------------------------- */}
              {/* Shared Mainline Trunk Case & Core (Hub -> Trunk End)          */}
              {/* ------------------------------------------------------------- */}
              <line
                x1={hubX}
                y1={hubY}
                x2={trunkSharedEndX}
                y2={hubY}
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                className="text-border/80"
              />
              <line
                x1={hubX}
                y1={hubY}
                x2={trunkSharedEndX}
                y2={hubY}
                stroke="#71717A"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.75"
              />

              {/* ------------------------------------------------------------- */}
              {/* Transit Tracks (Case & Core lines)                            */}
              {/* ------------------------------------------------------------- */}
              {OPEN_SOURCE_REPOS.map((repo) => {
                const isHovered = hoveredRepoId === repo.id;
                const isAnyHovered = hoveredRepoId !== null;
                const isDimmed = isAnyHovered && !isHovered;

                const startY = routeOriginY(repo.lineY);
                const bendEnd = Math.min(repo.branchX + 122, repo.targetX - 115);
                const d = `M ${trunkSharedEndX} ${startY} H ${repo.branchX} C ${repo.branchX + 42} ${startY}, ${bendEnd - 32} ${repo.lineY}, ${bendEnd} ${repo.lineY} H ${repo.targetX}`;

                return (
                  <g 
                    key={`route-${repo.id}`}
                    className="motion-safe:transition-opacity motion-safe:duration-300"
                    style={{
                      opacity: isDimmed ? 0.25 : 1,
                    }}
                  >
                    {/* Outer Case / Background track */}
                    <path
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={isHovered ? "10" : "8"}
                      strokeLinecap="round"
                      className="text-border/60 transition-all duration-200"
                    />

                    {/* Colored Core Track */}
                    <path
                      d={d}
                      fill="none"
                      stroke={repo.lineColor}
                      strokeWidth={isHovered ? "7" : "5"}
                      strokeLinecap="round"
                      className="transition-all duration-200"
                    />

                    <circle cx={trunkSharedEndX} cy={startY} r="5" fill={repo.lineColor} pointerEvents="none" />
                    {repo.prs.map((pr, index) => (
                      <circle
                        key={pr.prNumber}
                        cx={bendEnd + (repo.targetX - bendEnd) * (index + 1) / (repo.prs.length + 1)}
                        cy={repo.lineY}
                        r="5.5"
                        fill="currentColor"
                        stroke={repo.lineColor}
                        strokeWidth="2.5"
                        className="text-card"
                        pointerEvents="none"
                      />
                    ))}
                    <path
                      d={d}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="22"
                      pointerEvents="stroke"
                      className="cursor-pointer"
                      onPointerEnter={(event) => {
                        if (event.pointerType !== "touch") setHoveredRepoId(repo.id);
                      }}
                      onPointerLeave={() => setHoveredRepoId(null)}
                      onClick={() => {
                        document.getElementById(`transit-station-${repo.id}`)?.focus();
                        handleOpenModal(repo);
                      }}
                      aria-hidden="true"
                    />
                    {shouldAnimate && isHovered && (
                      <circle pointerEvents="none" r="7" fill="currentColor" stroke={repo.lineColor} strokeWidth="3" className="text-card">
                        <animateMotion path={d} dur="1.25s" fill="freeze" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines=".25 .1 .25 1" />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* ------------------------------------------------------------- */}
              {/* Central Identity Hub Node: Gopal Gupta (@gopaljilab)          */}
              {/* ------------------------------------------------------------- */}
              <g transform={`translate(${hubX}, ${hubY})`} className="cursor-default">
                {/* Concentric Signal Rings */}
                {shouldAnimate && (
                  <circle r="36" fill="currentColor" className="text-primary/10 animate-ping opacity-30" />
                )}
                <circle r="28" fill="currentColor" className="text-card border border-border" />
                <circle r="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary" />
                <circle r="12" fill="currentColor" className="text-primary" />

                {/* Hub Typography Label */}
                <g transform="translate(-110, -50)">
                  <rect
                    x="0"
                    y="0"
                    width="140"
                    height="38"
                    rx="8"
                    fill="hsl(var(--card) / 0.92)"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                  />
                  <text
                    x="12"
                    y="17"
                    fontFamily="serif"
                    fontSize="13"
                    fontWeight="600"
                    fill="currentColor"
                    className="text-foreground"
                  >
                    Gopal Gupta
                  </text>
                  <text
                    x="12"
                    y="30"
                    fontFamily="monospace"
                    fontSize="10"
                    fill="currentColor"
                    className="text-muted-foreground"
                  >
                    @gopaljilab · Core Hub
                  </text>
                </g>
              </g>

              {/* ------------------------------------------------------------- */}
              {/* Destination Station Nodes (7 Repositories)                     */}
              {/* ------------------------------------------------------------- */}
              {OPEN_SOURCE_REPOS.map((repo) => {
                const isHovered = hoveredRepoId === repo.id;
                const isAnyHovered = hoveredRepoId !== null;
                const isDimmed = isAnyHovered && !isHovered;

                return (
                  <g
                    key={`station-${repo.id}`}
                    id={`transit-station-${repo.id}`}
                    transform={`translate(${repo.targetX}, ${repo.lineY})`}
                    className="cursor-pointer group focus-visible:outline-none"
                    style={{
                      opacity: isDimmed ? 0.35 : 1,
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                    onMouseEnter={() => setHoveredRepoId(repo.id)}
                    onMouseLeave={() => setHoveredRepoId(null)}
                    onFocus={() => setHoveredRepoId(repo.id)}
                    onBlur={() => setHoveredRepoId(null)}
                    onClick={() => handleOpenModal(repo)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${repo.name} contributions: ${repo.prs.length} merged pull requests`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenModal(repo);
                      }
                    }}
                  >
                    {/* Station Hover Halo */}
                    <circle
                      r={isHovered ? "28" : "20"}
                      fill={repo.colorBg}
                      className="transition-all duration-300"
                    />

                    {/* Station Case Ring */}
                    <circle
                      r="14"
                      fill="currentColor"
                      stroke={repo.lineColor}
                      strokeWidth={isHovered ? "3.5" : "2.5"}
                      className="text-card transition-all duration-200"
                    />

                    {/* Line Code inside Station Badge */}
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="9"
                      fontWeight="bold"
                      fill={repo.lineColor}
                    >
                      {repo.code}
                    </text>

                    {/* Repository Information Card (Right of Node) */}
                    <g transform="translate(32, -24)">
                      {/* Interactive Card Base */}
                      <rect
                        x="0"
                        y="0"
                        width="290"
                        height="48"
                        rx="10"
                        fill={isHovered ? "hsl(var(--card))" : "hsl(var(--card) / 0.88)"}
                        stroke={isHovered ? repo.lineColor : "hsl(var(--border))"}
                        strokeWidth={isHovered ? "1.5" : "1"}
                        className="transition-all duration-200"
                      />

                      {/* Line Accent Bar */}
                      <rect
                        x="0"
                        y="0"
                        width="4"
                        height="48"
                        rx="2"
                        fill={repo.lineColor}
                      />

                      {/* Clean Display Name */}
                      <text
                        x="16"
                        y="20"
                        fontFamily="sans-serif"
                        fontSize="13"
                        fontWeight="700"
                        fill="currentColor"
                        className="text-foreground"
                      >
                        {repo.name}
                      </text>

                      {/* Owner / Scope */}
                      <text
                        x="16"
                        y="36"
                        fontFamily="monospace"
                        fontSize="10"
                        fill="currentColor"
                        className="text-muted-foreground"
                      >
                        {repo.owner} • {repo.category.split("·")[0].trim()}
                      </text>

                      {/* PR Count Pill */}
                      <g transform="translate(225, 14)">
                        <rect
                          x="0"
                          y="0"
                          width="52"
                          height="20"
                          rx="6"
                          fill={isHovered ? repo.lineColor : "currentColor"}
                          className={isHovered ? "" : "text-secondary"}
                        />
                        <text
                          x="26"
                          y="13"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontSize="9.5"
                          fontWeight="bold"
                          fill={isHovered ? "#FFFFFF" : "currentColor"}
                          className={isHovered ? "" : "text-foreground"}
                        >
                          {repo.prs.length} PRs ↗
                        </text>
                      </g>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>{highlightedRepo ? `${highlightedRepo.name} · ${highlightedRepo.category}` : "Each stop marks a merged pull request."}</span>
            <span className="hidden sm:inline">Select a route or station to view its pull requests</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW: Vertical Transit Route Timeline                              */}
        {/* ========================================================================= */}
        <div className="md:hidden mt-10 space-y-4">
          <div className="p-4 rounded-2xl bg-secondary/40 border border-border flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span>Transit Network · Select any repository route to view merged code</span>
          </div>

          <div className="relative pl-6 border-l-2 border-border/80 space-y-6 pt-2">
            {OPEN_SOURCE_REPOS.map((repo) => (
              <div 
                key={`mobile-${repo.id}`}
                className="relative group cursor-pointer"
                onClick={() => handleOpenModal(repo)}
                role="button"
                tabIndex={0}
                aria-label={`Open PR details for ${repo.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenModal(repo);
                  }
                }}
              >
                {/* Station Node Marker on vertical line */}
                <div 
                  className="absolute -left-[31px] top-4 w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center transition-transform group-hover:scale-125"
                  style={{ borderColor: repo.lineColor }}
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: repo.lineColor }}
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-foreground"
                          style={{ backgroundColor: repo.colorBg }}
                        >
                          {repo.code}
                        </span>
                        <h3 className="font-sans font-bold text-base text-foreground group-hover:text-primary transition-colors">
                          {repo.name}
                        </h3>
                      </div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {repo.owner}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-secondary text-foreground">
                      <GitMerge className="w-3 h-3 text-emerald-500" />
                      <span>{repo.prs.length} PRs</span>
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {repo.summary}
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-border/60">
                    <span className="text-muted-foreground truncate max-w-[180px]">
                      {repo.category.split("·")[0]}
                    </span>
                    <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View PRs <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DETAIL MODAL / DRAWER                                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedRepo && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={handleModalKeyDown}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Container */}
            <motion.div
              ref={modalContainerRef}
              initial={prefersReducedMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 focus:outline-none"
              tabIndex={-1}
            >
              {/* Top Accent Strip */}
              <div 
                className="h-2 w-full"
                style={{ backgroundColor: selectedRepo.lineColor }}
              />

              {/* Modal Header */}
              <div className="p-6 sm:p-7 border-b border-border flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-0.5 rounded font-mono text-xs font-bold"
                      style={{ backgroundColor: selectedRepo.colorBg }}
                    >
                      {selectedRepo.code} • {selectedRepo.lineName}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {selectedRepo.category}
                    </span>
                  </div>

                  <h3 id={titleId} className="font-serif text-2xl sm:text-3xl text-foreground">
                    {selectedRepo.name}
                  </h3>

                  {/* Exact GitHub Full Repository Path */}
                  <p className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 break-all">
                    <FolderGit2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{selectedRepo.fullName}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedRepo.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    title="View repository on GitHub"
                    aria-label={`Open ${selectedRepo.name} on GitHub`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    ref={modalCloseButtonRef}
                    onClick={handleCloseModal}
                    className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Content Scrollable Area */}
              <div className="p-6 sm:p-7 space-y-6 overflow-y-auto">
                {/* Repository Summary & Tags */}
                <div className="space-y-3">
                  <p className="text-sm text-foreground/90 font-sans leading-relaxed">
                    {selectedRepo.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedRepo.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-secondary/80 text-foreground border border-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Merged Pull Requests Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <GitPullRequest className="w-3.5 h-3.5 text-primary" />
                      <span>Merged Pull Requests ({selectedRepo.prs.length})</span>
                    </h4>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Merged into Main
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedRepo.prs.map((pr) => (
                      <div 
                        key={pr.prNumber}
                        className="p-4 rounded-2xl bg-secondary/40 border border-border hover:border-border/80 transition-all space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h5 className="font-sans font-semibold text-sm text-foreground">
                            {pr.title}
                          </h5>
                          
                          <a
                            href={pr.prUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] font-mono text-foreground hover:text-primary transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <span>Inspect</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>

                        <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                          {pr.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-border bg-secondary/20 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  Contributor: <strong className="text-foreground">@gopaljilab</strong>
                </span>

                <a
                  href={selectedRepo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  <span>Repository Home</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
