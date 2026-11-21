import { UserPlus, Mail } from "lucide-react";
import { AppTopbar } from "@/components/layout/app-topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { demoUsers } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const statusClass: Record<string, string> = {
  active: "border-[#949d6a]/40 bg-[#949d6a]/15 text-[#d0d38f]",
  invited: "border-[#9cafb7]/40 bg-[#9cafb7]/15 text-[#9cafb7]",
  suspended: "border-destructive/40 bg-destructive/15 text-destructive",
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <AppTopbar
        eyebrow="Tenant"
        title="Users"
        description="Manage workspace members and access. Actions are demo-only."
        actions={<Button className="gap-2 rounded-xl bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)]"><UserPlus className="h-4 w-4" /> Invite user</Button>}
      />

      <Card className="border-border/60 bg-card/45 p-4 backdrop-blur-sm sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or email (demo)" className="bg-background/50 pl-9" />
          </div>
          <p className="text-sm text-muted-foreground">{demoUsers.length} members</p>
        </div>
        {demoUsers.length === 0 ? (
          <EmptyState icon={UserPlus} title="No users found" description="Invite teammates to collaborate in this workspace." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border/60">
                  <th className="px-3 py-3 font-medium">Member</th>
                  <th className="px-3 py-3 font-medium">Role</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Last active</th>
                  <th className="px-3 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {demoUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 last:border-0">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 text-xs font-semibold text-foreground">
                          {u.initials}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{u.role}</td>
                    <td className="px-3 py-3">
                      <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize", statusClass[u.status ?? "active"])}>{u.status ?? "active"}</span>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{u.lastActive ?? "—"}</td>
                    <td className="px-3 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Manage</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-5 space-y-2 border-t border-border/60 pt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Skeleton preview</p>
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/25 p-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
