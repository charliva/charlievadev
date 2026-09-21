export type ContactLink = {
  key: string;
  value: string;
  /**
   * Set `href` to a URL and the row goes live automatically. Leave it null and
   * the row renders as a clearly-marked empty slot. Filling in LinkedIn/X is a
   * one-line change here.
   */
  href: string | null;
  external?: boolean;
  copyable?: boolean;
};

export const contactIntro =
  "Email is the best way to reach me. If you're at my school and want Syllabi, or you've built something near any of this, write to me.";

export const CONTACT: ContactLink[] = [
  {
    key: "Email",
    value: "charlie@charlieva.dev",
    href: "mailto:charlie@charlieva.dev",
    copyable: true,
  },
  {
    key: "GitHub",
    value: "@charliva",
    href: "https://github.com/charliva",
    external: true,
  },
  { key: "LinkedIn", value: "not added yet", href: null },
  { key: "X", value: "not added yet", href: null },
];
