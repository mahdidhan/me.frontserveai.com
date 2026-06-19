export const siteConfig = {
  name: "Mahdi Hamed",
  title: "Mahdi Hamed — Software Architect & Cloud Solutions Engineer",
  description:
    "Software Architect with 5+ years designing enterprise SaaS, cloud-native, and AI-enabled solutions. Azure, ASP.NET Core, React, Vue.js, Flutter.",
  url: "https://me.mandn.shop",
  resumePath: "/Mahdi-Hamed-Resume.pdf",
  ogImage: "/profile.png",
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
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  social: {
    email: "mahdidhan@gmail.com",
    phone: "+962 78 271 3481",
    linkedin: "https://www.linkedin.com/in/mahdi-hamed-4942b81b3",
    github: "https://github.com/mahdidhan",
  },
} as const;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Software Architect & Cloud Solutions Engineer",
  url: siteConfig.url,
  email: siteConfig.social.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amman",
    addressCountry: "Jordan",
  },
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
};
