from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from chatbot.generate_content_without_chat.nutrition_plan_generator import get_result
from schemas.nutrition_plan_schema import NutritionPlanRequest
from sqlalchemy.ext.asyncio import AsyncSession
from api.db.db import get_db

router = APIRouter(prefix="/generators")

@router.post("/generate-nutrition-plan")
async def generate_nutrition_plan(workout: NutritionPlanRequest, db: AsyncSession = Depends(get_db)):
    result = await get_result(dict(workout), db=db)
    return {"plan": result}