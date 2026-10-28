import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  /** Short line under the title in the rail, e.g. "2021 to now". */
  meta?: string;
  /** Raised paper tone, used to vary the rhythm down the page. */
  band?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Spec-sheet section: a sticky title rail on the left, content on the right,
 * separated from the previous section by a hairline rule.
 */
export function Section({
  id,
  title,
  meta,
  band,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("border-t border-rule", band && "bg-paper-band", className)}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 gap-y-6 px-4 py-14 sm:px-6 lg:grid-cols-[10rem_minmax(0,1fr)] lg:px-8 lg:py-20">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id={`${id}-heading`}
            className="text-2xl font-semibold tracking-tight font-stretch-118%"
          >
            {title}
          </h2>
          {meta && <p className="mt-1 text-sm text-graphite">{meta}</p>}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
