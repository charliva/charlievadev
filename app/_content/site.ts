export const siteUrl = "https://charlieva.dev";

export const site = {
  name: "Charlie",
  role: "Student developer",
  location: "Aarhus, Denmark",
  locationShort: "aarhus, dk",
  school: "IB Diploma Programme, Aarhus Gymnasium Tilst",
  email: "charlie@charlieva.dev",
  github: "charliva",
  githubUrl: "https://github.com/charliva",
  /**
   * Shown next to the NOW heading. If you stop editing this, delete the
   * section rather than letting it rot.
   */
  nowUpdated: "September 2026",
} as const;

export const meta = {
  title: "Charlie — student developer in Denmark",
  titleTemplate: "%s · Charlie",
  description:
    "I'm Charlie, 17, an IB student in Aarhus, Denmark. I build full-stack web software — currently IB Calendar, a calendar and study hub for IB students.",
} as const;

export const hero = {
  eyebrow: "Student developer · Aarhus, Denmark",
  headline: "I build software around problems I actually have.",
  lead: "I'm Charlie, 17, an IB Diploma student in Aarhus. Most of what I build is full-stack web — TypeScript, React, Next.js. Right now that's a calendar and study hub for the IB, used by a small group of students at my school.",
  spec: [
    {
      key: "Focus",
      value:
        "IB Calendar — a calendar and study app built around the IB Diploma Programme",
    },
    { key: "School", value: "IB Diploma Programme, Aarhus Gymnasium Tilst" },
    {
      key: "Stack",
      value: "typescript · next.js · supabase · postgres",
      mono: true,
    },
    { key: "Direction", value: "Medicine and software engineering — still deciding" },
  ],
} as const;

export const about = {
  paragraphs: [
    "I found CS50 when I was about seven. I understood a small fraction of it and kept going anyway. For years after that I was mostly learning — reading, following along, rebuilding things that already existed. At some point that stopped being interesting on its own.",
    "The change was an admin dashboard called Bitless: the first project I had to write entirely myself, with no tutorial to follow and no one else's structure to lean on. It's also where I learned that a schema shows through every screen you build on top of it.",
    "Since then the pattern has been the same. I have a problem, I look at what exists, and if nothing fits the way I work, I build it. IB Calendar started that way. So did the homelab. I learn by building, which means I'm usually working inside a system before I understand every part of it — and then going back for the part I skipped. I'm deliberate about the going-back. Otherwise it's a pile of code that happens to run.",
    "I'm at Aarhus Gymnasium Tilst, and my academic direction right now is medicine. Software isn't the fallback and medicine isn't the exit — I'm interested in science, engineering, and how systems behave when something goes wrong in them. I'd rather keep the direction open than pick an identity at seventeen.",
  ],
  aiNote: {
    label: "On AI-assisted work",
    body: "I use AI-assisted tools every day, and I'm specific about what they do. I design the architecture, the database, the product behaviour and the UX. The tools write code faster than I do. They don't decide how the system works, and I don't ship things I can't debug.",
  },
  spec: [
    { key: "Based", value: "Aarhus, Denmark" },
    { key: "Studying", value: "IB Diploma Programme" },
  ],
} as const;

export const stack = {
  intro:
    "I'm strongest in modern full-stack web development. Most of the rest I picked up because something I was building needed it.",
  rows: [
    {
      key: "Frontend",
      value:
        "TypeScript, React and Next.js. Where most of my code is and where I make the most deliberate decisions: the server and client boundary, data fetching, and the things that decide whether a page feels fast.",
    },
    {
      key: "Data",
      value:
        "Supabase and PostgreSQL. I design the schema myself and write SQL by hand when the query matters. Auth, sessions, protected routes, row-level policies.",
    },
    {
      key: "Infrastructure",
      value:
        "Vercel, Cloudflare, GitHub Actions, Docker at a basic level, Linux. A homelab has taught me more about networking than anything else.",
    },
    {
      key: "AI",
      value:
        "The Vercel AI SDK and LLM APIs, used as an ordinary part of an application's architecture rather than a chatbot bolted on the side.",
    },
    {
      key: "Improving",
      value:
        "algorithms · cs fundamentals · databases · testing · security · linux · git workflows · system design",
      mono: true,
    },
  ],
  footnote:
    "Everything above is in progress. I'm 17 and this is the list I'm actually working through.",
} as const;

export const now = {
  intro:
    "I'm comfortable building things before I understand every part of them. It keeps me moving, and it leaves gaps. This is the list of gaps.",
  rows: [
    {
      title: "Reliability in IB Calendar",
      body: "Failure behaviour first: what the app shows when a sync fails or an import reads a date wrong, and which schema decisions would be expensive to change later.",
    },
    {
      title: "CS fundamentals and system design",
      body: "Algorithms, databases past getting the right rows back, and what happens when one piece of a system is slow, missing or wrong.",
    },
    {
      title: "Testing and security",
      body: "Tests around the scheduling logic, which is the most worth testing and the least tested. Auth edge cases, access rules, and storing less in the first place.",
    },
    {
      title: "AI as ordinary architecture",
      body: "Agents, human–AI interfaces, and software that holds enough context to be useful before you ask — the model treated like a database or a queue rather than a feature added at the end.",
    },
  ],
} as const;
