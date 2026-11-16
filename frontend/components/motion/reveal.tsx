"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSoft, viewportOnce } from "@/lib/motion";

type RevealProps = {
  className?: string;
  children?: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  className,
  children,
  delay = 0,
  y = 24,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ ...springSoft, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.09, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

