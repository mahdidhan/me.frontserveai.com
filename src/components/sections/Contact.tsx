"use client";

import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { Check, Copy, Mail, Phone } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${portfolio.contact.email}`;
    }
  };

  const links = [
    {
      label: "Email",
      value: portfolio.contact.email,
      href: `mailto:${portfolio.contact.email}`,
      icon: Mail,
      action: copyEmail,
      actionLabel: copied ? "Copied!" : "Copy email",
    },
    {
      label: "Phone",
      value: portfolio.contact.phone,
      href: `tel:${portfolio.contact.phone.replace(/\s/g, "")}`,
      icon: Phone,
    },
    {
      label: "LinkedIn",
      value: "mahdi-hamed-4942b81b3",
      href: portfolio.contact.linkedin,
      icon: LinkedInIcon,
      external: true,
    },
    {
      label: "GitHub",
      value: "mahdidhan",
      href: portfolio.contact.github,
      icon: GitHubIcon,
      external: true,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <MotionWrapper>
          <SectionHeading
            eyebrow="Contact"
            title="Let's connect"
            description="Open to discussing architecture, cloud solutions, AI-powered platforms, and leadership opportunities."
          />
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2">
            {links.map((link) => (
              <Card key={link.label} hover={false}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="rounded-lg bg-violet-500/10 p-2 shrink-0">
                      <link.icon
                        className="h-5 w-5 text-violet-400"
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-zinc-500">{link.label}</p>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="block truncate font-medium text-white transition-colors hover:text-violet-300"
                      >
                        {link.value}
                      </a>
                    </div>
                  </div>

                  {link.action && (
                    <button
                      type="button"
                      onClick={link.action}
                      aria-label={link.actionLabel}
                      className={cn(
                        "shrink-0 rounded-lg border border-white/10 p-2 text-zinc-400 transition-all hover:border-violet-400/30 hover:text-violet-300",
                        copied && "border-green-500/30 text-green-400",
                      )}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" aria-hidden />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden />
                      )}
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
