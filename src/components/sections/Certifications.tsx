import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Certification } from "@/types/portfolio";
import { Award, CalendarDays, ExternalLink, ShieldCheck } from "lucide-react";

const certificationGroups = [
  {
    provider: "DeepLearning.AI",
    date: "June 2026",
    summary:
      "Applied AI credentials across software design, agentic systems, RAG, and prompting.",
    accent: "cyan",
  },
  {
    provider: "Google / Coursera",
    date: "April 2024",
    summary:
      "Project management credentials covering Agile delivery, planning, execution, and capstone work.",
    accent: "violet",
  },
] as const;

function BrandMark({ provider }: { provider: string }) {
  if (provider === "DeepLearning.AI") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 font-mono text-sm font-semibold text-cyan-200">
        AI
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white text-xl font-bold text-blue-500">
      G
    </div>
  );
}

function ProviderPills({ provider }: { provider: string }) {
  if (provider === "DeepLearning.AI") {
    return (
      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-200">
        DeepLearning.AI
      </span>
    );
  }

  return (
    <>
      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-mono text-xs text-zinc-200">
        Google
      </span>
      <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 font-mono text-xs text-blue-200">
        Coursera
      </span>
    </>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <Card className="group flex h-full flex-col p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="rounded-lg bg-violet-500/10 p-2 text-violet-300 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-300">
          <Award className="h-5 w-5" aria-hidden />
        </div>
        <a
          href={cert.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Verify ${cert.name}`}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-xs font-medium text-zinc-400 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
        >
          Verify
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-semibold leading-snug text-white">
          {cert.name}
        </h3>
        <p className="mt-2 text-sm text-zinc-500">{cert.provider}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            {cert.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            {cert.date}
          </span>
        </div>

        {cert.credentialId && (
          <p className="mt-4 truncate border-t border-white/5 pt-4 font-mono text-xs text-zinc-600">
            ID {cert.credentialId}
          </p>
        )}
      </div>
    </Card>
  );
}

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
            id="certifications-heading"
            eyebrow="Certifications"
            title="Verified learning"
            description="Credentialed growth across AI-powered software engineering, agentic systems, RAG, and project delivery."
          />
        </MotionWrapper>

        <div className="space-y-8">
          {certificationGroups.map((group) => {
            const groupCertifications = portfolio.certifications.filter(
              (cert) => cert.provider === group.provider,
            );
            const isCyan = group.accent === "cyan";

            return (
              <MotionWrapper key={group.provider} delay={0.1}>
                <Card
                  hover={false}
                  className="overflow-hidden border-white/10 bg-[#101018]/85 p-0"
                >
                  <div className="border-b border-white/5 bg-white/[0.03] p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <BrandMark provider={group.provider} />
                        <div>
                          <div className="mb-2 flex flex-wrap gap-2">
                            <ProviderPills provider={group.provider} />
                          </div>
                          <h3 className="text-xl font-semibold text-white">
                            {group.provider}
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                            {group.summary}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 font-mono text-sm ${
                          isCyan
                            ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
                            : "border-violet-400/20 bg-violet-400/10 text-violet-200"
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4" aria-hidden />
                        {group.date}
                      </div>
                    </div>
                  </div>

                  <StaggerContainer className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    {groupCertifications.map((cert) => (
                      <StaggerItem key={cert.name}>
                        <CertificationCard cert={cert} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </Card>
              </MotionWrapper>
            );
          })}
        </div>

        <MotionWrapper delay={0.2}>
          <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/10 via-white/[0.03] to-cyan-500/10 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-sm uppercase tracking-widest text-violet-300">
                  Credential library
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  {portfolio.certifications.length} verified certificates from
                  AI and project delivery programs.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                  DeepLearning.AI
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-zinc-200">
                  Google
                </div>
                <div className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-sm text-blue-200">
                  Coursera
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}