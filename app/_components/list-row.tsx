import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import type { ProjectRow } from "@/app/_content/projects";
import { cn } from "@/lib/utils";

export function StatusDot() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-[5px] w-[5px] shrink-0 rounded-full bg-signal before:absolute before:-inset-[2.5px] before:rounded-full before:bg-[var(--signal-dim)]"
    />
  );
}

export function MonoTag({
  children,
  live,
}: {
  children: ReactNode;
  live?: boolean;
}) {
  return (
    <span className="type-mono-label flex shrink-0 items-center gap-[6px] whitespace-nowrap">
      {live ? <StatusDot /> : null}
      {children}
    </span>
  );
}

function RowBody({ row }: { row: ProjectRow }) {
  const external = Boolean(row.external);
  const linked = Boolean(row.href);

  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="type-row-title">{row.title}</h3>
        <MonoTag live={row.live}>{row.tag}</MonoTag>
      </div>
      <p className="type-small mt-1 max-w-[62ch]">{row.description}</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        {row.stack ? (
          <p className="type-mono-data transition-colors duration-200 ease-standard group-hover:text-text-2">
            {row.stack.join(" · ")}
          </p>
        ) : (
          <span />
        )}
        {linked ? (
          <span className="type-mono-label flex items-center gap-[6px] transition-colors duration-200 ease-standard group-hover:text-text-2">
            {row.cta ?? (external ? "Visit" : "Open")}
            {external ? (
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-[120ms] ease-standard group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px]"
              />
            ) : (
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-[120ms] ease-standard group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px]"
              />
            )}
          </span>
        ) : null}
      </div>
    </>
  );
}

/**
 * Invisible at rest, a card on hover. A row that does not link renders no
 * arrow, no tint and no pointer — clickability is legible before hover.
 */
export function ListRow({ row }: { row: ProjectRow }) {
  const base =
    "-mx-3 block rounded-row px-3 py-[14px] transition-colors duration-[120ms] ease-standard";

  if (!row.href) {
    return (
      <div className={cn(base, "cursor-default")}>
        <RowBody row={row} />
      </div>
    );
  }

  const interactive = cn(
    base,
    "group hover:bg-[var(--tint-hover)] active:bg-[var(--tint-active)]",
  );

  if (row.external) {
    return (
      <a
        href={row.href}
        target="_blank"
        rel="noreferrer"
        className={interactive}
      >
        <RowBody row={row} />
      </a>
    );
  }

  return (
    <Link href={row.href} className={interactive}>
      <RowBody row={row} />
    </Link>
  );
}

export function RowList({ rows }: { rows: readonly ProjectRow[] }) {
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {rows.map((row) => (
        <div key={row.title} className="py-1">
          <ListRow row={row} />
        </div>
      ))}
    </div>
  );
}
