import React from 'react';

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  sections: {
    heading: string;
    items: string[];
  }[];
}

// Newest first, oldest at bottom
const CHANGELOG: ChangelogEntry[] = [
  {
    version: '0.1.0',
    date: '2026-02-28',
    title: 'Initial Build',
    sections: [
      {
        heading: 'Infrastructure',
        items: [
          'Monorepo setup: React + TypeScript + Vite frontend, FastAPI + Python backend',
          'Docker Compose with hot-reload volume mounts for both services',
          'Frontend Dockerfile (Node 20 Alpine), Backend Dockerfile (Python 3.12 Slim)',
          '.gitignore, .env.example, README.md, CHANGELOG.md',
        ],
      },
      {
        heading: 'Desktop View',
        items: [
          'Windows 95 desktop with classic #008080 teal background',
          '8 desktop icons: My Computer, Gauntlet Projects, Other Projects, Command Prompt, Minesweeper, SkiFree, Pipe Dream, Recycle Bin',
          'Custom inline SVG icons styled as Win95 32x32 pixel art',
          'Single-click selection, double-click to open windows',
        ],
      },
      {
        heading: 'Window Management',
        items: [
          'Draggable + resizable windows via react-rnd with 98.css chrome',
          'Title bar: icon, title, minimize/maximize/close buttons',
          'Z-index focus management (click to bring to front)',
          'Cascade positioning for new windows (+30px offset)',
          'Duplicate window prevention (re-focuses existing)',
          'Lazy-loaded game components via React.lazy + Suspense',
        ],
      },
      {
        heading: 'Taskbar',
        items: [
          'Fixed bottom taskbar with Start button, window list, system tray',
          'Start menu with blue gradient sidebar ("Windows 95" vertical text)',
          'Menu items: projects, games, MS-DOS Prompt, Shut Down',
          'Live clock in system tray (12-hour, updates every second)',
        ],
      },
      {
        heading: 'Command Prompt View',
        items: [
          'Full-screen black bg + bright green #00ff00 text',
          'Simulated C:\\Portfolio> prompt with filesystem nav',
          '12+ commands: help, dir, cd, open, tree, about, skills, contact, cls, ver, color, exit',
          'dir/open/tree fetch real data from backend API',
          'Command history with up/down arrow navigation',
          'Welcome banner: "Microsoft(R) Windows 95"',
        ],
      },
      {
        heading: 'Portfolio',
        items: [
          'Project Explorer: File Explorer-style with address bar + icon grid',
          'Project Detail: Tabbed Properties dialog (General, Tech Stack, Links)',
          'About Me window with system properties + contact info',
          'Category filtering (Gauntlet vs Other)',
        ],
      },
      {
        heading: 'Games',
        items: [
          'Minesweeper: fully playable from scratch — 3 difficulties, flood-fill, flagging, timer, smiley face',
          'SkiFree: embedded skifree.js via iframe (watch out for the Yeti!)',
          'Pipe Dream: placeholder with links to web versions',
        ],
      },
      {
        heading: 'Backend API',
        items: [
          'FastAPI with CORS middleware',
          'GET /api/v1/projects (with ?category= filter)',
          'GET /api/v1/projects/{id}',
          'GET /api/v1/categories',
          'GET /api/v1/health',
          '9 placeholder projects (6 Gauntlet weeks + 3 other)',
          'Pydantic v2 models, in-memory data store',
        ],
      },
      {
        heading: 'State Management (Zustand)',
        items: [
          'useWindowStore — positions, sizes, z-indices, minimize/maximize',
          'useDesktopStore — icon selection, start menu state',
          'useViewModeStore — desktop/cmd toggle',
        ],
      },
      {
        heading: 'Styling',
        items: [
          '98.css for authentic Windows 98 UI chrome',
          'Custom CSS: desktop, taskbar, command prompt, icons',
          'Pixel-perfect rendering with image-rendering: pixelated',
          'Win95-style scrollbars, window shadows, text shadows on desktop labels',
        ],
      },
    ],
  },
];

export const ChangelogWindow: React.FC = () => {
  return (
    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, lineHeight: 1.6, padding: 0 }}>
      {/* Notepad-style menu bar */}
      <div style={{ borderBottom: '1px solid #808080', padding: '2px 4px', marginBottom: 0, background: '#c0c0c0' }}>
        <span style={{ marginRight: 16 }}>File</span>
        <span style={{ marginRight: 16 }}>Edit</span>
        <span style={{ marginRight: 16 }}>Search</span>
        <span>Help</span>
      </div>

      <div style={{
        padding: 8,
        background: '#ffffff',
        minHeight: 300,
        whiteSpace: 'pre-wrap',
        fontFamily: "'Courier New', 'Lucida Console', monospace",
        fontSize: 12,
      }}>
        <div style={{ marginBottom: 16, borderBottom: '1px solid #c0c0c0', paddingBottom: 8 }}>
          {'========================================\n'}
          {'  CHANGELOG — Win95 Portfolio\n'}
          {'  Newest first, oldest at bottom\n'}
          {'========================================\n'}
        </div>

        {CHANGELOG.map((entry, entryIdx) => (
          <div key={entryIdx} style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
              {'[' + entry.version + '] - ' + entry.date + ' — ' + entry.title}
            </div>

            {entry.sections.map((section, secIdx) => (
              <div key={secIdx} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 'bold', color: '#000080' }}>
                  {'  ## ' + section.heading}
                </div>
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} style={{ paddingLeft: 16 }}>
                    {'  - ' + item}
                  </div>
                ))}
              </div>
            ))}

            {entryIdx < CHANGELOG.length - 1 && (
              <div>{'----------------------------------------'}</div>
            )}
          </div>
        ))}

        <div style={{ marginTop: 16, color: '#808080', borderTop: '1px solid #c0c0c0', paddingTop: 8 }}>
          {'Built with React, FastAPI, Docker, 98.css,\n'}
          {'and an unhealthy amount of nostalgia.\n'}
        </div>
      </div>
    </div>
  );
};
