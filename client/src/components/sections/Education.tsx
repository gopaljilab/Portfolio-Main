import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TiltCard } from "@/components/ui/tilt-card";

const education = [
  {
    degree: "B.E. in Computer Science & Engineering",
    institution: "Bengaluru Technological Institute",
    period: "2025 – Present",
    status: "Pursuing",
    subtitle: "Lateral Entry",
    description: "Admitted directly to the second year (third semester) through diploma lateral entry. Focusing on software engineering, databases, and full-stack development.",
  },
  {
    degree: "Diploma in Computer Science & Engineering",
    institution: "Mahamaya Polytechnic of Information Technology",
    period: "2021 – 2024",
    status: "Completed",
    description: "Core foundation in data structures, OOP with Java, relational database management (SQL), and web technologies.",
  },
  {
    degree: "Advance Diploma in IT & System Management",
    institution: "Trivedi College of IT & Management (NIELIT / DOEACC Approved)",
    period: "2018 – 2019",
    status: "Grade B (Honours)",
    certificateImg: "/trivedi-diploma.jpg",
    description: "450-hour comprehensive diploma covering information systems, system architecture, office automation, and IT management principles.",
  },
];

export function Education() {
  return (
    <Section id="education" title="Education" subtitle="Academic Background">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {education.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <TiltCard
              maxTilt={3.5}
              scale={1.015}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl relative overflow-hidden group border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all shadow-sm flex flex-col h-full"
            >
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                  {item.certificateImg ? (
                    <Award className="w-6 h-6 text-primary" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-primary" />
                  )}
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.status === "Pursuing"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
                {item.degree}
              </h3>
              {item.subtitle && (
                <span className="w-fit text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 mb-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {item.subtitle}
                </span>
              )}
              <p className="text-sm font-semibold text-primary mb-3">
                {item.institution}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{item.period}</span>
                </div>

                {item.certificateImg && (
                  <button
                    onClick={() => window.open(item.certificateImg, "_blank")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline uppercase tracking-wider"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
