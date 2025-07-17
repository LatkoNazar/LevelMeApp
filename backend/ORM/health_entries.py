from api.db.db import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func

class HealthEntries(Base):
    __tablename__ = "health_entries"

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    weight = Column(Numeric, nullable=False)
    bed_time = Column(DateTime, nullable=False)
    wake_up = Column(DateTime, nullable=False)
    hours_slept = Column(Numeric, nullable=False)
    mood = Column(Numeric, nullable=False)