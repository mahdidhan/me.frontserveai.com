
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { ArrowDown, Download, MapPin } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.15)_0%,_transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:px-8">
        <MotionWrapper>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-violet-400">
            Software Architect
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="bg-linear-to-r from-violet-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
              {portfolio.name}
            </span>
          </h1>
          <p className="mt-4 text-xl font-medium text-zinc-300 sm:text-2xl">
            {portfolio.title}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {portfolio.location}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            {portfolio.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#projects" size="lg">
              View Projects
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Contact Me
            </Button>
            <a
              href={siteConfig.resumePath}
              download
              className="inline-flex items-center gap-2 px-2 py-2 text-sm text-zinc-400 transition-colors hover:text-violet-300"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Resume
            </a>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.15} className="flex justify-center lg:justify-end">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-full bg-linear-to-br from-violet-500/40 to-cyan-400/30 blur-2xl"
            />
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-white/10 shadow-2xl shadow-violet-500/20 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <Image
                src="/profile.jpg"
                alt={`${portfolio.name} — Software Architect`}
                fill
                priority
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </MotionWrapper>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500 transition-colors hover:text-violet-400"
      >
        <ArrowDown className="h-6 w-6" aria-hidden />
      </a>
    </section>
  );
}
