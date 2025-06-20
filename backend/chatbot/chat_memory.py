from typing import List, Dict, Literal

class ChatMemory:
    def __init__(self) -> None:
        self.history = []
        self.chat_state = {
            "expecting_additional_info": False,
            "pending_questions": [],
        }

    def add(self, role: Literal["user", "system", "assistant"], content: str) -> None:
        self.history.append({"role": role, "content": content})

    def get(self) -> List[Dict]:
        return self.history

    def reset(self) -> None:
        self.history = []

    def get_trimmed_history(self, max_messages: int = 10) -> List[Dict[str, str]]:
        return self.history[-max_messages:]