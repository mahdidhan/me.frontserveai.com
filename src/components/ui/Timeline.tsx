import { cn } from "@/lib/utils";

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn("relative space-y-8", className)}>
      <div
        aria-hidden
        className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-violet-500/60 via-cyan-400/30 to-transparent sm:left-[11px]"
      />
      {children}
    </div>
  );
}

interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
}

export function TimelineItem({ children, className }: TimelineItemProps) {
  return (
    <div className={cn("relative pl-8 sm:pl-12", className)}>
      <div
        aria-hidden
        className="absolute left-0 top-2 h-[18px] w-[18px] rounded-full border-2 border-violet-400 bg-[#0a0a0f] shadow-[0_0_12px_rgba(139,92,246,0.5)] sm:left-1 sm:h-[22px] sm:w-[22px]"
      />
      {children}
    </div>
  );
}
