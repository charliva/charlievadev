import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="px-5 sm:px-6">
      <div className="mx-auto max-w-column py-24 lg:max-w-page lg:pl-[144px]">
        <p className="type-mono-label">404</p>
        <h1 className="type-h1 mt-4 max-w-[20ch]">
          This page doesn&apos;t exist, or it moved when I rebuilt the site.
        </h1>
        <Link
          href="/"
          className="prose-link -my-3 mt-6 inline-block py-3 text-[14px]"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
