import React, { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Desktop } from '../Desktop/Desktop';
import { WindowManager } from '../Window/WindowManager';
import { Taskbar } from '../Taskbar/Taskbar';
import { CommandPromptView } from '../CommandPrompt/CommandPromptView';
import { useViewModeStore } from '../../store/useViewModeStore';

// These load with this lazy chunk (98.css et al.), scoped under body.view-os.
import '../../styles/global.css';
import '../../styles/desktop.css';
import '../../styles/taskbar.css';
import '../../styles/command-prompt.css';

// Keep three.js out of this chunk too — the racer loads on demand.
const GameView = lazy(() => import('../Game'));

/**
 * The resurrected Win95 world, reachable from the scene's easter eggs at /os.
 * viewMode (desktop / cmd / game) remains this world's internal switch.
 */
const Win95View: React.FC = () => {
  const viewMode = useViewModeStore((s) => s.viewMode);
  const navigate = useNavigate();

  // Gate the win95 global CSS (html/body/#root/scrollbars) to this route only.
  useEffect(() => {
    document.body.classList.add('view-os');
    return () => {
      document.body.classList.remove('view-os');
    };
  }, []);

  return (
    <>
      {viewMode === 'desktop' && (
        <>
          <Desktop />
          <WindowManager />
          <Taskbar />
        </>
      )}
      {viewMode === 'cmd' && <CommandPromptView />}
      {viewMode === 'game' && (
        <Suspense fallback={null}>
          <GameView />
        </Suspense>
      )}
      <button
        type="button"
        onClick={() => navigate('/')}
        title="Leave this machine and return to the realm"
        style={{
          position: 'fixed',
          top: 6,
          right: 6,
          zIndex: 100000,
          fontFamily: 'Tahoma, sans-serif',
          fontSize: 11,
          padding: '2px 8px',
          cursor: 'pointer',
        }}
      >
        ⟵ Leave
      </button>
    </>
  );
};

export default Win95View;
