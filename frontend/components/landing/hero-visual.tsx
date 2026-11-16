"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springSoft, springBouncy, springSnappy } from "@/lib/motion";

export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(246,202,131,0.22),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(156,175,183,0.18),transparent_50%)] blur-2xl" />

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-[#949d6a]/30 bg-[#1f2622]/70 p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-md"
        initial={reduce ? false : { opacity: 0, y: 30, rotateX: 8, scale: 0.98 }}
        animate={reduce ? {} : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={springSoft}
        style={{ transformPerspective: 1200 }}
      >
        {/* window chrome */}
        <div className="mb-3 flex items-center justify-between rounded-xl border border-[#3b463f] bg-[#171c19]/80 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f6ca83]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d0d38f]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#949d6a]" />
          </div>
          <div className="rounded-md border border-[#3b463f] bg-[#242d27]/80 px-2 py-0.5 font-mono text-[10px] text-[#e7eadf]/80">
            convox://docs/query
          </div>
          <div className="h-2 w-10 rounded bg-[#3b463f]" />
        </div>

        <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
          {/* left: doc/query panel */}
          <div className="space-y-3 rounded-xl border border-[#3b463f] bg-[#171c19]/70 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#f6ca83] light:text-[#8a6524]">
                Query
              </span>
              <span className="rounded-full border border-[#949d6a]/40 bg-[#242d27]/80 px-2 py-0.5 text-[10px] text-[#f7f4ea]/85">
                semantic
              </span>
            </div>
            <div className="rounded-lg border border-[#3b463f] bg-[#1f2622]/90 p-2.5">
              <p className="font-mono text-[11px] leading-relaxed text-[#f7f4ea]">
                &ldquo;How do I rotate API keys without downtime?&rdquo;
              </p>
            </div>
            <div className="space-y-2">
              {[
                { w: "92%", label: "auth.md · p.4", score: "0.91" },
                { w: "78%", label: "deploy.md · p.2", score: "0.84" },
                { w: "64%", label: "sdk.mdx · p.7", score: "0.79" },
              ].map((row, i) => (
                <motion.div
                  key={row.label}
                  className="rounded-lg border border-[#3b463f] bg-[#242d27]/50 p-2"
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={reduce ? {} : { opacity: 1, x: 0 }}
                  transition={{ ...springSoft, delay: 0.25 + i * 0.08 }}
                >
                  <div className="mb-1 flex items-center justify-between text-[10px] text-[#d9dece]/80">
                    <span className="truncate font-mono">{row.label}</span>
                    <span className="text-[#f6ca83] light:text-[#8a6524]">{row.score}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#171c19]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#949d6a] to-[#f6ca83]"
                      initial={reduce ? false : { width: 0 }}
                      animate={{ width: row.w }}
                      transition={{ ...springBouncy, delay: 0.35 + i * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* right: answer/citation panel */}
          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-xl border border-[#949d6a]/25 bg-gradient-to-b from-[#242d27]/80 to-[#171c19]/90 p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#d0d38f]/20 text-[#f6ca83] light:text-[#8a6524]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[11px] font-medium text-[#f7f4ea]">Answer</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-full rounded bg-[#f7f4ea]/15" />
                <div className="h-2 w-[92%] rounded bg-[#f7f4ea]/12" />
                <div className="h-2 w-[84%] rounded bg-[#f7f4ea]/10" />
                <div className="mt-2 h-2 w-[70%] rounded bg-[#f6ca83]/25" />
              </div>
              <motion.div
                className="mt-3 rounded-lg border border-[#d0d38f]/30 bg-[#171c19]/70 p-2"
                animate={reduce ? {} : { y: [0, -3, 0] }}
                transition={reduce ? {} : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="font-mono text-[10px] text-[#e3e7d8]/90">
                  cite: <span className="text-[#f6ca83] light:text-[#8a6524]">auth.md#key-rotation</span>
                </p>
              </motion.div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-[#3b463f] bg-[#171c19]/80 p-3">
              <svg className="absolute -right-4 -top-4 h-24 w-24 text-[#adb993]/20" viewBox="0 0 100 100" fill="none" aria-hidden>
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
              <div className="relative flex items-end justify-between gap-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#c3cbbb]/80">Latency</p>
                  <p className="text-lg font-semibold text-[#f7f4ea]">~1.2s</p>
                </div>
                <div className="flex h-10 items-end gap-1">
                  {[40, 65, 45, 80, 55, 90].map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 rounded-full bg-gradient-to-t from-[#949d6a] to-[#f6ca83]"
                      initial={reduce ? false : { height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ ...springSnappy, delay: 0.5 + i * 0.04 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* cropped floating chip */}
      <motion.div
        className="pointer-events-none absolute -left-4 top-10 hidden rounded-xl border border-[#d0d38f]/30 bg-[#171c19]/85 p-2 shadow-lg backdrop-blur-md sm:block"
        animate={reduce ? {} : { y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={reduce ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-lg border border-[#3b463f] bg-[#242d27]">
            <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden>
              <rect width="32" height="32" fill="#242d27" />
              <circle cx="10" cy="12" r="6" fill="#f6ca83" opacity="0.75" />
              <rect x="14" y="16" width="14" height="10" rx="2" fill="#9cafb7" opacity="0.85" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-medium text-[#f7f4ea]">Chunks indexed</p>
            <p className="font-mono text-[10px] text-[#f6ca83] light:text-[#8a6524]">12,480</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
