from fastapi import APIRouter

from app.api.v1.endpoints import health, projects, categories

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(projects.router, tags=["projects"])
api_router.include_router(categories.router, tags=["categories"])
