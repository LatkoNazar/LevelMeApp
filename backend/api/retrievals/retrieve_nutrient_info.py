from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from api.db.db import get_db
from typing import Dict, List

router = APIRouter()

@router.get("/nutrient_info")
async def retrieve_all_nutrient_info(db: AsyncSession = Depends(get_db)) -> List[Dict]:
    query = text("SELECT * FROM nutrient_info")
    result = await db.execute(query)
    rows = result.fetchall()
    return [dict(row) for row in rows]
