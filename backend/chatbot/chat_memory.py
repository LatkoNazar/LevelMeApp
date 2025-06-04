﻿class ChatMemory:
    def __init__(self):
        self.history = []

    def add(self, role, content):
        self.history.append({"role": role, "content": content})

    def get(self):
        return self.history

    def reset(self):
        self.history = []