import { Project } from '../types/project';

const BASE = import.meta.env.BASE_URL;

// Single source of truth for project thumbnails.
// (Previously duplicated across ProjectsPage/AboutPage/ProjectDetailPage — the
// copies had drifted; this is the complete, canonical map.)
export const PROJECT_IMAGES: Record<string, string> = {
  'week1-colabboard': `${BASE}images/collabboard.png`,
  'week2-agentfolio': `${BASE}images/agent-folio.png`,
  'week3-legacylens': `${BASE}images/legacylens.png`,
  'week4-nerdy-live': `${BASE}images/nerdy-livesesh.png`,
  'week4-nerdy-tutor': `${BASE}images/nerdy-ai-tutor.png`,
  'week4-gofundme': `${BASE}images/gofundme.png`,
  'week5-zapier-triggers': `${BASE}images/triggers-api.png`,
  'week5-skyfi': `${BASE}images/skyfi.png`,
  'week6-upstream-community': `${BASE}images/upstreamliteracyleaders.png`,
  'week6-upstream-ecommerce': `${BASE}images/upstream-ecom.png`,
  'week6-servicecore': `${BASE}images/service-core.png`,
  'week6-equinox': `${BASE}images/peak6-equinox.png`,
  'week6-st6': `${BASE}images/st6-commit.png`,
  'week7-pilotbase': `${BASE}images/pilotbase.png`,
  'automattic': `${BASE}images/automattic.png`,
  'week9-terrafirma': `${BASE}images/terrafirma.png`,
  'other-tradeup': `${BASE}images/tradeup.png`,
  'other-family-socials': `${BASE}images/ourfamilysocials.png`,
  'other-ev-lineup': `${BASE}images/evlineup.png`,
  'other-news-platform': `${BASE}images/newsplatform.png`,
};

// Add project IDs here when a .gif version exists in public/images/
const GIF_PROJECTS = new Set<string>();

export const getImageById = (id: string): string => {
  const src = PROJECT_IMAGES[id];
  if (!src) return `${BASE}images/project-1.jpg`;
  if (GIF_PROJECTS.has(id)) return src.replace('.png', '.gif');
  return src;
};

export const img = (p: Project): string => {
  if (p.thumbnail) return p.thumbnail;
  return getImageById(p.id);
};
