"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ORDER = ["system", "light", "dark"] as const;
type Mode = (typeof ORDER)[number];

const ICON = { system: Monitor, light: Sun, dark: Moon } as const;

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const current = (mounted && ORDER.includes(theme as Mode) ? theme : "system") as Mode;
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = ICON[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current}. Switch to ${next}.`}
      className="-m-2 flex h-11 w-11 items-center justify-center rounded-row p-2 text-text-3 transition-colors duration-[120ms] ease-standard hover:bg-[var(--tint-hover)] hover:text-text-2 active:bg-[var(--tint-active)]"
    >
      <span className="flex h-7 w-7 items-center justify-center">
        <Icon
          size={15}
          strokeWidth={1.5}
          className="transition-opacity duration-[180ms] ease-standard"
          suppressHydrationWarning
        />
      </span>
    </button>
  );
}
