export interface DesktopIconConfig {
  id: string;
  label: string;
  iconType: string;
  windowType: string;
  windowTitle: string;
  windowSize?: { width: number; height: number };
}

export const desktopIcons: DesktopIconConfig[] = [
  {
    id: 'my-computer',
    label: 'My Computer',
    iconType: 'computer',
    windowType: 'about',
    windowTitle: 'My Computer',
  },
  {
    id: 'gauntlet-projects',
    label: 'Gauntlet Projects',
    iconType: 'folder',
    windowType: 'project-explorer',
    windowTitle: 'Gauntlet Projects',
    windowSize: { width: 600, height: 450 },
  },
  {
    id: 'other-projects',
    label: 'Other Projects',
    iconType: 'folder',
    windowType: 'project-explorer-other',
    windowTitle: 'Other Projects',
    windowSize: { width: 600, height: 450 },
  },
  {
    id: 'cmd',
    label: 'Command Prompt',
    iconType: 'cmd',
    windowType: 'cmd-switch',
    windowTitle: 'Command Prompt',
  },
  {
    id: 'minesweeper',
    label: 'Minesweeper',
    iconType: 'minesweeper',
    windowType: 'minesweeper',
    windowTitle: 'Minesweeper',
    windowSize: { width: 280, height: 380 },
  },
  {
    id: 'skifree',
    label: 'SkiFree',
    iconType: 'skifree',
    windowType: 'skifree',
    windowTitle: 'SkiFree',
    windowSize: { width: 660, height: 520 },
  },
  {
    id: 'pipe-dream',
    label: 'Pipe Dream',
    iconType: 'pipedream',
    windowType: 'pipedream',
    windowTitle: 'Pipe Dream',
    windowSize: { width: 660, height: 520 },
  },
  {
    id: 'changelog',
    label: 'Changelog.txt',
    iconType: 'notepad',
    windowType: 'changelog',
    windowTitle: 'Changelog.txt - Notepad',
    windowSize: { width: 550, height: 500 },
  },
  {
    id: 'recycle-bin',
    label: 'Recycle Bin',
    iconType: 'recycle',
    windowType: 'recycle-bin',
    windowTitle: 'Recycle Bin',
  },
];
