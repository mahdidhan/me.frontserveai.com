import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="divide-y divide-rule border-y border-rule">
        {portfolio.skills.map((category) => (
          <div
            key={category.name}
            className="grid gap-1 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="font-semibold">{category.name}</dt>
            <dd className="text-graphite">{category.skills.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
