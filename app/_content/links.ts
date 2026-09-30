export type ContactLink = {
  key: string;
  value: string;
  href: string;
  external?: boolean;
  copyable?: boolean;
};

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
];
