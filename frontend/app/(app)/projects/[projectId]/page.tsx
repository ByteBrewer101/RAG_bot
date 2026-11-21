import { notFound } from "next/navigation";
import { ArrowLeft, FolderKanban, Files, MessageSquareText } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppTopbar } from "@/components/layout/app-topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { DocumentTable } from "@/components/documents/document-table";
import { EmptyState } from "@/components/dashboard/empty-state";
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

  const docs = getDocumentsByProject(project.id);
  const ready = docs.filter((d) => d.status === "ready").length;

  return (
    <div className="space-y-6">
      <AppTopbar
        eyebrow="Project"
        title={project.name}
        description={project.description}
        actions={
          <>
            <Link href="/projects"><Button variant="outline" className="gap-2 border-border/70 bg-background/40"><ArrowLeft className="h-4 w-4" /> Projects</Button></Link>
            <Link href={`/projects/${project.id}/documents`}><Button className="gap-2 rounded-xl bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)]"><Files className="h-4 w-4" /> Project documents</Button></Link>
          </>
        }
      >
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1 capitalize">Status: {project.status}</span>
          <span className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1">Updated {project.updatedAt}</span>
          {project.tags.map((t) => <span key={t} className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1">{t}</span>)}
        </div>
      </AppTopbar>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Documents" value={String(docs.length)} delta={`${project.documentCount} total`} hint="In this project" icon={Files} trend="neutral" />
        <StatCard label="Ready" value={String(ready)} delta={ready === docs.length ? "All indexed" : "Some pending"} hint="Searchable now" icon={FolderKanban} trend={ready === docs.length ? "up" : "neutral"} />
        <StatCard label="Chat scope" value="Available" delta="Citations on" hint="Demo mode" icon={MessageSquareText} trend="up" />
      </section>

      <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-lg">Documents in this project</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Recent files and processing status</p>
          </div>
          <Link href={`/projects/${project.id}/documents`} className="text-sm text-[#d0d38f] hover:text-[#f6ca83] light:text-[#6f7a3e]">Manage documents</Link>
        </CardHeader>
        <CardContent>
          {docs.length === 0 ? (
            <EmptyState icon={Files} title="No documents yet" description="Upload documents to this project to make them searchable." action={<Link href={`/projects/${project.id}/documents`}><Button variant="outline" className="border-border/70 bg-background/40">Go to uploads</Button></Link>} />
          ) : (
            <DocumentTable documents={docs} showProject={false} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
