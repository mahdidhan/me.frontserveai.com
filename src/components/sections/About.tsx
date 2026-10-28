import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import Image from "next/image";

export function About() {
  return (
    <Section
      id="about"
      title="About"
      aside={
        <Image
          src="/profile.jpg"
          alt={`Portrait of ${portfolio.name}`}
          width={208}
          height={208}
          sizes="(min-width: 1024px) 208px, 128px"
          className="mt-6 h-32 w-32 rounded-md object-cover object-top lg:h-52 lg:w-52"
        />
      }
    >
      <div className="max-w-[65ch] space-y-5 text-lg">
        {portfolio.summary.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      <dl className="mt-12 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
        {portfolio.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-sm text-graphite">{stat.label}</dt>
            <dd className="mt-1 text-xl font-semibold font-stretch-112%">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
