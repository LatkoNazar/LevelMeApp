from pydantic import BaseModel
from typing import Any, List

class NutritionPlanRequest(BaseModel):
    available_products: str
    allergies_list: str
    goal: str
    additional_notes: str