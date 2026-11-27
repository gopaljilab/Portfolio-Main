import { LEETCODE, LEETCODE_SOLVED } from "@/data/leetCodeActivity";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Flame, Trophy, Sparkles, CheckCircle2 } from "lucide-react";

export function LeetCodeActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors"
    >
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary shadow-xs">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
                Algorithms &amp; Problem Solving
              </h3>
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
          href={LEETCODE.profile}
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
                Total Solved Problems
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl md:text-5xl font-serif text-foreground tracking-tight font-normal">{LEETCODE_SOLVED}</span>

              </div>
            </div>

            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Java &amp; SQL
              </span>
              <span className="text-xs text-muted-foreground font-mono block mt-1.5">Snapshot · {LEETCODE.snapshotLabel}</span>
            </div>
          </div>

          {/* Difficulty Trackers (8 cols on md) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {LEETCODE.difficulties.map(({ label, solved, color }) => (
              <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-xs">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{label}</span>
                  <span className="font-serif text-lg text-foreground">{solved}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${solved / LEETCODE_SOLVED * 100}%` }} />
                </div>
              </div>
            ))}
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
    </motion.div>
  );
}
