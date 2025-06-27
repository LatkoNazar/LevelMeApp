import os
import chromadb

STORAGE_DIR = os.path.join(os.getcwd(), "chroma_storage")
_CLIENT = chromadb.PersistentClient(path=STORAGE_DIR)
_COLLECTIONS = {}

def get_chroma_collection(name: str):
    if name not in _COLLECTIONS:
        _COLLECTIONS[name] = _CLIENT.get_or_create_collection(name=name)
    return _COLLECTIONS[name]

def get_exercises_collection():
    return get_chroma_collection("exercises")