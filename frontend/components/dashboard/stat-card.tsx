import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  hint: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
};

export function StatCard({ label, value, delta, hint, icon: Icon, trend = "neutral" }: StatCardProps) {
  return (
    <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/50 text-[#f6ca83] light:text-[#8a6524]">
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 font-medium",
              trend === "up" && "bg-[#949d6a]/20 text-[#d0d38f]",
              trend === "down" && "bg-destructive/15 text-destructive",
              trend === "neutral" && "bg-secondary/70 text-muted-foreground",
            )}
          >
            {delta}
          </span>
          <span className="text-muted-foreground">{hint}</span>
        </div>
      </CardContent>
    </Card>
  );
}
