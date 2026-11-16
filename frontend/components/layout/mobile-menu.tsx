"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus, Sun, Moon } from "lucide-react";
import { springBouncy, springSnappy, springSoft } from "@/lib/motion";

type ThemeValue = "default" | "light";
const THEME_KEY = "theme";

const navOptions = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#workflow", label: "Workflow" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeValue>(() => {
    if (typeof window === "undefined") return "default";
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "light" || stored === "default") return stored;
    } catch {}
    return document.documentElement.classList.contains("light") ? "light" : "default";
  });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      try {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === "light" || stored === "default") setTheme(stored);
        else
          setTheme(
            document.documentElement.classList.contains("light") ? "light" : "default",
          );
      } catch {}
    }, 0);
    return () => clearTimeout(id);
  }, [open]);

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
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="h-7 w-7 rounded-full text-foreground hover:bg-secondary/50"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed left-1/2 top-[4.1rem] z-50 w-[min(22rem,calc(100vw-1.5rem))] -translate-x-1/2 overflow-hidden rounded-[1.4rem] border border-border/70 bg-background/78 p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-xl backdrop-saturate-150"
              initial={reduce ? false : { opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
              transition={springSoft}
            >
              <div className="mb-2 flex items-center justify-center px-2 pt-1">
                <p className="font-[family-name:var(--font-caveat)] text-2xl font-bold leading-none tracking-[0.01em] text-foreground">CoNvoX</p>
              </div>
              <nav className="space-y-1.5">
                {navOptions.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block">
                    <motion.div
                      whileTap={reduce ? undefined : { scale: 0.99 }}
                      transition={springSnappy}
                      className="flex items-center rounded-[1rem] border border-border/60 bg-card/30 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/40"
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                ))}
                <div className="my-1 h-px bg-border/60" />
                <Link href="/login" onClick={() => setOpen(false)} className="block">
                  <motion.div
                    whileTap={reduce ? undefined : { scale: 0.99 }}
                    transition={springSnappy}
                    className="flex items-center gap-2 rounded-[1rem] border border-border/60 bg-card/30 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/40"
                  >
                    <LogIn className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> Log in
                  </motion.div>
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="block">
                  <motion.div
                    whileTap={reduce ? undefined : { scale: 0.99 }}
                    transition={springSnappy}
                    className="flex items-center gap-2 rounded-[1rem] border border-border/60 bg-card/30 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/40"
                  >
                    <UserPlus className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> Sign up
                  </motion.div>
                </Link>
                <motion.div whileTap={reduce ? undefined : { scale: 0.99 }} transition={springSnappy}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
                    title={isLight ? "Dark mode" : "Light mode"}
                    className="relative h-10 w-full overflow-hidden rounded-[1rem] border-border/60 bg-card/30 text-foreground hover:bg-secondary/40"
                  >
                    {reduce ? (
                      <span className="flex items-center justify-center gap-2 text-sm font-medium">
                        {isLight ? <Sun className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> : <Moon className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" />}
                        {isLight ? "Light" : "Dark"}
                      </span>
                    ) : (
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={theme}
                          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                          transition={springBouncy}
                          className="flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          {isLight ? <Sun className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> : <Moon className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" />}
                          {isLight ? "Light" : "Dark"}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
