import os
import chromadb
from sentence_transformers import SentenceTransformer
import json

STORAGE_DIR = os.path.join(os.getcwd(), "chroma_storage")

client = chromadb.PersistentClient(path=STORAGE_DIR)
model = SentenceTransformer("BAAI/bge-large-en-v1.5")

async def get_exercise_from_vercorDB(exercises_json):
    collection = client.get_collection(name="exercises")
    try:
        result = []

        for day_plan in exercises_json:
            updated_day = {
                "day": day_plan["day"],
                "groups": []
            }

            for group in day_plan["groups"]:
                exercise_list = [
                    f"{ex['name']} {ex['description']}" for ex in group.get("exercises", [])
                ]

                vectors = [model.encode(exercise).tolist() for exercise in exercise_list]
                results = collection.query(
                    query_embeddings=vectors,
                    n_results=1,
                )
                flat_list = [item for sublist in results["ids"] for item in sublist]

                updated_group = {
                    "name": group["name"],
                    "count": group["count"],
                    "exercises": flat_list
                }

                updated_day["groups"].append(updated_group)
            result.append(updated_day)
        return result
    except Exception as e:
        return {"error": e}