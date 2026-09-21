"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { site } from "@/app/_content/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { id: "work", label: "work" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    // The observer only reports sections whose visibility *changed*, so the set
    // has to persist across callbacks — one batch in isolation promotes a
    // section that entered below one already sitting in the band.
    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        // Document order, not callback order. An empty band keeps the last
        // answer rather than blanking the nav mid-scroll.
        const current = sections.find((section) => inBand.has(section.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="sticky top-0 z-40 bg-bg">
      <div className="px-5 sm:px-6">
        <div className="mx-auto flex h-[52px] max-w-column items-center justify-between lg:max-w-page">
          <div className="flex min-w-0 items-center">
            {isHome ? (
              <span className="text-[14px] font-medium text-text">{site.name}</span>
            ) : (
              <Link
                href="/"
                className="-my-3 rounded-chip py-3 text-[14px] font-medium text-text transition-opacity duration-[120ms] hover:opacity-80"
              >
                {site.name}
              </Link>
            )}
            {/* The divider only exists to separate two things — it hides with
                the location it separates. */}
            <span
              aria-hidden="true"
              className="mx-[10px] hidden h-[10px] w-px bg-rule-strong min-[400px]:block"
            />
            <span className="type-mono-data hidden min-[400px]:inline">
              {site.locationShort}
            </span>
          </div>

          <nav aria-label="Main" className="flex items-center gap-4 sm:gap-5">
            {NAV.map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className={cn(
                    "relative -my-[13px] rounded-chip py-[13px] text-[12px] transition-colors duration-[120ms] ease-standard sm:text-[13px]",
                    isActive ? "text-text" : "text-text-2 hover:text-text",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId={reduceMotion ? undefined : "nav-underline"}
                      className="absolute bottom-[10px] left-0 right-0 h-px bg-signal"
                      transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.9 }}
                    />
                  ) : null}
                </Link>
              );
            })}
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "h-px bg-rule transition-opacity duration-[180ms] ease-standard",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
    </header>
  );
}
