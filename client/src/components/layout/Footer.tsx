import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-10 border-t border-slate-200 dark:border-slate-800 relative bg-card/20 dark:bg-card/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-2xl tracking-tight mb-2 text-foreground">
            Gopal Gupta
          </p>
          <p className="text-muted-foreground/80 text-sm font-medium">
            © {new Date().getFullYear()} Gopal Gupta. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/gopaljilab"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full glass-panel flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/guptagopal001/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full glass-panel flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
