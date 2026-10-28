import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";

export function Education() {
  return (
    <Section id="education" title="Education and languages">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          {portfolio.education.map((edu) => (
            <div key={edu.institution}>
              <h3 className="text-xl font-semibold font-stretch-112%">
                {edu.degree}
              </h3>
              <p className="mt-1">{edu.institution}</p>
              <p className="mt-1 text-sm text-graphite">
                {edu.location}, {edu.period}
              </p>
              {edu.details && (
                <p className="mt-3 max-w-[60ch] text-graphite">{edu.details}</p>
              )}
            </div>
          ))}
        </div>

        <div id="languages">
          <h3 className="text-xl font-semibold font-stretch-112%">
            Languages
          </h3>
          <dl className="mt-3 divide-y divide-rule border-y border-rule">
            {portfolio.languages.map((language) => (
              <div
                key={language.name}
                className="flex items-baseline justify-between gap-4 py-3"
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
