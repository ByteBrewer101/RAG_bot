import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Layers3 } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppTopbar } from "@/components/layout/app-topbar";
import { DocumentStatusBadge } from "@/components/documents/document-status";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { getDocumentById, getDocumentDetailById, demoDocuments } from "@/lib/demo-data";

export function generateStaticParams() {
  return demoDocuments.map((d) => ({ documentId: d.id }));
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  const doc = getDocumentById(documentId);
  if (!doc) notFound();
  const detail = getDocumentDetailById(documentId);

  return (
    <div className="space-y-6">
      <AppTopbar
        eyebrow={doc.projectName}
        title={doc.name}
        description={detail?.summary ?? "Document details and chunk previews for retrieval."}
        actions={<Link href="/documents"><Button variant="outline" className="gap-2 border-border/70 bg-background/40"><ArrowLeft className="h-4 w-4" /> All documents</Button></Link>}
      />

      <section className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg"><FileText className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3">
              <span className="text-muted-foreground">Status</span>
              <DocumentStatusBadge status={doc.status} />
            </div>
            {[
              ["Project", doc.projectName],
              ["Type", doc.type],
              ["Size", doc.size],
              ["Chunks", String(doc.chunkCount)],
              ["Uploaded", doc.uploadedAt],
              ["Updated", doc.updatedAt],
              ["Source", detail?.sourceLabel ?? "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-right font-medium text-foreground">{v}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg"><Layers3 className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> Chunks</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Sample indexed segments used for retrieval and citations.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {doc.status === "failed" ? (
              <EmptyState icon={FileText} title="Processing failed" description="This demo document is marked as failed. In the live app you could retry ingestion or inspect the error." />
            ) : doc.status === "indexing" || doc.status === "uploaded" ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Chunks will appear once indexing completes. Demo skeleton preview:</p>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2 rounded-xl border border-border/60 bg-background/30 p-4">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            ) : detail && detail.chunks.length > 0 ? (
              detail.chunks.map((chunk) => (
                <div key={chunk.id} className="rounded-xl border border-border/60 bg-background/35 p-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Chunk {chunk.index}</span>
                    <span>{chunk.tokens} tokens · {chunk.source}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{chunk.content}</p>
                </div>
              ))
            ) : (
              <EmptyState icon={Layers3} title="No chunk preview" description="This document is ready, but no sample chunks were added in demo data. Add entries in `demoDocumentDetails` in `lib/demo-data.ts`." />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
