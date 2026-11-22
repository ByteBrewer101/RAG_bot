"use client";

import * as React from "react";
import { Moon, Sun, UserRound, Palette, SlidersHorizontal, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useUserSettings } from "@/components/providers/user-settings-provider";

type UserSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function SettingsRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-background/30 p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0 pt-0.5">{children}</div>
    </div>
  );
}

export function UserSettingsDialog({ open, onOpenChange }: UserSettingsDialogProps) {
  const { isLight, toggleTheme, setTheme } = useTheme();
  const { settings, initials, updateProfile, updatePreferences, resetSettings } = useUserSettings();
  const [draft, setDraft] = React.useState(settings);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setDraft(settings);
    onOpenChange(nextOpen);
  };

  const hasProfileChanges =
    draft.name !== settings.name || draft.email !== settings.email || draft.role !== settings.role;

  const handleSaveProfile = () => {
    updateProfile({
      name: draft.name.trim() || settings.name,
      email: draft.email.trim() || settings.email,
      role: draft.role.trim() || settings.role,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden border-border/70 bg-card/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-3xl">
        <div className="flex max-h-[90vh] flex-col">
          <DialogHeader className="border-b border-border/60 px-6 py-5 pr-14 text-left">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border border-border/60 bg-background/40">
                <AvatarFallback className="bg-muted/60 text-base font-semibold text-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 space-y-1">
                <DialogTitle className="truncate text-xl">{settings.name}</DialogTitle>
                <DialogDescription className="truncate">
                  {settings.email} · {settings.role}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto px-6 py-5">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid h-auto w-full grid-cols-3 rounded-xl bg-muted/50 p-1">
                <TabsTrigger value="profile" className="gap-2 rounded-lg py-2 data-[state=active]:bg-background/80">
                  <UserRound className="h-4 w-4" /> Profile
                </TabsTrigger>
                <TabsTrigger value="appearance" className="gap-2 rounded-lg py-2 data-[state=active]:bg-background/80">
                  <Palette className="h-4 w-4" /> Appearance
                </TabsTrigger>
                <TabsTrigger value="preferences" className="gap-2 rounded-lg py-2 data-[state=active]:bg-background/80">
                  <SlidersHorizontal className="h-4 w-4" /> Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-5 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="user-name">Display name</Label>
                    <Input
                      id="user-name"
                      value={draft.name}
                      onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                      className="bg-background/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={draft.email}
                      onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                      className="bg-background/50"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-role">Role / title</Label>
                    <Input
                      id="user-role"
                      value={draft.role}
                      onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value }))}
                      className="bg-background/50"
                      placeholder="Workspace Admin"
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Demo profile settings are saved locally in this browser.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setDraft(settings)}
                      disabled={!hasProfileChanges}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={!hasProfileChanges}
                      className="bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)]"
                    >
                      Save profile
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="mt-5 space-y-4">
                <div className="rounded-xl border border-border/60 bg-background/30 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Theme</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Switch between night and day mode. This also updates the theme buttons in the app.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme("default")}
                        className={cn(
                          "gap-2 rounded-full",
                          !isLight && "border-[#d0d38f]/50 bg-muted text-foreground",
                        )}
                      >
                        <Moon className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" />
                        Night
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme("light")}
                        className={cn(
                          "gap-2 rounded-full",
                          isLight && "border-[#d0d38f]/50 bg-muted text-foreground",
                        )}
                      >
                        <Sun className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" />
                        Day
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
                        title={isLight ? "Dark mode" : "Light mode"}
                        className="relative h-9 w-9 rounded-full border-border/70 bg-card/35 text-foreground hover:border-[#d0d38f]/40 hover:bg-card/60"
                      >
                        {isLight ? (
                          <Sun className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" />
                        ) : (
                          <Moon className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Current theme: <span className="font-medium text-foreground">{isLight ? "Day" : "Night"}</span>
                </p>
              </TabsContent>

              <TabsContent value="preferences" className="mt-5 space-y-4">
                <SettingsRow
                  title="Compact mode"
                  description="Use tighter spacing in dashboard layouts where supported."
                >
                  <Switch
                    checked={settings.preferences.compactMode}
                    onCheckedChange={(checked) => updatePreferences({ compactMode: checked })}
                    aria-label="Toggle compact mode"
                  />
                </SettingsRow>
                <SettingsRow
                  title="Email notifications"
                  description="Receive product and workspace updates by email (demo preference)."
                >
                  <Switch
                    checked={settings.preferences.emailNotifications}
                    onCheckedChange={(checked) => updatePreferences({ emailNotifications: checked })}
                    aria-label="Toggle email notifications"
                  />
                </SettingsRow>
                <SettingsRow
                  title="Desktop notifications"
                  description="Enable browser-style notifications for important events (demo preference)."
                >
                  <Switch
                    checked={settings.preferences.desktopNotifications}
                    onCheckedChange={(checked) => updatePreferences({ desktopNotifications: checked })}
                    aria-label="Toggle desktop notifications"
                  />
                </SettingsRow>

                <Separator className="bg-border/60" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Preferences are stored locally for this demo workspace.
                  </p>
                  <Button variant="outline" onClick={resetSettings} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset to defaults
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
