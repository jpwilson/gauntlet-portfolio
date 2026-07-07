import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HOTSPOTS } from '../../data/hotspots';
import { Hotspot } from '../../types/scene';

const hotspotTo = (h: Hotspot): string =>
  h.target.kind === 'panel' ? `/loc/${h.id}` : h.target.to;

const SORTED = [...HOTSPOTS].sort((a, b) => a.order - b.order);

/**
 * The quest log: a guaranteed non-spatial path to every destination, for
 * recruiters in a hurry, keyboard users, and screen readers alike.
 */
export const QuestLog: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="quest-log">
      {open && (
        <nav
          className="quest-log-panel"
          aria-label="Quest log — all destinations"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          <h2 className="quest-log-title">Quest Log</h2>
          <ul>
            {SORTED.map((h) => (
              <li key={h.id}>
                <Link to={hotspotTo(h)} onClick={() => setOpen(false)}>
                  <span className="quest-name">{h.label}</span>
                  <span className="quest-hint">{h.questText}</span>
                </Link>
              </li>
            ))}
            <li className="quest-divider" aria-hidden="true" />
            <li>
              <Link to="/projects" onClick={() => setOpen(false)}>
                <span className="quest-name">The Grid</span>
                <span className="quest-hint">This portfolio, in neon (classic view)</span>
              </Link>
            </li>
            <li>
              <Link to="/os" onClick={() => setOpen(false)}>
                <span className="quest-name">A Strange Machine</span>
                <span className="quest-hint">An ancient operating system, still humming</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <button
        type="button"
        className="quest-log-toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? '✕ Close' : '📜 Quest Log'}
      </button>
    </div>
  );
};
