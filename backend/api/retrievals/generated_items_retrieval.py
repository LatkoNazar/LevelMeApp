from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from api.db.db import get_db
from typing import List, Dict
import json
import jwt
import os

from ORM.generated_plans import GeneratedPlans
from schemas.generated_plan_schema import GeneratedPlanSchema
from api.utils.token_utils import get_token

router = APIRouter(prefix="/chatbot/generated-plan")

async def get_exercise_from_db(exercise_id: str, db: AsyncSession):
    try:
        query = text("""
            SELECT
                exercises.*,
                STRING_AGG(DISTINCT primary_muscles.muscle, ',') AS primaryMuscles,
                STRING_AGG(DISTINCT secondary_muscles.muscle, ',') AS secondaryMuscles
            FROM exercises
            LEFT JOIN primary_muscles ON exercises.id = primary_muscles.exercise_id
            LEFT JOIN secondary_muscles ON exercises.id = secondary_muscles.exercise_id
            WHERE exercises.id = :id
            GROUP BY exercises.id
        """)
        result = await db.execute(query, {"id": exercise_id})
        row = result.fetchone()
        if row:
            exercise = {
                "id": row.id,
                "name": row.name,
                "force": row.force,
                "level": row.level,
                "mechanic": row.mechanic,
                "equipment": row.equipment,
                "instructions": row.instructions,
                "category": row.category,
                "images": row.images,
                "primaryMuscles": row.primarymuscles.split(',') if row.primarymuscles else [],
                "secondaryMuscles": row.secondarymuscles.split(',') if row.secondarymuscles else [],
                }
            return exercise
        else:
            return None
    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}

@router.post("/get-plan")
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
                exercise_info = await get_exercise_from_db(ex_id, db)
                if exercise_info:
                    group_result["exercises"].append(exercise_info)
                else:
                    group_result["exercises"].append({"id": ex_id, "error": "Not found"})
            day_result["groups"].append(group_result)
        results.append(day_result)
    return results


@router.post("/save-plan")
async def save_generated_plan(generated_plan: GeneratedPlanSchema, request: Request, db: AsyncSession = Depends(get_db)):
    encoded_jwt = get_token(request=request)
    new_training_plan = GeneratedPlans(
        user_id = encoded_jwt["id"],
        title = generated_plan.title,
        plan = generated_plan.plan,
        plan_type = generated_plan.plan_type
    )
    db.add(new_training_plan)
    await db.commit()
    return JSONResponse(content={"message": "Training plan saved successfully"})