"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  ChartColumn,
  CreditCard,
  Settings,
  LayoutDashboard,
  Files,
  ArrowLeft,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { PageBlurTransition } from "@/components/motion/page-blur-transition";
import { UserSettingsProvider, useUserSettings } from "@/components/providers/user-settings-provider";
import { UserSettingsDialog } from "@/components/layout/user-settings-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const globalNavItems = [
  { href: "/dashboard", label: "Projects", icon: FolderKanban },
  { href: "/usage", label: "Usage", icon: ChartColumn },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Org settings", icon: Settings },
];

function getProjectNavItems(projectId: string) {
  return [
    { href: `/projects/${projectId}`, label: "Overview", icon: LayoutDashboard },
    { href: `/projects/${projectId}/documents`, label: "Manage documents", icon: Files },
    { href: `/projects/${projectId}/settings`, label: "Project settings", icon: Settings },
  ];
}

function isActive(pathname: string, href: string, projectContext: boolean) {
  if (projectContext) {
    return pathname === href;
  }
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getPageLabel(pathname: string, navItems: { href: string; label: string }[]) {
  const match = navItems.find((item) => pathname === item.href);
  if (match) return match.label;
  const segment = pathname.split("/").filter(Boolean).pop();
  return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : "Projects";
}

function MobileUserButton({ onClick }: { onClick: () => void }) {
  const { initials, settings } = useUserSettings();
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="h-9 cursor-pointer gap-2 rounded-full px-2 text-foreground hover:bg-muted/50 lg:hidden"
      aria-label="Open user settings"
      title="User settings"
    >
      <Avatar className="h-7 w-7 border border-border/60">
        <AvatarFallback className="bg-muted/60 text-[11px] font-semibold text-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">{settings.name}</span>
    </Button>
  );
}

function AppShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userSettingsOpen, setUserSettingsOpen] = React.useState(false);
  const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
  const projectId = projectMatch?.[1];
  const navItems = projectId ? getProjectNavItems(projectId) : globalNavItems;
  const pageLabel = getPageLabel(pathname, navItems);

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex lg:h-screen lg:overflow-hidden">
      <AppSidebar onOpenUserSettings={() => setUserSettingsOpen(true)} />

      <div className="flex min-w-0 flex-1 flex-col lg:h-screen lg:overflow-hidden">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{projectId ? "Project" : "App"}</span>
            <span className="text-muted-foreground/60">/</span>
            <span className="font-medium text-foreground">{pageLabel}</span>
          </div>
          <MobileUserButton onClick={() => setUserSettingsOpen(true)} />
        </header>

        <div className="border-b border-border bg-background px-4 py-2 lg:hidden">
          <nav className="flex gap-2 overflow-x-auto">
            {projectId ? (
              <Link href="/dashboard" className="shrink-0 hover:text-foreground">
                <span className="inline-flex h-9 items-center gap-2 rounded-md border border-transparent px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  All projects
                </span>
              </Link>
            ) : null}
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href, Boolean(projectId));
              return (
                <Link key={item.href} href={item.href} className="shrink-0 hover:text-foreground">
                  <span
                    className={cn(
                      "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors",
                      active
                        ? "border-border bg-muted text-foreground"
                        : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <PageBlurTransition className="min-h-full">{children}</PageBlurTransition>
        </main>
      </div>

      <UserSettingsDialog open={userSettingsOpen} onOpenChange={setUserSettingsOpen} />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserSettingsProvider>
      <AppShellContent>{children}</AppShellContent>
    </UserSettingsProvider>
  );
}
