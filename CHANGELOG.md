# Changelog

All notable changes to the Win95 Portfolio project are documented here.
Format: newest at top, oldest at bottom.

---

## [0.1.0] - 2026-02-28 — Initial Build

### Added

#### Infrastructure & Scaffolding
- Initialized monorepo with `frontend/` (React + TypeScript + Vite) and `backend/` (FastAPI + Python)
- Docker Compose setup with hot-reload volume mounts for both services
- Frontend Dockerfile (Node 20 Alpine) and Backend Dockerfile (Python 3.12 Slim)
- `.gitignore` covering node_modules, __pycache__, .env files, build artifacts, IDE files, OS files
- `.env.example` with documented environment variables

#### Frontend — Desktop View
- Windows 95 desktop with classic `#008080` teal background
- Desktop icon grid with 8 icons: My Computer, Gauntlet Projects, Other Projects, Command Prompt, Minesweeper, SkiFree, Pipe Dream, Recycle Bin
- Custom inline SVG icons styled as Win95 32×32 pixel art (computer, folder, cmd, minesweeper, skifree, pipedream, recycle bin, notepad, internet, windows logo, file)
- Single-click icon selection with blue highlight, double-click to open windows

#### Frontend — Window Management System
- Full window manager built with Zustand state management
- Draggable and resizable windows via `react-rnd` with 98.css chrome
- Title bar with icon, title text, and minimize/maximize/close buttons
- Minimize (hides window, keeps taskbar button), maximize (fills screen), restore, close
- Z-index focus management: clicking a window or its taskbar button brings it to front
- Cascade positioning for newly opened windows (+30px offset each)
- Duplicate window prevention (re-focuses existing window instead of opening a new one)
- Lazy-loaded game components (Minesweeper, SkiFree, PipeDream) via React.lazy + Suspense

#### Frontend — Taskbar
- Fixed bottom taskbar with Start button, window list, and system tray
- Start button with Windows logo and "Start" text
- Start menu with blue gradient sidebar reading "Windows 95" vertically
- Start menu items: Gauntlet Projects, Other Projects, About Me, Minesweeper, SkiFree, MS-DOS Prompt, Shut Down
- Taskbar window list showing all open windows with active window highlighted
- System tray with live clock (updates every second, 12-hour format)

#### Frontend — Command Prompt View
- Full-screen command prompt with black background and bright green `#00ff00` text
- Simulated `C:\Portfolio>` prompt with filesystem navigation
- 12+ commands: `help`, `dir`, `cd`, `open`, `tree`, `about`, `skills`, `contact`, `cls`, `ver`, `color`, `exit`/`win`
- `dir` command fetches real project data from backend API
- `cd gauntlet` / `cd other` / `cd ..` for directory navigation
- `open <project>` displays full project details inline
- `tree` shows all projects in ASCII tree format
- Command history with up/down arrow key navigation
- Welcome banner: "Microsoft(R) Windows 95 (C)Copyright Microsoft Corp 1981-1995"
- Switch to CMD via desktop icon or Start menu; switch back via `exit` or `win` command

#### Frontend — Portfolio Windows
- Project Explorer window: File Explorer-style with address bar, icon grid, and status bar
- Project Detail window: Tabbed interface (General, Tech Stack, Links) styled as Win95 Properties dialog
- Category filtering (Gauntlet vs Other projects)
- About Me window with system properties table, contact links, and "640KB ought to be enough" joke

#### Frontend — Games
- **Minesweeper**: Fully playable, built from scratch in React
  - Complete game logic: mine placement, flood-fill reveal, flagging, win/loss detection
  - First-click safety (mines placed after first click, never on first cell)
  - 3 difficulty levels: Beginner (9×9, 10 mines), Intermediate (16×16, 40 mines), Expert (16×30, 99 mines)
  - LED-style mine counter and timer with red-on-black display
  - Smiley face reset button (🙂 playing, 😎 won, 😵 lost)
  - Right-click to flag, 98.css-styled raised/sunken cells
- **SkiFree**: Embedded skifree.js via iframe in a window component
- **Pipe Dream**: Placeholder window with links to online versions (pipedreamgame.com, Internet Archive)

#### Frontend — Styling
- 98.css integration for authentic Windows 98 UI chrome
- Custom CSS for desktop background, icon grid, icon labels with text shadow
- Taskbar CSS with inset borders, start menu with gradient sidebar
- Command prompt CSS with monospace font, blinking cursor, cyan hyperlinks
- Pixel-perfect icon rendering with `image-rendering: pixelated`
- Win95-style scrollbars via webkit scrollbar CSS
- Window shadows for depth

#### Backend — API
- FastAPI application with CORS middleware
- `GET /api/v1/health` — health check endpoint
- `GET /api/v1/projects` — list all projects with optional `?category=` filter
- `GET /api/v1/projects/{id}` — single project detail
- `GET /api/v1/categories` — list project categories
- Pydantic v2 models for Project, ProjectListResponse, CategoryResponse
- 9 placeholder projects: 6 Gauntlet (Weeks 1–6) + 3 Other

#### Backend — Data Model
- Project model: id, name, description, long_description, category, week, tech_stack, repo_url, live_url, writeup_url, thumbnail, screenshots, icon, created_at, featured, challenges, learnings
- In-memory data store (Python list) — no database needed for static portfolio content
- Category enum: `gauntlet` | `other`

#### State Management
- `useWindowStore` — window positions, sizes, z-indices, minimize/maximize state, open/close/focus actions
- `useDesktopStore` — selected icon, start menu open/close
- `useViewModeStore` — desktop/cmd view mode toggle

---

*Built with React, FastAPI, Docker, 98.css, and an unhealthy amount of nostalgia.*
