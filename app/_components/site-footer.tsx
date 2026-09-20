import { site } from "@/app/_content/site";

const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

export function SiteFooter() {
  return (
    <footer className="mt-20 px-5 sm:px-6">
      <div className="mx-auto max-w-column border-t border-rule-strong pb-12 pt-6 lg:max-w-page">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-[13px] text-text-3">© 2026 {site.name}</p>
          <p className="type-mono-data">next.js · vercel</p>
        </div>
        {sha ? (
          <p className="type-mono-index mt-3 text-right">build {sha}</p>
        ) : null}
      </div>
    </footer>
  );
}
