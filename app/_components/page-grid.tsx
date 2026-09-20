import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * One page-level grid owns the whole document: a 112px monospace rail, a 32px
 * gutter, and a 672px content column. The spine is a single element drawn once
 * so it never breaks across section gaps; separators are page-level siblings
 * that span the full 816px and visually T into it.
 */
export function PageGrid({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 sm:px-6">
      <div className="relative mx-auto grid max-w-column grid-cols-1 lg:max-w-page lg:grid-cols-[112px_672px] lg:gap-x-gutter">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-rail top-0 hidden w-px bg-rule-strong lg:block"
        />
        {children}
      </div>
    </div>
  );
}

/** Content that spans rail + column (figures, wide tables). */
export function FullWidth({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("col-span-full min-w-0", className)}>{children}</div>
  );
}

export function Separator() {
  return (
    <hr className="col-span-full my-7 border-0 border-t border-rule sm:my-10" />
  );
}

type RailSectionProps = {
  /** Pinned index shown in the rail, e.g. "01". */
  index: string;
  /** Rail label, e.g. "Work". Decoration — the real heading is visually hidden. */
  label: string;
  /** Accessible section heading. Exactly one <h2> per section. */
  heading: string;
  id: string;
  children: ReactNode;
  /** Set false on the last section before the footer. */
  separator?: boolean;
};

export function RailSection({
  index,
  label,
  heading,
  id,
  children,
  separator = true,
}: RailSectionProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className="hidden self-start lg:sticky lg:top-[76px] lg:block"
      >
        {/* Two lines on purpose: "01 / EXPERIMENTS" does not fit 112px. */}
        <div className="pr-4">
          <div className="flex items-center gap-2">
            <span className="h-px w-3 bg-rule-strong" />
            <span className="type-mono-index">{index}</span>
          </div>
          <p className="type-mono-index mt-[6px]">{label}</p>
        </div>
      </div>
      <Reveal as="section" id={id} className="min-w-0 scroll-mt-20 lg:col-start-2">
        <div aria-hidden="true" className="mb-4 flex items-center gap-2 lg:hidden">
          <span className="h-px w-3 bg-rule-strong" />
          <span className="type-mono-index">{index}</span>
          <span className="type-mono-index">{label}</span>
        </div>
        <h2 className="sr-only">{heading}</h2>
        {children}
      </Reveal>
      {separator ? <Separator /> : null}
    </>
  );
}
