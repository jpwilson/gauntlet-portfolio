import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/directory/Layout';
import { ProjectsPage } from './components/directory/ProjectsPage';
import { ProjectDetailPage } from './components/directory/ProjectDetailPage';
import { AboutPage } from './components/directory/AboutPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};

export default App;
