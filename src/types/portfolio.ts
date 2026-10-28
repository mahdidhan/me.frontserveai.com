import type { DiagramId } from "@/data/diagrams";

/** A headline number, e.g. { value: "40", label: "customer tenants on CyberShield" }. */
export interface Metric {
  value: string;
  label: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  /** One sentence on what the role covers, shown above the outcomes. */
  scope: string;
  /** Up to three results, set in large numerals. */
  outcomes: Metric[];
  /** Remaining detail, shown behind "More detail". */
  highlights: string[];
  tech?: string[];
}

export type ProjectStatus = "live" | "in-progress" | "closed";

export interface CaseStudy {
  /** Optional one-paragraph intro under the title. */
  summary?: string;
  problem: string;
  architecture: string[];
  outcomes: string[];
  /** Third column's heading; defaults to "Outcomes". */
  resultsHeading?: string;
  /** Link to the matching hero figure, e.g. "#hero". */
  figureHref?: string;
  /** Embed this explorable diagram in the case file. */
  diagram?: DiagramId;
}

export interface Project {
  title: string;
  role: string;
  /** Short form, e.g. "2025 – now". */
  period?: string;
  description: string;
  tech: string[];
  /** Company projects can't link to code or a live site. */
  ownership: "personal" | "company";
  status?: ProjectStatus;
  /** Rendered as the featured case file. Only one project should have it. */
  caseStudy?: CaseStudy;
  github?: string;
  demo?: string;
  website?: string;
  /** Not rendered until the content is filled in. */
  draft?: boolean;
}

export interface StackItem {
  name: string;
  /** Where it was used, shown beside the name. */
  usedIn?: string;
}

export interface StackTier {
  name: string;
  summary: string;
  items: StackItem[];
}

export interface Certification {
  name: string;
  provider: string;
  date: string;
  url: string;
  category: string;
  credentialId?: string;
}

export interface CertificationProvider {
  /** Must equal `Certification.provider` for the certs in this group. */
  name: string;
  summary: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  location: string;
  /** Short role line beside the name in the hero, e.g. "Founder & CEO, FrontServe AI". */
  role: string;
  /** Hero headline. */
  tagline: string;
  /** Hero sentence under the headline. */
  intro: string;
  /** Short availability line shown next to a status dot. */
  availability: string;
  /** Hero impact strip: four numbers. */
  impact: Metric[];
  /** Large opening line of the profile section. */
  lede: string;
  summary: string[];
  /** Small facts under the profile summary. Should not repeat `impact`. */
  facts: Metric[];
  stack: StackTier[];
  experience: Experience[];
  projects: Project[];
  certificationProviders: CertificationProvider[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
  contact: ContactInfo;
}
