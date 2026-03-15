import * as THREE from 'three';

export const ROAD_WIDTH = 22;

// Track control points forming a closed loop circuit
const trackControlPoints = [
  new THREE.Vector3(0, 0, 150),
  new THREE.Vector3(0, 0, -100),
  new THREE.Vector3(0, 0, -300),
  new THREE.Vector3(100, 0, -460),
  new THREE.Vector3(300, 0, -520),
  new THREE.Vector3(500, 0, -460),
  new THREE.Vector3(580, 0, -300),
  new THREE.Vector3(580, 0, -100),
  new THREE.Vector3(520, 0, 60),
  new THREE.Vector3(380, 0, 140),
  new THREE.Vector3(200, 0, 180),
  new THREE.Vector3(80, 0, 200),
];

export const TRACK_CURVE = new THREE.CatmullRomCurve3(trackControlPoints, true, 'catmullrom', 0.3);
export const TRACK_SAMPLES = TRACK_CURVE.getSpacedPoints(400);
export const TRACK_LENGTH = TRACK_CURVE.getLength();

// Get position and direction on track at parameter t
export function getTrackPointAt(t: number) {
  const pos = TRACK_CURVE.getPointAt(t);
  const tangent = TRACK_CURVE.getTangentAt(t);
  const perp = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
  const rotation = Math.atan2(tangent.x, -tangent.z);
  return { pos, tangent, perp, rotation };
}

// Find closest point on track to a world position
export function findClosestTrackPoint(x: number, z: number): {
  distance: number;
  index: number;
  point: THREE.Vector3;
} {
  let minDist = Infinity;
  let closestIdx = 0;
  for (let i = 0; i < TRACK_SAMPLES.length; i++) {
    const dx = x - TRACK_SAMPLES[i].x;
    const dz = z - TRACK_SAMPLES[i].z;
    const d2 = dx * dx + dz * dz;
    if (d2 < minDist) {
      minDist = d2;
      closestIdx = i;
    }
  }
  return {
    distance: Math.sqrt(minDist),
    index: closestIdx,
    point: TRACK_SAMPLES[closestIdx],
  };
}

// Create road geometry along the curve
export function createRoadGeometry(
  curve: THREE.CatmullRomCurve3,
  width: number,
  segments: number,
  yOffset: number = 0.01
): THREE.BufferGeometry {
  const vertices: number[] = [];
  const indices: number[] = [];
  const normals: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = curve.getPointAt(t % 1);
    const tangent = curve.getTangentAt(t % 1);

    const perpX = -tangent.z;
    const perpZ = tangent.x;
    const len = Math.sqrt(perpX * perpX + perpZ * perpZ) || 1;
    const nx = perpX / len;
    const nz = perpZ / len;
    const halfW = width / 2;

    vertices.push(point.x - nx * halfW, yOffset, point.z - nz * halfW);
    normals.push(0, 1, 0);

    vertices.push(point.x + nx * halfW, yOffset, point.z + nz * halfW);
    normals.push(0, 1, 0);
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = (i + 1) * 2;
    const d = (i + 1) * 2 + 1;
    indices.push(a, c, b, b, c, d);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setIndex(indices);
  return geo;
}

// Project stops around the track
export interface ProjectStop {
  id: string;
  name: string;
  signName: string;
  description: string;
  t: number;
  passwordProtected?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  vizUrl?: string;
  techStack: string[];
}

export const PROJECT_STOPS: ProjectStop[] = [
  {
    id: 'week1-colabboard', name: 'Week 1 - CollabBoard', signName: 'CollabBoard',
    description: 'Real-time collaborative whiteboard application',
    t: 0.0, techStack: ['React', 'Next.js', 'TypeScript', 'Supabase'],
    liveUrl: 'https://claudeorim.vercel.app/', repoUrl: 'https://github.com/jpwilson/colabboard',
  },
  {
    id: 'week2-ghostfolio', name: 'Week 2 - Ghostfolio', signName: 'Ghostfolio',
    description: 'Open-source contribution to Ghostfolio investment tracker',
    t: 1 / 12, techStack: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://agent-folio-production.up.railway.app/', repoUrl: 'https://github.com/jpwilson/agent-folio',
  },
  {
    id: 'week3-legacylens', name: 'Week 3 - LegacyLens', signName: 'LegacyLens',
    description: 'AI-powered legacy code intelligence using RAG',
    t: 2 / 12, techStack: ['Python', 'Claude Haiku', 'Pinecone', 'FastAPI'],
    liveUrl: 'https://legacylens-production-e04c.up.railway.app/', repoUrl: 'https://github.com/jpwilson',
    vizUrl: 'https://legacylens-production-e04c.up.railway.app/graph.html',
  },
  {
    id: 'week4-nerdy', name: 'Week 4 - Nerdy', signName: 'Nerdy',
    description: 'AI Sesh Analysis, Content Creation, Low Latency Tutor',
    t: 3 / 12, techStack: ['TBD'],
  },
  {
    id: 'week4-gofundme', name: 'Week 4 - GoFundMe', signName: 'GoFundMe',
    description: 'GoFundMe project ideation and development',
    t: 4 / 12, techStack: ['TBD'],
    liveUrl: 'https://gfmv1.vercel.app', repoUrl: 'https://github.com/jpwilson/gfm-v1',
  },
  {
    id: 'week5-zapier', name: 'Week 5 - Zapier', signName: 'Zapier',
    description: 'Week 5 Gauntlet project - Zapier',
    t: 5 / 12, passwordProtected: true, techStack: ['TBD'],
  },
  {
    id: 'week5-skyfi', name: 'Week 5 - SkyFi', signName: 'SkyFi',
    description: 'Week 5 Gauntlet project - SkyFi',
    t: 6 / 12, passwordProtected: true, techStack: ['TBD'],
  },
  {
    id: 'week6-upstream-literacy', name: 'Week 6 - Upstream Literacy', signName: 'Upstream Literacy',
    description: 'Week 6 Gauntlet project - Upstream Literacy',
    t: 7 / 12, passwordProtected: true, techStack: ['TBD'],
  },
  {
    id: 'week6-servicecore', name: 'Week 6 - ServiceCore', signName: 'ServiceCore',
    description: 'Week 6 Gauntlet project - ServiceCore',
    t: 8 / 12, passwordProtected: true, techStack: ['TBD'],
  },
  {
    id: 'other-family-socials', name: 'Our Family Socials', signName: 'Family Socials',
    description: 'Family social media platform',
    t: 9 / 12, techStack: [], liveUrl: 'https://ourfamilysocials.com',
  },
  {
    id: 'other-ev-lineup', name: 'EV Lineup', signName: 'EV Lineup',
    description: 'Electric vehicle comparison and lineup tool',
    t: 10 / 12, techStack: [], liveUrl: 'https://www.evlineup.org',
  },
  {
    id: 'other-news-platform', name: 'News Platform', signName: 'News Platform',
    description: 'News aggregation and publishing platform',
    t: 11 / 12, techStack: [], liveUrl: 'https://newsplatform.org',
  },
];

// Ramps on straighter sections
export interface RampConfig {
  t: number;
  width: number;
  length: number;
  height: number;
}

export const RAMPS: RampConfig[] = [
  { t: 0.04, width: 12, length: 18, height: 4 },
  { t: 0.18, width: 10, length: 16, height: 5 },
  { t: 0.35, width: 12, length: 20, height: 6 },
  { t: 0.52, width: 10, length: 16, height: 4 },
  { t: 0.68, width: 14, length: 22, height: 7 },
  { t: 0.85, width: 10, length: 18, height: 5 },
];

// Speed boosts
export interface SpeedBoostConfig {
  t: number;
  lateralOffset: number;
}

export const SPEED_BOOSTS: SpeedBoostConfig[] = [
  { t: 0.02, lateralOffset: 0 },
  { t: 0.10, lateralOffset: -3 },
  { t: 0.22, lateralOffset: 3 },
  { t: 0.30, lateralOffset: 0 },
  { t: 0.42, lateralOffset: -3 },
  { t: 0.55, lateralOffset: 3 },
  { t: 0.62, lateralOffset: 0 },
  { t: 0.72, lateralOffset: -3 },
  { t: 0.80, lateralOffset: 3 },
  { t: 0.92, lateralOffset: 0 },
];

// Obstacles
export interface ObstacleConfig {
  t: number;
  lateralOffset: number;
  width: number;
}

export const OBSTACLES: ObstacleConfig[] = [
  { t: 0.06, lateralOffset: -5, width: 3 },
  { t: 0.07, lateralOffset: 4, width: 2 },
  { t: 0.15, lateralOffset: 3, width: 3 },
  { t: 0.20, lateralOffset: -4, width: 2 },
  { t: 0.28, lateralOffset: 5, width: 3 },
  { t: 0.38, lateralOffset: -3, width: 3 },
  { t: 0.45, lateralOffset: 4, width: 2 },
  { t: 0.50, lateralOffset: -5, width: 3 },
  { t: 0.58, lateralOffset: 3, width: 2 },
  { t: 0.65, lateralOffset: -4, width: 3 },
  { t: 0.75, lateralOffset: 5, width: 2 },
  { t: 0.82, lateralOffset: -3, width: 3 },
  { t: 0.88, lateralOffset: 4, width: 2 },
  { t: 0.95, lateralOffset: -5, width: 3 },
];

// Building generation
export interface BuildingConfig {
  x: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: string;
}

const NEON_COLORS = ['#ff00ff', '#00ffff', '#ff6600', '#ffff00', '#00ff88', '#ff0066', '#6600ff', '#0088ff'];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const BUILDINGS: BuildingConfig[] = (() => {
  const rand = seededRandom(42);
  const result: BuildingConfig[] = [];

  // Track center roughly at (290, -170) - generate buildings in that area
  for (let i = 0; i < 350; i++) {
    const x = (rand() - 0.3) * 900;
    const z = (rand() - 0.5) * 800;

    // Check distance to track
    let minDist = Infinity;
    for (let j = 0; j < TRACK_SAMPLES.length; j += 4) {
      const dx = x - TRACK_SAMPLES[j].x;
      const dz = z - TRACK_SAMPLES[j].z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minDist) minDist = dist;
    }

    // Only place if not too close to road but not too far
    if (minDist > ROAD_WIDTH / 2 + 8 && minDist < 250) {
      const nearRoad = minDist < 50;
      result.push({
        x, z,
        width: 3 + rand() * (nearRoad ? 15 : 10),
        height: nearRoad ? 8 + rand() * 60 : 4 + rand() * 25,
        depth: 3 + rand() * (nearRoad ? 15 : 10),
        color: NEON_COLORS[Math.floor(rand() * NEON_COLORS.length)],
      });
    }
  }
  return result;
})();
