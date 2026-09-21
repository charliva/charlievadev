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
      "A calendar and study hub built around the IB Diploma Programme. It tries to answer what I should be doing right now, not just what is already scheduled.",
    stack: ["next.js", "typescript", "supabase", "postgres", "vercel ai sdk"],
    href: "/projects/syllabi",
    cta: "Case study",
  },
  {
    title: "Unedited",
    tag: "Previous site",
    description:
      "My previous site, and an argument for taking things out. A minimalist portfolio built on the industrial-design idea that a product should contain only what it needs — which in practice meant deleting things until what was left had a reason to be there. It had a blog attached. This site replaces both.",
    stack: ["next.js", "react", "typescript", "tailwind"],
  },
  {
    title: "Bitless",
    tag: "Earlier project",
    description:
      "An admin dashboard for managing product and user data — the first project I had to write entirely myself. It taught me data modelling, CRUD architecture, writing TypeScript someone else has to read, and keeping a codebase legible past the fun part.",
    // TODO(charlie): the old site described Bitless as Golang/React/Postgres in
    // one place and Next.js/React/Supabase in another. Add the stack back here
    // once you confirm which is right — shipping a guess is worse than no line.
  },
];

export const EXPERIMENTS: ProjectRow[] = [
  {
    title: "Homelab",
    tag: "Ongoing",
    description:
      "Infrastructure I own, so I'm allowed to break it. Self-hosted services in Docker, Scrypted bridging IP cameras into HomeKit, PoE and UniFi for the network, Cloudflare in front of anything exposed, and monitoring so I find out before something else does.",
    stack: ["docker", "scrypted", "unifi", "cloudflare"],
  },
  {
    title: "AI and agents",
    tag: "Ongoing",
    description:
      "Coding agents, orchestration, local models and model routing, mostly to find out where an LLM belongs in an application and where it's just expensive. The useful cases so far are quiet ones: reading a screenshot, parsing a sentence, ranking something.",
    stack: ["vercel ai sdk", "llm apis"],
  },
  {
    title: "Small tools",
    tag: "Ongoing",
    description:
      "Things I build because I want them to exist — automation, school workflows, a dashboard for one person. Most don't outlive the problem. A few turned into the parts of Syllabi I now rely on.",
  },
  {
    title: "PC builds and hardware",
    tag: "Ongoing",
    description:
      "Building machines and fixing them. Most of my troubleshooting instinct came from here.",
  },
  {
    title: "This site",
    tag: "Ongoing",
    // TODO(charlie): if you make the repo public, add
    // `href: "https://github.com/charliva/charlievadev", external: true`
    // and the row links itself.
    description:
      "No database, no CMS, no analytics. All the copy lives in four typed files, so changing it is a one-line edit.",
    stack: ["next.js", "tailwind", "vercel"],
  },
];
