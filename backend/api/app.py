﻿from fastapi import FastAPI
from dotenv import load_dotenv
from pathlib import Path
from contextlib import asynccontextmanager
import os

from api.db.db import setup_database
from api.retrievals.retrieve_exercises import router as exercises_router
from chatbot.chatbot import router as chatbot_router
from generators.vectorize import router as exercises_test_router
from api.retrievals.generated_items_retrieval import router as generated_items_router
from api.auth.login import router as login_router
from api.auth.sign_up import router as sign_up_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_database()
    yield

def create_app() -> FastAPI:
    env_path = Path(__file__).resolve().parent.parent.parent / ".env"
    load_dotenv(dotenv_path=env_path)

    app = FastAPI(lifespan=lifespan)

    app.include_router(login_router)
    app.include_router(sign_up_router)
    app.include_router(exercises_test_router)
    app.include_router(exercises_router)
    app.include_router(chatbot_router)
    app.include_router(generated_items_router)
    return app

app = create_app()
