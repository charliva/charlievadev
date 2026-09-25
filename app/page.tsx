import type { Metadata } from "next";

import { CaseStudyModule } from "./_components/case-study-module";
import { ContactSection } from "./_components/contact-section";
import { Hero } from "./_components/hero";
import { RowList } from "./_components/list-row";
import { PageGrid, RailSection } from "./_components/page-grid";
import { SpecTable } from "./_components/spec-row";
import { about, now, stack } from "./_content/site";
import { EXPERIMENTS, WORK } from "./_content/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageGrid>
      <Hero />

      <RailSection id="work" index="01" label="Work" heading="Selected work">
        <CaseStudyModule />
        <div className="mt-4">
          <RowList rows={WORK} />
        </div>
      </RailSection>

      <RailSection id="about" index="02" label="About" heading="About">
        <div className="space-y-4">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="type-body measure">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <p className="type-mono-label">{about.aiNote.label}</p>
          <p className="type-small measure mt-2">{about.aiNote.body}</p>
        </div>

      </RailSection>

      <RailSection id="stack" index="03" label="Stack" heading="Things I work with">
        <p className="type-body measure">{stack.intro}</p>
        <SpecTable items={stack.rows} className="mt-6" />
      </RailSection>

      <RailSection
        id="experiments"
        index="04"
        label="Experiments"
        heading="Experiments"
      >
        <RowList rows={EXPERIMENTS} />
      </RailSection>

      <RailSection id="now" index="05" label="Now" heading="What I'm learning">
        <p className="type-body measure">{now.intro}</p>
        <div className="mt-6 border-t border-rule">
          {now.rows.map((row, index) => (
            <div
              key={row.title}
              className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-rule py-4"
            >
              <span className="type-mono-index pt-[5px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="type-row-title">{row.title}</h3>
                <p className="type-small measure mt-1">{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </RailSection>

      <RailSection
        id="contact"
        index="06"
        label="Contact"
        heading="Contact"
        separator={false}
      >
        <ContactSection />
      </RailSection>
    </PageGrid>
  );
}
