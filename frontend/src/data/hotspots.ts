import { Hotspot } from '../types/scene';

const BASE = import.meta.env.BASE_URL;

/**
 * Width / height of the scene video frame (1264 x 720). The video is now the
 * canonical coordinate system; the poster JPEG is its exact first frame, so the
 * still -> video handoff is pixel-seamless. The stage element owns this ratio,
 * keeping hotspot percentages pixel-anchored at every viewport size.
 */
export const SCENE_ASPECT = 1264 / 720;

/**
 * The scene media: a 20s seamless ping-pong loop (the steed's wings spread,
 * then fold) with the first frame as poster/reduced-motion fallback.
 */
export const SCENE_MEDIA = {
  image: `${BASE}images/middle-earth.jpg`,
  video: `${BASE}videos/middle-earth.mp4` as string | undefined,
};

// Read once at load: CSS can't stop <video> playback, so reduced-motion users
// get the still poster instead of the autoplaying loop.
const PREFERS_STILL =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True when the living video plays — the CSS ambience layer stands down for it. */
export const SCENE_VIDEO_ACTIVE = Boolean(SCENE_MEDIA.video) && !PREFERS_STILL;

/**
 * The landmarks. Coordinates are % of the stage (x: left, y: top) — calibrated
 * against the video's first frame by cropping each box and visually verifying
 * the landmark fills it (the steed's box also contains its fully spread wings).
 * Re-tune anytime with `?debug` in the URL (outlines + grid).
 */
export const HOTSPOTS: readonly Hotspot[] = [
  {
    id: 'big-door',
    label: 'The Round Door',
    questText: 'The Gauntlet — every trial, bound in one burrow',
    shape: { x: 7, y: 57.5, w: 9, h: 14.5 },
    focus: { x: 11.5, y: 64.5, scale: 2.6 },
    target: { kind: 'panel', panel: 'gauntlet-projects' },
    order: 1,
  },
  {
    id: 'small-door',
    label: 'The Far Burrow',
    questText: 'Other adventures, dug into the far hill',
    shape: { x: 88, y: 61.4, w: 6, h: 9.5 },
    focus: { x: 91, y: 66, scale: 3.2 },
    target: { kind: 'panel', panel: 'other-projects' },
    order: 2,
  },
  {
    id: 'castle',
    label: 'The Citadel',
    questText: 'The tale of the traveler — who is JP Wilson?',
    shape: { x: 85, y: 21, w: 9, h: 13 },
    focus: { x: 89.5, y: 27.5, scale: 3.2 },
    target: { kind: 'panel', panel: 'about' },
    order: 3,
  },
  {
    id: 'oak-tree',
    label: 'The Elder Oak',
    questText: 'The Scroll — a record of deeds (resume)',
    shape: { x: 20, y: 10, w: 25, h: 38 },
    focus: { x: 32.5, y: 29, scale: 2.2 },
    target: { kind: 'panel', panel: 'resume' },
    order: 4,
  },
  {
    id: 'bridge',
    label: 'The Old Bridge',
    questText: 'Send a raven — get in touch',
    shape: { x: 51.5, y: 69, w: 12, h: 9.5 },
    focus: { x: 57.5, y: 73.5, scale: 3.0 },
    target: { kind: 'panel', panel: 'contact' },
    order: 5,
  },
  {
    id: 'horse',
    label: 'The Winged Steed',
    questText: 'A steed between worlds — older realms await',
    shape: { x: 63.5, y: 58, w: 18.5, h: 31 },
    focus: { x: 72.5, y: 73, scale: 2.4 },
    target: { kind: 'panel', panel: 'portals' },
    order: 6,
  },
  {
    id: 'moon',
    label: 'The Watching Moon',
    questText: 'It hums with old games…',
    shape: { x: 54.5, y: 1, w: 11.5, h: 23 },
    focus: { x: 60, y: 12, scale: 2.4 },
    target: { kind: 'panel', panel: 'moon-games' },
    order: 7,
  },
] as const;

export const getHotspot = (id: string | undefined): Hotspot | undefined =>
  HOTSPOTS.find((h) => h.id === id);
