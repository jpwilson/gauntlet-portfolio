import React, { useState } from 'react';
import { Win95Icon } from '../shared/Win95Icon';
import { useWindowStore } from '../../store/useWindowStore';
import { Project } from '../../types/project';
import { getProjects } from '../../data/projects';

interface ProjectExplorerProps {
  category: string;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ category }) => {
  const projects = getProjects(category);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const openWindow = useWindowStore((s) => s.openWindow);

  const handleDoubleClick = (project: Project) => {
    openWindow({
      type: 'project-detail',
      title: project.name,
      icon: 'file',
      size: { width: 450, height: 400 },
      data: { projectId: project.id },
    });
  };

  if (projects.length === 0) {
    return (
      <div style={{ padding: 16, textAlign: 'center', color: '#808080' }}>
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 4 }}>
      {/* Address bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4, padding: '2px 4px' }}>
        <span style={{ fontSize: 11 }}>Address:</span>
        <div style={{ flex: 1, border: '1px solid', borderColor: '#808080 #dfdfdf #dfdfdf #808080', padding: '1px 4px', background: 'white', fontSize: 11 }}>
          C:\Projects\{category === 'gauntlet' ? 'Gauntlet' : 'Other'}
        </div>
      </div>

      {/* File listing */}
      <div
        className="sunken-panel"
        style={{ padding: 4, minHeight: 200, background: 'white' }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 4 }}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`desktop-icon ${selectedProject === project.id ? 'selected' : ''}`}
              style={{ width: 80 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project.id);
              }}
              onDoubleClick={() => handleDoubleClick(project)}
            >
              <Win95Icon type="folder" size={32} />
              <span
                className="desktop-icon-label"
                style={{
                  color: selectedProject === project.id ? 'white' : 'black',
                  textShadow: 'none',
                  background: selectedProject === project.id ? '#000080' : 'transparent',
                }}
              >
                {project.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div style={{ marginTop: 4, fontSize: 11, color: '#808080' }}>
        {projects.length} object(s)
        {selectedProject && ` — "${projects.find(p => p.id === selectedProject)?.name}" selected`}
      </div>
    </div>
  );
};
