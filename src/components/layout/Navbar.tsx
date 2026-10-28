"use client";

import {
  openCommandPalette,
  useShortcutLabel,
} from "@/components/layout/CommandPalette";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const shortcut = useShortcutLabel();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: a section is active while it crosses a thin band near the
  // top of the viewport, just below the fixed header. The hero is observed too
  // so that scrolling back to the top clears the highlight.
  useEffect(() => {
    const sections = ["#hero", ...siteConfig.navItems.map((item) => item.href)]
      .map((href) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-120px 0px -70% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        scrolled || isOpen
          ? "border-rule bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#hero"
          className="font-semibold tracking-tight font-stretch-118% hover:text-cobalt"
        >
          {portfolio.name}
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={
                  activeSection === item.href ? "location" : undefined
                }
                className={cn(
                  "text-sm underline-offset-10 transition-colors",
                  activeSection === item.href
                    ? "text-ink underline decoration-cobalt decoration-2"
                    : "text-graphite hover:text-ink",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.resumePath}
              download
              className="inline-flex h-9 items-center rounded-md border border-ink/25 px-3 text-sm transition-colors hover:border-ink"
            >
              Résumé (PDF)
            </a>
          </li>
          <li className="-ml-3 flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command menu"
              aria-keyshortcuts="Control+K Meta+K"
              className="inline-flex h-9 items-center rounded-md border border-rule px-2.5 text-xs text-graphite transition-colors hover:border-ink hover:text-ink"
            >
              <kbd className="font-sans">{shortcut}</kbd>
            </button>
          </li>
        </ul>

        <div className="-mr-2 flex items-center md:hidden">
          <ThemeToggle className="h-10 w-10" />
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="h-[calc(100dvh-4rem)] border-t border-rule bg-paper md:hidden"
        >
          <ul className="flex flex-col px-4 py-4 sm:px-6">
            {siteConfig.navItems.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <a
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={
                    activeSection === item.href ? "location" : undefined
                  }
                  className={cn(
                    "block py-4 text-xl font-stretch-112%",
                    activeSection === item.href ? "text-cobalt" : "text-ink",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.resumePath}
                download
                onClick={closeMenu}
                className="block py-4 text-xl font-stretch-112%"
              >
                Download résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
