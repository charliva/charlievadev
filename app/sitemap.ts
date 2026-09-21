import type { MetadataRoute } from "next";

import { siteUrl } from "@/app/_content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/projects/syllabi"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-09-20"),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
