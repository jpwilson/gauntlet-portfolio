import React from 'react';

const STACK = [
  'React 19',
  'TypeScript 6',
  'Vite 8',
  'three.js',
  'AI image gen',
  'AI video gen',
  'ffmpeg',
  'GitHub Actions',
];

/**
 * The site is itself a case study — say so. Engineers who hire read colophons.
 */
export const Colophon: React.FC = () => (
  <div>
    <p>
      This site is an AI-engineering artifact in its own right. The realm is AI-generated art,
      brought to life as an AI-generated video — processed with ffmpeg into a seamless
      ping-pong loop (watch the steed&rsquo;s wings spread, then fold) with its exact first frame
      as the poster, so the still-to-motion handoff is invisible.
    </p>
    <p>
      Landmarks are percentage-coordinate hotspots on a fixed-aspect stage, so they stay
      pixel-anchored at every screen size. The interiors are AI-generated rooms; the racing
      game is three.js; and two earlier incarnations of this portfolio — a Windows 95 desktop
      and a cyberpunk grid — live on inside it. Everything ships automatically from GitHub
      Actions, and a scheduled workflow keeps every project&rsquo;s &ldquo;last commit&rdquo;
      date fresh.
    </p>
    <div className="me-chips" style={{ marginTop: 8 }}>
      {STACK.map((s) => (
        <span key={s} className="me-chip">
          {s}
        </span>
      ))}
    </div>
    <div className="me-links" style={{ marginTop: 12 }}>
      <a
        className="me-btn ghost"
        href="https://github.com/jpwilson/gauntlet-portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read this site&rsquo;s source ↗
      </a>
    </div>
  </div>
);
