"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "manual";

const COPIED_MS = 1200;
const MANUAL_MS = 4000;

const EASE_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1];
const EASE_EXIT: [number, number, number, number] = [0.4, 0, 1, 1];

function shortcutLabel(): string {
  if (typeof navigator === "undefined") return "Ctrl+C";
  return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "⌘C" : "Ctrl+C";
}

/** Fallback path: leave the address selected so the shortcut is one key away. */
function selectContents(node: HTMLElement | null): boolean {
  if (!node) return false;
  const selection = window.getSelection();
  if (!selection) return false;

  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}

/**
 * The address is a real link first — cmd-click, middle-click and "copy link
 * address" all keep working — and the copy button is an accelerator beside it,
 * never the only way to get the address out.
 */
export function CopyEmail({ email }: { email: string }) {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [shortcut, setShortcut] = useState("Ctrl+C");
  const [announcement, setAnnouncement] = useState("");

  const addressRef = useRef<HTMLAnchorElement | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const announceCount = useRef(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const announce = useCallback((text: string) => {
    // A live region is only announced when its text changes, so a second copy
    // in a row would be silent. The alternating zero-width space forces it.
    announceCount.current += 1;
    setAnnouncement(
      announceCount.current % 2 === 0 ? text : `${text}​`,
    );
  }, []);

  const handleCopy = useCallback(async () => {
    window.clearTimeout(timerRef.current);

    let copied = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (copied) {
      setStatus("copied");
      announce("Email address copied");
      timerRef.current = window.setTimeout(() => setStatus("idle"), COPIED_MS);
      return;
    }

    const keys = shortcutLabel();
    const selected = selectContents(addressRef.current);
    setShortcut(keys);
    setStatus("manual");
    announce(
      selected
        ? `Email address selected. Press ${keys} to copy.`
        : `Copying failed. The address is ${email}.`,
    );
    timerRef.current = window.setTimeout(() => setStatus("idle"), MANUAL_MS);
  }, [announce, email]);

  const travel = reduceMotion ? 0 : 4;
  const enter = { duration: 0.12, ease: EASE_STANDARD };
  const exit = { duration: 0.1, ease: EASE_EXIT };

  // 12px gap, not less: the button's 44px target reaches 10px to its left, and
  // any overlap there would steal clicks from the end of the address.
  return (
    <span className="inline-flex items-center gap-[12px]">
      <a
        ref={addressRef}
        href={`mailto:${email}`}
        className="prose-link rounded-chip font-mono text-[13px]"
      >
        {email}
      </a>

      {/*
        The status label is absolutely positioned: reserving inline space for a
        word that is visible for 1.2s would be dead width the rest of the time.
      */}
      <span className="relative inline-flex items-center">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy email address"
          className="-m-[10px] flex h-11 w-11 items-center justify-center rounded-row p-[10px] text-text-3 transition-colors duration-[120ms] ease-standard hover:bg-[var(--tint-hover)] hover:text-text-2 active:bg-[var(--tint-active)]"
        >
          <span className="flex h-6 w-6 items-center justify-center">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={status === "copied" ? "check" : "copy"}
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: travel }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -travel, transition: exit }}
                transition={enter}
              >
                {status === "copied" ? (
                  <Check size={14} strokeWidth={1.5} className="text-signal" />
                ) : (
                  <Copy size={14} strokeWidth={1.5} />
                )}
              </motion.span>
            </AnimatePresence>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {status === "idle" ? null : (
            <motion.span
              key={status}
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-full ml-[10px] flex items-center whitespace-nowrap"
              initial={{ opacity: 0, y: travel }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -travel, transition: exit }}
              transition={enter}
            >
              <span className="type-mono-label text-text">
                {status === "copied" ? "Copied" : `Press ${shortcut}`}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </span>
  );
}
