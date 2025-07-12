from pydantic import BaseModel
from typing import Any, List

class GeneratedPlanSchema(BaseModel):
    title: str
    plan: Any
    plan_type: str