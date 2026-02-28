import React from 'react';
import { Win95Icon } from '../shared/Win95Icon';
import { useDesktopStore } from '../../store/useDesktopStore';

export const StartButton: React.FC = () => {
  const toggleStartMenu = useDesktopStore((s) => s.toggleStartMenu);
  const isStartMenuOpen = useDesktopStore((s) => s.isStartMenuOpen);

  return (
    <button
      className={`start-button ${isStartMenuOpen ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        toggleStartMenu();
      }}
      style={isStartMenuOpen ? { borderStyle: 'inset' } : {}}
    >
      <Win95Icon type="windows" size={16} className="start-button-logo" />
      <span>Start</span>
    </button>
  );
};
