import httpx
from typing import List, Dict
from .chat_settings import model, url, GROQ_API_KEY

async def call_chat(messages: List[Dict], temperature: float = 0.0) -> str:
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "stream": False
    }
    # headers = {
    #     "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
    #     "Content-Type": "application/json"
    # }
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(60.0)) as client:
            response = await client.post(url, headers=headers, json=payload)
            print("Response: ", response)
            result = response.json()
            return result["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"❌ DeepSeek error: {e}")
        return "[ERROR]"