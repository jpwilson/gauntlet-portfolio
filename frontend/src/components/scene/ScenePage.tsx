import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHotspot, SCENE_ASPECT, SCENE_VIDEO_ACTIVE } from '../../data/hotspots';
import { roomPath } from '../../data/rooms';
import { HotspotId } from '../../types/scene';
import { SceneBackground } from './SceneBackground';
import { AmbientLayer } from './AmbientLayer';
import { HotspotLayer } from './HotspotLayer';
import { QuestLog } from './QuestLog';
import '../../styles/middle-earth.css';

const BASE = import.meta.env.BASE_URL;
const ZOOM_MS = 750; // matches the .scene-stage CSS transition

/**
 * The explorable realm — the default landing.
 *
 * - `.scene-viewport` is a fixed full-screen native scroller (pan on both axes,
 *   so nothing is unreachable at any window size).
 * - `.scene-stage` owns the artwork's aspect ratio; hotspots are %-positioned.
 * - Activating a landmark plays the zoom, then navigates INTO its room (/in/:id).
 */
export const ScenePage: React.FC = () => {
  const navigate = useNavigate();
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [zoomTarget, setZoomTarget] = useState<HotspotId | null>(null);
  const [debug] = useState(() => new URLSearchParams(window.location.search).has('debug'));
  const [showHint, setShowHint] = useState(() => !localStorage.getItem('me-hint-seen'));

  const active = getHotspot(zoomTarget ?? undefined);

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
    if (el) {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
    }
  }, []);

  const enterLandmark = (id: HotspotId) => {
    const h = getHotspot(id);
    if (!h) return;
    if (h.target.kind === 'route') {
      navigate(h.target.to);
      return;
    }
    const room = h.target.room;
    // Glide the focus point on-screen, play the zoom, then walk in.
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (viewport && stage) {
      viewport.scrollTo({
        left: (stage.offsetWidth * h.focus.x) / 100 - viewport.clientWidth / 2,
        top: (stage.offsetHeight * h.focus.y) / 100 - viewport.clientHeight / 2,
        behavior: 'smooth',
      });
    }
    setZoomTarget(id);
    window.setTimeout(() => navigate(roomPath(room)), ZOOM_MS);
  };

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
          {/* CSS ambience serves the still image; the living video replaces it */}
          {!SCENE_VIDEO_ACTIVE && <AmbientLayer />}
          <HotspotLayer disabled={zoomed} debug={debug} onActivate={enterLandmark} />
        </div>
      </div>

      <div className={`scene-iris${zoomed ? ' closing' : ''}`} aria-hidden="true" />

      {/* Title plaque + resume, in the old-game plaque style */}
      <h1 className="me-plaque scene-title">JP Wilson Portfolio</h1>
      <a
        className="me-plaque scene-resume"
        href={`${BASE}JPWilsonResume.pdf`}
        target="_blank"
        rel="noopener noreferrer"
      >
        📜 JP Wilson&rsquo;s Resume
      </a>

      {showHint && (
        <button type="button" className="scene-hint" onAnimationEnd={dismissHint} onClick={dismissHint}>
          Click a landmark to step inside
        </button>
      )}

      <QuestLog />
    </div>
  );
};
