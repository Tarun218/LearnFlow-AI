import type { Transition, Variants } from "framer-motion";

/** Premium easing — smooth deceleration */
export const easePremium = [0.22, 1, 0.36, 1] as const;

/** Spring presets */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 28,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 22,
};

/** Fade up on enter */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easePremium },
  },
};

/** Stagger container */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easePremium },
  },
};

/** Page transition */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export const pageTransitionConfig: Transition = {
  duration: 0.3,
  ease: easePremium,
};

/** Scale on hover (for cards) */
export const hoverLift = {
  y: -4,
  transition: { duration: 0.2, ease: easePremium },
};

/** Tab indicator spring */
export const tabIndicatorSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
};
