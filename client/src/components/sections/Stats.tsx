import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";

const stats = [
  { value: "5+", label: "Full-Stack Projects" },
  { value: "1+", label: "Hands-on Experience" },
  { value: "3+", label: "Open-Source Contributions" },
  { value: "10+", label: "Core Technologies" },
];

export function Stats() {
  return (
    <section className="py-12 border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
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
                className="text-center p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-800/30 hover:border-primary/30 transition-all shadow-sm"
              >
                <h3 className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300 uppercase tracking-widest font-bold">
                  {stat.label}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}