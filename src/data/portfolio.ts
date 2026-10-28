import type { PortfolioData } from "@/types/portfolio";

export const portfolio: PortfolioData = {
  name: "Mahdi Hamed",
  title: "Founder & CEO of FrontServe AI, and Software Architect",
  location: "Amman, Jordan",
  role: "Founder & CEO, FrontServe AI",
  tagline:
    "I'm building FrontServe AI, a voice order-taker that understands Arabic and English.",
  intro:
    "It takes orders at the counter for cafés, bakeries, juice bars and quick-service restaurants. I'm also a Software Architect at Wizard AI, where I lead cloud platforms on Azure, based in Amman, Jordan.",
  availability:
    "Open to senior, lead, architect, AI engineering and cloud roles",
  impact: [
    { value: "ar + en", label: "orders in Arabic, English or a mix of both" },
    { value: "2", label: "model calls per turn: understand, then reply" },
    { value: "0", label: "prices set by the model; code sets every number" },
    { value: "5+", label: "years building enterprise SaaS on .NET and Azure" },
  ],
  lede: "I build software that real businesses run on: an AI order-taker for counters in Jordan, and a 24/7 security platform for 40 customer tenants.",
  summary: [
    "I'm the founder and CEO of FrontServe AI, an AI order-taker for cafés, bakeries, juice bars and quick-service restaurants in Jordan and the wider Arabic-speaking market. It has a public demo and is looking for its first pilot stores.",
    "I'm also a software architect with 5+ years building enterprise SaaS on ASP.NET Core and Azure. At Wizard AI I own the architecture and delivery of CyberShield, a 24/7 security operations platform, and lead a team of 8 engineers in the Philippines.",
  ],
  facts: [
    { value: "40", label: "Customer tenants on CyberShield" },
    { value: "8", label: "Engineers I lead at Wizard AI" },
    { value: "−30%", label: "Deployment time after my CI/CD rebuild" },
  ],
  stack: [
    {
      name: "Daily",
      summary: "In production at Wizard AI now",
      items: [
        { name: "ASP.NET Core, C#", usedIn: "CyberShield" },
        { name: "Azure", usedIn: "CyberShield" },
        { name: "Kubernetes, Helm", usedIn: "CyberShield" },
        { name: "Vue 3, TypeScript", usedIn: "front-end v3" },
        { name: "Cosmos DB, Azure SQL", usedIn: "CyberShield" },
        { name: "Azure DevOps CI/CD", usedIn: "−30% deploy time" },
        { name: "Entra ID, OAuth2, OpenID Connect", usedIn: "single sign-on" },
        { name: "Defender, Sentinel", usedIn: "incident signals" },
      ],
    },
    {
      name: "Shipped in production",
      summary: "Delivered in earlier roles and client work",
      items: [
        { name: "React", usedIn: "support portal" },
        { name: "Azure Cache for Redis", usedIn: "support portal" },
        { name: "Flutter, Dart", usedIn: "~15 client apps" },
        { name: "Node.js, NestJS", usedIn: "Awael, Automate" },
        { name: "SQL Server, MySQL", usedIn: "Awael" },
        { name: "Firebase", usedIn: "Awael" },
        { name: "SignalR", usedIn: "real-time updates" },
        { name: "Docker", usedIn: "every service" },
      ],
    },
    {
      name: "Building now",
      summary: "On FrontServe AI, my own product",
      items: [
        { name: "Python, FastAPI, Pydantic", usedIn: "FrontServe AI" },
        { name: "LLMs: Claude, GPT, Qwen", usedIn: "FrontServe AI" },
        { name: "RAG, pgvector, hybrid search", usedIn: "FrontServe AI" },
        { name: "Speech-to-text, text-to-speech", usedIn: "FrontServe AI" },
        { name: "LLM evals", usedIn: "FrontServe AI" },
        { name: "Agentic AI", usedIn: "DeepLearning.AI" },
      ],
    },
  ],
  experience: [
    {
      company: "FrontServe AI",
      role: "Founder & CEO",
      period: "2026 – Present",
      location: "Amman, Jordan",
      scope:
        "I founded FrontServe AI and design and build the product: an AI order-taker for counters in Jordan and the wider Arabic-speaking market.",
      outcomes: [
        {
          value: "Demo",
          label: "public demo live, looking for the first pilot stores",
        },
        {
          value: "ar + en",
          label: "spoken orders in Arabic, English or a mix of both",
        },
        {
          value: "1",
          label: "suggestion at a time, based on the owner's rules",
        },
      ],
      highlights: [
        "Designed the architecture: a FastAPI service where code drives the conversation and the order engine is the source of truth, with one model call to understand each message and one to phrase the reply.",
        "Built hybrid menu retrieval on PostgreSQL: pgvector with bge-m3 embeddings plus pg_trgm trigram search, merged with reciprocal rank fusion.",
        "Made models and voices swappable per store, and chose speech providers through a bake-off on real Jordanian Arabic recordings.",
        "Set up quality checks: strict mypy, pytest, and an eval suite of YAML conversation scenarios replayed against the live model.",
      ],
      tech: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "pgvector",
        "Claude Haiku 5.5",
        "Next.js",
      ],
    },
    {
      company: "Wizard AI (part of Wizard Group, UK)",
      role: "Software Architect",
      period: "May 2025 – Present",
      location: "Amman, Jordan",
      scope:
        "I own the architecture and delivery of CyberShield and lead 8 engineers in the Philippines, working daily with stakeholders in the UK.",
      outcomes: [
        {
          value: "40",
          label:
            "customer tenants, plus 100 internal users, on a 24/7 platform",
        },
        {
          value: "−30%",
          label: "deployment time after rebuilding CI/CD in Azure DevOps",
        },
        { value: "60%", label: "improvement in response times" },
      ],
      highlights: [
        "Delivered CyberShield front-end v3 (Vue 3, TypeScript) and refactored the ASP.NET Core microservices, database layer and Helm charts.",
        "Designed Azure integrations ingesting support mailboxes into Cosmos DB and incident entities into a Cosmos DB graph.",
        "Lead and mentor the team, working daily with stakeholders in the UK.",
      ],
      tech: [
        "ASP.NET Core",
        "Vue 3",
        "TypeScript",
        "Azure Cosmos DB",
        "Helm",
        "Azure DevOps",
      ],
    },
    {
      company: "Wizard AI (part of Wizard Group, UK)",
      role: "Senior Full Stack Developer",
      period: "Jun 2024 – May 2025",
      location: "Amman, Jordan",
      scope:
        "I ran the Technical Support portal (an ASP.NET monolith with React and TypeScript), covering development, releases and support, until my promotion.",
      outcomes: [
        {
          value: "Redis",
          label:
            "caching across the whole system, for much faster API responses",
        },
        {
          value: "SQL",
          label: "query and index tuning that removed lag across most pages",
        },
        {
          value: "Entra ID",
          label: "integrations with Microsoft security services and Azure",
        },
      ],
      highlights: [
        "Added server-side pagination and lazy loading to the slowest pages.",
        "Contributed to CI/CD pipelines, automated deployments and testing in Azure DevOps.",
      ],
      tech: [
        "ASP.NET",
        "React",
        "TypeScript",
        "Azure Cache for Redis",
        "Microsoft Entra ID",
        "Azure DevOps",
      ],
    },
    {
      company: "Awael Technologies",
      role: "Software Developer",
      period: "Jul 2021 – Jun 2024",
      location: "Amman, Jordan",
      scope:
        "I built custom business apps for clients across mobile, web and APIs, and led a team from May 2023.",
      outcomes: [
        {
          value: "~15",
          label:
            "business apps: e-commerce, delivery, inventory, accounting, HR",
        },
        {
          value: "3",
          label: "engineers led, running sprints, client calls and demos",
        },
        {
          value: "3",
          label: "app stores: Google Play, App Store and Huawei AppGallery",
        },
      ],
      highlights: [
        "Built cross-platform apps in Flutter and Dart, with ASP.NET Core and Node.js APIs on SQL Server, MySQL and Firebase.",
        "Designed app architectures and admin portals, deployed on IIS.",
        "Handled publishing and post-release support for every app.",
      ],
      tech: [
        "Flutter",
        "Dart",
        "ASP.NET Core",
        "Node.js",
        "SQL Server",
        "MySQL",
        "Firebase",
        "IIS",
      ],
    },
  ],
  projects: [
    {
      title: "FrontServe AI",
      role: "Founder & CEO",
      period: "2026 – now",
      ownership: "personal",
      status: "in-progress",
      description:
        "An AI order-taker for the counter at cafés, bakeries, juice bars and quick-service restaurants in Jordan and the wider Arabic-speaking market.",
      caseStudy: {
        summary:
          "An AI order-taker for the counter at cafés, bakeries, juice bars and quick-service restaurants in Jordan and the wider Arabic-speaking market. Customers order out loud in Arabic, English or a mix of both, and it reads the order back before confirming.",
        problem:
          "Counter orders come in spoken Arabic, English or both at once, against each store's own menu, stock and prices. The model has to understand the customer, but it must never be the one deciding a price, a total or whether something is in stock.",
        architecture: [
          "Python 3.12 and FastAPI, with async SQLAlchemy 2 on PostgreSQL. Each store picks a model profile: Claude Haiku 5.5 by default, gpt-5-mini as fallback, or a local Qwen3 8B.",
          "Two model calls per turn, one to understand the message and one to phrase the reply. Code drives the conversation, and the order engine sets every price, total and stock check.",
          "Hybrid menu retrieval: pgvector with bge-m3 embeddings plus pg_trgm trigram search, merged with reciprocal rank fusion, falling back to trigram-only search.",
        ],
        resultsHeading: "Where it stands",
        figureHref: "#hero",
        outcomes: [
          "In development, with a public demo live. Looking for its first pilot stores.",
          "Speech providers chosen through a bake-off on real Jordanian Arabic recordings.",
          "Strict mypy, pytest, and an eval suite of YAML conversation scenarios replayed against the live model.",
        ],
      },
      tech: [
        "Python",
        "FastAPI",
        "PostgreSQL with pgvector",
        "Claude Haiku 5.5",
        "Next.js",
        "Fly.io",
        "Neon",
      ],
      website: "https://frontserveai.com",
      demo: "https://frontserveai.com/demo",
    },
    {
      title: "CyberShield",
      role: "Software Architect and technical lead",
      period: "2025 – now",
      ownership: "company",
      status: "live",
      description:
        "A 24/7 real-time platform for Microsoft Defender and Sentinel incidents and support tickets, serving 40 customer tenants and 100 internal users.",
      caseStudy: {
        problem:
          "Security teams for 40 customer tenants need Defender and Sentinel incidents, plus support tickets from shared mailboxes, handled in one place, in real time, 24/7.",
        architecture: [
          "ASP.NET Core microservices talking over gRPC, on Kubernetes with Helm.",
          "A Vue 3 and TypeScript front end (v3, which I delivered), behind Entra ID single sign-on.",
          "Azure SQL, Cosmos DB, and a Cosmos DB graph for incident entities.",
        ],
        outcomes: [
          "Deployment time down 30% with Azure DevOps pipelines.",
          "Response times improved by 60%.",
          "Support mailboxes ingested automatically through Microsoft Graph.",
        ],
        diagram: "cybershield",
      },
      tech: [
        "ASP.NET Core",
        "gRPC",
        "Vue 3",
        "Kubernetes",
        "Helm",
        "Azure Service Bus",
        "Cosmos DB",
      ],
    },
    {
      title: "CRM and Ticketing Systems",
      role: "Lead Developer",
      ownership: "company",
      description:
        "Enterprise CRM and ticketing solutions built with ASP.NET Core and Clean Architecture, covering customer management, workflow automation and reporting.",
      tech: ["ASP.NET Core", "Clean Architecture", "SQL Server"],
    },
    {
      title: "First Chance",
      role: "Founder and Product Owner",
      ownership: "personal",
      status: "closed",
      description:
        "A car buying and rental mobile app I founded and led, built with Flutter and ASP.NET Core. I owned product strategy, architecture and deployment. The service has since closed.",
      tech: ["Flutter", "ASP.NET Core"],
    },
    {
      title: "Automate",
      role: "Lead Mobile Developer",
      ownership: "company",
      description:
        "A taxi and towing platform. I led the Flutter mobile apps and their NestJS backend integrations.",
      tech: ["Flutter", "NestJS", "REST APIs"],
    },
  ],
  certificationProviders: [
    {
      name: "DeepLearning.AI",
      summary:
        "Applied AI credentials across software design, agentic systems, RAG, and prompting.",
    },
    {
      name: "Google / Coursera",
      summary:
        "Project management credentials covering Agile delivery, planning, execution, and capstone work.",
    },
  ],
  certifications: [
    {
      name: "AI-Powered Software and System Design",
      provider: "DeepLearning.AI",
      date: "June 2026",
      category: "AI & Software Engineering",
      credentialId: "32c34894-f937-4e08-8800-9b0e9f8bd468",
      url: "https://learn.deeplearning.ai/certificates/32c34894-f937-4e08-8800-9b0e9f8bd468",
    },
    {
      name: "Team Software Engineering with AI",
      provider: "DeepLearning.AI",
      date: "June 2026",
      category: "AI & Software Engineering",
      credentialId: "24f1b3e6-42f5-4eed-a25b-64106ba549de",
      url: "https://learn.deeplearning.ai/certificates/24f1b3e6-42f5-4eed-a25b-64106ba549de",
    },
    {
      name: "Generative AI for Software Development",
      provider: "DeepLearning.AI",
      date: "June 2026",
      category: "AI & Software Engineering",
      credentialId: "6375e2d4-8f82-4892-a35b-b3a70cd79bd8",
      url: "https://learn.deeplearning.ai/certificates/6375e2d4-8f82-4892-a35b-b3a70cd79bd8",
    },
    {
      name: "Agentic AI",
      provider: "DeepLearning.AI",
      date: "June 2026",
      category: "AI & Software Engineering",
      credentialId: "f5ff5141-8e26-4c54-b1c8-c5debb0da759",
      url: "https://learn.deeplearning.ai/certificates/f5ff5141-8e26-4c54-b1c8-c5debb0da759",
    },
    {
      name: "Retrieval Augmented Generation (RAG)",
      provider: "DeepLearning.AI",
      date: "June 2026",
      category: "AI & Software Engineering",
      credentialId: "6228dfb0-b40f-4699-9eac-322980a3cdda",
      url: "https://learn.deeplearning.ai/certificates/6228dfb0-b40f-4699-9eac-322980a3cdda",
    },
    {
      name: "AI Prompting for Everyone",
      provider: "DeepLearning.AI",
      date: "June 2026",
      category: "AI & Software Engineering",
      credentialId: "57256de9-a923-4815-a3ce-fda1cc32aece",
      url: "https://learn.deeplearning.ai/certificates/57256de9-a923-4815-a3ce-fda1cc32aece",
    },
    {
      name: "Introduction to Generative AI for Software Development",
      provider: "DeepLearning.AI",
      date: "June 2026",
      category: "AI & Software Engineering",
      credentialId: "bff61781-62f7-44b7-b133-fcacc118a373",
      url: "https://learn.deeplearning.ai/certificates/bff61781-62f7-44b7-b133-fcacc118a373",
    },
    {
      name: "Capstone: Applying Project Management in the Real World",
      provider: "Google / Coursera",
      date: "April 2024",
      category: "Project Management",
      credentialId: "4KAZAVKEPTV9",
      url: "https://www.coursera.org/account/accomplishments/records/4KAZAVKEPTV9",
    },
    {
      name: "Google Project Management: Specialization",
      provider: "Google / Coursera",
      date: "April 2024",
      category: "Project Management",
      credentialId: "HFAX92YQ5YG2",
      url: "https://www.coursera.org/account/accomplishments/specialization/HFAX92YQ5YG2",
    },
    {
      name: "Google Project Management Certificate",
      provider: "Google / Coursera",
      date: "April 2024",
      category: "Project Management",
      credentialId: "a8ec9e96-20b8-49a7-b8b8-03f9a0b1f348",
      url: "https://www.credly.com/badges/a8ec9e96-20b8-49a7-b8b8-03f9a0b1f348/linked_in_profile",
    },
    {
      name: "Project Execution: Running the Project",
      provider: "Google / Coursera",
      date: "April 2024",
      category: "Project Management",
      credentialId: "EX926EM7HLC6",
      url: "https://www.coursera.org/account/accomplishments/records/EX926EM7HLC6",
    },
    {
      name: "Project Planning: Putting It All Together",
      provider: "Google / Coursera",
      date: "April 2024",
      category: "Project Management",
      credentialId: "HZVQAJHGB37P",
      url: "https://www.coursera.org/account/accomplishments/records/HZVQAJHGB37P",
    },
    {
      name: "Project Initiation: Starting a Successful Project",
      provider: "Google / Coursera",
      date: "April 2024",
      category: "Project Management",
      credentialId: "WQDXSBKBWXMD",
      url: "https://www.coursera.org/account/accomplishments/records/WQDXSBKBWXMD",
    },
    {
      name: "Agile Project Management",
      provider: "Google / Coursera",
      date: "April 2024",
      category: "Project Management",
      credentialId: "XMQQRKEY74YC",
      url: "https://www.coursera.org/account/accomplishments/records/XMQQRKEY74YC",
    },
    {
      name: "Foundations of Project Management",
      provider: "Google / Coursera",
      date: "April 2024",
      category: "Project Management",
      credentialId: "MFFRWYBNTVPG",
      url: "https://www.coursera.org/account/accomplishments/records/MFFRWYBNTVPG",
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
    linkedin: "https://www.linkedin.com/in/mahdihamed",
    github: "https://github.com/mahdidhan",
  },
};
