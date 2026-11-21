"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProjectFormDemo() {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
    }, 900);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-xl bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)]">
          <Plus className="h-4 w-4" /> New project
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border/70 bg-card/95 backdrop-blur-xl">
        <DialogTitle>Create project</DialogTitle>
        <DialogDescription>
          Demo form only — this does not persist data yet.
        </DialogDescription>
        <form onSubmit={onSubmit} className="mt-2 space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-foreground">Project name</span>
            <Input placeholder="e.g. Customer Support KB" required className="bg-background/50" />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-foreground">Description</span>
            <textarea
              placeholder="What documents and questions belong here?"
              rows={4}
              className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </label>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-border/70 bg-background/40">
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)]">
              {submitted ? "Created (demo)" : "Create project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
