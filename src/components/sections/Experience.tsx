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

export function Experience() {
  const groups = groupByCompany(portfolio.experience);

  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-16">
        {groups.map((group, groupIndex) => (
          <li key={group.company}>
            <h3 className="text-xl font-semibold font-stretch-112%">
              {group.company}
            </h3>
            <p className="text-sm text-graphite">{group.location}</p>

            <ol className="mt-6 space-y-10 border-l border-rule">
              {group.roles.map((job, roleIndex) => {
                const isCurrent = groupIndex === 0 && roleIndex === 0;
                return (
                  <li key={job.role} className="relative pl-6 sm:pl-8">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-2 left-[-4.5px] h-2 w-2 rounded-full",
                        isCurrent ? "bg-cobalt" : "bg-graphite",
                      )}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-lg font-semibold">{job.role}</h4>
                      <p className="text-sm text-graphite tabular-nums">
                        {job.period}
                      </p>
                    </div>
                    <ul className="mt-3 max-w-[70ch] list-disc space-y-2 pl-5 text-graphite marker:text-rule">
                      {job.highlights.map((highlight) => (
                        <li key={highlight.slice(0, 50)}>{highlight}</li>
                      ))}
                    </ul>
                    {job.tech && (
                      <p className="mt-4 text-sm">
                        <span className="text-graphite">Worked with </span>
                        {job.tech.join(", ")}
                      </p>
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
