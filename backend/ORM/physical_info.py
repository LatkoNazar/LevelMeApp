from api.db.db import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func

class PhysicalInfo(Base):
    __tablename__ = "initial_physical_info"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    age = Column(Numeric, nullable=False)
    sex = Column(String, nullable=False)
    height = Column(Numeric, nullable=False)
    weight = Column(Numeric, nullable=False)
    body_type = Column(String, nullable=False)