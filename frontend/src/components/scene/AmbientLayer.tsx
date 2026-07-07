import React from 'react';

// Hand-tuned constants (never Math.random() in render — renders stay pure).
// x/y are stage-%, delay/duration in seconds, drift in px.
const FIREFLIES: ReadonlyArray<{ x: number; y: number; delay: number; dur: number; dx: number; dy: number }> = [
  { x: 12, y: 62, delay: 0.0, dur: 9, dx: 30, dy: -22 },
  { x: 18, y: 74, delay: 2.1, dur: 11, dx: -24, dy: -30 },
  { x: 30, y: 58, delay: 4.4, dur: 8, dx: 26, dy: -18 },
  { x: 44, y: 70, delay: 1.2, dur: 10, dx: -20, dy: -26 },
  { x: 55, y: 64, delay: 3.6, dur: 12, dx: 34, dy: -20 },
  { x: 66, y: 76, delay: 0.8, dur: 9, dx: -28, dy: -24 },
  { x: 78, y: 60, delay: 5.0, dur: 11, dx: 22, dy: -32 },
  { x: 88, y: 72, delay: 2.9, dur: 10, dx: -26, dy: -18 },
];

/** River band, stage-% — a soft moving glint over the water. */
const RIVER = { x: 34, y: 66, w: 44, h: 22 };

/**
 * CSS-only ambient life for the still image: fireflies, a river shimmer, and a
 * slow godray pulse. Everything is transform/opacity-only, pauses while a
 * landmark is open, and disappears under prefers-reduced-motion. The day the
 * AI video loop arrives this layer can simply be retired (or kept — it stacks).
 */
export const AmbientLayer: React.FC = () => (
  <div className="me-ambient" aria-hidden="true">
    {FIREFLIES.map((f, i) => (
      <span
        key={i}
        className="me-firefly"
        style={
          {
            left: `${f.x}%`,
            top: `${f.y}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.dur}s`,
            '--dx': `${f.dx}px`,
            '--dy': `${f.dy}px`,
          } as React.CSSProperties
        }
      />
    ))}
    <span
      className="me-shimmer"
      style={{ left: `${RIVER.x}%`, top: `${RIVER.y}%`, width: `${RIVER.w}%`, height: `${RIVER.h}%` }}
    />
    <span className="me-rays" />
  </div>
);
