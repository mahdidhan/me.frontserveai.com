import type { PortfolioData } from "@/types/portfolio";

export const portfolio: PortfolioData = {
  name: "Mahdi Hamed",
  title: "Software Architect · Cloud Solutions Engineer",
  location: "Amman, Jordan",
  tagline:
    "Designing scalable cloud-native systems, leading engineering teams, and delivering business-driven technology solutions.",
  summary: [
    "Software Architect with 5+ years of experience designing and delivering enterprise SaaS, cloud-native, and AI-enabled solutions. Experienced in software architecture, microservices, Azure cloud technologies, DevOps, and technical leadership, with a proven track record of leading engineering teams and delivering scalable business platforms across multiple industries.",
    "Specialized in ASP.NET Core, Azure, React, Vue.js, Flutter, and distributed systems architecture. Experienced in designing secure multi-tenant platforms, implementing CI/CD pipelines, optimizing application performance, and building AI-powered solutions leveraging LLMs, Retrieval-Augmented Generation (RAG), Semantic Search, and Agentic AI workflows.",
  ],
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Engineers Led", value: "8" },
    { label: "Focus Areas", value: "SaaS · Cloud · AI" },
  ],
  skills: [
    {
      name: "Architecture",
      skills: [
        "Software Architecture",
        "System Design",
        "Clean Architecture",
        "Microservices",
        "SaaS Architecture",
      ],
    },
    {
      name: "Backend",
      skills: [
        "ASP.NET Core",
        "C#",
        "Node.js",
        "NestJS",
        "REST APIs",
        "SignalR",
      ],
    },
    {
      name: "Frontend",
      skills: [
        "React",
        "Vue.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
      ],
    },
    {
      name: "Mobile",
      skills: [
        "Flutter",
        "Dart",
        "Android Deployment",
        "iOS Deployment",
      ],
    },
    {
      name: "Cloud",
      skills: [
        "Azure",
        "Azure DevOps",
        "CI/CD",
        "Docker",
        "Kubernetes",
        "Helm Charts",
      ],
    },
    {
      name: "Databases",
      skills: ["SQL Server", "MySQL", "Cosmos DB", "Firebase"],
    },
    {
      name: "Security",
      skills: [
        "Microsoft Entra ID",
        "OAuth2",
        "OpenID Connect",
        "IAM",
        "Defender",
        "Sentinel",
      ],
    },
    {
      name: "AI",
      skills: [
        "LLMs",
        "RAG",
        "Prompt Engineering",
        "Agentic AI",
        "Semantic Search",
      ],
    },
  ],
  experience: [
    {
      company: "Wizard AI (UK Company)",
      role: "Software Architect",
      period: "May 2025 – Present",
      location: "Amman, Jordan",
      highlights: [
        "Architected cloud-native SaaS platforms using ASP.NET Core Microservices, Azure Services, and Vue.js.",
        "Led a team of 8 engineers delivering enterprise cybersecurity and business solutions.",
        "Designed secure multi-tenant architectures integrated with Microsoft Entra ID, Defender, Sentinel, and IAM services.",
        "Implemented Azure DevOps CI/CD pipelines and performance optimizations, reducing deployment times by 30% and improving response times by 60%.",
      ],
      tech: [
        "ASP.NET Core",
        "Azure",
        "Vue.js",
        "Microservices",
        "Entra ID",
        "Azure DevOps",
      ],
    },
    {
      company: "Wizard AI (UK Company)",
      role: "Senior Full Stack Developer",
      period: "Jun 2024 – May 2025",
      location: "Amman, Jordan",
      highlights: [
        "Developed enterprise portals and ticketing systems using ASP.NET Core, React, JavaScript, HTML, and CSS.",
        "Built integrations with Microsoft security, identity management, and Azure cloud services.",
        "Contributed to Azure DevOps CI/CD pipelines, automated deployments, and testing processes.",
        "Collaborated with architects, stakeholders, and product owners to deliver scalable business solutions.",
      ],
      tech: ["ASP.NET Core", "React", "Azure", "Azure DevOps"],
    },
    {
      company: "Awael Technologies",
      role: "Software Development Team Leader",
      period: "May 2023 – Jun 2024",
      location: "Amman, Jordan",
      highlights: [
        "Led a team of 3 engineers delivering mobile and web applications using Agile methodologies.",
        "Managed project planning, sprint execution, stakeholder communication, and solution demonstrations.",
        "Designed software architectures and technical solutions for enterprise and business applications.",
        "Oversaw application delivery, deployment, and post-release support across Android and iOS platforms.",
      ],
      tech: ["Agile", "Flutter", "Architecture", "Mobile", "Web"],
    },
    {
      company: "Awael Technologies",
      role: "Flutter Developer",
      period: "Jul 2021 – May 2023",
      location: "Amman, Jordan",
      highlights: [
        "Developed cross-platform mobile applications using Flutter and Dart for HR, Accounting, Inventory, Education, and Van Sales domains.",
        "Built and integrated ASP.NET Core and Node.js APIs with SQL Server, MySQL, and Firebase.",
        "Managed App Store and Google Play deployments for multiple production applications.",
      ],
      tech: ["Flutter", "Dart", "ASP.NET Core", "Node.js", "Firebase"],
    },
  ],
  projects: [
    {
      title: "Cyber Security Portal",
      role: "Software Architect / Technical Lead",
      description:
        "Designed and led the development of an enterprise incident management platform integrated with Microsoft Sentinel, Microsoft Entra ID, and Azure cloud services.",
      tech: [
        "ASP.NET Core Microservices",
        "Vue.js",
        "Azure Service Bus",
        "Cosmos DB",
      ],
      featured: true,
    },
    {
      title: "CRM & Ticketing Systems",
      role: "Lead Developer",
      description:
        "Delivered enterprise CRM and Ticketing solutions using ASP.NET Core and Clean Architecture, featuring customer management, workflow automation, and reporting capabilities.",
      tech: ["ASP.NET Core", "Clean Architecture", "SQL Server"],
      featured: true,
    },
    {
      title: "First Chance",
      role: "Founder & Product Owner",
      description:
        "Founded and led the development of a car buying and rental platform built with Flutter and ASP.NET Core, overseeing product strategy, architecture, and deployment.",
      tech: ["Flutter", "ASP.NET Core", "Product Strategy"],
      featured: true,
    },
    {
      title: "Automate",
      role: "Lead Mobile Developer",
      description:
        "Developed a taxi and towing platform using Flutter and NestJS, delivering mobile applications and backend integrations.",
      tech: ["Flutter", "NestJS", "REST APIs"],
      featured: true,
    },
  ],
  certifications: [
    {
      name: "Project Management Professional Certificate",
      issuer: "Google (Coursera)",
    },
    {
      name: "Generative AI for Software Development",
      issuer: "DeepLearning.AI",
    },
    {
      name: "Retrieval-Augmented Generation (RAG)",
      issuer: "DeepLearning.AI",
    },
    {
      name: "Agentic AI",
      issuer: "DeepLearning.AI",
    },
    {
      name: "AI Prompting for Everyone",
      issuer: "DeepLearning.AI",
    },
  ],
  education: [
    {
      institution: "Princess Sumaya University for Technology (PSUT)",
      degree: "Bachelor of Computer Science",
      period: "2019 – 2021",
      location: "Amman, Jordan",
      details:
        "Transferred from University College Sedaya International (UCSI), Kuala Lumpur, Malaysia (2017 – 2018).",
    },
  ],
  languages: [
    { name: "Arabic", proficiency: "Native" },
    { name: "English", proficiency: "Professional Working Proficiency" },
  ],
  contact: {
    email: "mahdidhan@gmail.com",
    phone: "+962 78 271 3481",
    linkedin: "https://www.linkedin.com/in/mahdi-hamed-4942b81b3",
    github: "https://github.com/mahdidhan",
  },
};
