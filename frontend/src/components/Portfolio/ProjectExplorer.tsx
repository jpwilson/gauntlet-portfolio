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
  const [passwordPrompt, setPasswordPrompt] = useState<{ project: Project; input: string } | null>(null);
  const [passwordError, setPasswordError] = useState(false);
  const openWindow = useWindowStore((s) => s.openWindow);

  const openProjectFolder = (project: Project) => {
    const folderName = project.week && project.week <= 3
      ? `Week ${project.week} - ${project.name}`
      : project.name;
    openWindow({
      type: 'project-folder',
      title: folderName,
      icon: 'folder',
      size: { width: 500, height: 350 },
      data: { projectId: project.id },
    });
  };

  const handleDoubleClick = (project: Project) => {
    if (category === 'gauntlet') {
      if (project.passwordProtected) {
        setPasswordPrompt({ project, input: '' });
        setPasswordError(false);
        return;
      }
      openProjectFolder(project);
    } else {
      // Other projects: show popup for family socials, otherwise open URL
      if (project.id === 'other-family-socials') {
        setPasswordPrompt({ project, input: '' });
        setPasswordError(false);
        return;
      }
      if (project.liveUrl) {
        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handlePasswordSubmit = () => {
    if (!passwordPrompt) return;
    const { project, input } = passwordPrompt;

    if (project.id === 'other-family-socials') {
      // Family socials just shows info, any click dismisses
      setPasswordPrompt(null);
      if (project.liveUrl) {
        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    const expectedPassword = `${project.name}#321`;
    if (input === expectedPassword) {
      setPasswordPrompt(null);
      openProjectFolder(project);
    } else {
      setPasswordError(true);
    }
  };

  const getDisplayName = (project: Project) => {
    if (category === 'gauntlet' && project.week && project.week <= 3) {
      return `Week ${project.week} -\n${project.name}`;
    }
    return project.name;
  };

  const getIconType = (project: Project) => {
    if (category === 'other') {
      return project.icon || 'internet';
    }
    return 'folder';
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
              style={{ width: 90 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project.id);
              }}
              onDoubleClick={() => handleDoubleClick(project)}
            >
              <Win95Icon type={getIconType(project)} size={32} />
              <span
                className="desktop-icon-label"
                style={{
                  color: selectedProject === project.id ? 'white' : 'black',
                  textShadow: 'none',
                  background: selectedProject === project.id ? '#000080' : 'transparent',
                  whiteSpace: 'pre-line',
                  maxWidth: 85,
                }}
              >
                {getDisplayName(project)}
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

      {/* Password / Info Dialog */}
      {passwordPrompt && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
          }}
          onClick={() => setPasswordPrompt(null)}
        >
          <div
            className="window"
            style={{ position: 'relative', width: 340, maxWidth: 'calc(100vw - 32px)', padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-bar">
              <div className="title-bar-text">
                {passwordPrompt.project.id === 'other-family-socials'
                  ? 'Our Family Socials - Info'
                  : `${passwordPrompt.project.name} - Password Required`}
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => setPasswordPrompt(null)} />
              </div>
            </div>
            <div className="window-body" style={{ padding: 16 }}>
              {passwordPrompt.project.id === 'other-family-socials' ? (
                <>
                  <p style={{ fontSize: 11, marginBottom: 8 }}>
                    To login with the investor demo:
                  </p>
                  <ol style={{ fontSize: 11, paddingLeft: 20, marginBottom: 8 }}>
                    <li>Go to the sign up page</li>
                    <li>Click on <strong>Investor Demo Login</strong> at the bottom</li>
                    <li>Password: <strong>March2026</strong></li>
                  </ol>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                    <button onClick={handlePasswordSubmit} style={{ fontSize: 11, padding: '4px 16px' }}>
                      OK - Go to Site
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontSize: 11, marginBottom: 8 }}>
                    This folder is password protected.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <label style={{ fontSize: 11 }}>Password:</label>
                    <input
                      type="password"
                      value={passwordPrompt.input}
                      onChange={(e) =>
                        setPasswordPrompt({ ...passwordPrompt, input: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handlePasswordSubmit();
                      }}
                      autoFocus
                      style={{ flex: 1, fontSize: 11 }}
                    />
                  </div>
                  {passwordError && (
                    <p style={{ fontSize: 11, color: '#ff0000', marginTop: 4 }}>
                      Incorrect password. Try again.
                    </p>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                    <button onClick={handlePasswordSubmit} style={{ fontSize: 11, padding: '4px 16px' }}>
                      OK
                    </button>
                    <button onClick={() => setPasswordPrompt(null)} style={{ fontSize: 11, padding: '4px 16px' }}>
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
