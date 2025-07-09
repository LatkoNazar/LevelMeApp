import sys
import os
import ast
import json
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import re
import pandas as pd
from sentence_transformers import SentenceTransformer
from tqdm import tqdm
from api.db.chroma_db import get_chroma_collection, del_collection

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(script_dir, '..', '..'))
CSV_PATH = os.path.join(project_root, "13k-recipes.csv")

COLLECTION_NAME = "food_recipes"
EMBEDDING_MODEL = "BAAI/bge-large-en-v1.5"

model = SentenceTransformer(EMBEDDING_MODEL, device="cuda")

print("🔄 Loading dataset...")
from datasets import load_dataset

dataset = load_dataset("Thefoodprocessor/recipes")

del_collection(COLLECTION_NAME)
collection = get_chroma_collection(COLLECTION_NAME)

batch_texts = []
batch_ids = []
batch_size = 32

# import ast
# import re


# def clean_ingredients_string(text):
#     if text.startswith('"') and text.endswith('"'):
#         text = text[1:-1]
#     text = text.replace('\\"', '"')
#     text = re.sub(r'"([^"]*?)"', r"'\1'", text)
#     return text

# def parse_ingredients(raw_text):
#     cleaned = clean_ingredients_string(raw_text)
#     try:
#         parsed = ast.literal_eval(cleaned)
#         if isinstance(parsed, list):
#             return parsed
#         else:
#             return [str(parsed)]
#     except Exception as e:
#         return [raw_text]

# def clean_text(text):
#     text = re.sub(r"[^a-zA-Zа-яА-ЯёЁїЇєЄіІґҐ\s]", " ", text)
#     text = text.lower()
#     text = re.sub(r"\s+", " ", text).strip()
#     return text

from tqdm import tqdm
df = dataset["train"].to_pandas()
for idx, row in tqdm(df.iterrows(), total=len(df)):
    try:
        recipe = row["recipe"]
        batch_texts.append(recipe)
        batch_ids.append(f"recipe_{idx}")

        if len(batch_texts) == batch_size:
            embeddings = model.encode(batch_texts, normalize_embeddings=True)
            collection.add(ids=batch_ids, embeddings=embeddings.tolist(), documents=batch_texts)
            batch_texts = []
            batch_ids = []

    except Exception as e:
        print(f"Error at row {idx}: {e}")
        print("Raw data:", row["recipe"])
        continue

if batch_texts:
    embeddings = model.encode(batch_texts, normalize_embeddings=True)
    collection.add(ids=batch_ids, embeddings=embeddings.tolist(), documents=batch_texts)

