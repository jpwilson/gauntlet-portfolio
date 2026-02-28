import { useState, useCallback, useEffect } from 'react';

export type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export type Difficulty = 'beginner' | 'intermediate' | 'expert';

const DIFFICULTY_CONFIG: Record<Difficulty, { rows: number; cols: number; mines: number }> = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 },
};

function createEmptyGrid(rows: number, cols: number): CellState[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );
}

function placeMines(
  grid: CellState[][],
  mines: number,
  excludeRow: number,
  excludeCol: number
): CellState[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
  let placed = 0;

  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!newGrid[r][c].isMine && !(r === excludeRow && c === excludeCol)) {
      newGrid[r][c].isMine = true;
      placed++;
    }
  }

  // Calculate adjacent mine counts
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (newGrid[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newGrid[nr][nc].isMine) {
            count++;
          }
        }
      }
      newGrid[r][c].adjacentMines = count;
    }
  }

  return newGrid;
}

function floodFill(grid: CellState[][], row: number, col: number): CellState[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
  const queue: [number, number][] = [[row, col]];

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
    if (newGrid[r][c].isRevealed || newGrid[r][c].isFlagged) continue;

    newGrid[r][c].isRevealed = true;

    if (newGrid[r][c].adjacentMines === 0 && !newGrid[r][c].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          queue.push([r + dr, c + dc]);
        }
      }
    }
  }

  return newGrid;
}

function checkWin(grid: CellState[][]): boolean {
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.isMine && !cell.isRevealed) return false;
    }
  }
  return true;
}

export function useMinesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [grid, setGrid] = useState<CellState[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [minesLeft, setMinesLeft] = useState(0);
  const [time, setTime] = useState(0);
  const [firstClick, setFirstClick] = useState(true);

  const config = DIFFICULTY_CONFIG[difficulty];

  const resetGame = useCallback(() => {
    const cfg = DIFFICULTY_CONFIG[difficulty];
    setGrid(createEmptyGrid(cfg.rows, cfg.cols));
    setGameStatus('idle');
    setMinesLeft(cfg.mines);
    setTime(0);
    setFirstClick(true);
  }, [difficulty]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Timer
  useEffect(() => {
    if (gameStatus !== 'playing') return;
    const timer = setInterval(() => {
      setTime((t) => Math.min(t + 1, 999));
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStatus]);

  const revealCell = useCallback(
    (row: number, col: number) => {
      if (gameStatus === 'won' || gameStatus === 'lost') return;

      let currentGrid = grid;

      if (firstClick) {
        currentGrid = placeMines(currentGrid, config.mines, row, col);
        setFirstClick(false);
        setGameStatus('playing');
      }

      const cell = currentGrid[row][col];
      if (cell.isRevealed || cell.isFlagged) return;

      if (cell.isMine) {
        // Game over — reveal all mines
        const newGrid = currentGrid.map((r) =>
          r.map((c) => (c.isMine ? { ...c, isRevealed: true } : c))
        );
        setGrid(newGrid);
        setGameStatus('lost');
        return;
      }

      const newGrid = floodFill(currentGrid, row, col);
      setGrid(newGrid);

      if (checkWin(newGrid)) {
        setGameStatus('won');
      }
    },
    [grid, gameStatus, firstClick, config.mines]
  );

  const toggleFlag = useCallback(
    (row: number, col: number) => {
      if (gameStatus === 'won' || gameStatus === 'lost') return;
      const cell = grid[row][col];
      if (cell.isRevealed) return;

      const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
      newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
      setGrid(newGrid);
      setMinesLeft((prev) => (newGrid[row][col].isFlagged ? prev - 1 : prev + 1));
    },
    [grid, gameStatus]
  );

  return {
    grid,
    gameStatus,
    minesLeft,
    time,
    difficulty,
    config,
    revealCell,
    toggleFlag,
    resetGame,
    setDifficulty,
  };
}
