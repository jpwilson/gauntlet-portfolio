import React, { useCallback } from 'react';
import { Win95Icon } from '../shared/Win95Icon';
import { useDesktopStore } from '../../store/useDesktopStore';
import { useWindowStore } from '../../store/useWindowStore';
import { useViewModeStore } from '../../store/useViewModeStore';
import { DesktopIconConfig } from '../../data/desktopIcons';

interface DesktopIconProps {
  config: DesktopIconConfig;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ config }) => {
  const selectedIconId = useDesktopStore((s) => s.selectedIconId);
  const selectIcon = useDesktopStore((s) => s.selectIcon);
  const openWindow = useWindowStore((s) => s.openWindow);
  const setViewMode = useViewModeStore((s) => s.setViewMode);
  const isSelected = selectedIconId === config.id;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      selectIcon(config.id);
    },
    [config.id, selectIcon]
  );

  const handleDoubleClick = useCallback(() => {
    if (config.windowType === 'cmd-switch') {
      setViewMode('cmd');
      return;
    }
    openWindow({
      type: config.windowType,
      title: config.windowTitle,
      icon: config.iconType,
      size: config.windowSize,
      data: config.windowType === 'project-explorer'
        ? { category: 'gauntlet' }
        : config.windowType === 'project-explorer-other'
        ? { category: 'other' }
        : undefined,
    });
  }, [config, openWindow, setViewMode]);

  return (
    <div
      className={`desktop-icon no-select ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <Win95Icon type={config.iconType} size={32} className="desktop-icon-image" />
      <span className="desktop-icon-label">{config.label}</span>
    </div>
  );
};
