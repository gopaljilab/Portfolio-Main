import { motion } from "framer-motion";
import { GitMerge, Layers3, Code2, BookOpen } from "lucide-react";
import { DualContributionTracker } from "@/components/sections/DualContributionTracker";

const stats = [
  {
    value: "5",
    label: "Full-Stack Projects",
    sub: "Production & prototypes",
    icon: Layers3,
  },
  {
    value: "13",
    label: "PRs Merged",
    sub: "Across open-source repos",
    icon: GitMerge,
  },
  {
    value: "2",
    label: "Industry Internships",
    sub: "NativeSoftTech & RD Infro",
    icon: Code2,
  },
  {
    value: "13",
    label: "Certifications",
    sub: "Postman, Scaler, SIH 2025",
    icon: BookOpen,
  },
];

export function Stats() {
  return (
    <section className="py-16 md:py-20 border-b border-border bg-card/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-5 border-b border-border gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-1">
              Index / 00
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground font-normal">
              Snapshot &amp; Engineering Activity
            </h2>
          </div>
          <p className="text-sm font-sans text-muted-foreground max-w-md">
            Verifiable metrics spanning full-stack delivery, open-source governance, and algorithmic problem-solving.
          </p>
        </div>

        {/* 4-Item Numerical Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-serif text-foreground font-normal tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-foreground font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground font-sans">
                    {stat.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dedicated Full-Width GitHub & LeetCode Activity Ledger */}
        <DualContributionTracker />

      </div>
    </section>
  );
}
