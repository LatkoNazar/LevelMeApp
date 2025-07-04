from fastapi import Request, HTTPException
import jwt
import os

def get_token(request: Request):
    ALGORITHM = "HS256"
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    if auth_header == "Bearer ":
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth_header.removeprefix("Bearer ").strip()
    try:
        encoded_jwt = jwt.decode(token, os.getenv("SECRET_KEY_JWT"), algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return encoded_jwt