// Types for the Middle-earth explorable scene.
// All coordinates are percentages (0–100) of the fixed-aspect scene stage:
// x = % of stage width from the left, y = % of stage height from the top.

export type HotspotId = 'big-door' | 'oak-tree' | 'castle';

export type RoomId = 'hobbit-house' | 'tree' | 'castle';

/** Bounding box in stage-%. Optional clipPath (in % of the box itself) for irregular outlines. */
export interface HotspotShape {
  x: number;
  y: number;
  w: number;
  h: number;
  clipPath?: string;
}

export type HotspotTarget =
  | { kind: 'room'; room: RoomId }
  | { kind: 'route'; to: string };

export interface Hotspot {
  id: HotspotId;
  /** Plain, functional label — says what you GET, not what it looks like. */
  label: string;
  /** One-line description for the quest log + aria-label. */
  questText: string;
  shape: HotspotShape;
  /** Door-open zoom: transform-origin (stage-%) and scale factor. */
  focus: { x: number; y: number; scale: number };
  target: HotspotTarget;
  /** Tab order and quest-log order. */
  order: number;
  /** Render the floating label below the box (for landmarks near the top edge). */
  labelBelow?: boolean;
}

export type RoomContent = 'projects' | 'about' | 'resume-contact';

export interface Room {
  id: RoomId;
  /** Title shown on the room's plaque. */
  title: string;
  subtitle: string;
  image: string;
  aspect: number;
  content: RoomContent;
}
