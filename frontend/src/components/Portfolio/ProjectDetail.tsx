import React, { useState } from 'react';
import { getProject } from '../../data/projects';

interface ProjectDetailProps {
  projectId: string;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState('general');
  const project = getProject(projectId);

  if (!project) return <div style={{ padding: 8 }}>Project not found.</div>;

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'links', label: 'Links' },
  ];

  return (
    <div style={{ padding: 8 }}>
      {/* Tab bar */}
      <menu role="tablist" style={{ display: 'flex', gap: 0, marginBottom: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ fontSize: 11 }}
          >
            {tab.label}
          </button>
        ))}
      </menu>

      {/* Tab content */}
      <div className="window" role="tabpanel" style={{ position: 'relative', padding: 12, minHeight: 200 }}>
        {activeTab === 'general' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 4 }}>{project.name}</h3>
                {project.week && (
                  <span style={{ fontSize: 10, color: '#808080' }}>
                    Gauntlet Week {project.week}
                  </span>
                )}
              </div>
            </div>
            <fieldset>
              <legend>Description</legend>
              <p style={{ fontSize: 11, lineHeight: 1.5 }}>
                {project.longDescription || project.description}
              </p>
            </fieldset>
            {project.challenges && (
              <fieldset style={{ marginTop: 8 }}>
                <legend>Challenges</legend>
                <p style={{ fontSize: 11, lineHeight: 1.5 }}>{project.challenges}</p>
              </fieldset>
            )}
            {project.learnings && (
              <fieldset style={{ marginTop: 8 }}>
                <legend>Learnings</legend>
                <p style={{ fontSize: 11, lineHeight: 1.5 }}>{project.learnings}</p>
              </fieldset>
            )}
          </div>
        )}

        {activeTab === 'tech' && (
          <div>
            <fieldset>
              <legend>Technologies Used</legend>
              <ul className="tree-view" style={{ padding: 4 }}>
                {project.techStack.map((tech, i) => (
                  <li key={i} style={{ fontSize: 11, padding: '2px 0' }}>
                    {tech}
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        )}

        {activeTab === 'links' && (
          <div>
            <fieldset>
              <legend>Project Links</legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 4 }}>
                {project.repoUrl && (
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 'bold' }}>Repository:</label>
                    <br />
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 11, color: '#0000ff' }}
                    >
                      {project.repoUrl}
                    </a>
                  </div>
                )}
                {project.liveUrl && (
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 'bold' }}>Live Demo:</label>
                    <br />
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 11, color: '#0000ff' }}
                    >
                      {project.liveUrl}
                    </a>
                  </div>
                )}
                {project.vizUrl && (
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 'bold' }}>Visualization:</label>
                    <br />
                    <a
                      href={project.vizUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 11, color: '#0000ff' }}
                    >
                      {project.vizUrl}
                    </a>
                  </div>
                )}
                {project.writeupUrl && (
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 'bold' }}>Write-up:</label>
                    <br />
                    <a
                      href={project.writeupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 11, color: '#0000ff' }}
                    >
                      {project.writeupUrl}
                    </a>
                  </div>
                )}
                {!project.repoUrl && !project.liveUrl && !project.writeupUrl && (
                  <p style={{ fontSize: 11, color: '#808080' }}>No links available yet.</p>
                )}
              </div>
            </fieldset>
          </div>
        )}
      </div>
    </div>
  );
};
