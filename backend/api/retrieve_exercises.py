from flask import Blueprint, jsonify
from .app import db
from sqlalchemy import text

api_blueprint = Blueprint("api", __name__)

@api_blueprint.route("/all-exercises")
def retrieve_all_exercises():
    result = db.session.execute(text("""
        SELECT
            exercises.*,
            STRING_AGG(DISTINCT primary_muscles.muscle, ',') AS primaryMuscles,
            STRING_AGG(DISTINCT secondary_muscles.muscle, ',') AS secondaryMuscles
        FROM exercises
        LEFT JOIN primary_muscles ON exercises.id = primary_muscles.exercise_id
        LEFT JOIN secondary_muscles ON exercises.id = secondary_muscles.exercise_id
        GROUP BY exercises.id
    """))

    exercises = []
    for row in result:
        exercises.append({
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
        })

    return jsonify(exercises)