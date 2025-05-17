import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import os
import json

from api.app import create_app, db
from sqlalchemy import text

columns = ["force", "level", "mechanic", "equipment", "category"]
options_dict = {}

app = create_app()

with app.app_context():
    for col in columns:
        result = db.session.execute(text(f"SELECT DISTINCT {col} FROM exercises"))
        options_dict[col] = [row[0] for row in result if row[0] != None]

base_path = 'mobile-app/assets/generated_objects'
output_path = 'mobile-app/assets/generated_objects/generatedOptionsForExerciseCharacteristics.js'

output = []
output.append("const generatedOptionsForExerciseCharacteristics = \n")
output.append(json.dumps(options_dict, indent=2))

with open(output_path, 'w') as f:
    f.writelines(output)

print("Generated generatedOptionsForExerciseCharacteristics.js")
