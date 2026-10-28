import { siteConfig } from "@/data/site";
import { portfolio } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { ArrowUp, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background-deep">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-white">{portfolio.name}</p>
          <p className="mt-1 text-sm text-zinc-500">
            © {year} {portfolio.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${siteConfig.social.email}`}
            aria-label="Email Mahdi Hamed"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-violet-300"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-violet-300"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-violet-300"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        </div>

        <a
          href="#"
          aria-label="Back to top"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400 transition-all hover:border-violet-400/30 hover:text-violet-300"
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
          Top
        </a>
      </div>
    </footer>
  );
}
