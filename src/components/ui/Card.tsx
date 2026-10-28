import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-surface/80 p-6 backdrop-blur-sm",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:shadow-lg hover:shadow-violet-500/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
