import { useState, useEffect, useCallback, useRef } from "react";
import type { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

const navLinks = [
  { name: "Work", href: "#projects", id: "projects", number: "01" },
  { name: "Open Source", href: "#open-source", id: "open-source", number: "01.1" },
  { name: "Skills", href: "#skills", id: "skills", number: "02" },
  { name: "Experience", href: "#experience", id: "experience", number: "03" },
  { name: "Education", href: "#education", id: "education", number: "04" },
  { name: "Credentials", href: "#achievements", id: "achievements", number: "05" },
  { name: "Rooms", href: "#out-in-the-world", id: "out-in-the-world", number: "05.1" },
  { name: "Trophies", href: "#trophy-cabinet", id: "trophy-cabinet", number: "05.2" },
  { name: "Contact", href: "#contact", id: "contact", number: "06" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const lenisRef = useLenis();
  const menuButton = useRef<HTMLButtonElement>(null);

  const handleMobileNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    const section = document.getElementById(targetId);
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("h1, h2") ?? section;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    window.history.pushState(null, "", `#${targetId}`);
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(section, { offset: -80, duration: 0.8 });
    } else {
      section.scrollIntoView({ behavior: "instant" });
    }
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
        menuButton.current?.focus();
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
            className="group flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            <span className="font-serif text-2xl sm:text-[1.75rem] text-foreground tracking-tight group-hover:text-primary transition-colors">
              Gopal Gupta
            </span>
            <span className="hidden 2xl:inline-block text-[11px] font-mono tracking-widest text-muted-foreground uppercase border-l border-border pl-2.5">
              Portfolio
            </span>
          </a>

          {/* Desktop Navigation (xl+ screens) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8" aria-label="Main Navigation">
            <ul className="flex items-center gap-3.5 2xl:gap-5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`text-[12px] 2xl:text-[13px] font-medium tracking-wide whitespace-nowrap transition-colors relative py-1 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">
                        {link.number}
                      </span>
                      <span className="whitespace-nowrap">{link.name}</span>
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

            <div className="flex items-center gap-3 pl-2 border-l border-border shrink-0">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full px-4 h-9 text-xs font-mono uppercase tracking-wider border-border hover:border-primary/60 hover:text-primary transition-all whitespace-nowrap"
              >
                <a href="#contact" className="flex items-center gap-1">
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile / Tablet Actions (< xl screens) */}
          <div className="xl:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-foreground hover:text-primary rounded-lg border border-border bg-card/60 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls={isMobileMenuOpen ? "mobile-navigation" : undefined}
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
            id="mobile-navigation"
            className="xl:hidden max-h-[calc(100dvh-6rem)] overflow-y-auto bg-card border-b border-border px-4 py-5 shadow-lg"
          >
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
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
