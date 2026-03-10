import React, { lazy, Suspense } from 'react';
import { Desktop } from './components/Desktop/Desktop';
import { WindowManager } from './components/Window/WindowManager';
import { Taskbar } from './components/Taskbar/Taskbar';
import { CommandPromptView } from './components/CommandPrompt/CommandPromptView';
import { useViewModeStore } from './store/useViewModeStore';

// Lazy-load the game to keep Win95 desktop fast
const GameView = lazy(() => import('./components/Game'));

const App: React.FC = () => {
  const viewMode = useViewModeStore((s) => s.viewMode);

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
    </>
  );
};

export default App;
