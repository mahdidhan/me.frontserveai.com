import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import Image from "next/image";

export function About() {
  return (
    <Section id="about" title="About" band>
      <div className="grid gap-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
        {/* The portrait sits on a drafting grid like a labelled figure. It's a
            cut-out (transparent WebP) so it works on both themes. */}
        <figure className="line-grid relative aspect-square w-40 max-w-full overflow-hidden rounded-md border border-rule bg-paper-raised md:w-52">
          <figcaption className="absolute top-2 left-2.5 text-xs text-graphite">
            Fig. 2
          </figcaption>
          <Image
            src="/profile-photo.webp"
            alt={`Portrait of ${portfolio.name}`}
            width={480}
            height={480}
            sizes="(min-width: 768px) 208px, 160px"
            className="absolute inset-x-0 bottom-0 h-auto w-full grayscale"
          />
        </figure>

        <div className="max-w-[62ch]">
          <p className="text-[clamp(1.35rem,2.6vw,1.65rem)] leading-snug tracking-[-0.01em] text-balance">
            {portfolio.lede}
          </p>
          <div className="mt-5 space-y-4 text-graphite">
            {portfolio.summary.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-8 grid border-t border-rule sm:grid-cols-3">
            {portfolio.facts.map((fact, i) => (
              <div
                key={fact.label}
                className={
                  i === 0
                    ? "pt-4 sm:pr-4"
                    : "mt-4 border-t border-rule pt-4 sm:mt-0 sm:border-t-0 sm:border-l sm:pr-4 sm:pl-4"
                }
              >
                <dt className="text-sm text-graphite">{fact.label}</dt>
                <dd className="mt-0.5 text-lg font-semibold font-stretch-112% tabular-nums">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
