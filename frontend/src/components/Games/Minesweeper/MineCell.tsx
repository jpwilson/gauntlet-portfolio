import React from 'react';
import { CellState } from './useMinesweeper';

interface MineCellProps {
  cell: CellState;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  gameOver: boolean;
}

const NUMBER_COLORS: Record<number, string> = {
  1: '#0000ff',
  2: '#008000',
  3: '#ff0000',
  4: '#000080',
  5: '#800000',
  6: '#008080',
  7: '#000000',
  8: '#808080',
};

export const MineCell: React.FC<MineCellProps> = ({ cell, onClick, onRightClick, gameOver }) => {
  const cellStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    cursor: gameOver ? 'default' : 'pointer',
    userSelect: 'none',
    padding: 0,
    minWidth: 24,
    minHeight: 24,
  };

  if (cell.isRevealed) {
    return (
      <div
        style={{
          ...cellStyle,
          border: '1px solid #808080',
          background: cell.isMine ? '#ff0000' : '#c0c0c0',
        }}
      >
        {cell.isMine ? '💣' : cell.adjacentMines > 0 ? (
          <span style={{ color: NUMBER_COLORS[cell.adjacentMines] }}>
            {cell.adjacentMines}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <button
      style={cellStyle}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(e);
      }}
    >
      {cell.isFlagged ? '🚩' : ''}
    </button>
  );
};
