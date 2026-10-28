import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { ExternalLink } from "lucide-react";

export function Certifications() {
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
    <Section id="certifications" title="Certifications">
      <div className="space-y-14">
        {groups.map(({ provider, certs, dates }) => (
          <div key={provider.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-xl font-semibold font-stretch-112%">
                {provider.name}
              </h3>
              <p className="text-sm text-graphite">
                {certs.length} certificates, {dates.join(" and ")}
              </p>
            </div>
            <p className="mt-2 max-w-[65ch] text-graphite">
              {provider.summary}
            </p>

            <ul className="mt-5 divide-y divide-rule border-y border-rule">
              {certs.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-baseline justify-between gap-6 py-3"
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
          </div>
        ))}
      </div>
    </Section>
  );
}
