import { notFound } from "next/navigation";
import { AppTopbar } from "@/components/layout/app-topbar";
import { ProjectSettingsPanel } from "@/components/projects/project-settings-panel";
import { BlurFadeSection } from "@/components/motion/blur-fade-section";
import { getProjectById, demoProjects } from "@/lib/demo-data";

export function generateStaticParams() {
  return demoProjects.map((p) => ({ projectId: p.id }));
}

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <BlurFadeSection index={0}>
        <AppTopbar
          eyebrow={project.name}
          title="Project settings"
          description="Manage project access, status, and lifecycle controls."
        />
      </BlurFadeSection>

      <BlurFadeSection index={1}>
        <ProjectSettingsPanel project={project} />
      </BlurFadeSection>
    </div>
  );
}
