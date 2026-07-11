import React from 'react';
import { Link } from 'react-router-dom';
import { HOTSPOTS } from '../../data/hotspots';
import { roomPath } from '../../data/rooms';
import { Hotspot, HotspotId } from '../../types/scene';

// Pre-warm the lazy room chunk the moment a visitor shows intent, so entering
// never waits on the network. import() is cached — firing it again is free.
let prewarmed = false;
const prewarm = () => {
  if (prewarmed) return;
  prewarmed = true;
  void import('../room/RoomPage');
};

const hotspotHref = (h: Hotspot): string =>
  h.target.kind === 'room' ? roomPath(h.target.room) : h.target.to;

const SORTED = [...HOTSPOTS].sort((a, b) => a.order - b.order);

interface Props {
  /** While the scene is zooming into a landmark, hotspots stop intercepting clicks. */
  disabled: boolean;
  /** ?debug — draw outlines + a 10% calibration grid. */
  debug: boolean;
  /** Plays the zoom, then navigates into the room. */
  onActivate: (id: HotspotId) => void;
}

export const HotspotLayer: React.FC<Props> = ({ disabled, debug, onActivate }) => (
  <div
    className={`scene-hotspots${disabled ? ' disabled' : ''}`}
    onPointerEnter={prewarm}
    onFocus={prewarm}
  >
    {SORTED.map((h) => (
      <Link
        key={h.id}
        to={hotspotHref(h)}
        className="me-hotspot"
        data-hotspot={h.id}
        aria-label={`${h.label} — ${h.questText}`}
        tabIndex={disabled ? -1 : 0}
        onClick={(e) => {
          e.preventDefault(); // real href for a11y/middle-click; zoom first on plain click
          onActivate(h.id);
        }}
        style={{
          left: `${h.shape.x}%`,
          top: `${h.shape.y}%`,
          width: `${h.shape.w}%`,
          height: `${h.shape.h}%`,
        }}
      >
        <span className="me-glow" aria-hidden="true" style={h.shape.clipPath ? { clipPath: h.shape.clipPath } : undefined} />
        <span className={`me-label${h.labelBelow ? ' me-label-below' : ''}`}>{h.label}</span>
      </Link>
    ))}
    {debug && (
      <div className="me-debug-grid" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <React.Fragment key={i}>
            <span className="me-debug-v" style={{ left: `${(i + 1) * 10}%` }} />
            <span className="me-debug-h" style={{ top: `${(i + 1) * 10}%` }} />
          </React.Fragment>
        ))}
      </div>
    )}
  </div>
);
