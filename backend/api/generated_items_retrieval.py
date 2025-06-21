from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from api.db import get_db
from typing import List, Dict

router = APIRouter()

async def get_exercise_from_DB(exercise_id: str, db: AsyncSession):
    try:
        result = await db.execute(text("SELECT * FROM exercises WHERE id = :id"), {"id": exercise_id})
        row = result.fetchone()
        if row:
            return dict(row._mapping)
        else:
            return None
    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}

@router.post("/generated-exercises")
async def get_generated_exercises_info(request: Request, db: AsyncSession = Depends(get_db)):
    data = (await request.json())[0]
    results = []
    for day in data:
        day_result = {
            "day": day.get("day"),
            "groups": []
        }
        for group in day.get("groups", []):
            group_result = {
                "name": group.get("name"),
                "count": group.get("count"),
                "exercises": []
            }
            for ex_id in group.get("exercises", []):
                exercise_info = await get_exercise_from_DB(ex_id, db)
                if exercise_info:
                    group_result["exercises"].append(exercise_info)
                else:
                    group_result["exercises"].append({"id": ex_id, "error": "Not found"})
            day_result["groups"].append(group_result)
        results.append(day_result)
    return results