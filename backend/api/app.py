from fastapi import FastAPI
from dotenv import load_dotenv
from pathlib import Path
from contextlib import asynccontextmanager
import os

from api.db.db import setup_database
from api.retrievals.retrieve_exercises import router as exercises_router
from chatbot.chatbot import router as chatbot_router
from generators.vectorize_exercises import router as exercises_test_router
from api.retrievals.generated_items_retrieval import router as generated_items_router
from api.auth.login import router as login_router
from api.auth.sign_up import router as sign_up_router
from api.retrievals.retrieve_user_data import router as user_profile_router
from api.generators.generate_workout import router as generate_workout_program_with_button
from api.generators.generate_nutrition_plan import router as generate_nutrition_program_with_button

@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_database()
    yield

def create_app() -> FastAPI:
    env_path = Path(__file__).resolve().parent.parent.parent / ".env"
    load_dotenv(dotenv_path=env_path)

    app = FastAPI(lifespan=lifespan)
    app.include_router(user_profile_router)
    app.include_router(login_router)
    app.include_router(sign_up_router)
    app.include_router(exercises_test_router)
    app.include_router(exercises_router)
    app.include_router(chatbot_router)
    app.include_router(generated_items_router)
    app.include_router(generate_workout_program_with_button)
    app.include_router(generate_nutrition_program_with_button)
    return app

app = create_app()
