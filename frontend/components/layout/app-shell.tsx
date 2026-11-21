"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Files,
  MessageSquareText,
  Users,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/documents", label: "Documents", icon: Files },
  { href: "/chat", label: "Chat", icon: MessageSquareText },
  { href: "/users", label: "Users", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getPageLabel(pathname: string) {
  const match = navItems.find((item) => isActive(pathname, item.href));
  if (match) return match.label;
  const segment = pathname.split("/").filter(Boolean).pop();
  return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : "Dashboard";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageLabel = getPageLabel(pathname);

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/50 px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">App</span>
            <span className="text-muted-foreground/60">/</span>
            <span className="font-medium text-foreground">{pageLabel}</span>
          </div>
        </header>

        <div className="border-b border-border bg-background px-4 py-2 lg:hidden">
          <nav className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
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

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
