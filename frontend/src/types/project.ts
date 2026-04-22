export type ProjectCategory = 'gauntlet' | 'other';

export interface SubFolder {
  name: string;
  subFolders?: SubFolder[];
  liveUrl?: string;
  repoUrl?: string;
}

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
  demoUrl?: string;
  vizUrl?: string;
  writeupUrl?: string;
  company?: string;
  video?: string;
  thumbnail?: string;
  screenshots?: string[];
  icon: string;
  createdAt: string;
  featured: boolean;
  highlights?: string[];
  challenges?: string;
  learnings?: string;
  spec?: string;
  passwordProtected?: boolean;
  subFolders?: SubFolder[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}
