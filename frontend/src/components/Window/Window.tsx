import React, { useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { TitleBar } from './TitleBar';
import { useWindowStore } from '../../store/useWindowStore';
import { WindowState } from '../../types/window';
import { useIsMobile } from '../../hooks/useIsMobile';

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ windowState, children }) => {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updatePosition,
    updateSize,
  } = useWindowStore();

  const { isMobile } = useIsMobile();

  const handleClose = useCallback(() => closeWindow(windowState.id), [windowState.id, closeWindow]);
  const handleMinimize = useCallback(() => minimizeWindow(windowState.id), [windowState.id, minimizeWindow]);
  const handleMaximizeToggle = useCallback(() => {
    if (windowState.isMaximized) {
      restoreWindow(windowState.id);
    } else {
      maximizeWindow(windowState.id);
    }
  }, [windowState.id, windowState.isMaximized, maximizeWindow, restoreWindow]);

  const handleFocus = useCallback(() => {
    focusWindow(windowState.id);
  }, [windowState.id, focusWindow]);

  if (windowState.isMinimized) {
    return null;
  }

  // Mobile: render full-screen windows without drag/resize
  if (isMobile) {
    return (
      <div
        className="window window-shadow mobile-window"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: windowState.zIndex,
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={handleFocus}
      >
        <TitleBar
          title={windowState.title}
          icon={windowState.icon}
          onMinimize={handleMinimize}
          onMaximize={handleMaximizeToggle}
          onClose={handleClose}
        />
        <div className="window-body" style={{ flex: 1, overflow: 'auto', margin: 0 }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <Rnd
      position={windowState.position}
      size={windowState.size}
      minWidth={200}
      minHeight={150}
      style={{ zIndex: windowState.zIndex }}
      onDragStart={handleFocus}
      onDragStop={(_e, d) => {
        updatePosition(windowState.id, { x: d.x, y: d.y });
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        updateSize(windowState.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
        updatePosition(windowState.id, position);
      }}
      onMouseDown={handleFocus}
      disableDragging={windowState.isMaximized}
      enableResizing={!windowState.isMaximized}
      dragHandleClassName="title-bar"
      bounds="parent"
    >
      <div className="window window-shadow" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <TitleBar
          title={windowState.title}
          icon={windowState.icon}
          onMinimize={handleMinimize}
          onMaximize={handleMaximizeToggle}
          onClose={handleClose}
        />
        <div className="window-body" style={{ flex: 1, overflow: 'auto', margin: 0 }}>
          {children}
        </div>
      </div>
    </Rnd>
  );
};
