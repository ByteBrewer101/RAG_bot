"use client";

import * as React from "react";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Sun, Moon } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { springBouncy, springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ThemeValue = "default" | "light";

const THEME_KEY = "theme";

const navOptions = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#workflow", label: "Workflow" },
];

export function Navbar() {
  const clipId = useId().replace(/:/g, "");
  const [theme, setTheme] = useState<ThemeValue>("default");
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
  const glass = scrolled ? "bg-background/74" : "bg-background/60";
  const edge = scrolled ? "border-border/70" : "border-border/55";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 isolate">
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V0.22 H0.818 Q0.8,0.22 0.8,0.32 V0.78 Q0.8,1 0.788,1 H0.212 Q0.2,1 0.2,0.78 V0.32 Q0.2,0.22 0.182,0.22 H0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative mx-auto h-[3rem] w-full sm:h-[3.2rem]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)] light:drop-shadow-[0_1px_3px_rgba(0,0,0,0.10)]"
        >
          <div
            className={cn(
              "absolute inset-0 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color] duration-300",
              glass,
              edge,
            )}
            style={{ clipPath: `url(#${clipId})` }}
          />
        </div>

        <motion.header
          initial={reduce ? false : { y: -20, opacity: 0 }}
          animate={reduce ? undefined : { y: 0, opacity: 1 }}
          transition={springSnappy}
          className="pointer-events-auto absolute inset-x-0 top-0 mx-auto flex h-full w-[60%] max-w-[calc(100vw-1.5rem)] flex-col"
        >
          <div aria-hidden="true" className="h-2 w-full sm:h-2.5" />
          <div className="grid min-h-0 flex-1 grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 pb-0.5 sm:px-5 sm:pb-1">
            <nav className="hidden items-center justify-start gap-1 md:flex">
              {navOptions.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div whileHover={reduce ? undefined : { y: -1 }} whileTap={reduce ? undefined : { scale: 0.98 }} transition={springSnappy}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 rounded-full px-2.5 text-[12px] text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-start md:hidden">
              <MobileMenu />
            </div>

            <Link
              href="/"
              className="group flex items-center justify-center justify-self-center text-foreground hover:text-foreground"
            >
              <motion.span
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={springSnappy}
                className="font-[family-name:var(--font-caveat)] text-2xl font-bold leading-none tracking-[0.01em] text-foreground transition-colors group-hover:text-[#f6ca83] light:hover:text-[#8a6524] light:text-[#8a6524] sm:text-3xl"
              >
                CoNvoX
              </motion.span>
            </Link>

            <div className="hidden items-center justify-end gap-1 md:flex">
              <Link href="/login">
                <motion.div whileHover={reduce ? undefined : { y: -1 }} whileTap={reduce ? undefined : { scale: 0.98 }} transition={springSnappy}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1.5 rounded-full px-2.5 text-[12px] text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  >
                    <LogIn className="h-3.5 w-3.5" /> Log in
                  </Button>
                </motion.div>
              </Link>
              <Link href="/signup">
                <motion.div whileHover={reduce ? undefined : { y: -1 }} whileTap={reduce ? undefined : { scale: 0.98 }} transition={springSnappy}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1.5 rounded-full px-2.5 text-[12px] text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  >
                    <UserPlus className="h-3.5 w-3.5" /> Sign up
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileTap={reduce ? undefined : { scale: 0.94 }} transition={springSnappy}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
                  title={isLight ? "Dark mode" : "Light mode"}
                  className="relative ml-0.5 h-7 w-7 overflow-hidden rounded-full border-border/70 bg-card/35 text-foreground hover:border-[#d0d38f]/40 hover:bg-card/60"
                >
                  {reduce ? (
                    <span suppressHydrationWarning className="flex items-center justify-center">
                      {isLight ? (
                        <Sun className="h-3.5 w-3.5 text-[#f6ca83] light:text-[#8a6524]" />
                      ) : (
                        <Moon className="h-3.5 w-3.5 text-[#f6ca83] light:text-[#8a6524]" />
                      )}
                    </span>
                  ) : (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={theme}
                        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                        transition={springBouncy}
                        suppressHydrationWarning
                        className="flex items-center justify-center"
                      >
                        {isLight ? (
                          <Sun className="h-3.5 w-3.5 text-[#f6ca83] light:text-[#8a6524]" />
                        ) : (
                          <Moon className="h-3.5 w-3.5 text-[#f6ca83] light:text-[#8a6524]" />
                        )}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </Button>
              </motion.div>
            </div>

            <div className="flex items-center justify-end md:hidden">
              <motion.div whileTap={reduce ? undefined : { scale: 0.94 }} transition={springSnappy}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
                  title={isLight ? "Dark mode" : "Light mode"}
                  className="relative h-7 w-7 overflow-hidden rounded-full border-border/70 bg-card/35 text-foreground hover:border-[#d0d38f]/40 hover:bg-card/60"
                >
                  {isLight ? (
                    <Sun className="h-3.5 w-3.5 text-[#f6ca83] light:text-[#8a6524]" />
                  ) : (
                    <Moon className="h-3.5 w-3.5 text-[#f6ca83] light:text-[#8a6524]" />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.header>
      </div>
    </div>
  );
}
