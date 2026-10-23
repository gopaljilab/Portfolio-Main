import { useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";

// ── Devicon CDN SVG icons — consistent set, no emoji ──────────────────────
const ICONS: Record<string, string> = {
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
};

interface Skill {
  name: string;
  level?: "learning";
}

const skillGroups: { title: string; description: string; skills: Skill[] }[] = [
  {
    title: "Daily Use",
    description: "Stack I reach for on every project",
    skills: [
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "React" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "SQL" },
      { name: "MySQL" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    title: "Comfortable",
    description: "Tools I use regularly and know well",
    skills: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Figma" },
      { name: "Postman" },
    ],
  },
  {
    title: "Cloud, DevOps & Tools",
    description: "Currently expanding into these",
    skills: [
      { name: "AWS", level: "learning" },
      { name: "Docker", level: "learning" },
    ],
  },
];

function SkillIcon({ name }: { name: string }) {
  const src = ICONS[name];
  if (!src) {
    return (
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }
  return <SkillImage name={name} src={src} />;
}

function SkillImage({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div role="img" aria-label={`${name} icon unavailable`} className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Code2 className="w-6 h-6" aria-hidden="true" /></div>;
  }
  return <img src={src} alt={name} onError={() => setFailed(true)} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" loading="lazy" />;
}

export function Skills() {
  return (
    <Section id="skills" title="Tech Stack" subtitle="Technologies I work with">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Engineering fundamentals: Data Structures and Algorithms</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, i) => (
          <div key={i}>
            {/* Group header */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
                  group.title === "Daily Use"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : group.title === "Comfortable"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                }`}
              >
                {group.title}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {group.description}
              </span>
            </div>

            {/* Skill cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {group.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="h-full"
                >
                  <TiltCard
                    maxTilt={5}
                    scale={1.04}
                    className={`h-full bg-white dark:bg-slate-900 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 group border transition-all duration-300 text-center shadow-sm cursor-default ${
                      skill.level === "learning"
                        ? "border-amber-200 dark:border-amber-800/50 hover:border-amber-400"
                        : "border-slate-100 dark:border-slate-800 hover:border-primary/40 hover:shadow-md"
                    }`}
                  >
                    <SkillIcon name={skill.name} />
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors text-xs leading-tight">
                      {skill.name}
                    </h4>
                    {skill.level === "learning" && (
                      <span className="text-[10px] font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wider leading-none">
                        Learning
                      </span>
                    )}
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
