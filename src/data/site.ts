import { portfolio } from "@/data/portfolio";

export const siteConfig = {
  name: "Mahdi Hamed",
  title: "Mahdi Hamed - Portfolio",
  description:
    "Software Architect with 5+ years designing enterprise SaaS, cloud-native, and AI-enabled solutions. Azure, ASP.NET Core, React, Vue.js, Flutter.",
  url: "https://me.frontserveai.com",
  resumePath: "/Mahdi-Hamed-Resume.pdf",
  keywords: [
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
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
  social: {
    email: "mahdidhan@gmail.com",
    phone: "+962 78 271 3481",
    linkedin: "https://www.linkedin.com/in/mahdihamed",
    github: "https://github.com/mahdidhan",
  },
} as const;

const currentJob = portfolio.experience[0];

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
  worksFor: {
    "@type": "Organization",
    // "Wizard AI (part of Wizard Group, UK)" -> "Wizard AI"
    name: currentJob.company.split(" (")[0],
  },
  alumniOf: portfolio.education.map((edu) => ({
    "@type": "CollegeOrUniversity",
    name: edu.institution,
  })),
  knowsAbout: portfolio.skills.flatMap((category) => category.skills),
  knowsLanguage: portfolio.languages.map((language) => language.name),
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
};
