import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap, MapPin } from "lucide-react";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-y border-white/5 bg-[#0c0c14]/50 py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <MotionWrapper>
          <SectionHeading
            id="education-heading"
            eyebrow="Education"
            title="Academic background"
          />
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <div className="max-w-2xl">
            {portfolio.education.map((edu) => (
              <Card key={edu.institution}>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-violet-500/10 p-2">
                    <GraduationCap
                      className="h-5 w-5 text-violet-400"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-violet-300">{edu.institution}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {edu.location}
                    </p>
                    <time className="mt-2 inline-block font-mono text-xs text-zinc-500">
                      {edu.period}
                    </time>
                    {edu.details && (
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {edu.details}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
