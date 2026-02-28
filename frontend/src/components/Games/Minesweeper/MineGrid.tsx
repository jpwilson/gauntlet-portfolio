import React from 'react';
import { MineCell } from './MineCell';
import { CellState, GameStatus } from './useMinesweeper';

interface MineGridProps {
  grid: CellState[][];
  gameStatus: GameStatus;
  onReveal: (row: number, col: number) => void;
  onFlag: (row: number, col: number) => void;
}

export const MineGrid: React.FC<MineGridProps> = ({ grid, gameStatus, onReveal, onFlag }) => {
  const gameOver = gameStatus === 'won' || gameStatus === 'lost';

  return (
    <div
      style={{
        border: '3px inset #c0c0c0',
        display: 'inline-block',
        lineHeight: 0,
      }}
    >
      {grid.map((row, r) => (
        <div key={r} style={{ display: 'flex' }}>
          {row.map((cell, c) => (
            <MineCell
              key={`${r}-${c}`}
              cell={cell}
              onClick={() => onReveal(r, c)}
              onRightClick={() => onFlag(r, c)}
              gameOver={gameOver}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
