import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { SkipLink } from "./_components/skip-link";
import { ThemeProvider } from "./_components/theme-provider";
import { meta, siteUrl } from "./_content/site";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: meta.title, template: meta.titleTemplate },
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: siteUrl,
    siteName: "charlieva.dev",
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0D0F12" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFB" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} scroll-smooth`}
    >
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink />
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
