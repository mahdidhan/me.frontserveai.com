import { portfolio } from "@/data/portfolio";

export const siteConfig = {
  name: "Mahdi Hamed",
  title: "Mahdi Hamed - Portfolio",
  description:
    "Founder & CEO of FrontServe AI, a voice order-taker for cafés and restaurants that understands Arabic and English. Software Architect with 5+ years building enterprise SaaS on Azure and ASP.NET Core.",
  url: "https://me.frontserveai.com",
  resumePath: "/Mahdi-Hamed-Resume.pdf",
  keywords: [
    "FrontServe AI",
    "Founder",
    "AI Engineer",
    "LLM",
    "Voice AI",
    "Software Architect",
    "Cloud Solutions Engineer",
    "Azure",
    "ASP.NET Core",
    "Microservices",
    "React",
    "Vue.js",
    "Flutter",
    "DevOps",
    "AI",
    "RAG",
  ],
  navItems: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#stack" },
    { label: "Credentials", href: "#credentials" },
    { label: "Contact", href: "#contact" },
  ],
  social: {
    email: "mahdidhan@gmail.com",
    phone: "+962 78 271 3481",
    linkedin: "https://www.linkedin.com/in/mahdihamed",
    github: "https://github.com/mahdidhan",
  },
} as const;

const currentJobs = portfolio.experience.filter((job) =>
  job.period.includes("Present"),
);

/** schema.org Person, built from portfolio data so it never drifts from the page. */
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  jobTitle: portfolio.title,
  description: portfolio.summary[0],
  url: siteConfig.url,
  image: `${siteConfig.url}/profile.jpg`,
  email: `mailto:${portfolio.contact.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amman",
    addressCountry: "JO",
  },
  worksFor: currentJobs.map((job) => ({
    "@type": "Organization",
    // "Wizard AI (part of Wizard Group, UK)" -> "Wizard AI"
    name: job.company.split(" (")[0],
  })),
  alumniOf: portfolio.education.map((edu) => ({
    "@type": "CollegeOrUniversity",
    name: edu.institution,
  })),
  // "Kubernetes, Helm" -> "Kubernetes", "Helm"
  knowsAbout: portfolio.stack.flatMap((tier) =>
    tier.items.flatMap((item) => item.name.split(/,\s*| and /)),
  ),
  knowsLanguage: portfolio.languages.map((language) => language.name),
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
};
