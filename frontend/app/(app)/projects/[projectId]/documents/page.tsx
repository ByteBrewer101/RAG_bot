import { notFound } from "next/navigation";
import { AppTopbar } from "@/components/layout/app-topbar";
import { ManageDocumentsPanel } from "@/components/projects/manage-documents-panel";
import { BlurFadeSection } from "@/components/motion/blur-fade-section";
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

  const documents = getDocumentsByProject(project.id);

  return (
    <div className="space-y-6">
      <BlurFadeSection index={0}>
        <AppTopbar
          eyebrow={project.name}
          title="Manage documents"
          description="Upload, review, and remove documents for this project."
        />
      </BlurFadeSection>

      <BlurFadeSection index={1}>
        <ManageDocumentsPanel project={project} documents={documents} />
      </BlurFadeSection>
    </div>
  );
}
