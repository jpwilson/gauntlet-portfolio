import React from 'react';
import { DesktopIconGrid } from './DesktopIconGrid';
import { useDesktopStore } from '../../store/useDesktopStore';

export const Desktop: React.FC = () => {
  const selectIcon = useDesktopStore((s) => s.selectIcon);
  const closeStartMenu = useDesktopStore((s) => s.closeStartMenu);

  const handleDesktopClick = () => {
    selectIcon(null);
    closeStartMenu();
  };

  return (
    <div className="desktop" onClick={handleDesktopClick}>
      <DesktopIconGrid />
    </div>
  );
};
