import { FolderPlus } from "lucide-react";
import { AppTopbar } from "@/components/layout/app-topbar";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFormDemo } from "@/components/projects/project-form-demo";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { demoProjects, demoEmptyProjects } from "@/lib/demo-data";

export default function ProjectsPage() {
  const projects = demoProjects;
  const showEmptyExample = false; // flip to true or use demoEmptyProjects to preview empty state

  return (
    <div className="space-y-6">
      <AppTopbar
        eyebrow="Knowledge spaces"
        title="Projects"
        description="Organize documents by product area, team, or use case. Retrieval can be scoped per project."
        actions={<ProjectFormDemo />}
      />

      {showEmptyExample || projects.length === 0 ? (
        <EmptyState
          icon={FolderPlus}
          title="No projects yet"
          description="Create your first project to start grouping documents and asking cited questions. (Demo view)"
          action={<ProjectFormDemo />}
        />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      )}

      <section className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Skeleton preview</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-card/35 p-5">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="mt-4 h-5 w-2/3" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Tip: swap `projects` with `demoEmptyProjects` from `lib/demo-data.ts` to preview the empty state.</p>
      </section>
    </div>
  );
}
