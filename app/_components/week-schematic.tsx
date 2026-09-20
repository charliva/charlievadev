"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------- geometry -- */

const VIEW_W = 672;
const VIEW_H = 180;
/** Left rail reserved for the hour labels. */
const GRID_LEFT = 38;
const COL_GAP = 9;
const COL_W = (VIEW_W - GRID_LEFT - COL_GAP * 6) / 7;
const GRID_TOP = 26;
const GRID_BOTTOM = 176;
/**
 * The rail is a bare number line, not a clock: positions only exist so the
 * marks have somewhere to sit. RAIL_UNIT lands on whole pixels at 1:1.
 */
const RAIL_START = 8;
const RAIL_END = 18;
const RAIL_UNIT = (GRID_BOTTOM - GRID_TOP) / (RAIL_END - RAIL_START);
const RAIL_TICKS = [8, 10, 12, 14, 16];

const colX = (index: number) => GRID_LEFT + index * (COL_W + COL_GAP);
const railY = (position: number) => GRID_TOP + (position - RAIL_START) * RAIL_UNIT;

/* ------------------------------------------------------------------ data -- */

type Mark =
  | { kind: "school"; from: number; to: number }
  | { kind: "study"; from: number; to: number }
  | { kind: "travel"; at: number };

type DayShape = { initial: string; marks: readonly Mark[] };

/**
 * Illustrative geometry, and nothing else. These are marks on a blank rail —
 * no subject, no person, no date, no count, nothing measured or exported from
 * the app. Editing the numbers changes the picture and says nothing new.
 */
const WEEK_SHAPE: readonly DayShape[] = [
  {
    initial: "M",
    marks: [
      { kind: "travel", at: 8.6 },
      { kind: "school", from: 9, to: 15 },
      { kind: "travel", at: 15.2 },
      { kind: "study", from: 16.1, to: 17.4 },
    ],
  },
  {
    initial: "T",
    marks: [
      { kind: "travel", at: 8.6 },
      { kind: "school", from: 9, to: 13.4 },
      { kind: "travel", at: 13.6 },
      { kind: "study", from: 14.4, to: 15.9 },
    ],
  },
  {
    initial: "W",
    marks: [
      { kind: "travel", at: 8.4 },
      { kind: "school", from: 8.8, to: 15 },
      { kind: "travel", at: 15.2 },
      { kind: "study", from: 15.9, to: 17.1 },
    ],
  },
  {
    initial: "T",
    marks: [
      { kind: "travel", at: 8.6 },
      { kind: "school", from: 9, to: 14.2 },
      { kind: "travel", at: 14.4 },
      { kind: "study", from: 15.1, to: 16.3 },
      { kind: "study", from: 16.9, to: 17.8 },
    ],
  },
  {
    initial: "F",
    marks: [
      { kind: "travel", at: 8.6 },
      { kind: "school", from: 9, to: 15 },
      { kind: "travel", at: 15.2 },
    ],
  },
  {
    initial: "S",
    marks: [
      { kind: "study", from: 10.2, to: 11.6 },
      { kind: "study", from: 14.1, to: 15.5 },
    ],
  },
  {
    initial: "S",
    marks: [
      { kind: "study", from: 11.4, to: 12.8 },
      { kind: "study", from: 16.1, to: 17.2 },
    ],
  },
];

/* ---------------------------------------------------------------- motion -- */

const CONTAINER: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.03 } },
};

const COLUMN: Variants = {
  hidden: { opacity: 0, scaleY: 0.96 },
  shown: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Reduced motion keeps the same hidden state and drops the duration, rather
 * than dropping the variants: useReducedMotion() is null on the server, so the
 * server always renders the animated branch. A client that rendered a *different*
 * tree would hydrate onto the server's opacity="0" attribute — React reports the
 * mismatch but never removes an extra server attribute, and motion only writes
 * the values it was given — leaving the drawing permanently invisible for
 * exactly the people who asked for less motion.
 */
const CONTAINER_INSTANT: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0 } },
};

const COLUMN_INSTANT: Variants = {
  hidden: { opacity: 0, scaleY: 0.96 },
  shown: { opacity: 1, scaleY: 1, transition: { duration: 0 } },
};

/**
 * Motion overwrites any CSS transform-origin it finds on an SVG child with a
 * value computed from the measured bbox, so the origin has to be declared as
 * originX/originY rather than as a style. 0.5/0 is the top of the column.
 */
const COLUMN_ORIGIN = { originX: 0.5, originY: 0 } as const;

/* ----------------------------------------------------------------- marks -- */

function MarkShape({ mark, x }: { mark: Mark; x: number }) {
  if (mark.kind === "travel") {
    const y = railY(mark.at);
    const inset = COL_W * 0.25;
    return (
      <line
        x1={x + inset}
        x2={x + COL_W - inset}
        y1={y}
        y2={y}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        className="stroke-rule-strong"
      />
    );
  }

  const y = railY(mark.from);
  const height = railY(mark.to) - y;

  /*
   * Both blocks are outlined. A raised fill on bg is ~1.06:1 in either theme,
   * so an unstroked school block is invisible against the module — and the
   * blocks are the drawing. Inset by half the stroke so the 1px outline sits
   * inside the block rather than straddling its edge.
   */
  return (
    <rect
      x={x + 0.5}
      y={y + 0.5}
      width={COL_W - 1}
      height={height - 1}
      rx={4}
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      className={
        mark.kind === "school"
          ? "fill-raised stroke-rule-strong"
          : "fill-[var(--signal-dim)] stroke-signal"
      }
    />
  );
}

function DayColumn({
  day,
  index,
  animated,
}: {
  day: DayShape;
  index: number;
  animated: boolean;
}) {
  const x = colX(index);

  return (
    <motion.g
      /* Paired with the <noscript> guard in the layout: no JS, no opacity 0. */
      data-reveal=""
      variants={animated ? COLUMN : COLUMN_INSTANT}
      style={COLUMN_ORIGIN}
    >
      {/* dx compensates for the trailing letter-space on a centred glyph. */}
      <text
        x={x + COL_W / 2}
        y={13}
        dx="-0.05em"
        textAnchor="middle"
        className="type-mono-index hidden fill-text-3 sm:inline"
      >
        {day.initial}
      </text>
      {day.marks.map((mark, markIndex) => (
        <MarkShape key={`${mark.kind}-${markIndex}`} mark={mark} x={x} />
      ))}
    </motion.g>
  );
}

/* ---------------------------------------------------------------- legend -- */

const LEGEND = [
  {
    label: "school",
    swatch: "h-2 w-2 rounded-[2px] border border-rule-strong bg-raised",
  },
  { label: "travel", swatch: "h-[2px] w-2 bg-rule-strong" },
  {
    label: "study",
    swatch: "h-2 w-2 rounded-[2px] border border-signal bg-[var(--signal-dim)]",
  },
];

/* ------------------------------------------------------------- component -- */

/**
 * A drawing of the shape of a week, not a view of one. It carries no data: the
 * point is the structure — fixed blocks, the seams between them, and what is
 * left over — which is what the app reasons about.
 */
export function WeekSchematic({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion;

  return (
    <figure className={cn("min-w-0", className)}>
      <motion.svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
        className="block h-auto w-full"
        initial="hidden"
        /* Reduced motion arrives on mount, so it can never wait on a scroll. */
        animate={animated ? undefined : "shown"}
        whileInView={animated ? "shown" : undefined}
        viewport={animated ? { once: true, amount: 0.3 } : undefined}
        variants={animated ? CONTAINER : CONTAINER_INSTANT}
      >
        <g>
          {RAIL_TICKS.map((tick) => (
            <line
              key={tick}
              x1={GRID_LEFT}
              x2={VIEW_W}
              /* Half-pixel keeps the hairline crisp at 1:1. */
              y1={railY(tick) + 0.5}
              y2={railY(tick) + 0.5}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className="stroke-rule"
            />
          ))}
          {RAIL_TICKS.map((tick) => (
            <text
              key={tick}
              x={GRID_LEFT - 10}
              y={railY(tick)}
              dy="0.32em"
              textAnchor="end"
              className="type-mono-index hidden fill-text-3 sm:inline"
            >
              {String(tick).padStart(2, "0")}
            </text>
          ))}
        </g>

        {WEEK_SHAPE.map((day, index) => (
          <DayColumn
            key={`${day.initial}-${index}`}
            day={day}
            index={index}
            animated={animated}
          />
        ))}
      </motion.svg>

      {/* gap-x matches the 16px the separator holds open, so the row is even. */}
      <ul aria-label="Key" className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {LEGEND.map((item, index) => (
          <li key={item.label} className="type-mono-index flex items-center gap-[6px]">
            {index > 0 ? (
              <span aria-hidden="true" className="pr-[10px]">
                ·
              </span>
            ) : null}
            {/* The swatch repeats the mark exactly; the word carries the meaning. */}
            <span aria-hidden="true" className={cn("shrink-0", item.swatch)} />
            {item.label}
          </li>
        ))}
      </ul>

      {/* Sans, not mono: the caption is a sentence, and mono is for labels. */}
      <figcaption className="type-small mt-3 text-text-3">
        Fig. 1 — Schematic: generated day structure (school, travel, study blocks).
        Not a screenshot.
      </figcaption>
    </figure>
  );
}
