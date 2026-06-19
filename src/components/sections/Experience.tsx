import { portfolio } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { Briefcase, MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <MotionWrapper>
          <SectionHeading
            eyebrow="Professional Experience"
            title="Career journey"
            description="Leading teams and delivering enterprise solutions across cybersecurity, SaaS, and mobile platforms."
          />
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <Timeline>
            {portfolio.experience.map((job) => (
              <TimelineItem key={`${job.company}-${job.role}`}>
                <Card>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Briefcase
                          className="h-4 w-4 text-violet-400"
                          aria-hidden
                        />
                        <h3 className="text-lg font-semibold text-white">
                          {job.role}
                        </h3>
                      </div>
                      <p className="mt-1 text-violet-300">{job.company}</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {job.location}
                      </p>
                    </div>
                    <time className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-400">
                      {job.period}
                    </time>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {job.highlights.map((highlight) => (
                      <li
                        key={highlight.slice(0, 50)}
                        className="flex gap-3 text-sm leading-relaxed text-zinc-400"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {job.tech && (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-5">
                      {job.tech.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </TimelineItem>
            ))}
          </Timeline>
        </MotionWrapper>
      </div>
    </section>
  );
}
