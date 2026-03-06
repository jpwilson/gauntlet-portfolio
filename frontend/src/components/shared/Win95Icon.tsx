import React from 'react';

interface Win95IconProps {
  type: string;
  size?: number;
  className?: string;
}

// Inline SVG icons styled to look like Windows 95 icons
export const Win95Icon: React.FC<Win95IconProps> = ({ type, size = 32, className = '' }) => {
  const iconMap: Record<string, React.ReactNode> = {
    computer: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="2" y="4" width="28" height="20" fill="#c0c0c0" stroke="#000" strokeWidth="1"/>
        <rect x="4" y="6" width="24" height="14" fill="#000080"/>
        <rect x="5" y="7" width="22" height="12" fill="#008080"/>
        <rect x="10" y="24" width="12" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.5"/>
        <rect x="8" y="26" width="16" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.5"/>
        <circle cx="27" cy="22" r="1" fill="#00ff00"/>
      </svg>
    ),
    folder: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <path d="M2 8 L2 28 L30 28 L30 10 L14 10 L12 8 Z" fill="#ffff00" stroke="#808000" strokeWidth="1"/>
        <path d="M2 10 L30 10 L30 28 L2 28 Z" fill="#ffff80" stroke="#808000" strokeWidth="0.5"/>
        <path d="M2 8 L12 8 L14 10 L2 10 Z" fill="#ffff00" stroke="#808000" strokeWidth="0.5"/>
      </svg>
    ),
    'folder-open': (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <path d="M2 8 L2 28 L30 28 L30 10 L14 10 L12 8 Z" fill="#ffff00" stroke="#808000" strokeWidth="1"/>
        <path d="M2 14 L6 10 L30 10 L26 14 Z" fill="#ffff00" stroke="#808000" strokeWidth="0.5"/>
        <path d="M2 14 L26 14 L30 28 L2 28 Z" fill="#ffff80" stroke="#808000" strokeWidth="0.5"/>
      </svg>
    ),
    cmd: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="2" y="4" width="28" height="24" fill="#000000" stroke="#c0c0c0" strokeWidth="1"/>
        <rect x="2" y="4" width="28" height="4" fill="#000080"/>
        <text x="4" y="7.5" fill="white" fontSize="3" fontFamily="monospace">Command Prompt</text>
        <text x="4" y="14" fill="#00ff00" fontSize="4" fontFamily="monospace">C:\&gt;_</text>
      </svg>
    ),
    minesweeper: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="2" y="2" width="28" height="28" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
        <circle cx="16" cy="16" r="8" fill="#000000"/>
        <line x1="16" y1="4" x2="16" y2="8" stroke="#000" strokeWidth="2"/>
        <line x1="16" y1="24" x2="16" y2="28" stroke="#000" strokeWidth="2"/>
        <line x1="4" y1="16" x2="8" y2="16" stroke="#000" strokeWidth="2"/>
        <line x1="24" y1="16" x2="28" y2="16" stroke="#000" strokeWidth="2"/>
        <line x1="8" y1="8" x2="10.5" y2="10.5" stroke="#000" strokeWidth="1.5"/>
        <line x1="24" y1="8" x2="21.5" y2="10.5" stroke="#000" strokeWidth="1.5"/>
        <line x1="8" y1="24" x2="10.5" y2="21.5" stroke="#000" strokeWidth="1.5"/>
        <line x1="24" y1="24" x2="21.5" y2="21.5" stroke="#000" strokeWidth="1.5"/>
        <circle cx="13" cy="13" r="2" fill="#ffffff" opacity="0.5"/>
      </svg>
    ),
    skifree: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="0" y="0" width="32" height="32" fill="#ffffff"/>
        {/* Skier */}
        <circle cx="16" cy="10" r="3" fill="#ff00ff"/>
        <line x1="16" y1="13" x2="16" y2="22" stroke="#0000ff" strokeWidth="2"/>
        <line x1="16" y1="16" x2="12" y2="14" stroke="#0000ff" strokeWidth="1.5"/>
        <line x1="16" y1="16" x2="20" y2="14" stroke="#0000ff" strokeWidth="1.5"/>
        <line x1="16" y1="22" x2="13" y2="26" stroke="#0000ff" strokeWidth="1.5"/>
        <line x1="16" y1="22" x2="19" y2="26" stroke="#0000ff" strokeWidth="1.5"/>
        {/* Skis */}
        <line x1="11" y1="26" x2="15" y2="26" stroke="#808080" strokeWidth="1"/>
        <line x1="17" y1="26" x2="21" y2="26" stroke="#808080" strokeWidth="1"/>
        {/* Tree */}
        <polygon points="5,20 2,28 8,28" fill="#008000"/>
        <rect x="4" y="28" width="2" height="2" fill="#804000"/>
        {/* Snow dots */}
        <circle cx="25" cy="8" r="0.5" fill="#c0c0c0"/>
        <circle cx="28" cy="15" r="0.5" fill="#c0c0c0"/>
        <circle cx="3" cy="6" r="0.5" fill="#c0c0c0"/>
      </svg>
    ),
    pipedream: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="2" y="2" width="28" height="28" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
        {/* Pipes */}
        <rect x="4" y="12" width="10" height="8" fill="none" stroke="#008000" strokeWidth="3" rx="1"/>
        <rect x="14" y="12" width="8" height="8" fill="none" stroke="#008000" strokeWidth="3" rx="1"/>
        <rect x="14" y="4" width="8" height="8" fill="none" stroke="#008000" strokeWidth="3" rx="1"/>
        {/* Flow */}
        <rect x="6" y="14" width="6" height="4" fill="#00ff00" opacity="0.6"/>
        <rect x="16" y="14" width="4" height="4" fill="#00ff00" opacity="0.4"/>
      </svg>
    ),
    recycle: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="8" y="8" width="16" height="20" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
        <rect x="6" y="6" width="20" height="4" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
        <rect x="12" y="4" width="8" height="3" fill="none" stroke="#808080" strokeWidth="1"/>
        <line x1="12" y1="12" x2="12" y2="25" stroke="#808080" strokeWidth="1"/>
        <line x1="16" y1="12" x2="16" y2="25" stroke="#808080" strokeWidth="1"/>
        <line x1="20" y1="12" x2="20" y2="25" stroke="#808080" strokeWidth="1"/>
      </svg>
    ),
    notepad: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="4" y="2" width="22" height="28" fill="#ffffff" stroke="#000080" strokeWidth="1"/>
        <rect x="4" y="2" width="22" height="4" fill="#000080"/>
        <text x="6" y="5" fill="white" fontSize="3" fontFamily="monospace">Notepad</text>
        <line x1="7" y1="10" x2="23" y2="10" stroke="#808080" strokeWidth="0.5"/>
        <line x1="7" y1="14" x2="23" y2="14" stroke="#808080" strokeWidth="0.5"/>
        <line x1="7" y1="18" x2="20" y2="18" stroke="#808080" strokeWidth="0.5"/>
        <line x1="7" y1="22" x2="23" y2="22" stroke="#808080" strokeWidth="0.5"/>
      </svg>
    ),
    internet: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <circle cx="16" cy="16" r="12" fill="#0000ff" stroke="#000080" strokeWidth="1"/>
        <ellipse cx="16" cy="16" rx="6" ry="12" fill="none" stroke="#ffffff" strokeWidth="0.8"/>
        <line x1="4" y1="16" x2="28" y2="16" stroke="#ffffff" strokeWidth="0.8"/>
        <ellipse cx="16" cy="11" rx="10" ry="3" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
        <ellipse cx="16" cy="21" rx="10" ry="3" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
      </svg>
    ),
    windows: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="2" y="6" width="12" height="10" fill="#ff0000"/>
        <rect x="16" y="6" width="14" height="10" fill="#00ff00"/>
        <rect x="2" y="18" width="12" height="10" fill="#0000ff"/>
        <rect x="16" y="18" width="14" height="10" fill="#ffff00"/>
      </svg>
    ),
    file: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <path d="M6 2 L20 2 L26 8 L26 30 L6 30 Z" fill="#ffffff" stroke="#000" strokeWidth="1"/>
        <path d="M20 2 L20 8 L26 8" fill="#c0c0c0" stroke="#000" strokeWidth="0.5"/>
        <line x1="9" y1="12" x2="23" y2="12" stroke="#808080" strokeWidth="0.5"/>
        <line x1="9" y1="16" x2="23" y2="16" stroke="#808080" strokeWidth="0.5"/>
        <line x1="9" y1="20" x2="23" y2="20" stroke="#808080" strokeWidth="0.5"/>
        <line x1="9" y1="24" x2="18" y2="24" stroke="#808080" strokeWidth="0.5"/>
      </svg>
    ),
    github: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#ffffff" stroke="#000" strokeWidth="1"/>
        <circle cx="16" cy="14" r="8" fill="#000000"/>
        <ellipse cx="16" cy="24" rx="5" ry="3" fill="#000000"/>
        <circle cx="12" cy="12" r="1.5" fill="#ffffff"/>
        <circle cx="20" cy="12" r="1.5" fill="#ffffff"/>
        <path d="M10 18 Q16 22 22 18" fill="none" stroke="#ffffff" strokeWidth="1"/>
        <path d="M8 16 Q6 22 9 24" fill="none" stroke="#000000" strokeWidth="1.5"/>
        <path d="M24 16 Q26 22 23 24" fill="none" stroke="#000000" strokeWidth="1.5"/>
      </svg>
    ),
    snake: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="2" y="2" width="28" height="28" fill="#006400" stroke="#004d00" strokeWidth="1"/>
        {/* Snake body */}
        <rect x="4" y="14" width="4" height="4" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
        <rect x="8" y="14" width="4" height="4" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
        <rect x="12" y="14" width="4" height="4" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
        <rect x="12" y="10" width="4" height="4" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
        <rect x="16" y="10" width="4" height="4" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
        {/* Snake head */}
        <rect x="20" y="10" width="4" height="4" fill="#00cc00" stroke="#008000" strokeWidth="0.5"/>
        <circle cx="22" cy="11.5" r="0.8" fill="#000"/>
        {/* Apple */}
        <rect x="22" y="20" width="4" height="4" fill="#ff0000" stroke="#cc0000" strokeWidth="0.5"/>
        <line x1="24" y1="18.5" x2="24" y2="20" stroke="#008000" strokeWidth="1"/>
      </svg>
    ),
    tetris: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="2" y="2" width="28" height="28" fill="#000000" stroke="#808080" strokeWidth="1"/>
        {/* T piece */}
        <rect x="10" y="6" width="6" height="6" fill="#a000a0" stroke="#ff00ff" strokeWidth="0.5"/>
        <rect x="16" y="6" width="6" height="6" fill="#a000a0" stroke="#ff00ff" strokeWidth="0.5"/>
        <rect x="22" y="6" width="6" height="6" fill="#a000a0" stroke="#ff00ff" strokeWidth="0.5"/>
        <rect x="16" y="12" width="6" height="6" fill="#a000a0" stroke="#ff00ff" strokeWidth="0.5"/>
        {/* Landed blocks */}
        <rect x="4" y="20" width="6" height="6" fill="#ff0000" stroke="#cc0000" strokeWidth="0.5"/>
        <rect x="10" y="20" width="6" height="6" fill="#00ff00" stroke="#008000" strokeWidth="0.5"/>
        <rect x="16" y="20" width="6" height="6" fill="#0000ff" stroke="#000080" strokeWidth="0.5"/>
        <rect x="22" y="20" width="6" height="6" fill="#ffff00" stroke="#808000" strokeWidth="0.5"/>
        <rect x="4" y="14" width="6" height="6" fill="#00ffff" stroke="#008080" strokeWidth="0.5"/>
      </svg>
    ),
    solitaire: (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <rect x="2" y="2" width="28" height="28" fill="#008000" stroke="#004d00" strokeWidth="1"/>
        {/* Card */}
        <rect x="8" y="5" width="16" height="22" rx="1" fill="#ffffff" stroke="#000" strokeWidth="0.5"/>
        {/* Heart */}
        <text x="10" y="13" fill="#ff0000" fontSize="6" fontFamily="serif">A</text>
        <text x="10" y="19" fill="#ff0000" fontSize="8" fontFamily="serif">&hearts;</text>
        {/* Second card peeking */}
        <rect x="4" y="7" width="16" height="22" rx="1" fill="#0000aa" stroke="#000" strokeWidth="0.5"/>
        <line x1="7" y1="10" x2="17" y2="10" stroke="#0000cc" strokeWidth="0.5"/>
        <line x1="7" y1="13" x2="17" y2="13" stroke="#0000cc" strokeWidth="0.5"/>
        <line x1="7" y1="16" x2="17" y2="16" stroke="#0000cc" strokeWidth="0.5"/>
        <line x1="7" y1="19" x2="17" y2="19" stroke="#0000cc" strokeWidth="0.5"/>
        <line x1="7" y1="22" x2="17" y2="22" stroke="#0000cc" strokeWidth="0.5"/>
        <line x1="7" y1="25" x2="17" y2="25" stroke="#0000cc" strokeWidth="0.5"/>
      </svg>
    ),
    'games-folder': (
      <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
        <path d="M2 8 L2 28 L30 28 L30 10 L14 10 L12 8 Z" fill="#ffff00" stroke="#808000" strokeWidth="1"/>
        <path d="M2 10 L30 10 L30 28 L2 28 Z" fill="#ffff80" stroke="#808000" strokeWidth="0.5"/>
        <path d="M2 8 L12 8 L14 10 L2 10 Z" fill="#ffff00" stroke="#808000" strokeWidth="0.5"/>
        {/* Joystick icon on folder */}
        <circle cx="16" cy="19" r="4" fill="#c0c0c0" stroke="#808080" strokeWidth="0.5"/>
        <line x1="16" y1="15" x2="14" y2="12" stroke="#000" strokeWidth="1.5"/>
        <circle cx="14" cy="12" r="1.5" fill="#ff0000"/>
      </svg>
    ),
  };

  return <>{iconMap[type] || iconMap['file']}</>;
};
