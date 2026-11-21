import * as React from "react";
import { cn } from "@/lib/utils";

type AppTopbarProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function AppTopbar({
  title,
  description,
  eyebrow,
  actions,
  children,
  className,
}: AppTopbarProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/45 p-4 backdrop-blur-xl backdrop-saturate-150 sm:p-5 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
        {children}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
