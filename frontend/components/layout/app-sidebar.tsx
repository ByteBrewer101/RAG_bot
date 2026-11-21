"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Files,
  MessageSquareText,
  Users,
  Settings,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeValue = "default" | "light";
const THEME_KEY = "theme";

const navGroups = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/projects", label: "Projects", icon: FolderKanban },
      { href: "/documents", label: "Documents", icon: Files },
    ],
  },
  {
    label: "Tools",
    items: [{ href: "/chat", label: "Chat", icon: MessageSquareText }],
  },
  {
    label: "Manage",
    items: [
      { href: "/users", label: "Users", icon: Users },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<ThemeValue>("default");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "light" || stored === "default") {
        setTheme(stored);
        return;
      }
    } catch {}
    setTheme(document.documentElement.classList.contains("light") ? "light" : "default");
  }, []);

  const toggleTheme = () => {
    const next: ThemeValue = theme === "light" ? "default" : "light";
    const root = document.documentElement;
    root.classList.remove("light", "dark-marketing");
    if (next === "light") root.classList.add("light");
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    setTheme(next);
  };

  const isLight = theme === "light";

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

      <nav className={cn("flex-1 space-y-5 overflow-y-auto", collapsed ? "p-2" : "p-3")}>
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <div className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);
                return (
                  <Link key={item.href} href={item.href} className="block hover:text-foreground" title={collapsed ? item.label : undefined}>
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
            </div>
          </div>
        ))}
      </nav>

      <div className={cn("border-t border-border", collapsed ? "p-2" : "p-3")}>
        <div
          className={cn(
            "flex items-center rounded-lg text-sm",
            collapsed ? "flex-col gap-2 py-2" : "gap-2.5 p-2",
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold">
            U
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium text-foreground">User</div>
              <div className="truncate text-xs text-muted-foreground">Workspace</div>
            </div>
          )}
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
