from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from sqlalchemy.future import select

from api.db.db import get_db
from api.utils.token_utils import get_token

from typing import Dict, List

from ORM.users_table import UsersTable
from ORM.generated_plans import GeneratedPlans
from ORM.physical_info import PhysicalInfo
from schemas.training_plan_schema import PlanRequest
from schemas.user_schema import PhysicalInfoSchema

router = APIRouter(prefix="/user-data")

@router.post("/get-profile-data")
async def get_profile_data(request: Request, db: AsyncSession = Depends(get_db)):
    encoded_jwt = get_token(request=request)
    stmt = select(UsersTable).where(UsersTable.id == encoded_jwt['id'])
    result = await db.execute(stmt)
    existing_user = result.scalars().first()
    return JSONResponse(content={"first_name": existing_user.first_name,
            "last_name": existing_user.last_name,
            "email":existing_user.email})


@router.get("/generated-content")
async def get_generated_content(request: Request, db: AsyncSession = Depends(get_db)):
    encoded_jwt = get_token(request=request)
    stmt = select(GeneratedPlans.id, GeneratedPlans.title, GeneratedPlans.created_at, GeneratedPlans.plan_type).where(
        GeneratedPlans.user_id == encoded_jwt['id']
    )
    result = await db.execute(stmt)
    training_plans = result.fetchall()
    return [
        {
            "id": row.id,
            "title": row.title,
            "created_at": row.created_at.isoformat(),
            "plan_type": row.plan_type,
        }
        for row in training_plans
    ]


@router.post("/generated-content/get-content")
async def get_content(data: PlanRequest, db: AsyncSession = Depends(get_db)):
    id_ = data.id
    stmt = select(GeneratedPlans).where(GeneratedPlans.id == id_)
    result = await db.execute(stmt)
    generated_plan = result.scalars().first()
    return {
        "id": generated_plan.id,
        "title": generated_plan.title,
        "plan": generated_plan.plan,
        "plan_type": generated_plan.plan_type,
    }

@router.post("/info/save-physical-info")
async def save_physical_info(request: Request, data: PhysicalInfoSchema, db: AsyncSession = Depends(get_db)):
    encoded_jwt = get_token(request=request)
    physical_info = PhysicalInfo(
        user_id = encoded_jwt["id"],
        age = data.age,
        sex = data.sex,
        height = data.height,
        weight = data.weight,
        body_type = data.body_type
    )
    db.add(physical_info)
    await db.commit()
    return {"message": "Physical data was added successfully"}

@router.post("/info/check-physical-info")
async def check_physical_info(request: Request, db: AsyncSession = Depends(get_db)):
    encoded_jwt = get_token(request=request)
    stmt = select(PhysicalInfo).where(PhysicalInfo.user_id == encoded_jwt["id"])
    result = await db.execute(stmt)
    physical_info_result = result.scalars().first()
    if not physical_info_result:
        return {"result": 0, "physical_info": None}
    return {"result": 1, "physical_info": physical_info_result}