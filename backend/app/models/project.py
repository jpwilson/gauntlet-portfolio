from pydantic import BaseModel
from typing import Optional
from enum import Enum


class CategoryEnum(str, Enum):
    GAUNTLET = "gauntlet"
    OTHER = "other"


class Project(BaseModel):
    id: str
    name: str
    description: str
    long_description: Optional[str] = None
    category: CategoryEnum
    week: Optional[int] = None
    tech_stack: list[str]
    repo_url: Optional[str] = None
    live_url: Optional[str] = None
    writeup_url: Optional[str] = None
    thumbnail: Optional[str] = None
    screenshots: list[str] = []
    icon: str = "folder"
    created_at: str
    featured: bool = False
    challenges: Optional[str] = None
    learnings: Optional[str] = None


class ProjectListResponse(BaseModel):
    projects: list[Project]
    total: int


class CategoryResponse(BaseModel):
    id: str
    name: str
    description: str
    icon: str
