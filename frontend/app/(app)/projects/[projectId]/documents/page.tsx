import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppTopbar } from "@/components/layout/app-topbar";
import { UploadDropzoneDemo } from "@/components/documents/upload-dropzone-demo";
import { DocumentTable } from "@/components/documents/document-table";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Files } from "lucide-react";
import { getProjectById, getDocumentsByProject, demoProjects } from "@/lib/demo-data";

export function generateStaticParams() {
  return demoProjects.map((p) => ({ projectId: p.id }));
}

export default async function ProjectDocumentsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  if (!project) notFound();
  const docs = getDocumentsByProject(project.id);

  return (
    <div className="space-y-6">
      <AppTopbar
        eyebrow={project.name}
        title="Project documents"
        description="Upload and manage documents scoped to this project. Processing states below are demo data."
        actions={<Link href={`/projects/${project.id}`}><Button variant="outline" className="gap-2 border-border/70 bg-background/40"><ArrowLeft className="h-4 w-4" /> Back to project</Button></Link>}
      />

      <UploadDropzoneDemo />

      <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Documents</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Files uploaded to {project.name}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {docs.length === 0 ? (
            <EmptyState icon={Files} title="No documents in this project" description="Use the upload area above to add your first document (demo)." />
          ) : (
            <DocumentTable documents={docs} showProject={false} />
          )}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Skeleton preview</p>
            <div className="space-y-2 rounded-xl border border-border/60 bg-background/30 p-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
