# Win95 Portfolio

A Windows 95-themed portfolio website showcasing projects from The Gauntlet program and beyond.

![Windows 95](https://img.shields.io/badge/Theme-Windows%2095-008080?style=flat-square)
![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat-square&logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)
![Docker](https://img.shields.io/badge/Infra-Docker-2496ED?style=flat-square&logo=docker)

## Features

### Desktop View
- Full Windows 95 desktop simulation with teal background
- Draggable, resizable windows with classic title bar chrome (minimize, maximize, close)
- Desktop icons: My Computer, Gauntlet Projects, Other Projects, Command Prompt, Minesweeper, SkiFree, Pipe Dream, Recycle Bin
- Taskbar with Start button, Start menu, open window list, and system tray clock
- File Explorer-style project browsing with folder icons
- Project detail windows with tabbed interface (General, Tech Stack, Links)

### Command Prompt View
- Full-screen black background with bright green (#00ff00) text
- Simulated DOS prompt with filesystem navigation
- Commands: `help`, `dir`, `cd`, `open`, `tree`, `about`, `skills`, `contact`, `cls`, `ver`, `exit`
- Command history with up/down arrow keys
- Welcome banner styled after Windows 95

### Games
- **Minesweeper** — Fully playable, built from scratch in React. 3 difficulty levels (Beginner, Intermediate, Expert)
- **SkiFree** — Embedded skifree.js. Watch out for the Yeti!
- **Pipe Dream** — Links to web-based versions of the classic LucasArts game

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite 6, 98.css |
| State | Zustand |
| Windows | react-rnd (drag + resize) |
| Backend | FastAPI, Pydantic, Uvicorn |
| Infrastructure | Docker, Docker Compose |
| Deployment | Railway (planned) |

## Getting Started

### Prerequisites
- Docker Desktop running

### Run Locally
```bash
docker compose up --build
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8001
- **API Docs (Swagger)**: http://localhost:8001/docs

### Development

Both services have hot-reload enabled via Docker volume mounts:
- Edit `frontend/src/` files → Vite HMR updates instantly
- Edit `backend/app/` files → Uvicorn auto-reloads

### Project Structure
```
gauntlet_portfolio/
├── docker-compose.yml          # Orchestrates both services
├── frontend/                   # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/         # Desktop, Window, Taskbar, Games, Portfolio, CommandPrompt
│   │   ├── store/              # Zustand stores (windows, desktop, view mode)
│   │   ├── styles/             # CSS (global, desktop, taskbar, command-prompt)
│   │   └── types/              # TypeScript interfaces
│   └── Dockerfile
├── backend/                    # FastAPI + Python
│   ├── app/
│   │   ├── api/v1/endpoints/   # REST endpoints (projects, categories, health)
│   │   ├── data/projects.py    # Portfolio project data (edit this!)
│   │   └── models/             # Pydantic models
│   └── Dockerfile
└── CHANGELOG.md
```

## Customizing

### Add Your Projects
Edit `backend/app/data/projects.py` — each project is a Pydantic model with:
- `id`, `name`, `description`, `category` (gauntlet/other)
- `tech_stack`, `repo_url`, `live_url`, `writeup_url`
- `week` (for Gauntlet projects), `challenges`, `learnings`

### Update About Info
- Desktop "About" window: `frontend/src/components/Portfolio/AboutWindow.tsx`
- CMD `contact`/`about`/`skills` commands: `frontend/src/components/CommandPrompt/CommandPromptView.tsx`

## License

MIT
