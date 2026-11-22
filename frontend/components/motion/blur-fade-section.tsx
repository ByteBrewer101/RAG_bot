"use client";

import * as React from "react";
import { BlurFade } from "@/components/ui/blur-fade";

export const BLUR_FADE_SECTION = {
  blur: "14px",
  enterY: -49,
  exitY: 70,
  duration: 0.28,
  stagger: 0.08,
  tilt: 0.6,
} as const;

type BlurFadeSectionProps = {
  children: React.ReactNode;
  index: number;
  className?: string;
  blur?: string;
  dropDistance?: number;
  duration?: number;
  stagger?: number;
  tiltAmount?: number;
};

export function BlurFadeSection({
  children,
  index,
  className,
  blur = BLUR_FADE_SECTION.blur,
  dropDistance = BLUR_FADE_SECTION.exitY,
  duration = BLUR_FADE_SECTION.duration,
  stagger = BLUR_FADE_SECTION.stagger,
  tiltAmount = BLUR_FADE_SECTION.tilt,
}: BlurFadeSectionProps) {
  return (
    <BlurFade
      className={className}
      delay={index * stagger}
      duration={duration}
      blur={blur}
      dropDistance={dropDistance}
      index={index}
      tiltAmount={tiltAmount}
    >
      {children}
    </BlurFade>
  );
}
