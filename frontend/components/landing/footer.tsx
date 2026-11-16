"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Mail, GitBranch, Link2 } from "lucide-react";
import { springSnappy } from "@/lib/motion";

const navLinks = [
  { name: "Documentation", href: "/docs" },
  { name: "Pricing", href: "/pricing" },
  { name: "Changelog", href: "/changelog" },
  { name: "Status", href: "/status" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: <GitBranch className="h-4 w-4" /> },
  { name: "X", href: "https://x.com", icon: <Link2 className="h-4 w-4" /> },
  { name: "Email", href: "mailto:hello@convox.dev", icon: <Mail className="h-4 w-4" /> },
  { name: "Website", href: "https://convox.dev", icon: <ExternalLink className="h-4 w-4" /> },
];

export function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative border-t border-border/60 bg-[#171c19]/30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f6ca83]/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div>
              <p className="font-[family-name:var(--font-caveat)] text-3xl font-bold leading-none tracking-[0.01em] text-foreground">CoNvoX</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Cited answers
              </p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A developer-first RAG console for turning documentation into fast,
              source-grounded responses.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={reduce ? undefined : { y: -2, scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  transition={springSnappy}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-card/40 text-muted-foreground hover:border-[#d0d38f]/40 hover:text-[#f6ca83] light:hover:text-[#8a6524] light:text-[#8a6524]"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#f6ca83] light:text-[#8a6524]">
              Product
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#f6ca83] light:text-[#8a6524]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#f6ca83] light:text-[#8a6524]">
              Stack
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="rounded-lg border border-border/60 bg-card/30 px-3 py-2">
                Vector search with scoped namespaces
              </p>
              <p className="rounded-lg border border-border/60 bg-card/30 px-3 py-2">
                Evidence-first responses &amp; citations
              </p>
              <p className="rounded-lg border border-border/60 bg-card/30 px-3 py-2">
                API + embeddable UI surfaces
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year ?? 2026} Convox. All rights reserved.</p>
          <p className="font-mono text-[11px] text-muted-foreground/80">
            Built for precise retrieval.
          </p>
        </div>
      </div>
    </footer>
  );
}
