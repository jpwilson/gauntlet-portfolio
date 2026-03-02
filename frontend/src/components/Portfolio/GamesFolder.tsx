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
  comingSoon: boolean;
}

const GAMES: GameItem[] = [
  {
    id: 'minesweeper',
    label: 'Minesweeper',
    iconType: 'minesweeper',
    windowType: 'minesweeper',
    windowTitle: 'Minesweeper',
    windowSize: { width: 280, height: 380 },
    comingSoon: false,
  },
  {
    id: 'snake',
    label: 'Snake',
    iconType: 'snake',
    windowType: 'snake',
    windowTitle: 'Snake',
    windowSize: { width: 420, height: 480 },
    comingSoon: false,
  },
  {
    id: 'skifree',
    label: 'SkiFree',
    iconType: 'skifree',
    windowType: 'skifree',
    windowTitle: 'SkiFree',
    windowSize: { width: 660, height: 520 },
    comingSoon: true,
  },
  {
    id: 'pipedream',
    label: 'Pipe Dream',
    iconType: 'pipedream',
    windowType: 'pipedream',
    windowTitle: 'Pipe Dream',
    windowSize: { width: 660, height: 520 },
    comingSoon: true,
  },
];

export const GamesFolder: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const handleDoubleClick = (game: GameItem, e: React.MouseEvent) => {
    if (game.comingSoon) {
      setTooltip({ x: e.clientX, y: e.clientY - 30, visible: true });
      setTimeout(() => setTooltip((prev) => ({ ...prev, visible: false })), 2000);
      return;
    }
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
              style={{ width: 80, cursor: 'pointer', position: 'relative', opacity: game.comingSoon ? 0.6 : 1 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGame(game.id);
              }}
              onDoubleClick={(e) => handleDoubleClick(game, e)}
              title={game.comingSoon ? 'Coming Soon!' : ''}
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
              {game.comingSoon && (
                <span
                  style={{
                    fontSize: 9,
                    color: '#808080',
                    fontStyle: 'italic',
                    display: 'block',
                    marginTop: 1,
                  }}
                >
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            background: '#ffffe1',
            border: '1px solid #000',
            padding: '2px 6px',
            fontSize: 11,
            zIndex: 99999,
            pointerEvents: 'none',
          }}
        >
          Coming Soon!
        </div>
      )}

      {/* Status bar */}
      <div style={{ marginTop: 4, fontSize: 11, color: '#808080' }}>
        {GAMES.length} object(s)
        {selectedGame && ` — "${GAMES.find((g) => g.id === selectedGame)?.label}" selected`}
      </div>
    </div>
  );
};
