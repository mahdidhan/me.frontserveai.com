"use client";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = siteConfig.navItems.map((item) =>
        item.href.replace("#", ""),
      );
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <a
          href="#"
          className="font-mono text-sm font-semibold tracking-tight text-white transition-colors hover:text-violet-300"
        >
          MH<span className="text-violet-400">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "text-sm transition-colors duration-200",
                  activeSection === item.href
                    ? "text-violet-300"
                    : "text-zinc-400 hover:text-white",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.resumePath}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition-all hover:border-violet-400/40 hover:bg-white/10"
          >
            <Download className="h-4 w-4" aria-hidden />
            Resume
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-base transition-colors",
                    activeSection === item.href
                      ? "bg-violet-500/10 text-violet-300"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={siteConfig.resumePath}
                download
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-base text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
