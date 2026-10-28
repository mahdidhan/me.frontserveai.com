export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tech?: string[];
}

export interface Project {
  title: string;
  role: string;
  description: string;
  tech: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Certification {
  name: string;
  provider: string;
  date: string;
  url: string;
  category: string;
  credentialId?: string;
}

export type Accent = "violet" | "cyan";

export interface CertificationProvider {
  /** Must equal `Certification.provider` for the certs in this group. */
  name: string;
  /** Short text shown in the provider's logo tile, e.g. "AI". */
  mark: string;
  /** Pill labels shown above the group name, e.g. ["Google", "Coursera"]. */
  labels: string[];
  summary: string;
  accent: Accent;
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
  tagline: string;
  summary: string[];
  stats: { label: string; value: string }[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  certificationProviders: CertificationProvider[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
  contact: ContactInfo;
}
