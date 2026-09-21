import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        bg: "oklch(var(--bg) / <alpha-value>)",
        raised: "oklch(var(--bg-raised) / <alpha-value>)",
        rule: "oklch(var(--rule) / <alpha-value>)",
        "rule-strong": "oklch(var(--rule-strong) / <alpha-value>)",
        "line-int": "oklch(var(--line-interactive) / <alpha-value>)",
        text: "oklch(var(--text) / <alpha-value>)",
        "text-2": "oklch(var(--text-2) / <alpha-value>)",
        "text-3": "oklch(var(--text-3) / <alpha-value>)",
        signal: "oklch(var(--signal) / <alpha-value>)",
      },
      borderColor: {
        DEFAULT: "oklch(var(--rule) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      borderRadius: {
        row: "6px",
        module: "8px",
        chip: "4px",
      },
      maxWidth: {
        page: "816px",
        column: "672px",
      },
      spacing: {
        rail: "112px",
        gutter: "32px",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        standard: "var(--ease-standard)",
        exit: "var(--ease-exit)",
      },
    },
  },
  plugins: [],
};

export default config;
