"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  type MotionProps,
  type UseInViewOptions,
  type Variants,
} from "motion/react";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
  /** Drop distance in px for exit (default 70). Enter starts at -dropDistance*0.7 when set. */
  dropDistance?: number;
  /** Index for stagger/tilt alternation. */
  index?: number;
  /** Alternating exit tilt in degrees. */
  tiltAmount?: number;
  /** Disable exit animation (useful outside page transitions). */
  disableExit?: boolean;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.28,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "14px",
  dropDistance,
  index = 0,
  tiltAmount = 0.6,
  disableExit = false,
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const defaultEnter =
    direction === "right" || direction === "down" ? -offset : offset;
  const enterY = dropDistance != null ? -(dropDistance * 0.7) : defaultEnter;
  const exitY = dropDistance != null ? dropDistance : offset;
  const tilt = index % 2 === 0 ? tiltAmount : -tiltAmount;

  const axisHidden = axis === "x" ? { x: enterY } : { y: enterY };
  const axisVisible = axis === "x" ? { x: 0 } : { y: 0 };

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blur})`,
      rotate: 0,
      ...axisHidden,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      rotate: 0,
      ...axisVisible,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      filter: `blur(${blur})`,
      y: exitY,
      rotate: tilt,
      transition: {
        delay,
        duration,
        ease: "easeIn",
      },
    },
  };

  const combinedVariants = variant ?? defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit={disableExit ? undefined : "exit"}
      variants={combinedVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
