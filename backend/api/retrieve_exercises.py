from flask import Blueprint, jsonify
from .app import db
from sqlalchemy import text

api_blueprint = Blueprint("api", __name__)

@api_blueprint.route("/<category>-exercises")
def retrieve_all_exercises(category):

    base_query = """SELECT
            exercises.*,
            STRING_AGG(DISTINCT primary_muscles.muscle, ',') AS primaryMuscles,
            STRING_AGG(DISTINCT secondary_muscles.muscle, ',') AS secondaryMuscles
        FROM exercises
        LEFT JOIN primary_muscles ON exercises.id = primary_muscles.exercise_id
        LEFT JOIN secondary_muscles ON exercises.id = secondary_muscles.exercise_id
        GROUP BY exercises.id
        """

    def build_having_clause(muscles):
        conditions = []
        for muscle in muscles:
            conditions.append(f"STRING_AGG(DISTINCT primary_muscles.muscle, ',') LIKE '%%{muscle}%%'")
            conditions.append(f"STRING_AGG(DISTINCT secondary_muscles.muscle, ',') LIKE '%%{muscle}%%'")
        return "HAVING " + " OR\n       ".join(conditions)

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
        return jsonify({"error": "Invalid category"}), 400

    try:
        result = db.session.execute(text(filter_queries[category]))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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