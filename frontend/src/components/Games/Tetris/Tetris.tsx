import React, { useState, useEffect, useCallback, useRef } from 'react';

// Board dimensions
const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 24;

// Tetromino shapes and colors
const TETROMINOES: Record<string, { shape: number[][]; color: string }> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#00ffff',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#ffff00',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#aa00ff',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: '#00ff00',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: '#ff0000',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#0000ff',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#ff8800',
  },
};

const PIECE_KEYS = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

type Cell = string | null;
type Board = Cell[][];

interface Piece {
  type: string;
  shape: number[][];
  color: string;
  x: number;
  y: number;
}

function createEmptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function randomPieceType(): string {
  return PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)];
}

function createPiece(type: string): Piece {
  const t = TETROMINOES[type];
  return {
    type,
    shape: t.shape.map((row) => [...row]),
    color: t.color,
    x: Math.floor((COLS - t.shape[0].length) / 2),
    y: 0,
  };
}

function rotateMatrix(matrix: number[][]): number[][] {
  const size = matrix.length;
  const rotated: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      rotated[c][size - 1 - r] = matrix[r][c];
    }
  }
  return rotated;
}

function isValidPosition(board: Board, shape: number[][], x: number, y: number): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const newX = x + c;
        const newY = y + r;
        if (newX < 0 || newX >= COLS || newY >= ROWS) return false;
        if (newY >= 0 && board[newY][newX]) return false;
      }
    }
  }
  return true;
}

function lockPiece(board: Board, piece: Piece): Board {
  const newBoard = board.map((row) => [...row]);
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c]) {
        const bx = piece.x + c;
        const by = piece.y + r;
        if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
          newBoard[by][bx] = piece.color;
        }
      }
    }
  }
  return newBoard;
}

function clearLines(board: Board): { newBoard: Board; linesCleared: number } {
  const newBoard = board.filter((row) => row.some((cell) => cell === null));
  const linesCleared = ROWS - newBoard.length;
  while (newBoard.length < ROWS) {
    newBoard.unshift(Array(COLS).fill(null));
  }
  return { newBoard, linesCleared };
}

function getDropY(board: Board, piece: Piece): number {
  let y = piece.y;
  while (isValidPosition(board, piece.shape, piece.x, y + 1)) {
    y++;
  }
  return y;
}

const SCORE_TABLE = [0, 100, 300, 500, 800];

function getSpeed(level: number): number {
  return Math.max(100, 800 - (level - 1) * 70);
}

export const Tetris: React.FC = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentPiece, setCurrentPiece] = useState<Piece>(() => createPiece(randomPieceType()));
  const [nextType, setNextType] = useState<string>(() => randomPieceType());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const boardRef = useRef<Board>(board);
  const pieceRef = useRef<Piece>(currentPiece);
  const nextTypeRef = useRef<string>(nextType);
  const gameOverRef = useRef(false);
  const gameRef = useRef<HTMLDivElement>(null);

  boardRef.current = board;
  pieceRef.current = currentPiece;
  nextTypeRef.current = nextType;
  gameOverRef.current = gameOver;

  const spawnPiece = useCallback(() => {
    const type = nextTypeRef.current;
    const newPiece = createPiece(type);
    const newNext = randomPieceType();
    setNextType(newNext);
    nextTypeRef.current = newNext;

    if (!isValidPosition(boardRef.current, newPiece.shape, newPiece.x, newPiece.y)) {
      setGameOver(true);
      gameOverRef.current = true;
      setCurrentPiece(newPiece);
      return;
    }
    setCurrentPiece(newPiece);
    pieceRef.current = newPiece;
  }, []);

  const lockAndClear = useCallback(() => {
    const piece = pieceRef.current;
    const locked = lockPiece(boardRef.current, piece);
    const { newBoard, linesCleared } = clearLines(locked);
    setBoard(newBoard);
    boardRef.current = newBoard;

    if (linesCleared > 0) {
      setLines((prev) => {
        const newLines = prev + linesCleared;
        const newLevel = Math.floor(newLines / 10) + 1;
        setLevel(newLevel);
        return newLines;
      });
      setScore((prev) => prev + SCORE_TABLE[linesCleared] * level);
    }

    spawnPiece();
  }, [spawnPiece, level]);

  const moveDown = useCallback(() => {
    if (gameOverRef.current) return;
    const piece = pieceRef.current;
    if (isValidPosition(boardRef.current, piece.shape, piece.x, piece.y + 1)) {
      const moved = { ...piece, y: piece.y + 1 };
      setCurrentPiece(moved);
      pieceRef.current = moved;
    } else {
      lockAndClear();
    }
  }, [lockAndClear]);

  const moveLeft = useCallback(() => {
    if (gameOverRef.current) return;
    const piece = pieceRef.current;
    if (isValidPosition(boardRef.current, piece.shape, piece.x - 1, piece.y)) {
      const moved = { ...piece, x: piece.x - 1 };
      setCurrentPiece(moved);
      pieceRef.current = moved;
    }
  }, []);

  const moveRight = useCallback(() => {
    if (gameOverRef.current) return;
    const piece = pieceRef.current;
    if (isValidPosition(boardRef.current, piece.shape, piece.x + 1, piece.y)) {
      const moved = { ...piece, x: piece.x + 1 };
      setCurrentPiece(moved);
      pieceRef.current = moved;
    }
  }, []);

  const rotate = useCallback(() => {
    if (gameOverRef.current) return;
    const piece = pieceRef.current;
    const rotated = rotateMatrix(piece.shape);
    // Try normal rotation, then wall kicks
    const kicks = [0, -1, 1, -2, 2];
    for (const kick of kicks) {
      if (isValidPosition(boardRef.current, rotated, piece.x + kick, piece.y)) {
        const moved = { ...piece, shape: rotated, x: piece.x + kick };
        setCurrentPiece(moved);
        pieceRef.current = moved;
        return;
      }
    }
  }, []);

  const hardDrop = useCallback(() => {
    if (gameOverRef.current) return;
    const piece = pieceRef.current;
    const dropY = getDropY(boardRef.current, piece);
    const distance = dropY - piece.y;
    const dropped = { ...piece, y: dropY };
    setCurrentPiece(dropped);
    pieceRef.current = dropped;
    setScore((prev) => prev + distance * 2);
    lockAndClear();
  }, [lockAndClear]);

  const resetGame = useCallback(() => {
    const newBoard = createEmptyBoard();
    const newPiece = createPiece(randomPieceType());
    const newNext = randomPieceType();
    setBoard(newBoard);
    setCurrentPiece(newPiece);
    setNextType(newNext);
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsStarted(true);
    boardRef.current = newBoard;
    pieceRef.current = newPiece;
    nextTypeRef.current = newNext;
    gameOverRef.current = false;
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isStarted || gameOverRef.current) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotate();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          setScore((prev) => prev + 1);
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
      }
    },
    [isStarted, moveLeft, moveRight, rotate, moveDown, hardDrop]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Gravity tick
  useEffect(() => {
    if (!isStarted || gameOver) return;
    const speed = getSpeed(level);
    const interval = setInterval(() => {
      moveDown();
    }, speed);
    return () => clearInterval(interval);
  }, [isStarted, gameOver, level, moveDown]);

  // Focus on mount
  useEffect(() => {
    gameRef.current?.focus();
  }, []);

  // Build display board (locked cells + current piece + ghost)
  const displayBoard: (Cell | 'ghost')[][] = board.map((row) => [...row]) as (Cell | 'ghost')[][];

  if (isStarted) {
    // Ghost piece
    const ghostY = getDropY(board, currentPiece);
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const bx = currentPiece.x + c;
          const by = ghostY + r;
          if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS && !displayBoard[by][bx]) {
            displayBoard[by][bx] = 'ghost';
          }
        }
      }
    }

    // Current piece
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const bx = currentPiece.x + c;
          const by = currentPiece.y + r;
          if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
            displayBoard[by][bx] = currentPiece.color;
          }
        }
      }
    }
  }

  // Next piece preview
  const nextPiece = TETROMINOES[nextType];
  const previewSize = nextPiece.shape.length;

  const boardWidth = COLS * CELL_SIZE;
  const boardHeight = ROWS * CELL_SIZE;
  const sidebarWidth = 110;

  return (
    <div
      ref={gameRef}
      tabIndex={0}
      style={{
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 8,
        background: '#c0c0c0',
      }}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        {/* Game board */}
        <div
          className="sunken-panel"
          style={{
            width: boardWidth + 4,
            height: boardHeight + 4,
            position: 'relative',
            background: '#000',
            overflow: 'hidden',
          }}
        >
          {displayBoard.map((row, ry) =>
            row.map((cell, cx) => {
              if (!cell) return null;
              const isGhost = cell === 'ghost';
              return (
                <div
                  key={`${ry}-${cx}`}
                  style={{
                    position: 'absolute',
                    left: cx * CELL_SIZE + 2,
                    top: ry * CELL_SIZE + 2,
                    width: CELL_SIZE - 1,
                    height: CELL_SIZE - 1,
                    background: isGhost ? 'rgba(255,255,255,0.08)' : (cell as string),
                    border: isGhost
                      ? '1px solid rgba(255,255,255,0.15)'
                      : `1px solid rgba(255,255,255,0.3)`,
                    boxSizing: 'border-box',
                    ...(isGhost
                      ? {}
                      : {
                          borderTop: `2px solid rgba(255,255,255,0.5)`,
                          borderLeft: `2px solid rgba(255,255,255,0.4)`,
                          borderRight: `2px solid rgba(0,0,0,0.3)`,
                          borderBottom: `2px solid rgba(0,0,0,0.4)`,
                        }),
                  }}
                />
              );
            })
          )}

          {/* Start overlay */}
          {!isStarted && !gameOver && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.85)',
                color: '#00ffff',
                fontFamily: 'monospace',
                zIndex: 1,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>TETRIS</div>
              <div style={{ fontSize: 11, color: '#c0c0c0' }}>Click New Game to start</div>
            </div>
          )}

          {/* Game Over overlay */}
          {gameOver && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.8)',
                color: '#ff0000',
                fontFamily: 'monospace',
                zIndex: 1,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 6 }}>GAME OVER</div>
              <div style={{ fontSize: 14, color: '#00ffff', marginBottom: 4 }}>
                Score: {score}
              </div>
              <div style={{ fontSize: 12, color: '#c0c0c0' }}>
                Lines: {lines} | Level: {level}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div
          style={{
            width: sidebarWidth,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {/* Next piece */}
          <div style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>
            NEXT
          </div>
          <div
            className="sunken-panel"
            style={{
              width: 80,
              height: 80,
              background: '#000',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: previewSize * 16,
                height: previewSize * 16,
              }}
            >
              {nextPiece.shape.map((row, ry) =>
                row.map((cell, cx) =>
                  cell ? (
                    <div
                      key={`next-${ry}-${cx}`}
                      style={{
                        position: 'absolute',
                        left: cx * 16,
                        top: ry * 16,
                        width: 15,
                        height: 15,
                        background: nextPiece.color,
                        borderTop: '2px solid rgba(255,255,255,0.5)',
                        borderLeft: '2px solid rgba(255,255,255,0.4)',
                        borderRight: '2px solid rgba(0,0,0,0.3)',
                        borderBottom: '2px solid rgba(0,0,0,0.4)',
                        boxSizing: 'border-box',
                      }}
                    />
                  ) : null
                )
              )}
            </div>
          </div>

          {/* Score */}
          <div style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 'bold', marginTop: 4 }}>
            SCORE
          </div>
          <div
            className="sunken-panel"
            style={{
              padding: '3px 6px',
              background: '#000',
              color: '#ff0000',
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'right',
            }}
          >
            {String(score).padStart(6, '0')}
          </div>

          {/* Level */}
          <div style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 'bold' }}>
            LEVEL
          </div>
          <div
            className="sunken-panel"
            style={{
              padding: '3px 6px',
              background: '#000',
              color: '#00ff00',
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'right',
            }}
          >
            {level}
          </div>

          {/* Lines */}
          <div style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 'bold' }}>
            LINES
          </div>
          <div
            className="sunken-panel"
            style={{
              padding: '3px 6px',
              background: '#000',
              color: '#ffff00',
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'right',
            }}
          >
            {lines}
          </div>

          {/* New Game button */}
          <button
            onClick={resetGame}
            style={{
              marginTop: 8,
              fontSize: 12,
              padding: '4px 8px',
              fontFamily: 'monospace',
              cursor: 'pointer',
            }}
          >
            New Game
          </button>
        </div>
      </div>

      {/* Controls hint */}
      <div style={{ marginTop: 6, fontSize: 10, color: '#808080', textAlign: 'center', fontFamily: 'monospace' }}>
        Arrows: move/rotate | Down: soft drop | Space: hard drop
      </div>
    </div>
  );
};
