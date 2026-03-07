import React, { useState } from 'react';
import { Win95Icon } from '../shared/Win95Icon';
import { useWindowStore } from '../../store/useWindowStore';
import { getProject } from '../../data/projects';
import { SubFolder } from '../../types/project';

interface ProjectFolderProps {
  projectId: string;
  subFolder?: SubFolder;
  parentPath?: string;
}

interface FolderItem {
  id: string;
  label: string;
  iconType: string;
  action: () => void;
}

export const ProjectFolder: React.FC<ProjectFolderProps> = ({ projectId, subFolder, parentPath }) => {
  const project = getProject(projectId);
  const openWindow = useWindowStore((s) => s.openWindow);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (!project) return <div style={{ padding: 8 }}>Project not found.</div>;

  const folderName = project.week && project.week <= 3
    ? `Week ${project.week} - ${project.name}`
    : project.name;

  const currentPath = parentPath || `C:\\Projects\\Gauntlet\\${folderName}`;

  // If we're rendering a subfolder view
  if (subFolder) {
    const items: FolderItem[] = [];

    // Render child subfolders
    if (subFolder.subFolders) {
      subFolder.subFolders.forEach((child, idx) => {
        items.push({
          id: `subfolder-${idx}`,
          label: child.name,
          iconType: 'folder',
          action: () => {
            const childPath = `${currentPath}\\${child.name}`;
            openWindow({
              type: 'project-folder',
              title: child.name,
              icon: 'folder',
              size: { width: 500, height: 350 },
              data: { projectId: project.id, subFolder: child, parentPath: childPath },
            });
          },
        });
      });
    }

    // Render links inside this subfolder
    if (subFolder.liveUrl) {
      items.push({
        id: 'live',
        label: project.name,
        iconType: 'internet',
        action: () => window.open(subFolder.liveUrl, '_blank', 'noopener,noreferrer'),
      });
    }

    if (subFolder.repoUrl) {
      items.push({
        id: 'github',
        label: 'GitHub',
        iconType: 'github',
        action: () => window.open(subFolder.repoUrl, '_blank', 'noopener,noreferrer'),
      });
    }

    return (
      <div style={{ padding: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4, padding: '2px 4px' }}>
          <span style={{ fontSize: 11 }}>Address:</span>
          <div style={{ flex: 1, border: '1px solid', borderColor: '#808080 #dfdfdf #dfdfdf #808080', padding: '1px 4px', background: 'white', fontSize: 11 }}>
            {currentPath}
          </div>
        </div>
        <div className="sunken-panel" style={{ padding: 4, minHeight: 200, background: 'white' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 4 }}>
            {items.length === 0 ? (
              <div style={{ padding: 16, color: '#808080', fontSize: 11 }}>This folder is empty.</div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className={`desktop-icon ${selectedItem === item.id ? 'selected' : ''}`}
                  style={{ width: 90, cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); setSelectedItem(item.id); }}
                  onDoubleClick={() => item.action()}
                >
                  <Win95Icon type={item.iconType} size={32} />
                  <span
                    className="desktop-icon-label"
                    style={{
                      color: selectedItem === item.id ? 'white' : 'black',
                      textShadow: 'none',
                      background: selectedItem === item.id ? '#000080' : 'transparent',
                      maxWidth: 85,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        <div style={{ marginTop: 4, fontSize: 11, color: '#808080' }}>
          {items.length} object(s)
          {selectedItem && ` — "${items.find((i) => i.id === selectedItem)?.label}" selected`}
        </div>
      </div>
    );
  }

  // Top-level project folder
  const items: FolderItem[] = [];

  // If project has subFolders, show those as folder icons
  if (project.subFolders) {
    project.subFolders.forEach((sf, idx) => {
      items.push({
        id: `subfolder-${idx}`,
        label: sf.name,
        iconType: 'folder',
        action: () => {
          const childPath = `${currentPath}\\${sf.name}`;
          openWindow({
            type: 'project-folder',
            title: sf.name,
            icon: 'folder',
            size: { width: 500, height: 350 },
            data: { projectId: project.id, subFolder: sf, parentPath: childPath },
          });
        },
      });
    });
  } else {
    // Original behavior for projects without subFolders
    if (project.liveUrl) {
      items.push({
        id: 'live',
        label: project.name,
        iconType: 'internet',
        action: () => window.open(project.liveUrl, '_blank', 'noopener,noreferrer'),
      });
    }

    if (project.vizUrl) {
      items.push({
        id: 'viz',
        label: 'Visualization',
        iconType: 'internet',
        action: () => window.open(project.vizUrl, '_blank', 'noopener,noreferrer'),
      });
    }

    if (project.repoUrl) {
      items.push({
        id: 'github',
        label: 'GitHub',
        iconType: 'github',
        action: () => window.open(project.repoUrl, '_blank', 'noopener,noreferrer'),
      });
    }

    items.push({
      id: 'info',
      label: 'Info.txt',
      iconType: 'notepad',
      action: () => {
        openWindow({
          type: 'project-detail',
          title: project.name,
          icon: 'file',
          size: { width: 450, height: 400 },
          data: { projectId: project.id },
        });
      },
    });
  }

  return (
    <div style={{ padding: 4 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 4,
          padding: '2px 4px',
        }}
      >
        <span style={{ fontSize: 11 }}>Address:</span>
        <div
          style={{
            flex: 1,
            border: '1px solid',
            borderColor: '#808080 #dfdfdf #dfdfdf #808080',
            padding: '1px 4px',
            background: 'white',
            fontSize: 11,
          }}
        >
          {currentPath}
        </div>
      </div>

      <div
        className="sunken-panel"
        style={{ padding: 4, minHeight: 200, background: 'white' }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 4 }}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`desktop-icon ${selectedItem === item.id ? 'selected' : ''}`}
              style={{ width: 90, cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item.id);
              }}
              onDoubleClick={() => item.action()}
            >
              <Win95Icon type={item.iconType} size={32} />
              <span
                className="desktop-icon-label"
                style={{
                  color: selectedItem === item.id ? 'white' : 'black',
                  textShadow: 'none',
                  background: selectedItem === item.id ? '#000080' : 'transparent',
                  maxWidth: 85,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 4, fontSize: 11, color: '#808080' }}>
        {items.length} object(s)
        {selectedItem &&
          ` — "${items.find((i) => i.id === selectedItem)?.label}" selected`}
      </div>
    </div>
  );
};
