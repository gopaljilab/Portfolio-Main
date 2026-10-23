import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Globe, Play, CheckCircle2, Zap, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RequestScenario {
  id: string;
  name: string;
  endpoint: string;
  method: "GET" | "POST";
  payload: string;
  response: string;
  latency: string;
  dbQuery: string;
}

const scenarios: RequestScenario[] = [
  {
    id: "order",
    name: "Place Order",
    endpoint: "/api/v1/orders",
    method: "POST",
    payload: '{ "tableId": 4, "items": ["Special Thali", "Lassi"], "total": 450 }',
    response: '{ "orderId": "ORD-8921", "status": "CONFIRMED", "etaMin": 15 }',
    latency: "24ms",
    dbQuery: "INSERT INTO orders (table_id, total, status) VALUES (4, 450, 'CONFIRMED');",
  },
  {
    id: "menu",
    name: "Fetch Menu",
    endpoint: "/api/v1/menu/available",
    method: "GET",
    payload: "{ params: { category: 'main-course' } }",
    response: '{ "count": 28, "cached": true, "timestamp": "2026-10-10T17:15:00Z" }',
    latency: "14ms",
    dbQuery: "SELECT id, name, price, stock FROM menu_items WHERE in_stock = true;",
  },
  {
    id: "auth",
    name: "JWT Auth",
    endpoint: "/api/v1/auth/verify",
    method: "POST",
    payload: '{ "role": "ADMIN", "scope": "READ_WRITE" }',
    response: '{ "authenticated": true, "token": "eyJh...89xQ", "expiresIn": 3600 }',
    latency: "19ms",
    dbQuery: "SELECT user_id, role, salt FROM staff_credentials WHERE user_id = 101;",
  },
];

export function FullStackVisualizer() {
  const [activeScenario, setActiveScenario] = useState<RequestScenario>(scenarios[0]);
  const [stage, setStage] = useState<"idle" | "client-to-server" | "server-to-db" | "complete">("idle");
  const [isSimulating, setIsSimulating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<{ kind: "json" | "sql"; message: string } | null>(null);

  const copyCode = async (kind: "json" | "sql", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyFeedback({ kind, message: "Copied" });
    } catch {
      setCopyFeedback({ kind, message: "Copy failed" });
    }
    window.setTimeout(() => setCopyFeedback(null), 2200);
  };

  const runSimulation = (scenario: RequestScenario) => {
    setActiveScenario(scenario);
    setIsSimulating(true);
    setStage("client-to-server");

    setTimeout(() => {
      setStage("server-to-db");
    }, 600);

    setTimeout(() => {
      setStage("complete");
    }, 1200);

    setTimeout(() => {
      setIsSimulating(false);
      setStage("idle");
    }, 2800);
  };

  useEffect(() => {
    // Initial run on mount for live feel
    const timer = setTimeout(() => {
      runSimulation(scenarios[0]);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 shadow-xl backdrop-blur-md overflow-hidden">
      {/* Top terminal-style header */}
      <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80 dark:bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400/80 dark:bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400/80 dark:bg-emerald-500/80"></div>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 ml-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            live-architecture-stream.ts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            SYSTEM STATUS: SIMULATED • HTTP 200 MOCK
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Interactive Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
            Simulate Flow:
          </span>
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => runSimulation(sc)}
              disabled={isSimulating && activeScenario.id === sc.id}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeScenario.id === sc.id
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Play className="w-3 h-3" />
              {sc.name}
            </button>
          ))}
        </div>

        {/* 3-Tier Architecture Diagram */}
        <div className="relative py-4 px-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative z-10">
            {/* NODE 1: CLIENT */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 relative flex flex-col justify-between ${
                stage === "client-to-server"
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/20 scale-[1.02]"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Client Tier</h4>
                    <p className="text-[10px] text-slate-500 font-mono">React 18 • Vite SPA</p>
                  </div>
                </div>
                {stage === "client-to-server" && (
                  <span className="text-[10px] font-mono text-primary font-bold animate-pulse">DISPATCH</span>
                )}
              </div>
              <div className="bg-slate-900 text-slate-200 dark:bg-black/80 rounded-lg p-2 font-mono text-[10px] overflow-hidden">
                <span className="text-cyan-400 font-bold">{activeScenario.method}</span> {activeScenario.endpoint}
              </div>
            </div>

            {/* NODE 2: SERVER */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 relative flex flex-col justify-between ${
                stage === "server-to-db"
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/20 scale-[1.02]"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">API Tier</h4>
                    <p className="text-[10px] text-slate-500 font-mono">Spring Boot 3 • Java</p>
                  </div>
                </div>
                {stage === "server-to-db" && (
                  <span className="text-[10px] font-mono text-primary font-bold animate-pulse">EXEC JPA</span>
                )}
              </div>
              <div className="bg-slate-900 text-slate-200 dark:bg-black/80 rounded-lg p-2 font-mono text-[10px] truncate">
                <span className="text-emerald-400">@RestController</span> • HikariPool
              </div>
            </div>

            {/* NODE 3: DATABASE */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 relative flex flex-col justify-between ${
                stage === "complete"
                  ? "border-emerald-500 bg-emerald-500/5 shadow-md shadow-emerald-500/20 scale-[1.02]"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Data Tier</h4>
                    <p className="text-[10px] text-slate-500 font-mono">MySQL • ACID Engine</p>
                  </div>
                </div>
                {stage === "complete" ? (
                  <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> COMMIT
                  </span>
                ) : null}
              </div>
              <div className="bg-slate-900 text-slate-200 dark:bg-black/80 rounded-lg p-2 font-mono text-[10px] truncate">
                InnoDB • Transaction Logged
              </div>
            </div>
          </div>
        </div>

        {/* Live Payload & Execution Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 mb-2">
              <span className="text-cyan-400 font-bold">SQL Transaction Statement</span>
              <div className="flex items-center gap-2 text-[10px]">
                <span>Dialect: MySQL 8</span>
                <button type="button" onClick={() => copyCode("sql", activeScenario.dbQuery)} className="inline-flex items-center gap-1 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded" aria-label="Copy SQL">
                  {copyFeedback?.kind === "sql" && copyFeedback.message === "Copied" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copyFeedback?.kind === "sql" ? copyFeedback.message : "Copy SQL"}
                </button>
              </div>
            </div>
            <code className="text-slate-300">{activeScenario.dbQuery}</code>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 mb-2">
              <span className="text-emerald-400 font-bold">Simulated JSON Response</span>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-primary">{activeScenario.latency} simulated</span>
                <button type="button" onClick={() => copyCode("json", activeScenario.response)} className="inline-flex items-center gap-1 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded" aria-label="Copy JSON">
                  {copyFeedback?.kind === "json" && copyFeedback.message === "Copied" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copyFeedback?.kind === "json" ? copyFeedback.message : "Copy JSON"}
                </button>
              </div>
            </div>
            <code className="text-slate-300">{activeScenario.response}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
