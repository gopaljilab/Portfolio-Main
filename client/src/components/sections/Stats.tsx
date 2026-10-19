import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { GitMerge, Layers3, Code2, BookOpen } from "lucide-react";

const stats = [
  {
    value: "5",
    label: "Full-Stack Projects",
    sub: "Live & deployed",
    icon: Layers3,
  },
  {
    value: "13",
    label: "Pull Requests Merged",
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
    label: "Certifications Earned",
    sub: "Postman · Scaler · SIH 2025",
    icon: BookOpen,
  },
];

export function Stats() {
  return (
    <section className="py-8 border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <TiltCard
                  maxTilt={4}
                  scale={1.02}
                  className="text-center p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-800/30 hover:border-primary/30 transition-all shadow-sm flex flex-col items-center gap-2"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display font-bold text-primary">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-200 uppercase tracking-widest font-bold leading-tight">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">
                    {stat.sub}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
