// Road layout configuration for the synthwave racer portfolio

export interface ProjectStop {
  id: string;
  name: string;
  week?: number;
  description: string;
  z: number;
  passwordProtected?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  vizUrl?: string;
  category: string;
  techStack: string[];
}

export interface RampConfig {
  z: number;
  width: number;
  length: number;
  height: number;
}

export interface SpeedBoostConfig {
  x: number;
  z: number;
}

export interface ObstacleConfig {
  x: number;
  z: number;
  width: number;
}

export const ROAD_WIDTH = 20;
export const ROAD_LENGTH = 2900;

// All project stops along the road
export const PROJECT_STOPS: ProjectStop[] = [
  {
    id: 'week1-colabboard',
    name: 'Week 1 - CollabBoard',
    week: 1,
    description: 'Real-time collaborative whiteboard application',
    z: -200,
    category: 'gauntlet',
    techStack: ['React', 'Next.js', 'TypeScript', 'Supabase'],
    liveUrl: 'https://claudeorim.vercel.app/',
    repoUrl: 'https://github.com/jpwilson/colabboard',
  },
  {
    id: 'week2-ghostfolio',
    name: 'Week 2 - Ghostfolio',
    week: 2,
    description: 'Open-source contribution to Ghostfolio investment tracker',
    z: -450,
    category: 'gauntlet',
    techStack: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://agent-folio-production.up.railway.app/',
    repoUrl: 'https://github.com/jpwilson/agent-folio',
  },
  {
    id: 'week3-legacylens',
    name: 'Week 3 - LegacyLens',
    week: 3,
    description: 'AI-powered legacy code intelligence using RAG',
    z: -700,
    category: 'gauntlet',
    techStack: ['Python', 'Claude Haiku', 'Pinecone', 'FastAPI', 'RAG'],
    liveUrl: 'https://legacylens-production-e04c.up.railway.app/',
    repoUrl: 'https://github.com/jpwilson',
    vizUrl: 'https://legacylens-production-e04c.up.railway.app/graph.html',
  },
  {
    id: 'week4-nerdy',
    name: 'Week 4 - Nerdy',
    week: 4,
    description: 'AI Sesh Analysis, Content Creation, Low Latency Tutor',
    z: -950,
    category: 'gauntlet',
    techStack: ['TBD'],
  },
  {
    id: 'week4-gofundme',
    name: 'Week 4 - GoFundMe',
    week: 4,
    description: 'GoFundMe project ideation and development',
    z: -1150,
    category: 'gauntlet',
    techStack: ['TBD'],
    liveUrl: 'https://gfmv1.vercel.app',
    repoUrl: 'https://github.com/jpwilson/gfm-v1',
  },
  {
    id: 'week5-zapier',
    name: 'Week 5 - Zapier',
    week: 5,
    description: 'Week 5 Gauntlet project - Zapier',
    z: -1400,
    passwordProtected: true,
    category: 'gauntlet',
    techStack: ['TBD'],
  },
  {
    id: 'week5-skyfi',
    name: 'Week 5 - SkyFi',
    week: 5,
    description: 'Week 5 Gauntlet project - SkyFi',
    z: -1600,
    passwordProtected: true,
    category: 'gauntlet',
    techStack: ['TBD'],
  },
  {
    id: 'week6-upstream-literacy',
    name: 'Week 6 - Upstream Literacy',
    week: 6,
    description: 'Week 6 Gauntlet project - Upstream Literacy',
    z: -1850,
    passwordProtected: true,
    category: 'gauntlet',
    techStack: ['TBD'],
  },
  {
    id: 'week6-servicecore',
    name: 'Week 6 - ServiceCore',
    week: 6,
    description: 'Week 6 Gauntlet project - ServiceCore',
    z: -2050,
    passwordProtected: true,
    category: 'gauntlet',
    techStack: ['TBD'],
  },
  {
    id: 'other-family-socials',
    name: 'Our Family Socials',
    description: 'Family social media platform',
    z: -2300,
    category: 'other',
    techStack: [],
    liveUrl: 'https://ourfamilysocials.com',
  },
  {
    id: 'other-ev-lineup',
    name: 'EV Lineup',
    description: 'Electric vehicle comparison and lineup tool',
    z: -2500,
    category: 'other',
    techStack: [],
    liveUrl: 'https://www.evlineup.org',
  },
  {
    id: 'other-news-platform',
    name: 'News Platform',
    description: 'News aggregation and publishing platform',
    z: -2700,
    category: 'other',
    techStack: [],
    liveUrl: 'https://newsplatform.org',
  },
];

// Ramps placed between project stops
export const RAMPS: RampConfig[] = [
  { z: -320, width: 12, length: 20, height: 4 },
  { z: -570, width: 10, length: 18, height: 5 },
  { z: -830, width: 12, length: 22, height: 6 },
  { z: -1050, width: 10, length: 18, height: 4 },
  { z: -1280, width: 14, length: 25, height: 7 },
  { z: -1500, width: 10, length: 18, height: 5 },
  { z: -1730, width: 12, length: 20, height: 6 },
  { z: -1950, width: 10, length: 18, height: 4 },
  { z: -2180, width: 14, length: 25, height: 8 },
  { z: -2400, width: 10, length: 20, height: 5 },
  { z: -2600, width: 12, length: 22, height: 6 },
];

// Speed boosts on the road
export const SPEED_BOOSTS: SpeedBoostConfig[] = [
  { x: 0, z: -100 },
  { x: -3, z: -370 },
  { x: 3, z: -630 },
  { x: 0, z: -880 },
  { x: -3, z: -1100 },
  { x: 3, z: -1350 },
  { x: 0, z: -1550 },
  { x: -3, z: -1800 },
  { x: 3, z: -2000 },
  { x: 0, z: -2250 },
  { x: -3, z: -2450 },
  { x: 3, z: -2650 },
];

// Obstacles to dodge
export const OBSTACLES: ObstacleConfig[] = [
  { x: -4, z: -260, width: 3 },
  { x: 5, z: -280, width: 2 },
  { x: -3, z: -510, width: 4 },
  { x: 4, z: -530, width: 2 },
  { x: -5, z: -770, width: 3 },
  { x: 3, z: -790, width: 2 },
  { x: 0, z: -1000, width: 3 },
  { x: -4, z: -1020, width: 2 },
  { x: 5, z: -1230, width: 3 },
  { x: -3, z: -1250, width: 2 },
  { x: 4, z: -1460, width: 3 },
  { x: -5, z: -1480, width: 2 },
  { x: 3, z: -1680, width: 3 },
  { x: -4, z: -1700, width: 2 },
  { x: 0, z: -1910, width: 3 },
  { x: 5, z: -1930, width: 2 },
  { x: -3, z: -2130, width: 4 },
  { x: 4, z: -2150, width: 2 },
  { x: -5, z: -2360, width: 3 },
  { x: 3, z: -2560, width: 2 },
];

// Deterministic random for building/tree placement
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export interface BuildingConfig {
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: string;
}

const NEON_COLORS = ['#ff00ff', '#00ffff', '#ff6600', '#ffff00', '#00ff88', '#ff0066', '#6600ff'];

export const BUILDINGS: BuildingConfig[] = (() => {
  const rand = seededRandom(42);
  const result: BuildingConfig[] = [];
  for (let i = 0; i < 120; i++) {
    const z = -(rand() * ROAD_LENGTH);
    const side = i % 2 === 0 ? -1 : 1;
    result.push({
      x: side * (ROAD_WIDTH / 2 + 8 + rand() * 30),
      z,
      width: 3 + rand() * 10,
      height: 4 + rand() * 30,
      depth: 3 + rand() * 10,
      color: NEON_COLORS[Math.floor(rand() * NEON_COLORS.length)],
    });
  }
  return result;
})();
