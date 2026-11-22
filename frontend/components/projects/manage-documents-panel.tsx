"use client";

import * as React from "react";
import { Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadDropzoneDemo } from "@/components/documents/upload-dropzone-demo";
import { DocumentStatusBadge } from "@/components/documents/document-status";
import type { DemoDocument, DemoProject } from "@/lib/demo-data";

type ManageDocumentsPanelProps = {
  project: DemoProject;
  documents: DemoDocument[];
};

export function ManageDocumentsPanel({ project, documents }: ManageDocumentsPanelProps) {
  const [items, setItems] = React.useState(documents);
  const [pendingDelete, setPendingDelete] = React.useState<DemoDocument | null>(null);

  React.useEffect(() => {
    setItems(documents);
  }, [documents]);

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((doc) => doc.id !== id));
  }

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    handleDelete(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div className="space-y-4">
      <UploadDropzoneDemo />

      <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Project documents</CardTitle>
              <CardDescription>Files uploaded to {project.name}</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">{items.length} documents</span>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/70 bg-background/30 px-4 py-8 text-center text-sm text-muted-foreground">
              No documents in this project yet.
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/35 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card/50 text-[#f6ca83] light:text-[#8a6524]">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type} · {doc.size} · {doc.chunkCount} chunks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:shrink-0">
                    <DocumentStatusBadge status={doc.status} />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPendingDelete(doc)}
                      className="gap-1.5 border-destructive/30 bg-background/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!pendingDelete}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
      >
        <DialogContent className="border-border/70 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Delete document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">{pendingDelete?.name}</span>? This will remove it
              from <span className="font-medium text-foreground">{project.name}</span>. This is a demo-only
              action and does not persist data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPendingDelete(null)}
              className="border-border/70 bg-background/40"
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleConfirmDelete}>
              Delete document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
