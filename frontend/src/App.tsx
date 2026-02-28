import React from 'react';
import { Desktop } from './components/Desktop/Desktop';
import { WindowManager } from './components/Window/WindowManager';
import { Taskbar } from './components/Taskbar/Taskbar';
import { CommandPromptView } from './components/CommandPrompt/CommandPromptView';
import { useViewModeStore } from './store/useViewModeStore';

const App: React.FC = () => {
  const viewMode = useViewModeStore((s) => s.viewMode);

  return (
    <>
      {viewMode === 'desktop' ? (
        <>
          <Desktop />
          <WindowManager />
          <Taskbar />
        </>
      ) : (
        <CommandPromptView />
      )}
    </>
  );
};

export default App;
