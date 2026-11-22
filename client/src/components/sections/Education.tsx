import { GraduationCap, Calendar, Award, ExternalLink, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";

const education = [
  {
    degree: "B.E. in Computer Science & Engineering",
    institution: "Bengaluru Technological Institute",
    period: "2025 – 2028 (Expected)",
    status: "Pursuing",
    subtitle: "Direct 2nd-Year Lateral Entry",
    description: "Admitted directly into the 2nd year (3rd semester) following completion of 3-year Diploma in CSE. 3-year accredited Bachelor of Engineering focusing on Distributed Systems, DBMS, and Advanced Algorithms.",
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
    <Section
      id="education"
      chapterNumber="04"
      subtitle="Academic Background"
      title="Education & Foundations"
      description="Formal training in Computer Science & Engineering, object-oriented systems, and information technology management."
      darker
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {education.map((item, index) => (
          <article
            key={item.degree}
            className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {item.certificateImg ? (
                    <Award className="w-5 h-5" />
                  ) : (
                    <GraduationCap className="w-5 h-5" />
                  )}
                </div>

                <span
                  className={`text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider ${
                    item.status === "Pursuing"
                      ? "bg-primary/10 text-primary border border-primary/20 font-semibold"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-1">
                0{index + 1}
              </span>

              <h3 className="text-xl sm:text-2xl font-serif text-foreground font-normal tracking-tight mb-2 leading-snug">
                {item.degree}
              </h3>

              {item.subtitle && (
                <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 mb-3 rounded bg-secondary text-foreground/80 border border-border">
                  {item.subtitle}
                </span>
              )}

              <p className="text-sm font-sans font-semibold text-primary mb-3">
                {item.institution}
              </p>

              <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{item.period}</span>
              </div>

              {item.certificateImg && (
                <button
                  onClick={() => window.open(item.certificateImg, "_blank")}
                  className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-primary hover:underline"
                >
                  <span>Credential</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
