import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/directory/Layout';
import { ProjectsPage } from './components/directory/ProjectsPage';
import { ProjectDetailPage } from './components/directory/ProjectDetailPage';
import { AboutPage } from './components/directory/AboutPage';
import { ScenePage } from './components/scene/ScenePage';

// Lazy chunks: panel content and the whole Win95 world load on demand.
const ScenePanel = lazy(() => import('./components/scene/panels/ScenePanel'));
const Win95View = lazy(() => import('./components/os/Win95View'));

const App: React.FC = () => {
  return (
    <Routes>
      {/* The Middle-earth scene — the default landing. The panel is a nested
          route so opening/closing a landmark never remounts the scene (the
          door-open zoom animates from the live DOM state). */}
      <Route path="/" element={<ScenePage />}>
        <Route
          path="loc/:hotspotId"
          element={
            <Suspense fallback={null}>
              <ScenePanel />
            </Suspense>
          }
        />
      </Route>

      {/* The cyberpunk directory ("the Grid"). Deep links to /project/:id and
          /about keep working; the projects list moved from / to /projects. */}
      <Route element={<Layout />}>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      {/* The Win95 world ("a strange machine"), revived as an easter egg. */}
      <Route
        path="/os"
        element={
          <Suspense fallback={<div style={{ height: '100vh', background: '#008080' }} />}>
            <Win95View />
          </Suspense>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
