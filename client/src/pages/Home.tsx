import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";
import { Stats } from "@/components/sections/Stats";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { OpenSourceContributions } from "@/components/sections/OpenSourceContributions";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { lazy, Suspense, useEffect, useState } from "react";
import { Section } from "@/components/layout/Section";
import { OutInTheWorld } from "@/components/sections/OutInTheWorld";
import { TrophyCabinet } from "@/components/sections/TrophyCabinet";
import { Contact } from "@/components/sections/Contact";

const CertificateCarousel = lazy(() => import("@/components/CertificateCarousel"));

export default function Home() {
  const [loadCredentials, setLoadCredentials] = useState(() => Boolean(window.location.hash));

  useEffect(() => {
    if (loadCredentials) return;

    const section = document.getElementById("achievements");
    if (!section || typeof IntersectionObserver === "undefined") {
      setLoadCredentials(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLoadCredentials(true);
    }, { rootMargin: "800px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, [loadCredentials]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <div
          aria-hidden="true"
          className="border-b border-border bg-secondary/45 py-3.5 overflow-x-clip select-none"
        >
          <ScrollBasedVelocity
            text="SYSTEMS ARCHITECTURE · OPEN SOURCE · FULL-STACK TYPESCRIPT · GSAP & LENIS · DISTRIBUTED CLOUD ·"
            defaultVelocity={1.8}
            className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-muted-foreground/85"
          />
        </div>
        <Stats />
        <Projects />
        <OpenSourceContributions />
        <Skills />
        <Experience />
        <Education />
        <Section
          id="achievements"
          chapterNumber="05"
          subtitle="Accreditations"
          title="Credentials."
          description="Proof of learning, building, and continuous growth across enterprise Java architectures, SQL optimization, and national hackathons."
        >
          <div className="min-h-[500px]">
            {loadCredentials && (
              <Suspense fallback={null}>
                <CertificateCarousel />
              </Suspense>
            )}
          </div>
        </Section>
        <OutInTheWorld />
        <TrophyCabinet />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
