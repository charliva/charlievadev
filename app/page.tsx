import type { Metadata } from "next";

import { ContactSection } from "./_components/contact-section";
import { Hero } from "./_components/hero";
import { RowList } from "./_components/list-row";
import { PageGrid, RailSection } from "./_components/page-grid";
import { WORK } from "./_content/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageGrid>
      <Hero />

      <RailSection id="work" index="01" label="Work" heading="Work">
        <RowList rows={WORK} />
      </RailSection>

      <RailSection
        id="contact"
        index="02"
        label="Contact"
        heading="Contact"
        separator={false}
      >
        <ContactSection />
      </RailSection>
    </PageGrid>
  );
}
