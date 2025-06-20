import json
from pathlib import Path

from backend.api.app import app, db

def init_db_and_import_data() -> None:
    with app.app_context():
        db.session.execute(db.text('''
            CREATE TABLE IF NOT EXISTS exercises (
                id TEXT PRIMARY KEY,
                name TEXT,
                force TEXT,
                level TEXT,
                mechanic TEXT,
                equipment TEXT,
                instructions TEXT,
                category TEXT,
                images TEXT
            )
        '''))

        db.session.execute(db.text('''
            CREATE TABLE IF NOT EXISTS primary_muscles (
                exercise_id TEXT,
                muscle TEXT,
                FOREIGN KEY(exercise_id) REFERENCES exercises(id)
            );
        '''))

        db.session.execute(db.text('''
            CREATE TABLE IF NOT EXISTS secondary_muscles (
                exercise_id TEXT,
                muscle TEXT,
                FOREIGN KEY(exercise_id) REFERENCES exercises(id)
            );
        '''))

        exercises_dir = Path("mobile-app/assets/exercises")
        for json_file in exercises_dir.glob("*.json"):
            with open(json_file, "r", encoding="utf-8") as f:
                exercise = json.load(f)

                db.session.execute(db.text('''
                    INSERT INTO exercises (id, name, force, level, mechanic, equipment, instructions, category)
                    VALUES (:id, :name, :force, :level, :mechanic, :equipment, :instructions, :category)
                    ON CONFLICT (id) DO NOTHING
                '''), {
                    'id': exercise['id'],
                    'name': exercise['name'],
                    'force': exercise['force'],
                    'level': exercise['level'],
                    'mechanic': exercise['mechanic'],
                    'equipment': exercise['equipment'],
                    'instructions': json.dumps(exercise['instructions']),
                    'category': exercise['category']
                })

                for muscle in exercise.get('primaryMuscles', []):
                    db.session.execute(db.text('''
                        INSERT INTO primary_muscles (exercise_id, muscle)
                        VALUES (:id, :muscle)
                    '''), {'id': exercise['id'], 'muscle': muscle})

                for muscle in exercise.get('secondaryMuscles', []):
                    db.session.execute(db.text('''
                        INSERT INTO secondary_muscles (exercise_id, muscle)
                        VALUES (:id, :muscle)
                    '''), {'id': exercise['id'], 'muscle': muscle})

        db.session.commit()

if __name__ == "__main__":
    init_db_and_import_data()