export type ProjectCategory = 'gauntlet' | 'other';

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  week?: number;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  vizUrl?: string;
  writeupUrl?: string;
  thumbnail?: string;
  screenshots?: string[];
  icon: string;
  createdAt: string;
  featured: boolean;
  challenges?: string;
  learnings?: string;
  passwordProtected?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}
