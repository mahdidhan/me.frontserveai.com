import { diagrams } from "@/data/diagrams";
import { portfolio } from "@/data/portfolio";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { DiagramExplorer } from "@/components/ui/DiagramExplorer";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";
import { ExternalLink } from "lucide-react";

const linkClass =
  "inline-flex items-center gap-1 text-cobalt underline-offset-4 hover:underline";

/** "Company project", "Personal, in progress", "Personal, closed". */
function projectLabel(project: Project) {
  const status = {
    live: "live",
    "in-progress": "in progress",
    closed: "closed",
  } as const;
  if (project.ownership === "company") return "Company project";
  return project.status ? `Personal, ${status[project.status]}` : "Personal";
}

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { href: project.website, label: "Visit site" },
    { href: project.demo, label: "Try the demo" },
    { href: project.github, label: "View source" },
  ].filter((link): link is { href: string; label: string } => !!link.href);
  if (links.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {link.label}
          <span className="sr-only"> for {project.title}</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      ))}
    </div>
  );
}

/** Problem, architecture and results in three ruled columns. */
function CaseFile({ project, index }: { project: Project; index: number }) {
  const study = project.caseStudy!;
  const titleId = `case-${index}-title`;
  const meta = [
    project.role,
    project.period,
    project.ownership === "personal" && projectLabel(project).toLowerCase(),
  ].filter(Boolean);

  return (
    <article aria-labelledby={titleId}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3
          id={titleId}
          className="text-[clamp(2rem,4.5vw,2.75rem)] leading-none font-bold tracking-[-0.02em] font-stretch-125%"
        >
          {project.title}
        </h3>
        <p className="text-sm text-graphite">{meta.join(", ")}</p>
      </div>
      {study.summary && <p className="mt-4 max-w-[66ch]">{study.summary}</p>}

      <div className="mt-6 grid border-t border-ink md:grid-cols-3">
        {[
          { heading: "Problem", body: [study.problem] },
          { heading: "Architecture", body: study.architecture },
          {
            heading: study.resultsHeading ?? "Outcomes",
            body: study.outcomes,
          },
        ].map((column, i) => (
          <div
            key={column.heading}
            className={cn(
              "pt-4 md:pr-5",
              i > 0 &&
                "mt-5 border-t border-rule md:mt-0 md:border-t-0 md:border-l md:pl-5",
            )}
          >
            <h4 className="text-sm font-semibold text-graphite">
              {column.heading}
            </h4>
            {column.body.length === 1 ? (
              <p className="mt-2">{column.body[0]}</p>
            ) : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 marker:text-graphite">
                {column.body.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-graphite">
        Stack: {project.tech.join(", ")}
      </p>
      <ProjectLinks project={project} />
      {study.diagram && (
        <div className="mt-8 max-w-3xl">
          <DiagramExplorer data={diagrams[study.diagram].explorer}>
            <ArchitectureDiagram
              diagram={diagrams[study.diagram]}
              layout="tall"
              animate={false}
              className="sm:hidden"
            />
            <ArchitectureDiagram
              diagram={diagrams[study.diagram]}
              layout="wide"
              animate={false}
              className="hidden sm:block"
            />
          </DiagramExplorer>
        </div>
      )}
      {study.figureHref && (
        <p className="mt-3 text-sm">
          <a href={study.figureHref} className={linkClass}>
            Explore it in Fig. 1
          </a>
        </p>
      )}
    </article>
  );
}

export function Projects() {
  const projects = portfolio.projects.filter((project) => !project.draft);
  const caseFiles = projects.filter((project) => project.caseStudy);
  const others = projects.filter((project) => !project.caseStudy);

  return (
    <Section
      id="projects"
      title="Projects"
      meta="The main ones in depth, the rest in brief"
      band
    >
      <div className="space-y-16">
        {caseFiles.map((project, index) => (
          <CaseFile key={project.title} project={project} index={index} />
        ))}
      </div>

      {others.length > 0 && (
        <div className="mt-14">
          <h3 className="sr-only">Other projects</h3>
          <div
            aria-hidden
            className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.9fr)_1.25rem] gap-4 border-b border-ink pb-2 text-sm font-semibold text-graphite sm:grid"
          >
            <span>Project</span>
            <span>Role</span>
            <span>Type</span>
            <span />
          </div>
          <ul className="divide-y divide-rule border-b border-rule max-sm:border-t">
            {others.map((project) => (
              <li key={project.title}>
                <details className="group">
                  <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_1.25rem] items-baseline gap-x-4 gap-y-1 py-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.9fr)_1.25rem] [&::-webkit-details-marker]:hidden">
                    <span className="font-semibold font-stretch-108% group-hover:text-cobalt">
                      {project.title}
                    </span>
                    <span
                      aria-hidden
                      className="col-start-2 row-start-1 text-right text-graphite transition-transform duration-150 group-open:rotate-45 sm:col-start-4"
                    >
                      +
                    </span>
                    <span className="col-start-1 text-sm text-graphite sm:col-start-2 sm:row-start-1">
                      {project.role}
                    </span>
                    <span className="col-start-1 text-sm text-graphite sm:col-start-3 sm:row-start-1">
                      {projectLabel(project)}
                    </span>
                  </summary>
                  <div className="max-w-[66ch] pb-5">
                    <p className="text-graphite">{project.description}</p>
                    <p className="mt-2 text-sm">
                      <span className="text-graphite">Built with </span>
                      {project.tech.join(", ")}
                    </p>
                    <ProjectLinks project={project} />
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
