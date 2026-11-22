import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Send, Loader2, Github, Linkedin, Copy, CheckCheck, ArrowUpRight } from "lucide-react";
import emailjs from "@emailjs/browser";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api, type ContactSubmitInput } from "@shared/routes";

const EMAIL = "gopaljilab@gmail.com";

export function Contact() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSubmitInput>({
    resolver: zodResolver(api.contact.submit.input),
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const onSubmit = async (data: ContactSubmitInput) => {
    try {
      const result = await emailjs.send(
        "service_wo6s3k6",
        "template_r652hq8",
        {
          name: data.name,
          from_name: data.name,
          from_email: data.email,
          phone: data.phone ?? "",
          message: data.message,
          reply_to: data.email,
        },
        "P6dp6JGpHK-ZGqUVS",
      );

      console.log("EmailJS result:", result);

      toast({
        title: "Message delivered ✓",
        description: "Thank you for reaching out. I'll get back to you promptly.",
      });

      reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        variant: "destructive",
        title: "Couldn't send message",
        description: `Please email me directly at ${EMAIL}`,
      });
    }
  };

  return (
    <Section
      id="contact"
      chapterNumber="06"
      subtitle="Collaboration"
      title="Have something in mind?"
      description="Available for full-time Java Full-Stack roles, Spring Boot architecture, React frontend engineering, and open-source projects."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Editorial Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-2">
              Start a Conversation
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-foreground font-normal tracking-tight leading-tight mb-4">
              Let's make it <span className="italic text-primary font-normal">real</span>.
            </h3>
            <p className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed">
              Whether you are scouting for a Java &amp; Spring Boot engineer for your software team or looking to collaborate on high-impact web services, my inbox is always open.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Email Card with Quick Copy */}
            <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-sm font-sans font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
              >
                {copied ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                  Location
                </span>
                <span className="text-sm font-sans font-medium text-foreground">
                  Bengaluru, Karnataka, India
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-4 border-t border-border">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-3">
              Profiles &amp; Codebases
            </span>
            <div className="flex items-center gap-3 font-mono text-xs">
              <a
                href="https://github.com/gopaljilab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/in/guptagopal001/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Refined Paper Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                  Full Name <span className="text-primary">*</span>
                </label>
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  {...register("name")}
                  className={`bg-secondary/40 border-border focus:border-primary h-11 text-sm rounded-lg ${
                    errors.name ? "border-destructive" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-xs font-sans text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                  Email Address <span className="text-primary">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  autoComplete="email"
                  {...register("email")}
                  className={`bg-secondary/40 border-border focus:border-primary h-11 text-sm rounded-lg ${
                    errors.email ? "border-destructive" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-xs font-sans text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone (Optional) */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                Phone Number (Optional)
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                {...register("phone")}
                className="bg-secondary/40 border-border focus:border-primary h-11 text-sm rounded-lg"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                Message <span className="text-primary">*</span>
              </label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Share your project goals, team role requirements, or collaboration idea..."
                {...register("message")}
                className={`bg-secondary/40 border-border focus:border-primary text-sm rounded-lg resize-y ${
                  errors.message ? "border-destructive" : ""
                }`}
              />
              {errors.message && (
                <p className="text-xs font-sans text-destructive">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 h-12 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase tracking-wider transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
