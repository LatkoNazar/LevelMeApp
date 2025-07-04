from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from chatbot.generate_content_without_chat.trainings_generator import get_result
from schemas.training_plan_schema import WorkoutRequest
from sqlalchemy.ext.asyncio import AsyncSession
from api.db.db import get_db

router = APIRouter(prefix="/generators")

@router.post("/generate-workout")
async def generate_workout(workout: WorkoutRequest, db: AsyncSession = Depends(get_db)):
    result = await get_result(dict(workout), db=db)
    return {"plan": result}