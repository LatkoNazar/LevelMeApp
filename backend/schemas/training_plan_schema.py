from pydantic import BaseModel
from typing import Any, List

class TrainingPlanSchema(BaseModel):
    title: str
    plan: Any

class PlanRequest(BaseModel):
    id: int

class WorkoutRequest(BaseModel):
    muscle_groups: List[str]
    type_of_split: str
    equipment: List[str]
    goal: str