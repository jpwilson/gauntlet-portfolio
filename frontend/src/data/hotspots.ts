import { Hotspot } from '../types/scene';

const BASE = import.meta.env.BASE_URL;

/**
 * Width / height of the scene artwork. The stage element owns this ratio, so
 * hotspot percentages stay pixel-anchored at every viewport size — and survive
 * the future img -> video swap as long as the video is rendered at the same frame.
 */
export const SCENE_ASPECT = 16 / 9;

/**
 * The scene media. To bring the scene to life later, generate a seamless video
 * loop of THIS EXACT frame and set `video` — nothing else needs to change.
 */
export const SCENE_MEDIA = {
  image: `${BASE}images/middle-earth.png`,
  video: undefined as string | undefined, // e.g. `${BASE}videos/middle-earth.webm`
};

/**
 * The landmarks. Coordinates are % of the stage (x: left, y: top).
 * Calibrate with `?debug` in the URL: outlines + a 10% grid are drawn over the art.
 */
export const HOTSPOTS: readonly Hotspot[] = [
  {
    id: 'big-door',
    label: 'The Round Door',
    questText: 'The Gauntlet — every trial, bound in one burrow',
    shape: { x: 4, y: 52, w: 13, h: 32 },
    focus: { x: 10, y: 66, scale: 2.6 },
    target: { kind: 'panel', panel: 'gauntlet-projects' },
    order: 1,
  },
  {
    id: 'small-door',
    label: 'The Far Burrow',
    questText: 'Other adventures, dug into the far hill',
    shape: { x: 84, y: 60, w: 9, h: 14 },
    focus: { x: 88, y: 66, scale: 3.2 },
    target: { kind: 'panel', panel: 'other-projects' },
    order: 2,
  },
  {
    id: 'castle',
    label: 'The Citadel',
    questText: 'The tale of the traveler — who is JP Wilson?',
    shape: { x: 73, y: 16, w: 12, h: 22 },
    focus: { x: 79, y: 26, scale: 3.0 },
    target: { kind: 'panel', panel: 'about' },
    order: 3,
  },
  {
    id: 'oak-tree',
    label: 'The Elder Oak',
    questText: 'The Scroll — a record of deeds (resume)',
    shape: { x: 20, y: 6, w: 26, h: 44 },
    focus: { x: 32, y: 26, scale: 2.2 },
    target: { kind: 'panel', panel: 'resume' },
    order: 4,
  },
  {
    id: 'bridge',
    label: 'The Old Bridge',
    questText: 'Send a raven — get in touch',
    shape: { x: 46, y: 68, w: 17, h: 13 },
    focus: { x: 54, y: 74, scale: 2.8 },
    target: { kind: 'panel', panel: 'contact' },
    order: 5,
  },
  {
    id: 'horse',
    label: 'The White Horse',
    questText: 'A steed between worlds — older realms await',
    shape: { x: 59, y: 68, w: 17, h: 22 },
    focus: { x: 67, y: 78, scale: 2.6 },
    target: { kind: 'panel', panel: 'portals' },
    order: 6,
  },
  {
    id: 'moon',
    label: 'The Watching Moon',
    questText: 'It hums with old games…',
    shape: { x: 50, y: 2, w: 17, h: 22 },
    focus: { x: 58, y: 12, scale: 2.4 },
    target: { kind: 'panel', panel: 'moon-games' },
    order: 7,
  },
] as const;

export const getHotspot = (id: string | undefined): Hotspot | undefined =>
  HOTSPOTS.find((h) => h.id === id);
