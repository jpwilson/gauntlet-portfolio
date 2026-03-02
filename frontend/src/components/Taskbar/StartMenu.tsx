import React from 'react';
import { Win95Icon } from '../shared/Win95Icon';
import { useDesktopStore } from '../../store/useDesktopStore';
import { useWindowStore } from '../../store/useWindowStore';
import { useViewModeStore } from '../../store/useViewModeStore';

export const StartMenu: React.FC = () => {
  const isOpen = useDesktopStore((s) => s.isStartMenuOpen);
  const closeStartMenu = useDesktopStore((s) => s.closeStartMenu);
  const openWindow = useWindowStore((s) => s.openWindow);
  const setViewMode = useViewModeStore((s) => s.setViewMode);

  if (!isOpen) return null;

  const handleItemClick = (action: () => void) => {
    action();
    closeStartMenu();
  };

  return (
    <>
      <div className="start-menu-overlay" onClick={closeStartMenu} />
      <div className="start-menu">
        <div className="start-menu-sidebar">
          Windows<span style={{ fontWeight: 'normal', fontSize: 10 }}>95</span>
        </div>
        <div className="start-menu-items">
          <button
            className="start-menu-item"
            onClick={() =>
              handleItemClick(() =>
                openWindow({ type: 'project-explorer', title: 'Gauntlet Projects', icon: 'folder', data: { category: 'gauntlet' } })
              )
            }
          >
            <Win95Icon type="folder" size={32} className="start-menu-item-icon" />
            <span>Gauntlet Projects</span>
          </button>
          <button
            className="start-menu-item"
            onClick={() =>
              handleItemClick(() =>
                openWindow({ type: 'project-explorer-other', title: 'Other Projects', icon: 'folder', data: { category: 'other' } })
              )
            }
          >
            <Win95Icon type="folder" size={32} className="start-menu-item-icon" />
            <span>Other Projects</span>
          </button>
          <button
            className="start-menu-item"
            onClick={() =>
              handleItemClick(() => openWindow({ type: 'about', title: 'About Me', icon: 'computer' }))
            }
          >
            <Win95Icon type="computer" size={32} className="start-menu-item-icon" />
            <span>About Me</span>
          </button>

          <div className="start-menu-separator" />

          <button
            className="start-menu-item"
            onClick={() =>
              handleItemClick(() =>
                openWindow({
                  type: 'games-folder',
                  title: 'Games',
                  icon: 'games-folder',
                  size: { width: 500, height: 350 },
                })
              )
            }
          >
            <Win95Icon type="games-folder" size={32} className="start-menu-item-icon" />
            <span>Games</span>
          </button>

          <button
            className="start-menu-item"
            onClick={() =>
              handleItemClick(() =>
                openWindow({
                  type: 'changelog',
                  title: 'Changelog.txt - Notepad',
                  icon: 'notepad',
                  size: { width: 550, height: 500 },
                })
              )
            }
          >
            <Win95Icon type="notepad" size={32} className="start-menu-item-icon" />
            <span>Changelog</span>
          </button>

          <div className="start-menu-separator" />

          <button
            className="start-menu-item"
            onClick={() => handleItemClick(() => setViewMode('cmd'))}
          >
            <Win95Icon type="cmd" size={32} className="start-menu-item-icon" />
            <span>MS-DOS Prompt</span>
          </button>

          <div className="start-menu-separator" />

          <button
            className="start-menu-item"
            onClick={() => handleItemClick(() => setViewMode('cmd'))}
          >
            <Win95Icon type="computer" size={32} className="start-menu-item-icon" />
            <span>Shut Down...</span>
          </button>
        </div>
      </div>
    </>
  );
};
