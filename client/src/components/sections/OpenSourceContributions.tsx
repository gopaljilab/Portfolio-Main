import { GitHubActivityDashboard } from "@/components/sections/GitHubActivityDashboard";
import { OpenSourceContributionHeatmap, OpenSourceTransitMap } from "@/components/sections/OpenSourceTransitMap";
import { useState, useId, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GitPullRequest, 
  ExternalLink, 
  X, 
  FolderGit2, 
  CheckCircle2, 
  ArrowRight
} from "lucide-react";
import { OPEN_SOURCE_STATS, type OpenSourceRepo } from "@/data/openSourceContributions";

export function OpenSourceContributions() {
  const [selectedRepo, setSelectedRepo] = useState<OpenSourceRepo | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  // Modal Open / Close handling with Focus Management & Scroll Locking
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

  useLayoutEffect(() => {
    if (selectedRepo) {
      modalCloseButtonRef.current?.focus({ preventScroll: true });
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
        
        <header className="flex flex-col gap-4 pb-6 sm:pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Open source · {OPEN_SOURCE_STATS.period}
            </p>
            <h2 className="font-sans text-4xl font-bold leading-[0.98] tracking-tight focus-visible:outline-0 sm:text-6xl lg:text-7xl">
              Built in the open<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-base">
            {OPEN_SOURCE_STATS.mergedPRs} merged pull requests across {OPEN_SOURCE_STATS.repositories} upstream repositories.
          </p>
        </header>

        <div className="rounded-[2rem] border border-foreground/40 bg-card px-4 py-5 shadow-sm sm:p-7">
          <OpenSourceTransitMap onOpenRepo={handleOpenModal} reducedMotion={prefersReducedMotion} />
          <OpenSourceContributionHeatmap />
        </div>

        <div className="mt-8">
          <GitHubActivityDashboard />
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
                    data-cursor="Close"
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
