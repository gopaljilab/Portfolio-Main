import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Download, ArrowRight, Github, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Graceful subtle desktop-only interactive enhancement with strict bounds
    let metadataReady = false;
    let lastX: number | null = null;
    let targetTime = 0;
    let seekInProgress = false;
    let pendingTarget: number | null = null;

    const seekTo = (time: number) => {
      const duration = video.duration;
      if (!metadataReady || !Number.isFinite(duration) || duration <= 0) return;
      const clampedTime = Math.max(0, Math.min(duration, time));
      targetTime = clampedTime;
      if (seekInProgress) {
        pendingTarget = clampedTime;
        return;
      }
      if (Math.abs(video.currentTime - clampedTime) < 0.01) return;

      try {
        seekInProgress = true;
        video.currentTime = clampedTime;
      } catch {
        seekInProgress = false;
      }
    };

    const handleMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      metadataReady = true;
      targetTime = video.currentTime;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const previousX = lastX;
      lastX = event.clientX;
      if (
        previousX === null ||
        window.matchMedia("(max-width: 767px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !metadataReady ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0
      ) return;

      const deltaX = event.clientX - previousX;
      seekTo(targetTime + (deltaX / window.innerWidth) * 0.5 * video.duration);
    };

    const handleSeeked = () => {
      seekInProgress = false;
      const nextTarget = pendingTarget;
      pendingTarget = null;
      if (nextTarget !== null && Math.abs(nextTarget - video.currentTime) >= 0.01) {
        seekTo(nextTarget);
      }
    };

    const handleError = () => {
      metadataReady = false;
      seekInProgress = false;
      pendingTarget = null;
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleError);
    window.addEventListener("mousemove", handleMouseMove);
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) handleMetadata();

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-label-reveal",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-title-reveal",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.85, delay: 0.15, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-sub-reveal",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.35, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-actions-reveal",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.65, delay: 0.5, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-portrait-frame",
        { autoAlpha: 0, scale: 0.96 },
        { autoAlpha: 1, scale: 1, duration: 0.9, delay: 0.25, ease: "power2.out" },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-x-clip border-b border-border bg-background w-full max-w-full"
    >
      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true">
        <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left: Editorial Hero Content (7 cols on lg) */}
          <div className="lg:col-span-7 text-left order-2 lg:order-1">
            
            {/* Eyebrow Label */}
            <div className="hero-label-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-foreground/80 border border-border mb-6 text-xs font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Java Full-Stack Developer · UI-Focused Engineer</span>
            </div>

            {/* Editorial Serif Headline */}
            <h1 className="hero-title-reveal text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-foreground tracking-tight leading-[0.98] mb-6">
              Crafting <span className="italic font-normal text-primary">thoughtful</span> digital experiences.
            </h1>

            {/* Supporting Copy */}
            <p className="hero-sub-reveal text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8 font-sans">
              I specialize in architecting resilient backend services and REST APIs with{" "}
              <strong className="text-foreground font-semibold">Java &amp; Spring Boot</strong>, paired with intuitive, high-performance interfaces built in{" "}
              <strong className="text-foreground font-semibold">React &amp; TypeScript</strong>. Driven by clean architecture, system design, and open-source craftsmanship.
            </p>

            {/* Metadata Chips: Location & Availability */}
            <div className="hero-sub-reveal flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-9 pb-6 border-b border-border/80">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <span className="text-border">/</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="text-foreground font-medium">Available for full-time roles &amp; open source</span>
              </div>
            </div>

            {/* Call to Actions & Social Links */}
            <div className="hero-actions-reveal flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="rounded-full px-7 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase tracking-wider shadow-sm transition-all hover:-translate-y-0.5"
              >
                <a href="#projects" className="flex items-center gap-2">
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 h-12 border-border bg-card hover:bg-secondary text-foreground font-mono text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                <a href="/resume.pdf" download="Gopal_Gupta_Resume.pdf" className="flex items-center gap-2">
                  <span>Download CV</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </Button>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href="https://github.com/gopaljilab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary/40"
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
                  className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all focus:outline-hidden focus:ring-2 focus:ring-primary/40"
                  aria-label="Visit Gopal Gupta's LinkedIn profile (guptagopal001)"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Architectural Portrait Frame (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 w-full">
            <div className="hero-portrait-frame relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px] mx-auto lg:mr-0">
              {/* Asymmetrical Paper Framing Backing */}
              <div className="absolute -inset-2 sm:-inset-3 rounded-2xl border border-primary/25 bg-secondary/40 -rotate-1 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-border bg-card shadow-sm rotate-1 pointer-events-none" />

              {/* Main Photo / Interactive Video Container */}
              <div className="relative rounded-2xl border border-border bg-card overflow-hidden p-2.5 shadow-md">
                <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-secondary relative">
                  <video
                    ref={videoRef}
                    src="/profile-animation.mp4"
                    poster="/profile.jpg"
                    aria-label="Portrait of Gopal Gupta, Java Full-Stack Developer"
                    muted
                    playsInline
                    preload="metadata"
                    controls={false}
                    disablePictureInPicture
                    className="w-full h-full object-cover object-center select-none"
                  />
                  {/* Stable fallback image is always present underneath if video fails */}
                  <img
                    src="/profile.jpg"
                    alt="Gopal Gupta"
                    className="absolute inset-0 w-full h-full object-cover object-center -z-10"
                    loading="eager"
                  />
                </div>

                {/* Editorial Caption Plate */}
                <div className="pt-3 pb-1 px-1 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="tracking-wider uppercase font-semibold text-foreground">Gopal Gupta</span>
                  <span className="text-[11px]">B.E. CSE ’28 · Bengaluru</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
