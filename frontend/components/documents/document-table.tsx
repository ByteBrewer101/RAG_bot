import { FileText, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Card } from "@/components/ui/card";
import { DocumentStatusBadge } from "./document-status";
import type { DemoDocument } from "@/lib/demo-data";

export function DocumentTable({
  documents,
  showProject = true,
}: {
  documents: DemoDocument[];
  showProject?: boolean;
}) {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/45 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-background/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr className="border-b border-border/60">
              <th className="px-4 py-3 font-medium sm:px-5">Document</th>
              {showProject && <th className="px-4 py-3 font-medium sm:px-5">Project</th>}
              <th className="px-4 py-3 font-medium sm:px-5">Type</th>
              <th className="px-4 py-3 font-medium sm:px-5">Status</th>
              <th className="px-4 py-3 font-medium sm:px-5">Chunks</th>
              <th className="px-4 py-3 font-medium sm:px-5">Updated</th>
              <th className="px-4 py-3 font-medium sm:px-5"></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-border/50 last:border-0 hover:bg-background/30">
                <td className="px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-[#f6ca83] light:text-[#8a6524]">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.size}</p>
                    </div>
                  </div>
                </td>
                {showProject && <td className="px-4 py-3 text-muted-foreground sm:px-5">{doc.projectName}</td>}
                <td className="px-4 py-3 text-muted-foreground sm:px-5">{doc.type}</td>
                <td className="px-4 py-3 sm:px-5"><DocumentStatusBadge status={doc.status} /></td>
                <td className="px-4 py-3 text-muted-foreground sm:px-5">{doc.chunkCount}</td>
                <td className="px-4 py-3 text-muted-foreground sm:px-5">{doc.updatedAt}</td>
                <td className="px-4 py-3 text-right sm:px-5">
                  <Link
                    href={`/documents/${doc.id}`}
                    className="inline-flex items-center gap-1 text-[#d0d38f] hover:text-[#f6ca83] light:text-[#6f7a3e] light:hover:text-[#8a6524]"
                  >
                    View <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
