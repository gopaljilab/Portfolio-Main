import { Github, Linkedin, ArrowUp } from "lucide-react";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

export function Footer() {
  const lenisRef = useLenis();

  const scrollToTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 0.9 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  };

  return (
    <footer className="py-12 border-t border-border bg-card/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border/80">
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-normal text-foreground tracking-tight block">
              Gopal Gupta
            </span>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">
              Java Full-Stack Developer · Bengaluru, India
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gopaljilab"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary/40"
              aria-label="Visit Gopal Gupta's GitHub profile (@gopaljilab)"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/guptagopal001/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary/40"
              aria-label="Visit Gopal Gupta's LinkedIn profile (guptagopal001)"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <button
              onClick={scrollToTop}
              className="px-4 h-10 rounded-full bg-secondary hover:bg-secondary/80 border border-border flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground transition-all"
              aria-label="Scroll back to top of the page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-primary" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted-foreground gap-3">
          <p>© {new Date().getFullYear()} Gopal Gupta. Built with Nordic Paper aesthetics &amp; React.</p>
          <p className="text-[11px]">Crafted with Spring Boot, TypeScript &amp; Open Source.</p>
        </div>
      </div>
    </footer>
  );
}
