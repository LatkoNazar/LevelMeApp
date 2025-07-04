import os
from pathlib import Path
import httpx
from typing import Dict, List
from chatbot.chat_utils import call_chat
from sqlalchemy.ext.asyncio import AsyncSession
from api.db.db import get_db
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from chatbot.chat_db_interaction.chat_chromaDB_interaction import get_exercise_from_vector_db
from sqlalchemy import text
import json

key_muscles = {
    "legs": ["adductors", "hamstrings", "glutes", "abductors", "calves", "quadriceps"],
    "back": ["middle back", "traps", "lats", "lower back"],
    "chest": ["chest"],
    "arms": ["forearms", "triceps", "biceps"],
    "neck": ["neck"],
    "abs": ["abdominals"],
    "shoulders": ["shoulders"],
}


def parse_exercise_text(text: str):
    plans = []
    current = {}
    lines = text.strip().splitlines()

    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.startswith("Day:"):
            if current:
                plans.append(current)
                current = {}
            current["day"] = line.split("Day:")[1].strip()
            current["groups"] = []
        elif line.startswith("Plan:"):
            if current:
                plans.append(current)
            current = {"day": "Your Plan", "groups": []}
        elif line.startswith("Muscle group:"):
            group = {"name": line.split(":", 1)[1].strip(), "exercises": []}
            current["groups"].append(group)
        elif line.startswith("Count:"):
            if current.get("groups"):
                current["groups"][-1]["count"] = int(line.split(":", 1)[1].strip())
        elif line.startswith("- "):
            name_desc = line[2:].split(":", 1)
            if len(name_desc) == 2 and current.get("groups"):
                name, desc = name_desc
                current["groups"][-1]["exercises"].append({
                    "name": name.strip(),
                    "description": desc.strip()
                })
    if current:
        plans.append(current)
    return plans


async def get_exercises(data) -> str:
    muscle_info = "".join(f"{muscle}: {key_muscles[muscle]}\n" for muscle in data["muscle_groups"])

    format_description = (
        "Format your response like this:\n\n"
        "Day: Chest & Triceps\n"
        "Muscle group: chest\n"
        "Count: 2\n"
        "- Bench Press: A compound barbell exercise for chest, triceps, shoulders\n"
        "- Push-Ups: A bodyweight exercise working the chest and triceps\n\n"
        "Day: Back & Biceps\n"
        "Muscle group: back\n"
        "Count: 2\n"
        "- Deadlift: A compound movement targeting lower back, glutes, and hamstrings\n"
        "- Pull-Ups: A bodyweight exercise focusing on lats and biceps\n"
    )

    system = (
    "You are a professional fitness coach who suggests the best exercises for each specified muscle group.\n"
    "Necessary information:\n"
    f"The user has {data['type_of_split']} type of split.\n"
    f"The user has the following muscle groups:\n{muscle_info}\n"
    f"The user's equipment: {data['equipment']}\n"
    f"The user's main goal: {data['goal']}\n"
    "They want a training split. Group exercises by days which are parts of week split like \"Chest & Triceps\", \"Back & Biceps\", etc.\n"
    + format_description +
    "\nOnly return plain text with no explanation or formatting like markdown. No bullet points unless specified."
)

    user = "User's request: \"Generate training program having info I gave to you\""
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": user}
    ]

    content = await call_chat(messages=messages, temperature=0.1)
    return parse_exercise_text(content) or ""


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

async def get_generated_exercises_info(data: List[dict], db: AsyncSession = Depends(get_db)):
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

async def get_result(data, db: AsyncSession = Depends(get_db)):
    exercises_json = await get_exercises(data)
    if isinstance(exercises_json, str):
        exercises_json = json.loads(exercises_json)
    vector_db_exercises = get_exercise_from_vector_db(exercises_json)
    full_plan = await get_generated_exercises_info(vector_db_exercises, db)
    return full_plan