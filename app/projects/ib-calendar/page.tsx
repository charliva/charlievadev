import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ArchitectureDiagram } from "@/app/_components/architecture-diagram";
import { CaseStudyToc } from "@/app/_components/case-study-toc";
import { PageGrid } from "@/app/_components/page-grid";
import { Reveal } from "@/app/_components/reveal";
import { SpecTable } from "@/app/_components/spec-row";
import { caseStudy } from "@/app/_content/case-study";

export const metadata: Metadata = {
  title: "IB Calendar",
  description:
    "A case study on IB Calendar: a calendar and study hub built around the IB Diploma Programme, used by a small group of students at my school.",
  alternates: { canonical: "/projects/ib-calendar" },
};

/** The article is one grid item, so its rules span the column, not the page. */
function SectionRule() {
  return <hr className="my-7 border-0 border-t border-rule sm:my-10" />;
}

function SectionHead({
  index,
  title,
  id,
}: {
  index: string;
  title: string;
  id: string;
}) {
  return (
    <div className="flex items-baseline gap-3" id={`${id}-head`}>
      <span className="type-mono-index">{index}</span>
      <h2 className="type-h2">{title}</h2>
    </div>
  );
}

function Flow({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center">
          {index > 0 ? (
            <span aria-hidden="true" className="mx-2 h-px w-4 bg-rule sm:w-5" />
          ) : null}
          <span className="type-mono-data rounded-chip bg-raised px-2 py-1 text-text-2">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function CaseStudyPage() {
  return (
    <PageGrid>
      <div className="hidden lg:block">
        <CaseStudyToc
          sections={caseStudy.sections.map((section) => ({
            id: section.id,
            index: section.index,
            title: section.short,
          }))}
        />
      </div>

      <article className="min-w-0 pb-8 pt-10 sm:pt-14 lg:col-start-2">
        <Link
          href="/"
          className="group -my-4 inline-flex items-center gap-2 rounded-chip py-4 text-text-3 transition-colors duration-[120ms] hover:text-text-2"
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-[120ms] ease-standard group-hover:-translate-x-[3px]"
          />
          <span className="type-mono-label">Index</span>
        </Link>

        <h1 className="type-h1 mt-6">{caseStudy.title}</h1>
        <p className="type-mono-data mt-3">{caseStudy.subline}</p>
        <p className="type-lead measure-lead mt-5">{caseStudy.standfirst}</p>

        <SpecTable items={caseStudy.spec} className="mt-8" rowClassName="sm:min-h-11" />

        <nav aria-label="On this page" className="mt-8 lg:hidden">
          <p className="type-mono-label">Contents</p>
          <ol className="mt-2 border-t border-rule">
            {caseStudy.sections.map((section) => (
              <li key={section.id} className="border-b border-rule">
                <a
                  href={`#${section.id}`}
                  className="flex items-baseline gap-3 py-[13px] text-[14px] text-text"
                >
                  <span className="type-mono-index">{section.index}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Reveal as="section" id="problem" className="mt-20 scroll-mt-20">
          <SectionHead index="01" title="Problem" id="problem" />
          <div className="mt-5 space-y-4">
            {caseStudy.problem.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="type-body measure">
                {paragraph}
              </p>
            ))}
          </div>
          <figure className="mt-8">
            <p className="type-pull-quote measure">{caseStudy.pullQuote.text}</p>
            <figcaption className="type-mono-label mt-3">
              {caseStudy.pullQuote.attribution}
            </figcaption>
          </figure>
        </Reveal>

        <SectionRule />

        <Reveal as="section" id="idea" className="scroll-mt-20">
          <SectionHead index="02" title="Idea" id="idea" />
          <p className="type-body measure mt-5">{caseStudy.idea[0]}</p>
          <SpecTable items={caseStudy.ideaKeys} className="mt-6" />
          <div className="mt-6 space-y-4">
            {caseStudy.idea.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="type-body measure">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <SectionRule />

        <Reveal as="section" id="system" className="scroll-mt-20">
          <SectionHead index="03" title="System" id="system" />
          <p className="type-body measure mt-5">{caseStudy.systemIntro}</p>

          <div className="mt-8 space-y-8">
            {caseStudy.systems.map((system) => (
              <div key={system.title}>
                <h3 className="type-h3">{system.title}</h3>
                <p className="type-body measure mt-2">{system.body}</p>
              </div>
            ))}
          </div>

          <h3 className="type-h3 mt-10">Data model</h3>
          <p className="type-body measure mt-2">{caseStudy.dataModelIntro}</p>
          <SpecTable
            items={caseStudy.dataModel}
            className="mt-5"
            rowClassName="sm:min-h-11"
          />

          <h3 className="type-h3 mt-10">Architecture</h3>
          <div className="mt-5">
            <ArchitectureDiagram />
          </div>

          <h3 className="type-h3 mt-10">Flows</h3>
          <div className="mt-5 space-y-6">
            {caseStudy.flows.map((flow) => (
              <div key={flow.steps.join()}>
                <Flow steps={flow.steps} />
                <p className="type-small measure mt-3">{flow.body}</p>
              </div>
            ))}
          </div>

          <h3 className="type-h3 mt-10">Scheduling</h3>
          <p className="type-body measure mt-2">{caseStudy.scheduling}</p>

          <h3 className="type-h3 mt-10">Infrastructure</h3>
          <p className="type-body measure mt-2">{caseStudy.infrastructure}</p>
        </Reveal>

        <SectionRule />

        <Reveal as="section" id="current-state" className="scroll-mt-20">
          <SectionHead index="04" title="Current state" id="current-state" />
          <div className="mt-5 space-y-4">
            {caseStudy.currentState.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="type-body measure">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <SectionRule />

        <Reveal as="section" id="next" className="scroll-mt-20">
          <SectionHead index="05" title="What I'm building next" id="next" />
          <div className="mt-5 border-t border-rule">
            {caseStudy.next.map((item) => (
              <div
                key={item.body.slice(0, 24)}
                className="grid grid-cols-1 gap-y-1 border-b border-rule py-4 sm:grid-cols-[112px_1fr] sm:gap-x-6"
              >
                <p className="type-mono-label sm:pt-[3px]">{item.tag}</p>
                <p className="type-small measure">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <SectionRule />

        <Reveal as="section" id="stack" className="scroll-mt-20">
          <SectionHead index="06" title="Stack" id="stack" />
          <SpecTable items={caseStudy.stack} className="mt-5" />
        </Reveal>

        <Link
          href="/"
          className="group -mx-3 mt-12 flex items-center gap-2 rounded-row px-3 py-[14px] transition-colors duration-[120ms] ease-standard hover:bg-[var(--tint-hover)] active:bg-[var(--tint-active)]"
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.5}
            className="text-text-3 transition-transform duration-[120ms] ease-standard group-hover:-translate-x-[3px]"
          />
          <span className="type-row-title">Back to index</span>
        </Link>
      </article>
    </PageGrid>
  );
}
