import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { ExternalLink } from "lucide-react";

export function Projects() {
  return (
    <Section id="projects" title="Selected projects">
      <ul className="divide-y divide-rule border-y border-rule">
        {portfolio.projects.map((project) => (
          <li
            key={project.title}
            className="grid gap-x-10 gap-y-3 py-8 md:grid-cols-[minmax(0,1fr)_13rem]"
          >
            <div>
              <h3 className="text-xl font-semibold font-stretch-112%">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-graphite">{project.role}</p>
              <p className="mt-4 max-w-[65ch]">{project.description}</p>

              {(project.github || project.demo) && (
                <div className="mt-4 flex gap-5 text-sm">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cobalt underline-offset-4 hover:underline"
                    >
                      Open live site
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cobalt underline-offset-4 hover:underline"
                    >
                      View source
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              )}
            </div>

            <ul
              aria-label={`Technology used in ${project.title}`}
              className="space-y-1 text-sm text-graphite md:pt-1.5"
            >
              {project.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
