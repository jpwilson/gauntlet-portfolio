import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TouchControls } from '../TouchControls';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 18;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 60;

const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

function getRandomFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export const Snake: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(() => getRandomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const dirRef = useRef<Direction>('RIGHT');
  const gameRef = useRef<HTMLDivElement>(null);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomFood(INITIAL_SNAKE));
    setDirection('RIGHT');
    dirRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setIsStarted(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          if (dirRef.current !== 'DOWN') {
            dirRef.current = 'UP';
            setDirection('UP');
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          if (dirRef.current !== 'UP') {
            dirRef.current = 'DOWN';
            setDirection('DOWN');
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          if (dirRef.current !== 'RIGHT') {
            dirRef.current = 'LEFT';
            setDirection('LEFT');
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          if (dirRef.current !== 'LEFT') {
            dirRef.current = 'RIGHT';
            setDirection('RIGHT');
          }
          break;
        case ' ':
          e.preventDefault();
          if (!isStarted) {
            resetGame();
          } else {
            setIsPaused((p) => !p);
          }
          break;
      }
    },
    [gameOver, isStarted, resetGame]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isStarted || gameOver || isPaused) return;

    const speed = Math.max(MIN_SPEED, INITIAL_SPEED - score * SPEED_INCREMENT);

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        let newHead: Point;

        switch (dirRef.current) {
          case 'UP':
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case 'LEFT':
            newHead = { x: head.x - 1, y: head.y };
            break;
          case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          setHighScore((hs) => Math.max(hs, score));
          return prev;
        }

        // Check self collision
        if (prev.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          setHighScore((hs) => Math.max(hs, score));
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Check food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(getRandomFood(newSnake));
          // Don't remove tail — snake grows
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isStarted, gameOver, isPaused, food, score, direction]);

  // Focus on mount
  useEffect(() => {
    gameRef.current?.focus();
  }, []);

  const boardWidth = GRID_SIZE * CELL_SIZE;

  return (
    <div
      ref={gameRef}
      tabIndex={0}
      style={{
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        background: '#c0c0c0',
      }}
    >
      {/* Header */}
      <div
        style={{
          width: boardWidth,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
          padding: '2px 4px',
        }}
      >
        <div
          className="sunken-panel"
          style={{
            padding: '2px 8px',
            background: '#000',
            color: '#ff0000',
            fontFamily: 'monospace',
            fontSize: 14,
            fontWeight: 'bold',
            minWidth: 50,
            textAlign: 'center',
          }}
        >
          {String(score).padStart(3, '0')}
        </div>
        <button
          onClick={resetGame}
          style={{ fontSize: 11, padding: '2px 12px' }}
        >
          {gameOver ? '😵' : isPaused ? '😐' : '🐍'}
        </button>
        <div
          className="sunken-panel"
          style={{
            padding: '2px 8px',
            background: '#000',
            color: '#ff0000',
            fontFamily: 'monospace',
            fontSize: 14,
            fontWeight: 'bold',
            minWidth: 50,
            textAlign: 'center',
          }}
        >
          {String(highScore).padStart(3, '0')}
        </div>
      </div>

      {/* Game board */}
      <div
        className="sunken-panel"
        style={{
          width: boardWidth + 4,
          height: boardWidth + 4,
          position: 'relative',
          background: '#006400',
          overflow: 'hidden',
        }}
      >
        {/* Grid lines */}
        {Array.from({ length: GRID_SIZE }).map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            <div
              style={{
                position: 'absolute',
                left: i * CELL_SIZE + 2,
                top: 2,
                width: 1,
                height: boardWidth,
                background: 'rgba(0,80,0,0.3)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 2,
                top: i * CELL_SIZE + 2,
                width: boardWidth,
                height: 1,
                background: 'rgba(0,80,0,0.3)',
              }}
            />
          </React.Fragment>
        ))}

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={`snake-${i}`}
            style={{
              position: 'absolute',
              left: segment.x * CELL_SIZE + 2,
              top: segment.y * CELL_SIZE + 2,
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
              background: i === 0 ? '#00cc00' : '#00ff00',
              border: '1px solid #008000',
              borderRadius: i === 0 ? 3 : 1,
            }}
          >
            {i === 0 && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    width: 3,
                    height: 3,
                    background: '#000',
                    borderRadius: '50%',
                    top: dirRef.current === 'DOWN' ? 10 : dirRef.current === 'UP' ? 2 : 4,
                    left: dirRef.current === 'RIGHT' ? 10 : dirRef.current === 'LEFT' ? 2 : 3,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    width: 3,
                    height: 3,
                    background: '#000',
                    borderRadius: '50%',
                    top: dirRef.current === 'DOWN' ? 10 : dirRef.current === 'UP' ? 2 : 4,
                    left: dirRef.current === 'RIGHT' ? 10 : dirRef.current === 'LEFT' ? 2 : 10,
                  }}
                />
              </>
            )}
          </div>
        ))}

        {/* Food */}
        <div
          style={{
            position: 'absolute',
            left: food.x * CELL_SIZE + 2,
            top: food.y * CELL_SIZE + 2,
            width: CELL_SIZE - 1,
            height: CELL_SIZE - 1,
            background: '#ff0000',
            border: '1px solid #cc0000',
            borderRadius: '50%',
          }}
        />

        {/* Overlay messages */}
        {!isStarted && !gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)',
              color: '#00ff00',
              fontFamily: 'monospace',
              zIndex: 1,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>SNAKE</div>
            <div style={{ fontSize: 11 }}>Press SPACE or click 🐍 to start</div>
            <div style={{ fontSize: 10, marginTop: 8, color: '#808080' }}>
              Arrow keys or WASD to move
            </div>
          </div>
        )}

        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)',
              color: '#ff0000',
              fontFamily: 'monospace',
              zIndex: 1,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>GAME OVER</div>
            <div style={{ fontSize: 13, color: '#00ff00', marginBottom: 8 }}>
              Score: {score}
            </div>
            <div style={{ fontSize: 11, color: '#808080' }}>
              Press SPACE or click 😵 to restart
            </div>
          </div>
        )}

        {isPaused && !gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.5)',
              color: '#ffff00',
              fontFamily: 'monospace',
              fontSize: 18,
              fontWeight: 'bold',
              zIndex: 1,
            }}
          >
            PAUSED
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div style={{ marginTop: 4, fontSize: 10, color: '#808080', textAlign: 'center' }}>
        Arrow keys / WASD to move | Space to pause
      </div>

      <TouchControls
        onUp={() => { if (dirRef.current !== 'DOWN') { dirRef.current = 'UP'; setDirection('UP'); } }}
        onDown={() => { if (dirRef.current !== 'UP') { dirRef.current = 'DOWN'; setDirection('DOWN'); } }}
        onLeft={() => { if (dirRef.current !== 'RIGHT') { dirRef.current = 'LEFT'; setDirection('LEFT'); } }}
        onRight={() => { if (dirRef.current !== 'LEFT') { dirRef.current = 'RIGHT'; setDirection('RIGHT'); } }}
        onAction={() => { if (!isStarted) { resetGame(); } else { setIsPaused((p) => !p); } }}
        actionLabel={!isStarted ? 'Start' : isPaused ? 'Resume' : 'Pause'}
      />
    </div>
  );
};
