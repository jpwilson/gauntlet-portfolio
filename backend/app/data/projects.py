from app.models.project import Project, CategoryEnum

# ============================================================
# PLACEHOLDER PROJECT DATA
# Replace with your actual projects!
# ============================================================

PROJECTS: list[Project] = [
    # ---- GAUNTLET PROJECTS ----
    Project(
        id="week1-colabboard",
        name="CollabBoard",
        description="Real-time collaborative whiteboard application",
        long_description="A full-featured collaborative whiteboard built with Next.js, React, and Supabase. Supports real-time drawing, sticky notes, and multi-user collaboration with WebSocket-based sync.",
        category=CategoryEnum.GAUNTLET,
        week=1,
        tech_stack=["React", "Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
        repo_url="https://github.com/yourname/colabboard",
        live_url="https://colabboard.vercel.app",
        created_at="2025-02-16",
        featured=True,
        challenges="Real-time synchronization across multiple clients, handling conflict resolution for concurrent edits.",
        learnings="Deep dive into WebSocket management, Supabase real-time subscriptions, and optimistic UI updates.",
    ),
    Project(
        id="week2-ghostfolio",
        name="Ghostfolio Contribution",
        description="Open-source contribution to Ghostfolio investment tracker",
        long_description="Contributed to the Ghostfolio open-source project, an investment portfolio tracker. Fixed bugs and added features to improve the user experience.",
        category=CategoryEnum.GAUNTLET,
        week=2,
        tech_stack=["Angular", "NestJS", "PostgreSQL", "Docker"],
        repo_url="https://github.com/ghostfolio/ghostfolio",
        created_at="2025-02-23",
        featured=False,
        challenges="Understanding a large existing codebase, working with Angular (new framework).",
        learnings="Open-source contribution workflow, Angular patterns, working with financial data.",
    ),
    Project(
        id="week3-project",
        name="Week 3 Project",
        description="Placeholder for Week 3 Gauntlet project",
        long_description="Replace this with your actual Week 3 project details.",
        category=CategoryEnum.GAUNTLET,
        week=3,
        tech_stack=["TBD"],
        created_at="2025-03-02",
        featured=False,
    ),
    Project(
        id="week4-project",
        name="Week 4 Project",
        description="Placeholder for Week 4 Gauntlet project",
        long_description="Replace this with your actual Week 4 project details.",
        category=CategoryEnum.GAUNTLET,
        week=4,
        tech_stack=["TBD"],
        created_at="2025-03-09",
        featured=False,
    ),
    Project(
        id="week5-project",
        name="Week 5 Project",
        description="Placeholder for Week 5 Gauntlet project",
        long_description="Replace this with your actual Week 5 project details.",
        category=CategoryEnum.GAUNTLET,
        week=5,
        tech_stack=["TBD"],
        created_at="2025-03-16",
        featured=False,
    ),
    Project(
        id="week6-project",
        name="Week 6 Project",
        description="Placeholder for Week 6 Gauntlet project",
        long_description="Replace this with your actual Week 6 project details.",
        category=CategoryEnum.GAUNTLET,
        week=6,
        tech_stack=["TBD"],
        created_at="2025-03-23",
        featured=False,
    ),

    # ---- OTHER PROJECTS ----
    Project(
        id="other-portfolio",
        name="Win95 Portfolio",
        description="This very portfolio site you're looking at!",
        long_description="A Windows 95-themed portfolio website built with React, FastAPI, and Docker. Features a fully interactive desktop simulation, command prompt interface, and playable Minesweeper.",
        category=CategoryEnum.OTHER,
        tech_stack=["React", "TypeScript", "FastAPI", "Docker", "98.css"],
        repo_url="https://github.com/yourname/win95-portfolio",
        created_at="2025-02-28",
        featured=True,
        challenges="Implementing a full windowing system with drag/resize, building Minesweeper game logic from scratch.",
        learnings="CSS theming, state management for complex UI interactions, Docker multi-service setup.",
    ),
    Project(
        id="other-project-1",
        name="Previous Project 1",
        description="Placeholder for a pre-Gauntlet project",
        long_description="Replace this with your actual project details.",
        category=CategoryEnum.OTHER,
        tech_stack=["Python", "Flask"],
        created_at="2024-06-01",
        featured=False,
    ),
    Project(
        id="other-project-2",
        name="Previous Project 2",
        description="Another placeholder project from before The Gauntlet",
        long_description="Replace this with your actual project details.",
        category=CategoryEnum.OTHER,
        tech_stack=["JavaScript", "Node.js"],
        created_at="2024-09-15",
        featured=False,
    ),
]


CATEGORIES = [
    {
        "id": "gauntlet",
        "name": "The Gauntlet",
        "description": "Projects built during The Gauntlet program",
        "icon": "folder",
    },
    {
        "id": "other",
        "name": "Other Projects",
        "description": "Personal and pre-Gauntlet projects",
        "icon": "folder",
    },
]
