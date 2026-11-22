import { ChartColumn } from "lucide-react";
import { AppTopbar } from "@/components/layout/app-topbar";
import { EmptyState } from "@/components/dashboard/empty-state";
import { BlurFadeSection } from "@/components/motion/blur-fade-section";

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <BlurFadeSection index={0}>
        <AppTopbar
          eyebrow="Workspace"
          title="Usage"
          description="Track retrieval, indexing, and workspace activity. Detailed usage analytics will appear here."
        />
      </BlurFadeSection>

      <BlurFadeSection index={1}>
        <EmptyState
          icon={ChartColumn}
          title="Usage analytics coming soon"
          description="This page will show document usage, query volume, and indexing activity for your workspace."
        />
      </BlurFadeSection>
    </div>
  );
}
