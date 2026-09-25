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

/** Listed under the Syllabi module, which is the featured piece of work. */
export const WORK: ProjectRow[] = [
  {
    title: "Bitless",
    tag: "Earlier project",
    description:
      "An admin dashboard for managing product and user data. It taught me data modelling, CRUD architecture, writing TypeScript someone else has to read, and keeping a codebase legible past the fun part.",
    stack: ["next.js", "react", "supabase"],
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
];
