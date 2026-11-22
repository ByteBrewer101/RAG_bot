import { AppTopbar } from "@/components/layout/app-topbar";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectFormDemo } from "@/components/projects/project-form-demo";
import { ProjectStatsCharts } from "@/components/projects/project-stats-charts";
import { BlurFadeSection } from "@/components/motion/blur-fade-section";
import { demoProjects } from "@/lib/demo-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <BlurFadeSection index={0}>
        <AppTopbar
          eyebrow="Workspace"
          title="Projects"
          description="View your workspace at a glance and jump into any project."
          actions={<ProjectFormDemo />}
        />
      </BlurFadeSection>

      <BlurFadeSection index={1}>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">All projects</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Projects you have created in this workspace.
              </p>
            </div>
            <ProjectGrid projects={demoProjects} className="md:grid-cols-2 xl:grid-cols-2" />
          </div>

          <aside className="min-w-0 space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Stats</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Activity and content across your projects.
              </p>
            </div>
            <ProjectStatsCharts projects={demoProjects} />
          </aside>
        </div>
      </BlurFadeSection>
    </div>
  );
}
