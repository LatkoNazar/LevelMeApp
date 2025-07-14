from pydantic import BaseModel

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