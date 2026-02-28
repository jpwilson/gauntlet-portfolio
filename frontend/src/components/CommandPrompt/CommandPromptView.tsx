import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useViewModeStore } from '../../store/useViewModeStore';
import axios from 'axios';
import { Project } from '../../types/project';

interface HistoryEntry {
  type: 'input' | 'output';
  text: string;
}

const WELCOME_BANNER = `Microsoft(R) Windows 95
   (C)Copyright Microsoft Corp 1981-1995.

Welcome to the Portfolio Command Prompt.
Type 'help' for a list of available commands.
`;

export const CommandPromptView: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', text: WELCOME_BANNER },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>(['C:', 'Portfolio']);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const setViewMode = useViewModeStore((s) => s.setViewMode);

  const prompt = currentPath.join('\\') + '>';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const addOutput = useCallback((text: string) => {
    setHistory((prev) => [...prev, { type: 'output', text }]);
  }, []);

  const executeCommand = useCallback(
    async (input: string) => {
      const trimmed = input.trim();
      setHistory((prev) => [...prev, { type: 'input', text: `${prompt}${trimmed}` }]);

      if (!trimmed) return;

      setCommandHistory((prev) => [trimmed, ...prev]);
      setHistoryIndex(-1);

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      switch (cmd) {
        case 'help':
          addOutput(
            `Available commands:
  help          Show this help message
  dir           List contents of current directory
  cd <folder>   Navigate to a folder (gauntlet, other, ..)
  open <name>   Show project details
  tree          Show all projects in tree view
  about         Display portfolio owner info
  skills        List technical skills
  contact       Show contact information
  changelog     Show project changelog
  cls           Clear the screen
  ver           Show system version
  color         Already the best color ;)
  exit          Return to Desktop view
  win           Return to Desktop view
`
          );
          break;

        case 'dir': {
          try {
            const cat = currentPath.length > 2 ? currentPath[2].toLowerCase() : null;
            let dirContent = '';

            if (cat === 'gauntlet' || cat === 'other') {
              const res = await axios.get(`/api/v1/projects?category=${cat}`);
              const projects: Project[] = res.data.projects;
              dirContent = ` Volume in drive C is PORTFOLIO\n Directory of ${currentPath.join('\\')}\n\n`;
              dirContent += '  .             <DIR>\n  ..            <DIR>\n';
              projects.forEach((p) => {
                dirContent += `  ${p.name.padEnd(20)} <DIR>    ${p.description.substring(0, 40)}\n`;
              });
              dirContent += `\n        ${projects.length} Dir(s)  640,000 bytes free`;
            } else {
              dirContent = ` Volume in drive C is PORTFOLIO\n Directory of ${currentPath.join('\\')}\n\n`;
              dirContent += '  .             <DIR>\n  ..            <DIR>\n';
              dirContent += '  Gauntlet      <DIR>    The Gauntlet Projects\n';
              dirContent += '  Other         <DIR>    Other Projects\n';
              dirContent += '  README.txt    1,337    About this portfolio\n';
              dirContent += '\n        3 Dir(s)  1 File(s)  640,000 bytes free';
            }
            addOutput(dirContent);
          } catch {
            addOutput(` Volume in drive C is PORTFOLIO\n Directory of ${currentPath.join('\\')}\n\n  Gauntlet      <DIR>\n  Other         <DIR>\n\n        2 Dir(s)  640,000 bytes free`);
          }
          break;
        }

        case 'cd': {
          const target = args[0]?.toLowerCase();
          if (!target) {
            addOutput(currentPath.join('\\'));
          } else if (target === '..') {
            if (currentPath.length > 2) {
              setCurrentPath((prev) => prev.slice(0, -1));
            }
          } else if (target === 'gauntlet' && currentPath.length === 2) {
            setCurrentPath((prev) => [...prev, 'Gauntlet']);
          } else if (target === 'other' && currentPath.length === 2) {
            setCurrentPath((prev) => [...prev, 'Other']);
          } else {
            addOutput(`The system cannot find the path specified.`);
          }
          break;
        }

        case 'open': {
          const projectName = args.join(' ');
          if (!projectName) {
            addOutput('Usage: open <project-name>');
            break;
          }
          try {
            const res = await axios.get('/api/v1/projects');
            const projects: Project[] = res.data.projects;
            const found = projects.find(
              (p) => p.name.toLowerCase().includes(projectName.toLowerCase()) ||
                     p.id.toLowerCase().includes(projectName.toLowerCase())
            );
            if (found) {
              let output = `\n=== ${found.name} ===\n`;
              output += `${found.description}\n\n`;
              if (found.techStack.length) output += `Tech: ${found.techStack.join(', ')}\n`;
              if (found.repoUrl) output += `Repo: ${found.repoUrl}\n`;
              if (found.liveUrl) output += `Live: ${found.liveUrl}\n`;
              if (found.writeupUrl) output += `Writeup: ${found.writeupUrl}\n`;
              if (found.week) output += `Gauntlet Week: ${found.week}\n`;
              addOutput(output);
            } else {
              addOutput(`Project '${projectName}' not found. Type 'dir' to see available projects.`);
            }
          } catch {
            addOutput('Error: Could not fetch project data. Is the backend running?');
          }
          break;
        }

        case 'tree': {
          try {
            const res = await axios.get('/api/v1/projects');
            const projects: Project[] = res.data.projects;
            const gauntlet = projects.filter((p) => p.category === 'gauntlet');
            const other = projects.filter((p) => p.category === 'other');

            let tree = 'C:\\Portfolio\n';
            tree += '├── Gauntlet\n';
            gauntlet.forEach((p, i) => {
              const prefix = i === gauntlet.length - 1 ? '│   └── ' : '│   ├── ';
              tree += `${prefix}${p.name}\n`;
            });
            tree += '└── Other\n';
            other.forEach((p, i) => {
              const prefix = i === other.length - 1 ? '    └── ' : '    ├── ';
              tree += `${prefix}${p.name}\n`;
            });
            addOutput(tree);
          } catch {
            addOutput('C:\\Portfolio\n├── Gauntlet\n│   └── (connect backend to see projects)\n└── Other\n    └── (connect backend to see projects)');
          }
          break;
        }

        case 'about':
          addOutput(
            `\n=== About ===\nSoftware Developer | The Gauntlet Program\n\nBuilding projects, breaking things, learning everything.\nThis portfolio was built with React + FastAPI + Docker,\nthemed as a loving tribute to Windows 95.\n\n"640KB ought to be enough for anybody."\n`
          );
          break;

        case 'skills':
          addOutput(
            `\n=== Technical Skills ===\n\nLanguages:    JavaScript, TypeScript, Python, SQL\nFrontend:     React, Next.js, Tailwind CSS\nBackend:      FastAPI, Node.js, Express\nDatabases:    PostgreSQL, Supabase, SQLite\nTools:        Docker, Git, Vercel, Railway\nOther:        REST APIs, WebSockets, AI/LLM integration\n`
          );
          break;

        case 'contact':
          addOutput(
            `\n=== Contact ===\n\nGitHub:   github.com/yourname\nLinkedIn: linkedin.com/in/yourname\nEmail:    you@example.com\n\n(Update these in CommandPromptView.tsx!)\n`
          );
          break;

        case 'changelog':
          addOutput(
            `\n========================================
  CHANGELOG — Win95 Portfolio
========================================

[0.1.0] - 2026-02-28 — Initial Build

  ## Infrastructure
  - Monorepo: React + TypeScript + Vite frontend, FastAPI + Python backend
  - Docker Compose with hot-reload for both services
  - Git repo with .gitignore, .env.example, README, CHANGELOG

  ## Desktop View
  - Windows 95 desktop with #008080 teal background
  - 9 desktop icons (My Computer, projects, games, CMD, Changelog, Recycle Bin)
  - Custom SVG pixel art icons (32x32)

  ## Window Management
  - Draggable + resizable windows (react-rnd + 98.css)
  - Minimize, maximize, close, z-index focus
  - Cascade positioning, duplicate prevention, lazy-loaded games

  ## Taskbar
  - Start button + menu, window list, live clock
  - Blue gradient sidebar ("Windows 95")

  ## Command Prompt
  - Full-screen green-on-black terminal
  - 13+ commands: help, dir, cd, open, tree, about, skills, contact, changelog, cls, ver, exit
  - Filesystem navigation, API-powered project data

  ## Portfolio
  - File Explorer + Properties dialog windows
  - About Me, project detail with tabs

  ## Games
  - Minesweeper (fully playable, 3 difficulties)
  - SkiFree (embedded skifree.js)
  - Pipe Dream (links to web versions)

  ## Backend API
  - FastAPI: /projects, /projects/{id}, /categories, /health
  - 9 placeholder projects, Pydantic v2 models
`
          );
          break;

        case 'cls':
          setHistory([]);
          break;

        case 'ver':
          addOutput('\nMicrosoft Windows 95 [Version 4.00.950]\nPortfolio Edition (c) 2025\n');
          break;

        case 'color':
          addOutput("Already running color 0A. You're welcome.");
          break;

        case 'exit':
        case 'win':
          setViewMode('desktop');
          break;

        default:
          addOutput(
            `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.\n\nType 'help' for a list of available commands.`
          );
      }
    },
    [prompt, currentPath, addOutput, setViewMode]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="cmd-view" ref={containerRef} onClick={handleContainerClick}>
      {history.map((entry, i) => (
        <div key={i} className="cmd-output">
          {entry.text}
        </div>
      ))}
      <div className="cmd-line">
        <span className="cmd-prompt-text">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          className="cmd-input"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
};
