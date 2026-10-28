"use client";

import { portfolio } from "@/data/portfolio";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const linkClass =
  "underline decoration-inverse-rule underline-offset-4 transition-colors hover:decoration-inverse-ink";

/** Closing band: inverse colours end the page on one clear call to action. */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const { email, phone, linkedin, github } = portfolio.contact;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-inverse text-inverse-ink"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <h2
          id="contact-heading"
          className="max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)] leading-[1.04] font-bold tracking-[-0.02em] text-balance font-stretch-118%"
        >
          Building something, or need an architect?
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-inverse-muted">
          {portfolio.availability}. Running a café or restaurant in Jordan?
          FrontServe AI is looking for its first pilot stores. Email is the
          fastest way to reach me.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="rounded-md border border-inverse-rule px-4 py-2.5 text-lg break-all transition-colors hover:border-inverse-ink sm:text-xl"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-12 items-center gap-2 rounded-md bg-inverse-ink px-5 font-medium text-inverse transition-colors duration-150 hover:bg-cobalt hover:text-cobalt-ink"
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden />
            ) : (
              <Copy className="h-4 w-4" aria-hidden />
            )}
            {copied ? "Copied" : "Copy email"}
          </button>
          <span role="status" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-inverse-muted">
          <li>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub
            </a>
          </li>
          <li>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className={linkClass}>
              {phone}
            </a>
          </li>
          <li>{portfolio.location}, UTC+3</li>
        </ul>
      </div>
    </section>
  );
}
