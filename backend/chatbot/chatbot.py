from fastapi import WebSocket, WebSocketDisconnect, APIRouter
import httpx
import os
from dotenv import load_dotenv
from pathlib import Path
from chatbot.chat_memory import ChatMemory

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')

router = APIRouter()

history = ChatMemory()

def prompt_format_for_model(model_name, history):
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


@router.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        data = await websocket.receive_json()
        prompt = data.get("prompt")
        history.add("user", prompt)

        url = "https://openrouter.ai/api/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": "deepseek/deepseek-r1-0528:free",
            "messages": history.get(),
            "temperature": 0.7,
            "stream": True
        }

        async with httpx.AsyncClient(timeout=None) as client:
            async with client.stream("POST", url, headers=headers, json=payload) as response:
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        data = line.removeprefix("data: ").strip()
                        if data == "[DONE]":
                            await websocket.send_text("[DONE]")
                            break
                        try:
                            chunk = httpx.Response(200, content=data).json()
                            delta = chunk["choices"][0]["delta"]
                            content = delta.get("content")
                            if content:
                                await websocket.send_text(content)
                        except Exception as e:
                            await websocket.send_text(f"⚠️ Error parsing chunk: {e}")

    except WebSocketDisconnect:
        print("Client disconnected")

@router.post("/chat/new-chat")
async def new_chat():
    history.reset()
