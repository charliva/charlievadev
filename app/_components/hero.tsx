import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { hero, site } from "@/app/_content/site";

/**
 * First paint only, CSS keyframes rather than motion: the largest text on the
 * site must never wait for hydration to reach its final colour.
 */
function step(index: number) {
  return { animationDelay: `${index * 40}ms` } as const;
}

export function Hero() {
  return (
    <>
      <div aria-hidden="true" className="hidden self-start pt-12 sm:pt-[72px] lg:block">
        <span className="block h-px w-3 bg-rule-strong" />
      </div>
      <section className="min-w-0 pb-2 pt-10 sm:pt-16 lg:col-start-2">
        <p className="type-mono-label hero-step" style={step(0)}>
          {hero.eyebrow}
        </p>
        <h1 className="type-h1 hero-step mt-4 max-w-[19ch]" style={step(1)}>
          {hero.headline}
        </h1>
        <p className="type-lead hero-step measure-lead mt-5" style={step(2)}>
          {hero.lead}
        </p>
        <div
          className="hero-step mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          style={step(3)}
        >
          <Link
            href="/projects/syllabi"
            className="group -my-3 flex items-center gap-2 rounded-chip py-3 text-[13px] text-text transition-opacity duration-[120ms] active:opacity-80"
          >
            Read the Syllabi case study
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="text-text-3 transition-all duration-[120ms] ease-standard group-hover:translate-x-[3px] group-hover:text-text-2"
            />
          </Link>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group -my-3 flex items-center gap-2 rounded-chip py-3 text-[13px] text-text transition-opacity duration-[120ms] active:opacity-80"
          >
            GitHub
            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="text-text-3 transition-all duration-[120ms] ease-standard group-hover:translate-x-[3px] group-hover:text-text-2"
            />
          </a>
        </div>
      </section>
      <hr className="col-span-full my-7 border-0 border-t border-rule sm:my-10" />
    </>
  );
}
