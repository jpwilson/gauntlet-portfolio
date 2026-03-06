import React, { useState } from 'react';
import { Win95Icon } from '../shared/Win95Icon';
import { useWindowStore } from '../../store/useWindowStore';

interface GameItem {
  id: string;
  label: string;
  iconType: string;
  windowType: string;
  windowTitle: string;
  windowSize: { width: number; height: number };
}

const GAMES: GameItem[] = [
  {
    id: 'minesweeper',
    label: 'Minesweeper',
    iconType: 'minesweeper',
    windowType: 'minesweeper',
    windowTitle: 'Minesweeper',
    windowSize: { width: 280, height: 380 },
  },
  {
    id: 'tetris',
    label: 'Tetris',
    iconType: 'tetris',
    windowType: 'tetris',
    windowTitle: 'Tetris',
    windowSize: { width: 480, height: 580 },
  },
  {
    id: 'snake',
    label: 'Snake',
    iconType: 'snake',
    windowType: 'snake',
    windowTitle: 'Snake',
    windowSize: { width: 420, height: 480 },
  },
  {
    id: 'solitaire',
    label: 'Solitaire',
    iconType: 'solitaire',
    windowType: 'solitaire',
    windowTitle: 'Solitaire',
    windowSize: { width: 700, height: 550 },
  },
];

export const GamesFolder: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleDoubleClick = (game: GameItem) => {
    openWindow({
      type: game.windowType,
      title: game.windowTitle,
      icon: game.iconType,
      size: game.windowSize,
    });
  };

  return (
    <div style={{ padding: 4 }}>
      {/* Address bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 4,
          padding: '2px 4px',
        }}
      >
        <span style={{ fontSize: 11 }}>Address:</span>
        <div
          style={{
            flex: 1,
            border: '1px solid',
            borderColor: '#808080 #dfdfdf #dfdfdf #808080',
            padding: '1px 4px',
            background: 'white',
            fontSize: 11,
          }}
        >
          C:\Games
        </div>
      </div>

      {/* File listing */}
      <div
        className="sunken-panel"
        style={{ padding: 4, minHeight: 200, background: 'white' }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 4 }}>
          {GAMES.map((game) => (
            <div
              key={game.id}
              className={`desktop-icon ${selectedGame === game.id ? 'selected' : ''}`}
              style={{ width: 80, cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGame(game.id);
              }}
              onDoubleClick={() => handleDoubleClick(game)}
            >
              <Win95Icon type={game.iconType} size={32} />
              <span
                className="desktop-icon-label"
                style={{
                  color: selectedGame === game.id ? 'white' : 'black',
                  textShadow: 'none',
                  background: selectedGame === game.id ? '#000080' : 'transparent',
                }}
              >
                {game.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div style={{ marginTop: 4, fontSize: 11, color: '#808080' }}>
        {GAMES.length} object(s)
        {selectedGame && ` — "${GAMES.find((g) => g.id === selectedGame)?.label}" selected`}
      </div>
    </div>
  );
};
