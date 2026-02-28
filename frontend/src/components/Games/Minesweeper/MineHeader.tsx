import React from 'react';
import { GameStatus } from './useMinesweeper';

interface MineHeaderProps {
  minesLeft: number;
  time: number;
  gameStatus: GameStatus;
  onReset: () => void;
}

const formatNumber = (n: number): string => {
  return String(Math.max(0, n)).padStart(3, '0');
};

export const MineHeader: React.FC<MineHeaderProps> = ({
  minesLeft,
  time,
  gameStatus,
  onReset,
}) => {
  const smiley = gameStatus === 'won' ? '😎' : gameStatus === 'lost' ? '😵' : '🙂';

  const counterStyle: React.CSSProperties = {
    background: '#000',
    color: '#ff0000',
    fontFamily: 'monospace',
    fontSize: 20,
    padding: '2px 4px',
    letterSpacing: 2,
    border: '1px inset #808080',
    minWidth: 46,
    textAlign: 'center',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 4,
        border: '2px inset #c0c0c0',
        marginBottom: 4,
        background: '#c0c0c0',
      }}
    >
      <div style={counterStyle}>{formatNumber(minesLeft)}</div>
      <button
        onClick={onReset}
        style={{
          width: 32,
          height: 32,
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {smiley}
      </button>
      <div style={counterStyle}>{formatNumber(time)}</div>
    </div>
  );
};
