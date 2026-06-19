import { portfolio } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-y border-white/5 bg-[#0c0c14]/50 py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <MotionWrapper>
          <SectionHeading
            eyebrow="Technical Skills"
            title="Expertise across the full stack"
            description="From architecture and cloud infrastructure to frontend, mobile, security, and AI."
          />
        </MotionWrapper>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.skills.map((category) => (
            <StaggerItem key={category.name}>
              <Card className="h-full">
                <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-violet-300">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
