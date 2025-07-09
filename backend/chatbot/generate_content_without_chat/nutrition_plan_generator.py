import os
from pathlib import Path
import httpx
from typing import Dict, List
from chatbot.chat_utils import call_chat
from sqlalchemy.ext.asyncio import AsyncSession
from api.db.db import get_db
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from chatbot.chat_db_interaction.chat_chromaDB_interaction import get_recipes_from_vector_db
from sqlalchemy import text
import json
import re


def parse_nutrition_text(text: str):
    meals = []
    current = {}

    for line in text.strip().splitlines():
        line = line.strip()
        if not line:
            continue
        if line.startswith("Meal:"):
            if current:
                meals.append(current)
            current = {
                "meal": line.split("Meal:")[1].strip(),
                "items": []
            }
        elif line.startswith("- "):
            if current:
                current["items"].append(line[2:].strip())

    if current:
        meals.append(current)

    return meals

async def get_nutrition_plan(data) -> str:
    format_description = (
        "Format your response like this:\n\n"
        "Meal: Breakfast\n"
        "- Oats\n"
        "- Banana\n"
        "- Peanut butter\n"
        "- Milk\n\n"
        "Meal: Lunch\n"
        "- Chicken breast\n"
        "- Quinoa\n"
        "- Broccoli\n"
        "- Olive oil\n\n"
        "Meal: Dinner\n"
        "- Salmon\n"
        "- Sweet potatoes\n"
        "- Asparagus\n\n"
    )
    system = (
        "You are a professional nutritionist who creates the best 1-day nutrition plans for each person.\n"
        "Important:\n"
        f"The user has the following products:\n{data['available_products']}\n"
        f"The user has allergies to: {data['allergies_list']}\n"
        f"The user's main goal: {data['goal']}\n"
        f"Additional notes: {data['additional_notes']}\n\n"
        "Create a daily nutrition plan divided into: Breakfast, Lunch, Dinner, and Snack.\n"
        "For each meal, provide a list of individual food products (not dishes).\n"
        "DO NOT mention or suggest any cooked meals or recipes.\n"
        "Only list raw or prepared ingredients (like oats, banana, chicken breast, etc.).\n"
        "Each meal must be unique and use different products where possible.\n"
        "Only return plain text. No extra explanation, no markdown, and no formatting other than the one in the example.\n"
    ) + format_description
    user = "User's request: \"Generate a nutrition plan using the user info I gave to you\""
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": user}
    ]
    content = await call_chat(messages=messages, temperature=0.1)
    return parse_nutrition_text(content) or ""


# def to_context_format(plan):
#     result = ""
#     for meal in plan:
#         result += f"Meal: {meal['meal']}.\nRecipes:\n" + "\n".join(meal['recipes']) + "\n"
#     return result



# async def generate_final_plan(context: str, data: dict, db: AsyncSession = Depends(get_db)):
#     system = (
#         "Here are some example recipes:\n"
#         f"{context}\n\n"
#         "Now create a 1-day nutrition plan using these recipes and this user info:\n"
#         f"The user has the following products:\n{data['available_products']}\n"
#         f"The user has allergies to: {data['allergies_list']}\n"
#         f"The user's main goal: {data['goal']}\n"
#         f"Additional notes: {data['additional_notes']}\n\n"
#         "Output only the meal names and list of food products for each meal.\n"
#         "Do not invent new ingredients.\n"
#     )
#     user_prompt = "Generate a detailed nutrition plan."

#     messages = [
#         {"role": "system", "content": system},
#         {"role": "user", "content": user_prompt}
#     ]

#     result = await call_chat(messages=messages, temperature=0.1)
#     return result


async def get_result(data, db: AsyncSession = Depends(get_db)):
    nutrition_plan_json = await get_nutrition_plan(data)
    vector_recipe_matches = get_recipes_from_vector_db(nutrition_plan_json)
    # context = to_context_format(vector_recipe_matches)
    # final_plan = await generate_final_plan(context=context, data=data, db=db)
    return { "plan": vector_recipe_matches }