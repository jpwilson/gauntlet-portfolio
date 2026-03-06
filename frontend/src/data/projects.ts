import { Project, Category } from '../types/project';

// ============================================================
// PROJECT DATA
// Edit this file to add/update your portfolio projects!
// ============================================================

export const PROJECTS: Project[] = [
  // ---- GAUNTLET PROJECTS ----
  {
    id: 'week1-colabboard',
    name: 'CollabBoard',
    description: 'Real-time collaborative whiteboard application',
    longDescription:
      'A full-featured collaborative whiteboard built with Next.js, React, and Supabase. Supports real-time drawing, sticky notes, and multi-user collaboration with WebSocket-based sync.',
    category: 'gauntlet',
    week: 1,
    techStack: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    repoUrl: 'https://github.com/jpwilson/colabboard',
    liveUrl: 'https://claudeorim.vercel.app/',
    icon: 'folder',
    createdAt: '2025-02-16',
    featured: true,
    challenges:
      'Real-time synchronization across multiple clients, handling conflict resolution for concurrent edits.',
    learnings:
      'Deep dive into WebSocket management, Supabase real-time subscriptions, and optimistic UI updates.',
  },
  {
    id: 'week2-ghostfolio',
    name: 'Ghostfolio Contribution',
    description: 'Open-source contribution to Ghostfolio investment tracker',
    longDescription:
      'Contributed to the Ghostfolio open-source project, an investment portfolio tracker. Fixed bugs and added features to improve the user experience.',
    category: 'gauntlet',
    week: 2,
    techStack: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
    repoUrl: 'https://github.com/jpwilson/agent-folio',
    liveUrl: 'https://agent-folio-production.up.railway.app/',
    icon: 'folder',
    createdAt: '2025-02-23',
    featured: false,
    challenges:
      'Understanding a large existing codebase, working with Angular (new framework).',
    learnings:
      'Open-source contribution workflow, Angular patterns, working with financial data.',
  },
  {
    id: 'week3-legacylens',
    name: 'LegacyLens',
    description: 'AI-powered legacy code intelligence using RAG',
    longDescription:
      'LegacyLens is a Retrieval-Augmented Generation (RAG) system that helps developers query large, legacy codebases using natural language. Instead of manually searching through thousands of files, users ask plain English questions and receive precise answers with exact file and line citations. Built for the LAPACK Fortran codebase (116 MB, 1,750+ files, 2,376 indexed chunks). Achieves 92% precision@5, 94% term coverage, and 96% citation rate.',
    category: 'gauntlet',
    week: 3,
    techStack: ['Python', 'Claude Haiku', 'Voyage Code 3', 'Pinecone', 'FastAPI', 'RAG'],
    repoUrl: 'https://github.com/jpwilson',
    liveUrl: 'https://legacylens-production-e04c.up.railway.app/',
    vizUrl: 'https://legacylens-production-e04c.up.railway.app/graph.html',
    icon: 'folder',
    createdAt: '2025-03-02',
    featured: true,
    challenges:
      'Indexing and chunking a massive Fortran codebase effectively, tuning retrieval precision, balancing latency with answer quality.',
    learnings:
      'RAG pipeline architecture, vector embeddings for code, Pinecone vector database operations, prompt engineering for code Q&A.',
  },
  {
    id: 'week4-nerdy',
    name: 'Nerdy',
    description: 'Week 4 Gauntlet project - Nerdy',
    longDescription: 'Details coming soon.',
    category: 'gauntlet',
    week: 4,
    techStack: ['TBD'],
    icon: 'folder',
    createdAt: '2025-03-09',
    featured: false,
    passwordProtected: true,
  },
  {
    id: 'week4-gofundme',
    name: 'GoFundMe',
    description: 'Week 4 Gauntlet project - GoFundMe',
    longDescription: 'Details coming soon.',
    category: 'gauntlet',
    week: 4,
    techStack: ['TBD'],
    icon: 'folder',
    createdAt: '2025-03-09',
    featured: false,
    passwordProtected: true,
  },
  {
    id: 'week5-zapier',
    name: 'Zapier',
    description: 'Week 5 Gauntlet project - Zapier',
    longDescription: 'Details coming soon.',
    category: 'gauntlet',
    week: 5,
    techStack: ['TBD'],
    icon: 'folder',
    createdAt: '2025-03-16',
    featured: false,
    passwordProtected: true,
  },
  {
    id: 'week5-skyfi',
    name: 'SkyFi',
    description: 'Week 5 Gauntlet project - SkyFi',
    longDescription: 'Details coming soon.',
    category: 'gauntlet',
    week: 5,
    techStack: ['TBD'],
    icon: 'folder',
    createdAt: '2025-03-16',
    featured: false,
    passwordProtected: true,
  },
  {
    id: 'week6-upstream-literacy',
    name: 'Upstream Literacy',
    description: 'Week 6 Gauntlet project - Upstream Literacy',
    longDescription: 'Details coming soon.',
    category: 'gauntlet',
    week: 6,
    techStack: ['TBD'],
    icon: 'folder',
    createdAt: '2025-03-23',
    featured: false,
    passwordProtected: true,
  },
  {
    id: 'week6-servicecore',
    name: 'ServiceCore',
    description: 'Week 6 Gauntlet project - ServiceCore',
    longDescription: 'Details coming soon.',
    category: 'gauntlet',
    week: 6,
    techStack: ['TBD'],
    icon: 'folder',
    createdAt: '2025-03-23',
    featured: false,
    passwordProtected: true,
  },

  // ---- OTHER PROJECTS ----
  {
    id: 'other-family-socials',
    name: 'Our Family Socials',
    description: 'Family social media platform',
    longDescription: 'A social platform for families to connect and share.',
    category: 'other',
    techStack: [],
    liveUrl: 'https://ourfamilysocials.com',
    icon: 'internet',
    createdAt: '2024-06-01',
    featured: false,
  },
  {
    id: 'other-ev-lineup',
    name: 'EV Lineup',
    description: 'Electric vehicle comparison and lineup tool',
    longDescription: 'A comprehensive electric vehicle lineup and comparison platform.',
    category: 'other',
    techStack: [],
    liveUrl: 'https://www.evlineup.org',
    icon: 'internet',
    createdAt: '2024-09-15',
    featured: false,
  },
  {
    id: 'other-news-platform',
    name: 'News Platform',
    description: 'News aggregation and publishing platform',
    longDescription: 'A news platform for aggregating and publishing content.',
    category: 'other',
    techStack: [],
    liveUrl: 'https://newsplatform.org',
    icon: 'internet',
    createdAt: '2024-12-01',
    featured: false,
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'gauntlet',
    name: 'The Gauntlet',
    description: 'Projects built during The Gauntlet program',
    icon: 'folder',
  },
  {
    id: 'other',
    name: 'Other Projects',
    description: 'Personal and pre-Gauntlet projects',
    icon: 'folder',
  },
];

// Helper functions (replaces backend API calls)
export function getProjects(category?: string): Project[] {
  if (category) {
    return PROJECTS.filter((p) => p.category === category);
  }
  return PROJECTS;
}

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
