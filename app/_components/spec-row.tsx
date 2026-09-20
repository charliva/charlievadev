import { cn } from "@/lib/utils";

export type SpecItem = {
  key: string;
  value: string;
  /** Render the value as machine data rather than a sentence. */
  mono?: boolean;
};

/**
 * The site's universal grammar: a 112px monospace key and a value. One key
 * width everywhere — long keys wrap rather than widening the column.
 */
export function SpecTable({
  items,
  className,
  rowClassName,
}: {
  items: readonly SpecItem[];
  className?: string;
  rowClassName?: string;
}) {
  return (
    <dl className={cn(className)}>
      {items.map((item) => (
        <div
          key={item.key}
          className={cn(
            "grid grid-cols-1 gap-y-1 border-b border-rule py-3 sm:grid-cols-[112px_1fr] sm:items-baseline sm:gap-x-6",
            rowClassName,
          )}
        >
          <dt className="type-mono-label">{item.key}</dt>
          <dd
            className={cn(
              "min-w-0",
              item.mono
                ? "type-mono-data break-words"
                : "font-sans text-[14px] leading-[1.6] text-text",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
