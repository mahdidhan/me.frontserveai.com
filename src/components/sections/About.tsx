import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <MotionWrapper>
          <SectionHeading
            id="about-heading"
            eyebrow="About Me"
            title="Building scalable systems that drive business impact"
            description="Architecting enterprise platforms with a focus on cloud-native design, security, and AI-powered innovation."
          />
        </MotionWrapper>

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <MotionWrapper delay={0.1}>
            <div className="space-y-4 text-base leading-relaxed text-zinc-400">
              {portfolio.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </MotionWrapper>

          <StaggerContainer className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {portfolio.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <Card hover={false} className="text-center lg:text-left">
                  <p className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
