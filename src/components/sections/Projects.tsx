import { portfolio } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FolderKanban } from "lucide-react";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-y border-white/5 bg-[#0c0c14]/50 py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <MotionWrapper>
          <SectionHeading
            eyebrow="Selected Projects"
            title="Featured work"
            description="Enterprise platforms and products spanning cybersecurity, CRM, mobility, and automotive."
          />
        </MotionWrapper>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {portfolio.projects.map((project) => (
            <StaggerItem key={project.title}>
              <Card className="flex h-full flex-col">
                <div className="mb-4 flex items-start gap-3">
                  <div className="rounded-lg bg-violet-500/10 p-2">
                    <FolderKanban
                      className="h-5 w-5 text-violet-400"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-violet-300">
                      {project.role}
                    </p>
                  </div>
                </div>

                <p className="flex-1 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-5">
                  {project.tech.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
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
