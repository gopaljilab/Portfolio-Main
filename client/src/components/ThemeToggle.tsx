import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      themeColor?.setAttribute("content", "#0a0a0a");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      themeColor?.setAttribute("content", "#ffffff");
    }
  }, [dark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
className="rounded-full text-foreground hover:text-primary hover:bg-primary/10 min-w-[44px] min-h-[44px]"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

