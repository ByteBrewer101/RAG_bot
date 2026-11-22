"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { FrozenRouter } from "./frozen-router";

type PageBlurTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageBlurTransition({
  children,
  className,
}: PageBlurTransitionProps) {
  const pathname = usePathname();
  const [rendered, setRendered] = React.useState({
    key: pathname,
    children,
  });

  React.useEffect(() => {
    if (rendered.key !== pathname) {
      queueMicrotask(() => {
        setRendered({ key: pathname, children });
      });
    }
  }, [pathname, children, rendered.key]);

  const currentChildren = rendered.key === pathname ? children : rendered.children;

  return (
    <div className={className} style={{ minHeight: "24rem" }}>
      <AnimatePresence mode="wait" initial>
        <motion.div key={rendered.key} className="min-h-full">
          <FrozenRouter>{currentChildren}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
