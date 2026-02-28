import React from 'react';
import { StartButton } from './StartButton';
import { StartMenu } from './StartMenu';
import { TaskbarWindowList } from './TaskbarWindowList';
import { SystemTray } from './SystemTray';

export const Taskbar: React.FC = () => {
  return (
    <>
      <StartMenu />
      <div className="taskbar no-select">
        <StartButton />
        <div className="taskbar-divider" />
        <TaskbarWindowList />
        <SystemTray />
      </div>
    </>
  );
};
