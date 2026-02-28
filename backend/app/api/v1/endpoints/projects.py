from fastapi import APIRouter, HTTPException, Query
from typing import Optional

from app.models.project import Project, ProjectListResponse, CategoryEnum
from app.data.projects import PROJECTS

router = APIRouter()


@router.get("/projects", response_model=ProjectListResponse)
async def list_projects(category: Optional[str] = Query(None)):
    projects = PROJECTS

    if category:
        try:
            cat_enum = CategoryEnum(category)
            projects = [p for p in projects if p.category == cat_enum]
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid category '{category}'. Must be 'gauntlet' or 'other'.",
            )

    return ProjectListResponse(projects=projects, total=len(projects))


@router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    for project in PROJECTS:
        if project.id == project_id:
            return project
    raise HTTPException(status_code=404, detail=f"Project '{project_id}' not found")
