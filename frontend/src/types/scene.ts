// Types for the Middle-earth explorable scene.
// All coordinates are percentages (0–100) of the fixed-aspect scene stage:
// x = % of stage width from the left, y = % of stage height from the top.

export type HotspotId =
  | 'big-door'
  | 'small-door'
  | 'oak-tree'
  | 'castle'
  | 'bridge'
  | 'horse'
  | 'moon';

export type PanelId =
  | 'gauntlet-projects'
  | 'other-projects'
  | 'about'
  | 'contact'
  | 'resume'
  | 'portals'
  | 'moon-games';

/** Bounding box in stage-%. Optional clipPath (in % of the box itself) for irregular outlines. */
export interface HotspotShape {
  x: number;
  y: number;
  w: number;
  h: number;
  clipPath?: string;
}

export type HotspotTarget =
  | { kind: 'panel'; panel: PanelId }
  | { kind: 'route'; to: string };

export interface Hotspot {
  id: HotspotId;
  /** Short in-world name, shown as the floating label. */
  label: string;
  /** One-line description for the quest log + aria-label. */
  questText: string;
  shape: HotspotShape;
  /** Door-open zoom: transform-origin (stage-%) and scale factor. */
  focus: { x: number; y: number; scale: number };
  target: HotspotTarget;
  /** Tab order and quest-log order. */
  order: number;
}
