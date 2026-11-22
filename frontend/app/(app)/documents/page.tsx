import { Files } from "lucide-react";
import { AppTopbar } from "@/components/layout/app-topbar";
import { DocumentTable } from "@/components/documents/document-table";
import { UploadDropzoneDemo } from "@/components/documents/upload-dropzone-demo";
import { EmptyState } from "@/components/dashboard/empty-state";
import { BlurFadeSection } from "@/components/motion/blur-fade-section";
import { demoDocuments, demoEmptyDocuments } from "@/lib/demo-data";

export default function DocumentsPage() {
  const documents = demoDocuments;

  return (
    <div className="space-y-6">
      <BlurFadeSection index={0}>
        <AppTopbar
          eyebrow="Library"
          title="Documents"
          description="All uploaded sources across your projects. Track indexing status and jump into chunk-level details."
        />
      </BlurFadeSection>

      <BlurFadeSection index={1}>
        <UploadDropzoneDemo compact />
      </BlurFadeSection>

      <BlurFadeSection index={2}>
        {documents.length === 0 ? (
          <EmptyState icon={Files} title="No documents yet" description="Upload a document to start building your searchable knowledge base. (Demo view)" />
        ) : (
          <DocumentTable documents={documents} showProject />
        )}
      </BlurFadeSection>

      <BlurFadeSection index={3}>
        <p className="text-xs text-muted-foreground">Tip: use `demoEmptyDocuments` from `lib/demo-data.ts` to preview the empty state.</p>
      </BlurFadeSection>
    </div>
  );
}
