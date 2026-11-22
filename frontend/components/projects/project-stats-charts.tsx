import type { DemoProject } from "@/lib/demo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectStatsChartsProps = {
  projects: DemoProject[];
};

function formatNumber(n: number) {
  return n.toLocaleString();
}

function BarRow({
  label,
  value,
  max,
  color,
  sublabel,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  sublabel?: string;
}) {
  const pct = max > 0 ? Math.max((value / max) * 100, value > 0 ? 2 : 0) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="truncate text-muted-foreground">{label}</span>
        <span className="shrink-0 font-medium text-foreground">
          {formatNumber(value)}
          {sublabel ? <span className="ml-1 text-xs font-normal text-muted-foreground">{sublabel}</span> : null}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary/60">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function StatusDonut({ projects }: { projects: DemoProject[] }) {
  const counts = {
    active: projects.filter((p) => p.status === "active").length,
    paused: projects.filter((p) => p.status === "paused").length,
    draft: projects.filter((p) => p.status === "draft").length,
  };
  const total = projects.length || 1;
  const segments = [
    { key: "active", label: "Active", count: counts.active, color: "#949d6a" },
    { key: "paused", label: "Paused", count: counts.paused, color: "#f6ca83" },
    { key: "draft", label: "Draft", count: counts.draft, color: "#6b7280" },
  ] as const;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" className="text-secondary/40" strokeWidth="10" />
          {segments.map((seg) => {
            const dash = (seg.count / total) * circumference;
            const gap = circumference - dash;
            const circle = (
              <circle
                key={seg.key}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="10"
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += dash;
            return circle;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-foreground">{projects.length}</span>
          <span className="text-[11px] text-muted-foreground">Projects</span>
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        {segments.map((seg) => (
          <div key={seg.key} className="flex items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-muted-foreground">{seg.label}</span>
            </div>
            <span className="font-medium text-foreground">{seg.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectStatsCharts({ projects }: ProjectStatsChartsProps) {
  const totalDocs = projects.reduce((s, p) => s + p.documentCount, 0);
  const totalChunks = projects.reduce((s, p) => s + p.chunkCount, 0);
  const totalQueries = projects.reduce((s, p) => s + p.queryCount, 0);
  const maxQueries = Math.max(...projects.map((p) => p.queryCount), 1);
  const maxDocs = Math.max(...projects.map((p) => p.documentCount), 1);

  return (
    <div className="space-y-4">
      <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Workspace overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border/50 bg-background/30 p-3">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Documents</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{formatNumber(totalDocs)}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-background/30 p-3">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Chunks</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{formatNumber(totalChunks)}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-background/30 p-3">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Queries</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{formatNumber(totalQueries)}</p>
            </div>
          </div>
          <StatusDonut projects={projects} />
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Queries by project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <BarRow
              key={project.id}
              label={project.name}
              value={project.queryCount}
              max={maxQueries}
              color="#f6ca83"
              sublabel="queries"
            />
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Documents by project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <BarRow
              key={project.id}
              label={project.name}
              value={project.documentCount}
              max={maxDocs}
              color="#949d6a"
              sublabel="docs"
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
