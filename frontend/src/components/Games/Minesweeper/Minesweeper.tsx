import React from 'react';
import { MineHeader } from './MineHeader';
import { MineGrid } from './MineGrid';
import { useMinesweeper, Difficulty } from './useMinesweeper';

export const Minesweeper: React.FC = () => {
  const {
    grid,
    gameStatus,
    minesLeft,
    time,
    difficulty,
    revealCell,
    toggleFlag,
    resetGame,
    setDifficulty,
  } = useMinesweeper();

  const handleDifficultyChange = (d: Difficulty) => {
    setDifficulty(d);
  };

  return (
    <div style={{ padding: 4, background: '#c0c0c0' }}>
      {/* Menu bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 4, fontSize: 11 }}>
        <span style={{ fontWeight: 'bold' }}>Game</span>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)}
          style={{ fontSize: 11 }}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
        <button onClick={resetGame} style={{ fontSize: 11, padding: '0 8px' }}>
          New Game
        </button>
      </div>

      <MineHeader
        minesLeft={minesLeft}
        time={time}
        gameStatus={gameStatus}
        onReset={resetGame}
      />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MineGrid
          grid={grid}
          gameStatus={gameStatus}
          onReveal={revealCell}
          onFlag={toggleFlag}
        />
      </div>

      {gameStatus === 'won' && (
        <div style={{ textAlign: 'center', marginTop: 4, fontSize: 11, color: '#008000', fontWeight: 'bold' }}>
          Congratulations! You win!
        </div>
      )}
      {gameStatus === 'lost' && (
        <div style={{ textAlign: 'center', marginTop: 4, fontSize: 11, color: '#ff0000', fontWeight: 'bold' }}>
          BOOM! Game Over.
        </div>
      )}
    </div>
  );
};
