import { Hotspot } from '../types/scene';

const BASE = import.meta.env.BASE_URL;

/**
 * Width / height of the scene artwork (1672 x 941). The stage element owns this
 * ratio, so hotspot percentages stay pixel-anchored at every viewport size — and
 * survive the future img -> video swap as long as the video renders the same frame.
 */
export const SCENE_ASPECT = 1672 / 941;

/**
 * The scene media. To bring the scene to life later, generate a seamless video
 * loop of THIS EXACT frame and set `video` — nothing else needs to change.
 */
export const SCENE_MEDIA = {
  image: `${BASE}images/middle-earth.jpg`,
  video: undefined as string | undefined, // e.g. `${BASE}videos/middle-earth.webm`
};

/**
 * The landmarks. Coordinates are % of the stage (x: left, y: top) — calibrated
 * against the 1672x941 artwork by cropping each box and visually verifying the
 * landmark fills it. Re-tune anytime with `?debug` in the URL (outlines + grid).
 */
export const HOTSPOTS: readonly Hotspot[] = [
  {
    id: 'big-door',
    label: 'The Round Door',
    questText: 'The Gauntlet — every trial, bound in one burrow',
    shape: { x: 6.5, y: 55, w: 10, h: 20 },
    focus: { x: 11.3, y: 65, scale: 2.6 },
    target: { kind: 'panel', panel: 'gauntlet-projects' },
    order: 1,
  },
  {
    id: 'small-door',
    label: 'The Far Burrow',
    questText: 'Other adventures, dug into the far hill',
    shape: { x: 88.5, y: 60.5, w: 6.5, h: 10 },
    focus: { x: 91.5, y: 65.5, scale: 3.2 },
    target: { kind: 'panel', panel: 'other-projects' },
    order: 2,
  },
  {
    id: 'castle',
    label: 'The Citadel',
    questText: 'The tale of the traveler — who is JP Wilson?',
    shape: { x: 84, y: 21, w: 10, h: 14 },
    focus: { x: 89, y: 28, scale: 3.2 },
    target: { kind: 'panel', panel: 'about' },
    order: 3,
  },
  {
    id: 'oak-tree',
    label: 'The Elder Oak',
    questText: 'The Scroll — a record of deeds (resume)',
    shape: { x: 22, y: 12, w: 24, h: 36 },
    focus: { x: 34, y: 30, scale: 2.2 },
    target: { kind: 'panel', panel: 'resume' },
    order: 4,
  },
  {
    id: 'bridge',
    label: 'The Old Bridge',
    questText: 'Send a raven — get in touch',
    shape: { x: 52.5, y: 68.5, w: 13.5, h: 10 },
    focus: { x: 59, y: 73, scale: 3.0 },
    target: { kind: 'panel', panel: 'contact' },
    order: 5,
  },
  {
    id: 'horse',
    label: 'The White Horse',
    questText: 'A steed between worlds — older realms await',
    shape: { x: 64, y: 67, w: 17, h: 20 },
    focus: { x: 72, y: 77, scale: 2.6 },
    target: { kind: 'panel', panel: 'portals' },
    order: 6,
  },
  {
    id: 'moon',
    label: 'The Watching Moon',
    questText: 'It hums with old games…',
    shape: { x: 53, y: 2, w: 13.5, h: 23 },
    focus: { x: 59.5, y: 13, scale: 2.4 },
    target: { kind: 'panel', panel: 'moon-games' },
    order: 7,
  },
] as const;

export const getHotspot = (id: string | undefined): Hotspot | undefined =>
  HOTSPOTS.find((h) => h.id === id);
