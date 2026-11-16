"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Database, FileUp, MessageSquareQuote, Rocket } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { itemFadeUp, springSnappy, staggerContainer } from "@/lib/motion";

const steps = [
  {
    number: "01",
    title: "Ingest",
    icon: <FileUp className="h-4 w-4" />,
    description:
      "Upload files, crawl URLs, or paste text. Content is normalized and chunked into retrieval-ready segments.",
  },
  {
    number: "02",
    title: "Index",
    icon: <Database className="h-4 w-4" />,
    description:
      "Embeddings are stored in isolated namespaces so each project stays fast, scoped, and searchable.",
  },
  {
    number: "03",
    title: "Answer",
    icon: <MessageSquareQuote className="h-4 w-4" />,
    description:
      "Queries pull the most relevant context and generate responses grounded in cited source material.",
  },
  {
    number: "04",
    title: "Ship",
    icon: <Rocket className="h-4 w-4" />,
    description:
      "Embed the widget or call the API to deliver trusted doc intelligence wherever your users are.",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="workflow" className="relative scroll-mt-24 border-t border-border/60 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#f6ca83]/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <p className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#f6ca83] light:text-[#8a6524]">
              Workflow
            </p>
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              From raw docs to cited answers in four clean steps.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative max-w-md overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-sm sm:p-5">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(246,202,131,0.08),transparent_40%,rgba(156,175,183,0.1))]" />
              <p className="relative text-pretty text-base leading-relaxed text-muted-foreground">
                No vector-db babysitting. No brittle glue code. Just a clear pipeline
                you can inspect, trust, and deploy.
              </p>
            </div>
          </Reveal>
        </div>

        <motion.div
          variants={reduce ? undefined : staggerContainer(0.08, 0.04)}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-12 grid auto-rows-fr grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-[#949d6a]/40 to-transparent lg:block" />
          {steps.map((step, idx) => (
            <motion.article
              key={step.title}
              variants={reduce ? undefined : itemFadeUp}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={springSnappy}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d0d38f]/30 bg-[#171c19]/70 font-mono text-sm font-semibold text-[#f6ca83] light:text-[#8a6524]">
                    {step.number}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#3b463f] bg-[#242d27]/60 text-[#f7f4ea]">
                    {step.icon}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden h-4 w-4 text-[#949d6a]/70 lg:block" aria-hidden />
                )}
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{step.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#171c19]/70">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#949d6a] via-[#adb993] to-[#f6ca83]"
                  initial={reduce ? false : { width: "0%" }}
                  whileInView={reduce ? undefined : { width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ ...springSnappy, delay: 0.1 + idx * 0.06 }}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.1} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/45 p-5 backdrop-blur-sm sm:p-6">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(246,202,131,0.08),transparent_40%,rgba(156,175,183,0.1))]" />
            <svg
              className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20 light:opacity-10"
              viewBox="0 0 400 160"
              fill="none"
              aria-hidden
            >
              <path d="M0 120 C 80 40, 160 140, 240 70 S 360 90, 400 30" stroke="#f6ca83" strokeWidth="2" />
              <path d="M0 140 C 90 80, 170 150, 250 95 S 360 120, 400 60" stroke="#9cafb7" strokeWidth="1.5" />
            </svg>
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Ready to wire this into your product?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start with a project, ingest a source, and test cited responses in minutes.
                </p>
              </div>
              <motion.a
                href="/signup"
                whileHover={reduce ? undefined : { y: -2, scale: 1.01 }}
                whileTap={reduce ? undefined : { scale: 0.985 }}
                transition={springSnappy}
                className="inline-flex items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] px-5 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[0_10px_24px_-12px_rgba(148,157,106,0.45)] ring-1 ring-[#d0d38f]/30 hover:bg-[image:var(--gradient-primary-hover)]"
              >
                Create a workspace
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
