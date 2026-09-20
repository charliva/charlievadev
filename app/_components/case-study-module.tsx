import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { caseStudy } from "@/app/_content/case-study";
import { WeekSchematic } from "./week-schematic";

/**
 * The only bordered module on the site. Breaking the no-box rule exactly once
 * is what makes this the focus — a second one collapses the hierarchy.
 */
export function CaseStudyModule() {
  return (
    <div className="rounded-module border border-rule-strong">
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-t-module border-b border-rule bg-raised px-4 py-2">
        <p className="type-mono-label">Syllabi</p>
        <p className="type-mono-label">In use · small group</p>
      </div>

      <div className="p-5 sm:p-6">
        <p className="type-lead text-text">{caseStudy.pullQuote.text}</p>
        {caseStudy.teaser.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="type-body measure mt-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-px border-t border-rule bg-rule sm:grid-cols-2">
        {caseStudy.arc.map((beat) => (
          <div key={beat.label} className="bg-bg p-4">
            <div className="flex items-baseline gap-2">
              <span className="type-mono-index">{beat.index}</span>
              <span className="type-mono-label">{beat.label}</span>
            </div>
            <p className="type-small mt-2">{beat.body}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-rule p-5 sm:p-6">
        <WeekSchematic />
      </div>

      {/* Two separate links, not one wrapping the other: the case study is the
          argument, the live app is the evidence. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 border-t border-rule px-4">
        <Link
          href="/projects/syllabi"
          className="group -mx-2 flex min-h-11 items-center gap-2 rounded-row px-2 transition-colors duration-[120ms] ease-standard hover:bg-[var(--tint-hover)] active:bg-[var(--tint-active)]"
        >
          <span className="type-row-title">Read the full case study</span>
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="shrink-0 text-text-3 transition-all duration-[120ms] ease-standard group-hover:translate-x-[3px] group-hover:text-text-2"
          />
        </Link>
        <a
          href={caseStudy.live.href}
          target="_blank"
          rel="noreferrer"
          className="group -mx-2 flex min-h-11 items-center gap-2 rounded-row px-2 transition-colors duration-[120ms] ease-standard hover:bg-[var(--tint-hover)] active:bg-[var(--tint-active)]"
        >
          <span className="type-mono-label">{caseStudy.live.label}</span>
          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
            className="shrink-0 text-text-3 transition-all duration-[120ms] ease-standard group-hover:translate-x-[2px] group-hover:text-text-2"
          />
        </a>
      </div>
    </div>
  );
}
