from fastapi import WebSocket, WebSocketDisconnect, APIRouter
from fastapi.responses import JSONResponse
import httpx
import json
from chatbot.chat_memory import ChatMemory
from typing import List, Dict
from dotenv import load_dotenv
from .rag_routes.workout_routing import extract_target_muscles, get_exercises,  ask_user_for_missing_info, extract_split_type
from .chat_db_interaction.chat_chromaDB_interacrion import get_exercise_from_vercorDB
import os

from .chat_settings import model, url, GROQ_API_KEY
from chatbot.chat_utils import call_chat

backend_base_url=os.getenv("BACKEND_URL")

router = APIRouter(prefix="/chat")

history = ChatMemory()

# Is not used now
def prompt_format_for_model(model_name: str, history: List[Dict[str, str]]) -> str:
    if "openai" in model_name or "gpt" in model_name:
        return history
    elif "mistral" in model_name or "deepseek" in model_name:
        formatted = ""
        for msg in history:
            role = msg["role"]
            prefix = "User:" if role == "user" else "Assistant:"
            formatted += f"{prefix} {msg['content']}\n"
        formatted += "Assistant: "
        return formatted


async def detect_rag_data_type(prompt: str) -> str:
    system_prompt = (
        "You are an assistant that analyzes user queries and decides whether private data should be used.\n"
        "There are three types of private data:\n"
        "1. 'workout' – contains exercise programs, gym/home exercises\n"
        "2. 'recipes' – contains cooking instructions and meal plans\n\n"
        "📛 Important:\n"
        "- Sports-specific training (like football drills or boxing routines) is NOT included in private data. Only gym/home exercises\n"
        "- Respond with only one of the following exact words: 'none', 'workout', 'recipes', or 'both'.\n"
        "- Do not explain your answer.\n\n"
        "⚠️ Be very strict:\n"
        "- If the question is vague or general, answer 'none'.\n"
        "- Only respond with 'workout' or 'recipes' if the user clearly needs that specific type of private data.\n"
        "- When in doubt, always choose 'none'.\n"
    )

    user_prompt = (
        f"I have private data about physical workouts (gym/home exercises) and nutrition (food recipes).\n"
        f"Here is the user's request: \"{prompt}\"\n"
        f"What type of private data should I retrieve to answer this request?"
    )
    messages=history.get_trimmed_history() + [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    content = await call_chat(messages=messages, temperature=0.0)
    print("📥 User prompt:", user_prompt)
    print("📤 Model response:", content)
    if content in ["none", "workout", "nutrition", "both"]:
        return content
    else:
        return "none"


async def default_chat(websocket: WebSocket):
    # headers = {
    #     "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
    #     "Content-Type": "application/json",
    # }
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": model,
        "messages": history.get_trimmed_history(),
        "temperature": 0.7,
        "stream": True
    }
    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream("POST", url, headers=headers, json=payload) as response:
            async for line in response.aiter_lines():
                if line.startswith("data: "):
                    data = line.removeprefix("data: ").strip()
                    if data == "[DONE]":
                        await websocket.send_json({"type": "done", "message": "[DONE]"})
                        break
                    try:
                        chunk = httpx.Response(200, content=data).json()
                        delta = chunk["choices"][0]["delta"]
                        content = delta.get("content")
                        if content:
                            await websocket.send_json({"type": "message", "message": content})
                    except Exception as e:
                        await websocket.send_json({"type": "message", "message": f"⚠️ Error parsing chunk: {e}"})



@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await websocket.accept()
    try:
        data = await websocket.receive_json()
        prompt = data.get("prompt")
        history.add("user", prompt)

        rag_type = await detect_rag_data_type(prompt=prompt)

        match rag_type:
            case "workout":
                questions_to_ask = await ask_user_for_missing_info(prompt=prompt, history=history.get_trimmed_history())
                for line in questions_to_ask.strip().split("\n"):
                    history.add("assistant", line.strip())
                if "No questions to ask" not in questions_to_ask:
                    await websocket.send_json({"type": "message", "message": "⚠️ I need a bit more info to create a complete plan:\n"})
                    await websocket.send_json({"type": "message", "message": questions_to_ask})
                    return
                split = await extract_split_type(prompt, history.get_trimmed_history())
                await websocket.send_json({"type": "message", "message" : "🔍 Retrieving relevant exercises from your private database...\n"})

                muscles = await extract_target_muscles(prompt=prompt, history=history.get_trimmed_history())
                await websocket.send_json({"type": "message", "message": f"🏋️‍♂️ Target muscles: {', '.join(muscles)}\n"})

                exercises_json = await get_exercises(prompt=prompt, muscle_groups=muscles, training_split=split)
                #print(json.dumps(exercises_json, indent=4))
                if isinstance(exercises_json, str):
                    exercises_json = json.loads(exercises_json)
                exercises = await get_exercise_from_vercorDB(exercises_json=exercises_json)
                print(json.dumps(exercises, indent=4))
                if "error" in exercises:
                    print("error")
                else:
                    await websocket.send_json({"type": "training_plan", "message": exercises})
                    await websocket.send_json({"type": "message", "message": "Your program is ready ✅"})
                await websocket.send_json({"type": "done", "message": "[DONE]"})
            case "none":
                await default_chat(websocket)
    except WebSocketDisconnect:
        print("Client disconnected")


@router.post("/new-chat")
async def new_chat() -> JSONResponse:
    history.reset()
    return JSONResponse(content={"message": "New chat started"})