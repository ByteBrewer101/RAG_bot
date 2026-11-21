import { FileQuestion } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/dashboard/empty-state";

export default function NotFound() {
  return (
    <div className="py-10">
      <EmptyState
        icon={FileQuestion}
        title="Page not found"
        description="The dashboard page or resource you’re looking for doesn’t exist in this demo."
        action={<Link href="/dashboard"><Button className="rounded-xl bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)]">Back to dashboard</Button></Link>}
      />
    </div>
  );
}
