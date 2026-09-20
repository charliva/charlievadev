import { ArrowUpRight } from "lucide-react";

import { CONTACT, contactIntro } from "@/app/_content/links";
import { CopyEmail } from "./copy-email";

export function ContactSection() {
  return (
    <>
      <p className="type-body measure">{contactIntro}</p>
      <dl className="mt-6 border-t border-rule">
        {CONTACT.map((link) => (
          <div
            key={link.key}
            className="grid grid-cols-1 gap-y-1 border-b border-rule py-3 sm:min-h-12 sm:grid-cols-[112px_1fr] sm:items-center sm:gap-x-6"
          >
            <dt className="type-mono-label">{link.key}</dt>
            <dd className="min-w-0">
              {link.copyable ? (
                <span className="font-mono text-[13px]">
                  <CopyEmail email={link.value} />
                </span>
              ) : link.href ? (
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 rounded-chip font-mono text-[13px] text-text"
                >
                  <span className="underline decoration-[color-mix(in_oklch,currentColor_45%,transparent)] decoration-1 underline-offset-[3px] transition-colors duration-[180ms] group-hover:decoration-signal">
                    {link.value}
                  </span>
                  {link.external ? (
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="shrink-0 text-text-3 transition-all duration-[120ms] ease-standard group-hover:translate-x-[2px] group-hover:text-text-2"
                    />
                  ) : null}
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="cursor-default font-mono text-[13px] text-text-3 underline decoration-rule-strong decoration-dotted decoration-1 underline-offset-[3px]"
                >
                  {link.value}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
