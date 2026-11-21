import { Files } from "lucide-react";
import { AppTopbar } from "@/components/layout/app-topbar";
import { DocumentTable } from "@/components/documents/document-table";
import { UploadDropzoneDemo } from "@/components/documents/upload-dropzone-demo";
import { EmptyState } from "@/components/dashboard/empty-state";
import { demoDocuments, demoEmptyDocuments } from "@/lib/demo-data";

export default function DocumentsPage() {
  const documents = demoDocuments;

  return (
    <div className="space-y-6">
      <AppTopbar
        eyebrow="Library"
        title="Documents"
        description="All uploaded sources across your projects. Track indexing status and jump into chunk-level details."
      />

      <UploadDropzoneDemo compact />

      {documents.length === 0 ? (
        <EmptyState icon={Files} title="No documents yet" description="Upload a document to start building your searchable knowledge base. (Demo view)" />
      ) : (
        <DocumentTable documents={documents} showProject />
      )}

      <p className="text-xs text-muted-foreground">Tip: use `demoEmptyDocuments` from `lib/demo-data.ts` to preview the empty state.</p>
    </div>
  );
}
