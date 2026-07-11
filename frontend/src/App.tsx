import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/directory/Layout';
import { ProjectsPage } from './components/directory/ProjectsPage';
import { ProjectDetailPage } from './components/directory/ProjectDetailPage';
import { AboutPage } from './components/directory/AboutPage';
import { ScenePage } from './components/scene/ScenePage';

// Lazy chunks: interior rooms and the whole Win95 world load on demand.
const RoomPage = lazy(() => import('./components/room/RoomPage'));
const Win95View = lazy(() => import('./components/os/Win95View'));

const App: React.FC = () => {
  return (
    <Routes>
      {/* The Middle-earth scene — the default landing. Landmarks zoom, then
          walk into interior rooms. */}
      <Route path="/" element={<ScenePage />} />
      <Route
        path="/in/:roomId"
        element={
          <Suspense fallback={<div style={{ height: '100vh', background: '#0a0f13' }} />}>
            <RoomPage />
          </Suspense>
        }
      />

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
