import React from 'react';
import { SCENE_MEDIA, SCENE_VIDEO_ACTIVE } from '../../data/hotspots';

/**
 * The scene artwork — the ONLY media-aware component.
 *
 * The video is a seamless ping-pong loop of the scene; its exact first frame
 * is the poster, so the still -> video handoff is invisible. Hotspots never
 * reference the media (the stage owns the aspect ratio).
 */
export const SceneBackground: React.FC = () => {
  if (SCENE_VIDEO_ACTIVE) {
    return (
      <video
        className="scene-media"
        src={SCENE_MEDIA.video}
        poster={SCENE_MEDIA.image}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    );
  }
  return (
    <img
      className="scene-media"
      src={SCENE_MEDIA.image}
      alt="A fantasy realm: a round hobbit door in a green hillside, a great oak tree, a stone bridge over a river where a winged white steed drinks, and a castle on a distant peak beneath a vast moon"
      fetchPriority="high"
    />
  );
};
