import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return false; // Default: Light Nordic Paper
  });

  useEffect(() => {
    const root = document.documentElement;
    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      themeColor?.setAttribute("content", "#1D211F");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      themeColor?.setAttribute("content", "#F7F2E9");
    }
  }, [dark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to Nordic Paper light mode" : "Switch to Nordic Night dark mode"}
      className="rounded-full text-foreground/80 hover:text-primary hover:bg-primary/10 min-w-[44px] min-h-[44px] transition-colors"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
