from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from api.db.db import get_db
from typing import List, Dict

router = APIRouter(prefix="/collection")

@router.get("/{category}-exercises")
async def retrieve_all_exercises(
    category: str,
    page: int = Query(1, gt=0),
    per_page: int = Query(50, gt=0),
    db: AsyncSession = Depends(get_db)
) -> Dict:
    offset = (page - 1) * per_page

    base_query = """
        SELECT
            exercises.*,
            STRING_AGG(DISTINCT primary_muscles.muscle, ',') AS primaryMuscles,
            STRING_AGG(DISTINCT secondary_muscles.muscle, ',') AS secondaryMuscles
        FROM exercises
        LEFT JOIN primary_muscles ON exercises.id = primary_muscles.exercise_id
        LEFT JOIN secondary_muscles ON exercises.id = secondary_muscles.exercise_id
        GROUP BY exercises.id
    """

    def build_having_clause(muscles) -> str:
        conditions = [
            f"STRING_AGG(DISTINCT primary_muscles.muscle, ',') LIKE '%%{muscle}%%' OR STRING_AGG(DISTINCT secondary_muscles.muscle, ',') LIKE '%%{muscle}%%'"
            for muscle in muscles
        ]
        return "HAVING " + " OR ".join(conditions)

    filter_queries = {
        "all": base_query,
        "legs": base_query + "\n" + build_having_clause(["adductors", "hamstrings", "glutes", "abductors", "calves", "quadriceps"]),
        "back": base_query + "\n" + build_having_clause(["middle back", "traps", "lats", "lower back"]),
        "chest": base_query + "\n" + build_having_clause(["chest"]),
        "arms": base_query + "\n" + build_having_clause(["forearms", "triceps", "biceps", "shoulders"]),
        "neck": base_query + "\n" + build_having_clause(["neck"]),
        "abs": base_query + "\n" + build_having_clause(["abdominals"]),
    }

    if category not in filter_queries:
        raise HTTPException(status_code=400, detail="Invalid category")

    count_query = f"SELECT COUNT(*) FROM ({filter_queries[category]}) AS subquery"
    try:
        count_result = await db.execute(text(count_query))
        total_count = count_result.scalar()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Count error: {str(e)}")

    final_query = f"{filter_queries[category]} LIMIT {per_page} OFFSET {offset}"
    try:
        result = await db.execute(text(final_query))
        rows = result.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query error: {str(e)}")

    exercises = [
        {
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
        for row in rows
    ]

    return {
        "exercises": exercises,
        "page": page,
        "per_page": per_page,
        "total_count": total_count
    }


