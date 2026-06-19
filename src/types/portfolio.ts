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
  issuer: string;
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
  certifications: Certification[];
  education: Education[];
  languages: Language[];
  contact: ContactInfo;
}
