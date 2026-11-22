"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeValue = "default" | "light";

export const THEME_KEY = "theme";
const THEME_EVENT = "convox-theme-change";

export function resolveTheme(): ThemeValue {
  if (typeof document === "undefined") return "default";
  return document.documentElement.classList.contains("light") ? "light" : "default";
}

export function applyTheme(next: ThemeValue) {
  const root = document.documentElement;
  root.classList.remove("light", "dark-marketing");
  if (next === "light") root.classList.add("light");
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {}
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<ThemeValue>(THEME_EVENT, { detail: next }));
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeValue>("default");

  useEffect(() => {
    const sync = () => {
      try {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === "light" || stored === "default") {
          setThemeState(stored);
          return;
        }
      } catch {}
      setThemeState(resolveTheme());
    };

    sync();

    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY) sync();
    };
    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent<ThemeValue>).detail;
      if (detail === "light" || detail === "default") setThemeState(detail);
      else sync();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(THEME_EVENT, onThemeChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(THEME_EVENT, onThemeChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next: ThemeValue = current === "light" ? "default" : "light";
      applyTheme(next);
      return next;
    });
  }, []);

  const setTheme = useCallback((next: ThemeValue) => {
    applyTheme(next);
    setThemeState(next);
  }, []);

  return {
    theme,
    isLight: theme === "light",
    toggleTheme,
    setTheme,
  };
}
