"use client";

import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { resolvedTheme, setTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const OPEN_EVENT = "open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const noop = () => () => {};

/** "⌘K" on Apple devices, "Ctrl K" elsewhere (and during server render). */
export function useShortcutLabel() {
  return useSyncExternalStore(
    noop,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K"),
    () => "Ctrl K",
  );
}

interface Command {
  label: string;
  hint: string;
  run: () => void | Promise<void>;
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Ctrl/⌘ K: jump to a section, copy the email, download the résumé, or switch
 * theme. A native <dialog> gives focus trapping and Escape for free.
 */
export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [notice, setNotice] = useState("");

  const commands: Command[] = [
    ...siteConfig.navItems.map((item) => ({
      label: `Go to ${item.label}`,
      hint: "Section",
      run: () => {
        window.location.hash = item.href;
      },
    })),
    {
      label: "Copy email address",
      hint: portfolio.contact.email,
      run: async () => {
        try {
          await navigator.clipboard.writeText(portfolio.contact.email);
          setNotice("Email address copied");
        } catch {
          window.location.assign(`mailto:${portfolio.contact.email}`);
        }
      },
    },
    {
      label: "Download résumé",
      hint: "PDF",
      run: () => {
        const link = document.createElement("a");
        link.href = siteConfig.resumePath;
        link.download = "";
        link.click();
      },
    },
    {
      label: isDark ? "Switch to light theme" : "Switch to dark theme",
      hint: "Theme",
      run: () => setTheme(isDark ? "light" : "dark"),
    },
    {
      label: "Use system theme",
      hint: "Theme",
      run: () => setTheme("system"),
    },
    {
      label: "Open LinkedIn",
      hint: "Link",
      run: () => openExternal(portfolio.contact.linkedin),
    },
    {
      label: "Open GitHub",
      hint: "Link",
      run: () => openExternal(portfolio.contact.github),
    },
  ];

  const results = commands.filter((command) =>
    command.label.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const selected = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    const open = () => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      setQuery("");
      setActive(0);
      setIsDark(resolvedTheme() === "dark");
      dialog.showModal();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else open();
      }
    };
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2200);
    return () => clearTimeout(timer);
  }, [notice]);

  const run = (command: Command | undefined) => {
    if (!command) return;
    dialogRef.current?.close();
    void command.run();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-label="Command menu"
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="mx-auto mt-[12vh] w-[min(34rem,calc(100%-2rem))] overflow-hidden rounded-lg border border-rule bg-paper-raised text-ink shadow-2xl shadow-ink/20 backdrop:bg-ink/30"
      >
        <input
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-activedescendant={
            results.length ? `command-${selected}` : undefined
          }
          aria-label="Search commands"
          placeholder="Type a command or section…"
          autoComplete="off"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              const step = event.key === "ArrowDown" ? 1 : -1;
              setActive(
                (selected + step + results.length) %
                  Math.max(results.length, 1),
              );
            } else if (event.key === "Enter") {
              event.preventDefault();
              run(results[selected]);
            }
          }}
          className="w-full border-b border-rule bg-transparent px-5 py-4 text-base outline-none placeholder:text-graphite"
        />
        <ul
          id="command-list"
          role="listbox"
          aria-label="Commands"
          className="max-h-80 overflow-y-auto p-1.5"
        >
          {results.map((command, i) => (
            <li
              key={command.label}
              id={`command-${i}`}
              role="option"
              aria-selected={i === selected}
              onClick={() => run(command)}
              onMouseMove={() => setActive(i)}
              className={cn(
                "flex cursor-pointer items-baseline justify-between gap-4 rounded-md px-3 py-2.5",
                i === selected && "bg-cobalt-wash",
              )}
            >
              <span>{command.label}</span>
              <span className="truncate text-xs text-graphite">
                {command.hint}
              </span>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-2.5 text-sm text-graphite">
              No command matches “{query}”.
            </li>
          )}
        </ul>
        <p className="border-t border-rule px-5 py-2 text-xs text-graphite">
          Arrow keys to move, Enter to run, Esc to close
        </p>
      </dialog>

      <span role="status" className="sr-only">
        {notice}
      </span>
      {notice && (
        <div
          aria-hidden
          className="fixed bottom-6 left-1/2 z-70 -translate-x-1/2 rounded-md bg-ink px-4 py-2 text-sm text-paper"
        >
          {notice}
        </div>
      )}
    </>
  );
}
