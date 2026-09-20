# charlieva.dev

My personal site: a short introduction, a list of what I've built, and a case
study on IB Calendar.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v3 · motion ·
next-themes. No database, no CMS, no analytics.

## Running it

```bash
npm install
npm run dev
```

## Where the content lives

All copy is typed data in `app/_content/` — no text is hard-coded in a
component:

| File | What it holds |
|---|---|
| `site.ts` | Name, contact details, hero, about, stack and "now" copy |
| `links.ts` | Contact rows. Set `href` to a URL and the row goes live; `null` renders an unset slot |
| `projects.ts` | Work and experiment rows |
| `case-study.ts` | Everything on `/projects/ib-calendar` |

Search for `TODO(charlie)` before publishing — those are claims that need
confirming.

## Design notes

- One page grid: a 112px monospace rail, a 32px gutter and a 672px column.
  Nothing is ever wider than 816px.
- Sans says what a thing is; mono says what the machine knows about it.
- `--signal` (the one chromatic colour) is allowed only on focus rings, the
  live status dot, the active nav/TOC marker, study blocks in the schematic,
  the active diagram node, link underlines on hover, and the copy confirmation.
  If two signal-coloured things are on screen at once, one of them is a bug.
- No shadows, no gradients, no backdrop blur. Exactly one bordered module on
  the homepage — the case study.
