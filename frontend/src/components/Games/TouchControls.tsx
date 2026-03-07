import React from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

interface TouchControlsProps {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

const btnStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  fontSize: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  touchAction: 'manipulation',
};

export const TouchControls: React.FC<TouchControlsProps> = ({
  onUp, onDown, onLeft, onRight, onAction, actionLabel,
}) => {
  const { isMobile } = useIsMobile();
  if (!isMobile) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, justifyContent: 'center' }}>
      {onAction && (
        <button
          style={{ ...btnStyle, width: 'auto', padding: '0 12px', fontSize: 12 }}
          onTouchStart={(e) => { e.preventDefault(); onAction(); }}
          onClick={onAction}
        >
          {actionLabel || 'Action'}
        </button>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '48px 48px 48px', gridTemplateRows: '48px 48px', gap: 2 }}>
        <div />
        <button style={btnStyle} onTouchStart={(e) => { e.preventDefault(); onUp(); }} onClick={onUp}>
          &#9650;
        </button>
        <div />
        <button style={btnStyle} onTouchStart={(e) => { e.preventDefault(); onLeft(); }} onClick={onLeft}>
          &#9664;
        </button>
        <button style={btnStyle} onTouchStart={(e) => { e.preventDefault(); onDown(); }} onClick={onDown}>
          &#9660;
        </button>
        <button style={btnStyle} onTouchStart={(e) => { e.preventDefault(); onRight(); }} onClick={onRight}>
          &#9654;
        </button>
      </div>
    </div>
  );
};
