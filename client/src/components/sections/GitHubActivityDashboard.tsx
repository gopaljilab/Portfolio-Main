import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, Github, RotateCcw } from "lucide-react";
import calendar from "@/data/githubActivity.json";
import { OPEN_SOURCE_STATS } from "@/data/openSourceContributions";

const profileUrl = "https://github.com/gopaljilab";
const achievements = [
  { id: "starstruck", name: "Starstruck", description: "A repository you created earned at least 16 stars." },
  { id: "quickdraw", name: "Quickdraw", description: "Closed an issue or pull request within five minutes of opening it." },
  { id: "pull-shark", name: "Pull Shark", description: "Earned the bronze tier for merged pull requests.", tier: "×2" },
  { id: "pair-extraordinaire", name: "Pair Extraordinaire", description: "Co-authored a commit in a merged pull request." },
  { id: "yolo", name: "YOLO", description: "Merged a pull request without a review." },
];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const levels = ["#6799bf", "#328a78", "#849250", "#bd6848"];
const years = [2023, 2024, 2025, 2026];
const center = 200;
const ringRadius = (index: number) => 84 + index * 25;
const monthFormat = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
const snapshotFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" });
const playbackStart = Date.parse(calendar.start) - 1;
const playbackEnd = Date.parse(calendar.end);
const playbackDuration = 3600;

function point(radius: number, fraction: number) {
  const angle = fraction * 2 * Math.PI - Math.PI / 2;
  return [center + Math.cos(angle) * radius, center + Math.sin(angle) * radius] as const;
}

function positionInYear(day: Date) {
  const month = day.getUTCMonth();
  const monthLength = new Date(Date.UTC(day.getUTCFullYear(), month + 1, 0)).getUTCDate();
  const dayFraction = (day.getUTCHours() * 60 + day.getUTCMinutes()) / (24 * 60);
  return (month + (day.getUTCDate() - 0.5 + dayFraction) / monthLength) / 12;
}

const days = calendar.days.map(([date, count, level]) => {
  const day = new Date(String(date));
  return {
    date: String(date),
    timestamp: day.getTime(),
    count: Number(count),
    level: Number(level),
    year: day.getUTCFullYear(),
    weekday: (day.getUTCDay() + 6) % 7,
    position: positionInYear(day),
  };
});
const dayCounts = weekdays.map((_, index) => days.filter((day) => day.weekday === index).length);
const busiestWeekday = Math.max(1, ...dayCounts);

const intensityLabels = ["Low", "Medium", "High", "Very high"];
type ActivityFilter = { kind: "level" | "weekday"; value: number };
type PointerFilter = ActivityFilter | null;

const totals = [
  ["Contributions", days.reduce((total, day) => total + day.count, 0)],
  ["Active days", days.length],
  ["Featured merged PRs", OPEN_SOURCE_STATS.mergedPRs],
  ["Upstream projects", OPEN_SOURCE_STATS.repositories],
  ["Public repositories", calendar.publicRepos],
] as const;

export function GitHubActivityDashboard() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartHasEntered = useInView(chartRef, { once: true, amount: 0.3 });
  const [replay, setReplay] = useState(0);
  const [playhead, setPlayhead] = useState<number | null>(playbackStart);
  const [selectedFilter, setSelectedFilter] = useState<ActivityFilter | null>(null);
  const [hoverFilter, setHoverFilter] = useState<PointerFilter>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [selectedBadge, setSelectedBadge] = useState(achievements[0]);
  const [hoveredBadge, setHoveredBadge] = useState<(typeof achievements)[number] | null>(null);
  const previewBadge = hoveredBadge ?? selectedBadge;
  const reducedMotion = useReducedMotion();
  const playbackTime = reducedMotion ? null : playhead;
  const visibleDays = playbackTime === null ? days : days.filter((day) => day.timestamp <= playbackTime);
  const visibleDayCounts = playbackTime === null ? dayCounts : weekdays.map(() => 0);
  if (playbackTime !== null) {
    for (const day of visibleDays) visibleDayCounts[day.weekday] += 1;
  }
  const playbackDate = playbackTime === null || !chartHasEntered
    ? null
    : new Date(Math.max(playbackStart + 1, playbackTime));
  const markerYear = playbackDate ? years.indexOf(playbackDate.getUTCFullYear()) : 0;
  const markerRadius = ringRadius(markerYear);
  const markerAngle = playbackDate ? (markerYear + positionInYear(playbackDate)) * 360 : 0;
  const filter = hoverFilter ?? selectedFilter;
  const activeDays = filter ? visibleDays.filter((day) => day[filter.kind] === filter.value) : visibleDays;
  const inspectedIndex = hoveredDay ?? selectedDay;
  const inspectedDay = inspectedIndex === null ? null : days[inspectedIndex];
  const isSelected = (next: ActivityFilter) =>
    selectedFilter?.kind === next.kind && selectedFilter.value === next.value;

  const toggleFilter = (next: ActivityFilter) => {
    setSelectedFilter(isSelected(next) ? null : next);
    setSelectedDay(null);
  };

  useEffect(() => {
    if (reducedMotion || !chartHasEntered) return;

    const start = performance.now();
    let lastUpdate = start;
    let frame: number;
    const advance = (now: number) => {
      const progress = (now - start) / playbackDuration;
      if (progress >= 1) {
        setPlayhead(null);
        return;
      }
      if (now - lastUpdate >= 32) {
        lastUpdate = now;
        setPlayhead(playbackStart + progress * (playbackEnd - playbackStart));
      }
      frame = requestAnimationFrame(advance);
    };

    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [chartHasEntered, reducedMotion, replay]);

  const replayChart = () => {
    setHoveredDay(null);
    setSelectedDay(null);
    setPlayhead(playbackStart);
    setReplay((value) => value + 1);
  };

  const detail = inspectedDay
    ? `${snapshotFormat.format(new Date(inspectedDay.date))} · ${inspectedDay.count} ${inspectedDay.count === 1 ? "contribution" : "contributions"}`
    : filter
      ? `${filter.kind === "level" ? intensityLabels[filter.value - 1] : weekdays[filter.value]} · ${activeDays.length} active days`
      : playbackDate
        ? monthFormat.format(playbackDate)
        : `${monthFormat.format(new Date(calendar.start))} – ${monthFormat.format(new Date(calendar.end))}`;

  return (
    <article className="rounded-[2rem] border border-foreground/25 bg-card p-5 text-card-foreground shadow-sm sm:p-8" aria-label="GitHub activity dashboard">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <Github className="size-8 shrink-0" aria-hidden="true" />
          <div>
            <h3 className="flex items-center gap-1 text-xl font-bold tracking-tight group-hover:underline">@gopaljilab <ArrowUpRight className="size-4" aria-hidden="true" /></h3>
            <p className="text-sm text-muted-foreground">On GitHub since {monthFormat.format(new Date(calendar.start))}</p>
          </div>
        </a>
        <p className="min-h-5 font-mono text-xs text-muted-foreground">{detail}</p>
      </header>

      <div className="mt-6 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)_minmax(0,1fr)]">
        <div ref={chartRef} className="relative mx-auto w-full max-w-[460px] lg:col-start-2 lg:row-start-1">
          <svg tabIndex={0} onBlur={() => setSelectedDay(null)} onKeyDown={(event) => {
            if (event.key === "Escape") {
              setSelectedDay(null);
              return;
            }
            const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
            if (!offset) return;
            event.preventDefault();
            setHoveredDay(null);
            const indices = visibleDays.flatMap((day, index) => !filter || day[filter.kind] === filter.value ? [index] : []);
            setSelectedDay((current) => {
              const position = current === null ? -1 : indices.indexOf(current);
              if (position < 0) return (offset === 1 ? indices[0] : indices.at(-1)) ?? null;
              return indices[Math.max(0, Math.min(indices.length - 1, position + offset))];
            });
          }} viewBox="0 0 400 400" className="block w-full select-none" role="img" aria-label="GitHub contribution calendar. Each ring represents a year and each colored tick represents an active day. Use the left and right arrow keys to inspect dates.">
            {years.map((year, index) => (
              <circle key={year} cx={center} cy={center} r={ringRadius(index)} stroke="currentColor" strokeOpacity=".065" strokeWidth="21" fill="none" />
            ))}
            {months.map((month, index) => {
              const [x1, y1] = point(70, index / 12);
              const [x2, y2] = point(173, index / 12);
              const [x, y] = point(184, (index + 0.5) / 12);
              return (
                <g key={month}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity=".14" />
                  <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="currentColor" className="font-mono text-[11px] text-muted-foreground">{month}</text>
                </g>
              );
            })}
            <g>
              {visibleDays.map((day, index) => {
                const radius = ringRadius(years.indexOf(day.year));
                const [x1, y1] = point(radius - 10, day.position);
                const [x2, y2] = point(radius + 10, day.position);
                return (
                  <line key={day.date} x1={x1} y1={y1} x2={x2} y2={y2} stroke={levels[day.level - 1]} strokeWidth={inspectedIndex === index ? 3.5 : 1.8}
                    opacity={inspectedIndex === index || (!filter && inspectedIndex === null) || (filter && day[filter.kind] === filter.value) ? 1 : 0.19}
                    className="cursor-pointer motion-safe:transition-opacity"
                    onPointerEnter={(event) => { if (event.pointerType !== "touch") setHoveredDay(index); }}
                    onPointerLeave={() => setHoveredDay(null)}
                    onClick={() => setSelectedDay(index)}>
                    <title>{day.date} · {day.count} {day.count === 1 ? "contribution" : "contributions"}</title>
                  </line>
                );
              })}
            </g>
            {playbackDate && (
              <g
                aria-hidden="true"
                className="pointer-events-none text-primary motion-safe:transition-transform motion-safe:[transition-duration:32ms] motion-safe:ease-linear"
                style={{ transform: `rotate(${markerAngle}deg)`, transformOrigin: `${center}px ${center}px` }}
              >
                <line x1={center} y1={center - markerRadius + 15} x2={center} y2={center - markerRadius - 14} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx={center} cy={center - markerRadius - 14} r="2.75" fill="currentColor" />
              </g>
            )}
            {years.map((year, index) => (
              <text key={year} x={center + 5} y={center - ringRadius(index) + 3} fill="currentColor" className="font-mono text-[9px] text-muted-foreground">{year}</text>
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 m-auto flex h-fit w-fit flex-col items-center">
            <span className="text-[clamp(1.5rem,5vw,3.5rem)] font-bold leading-none tracking-tighter tabular-nums">{activeDays.length}</span>
            <span className="mt-1 text-xs font-medium sm:text-sm">active days</span>
            {!reducedMotion && (
              <>
                <RotateCcw className="mt-2 size-3.5 text-muted-foreground" aria-hidden="true" />
                <button type="button" onClick={replayChart} data-cursor="Replay" aria-label="Replay chart animation" className="pointer-events-auto absolute -inset-2 rounded-xl hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" />
              </>
            )}
          </div>
        </div>

        <div className="lg:col-start-1 lg:row-start-1">
          <h4 className="text-sm font-semibold">GitHub achievements</h4>
          <motion.div key={previewBadge.id} initial={reducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex min-h-[12rem] flex-col items-center justify-center rounded-xl border border-border bg-secondary/40 p-3 text-center">
            <img src={`/assets/github-achievements/${previewBadge.id}.png`} alt="" width="80" height="80" className="size-20 object-contain" />
            <p className="mt-2 font-serif text-xl leading-tight">{previewBadge.name} {previewBadge.tier && <span className="text-sm text-primary">{previewBadge.tier}</span>}</p>
            <p className="mt-1 text-xs text-muted-foreground">{previewBadge.description}</p>
          </motion.div>
          <div className="mt-3 flex flex-wrap justify-center gap-2" role="group" aria-label="GitHub achievement badges">
            {achievements.map((badge) => (
              <button key={badge.id} type="button" onClick={() => { setSelectedBadge(badge); setHoveredBadge(null); }}
                data-cursor="Show badge"
                onPointerEnter={(event) => { if (event.pointerType !== "touch") setHoveredBadge(badge); }}
                onPointerLeave={() => setHoveredBadge(null)}
                aria-pressed={badge.id === selectedBadge.id} aria-label={badge.tier ? `${badge.name} ${badge.tier}` : badge.name} title={badge.name}
                className="relative grid size-10 place-items-center rounded-full border border-border bg-card p-0.5 aria-pressed:ring-2 aria-pressed:ring-primary motion-safe:transition-transform motion-safe:hover:-translate-y-1">
                <img src={`/assets/github-achievements/${badge.id}.png`} alt="" width="36" height="36" className="size-9 object-contain" />
                {badge.tier && (
                  <span aria-hidden="true" className="absolute -bottom-1 -right-1 rounded-full border border-[#91533d] bg-[#ffc4ab] px-1 font-mono text-[10px] font-bold leading-tight text-[#3f2117]">
                    {badge.tier}
                  </span>
                )}
              </button>
            ))}
          </div>
          <a href={`${profileUrl}?achievement=${previewBadge.id}&tab=achievements`} target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 rounded-sm text-sm text-primary hover:underline">
            View achievement on GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="lg:col-start-3 lg:row-start-1">
          <h4 className="text-sm font-semibold">Contribution intensity</h4>
          <div className="mt-2 grid gap-1">
            {intensityLabels.map((label, index) => (
              <button key={label} type="button" aria-pressed={isSelected({ kind: "level", value: index + 1 })}
                data-cursor="Show"
                onClick={() => toggleFilter({ kind: "level", value: index + 1 })}
                onPointerEnter={(event) => { if (event.pointerType !== "touch") setHoverFilter({ kind: "level", value: index + 1 }); }}
                onPointerLeave={() => setHoverFilter(null)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary aria-pressed:bg-muted">
                <span className="size-3 rounded-sm" style={{ backgroundColor: levels[index] }} />
                <span className="flex-1">{label}</span>
                <span className="font-mono tabular-nums">{days.filter((day) => day.level === index + 1).length}</span>
              </button>
            ))}
          </div>
          <h4 className="mt-6 text-sm font-semibold">Active days by weekday</h4>
          <ul className="mt-2 grid grid-cols-7 gap-1">
            {weekdays.map((day, index) => (
              <li key={day} title={`${day}: ${visibleDayCounts[index]} active days`} className="min-w-0">
                <button type="button" aria-pressed={isSelected({ kind: "weekday", value: index })}
                  data-cursor="Show"
                  onClick={() => toggleFilter({ kind: "weekday", value: index })}
                  onPointerEnter={(event) => { if (event.pointerType !== "touch") setHoverFilter({ kind: "weekday", value: index }); }}
                  onPointerLeave={() => setHoverFilter(null)}
                  className="flex h-full w-full flex-col items-center justify-end gap-1 rounded-sm font-mono text-xs tabular-nums hover:text-primary aria-pressed:text-primary">
                <span>{visibleDayCounts[index]}</span>
                <span aria-hidden="true" className="relative h-11 w-full">
                  <span className="absolute inset-x-0 bottom-0 rounded-t-sm bg-foreground/85" style={{ height: 44 * visibleDayCounts[index] / busiestWeekday }} />
                </span>
                <span className="text-muted-foreground"><span aria-hidden="true">{day[0]}</span><span className="sr-only">{day}</span></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {selectedDay === null ? "" : `${snapshotFormat.format(new Date(days[selectedDay].date))}, ${days[selectedDay].count} contributions`}
      </p>
      <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-foreground/25 pt-5 sm:grid-cols-5">
        {totals.map(([label, value]) => (
          <div key={label} className="flex flex-col-reverse gap-1 sm:border-l sm:border-border sm:pl-3 sm:first:border-0 sm:first:pl-0">
            <dt className="text-xs text-muted-foreground sm:text-sm">{label}</dt>
            <dd className="text-2xl font-bold tracking-tight tabular-nums xl:text-4xl">{value.toLocaleString("en")}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-xs text-muted-foreground">Public GitHub snapshot through {snapshotFormat.format(new Date(calendar.end))}. Each tick marks a day with GitHub contributions. Featured PR and project totals describe the transit map below.</p>
    </article>
  );
}
