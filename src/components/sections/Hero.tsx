import { architecture } from "@/data/architecture";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-16 gap-y-14 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:px-8 lg:pb-28 lg:pt-40">
        <div>
          <h1
            id="hero-heading"
            className="text-[clamp(3.25rem,9vw,6rem)] font-bold leading-[0.95] tracking-[-0.02em] font-stretch-125%"
          >
            {portfolio.name}
          </h1>
          <p className="mt-8 max-w-[30ch] text-xl leading-snug sm:text-2xl">
            {portfolio.tagline}
          </p>
          <p className="mt-4 text-graphite">
            {portfolio.title}, based in {portfolio.location}.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projects" size="lg">
              See projects
            </Button>
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

        <figure className="min-w-0">
          <div className="dot-grid -mx-4 overflow-x-auto rounded-lg border border-rule px-4 py-6 sm:mx-0 sm:px-6">
            <ArchitectureDiagram />
          </div>
          <figcaption className="mt-3 max-w-[60ch] text-sm text-graphite">
            {architecture.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
