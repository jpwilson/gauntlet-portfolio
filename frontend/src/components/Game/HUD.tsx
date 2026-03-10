import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useGameStore } from './gameStore';
import { useViewModeStore } from '../../store/useViewModeStore';
import { PROJECT_STOPS, ROAD_LENGTH } from './roadConfig';

// Password format: ProjectName#321 (matching existing portfolio password scheme)
function getPassword(projectName: string): string {
  // Extract the name part after the week prefix
  const parts = projectName.split(' - ');
  const name = parts.length > 1 ? parts[1] : projectName;
  return `${name}#321`;
}

export const HUD: React.FC = () => {
  const speed = useGameStore((s) => s.speed);
  const score = useGameStore((s) => s.score);
  const activeZone = useGameStore((s) => s.activeZone);
  const showPasswordPrompt = useGameStore((s) => s.showPasswordPrompt);
  const passwordInput = useGameStore((s) => s.passwordInput);
  const boosted = useGameStore((s) => s.boosted);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const hitFlash = useGameStore((s) => s.hitFlash);
  const unlockedProjects = useGameStore((s) => s.unlockedProjects);

  const setGameStarted = useGameStore((s) => s.setGameStarted);
  const setPasswordInput = useGameStore((s) => s.setPasswordInput);
  const setShowPasswordPrompt = useGameStore((s) => s.setShowPasswordPrompt);
  const unlockProject = useGameStore((s) => s.unlockProject);
  const reset = useGameStore((s) => s.reset);

  const setViewMode = useViewModeStore((s) => s.setViewMode);

  const [passwordError, setPasswordError] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const visitedCount = useGameStore((s) => Math.floor(s.score / 100)); // Rough count

  // Focus password input when shown
  useEffect(() => {
    if (showPasswordPrompt && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [showPasswordPrompt]);

  const handleExit = useCallback(() => {
    reset();
    setViewMode('desktop');
  }, [reset, setViewMode]);

  // ESC to exit
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        if (showPasswordPrompt) {
          setShowPasswordPrompt(false);
          setPasswordInput('');
          setPasswordError(false);
        } else if (!gameStarted) {
          handleExit();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showPasswordPrompt, gameStarted, handleExit, setShowPasswordPrompt, setPasswordInput]);

  const handlePasswordSubmit = useCallback(() => {
    if (!activeZone) return;
    const correct = getPassword(activeZone.name);
    if (passwordInput === correct) {
      unlockProject(activeZone.id);
      setShowPasswordPrompt(false);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [activeZone, passwordInput, unlockProject, setShowPasswordPrompt, setPasswordInput]);

  // Touch control handlers
  const handleTouchStart = useCallback((key: string) => {
    const gameKeys = (window as any).__gameKeys;
    if (gameKeys) gameKeys[key] = true;
  }, []);

  const handleTouchEnd = useCallback((key: string) => {
    const gameKeys = (window as any).__gameKeys;
    if (gameKeys) gameKeys[key] = false;
  }, []);

  // Start screen
  if (!gameStarted) {
    return (
      <div className="game-start-screen">
        <div className="game-start-title">PORTFOLIO RACER</div>
        <div className="game-start-subtitle">Drive through JP Wilson's projects</div>
        <div className="game-start-controls">
          <span className="key">W</span> / <span className="key">↑</span> Accelerate<br />
          <span className="key">S</span> / <span className="key">↓</span> Brake<br />
          <span className="key">A</span> / <span className="key">↑</span> Steer Left{' '}
          <span className="key">D</span> / <span className="key">→</span> Steer Right<br />
          Hit speed boosts, jump ramps, discover all 12 project zones!
        </div>
        <button className="game-start-btn" onClick={() => setGameStarted(true)}>
          START RACE
        </button>
        <button className="game-start-back" onClick={handleExit}>
          ← Back to Desktop
        </button>
      </div>
    );
  }

  // Calculate progress
  const carZ = Math.abs(speed); // Approximate - we'd need actual position
  const zonesFound = Math.floor(score / 100);

  return (
    <div className="game-hud">
      {/* Score */}
      <div className="hud-score">
        SCORE: {score}
      </div>

      {/* Zones found */}
      <div className="hud-zones">
        ZONES: {zonesFound} / {PROJECT_STOPS.length}
      </div>

      {/* Speed */}
      <div className="hud-speed">
        <div className="hud-speed-value">{speed}</div>
        <div className="hud-speed-unit">km/h</div>
      </div>

      {/* Boost indicator */}
      {boosted && <div className="hud-boost">BOOST!</div>}

      {/* Hit flash */}
      {hitFlash && <div className="hud-hit-flash" />}

      {/* Project popup */}
      {activeZone && !showPasswordPrompt && (
        <div className="hud-project-popup">
          <h3>{activeZone.name}</h3>
          <p>{activeZone.description}</p>
          {activeZone.techStack.length > 0 && activeZone.techStack[0] !== 'TBD' && (
            <div className="tech-stack">
              {activeZone.techStack.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          )}
          <div className="hud-project-links">
            {activeZone.liveUrl && (
              <a
                href={activeZone.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-project-link"
              >
                View Live ↗
              </a>
            )}
            {activeZone.repoUrl && (
              <a
                href={activeZone.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-project-link secondary"
              >
                GitHub ↗
              </a>
            )}
            {activeZone.vizUrl && (
              <a
                href={activeZone.vizUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-project-link secondary"
              >
                Visualization ↗
              </a>
            )}
          </div>
        </div>
      )}

      {/* Password prompt */}
      {showPasswordPrompt && activeZone && (
        <div className="hud-password-overlay">
          <div className="hud-password-box">
            <h3>🔒 {activeZone.name}</h3>
            <p>This project is password-protected.</p>
            <div>
              <input
                ref={passwordInputRef}
                type="password"
                className="hud-password-input"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePasswordSubmit();
                  if (e.key === 'Escape') {
                    setShowPasswordPrompt(false);
                    setPasswordInput('');
                    setPasswordError(false);
                  }
                  e.stopPropagation(); // Don't trigger game controls
                }}
              />
              <button className="hud-password-submit" onClick={handlePasswordSubmit}>
                Unlock
              </button>
            </div>
            {passwordError && (
              <div className="hud-password-error">Incorrect password. Try again.</div>
            )}
          </div>
        </div>
      )}

      {/* Touch controls (mobile) */}
      <div className="touch-controls">
        <div className="touch-pad">
          <div className="touch-pad-row">
            <button
              className="touch-btn"
              onTouchStart={() => handleTouchStart('left')}
              onTouchEnd={() => handleTouchEnd('left')}
              onMouseDown={() => handleTouchStart('left')}
              onMouseUp={() => handleTouchEnd('left')}
            >
              ◀
            </button>
            <button
              className="touch-btn"
              onTouchStart={() => handleTouchStart('right')}
              onTouchEnd={() => handleTouchEnd('right')}
              onMouseDown={() => handleTouchStart('right')}
              onMouseUp={() => handleTouchEnd('right')}
            >
              ▶
            </button>
          </div>
        </div>
        <div className="touch-pad">
          <button
            className="touch-btn gas"
            onTouchStart={() => handleTouchStart('forward')}
            onTouchEnd={() => handleTouchEnd('forward')}
            onMouseDown={() => handleTouchStart('forward')}
            onMouseUp={() => handleTouchEnd('forward')}
          >
            GAS
          </button>
          <button
            className="touch-btn brake"
            onTouchStart={() => handleTouchStart('backward')}
            onTouchEnd={() => handleTouchEnd('backward')}
            onMouseDown={() => handleTouchStart('backward')}
            onMouseUp={() => handleTouchEnd('backward')}
          >
            BRK
          </button>
        </div>
      </div>

      {/* Exit button */}
      <button className="hud-exit" onClick={handleExit}>
        ESC → Desktop
      </button>
    </div>
  );
};
