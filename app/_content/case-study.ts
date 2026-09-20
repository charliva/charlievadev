export const caseStudy = {
  title: "Syllabi",
  subline: "Case study · Personal project · Built for the IB Diploma Programme",
  live: { label: "cal.charlieva.dev", href: "https://cal.charlieva.dev" },

  standfirst:
    "A calendar that starts from what a school week actually commits you to, and works out what is left.",

  /** No numbers of any kind belong in this table. */
  spec: [
    { key: "Role", value: "Design, architecture and implementation" },
    { key: "Type", value: "Personal project" },
    { key: "Status", value: "In use by a small group of students at my school" },
    { key: "Surface", value: "Web app" },
    {
      key: "Stack",
      value:
        "next.js · react · typescript · supabase · postgres · vercel · cloudflare · vercel ai sdk · github actions",
      mono: true,
    },
    { key: "Timeframe", value: "Ongoing" },
    {
      key: "Not included",
      value: "No user numbers, no revenue, no growth charts. It's too early to have any.",
    },
  ],

  /** The four-beat summary shown in the homepage module. */
  arc: [
    {
      index: "01",
      label: "Problem",
      body: "A timetable, a homework list and a photo of a slide — none of which know about each other.",
    },
    {
      index: "02",
      label: "Idea",
      body: "Start from what a week already commits you to, and make putting something in nearly free.",
    },
    {
      index: "03",
      label: "System",
      body: "Structure, capture, workload, planning and learning signals over a Postgres schema.",
    },
    {
      index: "04",
      label: "Next",
      body: "Failure behaviour, tests around scheduling, and better use of the signals already collected.",
    },
  ],

  /** Shown inside the bordered module on the homepage. */
  teaser: [
    "It started as my own calendar and turned into a study hub: it syncs my school timetable, tracks assignments and assessments, and plans study time around the hours I actually have.",
    "The difference from a normal calendar is what it tries to understand — school commitments, free time, workload and what I said I wanted to get done — instead of only storing events.",
  ],

  /** `title` is the visible heading; `short` is what fits the 112px rail. */
  sections: [
    { id: "problem", index: "01", title: "Problem", short: "Problem" },
    { id: "idea", index: "02", title: "Idea", short: "Idea" },
    { id: "system", index: "03", title: "System", short: "System" },
    { id: "current-state", index: "04", title: "Current state", short: "State" },
    { id: "next", index: "05", title: "What I'm building next", short: "Next" },
    { id: "stack", index: "06", title: "Stack", short: "Stack" },
  ],

  problem: [
    "My timetable lives in one place. My homework lives in another. Assessment dates usually live in a photo of a slide. None of them know about each other, so I was the integration layer, and I was bad at it.",
    "Calendar apps store events. On a Tuesday evening with four hours free and a week of work behind me, a calendar can tell me what's scheduled and nothing about what to do. A free hour before a test and a free hour on a Friday afternoon look identical to it. I was doing that reasoning in my head, every day, badly.",
    "The question I wanted answered was never what is on Thursday. It was what to do with the next two hours.",
  ],
  pullQuote: {
    text: "What should I actually do with my time right now?",
    attribution: "The question the app is trying to answer",
  },

  ideaKeys: [
    { key: "Commitments", value: "What's fixed — school, travel, the shape of a day." },
    { key: "Capacity", value: "What's actually free, and how much of it there is." },
    {
      key: "Difficulty",
      value: "Which classes cost me more than they cost anyone else.",
    },
    { key: "Intention", value: "What I said I wanted to get done this week." },
  ],
  idea: [
    "Start from commitments, not events. To answer that question, an app has to know four things:",
    "Once it knows those, a suggestion becomes possible — one I'm free to ignore. The second idea is that capture has to be nearly free. A planner you have to feed gets abandoned in week two. Adding a term of deadlines should be a screenshot. Adding one event should be a sentence.",
    "So I built the calendar first, to stop retyping my timetable. Then assignments, because a timetable without deadlines is half a picture. Then assessments, then study time. By then it wasn't a calendar.",
  ],

  systemIntro: "It's easier to describe as five systems than as a feature list.",
  systems: [
    {
      title: "Structure",
      body: "The school timetable syncs in and the app builds the actual shape of a day from it — lessons, travel, the gaps on either side, and events that run across multiple days. Everything else reasons about this layer, so it has to be right before anything clever is worth attempting. The point of the school and travel blocks isn't display; it's that free time shown in the app is free time that exists.",
    },
    {
      title: "Capture",
      // TODO(charlie): this is the one behavioural promise on the site — confirm
      // the app really does hold an import until you accept it, or cut the
      // sentence. The Review/Confirm steps in `flows` below say the same thing.
      body: "A screenshot of a timetable or an assessment slide is read by a model and turned into structured events and deadlines. A new event can be written as a sentence instead of filled into a form. Nothing is saved before I confirm it. Both exist for the same reason: putting something in should cost almost nothing.",
    },
    {
      title: "Workload",
      body: "Assignments, homework and assessments, each attached to a class, and each class carrying how difficult it actually is for me. A due date says when. Difficulty is what says how early to start.",
    },
    {
      title: "Planning",
      body: "Study blocks and study-time tracking on one side, weekly planning on the other. The app finds usable free slots and suggests what to spend them on, weighing deadlines, class difficulty, recent study time and the intentions I've set. Reminders and push notifications sit on top, so none of it depends on me remembering to open the app.",
    },
    {
      title: "Learning signals",
      body: "What I accept, move or ignore gets recorded and fed back into later recommendations. This is the part that makes it personal: the app is meant to get less wrong about me over time.",
    },
  ],

  dataModelIntro:
    "Underneath is a PostgreSQL schema in Supabase. Deciding what these tables mean and how they relate was most of the work — if the model of a school week is wrong, no amount of interface fixes it.",
  dataModel: [
    { key: "classes", value: "Subjects, and how difficult each one is for me" },
    { key: "timetable", value: "The synced school schedule a week is built from" },
    { key: "calendar_events", value: "Everything on the calendar, including multi-day events" },
    { key: "assignments", value: "Homework and coursework, attached to a class" },
    { key: "assessments", value: "Tests and assessments, with dates and weight" },
    { key: "study_blocks", value: "Planned and tracked study time" },
    { key: "reminders", value: "What gets surfaced, and when" },
    { key: "intentions", value: "What I said I wanted to get done this week" },
    { key: "learning_signals", value: "Accepted, moved or ignored — feedback for later suggestions" },
  ],

  flows: [
    {
      steps: ["Screenshot", "Extract", "Review", "Commit"],
      body: "A photo of a timetable or a slide of assessment dates becomes structured rows, mapped to the right class and date.",
    },
    {
      steps: ["Text", "Parse", "Confirm", "Event"],
      body: "A sentence becomes an event. The form still exists; it just isn't the fast path any more.",
    },
    {
      steps: ["Timetable", "Sync", "Day structure"],
      body: "The synced timetable is turned into the shape of a day — lessons, travel and the gaps between them — which everything else reads from.",
    },
  ],

  scheduling:
    "Free slots, workload, class difficulty, recent study time and stated intentions combine into a suggestion for a specific gap in a specific day. It suggests what to do with a free hour; it doesn't decide for you. What happens to that suggestion — accepted, moved, ignored — is recorded as a learning signal and weighed into the next one.",
  infrastructure:
    "Next.js on Vercel with Cloudflare in front, Supabase for Postgres and auth, and GitHub Actions for the jobs that need to run on a schedule rather than when someone opens a page. Reminders and push notifications are what turn a planner into something that reaches you.",

  currentState: [
    "It works, and it's early. A small group of students at my school use it alongside me, which is the most useful thing that has happened to it: a second timetable finds assumptions a single one never would. Otherwise I find bugs by using my own app, which is a method with a known limit.",
    "I've stopped treating it as a prototype I'll throw away. That changes what I worry about: which schema decisions would be expensive to change later, what the app shows when a sync fails or a model misreads a slide, and what data it holds and whether it needs to hold it.",
  ],

  next: [
    {
      tag: "Next",
      body: "Failure behaviour. A missing timetable should look like a missing timetable, not an empty afternoon, and an import that gets a date wrong should be obvious and one tap to fix rather than quietly wrong in three weeks.",
    },
    {
      tag: "Next",
      body: "Tests, starting with scheduling. The scheduling logic is the most worth testing and the least tested. That's the wrong way round.",
    },
    {
      tag: "Exploring",
      body: "Better recommendations. The learning signals are already being collected; using them well is the real work. The goal isn't more suggestions, it's being right often enough to be worth trusting.",
    },
    {
      tag: "Exploring",
      body: "Security, data handling and schema work as the tables fill up: auth edges, row-level policies, and storing less in the first place.",
    },
  ],

  stack: [
    { key: "Application", value: "Next.js, React and TypeScript" },
    { key: "Data", value: "Supabase and PostgreSQL, including auth and row-level policies" },
    { key: "Running", value: "Vercel, with Cloudflare in front" },
    { key: "AI", value: "Vercel AI SDK and LLM APIs for screenshot import and natural-language entry" },
    { key: "Automation", value: "GitHub Actions for scheduled jobs" },
  ],
} as const;
