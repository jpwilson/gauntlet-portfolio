import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { getHotspot, SCENE_ASPECT } from '../../data/hotspots';
import { SceneBackground } from './SceneBackground';
import { AmbientLayer } from './AmbientLayer';
import { HotspotLayer } from './HotspotLayer';
import { QuestLog } from './QuestLog';
import '../../styles/middle-earth.css';

/**
 * The Middle-earth explorable scene — the default landing.
 *
 * Layout contract:
 * - `.scene-viewport` is a fixed, full-screen native scroller (mobile pan).
 * - `.scene-stage` owns the artwork's exact aspect ratio; hotspots are
 *   %-positioned children, so coordinates hold at every viewport size and
 *   survive the future img -> video swap.
 * - The open panel is a nested route (/loc/:hotspotId) rendered via <Outlet/>
 *   OUTSIDE the scroller; the door-open zoom is pure CSS driven by the URL.
 */
export const ScenePage: React.FC = () => {
  const navigate = useNavigate();
  const match = useMatch('/loc/:hotspotId');
  const active = getHotspot(match?.params.hotspotId);

  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lastHotspotId = useRef<string | null>(null);

  const [debug] = useState(() => new URLSearchParams(window.location.search).has('debug'));
  const [showHint, setShowHint] = useState(() => !localStorage.getItem('me-hint-seen'));

  // Unknown landmark in the URL -> go home (render-time navigation via effect-free Navigate
  // is not available here since we render the stage regardless; use an effect-free check).
  const invalidId = match !== null && !active;

  // Scope this view's body styles; suppress the cyberpunk chrome underneath.
  useEffect(() => {
    document.body.classList.add('view-scene');
    return () => {
      document.body.classList.remove('view-scene');
    };
  }, []);

  // Start the journey centered on the heart of the scene.
  useEffect(() => {
    const el = viewportRef.current;
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  // When a landmark opens, glide its focus point toward the viewport center so
  // the zoom origin is on screen; remember it to restore focus on close.
  useEffect(() => {
    if (!active) return;
    lastHotspotId.current = active.id;
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (viewport && stage) {
      viewport.scrollTo({
        left: (stage.offsetWidth * active.focus.x) / 100 - viewport.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [active]);

  // When the panel closes, hand keyboard focus back to the landmark it came from.
  useEffect(() => {
    if (active || !lastHotspotId.current) return;
    const el = document.querySelector<HTMLElement>(`[data-hotspot="${lastHotspotId.current}"]`);
    el?.focus({ preventScroll: true });
    lastHotspotId.current = null;
  }, [active]);

  useEffect(() => {
    if (invalidId) navigate('/', { replace: true });
  }, [invalidId, navigate]);

  const dismissHint = () => {
    localStorage.setItem('me-hint-seen', '1');
    setShowHint(false);
  };

  const zoomed = Boolean(active);

  return (
    <div className={`scene-root${showHint ? ' intro' : ''}${debug ? ' debug' : ''}`}>
      <div ref={viewportRef} className={`scene-viewport${zoomed ? ' locked' : ''}`}>
        <div
          ref={stageRef}
          className={`scene-stage${zoomed ? ' is-zoomed' : ''}`}
          style={
            {
              '--scene-ar': SCENE_ASPECT,
              ...(active && {
                transformOrigin: `${active.focus.x}% ${active.focus.y}%`,
                '--zoom-scale': active.focus.scale,
              }),
            } as React.CSSProperties
          }
        >
          <SceneBackground />
          <AmbientLayer />
          <HotspotLayer disabled={zoomed} debug={debug} />
        </div>
      </div>

      <div className={`scene-iris${zoomed ? ' closing' : ''}`} aria-hidden="true" />

      {showHint && (
        <button type="button" className="scene-hint" onAnimationEnd={dismissHint} onClick={dismissHint}>
          Wander the realm — the landmarks hold the tales
        </button>
      )}

      <QuestLog />
      <Outlet />
    </div>
  );
};
