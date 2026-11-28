import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { motion, useScroll, useSpring } from "motion/react";
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
  const lenisRef = useLenis();
  const menuButton = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

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

  useLayoutEffect(() => {
    if (!isMobileMenuOpen) return;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    menuButton.current?.focus({ preventScroll: true });

    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeAtDesktop = () => {
      if (desktop.matches) setIsMobileMenuOpen(false);
    };
    desktop.addEventListener("change", closeAtDesktop);
    return () => {
      root.style.overflow = overflow;
      desktop.removeEventListener("change", closeAtDesktop);
    };
  }, [isMobileMenuOpen]);

  const handleMenuKeys = (event: KeyboardEvent<HTMLElement>) => {
    if (!isMobileMenuOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setIsMobileMenuOpen(false);
      menuButton.current?.focus({ preventScroll: true });
      return;
    }
    if (event.key !== "Tab") return;
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href], button"))
      .filter((item) => item.getClientRects().length > 0 && !item.matches(":disabled"));
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <header
      role={isMobileMenuOpen ? "dialog" : undefined}
      aria-modal={isMobileMenuOpen || undefined}
      aria-label={isMobileMenuOpen ? "Site menu" : undefined}
      data-lenis-prevent={isMobileMenuOpen ? "" : undefined}
      onKeyDown={handleMenuKeys}
      className={`fixed inset-x-0 top-0 z-50 ${
        isMobileMenuOpen
          ? "flex h-dvh flex-col bg-card"
          : isScrolled
            ? "border-b border-border bg-card/90 py-3.5 shadow-[0_2px_12px_rgba(37,42,41,0.04)] backdrop-blur-md transition-all duration-300 dark:bg-card/95"
            : "bg-transparent py-5 transition-all duration-300 sm:py-6"
      }`}
    >
      {/* Editorial Scroll Progress Bar powered by motion.dev useScroll */}
      {!isMobileMenuOpen && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
          style={{ scaleX }}
          aria-hidden="true"
        />
      )}

      <div className={`mx-auto w-full max-w-7xl shrink-0 px-4 sm:px-6 lg:px-8 ${isMobileMenuOpen ? "border-b border-border/70" : ""}`}>
        <div className={`flex items-center justify-between gap-2 ${isMobileMenuOpen ? "h-[4.5rem] sm:h-20" : ""}`}>
          {/* Brand Wordmark */}
          <a
            href="#home"
            data-cursor="Home"
            data-cursor-tone="neutral"
            onClick={isMobileMenuOpen ? (event) => handleMobileNavigation(event, "home") : undefined}
            className={`group flex shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isMobileMenuOpen ? "rounded-lg bg-foreground px-3 py-2 text-background" : "rounded-sm"}`}
          >
            <span className={isMobileMenuOpen ? "font-sans text-sm font-bold tracking-tight sm:text-base" : "font-serif text-xl tracking-tight text-foreground transition-colors group-hover:text-primary min-[360px]:text-2xl sm:text-[1.75rem]"}>
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
                      data-cursor={link.name}
                      data-cursor-tone="neutral"
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
                <a href="#contact" data-cursor="Contact" data-cursor-tone="neutral" className="flex items-center gap-1">
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile / Tablet Actions (< xl screens) */}
          <div className="flex shrink-0 items-center gap-1.5 xl:hidden sm:gap-2">
            <div className={isMobileMenuOpen ? "rounded-full border border-border" : ""}>
              <ThemeToggle />
            </div>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-cursor={isMobileMenuOpen ? "Close menu" : "Menu"}
              data-cursor-tone="neutral"
              aria-expanded={isMobileMenuOpen}
              aria-controls={isMobileMenuOpen ? "mobile-navigation" : undefined}
            >
              {isMobileMenuOpen ? "Close" : "Menu"}
              {isMobileMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200 sm:px-6 xl:hidden"
        >
          <ul className="mx-auto max-w-7xl divide-y divide-border border-b border-border lg:mx-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    data-cursor={link.name}
                    data-cursor-tone="neutral"
                    aria-current={isActive ? "location" : undefined}
                    onClick={(e) => handleMobileNavigation(e, link.id)}
                    className={`block py-3.5 font-sans text-[clamp(1.8rem,7.7vw,3.25rem)] font-bold leading-[1.08] tracking-tight outline-offset-[-2px] transition-colors sm:py-4 ${
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
