import { Hotspot } from '../types/scene';

const BASE = import.meta.env.BASE_URL;

/**
 * Width / height of the scene video frame (1264 x 720). The video is the
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
 * The three interactive landmarks, with plain functional labels — each walks
 * into an interior room. Coordinates are % of the stage (x: left, y: top),
 * calibrated against the video's first frame by cropping each box and visually
 * verifying the landmark fills it. Re-tune with `?debug` (outlines + grid).
 */
export const HOTSPOTS: readonly Hotspot[] = [
  {
    id: 'big-door',
    label: 'Portfolio Projects',
    questText: 'Step inside — every project, with writeups and links',
    shape: { x: 7, y: 57.5, w: 9, h: 14.5 },
    focus: { x: 11.5, y: 64.5, scale: 2.6 },
    target: { kind: 'room', room: 'hobbit-house' },
    order: 1,
  },
  {
    id: 'oak-tree',
    label: 'About Me',
    questText: 'Climb up — who I am, marathons and all',
    shape: { x: 20, y: 10, w: 25, h: 38 },
    focus: { x: 32.5, y: 29, scale: 2.2 },
    target: { kind: 'room', room: 'tree' },
    order: 2,
    labelBelow: true,
  },
  {
    id: 'castle',
    label: 'Resume & Contact',
    questText: 'The formal records — resume, email, GitHub, LinkedIn',
    shape: { x: 85, y: 21, w: 9, h: 13 },
    focus: { x: 89.5, y: 27.5, scale: 3.2 },
    target: { kind: 'room', room: 'castle' },
    order: 3,
    labelBelow: true,
  },
] as const;

export const getHotspot = (id: string | undefined): Hotspot | undefined =>
  HOTSPOTS.find((h) => h.id === id);
