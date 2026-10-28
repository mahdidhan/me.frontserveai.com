import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  /** Extra content for the title rail (e.g. a photo), below the title. */
  aside?: React.ReactNode;
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
  aside,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("border-t border-rule", className)}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-8 px-4 py-16 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:px-8 lg:py-24">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id={`${id}-heading`}
            className="text-2xl font-semibold tracking-tight font-stretch-118%"
          >
            {title}
          </h2>
          {aside}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
