import { ArrowUpRight, FolderKanban } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DemoProject } from "@/lib/demo-data";

const statusStyles: Record<DemoProject["status"], string> = {
  active: "border-[#949d6a]/40 bg-[#949d6a]/15 text-[#d0d38f]",
  paused: "border-[#f6ca83]/30 bg-[#f6ca83]/10 text-[#f6ca83] light:text-[#8a6524]",
  draft: "border-border/70 bg-secondary/50 text-muted-foreground",
};

export function ProjectCard({ project }: { project: DemoProject }) {
  return (
    <Card className="group h-full border-border/60 bg-card/45 backdrop-blur-sm transition-colors hover:border-[#d0d38f]/30 hover:bg-card/65">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/50 text-[#f6ca83] light:text-[#8a6524]">
            <FolderKanban className="h-4 w-4" />
          </div>
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${statusStyles[project.status]}`}>
            {project.status}
          </span>
        </div>
        <div>
          <CardTitle className="text-lg leading-snug">{project.name}</CardTitle>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="border border-border/60 bg-background/40 text-[11px] font-medium text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border/60 pt-4 text-sm">
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">{project.documentCount}</span> documents · {project.updatedAt}
          </div>
          <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-1 text-[#d0d38f] hover:text-[#f6ca83] light:text-[#6f7a3e] light:hover:text-[#8a6524]">
            Open <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
