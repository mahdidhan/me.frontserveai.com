"use client";

import { toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

/** The icon is picked by CSS (`dark:`), so server and client markup match. */
export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between light and dark theme"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-graphite transition-colors duration-150 hover:text-ink",
        className,
      )}
    >
      <Moon className="h-4 w-4 dark:hidden" aria-hidden />
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden />
    </button>
  );
}
