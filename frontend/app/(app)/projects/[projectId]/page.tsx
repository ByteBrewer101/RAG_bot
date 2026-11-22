import { notFound } from "next/navigation";
import { Files, Database, MessageSquareText, CircleCheck } from "lucide-react";
import { AppTopbar } from "@/components/layout/app-topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { BlurFadeSection } from "@/components/motion/blur-fade-section";
import { getProjectById, getDocumentsByProject, demoProjects } from "@/lib/demo-data";

export function generateStaticParams() {
  return demoProjects.map((p) => ({ projectId: p.id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  if (!project) notFound();

  const documents = getDocumentsByProject(project.id);
  const readyDocuments = documents.filter((doc) => doc.status === "ready").length;

  return (
    <div className="space-y-6">
      <BlurFadeSection index={0}>
        <AppTopbar
          eyebrow="Project"
          title={project.name}
          description={project.description}
        >
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1 capitalize">
              Status: {project.status}
            </span>
            <span className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1">
              Updated {project.updatedAt}
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </AppTopbar>
      </BlurFadeSection>

      <BlurFadeSection index={1}>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Documents"
            value={String(project.documentCount)}
            delta={`${documents.length} in workspace`}
            hint="Total project documents"
            icon={Files}
            trend="neutral"
          />
          <StatCard
            label="Chunks created"
            value={project.chunkCount.toLocaleString()}
            delta="Searchable units"
            hint="Across project documents"
            icon={Database}
            trend="up"
          />
          <StatCard
            label="Queries received"
            value={project.queryCount.toLocaleString()}
            delta="Project scoped"
            hint="Total chat queries"
            icon={MessageSquareText}
            trend="up"
          />
          <StatCard
            label="Ready documents"
            value={String(readyDocuments)}
            delta={readyDocuments === documents.length && documents.length > 0 ? "All indexed" : "Indexing status"}
            hint="Available for retrieval"
            icon={CircleCheck}
            trend={readyDocuments === documents.length && documents.length > 0 ? "up" : "neutral"}
          />
        </section>
      </BlurFadeSection>
    </div>
  );
}
