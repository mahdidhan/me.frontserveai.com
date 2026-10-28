"use client";

import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

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

  const links = [
    { label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    {
      label: "LinkedIn",
      value: "mahdihamed",
      href: linkedin,
      external: true,
    },
    { label: "GitHub", value: "mahdidhan", href: github, external: true },
  ];

  return (
    <Section id="contact" title="Contact">
      <p className="max-w-[28ch] text-2xl font-semibold leading-snug font-stretch-112% sm:text-3xl">
        Open to discussing architecture, cloud solutions, AI-powered platforms,
        and leadership roles.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={`mailto:${email}`}
          className="break-all text-xl text-cobalt underline decoration-cobalt/30 underline-offset-[6px] transition-colors hover:decoration-cobalt sm:text-2xl"
        >
          {email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-ink/25 px-3 text-sm transition-colors hover:border-ink"
        >
          {copied ? (
            <Check className="h-4 w-4 text-status" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
          {copied ? "Copied" : "Copy email"}
        </button>
        <span role="status" className="sr-only">
          {copied ? "Email address copied to clipboard" : ""}
        </span>
      </div>

      <dl className="mt-12 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
        {links.map((link) => (
          <div key={link.label} className="min-w-0">
            <dt className="text-sm text-graphite">{link.label}</dt>
            <dd className="mt-1 truncate">
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="underline decoration-rule underline-offset-4 transition-colors hover:text-cobalt hover:decoration-cobalt"
              >
                {link.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
