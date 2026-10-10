import { motion } from "framer-motion";
import { Briefcase, Database, Coffee, Globe, Code } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";

const experiences = [
  {
    role: "Open Source Contributor",
    company: "Elite Coders",
    period: "Present",
    description: "Contributed to open-source Java and web projects by fixing bugs, improving code quality, and collaborating with distributed teams through GitHub.",
    icon: Code,
  },
  {
    role: "Open Source Contributor",
    company: "Social Winter of Code",
    period: "Nov 2025 – Jan 2026",
    description: "Contributed to open-source Java and web projects by fixing bugs, improving code quality, and collaborating with distributed teams through GitHub.",
    icon: Globe,
  },
  {
    role: "SQL Intern",
    company: "NativeSoftTech",
    period: "Mar 2025 – Apr 2025",
    description: "Optimized database performance and managed complex SQL queries for scalable applications, focusing on data integrity and efficiency.",
    icon: Database,
  },
  {
    role: "Java Intern",
    company: "NativeSoftTech",
    period: "Dec 2024 – Feb 2025",
    description: "Developed robust backend services and RESTful APIs using Java, ensuring high performance and reliability through collaborative development.",
    icon: Coffee,
  },
  {
    role: "Java with JSP Training",
    company: "Arcane Programming Infotech",
    period: "Jul 2023 – Sep 2023",
    description: "Mastered Java Server Pages and MVC architecture to build dynamic, data-driven web applications with a focus on clean code principles.",
    icon: Briefcase,
  },
];

export function Experience() {
  return (
    <Section id="experience" title="Work Experience" subtitle="My Journey">
      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-0 md:pl-8 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-0"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[41px] md:-left-[41px] top-1 w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center z-10 transition-colors shadow-sm">
              <exp.icon className="w-5 h-5 text-primary" />
            </div>

            <TiltCard
              maxTilt={3.5}
              scale={1.01}
              className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all group relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
<p className="text-lg text-slate-600 dark:text-slate-300 font-medium">{exp.company}</p>
                </div>
<span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-sm text-slate-500 dark:text-slate-300 border border-slate-100 dark:border-slate-700 whitespace-nowrap w-fit font-bold">
                  {exp.period}
                </span>
              </div>
<p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {exp.description}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
