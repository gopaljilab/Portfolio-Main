import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Code2, ExternalLink, Flame, Trophy, GitCommit, Sparkles, CheckCircle2, Zap, Target, BookOpen } from "lucide-react";

export function DualContributionTracker() {
  const [ghError, setGhError] = useState(false);

  return (
    <div className="w-full space-y-8 my-8">
      {/* Section Header Badge */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
          <span>CONTINUOUS PROD COMMITMENT &amp; PROBLEM SOLVING</span>
        </span>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
          Engineering &amp; Problem Solving Trackers
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl mx-auto">
          Dedicated activity tracking across open-source codebases and algorithmic problem-solving platforms.
        </p>
      </div>

      {/* ── 1. Full-Width GitHub Activity Card ── */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl text-slate-900 dark:text-white relative overflow-hidden group transition-colors duration-200"
      >
        {/* Subtle backdrop glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all duration-500" />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h4 className="font-semibold text-slate-900 dark:text-white text-lg md:text-xl">GitHub Activity &amp; Commit Graph</h4>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                  Active Streak
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">@gopaljilab • Public Repositories &amp; Open Source</p>
            </div>
          </div>

          <a
            href="https://github.com/gopaljilab"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors self-start sm:self-auto shadow-sm"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Full Yearly Heatmap Container */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-3 font-mono">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
              <GitCommit className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Yearly Contribution Heatmap
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Live commits via GitHub SVG</span>
          </div>

          {/* Horizontally scrollable wrapper on narrow screens, perfectly centered on wide displays with zero clipping */}
          <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <div className="min-w-[720px] p-5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center transition-colors">
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
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-mono">Primary Stack</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">Java Spring Boot &amp; React</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-mono">Engineering Focus</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">REST APIs &amp; Microservices</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-mono">Open Source</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">Active Contributor</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. Full-Width LeetCode Metrics Card ── */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl text-slate-900 dark:text-white relative overflow-hidden group transition-colors duration-200"
      >
        {/* Subtle backdrop glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-all duration-500" />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h4 className="font-semibold text-slate-900 dark:text-white text-lg md:text-xl">LeetCode Metrics &amp; DSA Problem Solving</h4>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  Consistent Practice
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">@gopaljilab • Data Structures &amp; Algorithms</p>
            </div>
          </div>

          <a
            href="https://leetcode.com/gopaljilab/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors self-start sm:self-auto shadow-sm"
          >
            <span>View LeetCode Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Multi-Column LeetCode Stats Breakdown */}
        <div className="mt-6 bg-slate-50 dark:bg-slate-950/80 p-5 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Total Problems Banner (4 cols on md) */}
            <div className="md:col-span-4 pb-4 md:pb-0 md:pr-6 md:border-r border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between md:block">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Total Solved
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl md:text-5xl font-extrabold font-mono text-slate-900 dark:text-slate-100 tracking-tight">204</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">/ 4,110 questions</span>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Java &amp; SQL Preferred
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono block mt-1.5">~80% First-Pass Acceptance</span>
                </div>
              </div>
            </div>

            {/* Difficulty Trackers (8 cols on md) */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Easy */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1.5">
                    <span>Easy</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200 font-bold text-sm">175</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-3 font-sans">Fundamentals &amp; Logic</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 dark:bg-emerald-400 h-2 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>

              {/* Medium */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-amber-600 dark:text-amber-400 mb-1.5">
                    <span>Medium</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200 font-bold text-sm">27</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-3 font-sans">Core DSA &amp; Patterns</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 dark:bg-amber-400 h-2 rounded-full" style={{ width: "35%" }} />
                </div>
              </div>

              {/* Hard */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-rose-600 dark:text-rose-400 mb-1.5">
                    <span>Hard</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200 font-bold text-sm">2</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-3 font-sans">Advanced Optimization</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-500 dark:bg-rose-400 h-2 rounded-full" style={{ width: "10%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LeetCode Highlights Footer */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-mono">Core Topics</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">Arrays, Strings, Trees &amp; DP</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-mono">Database &amp; SQL</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">Queries, Joins &amp; Aggregates</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block font-mono">Routine</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm">Daily Problem Solving</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
