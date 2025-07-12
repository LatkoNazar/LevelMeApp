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
from schemas.training_plan_schema import PlanRequest

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