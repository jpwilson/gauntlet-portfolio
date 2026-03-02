import React, { lazy, Suspense } from 'react';
import { Window } from './Window';
import { useWindowStore } from '../../store/useWindowStore';
import { WindowState } from '../../types/window';

// Lazy load heavy components (games)
const Minesweeper = lazy(() => import('../Games/Minesweeper/Minesweeper').then(m => ({ default: m.Minesweeper })));
const SkiFree = lazy(() => import('../Games/SkiFree/SkiFree').then(m => ({ default: m.SkiFree })));
const PipeDream = lazy(() => import('../Games/PipeDream/PipeDream').then(m => ({ default: m.PipeDream })));
const Snake = lazy(() => import('../Games/Snake/Snake').then(m => ({ default: m.Snake })));

// Eagerly loaded components
import { ProjectExplorer } from '../Portfolio/ProjectExplorer';
import { ProjectDetail } from '../Portfolio/ProjectDetail';
import { ProjectFolder } from '../Portfolio/ProjectFolder';
import { AboutWindow } from '../Portfolio/AboutWindow';
import { ChangelogWindow } from '../Portfolio/ChangelogWindow';
import { GamesFolder } from '../Portfolio/GamesFolder';

const WindowContent: React.FC<{ windowState: WindowState }> = ({ windowState }) => {
  switch (windowState.type) {
    case 'project-explorer':
    case 'project-explorer-other':
      return <ProjectExplorer category={windowState.data?.category as string || 'gauntlet'} />;
    case 'project-folder':
      return <ProjectFolder projectId={windowState.data?.projectId as string} />;
    case 'project-detail':
      return <ProjectDetail projectId={windowState.data?.projectId as string} />;
    case 'about':
      return <AboutWindow />;
    case 'games-folder':
      return <GamesFolder />;
    case 'minesweeper':
      return (
        <Suspense fallback={<div style={{ padding: 8 }}>Loading...</div>}>
          <Minesweeper />
        </Suspense>
      );
    case 'snake':
      return (
        <Suspense fallback={<div style={{ padding: 8 }}>Loading...</div>}>
          <Snake />
        </Suspense>
      );
    case 'skifree':
      return (
        <Suspense fallback={<div style={{ padding: 8 }}>Loading...</div>}>
          <SkiFree />
        </Suspense>
      );
    case 'pipedream':
      return (
        <Suspense fallback={<div style={{ padding: 8 }}>Loading...</div>}>
          <PipeDream />
        </Suspense>
      );
    case 'changelog':
      return <ChangelogWindow />;
    case 'recycle-bin':
      return (
        <div style={{ padding: 8, textAlign: 'center', color: '#808080', marginTop: 40 }}>
          <p>Recycle Bin is empty.</p>
          <p style={{ fontSize: 10, marginTop: 8 }}>(Unlike my collection of abandoned side projects)</p>
        </div>
      );
    default:
      return <div style={{ padding: 8 }}>Window content not found.</div>;
  }
};

export const WindowManager: React.FC = () => {
  const windows = useWindowStore((s) => s.windows);

  return (
    <>
      {windows.map((win) => (
        <Window key={win.id} windowState={win}>
          <WindowContent windowState={win} />
        </Window>
      ))}
    </>
  );
};
