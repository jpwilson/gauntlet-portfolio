import React from 'react';
import { SCENE_MEDIA } from '../../data/hotspots';

/**
 * The scene artwork — the ONLY media-aware component.
 *
 * To bring the scene to life: generate a seamless video loop of the exact same
 * frame, drop it in public/videos/, and set SCENE_MEDIA.video. The <video>
 * renders in the identical box (the stage owns the aspect ratio), keeps the
 * PNG as its poster, and every hotspot keeps working untouched.
 */
export const SceneBackground: React.FC = () => {
  if (SCENE_MEDIA.video) {
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
      alt="A fantasy realm: a round hobbit door in a green hillside, a great oak tree, a stone bridge over a river where a white horse drinks, and a castle on a distant peak beneath a vast moon"
      fetchPriority="high"
    />
  );
};
