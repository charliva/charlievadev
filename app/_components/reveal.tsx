"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "section" | "li" | "article";
  /** Stagger index — each step delays the reveal by 60ms. */
  delayStep?: number;
};

/**
 * Fades a whole section in as it enters the viewport. 8px of travel, once,
 * never per row: it reports arrival, it is not an entrance.
 *
 * `data-reveal` is the hook for the <noscript> guard in the layout, so nothing
 * is ever stranded at opacity 0 when JS does not run.
 */
export function Reveal({
  children,
  className,
  id,
  as = "div",
  delayStep = 0,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      id={id}
      data-reveal=""
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: reduceMotion ? 0.1 : 0.26,
        delay: reduceMotion ? 0 : delayStep * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
