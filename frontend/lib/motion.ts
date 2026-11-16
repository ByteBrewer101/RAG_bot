export const springSnappy = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.7,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

export const springBouncy = {
  type: "spring" as const,
  stiffness: 380,
  damping: 22,
  mass: 0.6,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springSoft,
  },
};

export const itemFadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springSoft,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const viewportOnce = { once: true, margin: "-80px" as const };
