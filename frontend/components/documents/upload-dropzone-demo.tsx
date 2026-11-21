"use client";

import * as React from "react";
import { UploadCloud, FileUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function UploadDropzoneDemo({ compact = false }: { compact?: boolean }) {
  const [state, setState] = React.useState<"idle" | "selected" | "uploaded">("idle");
  const [name, setName] = React.useState<string | null>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setName(file.name);
    setState("selected");
  }

  function onUpload() {
    if (state !== "selected") return;
    setState("uploaded");
    setTimeout(() => {
      setState("idle");
      setName(null);
    }, 1500);
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border/70 bg-card/30 p-5 backdrop-blur-sm",
        compact ? "p-4" : "p-6",
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-background/50 text-[#f6ca83] light:text-[#8a6524]">
          {state === "uploaded" ? <CheckCircle2 className="h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
        </div>
        <p className="text-sm font-medium text-foreground">
          {state === "uploaded" ? "Upload queued (demo)" : "Drop files here or browse"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          PDF, DOCX, Markdown, TXT, or web sources · UI only, no upload
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <label className="inline-flex cursor-pointer">
            <input type="file" className="sr-only" onChange={onPick} />
            <span className="inline-flex h-9 items-center gap-2 rounded-md border border-border/70 bg-background/40 px-3 text-sm font-medium text-foreground hover:bg-card/70">
              <FileUp className="h-4 w-4" /> Choose file
            </span>
          </label>
          <Button
            type="button"
            size="sm"
            onClick={onUpload}
            disabled={state !== "selected"}
            className="rounded-md bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)] disabled:opacity-50"
          >
            Upload demo
          </Button>
        </div>
        {name ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{name}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
