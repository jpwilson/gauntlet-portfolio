import React from 'react';
import { Win95Icon } from '../shared/Win95Icon';

interface TitleBarProps {
  title: string;
  icon?: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  title,
  icon,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  return (
    <div className="title-bar">
      <div className="title-bar-text" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {icon && <Win95Icon type={icon} size={16} />}
        {title}
      </div>
      <div className="title-bar-controls">
        <button
          aria-label="Minimize"
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
        />
        <button
          aria-label="Maximize"
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
        />
        <button
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />
      </div>
    </div>
  );
};
