import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function Stack() {
  return (
    <Section
      id="stack"
      title="Stack"
      meta="Grouped by how recently I've used it"
    >
      <div className="grid border-t border-ink md:grid-cols-3">
        {portfolio.stack.map((tier, i) => (
          <div
            key={tier.name}
            className={cn(
              "pt-4 md:pr-5",
              i > 0 &&
                "mt-6 border-t border-rule md:mt-0 md:border-t-0 md:border-l md:pl-5",
            )}
          >
            <h3 className="text-lg font-semibold font-stretch-112%">
              {tier.name}
            </h3>
            <p className="text-sm text-graphite">{tier.summary}</p>
            <dl className="mt-3">
              {tier.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-rule py-2"
                >
                  <dt>{item.name}</dt>
                  {item.usedIn && (
                    <dd className="shrink-0 text-right text-xs text-graphite">
                      {item.usedIn}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}
