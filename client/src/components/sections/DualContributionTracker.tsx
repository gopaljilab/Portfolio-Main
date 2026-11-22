import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Code2, ExternalLink, Flame, Trophy, GitCommit, Sparkles, CheckCircle2, Zap, Target, BookOpen } from "lucide-react";

export function DualContributionTracker() {
  const [ghError, setGhError] = useState(false);

  return (
    <div className="w-full space-y-8 my-8">
      {/* ── 1. Full-Width GitHub Activity Card ── */}
      <div className="w-full bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary shadow-xs">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h4 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
                  Open Source &amp; GitHub Activity
                </h4>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Active Streak
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                @gopaljilab • Public Repositories &amp; Pull Requests
              </p>
            </div>
          </div>

          <a
            href="https://github.com/gopaljilab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-colors self-start sm:self-auto shadow-xs"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-primary" />
          </a>
        </div>

        {/* Full Yearly Heatmap Container */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 font-mono">
            <span className="flex items-center gap-1.5 text-foreground font-medium">
              <GitCommit className="w-4 h-4 text-primary" />
              Yearly Contribution Ledger
            </span>
            <span className="text-[11px]">Live commits via GitHub SVG</span>
          </div>

          {/* Horizontally scrollable wrapper with Nordic scrollbars */}
          <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            <div className="min-w-[720px] p-5 rounded-xl bg-secondary/50 dark:bg-secondary/20 border border-border flex items-center justify-center transition-colors">
              {!ghError ? (
                <img
                  src="https://ghchart.rshah.org/gopaljilab"
                  alt="Gopal Gupta's GitHub Contribution Chart"
                  className="w-full h-auto max-h-[160px] object-contain dark:filter dark:invert dark:hue-rotate-180 transition-all duration-300"
                  loading="lazy"
                  onError={() => setGhError(true)}
                />
              ) : (
                <img
                  src="https://ghchart.rshah.org/10b981/gopaljilab"
                  alt="Gopal Gupta's GitHub Contribution Chart"
                  className="w-full h-auto max-h-[160px] object-contain dark:filter dark:invert dark:hue-rotate-180 transition-all duration-300"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>

        {/* GitHub Highlights Footer */}
        <div className="mt-6 pt-5 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">Primary Focus</span>
              <span className="text-foreground font-sans font-semibold text-sm">Java Spring Boot &amp; React</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">System Design</span>
              <span className="text-foreground font-sans font-semibold text-sm">REST APIs &amp; Microservices</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">Community</span>
              <span className="text-primary font-sans font-semibold text-sm">Active Contributor</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Full-Width LeetCode Metrics Card ── */}
      <div className="w-full bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary shadow-xs">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h4 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
                  Algorithms &amp; Problem Solving
                </h4>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Flame className="w-3.5 h-3.5 text-primary" />
                  Daily Practice
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                @gopaljilab • Data Structures, Java &amp; SQL Challenges
              </p>
            </div>
          </div>

          <a
            href="https://leetcode.com/gopaljilab/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-colors self-start sm:self-auto shadow-xs"
          >
            <span>View LeetCode Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-primary" />
          </a>
        </div>

        {/* Multi-Column LeetCode Stats Breakdown */}
        <div className="mt-6 bg-secondary/50 dark:bg-secondary/20 p-5 md:p-6 rounded-xl border border-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Total Problems Banner (4 cols on md) */}
            <div className="md:col-span-4 pb-4 md:pb-0 md:pr-6 md:border-r border-border">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                  Total Solved (Verified)
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl md:text-5xl font-serif text-foreground tracking-tight font-normal">204</span>
                  <span className="text-xs text-muted-foreground font-mono">/ 4,110 questions</span>
                </div>
              </div>

              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Java &amp; SQL
                </span>
                <span className="text-xs text-muted-foreground font-mono block mt-1.5">~80% First-Pass Acceptance</span>
              </div>
            </div>

            {/* Difficulty Trackers (8 cols on md) */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Easy */}
              <div className="p-4 rounded-xl bg-card border border-border flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-foreground mb-1.5">
                    <span className="font-mono text-muted-foreground">Easy</span>
                    <span className="font-serif text-lg text-foreground font-normal">175</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground block mb-3 font-sans">Fundamentals &amp; Logic</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary/80 h-1.5 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>

              {/* Medium */}
              <div className="p-4 rounded-xl bg-card border border-border flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-foreground mb-1.5">
                    <span className="font-mono text-muted-foreground">Medium</span>
                    <span className="font-serif text-lg text-foreground font-normal">27</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground block mb-3 font-sans">Core DSA &amp; Patterns</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: "35%" }} />
                </div>
              </div>

              {/* Hard */}
              <div className="p-4 rounded-xl bg-card border border-border flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-foreground mb-1.5">
                    <span className="font-mono text-muted-foreground">Hard</span>
                    <span className="font-serif text-lg text-foreground font-normal">2</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground block mb-3 font-sans">Complex Optimization</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div className="bg-foreground h-1.5 rounded-full" style={{ width: "10%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LeetCode Highlights Footer */}
        <div className="mt-6 pt-5 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">Core Topics</span>
              <span className="text-foreground font-sans font-semibold text-sm">Arrays, Strings, Trees &amp; DP</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">Database &amp; SQL</span>
              <span className="text-foreground font-sans font-semibold text-sm">Queries, Joins &amp; Aggregates</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">Routine</span>
              <span className="text-primary font-sans font-semibold text-sm">Daily Problem Solving</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
