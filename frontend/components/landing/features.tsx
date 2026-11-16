"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Globe, Link as LinkIcon, ShieldCheck } from "lucide-react";
import { itemFadeUp, springSnappy, springSoft, staggerContainer } from "@/lib/motion";
import { Reveal } from "@/components/motion/reveal";

const features = [
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Multi-source ingest",
    description:
      "Drop in PDFs, Markdown, DOCX, or raw text. We chunk, clean, and prep content for precise retrieval.",
    stat: "512-token chunks",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Site-aware crawling",
    description:
      "Point at a docs URL and keep your knowledge fresh with structured crawls and automatic re-indexing.",
    stat: "Sync-friendly",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Citations by default",
    description:
      "Every response can trace back to the exact source span, so users see evidence instead of guesses.",
    stat: "Source-linked",
  },
  {
    icon: <LinkIcon className="h-5 w-5" />,
    title: "API & drop-in SDK",
    description:
      "Ship a chat surface fast with a React widget or wire Convox into your stack through a clean REST API.",
    stat: "Minutes to embed",
  },
];

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="capabilities" className="relative scroll-mt-24 border-t border-border/60 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#f6ca83]/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <p className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#f6ca83] light:text-[#8a6524]">
              Capabilities
            </p>
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A retrieval stack that feels engineered, not assembled.
            </h2>
            <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
              From ingestion to cited answers, each layer is designed for clarity,
              speed, and control — so your docs become a dependable interface.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(246,202,131,0.1),transparent_35%,rgba(156,175,183,0.12))]" />
              <div className="relative flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-card/60 light:border-neutral-500/40 light:bg-neutral-500">
                  <Image
                    src="/window.svg"
                    alt="Document workspace placeholder"
                    fill
                    className="object-contain p-5 opacity-95 brightness-0 invert light:brightness-[0.72] light:opacity-100"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Pipeline snapshot</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ingest → embed → retrieve → answer, with provenance attached at every step.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Namespaces", "Hybrid-ready", "Low-latency"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#949d6a]/35 bg-[#242d27]/50 px-2.5 py-1 text-[11px] text-[#f7f4ea]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer(0.07, 0.05)}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={reduce ? undefined : itemFadeUp}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={springSnappy}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_20%_0%,rgba(246,202,131,0.12),transparent_45%)]" />
              <div className="relative">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <motion.div
                    whileHover={reduce ? undefined : { rotate: -3, scale: 1.05 }}
                    transition={springSoft}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#949d6a]/35 bg-gradient-to-b from-[#242d27] to-[#171c19] text-[#f6ca83] light:text-[#8a6524]"
                  >
                    {feature.icon}
                  </motion.div>
                  <span className="rounded-full border border-border/70 bg-background/40 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3 text-xs text-[#f6ca83] light:text-[#8a6524]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#949d6a]" />
                  {feature.stat}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
