import os
from pathlib import Path
import httpx
from typing import Dict, List
from chatbot.chat_utils import call_chat


key_muscles = {
    "legs": ["adductors", "hamstrings", "glutes", "abductors", "calves", "quadriceps"],
    "back": ["middle back", "traps", "lats", "lower back"],
    "chest": ["chest"],
    "arms": ["forearms", "triceps", "biceps"],
    "neck": ["neck"],
    "abs": ["abdominals"],
    "shoulders": ["shoulders"],
}

valid_muscle_groups = set(key_muscles.keys())

async def extract_target_muscles(prompt: str, history: List[Dict]) -> List[str]:
    system = (
        "You are an assistant that extracts target muscle groups from a user workout request. "
        "Respond with a comma-separated list using only these groups: "
        f"{', '.join(sorted(valid_muscle_groups))}. "
        "If the user requests a full workout plan, include all groups."
    )
    user = f"User's request: \"{prompt}\""
    messages = history + [
            {"role": "system", "content": system},
            {"role": "user", "content": user}
        ]
    content = await call_chat(messages=messages,temperature=0.1)
    print("🧠 Model response:", content)
    muscles = [m.strip().lower() for m in content.split(",")]
    if "all" in muscles or "full" in prompt.lower():
        return sorted(valid_muscle_groups)
    return sorted([m for m in muscles if m in valid_muscle_groups])


async def extract_split_type(prompt: str, history: List[Dict]) -> str | None:
    messages = history + [
            {"role": "system", "content": (
                "You are an assistant that extracts the training split type from the user's input. "
                "If the user explicitly or implicitly mentions a training split (e.g., push/pull/legs, bro split, upper/lower, etc.), "
                "respond ONLY with the name of the split (e.g., 'push/pull/legs'). "
                "If the user does not care about the type of split or it is not mentioned, respond with 'none'. "
                "Do not add any explanation or extra words — return a single string only."
            )},
            {"role": "user", "content": f"{prompt}\n"}
        ]
    split_type = await call_chat(messages=messages, temperature=0.0)
    return None if "none" in split_type.lower() else split_type.strip().lower()


def parse_exercise_text(text: str):
    plans = []
    current = {}
    lines = text.strip().splitlines()

    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.startswith("Day:"):
            if current:
                plans.append(current)
                current = {}
            current["day"] = line.split("Day:")[1].strip()
            current["groups"] = []
        elif line.startswith("Plan:"):
            if current:
                plans.append(current)
            current = {"day": "Your Plan", "groups": []}
        elif line.startswith("Muscle group:"):
            group = {"name": line.split(":", 1)[1].strip(), "exercises": []}
            current["groups"].append(group)
        elif line.startswith("Count:"):
            if current.get("groups"):
                current["groups"][-1]["count"] = int(line.split(":", 1)[1].strip())
        elif line.startswith("- "):
            name_desc = line[2:].split(":", 1)
            if len(name_desc) == 2 and current.get("groups"):
                name, desc = name_desc
                current["groups"][-1]["exercises"].append({
                    "name": name.strip(),
                    "description": desc.strip()
                })
    if current:
        plans.append(current)
    return plans


async def needs_training_split(prompt: str, history: List[Dict]) -> bool:
    messages = history.get_history() + [
        {"role": "system", "content": (
            "You are an assistant that decides whether a training split is necessary for the user's workout request.\n"
            "Respond with only 'yes' or 'no'.\n"
            "Say 'yes' if the user wants multiple workout days or mentions a split (push/pull/legs, etc).\n"
            "Say 'no' if the user just wants a general workout or full body routine.\n"
        )},
        {"role": "user", "content": prompt}
    ]
    result = await call_chat(messages=messages, temperature=0.0)
    return result.strip().lower() == "yes"


async def get_exercises(prompt: str, history: List[Dict[str, str]], muscle_groups: List[str]) -> str:
    muscle_info = "".join(f"{muscle}: {key_muscles[muscle]}\n" for muscle in muscle_groups)

    user_needs_training_split = await needs_training_split(prompt=prompt, history=history)

    format_description = (
        "Format your response like this:\n\n"
        "Day: Chest & Triceps\n"
        "Muscle group: chest\n"
        "Count: 2\n"
        "- Bench Press: A compound barbell exercise for chest, triceps, shoulders\n"
        "- Push-Ups: A bodyweight exercise working the chest and triceps\n\n"
        "Day: Back & Biceps\n"
        "Muscle group: back\n"
        "Count: 2\n"
        "- Deadlift: A compound movement targeting lower back, glutes, and hamstrings\n"
        "- Pull-Ups: A bodyweight exercise focusing on lats and biceps\n"
    ) if user_needs_training_split else (
        "Format your response like this:\n\n"
        "Plan:\n"
        "Muscle group: chest\n"
        "Count: 2\n"
        "- Bench Press: A compound barbell exercise for chest, triceps, shoulders\n"
        "- Push-Ups: A bodyweight exercise working the chest and triceps\n\n"
        "Muscle group: back\n"
        "Count: 2\n"
        "- Pull-Ups: A bodyweight exercise focusing on back and biceps\n"
        "- Barbell Row: A compound barbell movement for the upper back\n"
    )

    system = (
    "You are a professional fitness coach who suggests the best exercises for each specified muscle group.\n"
    f"The user has the following muscle groups:\n{muscle_info}\n"
    f"Necessary questions and answers:\n"
    +
    ("\n").join([f"Question: {q}. Answer: {a}." for qa in history.get_all_questions_and_answers() for q, a in qa.items()])
    +
    ("They want a training split. Group exercises by days like \"Chest & Triceps\", \"Back & Biceps\", etc.\n"
     if user_needs_training_split else
     "They don't want a split. Group everything into one general plan.\n") +
    "Each muscle group must have at least one exercise.\n"
    "Use only the provided muscle groups: " + ', '.join(sorted(muscle_groups)) + ".\n"
    "Do NOT use JSON or any structured data format.\n"
    "Write raw text only in the format below.\n\n"
    + format_description +
    "\nOnly return plain text with no explanation or formatting like markdown. No bullet points unless specified."
)

    user = f"User's request: \"{prompt}\""
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": user}
    ]

    content = await call_chat(messages=messages, temperature=0.1)
    return parse_exercise_text(content) or ""
