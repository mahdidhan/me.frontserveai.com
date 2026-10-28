import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/data/site";

const linkClass =
  "underline decoration-rule underline-offset-4 transition-colors hover:text-cobalt hover:decoration-cobalt";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-graphite sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {year} {portfolio.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${siteConfig.social.email}`} className={linkClass}>
              Email
            </a>
          </li>
          <li>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="#hero" className={linkClass}>
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
