import { cn } from "@/lib/utils";
import type { DemoDocumentStatus } from "@/lib/demo-data";

const map: Record<DemoDocumentStatus, { label: string; className: string }> = {
  ready: { label: "Ready", className: "border-[#949d6a]/40 bg-[#949d6a]/15 text-[#d0d38f]" },
  indexing: { label: "Indexing", className: "border-[#9cafb7]/40 bg-[#9cafb7]/15 text-[#9cafb7]" },
  uploaded: { label: "Uploaded", className: "border-border/70 bg-secondary/60 text-muted-foreground" },
  failed: { label: "Failed", className: "border-destructive/40 bg-destructive/15 text-destructive" },
};

export function DocumentStatusBadge({ status }: { status: DemoDocumentStatus }) {
  const cfg = map[status];
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium", cfg.className)}>
      {cfg.label}
    </span>
  );
}
