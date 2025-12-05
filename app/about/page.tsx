import { Metadata } from "next";
import AboutMe from "../_components/aboutComponent";
import React from "react";

export const metadata: Metadata = {
  title: "About Charlie VA — Freelance Web & App Developer in Denmark",
  description:
    "Charlie VA is a 15-year-old freelance developer building full‑stack web and native iOS apps. Specializing in Next.js, Tailwind CSS, TypeScript, Swift, and Golang.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://unedited.site/about" },
  openGraph: {
    title: "About Charlie VA — Freelance Web & App Developer in Denmark",
    description:
      "Freelance developer crafting responsive Next.js/Tailwind apps and native iOS software, with a design-forward approach and functional aesthetics.",
    type: "profile",
    url: "https://unedited.site/about",
    siteName: "UNEDITED",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Charlie VA — Freelance Web & App Developer",
    description:
      "Full‑stack and native app developer with Next.js, Tailwind CSS, Swift, and Golang expertise.",
  },
  authors: [{ name: "Charlie VA" }],
  keywords: [
    "Freelance developer",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Swift",
    "Golang",
    "Denmark",
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Charlie VA",
  alternateName: "Charlie",
  jobTitle: "Freelance Web & Application Developer",
  description:
    "Freelance developer focused on responsive web and native iOS applications with a minimalist, functional design approach.",
  homeLocation: { "@type": "Place", name: "Denmark" },
  knowsAbout: [
    "Web Development",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Swift",
    "Golang",
    "UI/UX Design",
    "Sanity CMS",
  ],
  url: "https://unedited.site/about",
  sameAs: [
    "https://unedited.site",
    "https://github.com/charliva",
    "mailto:tjallingvanabbema@gmail.com",
    "https://www.linkedin.com",
  ],
  affiliation: { "@type": "Organization", name: "UNEDITED", url: "https://unedited.site" },
};

export default function aboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div>
        <AboutMe />
      </div>
    </>
  );
}
