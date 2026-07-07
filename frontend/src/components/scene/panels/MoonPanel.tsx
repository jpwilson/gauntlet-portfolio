import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useViewModeStore } from '../../../store/useViewModeStore';

/** Whimsy: the moon keeps the old games. */
export const MoonPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>
        The moon has watched this realm a long while, and it hums with old amusements —
        Minesweeper, Snake, Tetris, Solitaire — kept safe inside a strange machine from 1995.
      </p>
      <div className="me-links" style={{ marginTop: 14 }}>
        <button
          type="button"
          className="me-btn"
          onClick={() => {
            useViewModeStore.getState().setViewMode('desktop');
            navigate('/os');
          }}
        >
          🌙 Wake the machine →
        </button>
      </div>
      <p style={{ marginTop: 14, fontStyle: 'italic', fontSize: 14.5, color: '#5c4526' }}>
        (Open the Games folder on its desktop. The moon insists Snake is best.)
      </p>
    </div>
  );
};
