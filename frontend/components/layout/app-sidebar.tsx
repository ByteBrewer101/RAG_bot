"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  ChartColumn,
  CreditCard,
  Settings,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Files,
  ArrowLeft,
} from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserSettings } from "@/components/providers/user-settings-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";

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
    return pathname === "/dashboard" || pathname.startsWith("/projects");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type AppSidebarProps = {
  onOpenUserSettings?: () => void;
};

export function AppSidebar({ onOpenUserSettings }: AppSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { isLight, toggleTheme } = useTheme();
  const { settings, initials } = useUserSettings();

  const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
  const projectId = projectMatch?.[1];
  const navItems = projectId ? getProjectNavItems(projectId) : globalNavItems;

  return (
    <aside
      className={cn(
        "hidden h-screen shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200 lg:sticky lg:top-0 lg:flex",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center border-b border-border",
          collapsed ? "justify-center px-2" : "justify-between px-4",
        )}
      >
        {!collapsed && (
          <Link
            href="/dashboard"
            className="group flex items-center text-foreground hover:text-foreground"
          >
            <span className="font-[family-name:var(--font-caveat)] text-2xl font-bold leading-none tracking-[0.01em] text-foreground transition-colors group-hover:text-[#f6ca83] light:text-[#8a6524] light:hover:text-[#8a6524] sm:text-3xl">
              CoNvoX
            </span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      <nav className={cn("flex-1 space-y-1 overflow-y-auto", collapsed ? "p-2" : "p-3")}>
        {projectId && !collapsed ? (
          <Link
            href="/dashboard"
            className="mb-2 flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            All projects
          </Link>
        ) : null}

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href, Boolean(projectId));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="block hover:text-foreground"
              title={collapsed ? item.label : undefined}
            >
              <span
                className={cn(
                  "flex w-full items-center rounded-md text-sm font-medium transition-colors",
                  collapsed ? "justify-center px-2 py-2" : "gap-2.5 px-2.5 py-2",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className={cn("border-t border-border", collapsed ? "p-2" : "p-3")}>
        <div
          className={cn(
            "flex items-center rounded-lg text-sm",
            collapsed ? "flex-col gap-2 py-2" : "gap-2.5 p-2",
          )}
        >
          <button
            type="button"
            onClick={onOpenUserSettings}
            className={cn(
              "flex min-w-0 cursor-pointer items-center rounded-md text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              collapsed ? "justify-center p-0.5" : "flex-1 gap-2.5 px-1 py-1",
            )}
            aria-label="Open user settings"
            title={collapsed ? settings.name : "User settings"}
          >
            <Avatar className="size-8 shrink-0 border border-border/60">
              <AvatarFallback className="bg-muted text-xs font-semibold text-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-foreground">{settings.name}</div>
                <div className="truncate text-xs text-muted-foreground">{settings.role}</div>
              </div>
            )}
          </button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
            title={isLight ? "Dark mode" : "Light mode"}
            className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border-border/70 bg-card/35 text-foreground hover:border-[#d0d38f]/40 hover:bg-card/60"
          >
            <span suppressHydrationWarning className="flex items-center justify-center">
              {isLight ? (
                <Sun className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" />
              ) : (
                <Moon className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" />
              )}
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
