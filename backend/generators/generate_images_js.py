import os
import json

base_path = 'mobile-app/assets/exercises'
output_path = 'mobile-app/assets/generated_objects/exerciseImages.js'

output = []
output.append("const exerciseImages = {\n")

for filename in os.listdir(base_path):
    if filename.endswith('.json'):
        json_path = os.path.join(base_path, filename)

        with open(json_path, 'r') as f:
            data = json.load(f)
            exercise_id = data['id']

            image_dir = os.path.join(base_path, exercise_id)
            if not os.path.isdir(image_dir):
                continue

            output.append(f'  "{exercise_id}": [\n')

            for image_file in sorted(os.listdir(image_dir)):
                if image_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    rel_path = f'../exercises/{exercise_id}/{image_file}'
                    output.append(f"    require('{rel_path}'),\n")

            output.append("  ],\n")

output.append("};\n\nexport default exerciseImages;\n")

with open(output_path, 'w') as f:
    f.writelines(output)

print("Generated exerciseImages.js")
