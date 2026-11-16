"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroVisual } from "./hero-visual";
import { springSnappy, staggerContainer, fadeUp } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(246,202,131,0.18),transparent_60%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        <motion.div
          variants={reduce ? undefined : staggerContainer(0.08, 0.02)}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          className="relative z-10"
        >
          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Ask your docs.
            <br />
            <span className="bg-gradient-to-r from-[#f6ca83] via-[#d0d38f] to-[#9cafb7] bg-clip-text text-transparent light:from-[#8a6524] light:via-[#6f7a3e] light:to-[#4f6770]">
              Get answers with receipts.
            </span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Convox ingests PDFs, sites, and raw notes, chunks them into searchable
            context, and responds with source-cited answers your users can trust.
            Built for teams who need signal, not hallucinations.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="/signup"
              whileHover={reduce ? undefined : { y: -2, scale: 1.01 }}
              whileTap={reduce ? undefined : { scale: 0.985 }}
              transition={springSnappy}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3.5 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[0_12px_30px_-12px_rgba(148,157,106,0.45)] ring-1 ring-[#d0d38f]/30 hover:bg-[image:var(--gradient-primary-hover)]"
            >
              Start building free
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.a>
            <motion.a
              href="/login"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.985 }}
              transition={springSnappy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/50 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm hover:border-[#d0d38f]/40 hover:bg-card/80"
            >
              View console
            </motion.a>
          </motion.div>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/60 pt-6 text-xs text-muted-foreground"
          >
            {[
              "PDF · DOCX · Markdown · Web",
              "Citations on every answer",
              "Drop-in SDK & REST API",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f6ca83]" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>


        </motion.div>

        <div className="relative lg:pl-4">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
