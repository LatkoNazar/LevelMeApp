from api.db.db import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func

class TrainingPlans(Base):
    __tablename__ = "training_plans"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    title = Column(String, nullable=False)
    plan = Column(JSONB, nullable=False)