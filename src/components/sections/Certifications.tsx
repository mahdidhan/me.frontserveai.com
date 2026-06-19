import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award } from "lucide-react";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <MotionWrapper>
          <SectionHeading
            eyebrow="Certifications"
            title="Continuous learning"
            description="Professional certifications in project management and AI technologies."
          />
        </MotionWrapper>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.certifications.map((cert) => (
            <StaggerItem key={cert.name}>
              <Card className="flex h-full items-start gap-4">
                <div className="rounded-lg bg-cyan-500/10 p-2">
                  <Award className="h-5 w-5 text-cyan-400" aria-hidden />
                </div>
                <div>
                  <h3 className="font-medium text-white">{cert.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{cert.issuer}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
