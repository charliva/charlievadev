export type ProjectRow = {
  title: string;
  /** Right-hand status tag. Only statuses the work actually supports. */
  tag: string;
  /** Renders the signal status dot before the tag. Used once, deliberately. */
  live?: boolean;
  description: string;
  stack?: string[];
  href?: string;
  external?: boolean;
  /** Overrides the default trailing affordance label. */
  cta?: string;
};

export const WORK: ProjectRow[] = [
  {
    title: "Syllabi",
    tag: "In use",
    live: true,
    description:
      "A calendar and study hub for IB students. It syncs the school timetable, tracks assignments and assessments, and plans study time around the hours that are actually free.",
    stack: ["next.js", "supabase", "vercel ai sdk"],
    href: "https://cal.charlieva.dev",
    external: true,
    cta: "cal.charlieva.dev",
  },
  {
    title: "Bitless",
    tag: "Earlier project",
    description: "An admin dashboard for managing product and user data.",
    stack: ["next.js", "react", "supabase"],
  },
];
