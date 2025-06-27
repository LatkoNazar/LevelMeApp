from typing import List, Dict, Literal, Optional

class ChatMemory:
    def __init__(self) -> None:
        self.history: List[Dict[str, str]] = []
        self.chat_state = {
            "expecting_additional_info": False,
            "questions": {},  # type: Dict[str, Optional[str]]
        }

    def __str__(self):
        return '\n'.join([f"{q}: {a}" for q, a in self.chat_state["questions"].items()])

    def add(self, role: Literal["user", "system", "assistant"], content: str) -> None:
        self.history.append({"role": role, "content": content})

    def get_history(self) -> List[Dict]:
        return self.history

    def reset(self) -> None:
        self.history = []
        self.chat_state = {
            "expecting_additional_info": False,
            "questions": {},
        }

    def get_trimmed_history(self, max_messages: int = 10) -> List[Dict[str, str]]:
        return self.history[-max_messages:]

    def get_all_questions_and_answers(self):
        return [{q: a} for q, a in self.chat_state["questions"].items()]

    def get_pending_questions(self) -> List[str]:
        return [q for q, a in self.chat_state["questions"].items() if a is None]

    def expecting_info(self) -> bool:
        return self.chat_state["expecting_additional_info"]

    def add_question(self, question: str) -> None:
        if question not in self.chat_state["questions"]:
            self.chat_state["questions"][question] = None
            self.chat_state["expecting_additional_info"] = True

    def add_answer(self, question: str, answer: str) -> None:
        if question in self.chat_state["questions"]:
            self.chat_state["questions"][question] = answer

        if all(v is not None for v in self.chat_state["questions"].values()):
            self.chat_state["expecting_additional_info"] = False

    def clear_questions(self) -> None:
        self.chat_state["questions"] = {}
        self.chat_state["expecting_additional_info"] = False