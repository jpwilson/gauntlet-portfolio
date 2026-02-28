import React from 'react';
import { DesktopIcon } from './DesktopIcon';
import { desktopIcons } from '../../data/desktopIcons';

export const DesktopIconGrid: React.FC = () => {
  return (
    <div className="desktop-icon-grid">
      {desktopIcons.map((iconConfig) => (
        <DesktopIcon key={iconConfig.id} config={iconConfig} />
      ))}
    </div>
  );
};
