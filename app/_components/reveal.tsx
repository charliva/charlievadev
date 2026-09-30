"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
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
}: RevealProps) {
  const systemReduceMotion = useReducedMotion();
  // The server cannot know the media query, so the first client render has to
  // match it: read the preference only after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduceMotion = mounted && systemReduceMotion;

  return (
    <motion.section
      id={id}
      data-reveal=""
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: reduceMotion ? 0.1 : 0.26,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
