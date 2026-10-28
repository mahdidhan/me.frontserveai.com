import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { ExternalLink } from "lucide-react";

export function Credentials() {
  const groups = portfolio.certificationProviders
    .map((provider) => {
      const certs = portfolio.certifications.filter(
        (cert) => cert.provider === provider.name,
      );
      const dates = [...new Set(certs.map((cert) => cert.date))];
      return { provider, certs, dates };
    })
    .filter((group) => group.certs.length > 0);

  return (
    <Section id="credentials" title="Credentials">
      {/* Collapsed by default: one row per provider says enough at a glance. */}
      <div className="divide-y divide-rule border-y border-rule">
        {groups.map(({ provider, certs, dates }) => (
          <details key={provider.name} className="group">
            <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg font-semibold font-stretch-112% group-hover:text-cobalt">
                {provider.name}
              </h3>
              <span className="text-sm text-graphite">
                {certs.length} certificates, {dates.join(" and ")}.{" "}
                <span className="text-cobalt group-open:hidden">
                  Show all {certs.length}
                </span>
                <span className="hidden text-cobalt group-open:inline">
                  Hide
                </span>
              </span>
            </summary>
            <p className="max-w-[65ch] text-sm text-graphite">
              {provider.summary}
            </p>
            <ul className="mt-3 mb-5 divide-y divide-rule border-t border-rule">
              {certs.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-baseline justify-between gap-6 py-2.5"
                >
                  <span>{cert.name}</span>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-sm text-cobalt underline-offset-4 hover:underline"
                  >
                    Verify
                    <span className="sr-only"> {cert.name}</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <h3 className="text-sm font-semibold text-graphite">Education</h3>
          {portfolio.education.map((edu) => (
            <div key={edu.institution} className="mt-2">
              <p className="text-lg font-semibold font-stretch-112%">
                {edu.degree}
              </p>
              <p>{edu.institution}</p>
              <p className="mt-1 text-sm text-graphite">
                {edu.location}, {edu.period}
              </p>
              {edu.details && (
                <p className="mt-2 max-w-[60ch] text-sm text-graphite">
                  {edu.details}
                </p>
              )}
            </div>
          ))}
        </div>

        <div id="languages">
          <h3 className="text-sm font-semibold text-graphite">Languages</h3>
          <dl className="mt-2 divide-y divide-rule border-y border-rule">
            {portfolio.languages.map((language) => (
              <div
                key={language.name}
                className="flex items-baseline justify-between gap-4 py-2.5"
              >
                <dt>{language.name}</dt>
                <dd className="text-right text-sm text-graphite">
                  {language.proficiency}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
