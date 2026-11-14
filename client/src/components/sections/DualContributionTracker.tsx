import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Code2, ExternalLink, Flame, Trophy, GitCommit, Sparkles, CheckCircle2 } from "lucide-react";

export function DualContributionTracker() {
  const [ghError, setGhError] = useState(false);

  return (
    <div className="w-full">
      {/* Section Header Badge */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 text-emerald-600 dark:text-emerald-400">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
          <span>CONTINUOUS PROD COMMITMENT &amp; PROBLEM SOLVING</span>
        </span>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-2">
          Dual Contribution Tracker
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl mx-auto">
          Tracking open-source repositories, engineering commits, and daily Data Structures &amp; Algorithms practice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* ── Left Card: GitHub Activity & Heatmap ── */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col justify-between h-full rounded-2xl p-5 md:p-6 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl relative overflow-hidden group"
        >
          {/* Subtle gradient backdrop glow */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all duration-500" />

          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-emerald-400 shadow-inner">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-100 text-base md:text-lg">GitHub Activity</h4>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">@gopaljilab</p>
                  </div>
                </div>

                <a
                  href="https://github.com/gopaljilab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/90 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                >
                  <span>Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* GitHub Chart / Heatmap */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span className="flex items-center gap-1.5">
                    <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
                    Contributions Heatmap
                  </span>
                  <span className="text-[11px] text-slate-500">Live commits via ghchart</span>
                </div>

                {/* Clean container without scroll, fluidly filling full width */}
                <div className="w-full overflow-hidden p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center">
                  {!ghError ? (
                    <img
                      src="https://ghchart.rshah.org/gopaljilab"
                      alt="Gopal Gupta's GitHub Contribution Chart"
                      className="w-full h-auto object-contain max-w-full"
                      loading="lazy"
                      onError={() => setGhError(true)}
                    />
                  ) : (
                    <img
                      src="https://ghchart.rshah.org/10b981/gopaljilab"
                      alt="Gopal Gupta's GitHub Contribution Chart"
                      className="w-full h-auto object-contain max-w-full"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Footer metrics / callout */}
            <div className="mt-5 pt-4 border-t border-slate-800/60 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="text-slate-400 text-[11px] block">Repositories &amp; Projects</span>
                <span className="text-slate-200 font-semibold font-mono text-sm mt-0.5 block">Full-Stack &amp; Systems</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="text-slate-400 text-[11px] block">Primary Stack</span>
                <span className="text-emerald-400 font-semibold font-mono text-sm mt-0.5 block">Spring Boot &amp; React</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right Card: LeetCode Stats ── */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col justify-between h-full rounded-2xl p-5 md:p-6 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl relative overflow-hidden group"
        >
          {/* Subtle amber backdrop glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-all duration-500" />

          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-amber-400 shadow-inner">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-100 text-base md:text-lg">LeetCode Metrics</h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      <Flame className="w-3 h-3 text-amber-400" />
                      DSA
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">@gopaljilab</p>
                </div>
              </div>

              <a
                href="https://leetcode.com/gopaljilab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/90 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
              >
                <span>Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Custom LeetCode Stats Summary Card */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  Problems Solved Summary
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">Verified Profile</span>
              </div>

              {/* Clean container matching GitHub section with emerald/amber accents */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      Total Solved
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-extrabold font-mono text-slate-100 tracking-tight">204</span>
                      <span className="text-xs text-slate-500 font-mono">/ 4,110</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 className="w-3 h-3" />
                      Java &amp; SQL
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono block mt-1">Acceptance ~80%</span>
                  </div>
                </div>

                {/* Difficulty Bars */}
                <div className="grid grid-cols-3 gap-2.5 mt-3.5">
                  {/* Easy */}
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex flex-col">
                    <div className="flex items-center justify-between text-[11px] font-medium text-emerald-400 mb-1">
                      <span>Easy</span>
                      <span className="font-mono text-slate-300">175</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>

                  {/* Medium */}
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex flex-col">
                    <div className="flex items-center justify-between text-[11px] font-medium text-amber-400 mb-1">
                      <span>Med</span>
                      <span className="font-mono text-slate-300">27</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: "35%" }} />
                    </div>
                  </div>

                  {/* Hard */}
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex flex-col">
                    <div className="flex items-center justify-between text-[11px] font-medium text-rose-400 mb-1">
                      <span>Hard</span>
                      <span className="font-mono text-slate-300">2</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-rose-400 h-1.5 rounded-full" style={{ width: "10%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Footer metrics / callout */}
            <div className="mt-5 pt-4 border-t border-slate-800/60 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="text-slate-400 text-[11px] block">Problem Focus</span>
                <span className="text-slate-200 font-semibold font-mono text-sm mt-0.5 block">Arrays, Trees &amp; DP</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="text-slate-400 text-[11px] block">Active Practice</span>
                <span className="text-amber-400 font-semibold font-mono text-sm mt-0.5 block">Daily Problem Solving</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
