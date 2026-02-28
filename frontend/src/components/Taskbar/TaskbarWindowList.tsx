import React from 'react';
import { Win95Icon } from '../shared/Win95Icon';
import { useWindowStore } from '../../store/useWindowStore';

export const TaskbarWindowList: React.FC = () => {
  const windows = useWindowStore((s) => s.windows);
  const toggleMinimize = useWindowStore((s) => s.toggleMinimize);

  // Find the highest z-index window that's not minimized
  const activeWindowId = windows
    .filter((w) => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;

  return (
    <div className="taskbar-window-list">
      {windows.map((win) => (
        <button
          key={win.id}
          className={`taskbar-window-button ${win.id === activeWindowId && !win.isMinimized ? 'active' : ''}`}
          onClick={() => toggleMinimize(win.id)}
          title={win.title}
        >
          {win.icon && <Win95Icon type={win.icon} size={16} className="taskbar-window-icon" />}
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {win.title}
          </span>
        </button>
      ))}
    </div>
  );
};
