import { useLayoutEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Github } from "lucide-react";
import calendar from "@/data/githubActivity.json";
import { OPEN_SOURCE_REPOS, type OpenSourceRepo } from "@/data/openSourceContributions";

const wideMap = { width: 1200, height: 548, trunkY: 502, terminalX: 860 };
const branchCount = OPEN_SOURCE_REPOS.length - 1;

function getRoutes(trunkY: number, terminalX: number, compact: boolean) {
  return OPEN_SOURCE_REPOS.map((repo, index) => {
    const x = compact ? 10 + (terminalX - 49) * index / branchCount : 60 + 88 * index;
    const y = compact ? 46 + 57 * index : 62 + 61 * index;
    const lastStopX = compact ? terminalX - 16 : terminalX;
    const straightX = compact
      ? Math.min(x + (trunkY - y) * (terminalX - 44) / (trunkY - 46), lastStopX - repo.prs.length * 10)
      : x + trunkY - y + 26;
    const bend = compact ? 5 : 26;
    const bendY = compact ? 8 : 12;
    const path = `M ${x} ${trunkY} Q ${x + bend / 2} ${trunkY} ${x + bend} ${trunkY - bendY}
      L ${straightX - bend} ${y + bendY} Q ${straightX - bend / 2} ${y} ${straightX} ${y} H ${terminalX}`;
    const stopSpacing = (lastStopX - straightX) / (repo.prs.length + (compact ? 0 : 1));
    return { repo, x, y, straightX, stopSpacing, path };
  });
}

interface TransitMapProps {
  onOpenRepo: (repo: OpenSourceRepo) => void;
  reducedMotion: boolean;
}

export function OpenSourceTransitMap({ onOpenRepo, reducedMotion }: TransitMapProps) {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [focusedRoute, setFocusedRoute] = useState<string | null>(null);
  const [boardWidth, setBoardWidth] = useState(wideMap.width);
  const board = useRef<HTMLDivElement>(null);
  const inView = useInView(board);
  const compact = boardWidth < 720;
  const { width, height, trunkY, terminalX } = compact
    ? { width: boardWidth, height: 494, trunkY: 463, terminalX: Math.min(boardWidth - 166, Math.round(boardWidth * 0.55)) }
    : wideMap;
  const routes = getRoutes(trunkY, terminalX, compact);
  const strokeScale = compact ? 0.59 : 1;
  const stationRadius = compact ? 11 : 17;
  const labelX = compact ? 20 : 29;
  const active = routes.find(({ repo }) => repo.id === (hoveredRoute ?? focusedRoute));
  const previewPosition = active && (active.y < height / 2
    ? { top: `${(active.y + 24) / height * 100}%` }
    : { bottom: `${(height - active.y + 24) / height * 100}%` });

  useLayoutEffect(() => {
    const element = board.current;
    if (!element) return;

    const measure = () => setBoardWidth(Math.max(240, element.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-sans text-base font-bold text-foreground">Contribution routes</h3>
        <p className="text-xs text-muted-foreground">Each stop is a merged pull request. Select a route to see its pull requests.</p>
      </div>

      <div ref={board} className="relative">
        <figure
          className={`pointer-events-none absolute left-[3%] top-[5%] z-10 w-[16%] -rotate-3 rounded-sm border border-black/10 bg-white text-[#262522] shadow-lg motion-safe:transition-opacity ${compact ? "max-w-20 p-1" : "p-2"} ${active ? "opacity-40" : ""}`}
        >
          <img src="/gallery/hacktoberfest-bengaluru.jpg" alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <figcaption className={compact ? "sr-only" : "px-0.5 pb-1 pt-2"}>
            <p className="text-xs font-bold leading-tight">Hacktoberfest Bengaluru 2.0</p>
            <p className="mt-0.5 text-[10px] leading-tight text-[#55514a]">#TechForGood · Open Source Summit</p>
          </figcaption>
        </figure>

        <svg viewBox={`0 0 ${width} ${height}`} className="block w-full select-none" role="group" aria-label="Interactive Open Source Transit Map">
          <line x1={compact ? 5 : 25} y1={trunkY} x2={terminalX} y2={trunkY} stroke="currentColor" strokeWidth={12 * strokeScale} strokeLinecap="round" className="text-foreground/70" />
          <line x1={compact ? 5 : 25} y1={trunkY} x2={terminalX} y2={trunkY} stroke="currentColor" strokeWidth={8 * strokeScale} strokeLinecap="round" className="text-card" />

          {routes.map(({ repo, x, y, straightX, stopSpacing, path }) => {
            const isActive = active?.repo.id === repo.id;
            const stationId = `transit-station-${repo.id}`;
            return (
              <g key={repo.id} className="motion-safe:transition-opacity" opacity={active && !isActive ? 0.22 : 1}>
                <g pointerEvents="none">
                  <circle cx={x} cy={trunkY} r={7 * strokeScale} className="fill-card stroke-foreground" strokeWidth={2 * strokeScale} />
                  <path d={path} fill="none" stroke="currentColor" strokeWidth={12 * strokeScale} strokeLinecap="round" className="text-foreground/80" />
                  <path d={path} fill="none" stroke={repo.lineColor} strokeWidth={8 * strokeScale} strokeLinecap="round" />
                  {repo.prs.map((pr, index) => (
                    <circle key={pr.prNumber}
                      cx={straightX + stopSpacing * (index + 1)}
                      cy={y} r={6.5 * strokeScale} className="fill-card stroke-foreground" strokeWidth={2.5 * strokeScale}
                    />
                  ))}
                  {isActive && inView && !reducedMotion && (
                    <circle r={4.5 * strokeScale} className="fill-card stroke-foreground" strokeWidth={1.5 * strokeScale}>
                      <animateMotion path={path} dur="1.2s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>

                <g
                  data-cursor="Open"
                  onPointerEnter={(event) => { if (event.pointerType !== "touch") setHoveredRoute(repo.id); }}
                  onPointerLeave={() => setHoveredRoute(null)}
                  onClick={() => { document.getElementById(stationId)?.focus(); onOpenRepo(repo); }}
                  className="cursor-pointer"
                >
                  <path d={path} fill="none" stroke="transparent" strokeWidth={compact ? 13 : 20} pointerEvents="stroke" aria-hidden="true" />
                  <g
                    id={stationId}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${repo.name} contributions: ${repo.prs.length} merged pull requests`}
                    aria-haspopup="dialog"
                    transform={`translate(${terminalX} ${y})`}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) setFocusedRoute(repo.id);
                    }}
                    onBlur={() => setFocusedRoute(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onOpenRepo(repo);
                      }
                    }}
                    className="group focus-visible:outline-none"
                  >
                    <rect x={-stationRadius} y="-22" width={width - terminalX + stationRadius} height="44" fill="transparent" />
                    <circle r={stationRadius} fill={repo.lineColor} className="stroke-foreground" strokeWidth={compact ? 1.8 : 2.5} />
                    <circle r={compact ? 7.5 : 11} className="fill-card" />
                    <circle r={stationRadius + 4} fill="none" className="stroke-primary opacity-0 group-focus-visible:opacity-100" strokeWidth="2" />
                    <text y={compact ? 2.5 : 3.5} textAnchor="middle" fontSize={compact ? 7 : 9} className="fill-foreground font-mono font-bold">{repo.code}</text>
                    <text x={labelX} y="-1" fontSize={compact ? 14 : 20} className="fill-foreground font-sans font-bold tracking-tight">{repo.name}</text>
                    <text x={labelX} y={compact ? 13 : 17} fontSize={compact ? 10 : 11} className="fill-muted-foreground font-mono">
                      {repo.prs.length} merged {repo.prs.length === 1 ? "PR" : "PRs"}{compact ? "" : ` · ${repo.tags[0]}`}
                    </text>
                  </g>
                </g>
              </g>
            );
          })}

          <a href="https://github.com/gopaljilab" target="_blank" rel="noopener noreferrer" aria-label="Open the gopaljilab GitHub profile">
            <g transform={`translate(${terminalX} ${trunkY})`}>
              <circle r={stationRadius} className="fill-card stroke-foreground" strokeWidth={compact ? 1.8 : 2.5} />
              <Github x={compact ? -6 : -9} y={compact ? -6 : -9} width={compact ? 12 : 18} height={compact ? 12 : 18} className="text-foreground" aria-hidden="true" />
              <text x={labelX} y="-1" fontSize={compact ? 14 : 19} className="fill-foreground font-sans font-bold">@gopaljilab</text>
              <text x={labelX} y={compact ? 13 : 17} fontSize={compact ? 10 : 11} className="fill-muted-foreground font-mono">GitHub profile</text>
            </g>
          </a>
        </svg>

        {active && previewPosition && (
          <div
            key={active.repo.id}
            aria-hidden="true"
            className={`pointer-events-none absolute right-1 z-20 rounded-2xl border bg-card p-4 text-card-foreground shadow-lg motion-safe:animate-in motion-safe:fade-in-0 ${compact ? "w-3/5 max-w-56" : "w-1/4"}`}
            style={{ ...previewPosition, borderColor: active.repo.lineColor }}
          >
            <h4 className="font-sans text-lg font-bold leading-tight tracking-tight">{active.repo.name}</h4>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">{active.repo.category}</p>
            <p className="mt-2 text-xs leading-relaxed">{active.repo.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-1">
              {active.repo.tags.slice(0, 3).map((tag) => (
                <li key={tag} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px]">{tag}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const dayMilliseconds = 86_400_000;
const weeks = 90;
const cellPitch = 9;
const snapshotEnd = new Date(calendar.end);
const lastWeekStart = snapshotEnd.getTime() - ((snapshotEnd.getUTCDay() + 6) % 7) * dayMilliseconds;
const firstWeekStart = lastWeekStart - (weeks - 1) * 7 * dayMilliseconds;
const dayFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
const activityByDate = new Map(calendar.days.map(([date, count, level]) => [
  Date.parse(String(date)),
  { count: Number(count), level: Number(level) },
]));
const heatmapDays = Array.from({ length: (snapshotEnd.getTime() - firstWeekStart) / dayMilliseconds + 1 }, (_, index) => {
  const timestamp = firstWeekStart + index * dayMilliseconds;
  return {
    date: new Date(timestamp),
    column: Math.floor(index / 7),
    row: index % 7,
    ...(activityByDate.get(timestamp) ?? { count: 0, level: 0 }),
  };
});
const heatmapTotal = heatmapDays.reduce((total, day) => total + day.count, 0);
const heatmapLevels = [0.08, 0.22, 0.39, 0.65, 0.94];

export function OpenSourceContributionHeatmap() {
  return (
    <figure className="mt-6 grid gap-4 border-t border-border pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:mt-0">
      <div className="min-w-0 overflow-x-auto overscroll-x-contain" role="region" aria-label="Contribution calendar timeline" tabIndex={0}>
        <svg viewBox={`0 0 ${weeks * cellPitch} 79`} className="block w-full min-w-[34rem] text-foreground" role="img" aria-label="Calendar showing daily GitHub contribution counts">
          {heatmapDays.map(({ date, column, row, count, level }) => (
            <rect key={date.getTime()} x={column * cellPitch + 1} y={row * cellPitch + 1} width="7" height="7" rx="1.4" fill="currentColor" opacity={heatmapLevels[level]}>
              <title>{dayFormat.format(date)} · {count} {count === 1 ? "contribution" : "contributions"}</title>
            </rect>
          ))}
          {heatmapDays.filter(({ column, row }) => row === 0 && column % 15 === 0).map(({ date, column }) => (
            <text key={column} x={column * cellPitch + 1} y="77" className="fill-muted-foreground font-mono text-[9px]">
              {monthFormat.format(date)}
            </text>
          ))}
        </svg>
      </div>
      <figcaption>
        <p className="text-3xl font-bold leading-none tracking-tight tabular-nums">{heatmapTotal.toLocaleString("en")}</p>
        <p className="mt-1 text-xs text-muted-foreground">GitHub contributions</p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">{monthFormat.format(new Date(firstWeekStart))} – {monthFormat.format(snapshotEnd)}</p>
        <div aria-hidden="true" className="mt-2 flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
          <span className="mr-0.5">Less</span>
          {heatmapLevels.map((opacity) => (
            <span key={opacity} className="size-2.5 rounded-[2px] bg-foreground" style={{ opacity }} />
          ))}
          <span className="ml-0.5">More</span>
        </div>
      </figcaption>
    </figure>
  );
}
