import os
import chromadb
from sentence_transformers import SentenceTransformer
import json

STORAGE_DIR = os.path.join(os.getcwd(), "chroma_storage")
client = chromadb.PersistentClient(path=STORAGE_DIR)
model = SentenceTransformer("BAAI/bge-large-en-v1.5")
