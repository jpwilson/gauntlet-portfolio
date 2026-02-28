from fastapi import APIRouter

from app.data.projects import CATEGORIES

router = APIRouter()


@router.get("/categories")
async def list_categories():
    return {"categories": CATEGORIES}
