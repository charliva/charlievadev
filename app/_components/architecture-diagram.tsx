"use client";

import { useReducedMotion } from "motion/react";
import { Fragment, useId, useRef, useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

type DiagramNode = {
  id: string;
  label: string;
  /** One factual line. Shown in the reserved slot under the diagram. */
  caption: string;
};

type DiagramColumn = {
  id: string;
  /** Uppercased by type-mono-label, so it stays sentence case for screen readers. */
  title: string;
  nodes: readonly DiagramNode[];
};

const COLUMNS: readonly DiagramColumn[] = [
  {
    id: "client",
    title: "Client",
    nodes: [
      {
        id: "app-router",
        label: "Next.js App Router",
        caption: "Routing, layouts and server rendering for every page of the app.",
      },
      {
        id: "react-ui",
        label: "React UI",
        caption: "The interface the browser renders, written in React and TypeScript.",
      },
    ],
  },
  {
    id: "runtime",
    title: "Server",
    nodes: [
      {
        id: "handlers",
        label: "Route handlers + server actions",
        caption:
          "Server-side entry points on Vercel, behind Cloudflare: reads and writes run here, not in the browser.",
      },
      {
        id: "ai-sdk",
        label: "Vercel AI SDK",
        caption:
          "Reads screenshots into structured data, and parses an event written as a sentence.",
      },
      {
        id: "actions",
        label: "GitHub Actions (scheduled)",
        caption: "Runs jobs on a schedule rather than when someone opens a page.",
      },
    ],
  },
  {
    id: "data",
    title: "Data",
    nodes: [
      {
        id: "postgres",
        label: "Supabase Postgres",
        caption: "Postgres for application data and auth, hosted on Supabase.",
      },
      {
        id: "rls",
        label: "Row-level security",
        caption:
          "Policies in the database decide which rows a signed-in user can read or write.",
      },
      {
        id: "push",
        label: "Push notifications",
        caption: "Reminders sent from the server, so nothing waits on the app being open.",
      },
    ],
  },
];

const RESTING_CAPTION =
  "The browser talks to the server; the server owns every read, write and scheduled job; Postgres holds the data.";

/*
 * Explicit placement keeps one set of buttons for both layouts: DOM order is
 * the mobile stack (header, nodes, connector, ...), and sm+ lifts the headers
 * into row 1 so the connectors centre on the nodes alone.
 */
const COLUMN_PLACEMENT = ["sm:col-start-1", "sm:col-start-3", "sm:col-start-5"] as const;
const CONNECTOR_PLACEMENT = ["sm:col-start-2", "sm:col-start-4"] as const;

/*
 * Derived, so it cannot drift from COLUMNS. It names the groups and the
 * direction only — the labels themselves are announced by the buttons, so
 * repeating them here would read every node twice.
 */
const SR_DESCRIPTION = `Architecture diagram: ${COLUMNS.length} groups of technologies, each feeding the next — ${COLUMNS.map(
  (column) => column.title,
).join(", ")}. Each node below is a button: focus or press one to read what that part of the system does.`;

/**
 * 1px rule with a CSS-triangle head: down when stacked, right when in columns.
 * rule-strong rather than rule — the arrows carry the flow direction, so they
 * are structure like the page spine, not decoration.
 */
function Connector({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center", className)}
    >
      <div className="flex flex-col items-center sm:hidden">
        <span className="h-4 w-px bg-rule-strong" />
        <span className="h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-rule-strong" />
      </div>
      <div className="hidden w-full items-center px-[6px] sm:flex">
        <span className="h-px flex-1 bg-rule-strong" />
        <span className="h-0 w-0 border-y-[4px] border-l-[5px] border-y-transparent border-l-rule-strong" />
      </div>
    </div>
  );
}

type Position = { col: number; row: number };

function nextPosition(key: string, col: number, row: number): Position | null {
  switch (key) {
    case "ArrowDown":
      return { col, row: Math.min(row + 1, COLUMNS[col].nodes.length - 1) };
    case "ArrowUp":
      return { col, row: Math.max(row - 1, 0) };
    case "ArrowRight": {
      const target = Math.min(col + 1, COLUMNS.length - 1);
      return { col: target, row: Math.min(row, COLUMNS[target].nodes.length - 1) };
    }
    case "ArrowLeft": {
      const target = Math.max(col - 1, 0);
      return { col: target, row: Math.min(row, COLUMNS[target].nodes.length - 1) };
    }
    default:
      return null;
  }
}

/**
 * Pointer, focus and activation all reveal the same caption, so each is tracked
 * separately and merged: hovering previews, focusing previews, and clicking (or
 * Enter/Space) pins — which is what leaves a caption on screen for a touch user
 * who has no hover and does not keep focus.
 *
 * The caption is a single polite live region and is deliberately NOT wired up
 * as aria-describedby: a description that changes as a result of focusing is
 * read either twice or stale, depending on the screen reader.
 */
export function ArchitectureDiagram({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());

  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);

  const activeId = hovered ?? focused ?? pinned;
  const activeNode = COLUMNS.flatMap((column) => column.nodes).find(
    (node) => node.id === activeId,
  );

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    col: number,
    row: number,
  ) {
    if (event.key === "Escape") {
      setPinned(null);
      setHovered(null);
      return;
    }

    const next = nextPosition(event.key, col, row);
    // A clamped arrow is not a move: swallowing it would strand the page at the
    // edge of the diagram with no way to scroll on.
    if (!next || (next.col === col && next.row === row)) return;

    event.preventDefault();
    nodeRefs.current.get(COLUMNS[next.col].nodes[next.row].id)?.focus();
  }

  return (
    <figure className={cn("mx-auto w-full max-w-page", className)}>
      <p className="sr-only">{SR_DESCRIPTION}</p>

      <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-[1fr_44px_1fr_44px_1fr]">
        {COLUMNS.map((column, col) => (
          <Fragment key={column.id}>
            <div
              id={`${uid}-${column.id}`}
              className={cn(
                "type-mono-label flex h-7 min-w-0 items-center border-b border-rule",
                COLUMN_PLACEMENT[col],
                "sm:row-start-1",
              )}
            >
              {column.title}
            </div>

            <div
              role="group"
              aria-labelledby={`${uid}-${column.id}`}
              className={cn(
                "flex min-w-0 flex-col gap-2",
                COLUMN_PLACEMENT[col],
                "sm:row-start-2",
              )}
            >
              {column.nodes.map((node, row) => {
                const isActive = node.id === activeId;

                return (
                  <button
                    key={node.id}
                    type="button"
                    ref={(element) => {
                      if (element) nodeRefs.current.set(node.id, element);
                      else nodeRefs.current.delete(node.id);
                    }}
                    aria-pressed={pinned === node.id}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setFocused(node.id)}
                    onBlur={() => setFocused(null)}
                    onClick={() =>
                      setPinned((current) => (current === node.id ? null : node.id))
                    }
                    onKeyDown={(event) => handleKeyDown(event, col, row)}
                    className={cn(
                      "type-mono-data w-full cursor-pointer rounded-module border p-3 text-left",
                      reduceMotion
                        ? null
                        : "transition-[color,background-color,border-color] duration-[120ms] ease-standard",
                      // No dimming of the siblings: 45% opacity on text-2 lands
                      // near 2:1, and every label has to stay readable.
                      isActive
                        ? "border-signal text-text"
                        : "border-line-int text-text-2",
                      pinned === node.id ? "bg-[var(--tint-hover)]" : null,
                    )}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>

            {col < COLUMNS.length - 1 ? (
              <Connector
                className={cn(CONNECTOR_PLACEMENT[col], "sm:row-start-2")}
              />
            ) : null}
          </Fragment>
        ))}
      </div>

      {/*
        Reserved height rather than fixed height: every caption fits, so the
        page does not reflow, and a caption that wraps further on a narrow
        viewport grows instead of being clipped away.
      */}
      <div className="mt-4 border-t border-rule pt-3">
        <p
          aria-live="polite"
          aria-atomic="true"
          className={cn(
            "type-small measure min-h-[64px] sm:min-h-[44px]",
            activeNode ? "text-text-2" : "text-text-3",
          )}
        >
          {activeNode ? activeNode.caption : RESTING_CAPTION}
        </p>
      </div>
    </figure>
  );
}
