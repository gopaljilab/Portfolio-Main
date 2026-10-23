import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Download, ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { gsap } from "@/lib/gsap";
import { TiltCard } from "@/components/ui/tilt-card";
import { FullStackVisualizer } from "@/components/sections/FullStackVisualizer";

export function Hero() {
  const { toast } = useToast();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
        !metadataReady ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0
      ) return;

      const deltaX = event.clientX - previousX;
      seekTo(targetTime + (deltaX / window.innerWidth) * 0.8 * video.duration);
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
        ".hero-title",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" },
      );

      gsap.to(".hero-orb--upper", {
        y: 150,
        x: -45,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current ?? undefined,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-orb--lower", {
        y: -100,
        x: 35,
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current ?? undefined,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadCV = () => {
    window.open("/resume.pdf", "_blank");
    toast({
      title: "Opening Resume",
      description: "Gopal's resume is opening in a new tab.",
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50/50 dark:bg-slate-950"
    >
      {/* Background decoration */}
      <div className="hero-orb--upper absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="hero-orb--lower absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-200/20 dark:bg-slate-800/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Row 1: Image + Text ── */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-5/12 flex justify-center md:justify-start order-1 md:order-2 md:translate-x-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>

              <TiltCard
                maxTilt={4}
                scale={1.02}
                disabled
                className="w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] rounded-full border border-slate-200 dark:border-slate-800 overflow-hidden relative z-10 bg-white dark:bg-slate-900 p-1.5 shadow-sm"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src="/profile-animation.mp4"
                    aria-label="Animated portrait of Gopal Gupta"
                    muted
                    playsInline
                    preload="auto"
                    controls={false}
                    disablePictureInPicture
                    className="w-full h-full rounded-full object-cover object-center select-none pointer-events-none"
                  />
                </div>
              </TiltCard>

              {/* Status Badge — centered below image */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 px-4 rounded-full flex items-center gap-2 shadow-sm z-20 whitespace-nowrap">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Available for work</span>
              </div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-7/12 order-2 md:order-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
              <span className="text-lg">👋</span>
              <span className="text-sm font-bold">Say Hello</span>
            </div>

            {/* Name */}
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Hi, I'm <span className="text-primary">Gopal Gupta</span>
            </h1>

            <h2 className="hero-title text-xl md:text-2xl font-display text-slate-700 dark:text-slate-300 mb-6 font-semibold">
              I build Spring Boot backends and the React interfaces on top of them.
            </h2>

            <p className="hero-sub text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Java Full-Stack Developer crafting scalable APIs with Spring Boot and polished UIs with React — with a passion for open source and clean architecture.
            </p>

            {/* Location */}
            <div className="hero-sub flex flex-wrap items-center justify-center md:justify-start gap-4 mb-5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>

            {/* ACTIONS — social links sit alongside the primary CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap md:justify-start">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-primary text-white hover:bg-primary/90 w-full sm:w-auto font-bold shadow-sm transition-all"
              >
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 w-full sm:w-auto font-bold transition-all"
                onClick={handleDownloadCV}
              >
                <a href="/resume.pdf" download="Gopal_Gupta_Resume.pdf">
                  Download CV
                  <Download className="ml-2 w-4 h-4" />
                </a>
              </Button>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/gopaljilab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/guptagopal001/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Row 2: Full-Stack Architecture Visualizer ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-16 md:mt-20"
        >
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              <span className="w-8 h-px bg-slate-300 dark:bg-slate-700"></span>
              Interactive Backend Flow &amp; DB Execution Engine
              <span className="w-8 h-px bg-slate-300 dark:bg-slate-700"></span>
            </span>
          </div>
          <FullStackVisualizer />
        </motion.div>
      </div>
    </section>
  );
}
