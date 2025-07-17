from pydantic import BaseModel
from datetime import datetime

class UserSignUpSchema(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str

class UserLoginSchema(BaseModel):
    email: str
    password: str
    device_info: str

class PhysicalInfoSchema(BaseModel):
    age: float
    sex: str
    height: float
    weight: float
    body_type: str

class DailyHealthEntrySchema(BaseModel):
    weight: float
    bed_time: datetime
    wake_up: datetime
    mood: int
    hours_slept: float
