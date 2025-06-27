from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from api.db.db import get_db
from typing import List, Dict
import json

from sqlalchemy.future import select

from ORM.users_table import UsersTable
from schemas.user_schema import  UserSignUpSchema
from .utils import hash_password, verify_password

import jwt
ALGORITHM = "HS256"

router = APIRouter()

@router.post("/sign-up")
async def sign_up(user_data: UserSignUpSchema, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(
        select(UsersTable).where(UsersTable.email == user_data.email)
    )
    if existing.scalar():
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = UsersTable(
        email=user_data.email,
        password=hash_password(user_data.password),
        first_name=user_data.first_name,
        last_name=user_data.last_name
    )
    db.add(new_user)
    await db.commit()
    print("Created user!")
    return {"message": "User created successfully"}