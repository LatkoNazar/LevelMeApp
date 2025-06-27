from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from api.db.db import Base

class UserTokens(Base):
    __tablename__ = "user_tokens"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    user_id = Column(Integer, nullable=False)
    token = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=True)
    device_info = Column(Text, nullable=True)