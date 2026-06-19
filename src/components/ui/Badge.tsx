import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors duration-300 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
