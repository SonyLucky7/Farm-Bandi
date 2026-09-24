"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "motion/react";

type AnimationVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleUp" | "blur";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const VARIANTS: Record<AnimationVariant, { hidden: Record<string, number>; visible: Record<string, number> }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 20 },
    visible: { opacity: 1, filter: 0 },
  },
};

/**
 * Wrap any section or element to add smooth scroll-triggered entrance animations.
 * Uses Framer Motion's IntersectionObserver-based `useInView`.
 */
export default function AnimateOnScroll({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.15,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const v = VARIANTS[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={variant === "blur" ? { opacity: 0, filter: "blur(20px)" } : v.hidden}
      animate={
        isInView
          ? variant === "blur"
            ? { opacity: 1, filter: "blur(0px)" }
            : v.visible
          : variant === "blur"
            ? { opacity: 0, filter: "blur(20px)" }
            : v.hidden
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger children animations - wrap multiple AnimateOnScroll items.
 */
export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual stagger child - use inside StaggerChildren.
 */
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
