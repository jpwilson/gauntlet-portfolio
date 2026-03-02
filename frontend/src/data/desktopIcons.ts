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
    label: 'Gauntlet\nProjects',
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
    label: 'Command\nPrompt',
    iconType: 'cmd',
    windowType: 'cmd-switch',
    windowTitle: 'Command Prompt',
  },
  {
    id: 'games',
    label: 'Games',
    iconType: 'games-folder',
    windowType: 'games-folder',
    windowTitle: 'Games',
    windowSize: { width: 500, height: 350 },
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
