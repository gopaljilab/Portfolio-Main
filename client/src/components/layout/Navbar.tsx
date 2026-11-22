import { useState, useEffect, useCallback } from "react";
import type { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

const navLinks = [
  { name: "Work", href: "#projects", id: "projects", number: "01" },
  { name: "Skills", href: "#skills", id: "skills", number: "02" },
  { name: "Experience", href: "#experience", id: "experience", number: "03" },
  { name: "Education", href: "#education", id: "education", number: "04" },
  { name: "Credentials", href: "#achievements", id: "achievements", number: "05" },
  { name: "Contact", href: "#contact", id: "contact", number: "06" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const lenisRef = useLenis();

  const handleMobileNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    window.setTimeout(() => {
      const section = document.getElementById(targetId);
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const headerOffset = 80;
      window.history.pushState(null, "", `#${targetId}`);
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(section, { offset: -headerOffset, duration: 0.8 });
      } else {
        window.scrollTo({
          top: Math.max(0, sectionTop - headerOffset),
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
      }
    }, 280);
  };

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 24);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0);

    const sectionIds = ["home", ...navLinks.map((l) => l.id)];
    let current = "home";
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= 140) current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/90 dark:bg-card/95 backdrop-blur-md py-3.5 border-b border-border shadow-[0_2px_12px_rgba(37,42,41,0.04)]"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      {/* Editorial Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-[width] duration-100 ease-linear"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            <span className="font-serif text-2xl sm:text-[1.75rem] text-foreground tracking-tight group-hover:text-primary transition-colors">
              Gopal Gupta
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest text-muted-foreground uppercase border-l border-border pl-2.5">
              Portfolio
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-[13px] font-medium tracking-wide transition-colors relative py-1 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="font-mono text-[10px] text-muted-foreground/60">
                        {link.number}
                      </span>
                      <span>{link.name}</span>
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-primary transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 hover:w-full"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3 pl-2 border-l border-border">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full px-4 h-9 text-xs font-mono uppercase tracking-wider border-border hover:border-primary/60 hover:text-primary transition-all"
              >
                <a href="#contact" className="flex items-center gap-1">
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-foreground hover:text-primary rounded-lg border border-border bg-card/60 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            className="md:hidden bg-card border-b border-border overflow-hidden px-4 py-5 shadow-lg"
          >
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleMobileNavigation(e, link.id)}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      <span className="font-serif text-lg">{link.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{link.number}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 pt-4 border-t border-border flex flex-col gap-3">
              <Button asChild className="w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-11 font-mono text-xs uppercase tracking-wider">
                <a
                  href="#contact"
                  onClick={(e) => handleMobileNavigation(e, "contact")}
                  className="flex items-center justify-center gap-2"
                >
                  <span>Initiate Contact</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
