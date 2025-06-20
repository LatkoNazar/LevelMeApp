from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


# DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')
# url = "https://openrouter.ai/api/v1/chat/completions"
# model = "deepseek/deepseek-r1-0528:free"

# OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
# url = "https://api.openai.com/v1/chat/completions"
# model= "gpt-3.5-turbo-0125"

url = "https://api.groq.com/openai/v1/chat/completions"
model = "llama3-70b-8192"  # або ""mixtral-8x7b-32768
GROQ_API_KEY = os.getenv("GROQ_API_KEY")