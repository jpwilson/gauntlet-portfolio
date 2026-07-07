import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useViewModeStore } from '../../../store/useViewModeStore';

/** The white horse carries you to older tellings of this same portfolio. */
export const PortalsPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p style={{ marginBottom: 14 }}>
        This realm is the third telling of the portfolio. The horse remembers the earlier ones —
        climb on, and it will carry you there.
      </p>
      <div className="me-portals">
        <button type="button" className="me-portal" onClick={() => navigate('/projects')}>
          <h3>⚡ The Grid</h3>
          <p>A neon city of the same works — tables, carousels, cyan light.</p>
        </button>
        <button type="button" className="me-portal" onClick={() => navigate('/os')}>
          <h3>🖥 A Strange Machine</h3>
          <p>An ancient desktop from 1995, windows and all. It still boots.</p>
        </button>
        <button
          type="button"
          className="me-portal"
          onClick={() => {
            useViewModeStore.getState().setViewMode('game');
            navigate('/os');
          }}
        >
          <h3>🏎 The Midnight Road</h3>
          <p>A racer through the projects, built in three.js. Hold on.</p>
        </button>
      </div>
    </div>
  );
};
