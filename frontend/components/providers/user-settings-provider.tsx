"use client";

import * as React from "react";
import { demoCurrentUser } from "@/lib/demo-data";

export type UserPreferences = {
  compactMode: boolean;
  emailNotifications: boolean;
  desktopNotifications: boolean;
};

export type UserSettings = {
  name: string;
  email: string;
  role: string;
  preferences: UserPreferences;
};

type UserSettingsContextValue = {
  settings: UserSettings;
  initials: string;
  updateProfile: (profile: Partial<Pick<UserSettings, "name" | "email" | "role">>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetSettings: () => void;
};

const STORAGE_KEY = "convox.user-settings";

const defaultSettings: UserSettings = {
  name: demoCurrentUser.name,
  email: demoCurrentUser.email,
  role: demoCurrentUser.role,
  preferences: {
    compactMode: false,
    emailNotifications: true,
    desktopNotifications: false,
  },
};

const UserSettingsContext = React.createContext<UserSettingsContextValue | null>(null);

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function loadSettings(): UserSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw) as Partial<UserSettings>;
    return {
      ...defaultSettings,
      ...parsed,
      preferences: {
        ...defaultSettings.preferences,
        ...(parsed.preferences ?? {}),
      },
    };
  } catch {
    return defaultSettings;
  }
}

export function UserSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<UserSettings>(defaultSettings);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate persisted demo settings after mount
    setSettings(loadSettings());
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings, hydrated]);

  const updateProfile = React.useCallback(
    (profile: Partial<Pick<UserSettings, "name" | "email" | "role">>) => {
      setSettings((current) => ({ ...current, ...profile }));
    },
    [],
  );

  const updatePreferences = React.useCallback((preferences: Partial<UserPreferences>) => {
    setSettings((current) => ({
      ...current,
      preferences: { ...current.preferences, ...preferences },
    }));
  }, []);

  const resetSettings = React.useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const value = React.useMemo<UserSettingsContextValue>(
    () => ({
      settings,
      initials: getInitials(settings.name),
      updateProfile,
      updatePreferences,
      resetSettings,
    }),
    [settings, updateProfile, updatePreferences, resetSettings],
  );

  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>;
}

export function useUserSettings() {
  const context = React.useContext(UserSettingsContext);
  if (!context) {
    throw new Error("useUserSettings must be used within UserSettingsProvider");
  }
  return context;
}
