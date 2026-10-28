import { diagrams } from "@/data/diagrams";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { Button } from "@/components/ui/Button";
import { DiagramExplorer } from "@/components/ui/DiagramExplorer";
import { cn } from "@/lib/utils";
import { Download, ExternalLink } from "lucide-react";

export function Hero() {
  // The product the hero is about: FrontServe AI's live demo.
  const demo = portfolio.projects.find((p) => p.demo && !p.draft)?.demo;

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-1 items-start gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
          <div>
            {/* Normal width on purpose: wide text would wrap differently in
                the fallback font and shift the layout when Archivo loads. */}
            <h1 id="hero-heading">
              <span className="block text-lg font-bold tracking-tight font-stretch-125%">
                {portfolio.name}
              </span>
              <span className="mt-0.5 block text-base font-normal text-graphite">
                {portfolio.role.title},{" "}
                <a
                  href={portfolio.role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-rule underline-offset-4 transition-colors hover:text-cobalt hover:decoration-cobalt"
                >
                  {portfolio.role.company}
                </a>
              </span>
              <span className="mt-5 block text-[clamp(2.1rem,4.2vw,2.85rem)] leading-[1.06] font-bold tracking-[-0.025em] text-balance">
                {portfolio.tagline}
              </span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg text-graphite">
              {portfolio.intro}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-rule px-3 py-1 text-sm text-graphite">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-status ring-3 ring-status/25"
              />
              {portfolio.availability}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {demo && (
                <Button
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Try the FrontServe demo
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </Button>
              )}
              <Button
                href={siteConfig.resumePath}
                download
                variant="secondary"
                size="lg"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download résumé
              </Button>
            </div>
          </div>

          <DiagramExplorer data={diagrams.frontserve.explorer}>
            <ArchitectureDiagram
              diagram={diagrams.frontserve}
              layout="tall"
              className="sm:hidden"
            />
            <ArchitectureDiagram
              diagram={diagrams.frontserve}
              layout="wide"
              className="hidden sm:block"
            />
          </DiagramExplorer>
        </div>

        <dl className="mt-14 grid grid-cols-2 border-t border-ink lg:grid-cols-4">
          {portfolio.impact.map((metric, i) => (
            <div
              key={metric.label}
              // Two columns on phones and tablets, four from lg: rules
              // between cells, and between the two rows when wrapped.
              className={cn(
                "flex flex-col border-rule pt-4 pr-4",
                i % 2 === 1 && "border-l pl-5",
                i === 2 && "lg:border-l lg:pl-5",
                i >= 2 && "max-lg:mt-4 max-lg:border-t",
              )}
            >
              <dt className="order-2 mt-1 text-sm leading-snug text-graphite">
                {metric.label}
              </dt>
              <dd className="text-[clamp(2rem,4.5vw,3.25rem)] leading-none font-bold tracking-[-0.02em] font-stretch-125% tabular-nums">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
