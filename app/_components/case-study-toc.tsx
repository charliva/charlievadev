"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type TocSection = {
  id: string;
  index: string;
  title: string;
};

type CaseStudyTocProps = {
  sections: readonly TocSection[];
  /** Escape hatch for placement — the rail's own `sticky top` can be overridden. */
  className?: string;
};

/**
 * The rail the case study reads against: where you are in a long document,
 * stated once and never animated on scroll. Desktop only — below lg the page
 * is a single column and a second copy of the headings is noise.
 */
export function CaseStudyToc({ sections, className }: CaseStudyTocProps) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Keyed on the joined ids rather than the array: a caller passing an inline
  // literal would otherwise tear down and rebuild the observer every render.
  const ids = sections.map((section) => section.id).join("|");

  useEffect(() => {
    const elements = ids
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    // The observer only reports sections whose visibility *changed*, so the set
    // has to persist across callbacks: reading one batch in isolation promotes
    // a section that entered below one already sitting in the band.
    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }

        // Document order, not callback order. When the band falls in the gap
        // between two sections it is empty — the last answer stays, rather than
        // the rail blanking out mid-scroll.
        const current = elements.find((element) => inBand.has(element.id));
        if (current) setActiveId(current.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav
      aria-label="On this page"
      className={cn("sticky top-[76px] hidden lg:block", className)}
    >
      <ul className="space-y-[2px]">
        {sections.map((section) => {
          const isActive = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex items-center gap-[10px] rounded-chip py-[15px] pr-2 transition-colors duration-[120ms] ease-standard",
                  isActive ? "text-text" : "text-text-3 hover:text-text-2",
                )}
              >
                {/* Fixed-width slot: the tick grows inside it, the label never moves. */}
                <span
                  aria-hidden="true"
                  className="flex w-[14px] shrink-0 items-center"
                >
                  <span
                    className={cn("h-px", isActive ? "bg-signal" : "bg-rule-strong")}
                    style={{
                      width: isActive ? "14px" : "6px",
                      transitionProperty: "width, background-color",
                      transitionDuration: reduceMotion ? "0ms" : "var(--d-2)",
                      transitionTimingFunction: "var(--ease-standard)",
                    }}
                  />
                </span>
                <span className="type-mono-label shrink-0 text-current">
                  {section.index}
                </span>
                {/* The rail is 112px: a title longer than the column wraps rather
                    than spilling into the gutter. */}
                <span className="type-mono-label min-w-0 break-words text-current">
                  {section.title}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
