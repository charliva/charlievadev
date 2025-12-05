import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Study: Minimalist Design — Origins, Principles, Benefits",
  description:
    "A deep dive into minimalist design: Bauhaus and De Stijl origins, Dieter Rams’ principles, practical benefits, and how minimalism shapes modern product and UI design.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://unedited.site/blog/case-study-minimalist-design" },
  openGraph: {
    title: "Case Study: Minimalist Design — Origins, Principles, Benefits",
    description:
      "Exploring minimalist design from its roots to its modern impact, including Dieter Rams’ ten principles and practical UX benefits.",
    type: "article",
    url: "https://unedited.site/blog/case-study-minimalist-design",
    siteName: "UNEDITED",
    locale: "en_US",
    // image: "https://unedited.site/og/minimalist-design.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Study: Minimalist Design — Origins, Principles, Benefits",
    description:
      "From Bauhaus and De Stijl to Dieter Rams’ ten principles—how minimalism streamlines UX and creates timeless products.",
  },
  authors: [{ name: "Charlie VA", url: "https://unedited.site/about" }],
  keywords: [
    "Minimalist design",
    "Bauhaus",
    "De Stijl",
    "Dieter Rams",
    "UX",
    "UI",
    "Product design",
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://unedited.site/blog/case-study-minimalist-design" },
  headline: "Case Study: Minimalist Design",
  alternativeHeadline: "Minimalist Design — Origins, Principles, and Practical Benefits",
  description:
    "Explores minimalist design’s origins in Bauhaus and De Stijl, Dieter Rams’ ten principles, and the user experience benefits of simplicity and focus.",
  author: { "@type": "Person", name: "Charlie VA", url: "https://unedited.site/about" },
  publisher: { "@type": "Organization", name: "UNEDITED", url: "https://unedited.site" },
  datePublished: "2024-12-25T00:00:00+00:00",
  dateModified: "2024-12-25T00:00:00+00:00",
  articleSection: "Design",
  keywords: [
    "Minimalist design",
    "Bauhaus",
    "De Stijl",
    "Dieter Rams",
    "UI",
    "UX",
    "Product design",
  ],
  image: ["https://unedited.site/og/minimalist-design.jpg"],
};

export default function CaseStudy() {
  return (
    <main className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="prose mx-auto max-w-3xl">
        <header className="mb-4">
          <h1>Case Study: Minimalist Design</h1>
          <div className="text-sm text-muted-foreground mt-2 flex items-center gap-3">
            <time dateTime="2024-12-25">Published Dec 25, 2024</time>
            <span>·</span>
            <span>Design</span>
            <span>·</span>
            <span>6–8 min read</span>
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            <span className="text-xs px-2 py-1 rounded-full bg-muted/60">Design</span>
            <span className="text-xs px-2 py-1 rounded-full bg-muted/60">Minimalism</span>
            <span className="text-xs px-2 py-1 rounded-full bg-muted/60">UX</span>
            <span className="text-xs px-2 py-1 rounded-full bg-muted/60">Dieter Rams</span>
          </div>
        </header>

        <section>
          <p>
            Exploring the origins, benefits, and principles of minimalist design—this
            case study covers Bauhaus and De Stijl roots, Dieter Rams’ ten principles,
            and practical ways minimalism improves product and interface clarity.
          </p>

          <h2>What’s minimalist design?</h2>
          <p>
            Minimalist design reduces distractions, prioritizes content, and focuses
            on clarity and usability. It often leads to faster user comprehension and
            stronger visual hierarchy.
          </p>

          {/* More sections can be added here; this file focuses on metadata and structured data */}
        </section>
      </article>
    </main>
  );
}
