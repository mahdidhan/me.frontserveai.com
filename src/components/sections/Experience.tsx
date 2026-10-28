import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { Experience as Job } from "@/types/portfolio";

/** Group consecutive roles at the same company so promotions read as one story. */
function groupByCompany(jobs: Job[]) {
  const groups: { company: string; location: string; roles: Job[] }[] = [];
  for (const job of jobs) {
    const last = groups.at(-1);
    if (last?.company === job.company) last.roles.push(job);
    else
      groups.push({
        company: job.company,
        location: job.location,
        roles: [job],
      });
  }
  return groups;
}

/** "Jul 2021 – Jun 2024" -> "2021" for the rail. */
const startYear = (period: string) => period.match(/\d{4}/)?.[0];

export function Experience() {
  const groups = groupByCompany(portfolio.experience);
  const firstYear = startYear(portfolio.experience.at(-1)!.period);

  return (
    <Section id="experience" title="Experience" meta={`${firstYear} to now`}>
      <ol className="space-y-14">
        {groups.map((group) => (
          <li key={group.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-xl font-semibold font-stretch-112%">
                {group.company}
              </h3>
              <p className="text-sm text-graphite">{group.location}</p>
            </div>

            <ol className="mt-5 space-y-10 border-l border-rule">
              {group.roles.map((job) => {
                const isCurrent = job.period.includes("Present");
                return (
                  <li key={job.role} className="relative pl-6 sm:pl-8">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-2 left-[-4.5px] h-2 w-2 rounded-full",
                        isCurrent
                          ? "bg-cobalt ring-4 ring-cobalt-wash"
                          : "bg-graphite",
                      )}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-lg font-semibold">{job.role}</h4>
                      <p className="text-sm text-graphite tabular-nums">
                        {job.period}
                      </p>
                    </div>
                    <p className="mt-2 max-w-[64ch]">{job.scope}</p>

                    <ul className="mt-5 grid border-y border-rule md:grid-cols-3">
                      {job.outcomes.map((outcome, i) => (
                        <li
                          key={outcome.label}
                          className={cn(
                            "flex flex-col gap-1.5 py-4 md:pr-4",
                            i > 0 &&
                              "border-t border-rule md:border-t-0 md:border-l md:pl-4",
                          )}
                        >
                          <span className="text-[1.65rem] leading-none font-bold tracking-[-0.02em] font-stretch-125% tabular-nums">
                            {outcome.value}
                          </span>
                          <span className="text-sm leading-snug text-graphite">
                            {outcome.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {job.tech && (
                      <ul
                        aria-label={`Technology used as ${job.role}`}
                        className="mt-4 flex flex-wrap gap-1.5"
                      >
                        {job.tech.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-sm border border-rule px-2 py-0.5 text-xs text-graphite"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}

                    {job.highlights.length > 0 && (
                      <details className="group mt-4">
                        <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm text-cobalt underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
                          <span
                            aria-hidden
                            className="w-3 text-center group-open:hidden"
                          >
                            +
                          </span>
                          <span
                            aria-hidden
                            className="hidden w-3 text-center group-open:inline"
                          >
                            −
                          </span>
                          More detail
                        </summary>
                        <ul className="mt-3 max-w-[66ch] list-disc space-y-2 pl-5 text-graphite marker:text-rule">
                          {job.highlights.map((highlight, i) => (
                            <li key={i}>{highlight}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </Section>
  );
}
