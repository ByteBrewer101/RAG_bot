"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { KeyRound, PauseCircle, PlayCircle, Trash2, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DemoProject } from "@/lib/demo-data";

type ProjectSettingsPanelProps = {
  project: DemoProject;
};

function createDemoPublicKey(projectId: string) {
  const suffix = Math.random().toString(16).slice(2, 18);
  return `pk_live_${projectId}_${suffix}`;
}

export function ProjectSettingsPanel({ project }: ProjectSettingsPanelProps) {
  const router = useRouter();
  const [publicKey, setPublicKey] = React.useState(project.publicKey);
  const [status, setStatus] = React.useState<DemoProject["status"]>(project.status);
  const [copied, setCopied] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  React.useEffect(() => {
    setPublicKey(project.publicKey);
    setStatus(project.status);
    setDeleteDialogOpen(false);
  }, [project]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  function handleRegenerateKey() {
    setPublicKey(createDemoPublicKey(project.id));
    setCopied(false);
  }

  function handleTogglePause() {
    setStatus((current) => (current === "paused" ? "active" : "paused"));
  }

  function handleDeleteProject() {
    setDeleteDialogOpen(false);
    router.push("/dashboard");
  }

  const isPaused = status === "paused";

  return (
    <div className="space-y-4">
      <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <KeyRound className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" />
            Public key
          </CardTitle>
          <CardDescription>
            Use this key for client-side project access. Regenerate it if the key is exposed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input readOnly value={publicKey} className="bg-background/50 font-mono text-xs sm:text-sm" />
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleCopy} className="gap-2 border-border/70 bg-background/40">
                <Copy className="h-4 w-4" />
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button type="button" variant="outline" onClick={handleRegenerateKey} className="gap-2 border-border/70 bg-background/40">
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Project status</CardTitle>
              <CardDescription>
                Pause the project to temporarily stop ingestion and query activity.
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className={
                isPaused
                  ? "border-[#f6ca83]/30 bg-[#f6ca83]/10 text-[#f6ca83] light:text-[#8a6524]"
                  : "border-[#949d6a]/40 bg-[#949d6a]/15 text-[#d0d38f]"
              }
            >
              {isPaused ? "Paused" : "Active"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            onClick={handleTogglePause}
            className="gap-2 border-border/70 bg-background/40"
          >
            {isPaused ? <PlayCircle className="h-4 w-4" /> : <PauseCircle className="h-4 w-4" />}
            {isPaused ? "Resume project" : "Pause project"}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/30 bg-destructive/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-destructive">Danger zone</CardTitle>
          <CardDescription>
            Deleting this project removes its documents, chunks, and settings. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="gap-2 border-destructive/40 bg-background/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete project
              </Button>
            </DialogTrigger>
            <DialogContent className="border-destructive/30 bg-card/95 backdrop-blur-sm sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-destructive">Delete project</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete <span className="font-medium text-foreground">{project.name}</span>? This
                  will remove its documents, chunks, and settings. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="border-border/70 bg-background/40">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  onClick={handleDeleteProject}
                  className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                  Confirm delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
