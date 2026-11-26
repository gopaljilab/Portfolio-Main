import { Switch, Route } from "wouter";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BackToTop } from "@/components/layout/BackToTop";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScrollProvider>
          <Toaster />
          <CustomCursor />
          <Router />
          <BackToTop />
          <Preloader />
        </SmoothScrollProvider>
      </MotionConfig>
    </TooltipProvider>
  );
}

export default App;
