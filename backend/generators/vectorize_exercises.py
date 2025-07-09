from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from api.db.db import get_db
from sentence_transformers import SentenceTransformer
import json
from api.db.chroma_db import get_chroma_collection

router = APIRouter()
model = SentenceTransformer("BAAI/bge-large-en-v1.5")

@router.get("/vectorize-exercises")
async def get_selection(db: AsyncSession = Depends(get_db)) -> None:
    collection = get_chroma_collection("exercises")
    query = text("""
            SELECT
                exercises.id, exercises.name, exercises.force, exercises.level, exercises.mechanic, exercises.equipment,
                exercises.instructions, exercises.category,
                STRING_AGG(DISTINCT primary_muscles.muscle, ',') AS primary_muscles,
                STRING_AGG(DISTINCT secondary_muscles.muscle, ',') AS secondary_muscles
            FROM exercises
            LEFT JOIN primary_muscles ON exercises.id = primary_muscles.exercise_id
            LEFT JOIN secondary_muscles ON exercises.id = secondary_muscles.exercise_id
            GROUP BY exercises.id""")
    result = await db.execute(query)
    rows = result.fetchall()

    ids = []
    embeddings = []
    documents = []

    for row in rows:
        data = dict(row._mapping)
        id_ = data.get("id", "")
        name = data.get("name", "")
        force = data.get("force", "")
        level = data.get("level", "")
        mechanic = data.get("mechanic", "")
        equipment = data.get("equipment", "")
        category = data.get("category", "")
        primary_muscles = data.get("primary_muscles")
        secondary_muscles = data.get("secondary_muscles")

        instructions_json = data.get("instructions", "[]")
        try:
            instructions = json.loads(instructions_json) if instructions_json else []
        except json.JSONDecodeError:
            instructions = []

        instructions_text = " ".join(instructions)

        new_text = (
            f"Name: {name}. Force: {force}. Level: {level}. Mechanic: {mechanic}. "
            f"Equipment: {equipment}. Category: {category}. Primary Muscles: {primary_muscles}. "
            f"Secondary Muscles: {secondary_muscles}"
            f"Instructions: {instructions_text}. "
        )
        vector =  model.encode(new_text)

        ids.append(id_)
        embeddings.append(vector.tolist())
        documents.append(new_text)
        print("Len ids: ", len(ids))
    collection.add(
    ids=ids,
    embeddings=embeddings,
    documents=documents
    )