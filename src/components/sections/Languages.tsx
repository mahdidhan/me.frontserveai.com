import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Globe } from "lucide-react";

export function Languages() {
  return (
    <section
      id="languages"
      aria-labelledby="languages-heading"
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <MotionWrapper>
          <SectionHeading id="languages-heading" eyebrow="Languages" title="Communication" />
        </MotionWrapper>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 max-w-2xl">
          {portfolio.languages.map((language) => (
            <StaggerItem key={language.name}>
              <Card className="flex items-center gap-4">
                <div className="rounded-lg bg-violet-500/10 p-2">
                  <Globe className="h-5 w-5 text-violet-400" aria-hidden />
                </div>
                <div>
                  <h3 className="font-medium text-white">{language.name}</h3>
                  <p className="text-sm text-zinc-500">
                    {language.proficiency}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
