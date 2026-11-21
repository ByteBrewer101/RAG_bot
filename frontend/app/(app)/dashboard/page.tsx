import {
  FolderKanban,
  Files,
  MessageSquareText,
  Database,
  ArrowRight,
  Clock3,
} from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppTopbar } from "@/components/layout/app-topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  demoTenant,
  demoCurrentUser,
  demoStats,
  demoProjects,
  demoDocuments,
  demoActivity,
} from "@/lib/demo-data";

const statIcons = [FolderKanban, Files, MessageSquareText, Database] as const;

export default function DashboardPage() {
  const recentProjects = demoProjects.slice(0, 3);
  const recentDocuments = demoDocuments.slice(0, 4);

  return (
    <div className="space-y-6">
      <AppTopbar
        eyebrow={demoTenant.plan}
        title={`Welcome back, ${demoCurrentUser.name.split(" ")[0]}`}
        description={`Here’s what’s happening across ${demoTenant.name}. This is a demo dashboard powered by static data.`}
        actions={
          <>
            <Link href="/projects"><Button variant="outline" className="border-border/70 bg-background/40">View projects</Button></Link>
            <Link href="/chat"><Button className="gap-2 rounded-xl bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)]">Open chat <ArrowRight className="h-4 w-4" /></Button></Link>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {demoStats.map((stat, i) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
            hint={stat.hint}
            trend={stat.trend}
            icon={statIcons[i] ?? FolderKanban}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-lg">Recent projects</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Active knowledge spaces in your workspace</p>
            </div>
            <Link href="/projects" className="text-sm text-[#d0d38f] hover:text-[#f6ca83] light:text-[#6f7a3e]">View all</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="rounded-xl border border-border/60 bg-background/35 p-4 transition-colors hover:border-[#d0d38f]/30 hover:bg-background/55">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{project.name}</p>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{project.updatedAt}</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{project.documentCount} documents · <span className="capitalize">{project.status}</span></p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Activity</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Recent ingestion and workspace events</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoActivity.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-xl border border-border/50 bg-background/30 p-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-card/40 text-[#f6ca83] light:text-[#8a6524]">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.meta}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Loading preview (skeleton)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-lg">Recent documents</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Latest uploads and indexing status</p>
            </div>
            <Link href="/documents" className="text-sm text-[#d0d38f] hover:text-[#f6ca83] light:text-[#6f7a3e]">View all</Link>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {recentDocuments.map((doc) => (
              <Link key={doc.id} href={`/documents/${doc.id}`}>
                <div className="rounded-xl border border-border/60 bg-background/35 p-4 transition-colors hover:border-[#d0d38f]/30 hover:bg-background/55">
                  <p className="font-medium text-foreground">{doc.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{doc.projectName}</p>
                  <p className="mt-3 text-xs text-muted-foreground capitalize">{doc.status} · {doc.chunkCount} chunks · {doc.updatedAt}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
