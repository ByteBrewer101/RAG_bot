import { CreditCard } from "lucide-react";
import { AppTopbar } from "@/components/layout/app-topbar";
import { EmptyState } from "@/components/dashboard/empty-state";
import { BlurFadeSection } from "@/components/motion/blur-fade-section";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <BlurFadeSection index={0}>
        <AppTopbar
          eyebrow="Workspace"
          title="Billing"
          description="Manage your plan, invoices, and payment details. Billing controls will appear here."
        />
      </BlurFadeSection>

      <BlurFadeSection index={1}>
        <EmptyState
          icon={CreditCard}
          title="Billing management coming soon"
          description="This page will include plan details, payment methods, invoices, and subscription controls."
        />
      </BlurFadeSection>
    </div>
  );
}
