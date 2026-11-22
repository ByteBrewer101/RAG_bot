import { FolderKanban } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFormDemo } from "@/components/projects/project-form-demo";
import { EmptyState } from "@/components/dashboard/empty-state";
import { cn } from "@/lib/utils";
import type { DemoProject } from "@/lib/demo-data";

type ProjectGridProps = {
  projects: DemoProject[];
  className?: string;
};

export function ProjectGrid({ projects, className }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No projects yet"
        description="Create your first project to start organizing documents and asking cited questions."
        action={<ProjectFormDemo />}
      />
    );
  }

  return (
    <section className={cn("grid gap-4 md:grid-cols-2 xl:grid-cols-3", className)}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
