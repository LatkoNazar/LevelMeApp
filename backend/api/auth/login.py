from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from api.db.db import get_db
from typing import List, Dict
import json

from sqlalchemy.future import select

from ORM.users_table import UsersTable
from ORM.user_tokens import UserTokens
from schemas.user_schema import  UserLoginSchema
from .utils import hash_password, verify_password, create_access_token

from datetime import datetime, timedelta, timezone

router = APIRouter()

@router.post("/login")
async def login(user_data: UserLoginSchema, db: AsyncSession = Depends(get_db)):
    stmt = select(UsersTable).where(UsersTable.email == user_data.email)
    result = await db.execute(stmt)
    existing_user = result.scalars().first()
    if existing_user:
        match_password = verify_password(user_data.password ,existing_user.password)
        if match_password:
            token = create_access_token({"id": existing_user.id, "created_at": existing_user.created_at.isoformat()})
            new_token = UserTokens(
                user_id=existing_user.id,
                token=token,
                created_at=datetime.now(timezone.utc),
                expires_at = datetime.now(timezone.utc) + timedelta(days=365),
                device_info=user_data.device_info
            )
            db.add(new_token)
            await db.commit()
            return JSONResponse(content={"message": "Login successful", "userToken": token})
        else:
            raise HTTPException(status_code=400, detail="Passwords do not match!")
    else:
        raise HTTPException(status_code=400, detail="Wrong email address!")