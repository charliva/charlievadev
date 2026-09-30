import { hero } from "@/app/_content/site";

/**
 * First paint only, CSS keyframes rather than motion: the largest text on the
 * site must never wait for hydration to reach its final colour.
 */
function step(index: number) {
  return { animationDelay: `${index * 40}ms` } as const;
}

export function Hero() {
  return (
    <>
      <div aria-hidden="true" className="hidden self-start pt-12 sm:pt-[72px] lg:block">
        <span className="block h-px w-3 bg-rule-strong" />
      </div>
      <section className="min-w-0 pb-2 pt-10 sm:pt-16 lg:col-start-2">
        <p className="type-mono-label hero-step" style={step(0)}>
          {hero.eyebrow}
        </p>
        <h1 className="type-h1 hero-step mt-4 max-w-[19ch]" style={step(1)}>
          {hero.headline}
        </h1>
        <p className="type-lead hero-step measure-lead mt-5" style={step(2)}>
          {hero.lead}
        </p>
      </section>
      <hr className="col-span-full my-7 border-0 border-t border-rule sm:my-10" />
    </>
  );
}
