import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Java", icon: "☕" },
      { name: "JavaScript", icon: "📜" },
      { name: "SQL", icon: "💾" },
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "Spring Boot", icon: "🍃" },
      { name: "React", icon: "⚛️" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "☁️" },
      { name: "Docker", icon: "🐳" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "🌿" },
      { name: "GitHub", icon: "🐙" },
      { name: "Figma", icon: "🎨" },
    ],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      title="Tech Stack"
      subtitle="Technologies I work with"
      darker
    >
      <div className="space-y-12">
        {skillCategories.map((category, i) => (
          <div key={i}>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">
              {category.title}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {category.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="h-full"
                >
                  <TiltCard
                    maxTilt={5}
                    scale={1.03}
                    className="h-full bg-white dark:bg-slate-900 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 group border border-slate-100 dark:border-slate-800 hover:border-primary/40 hover:shadow-md transition-all duration-300 text-center shadow-sm"
                  >
                    <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>

                    <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                      {skill.name}
                    </h4>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}