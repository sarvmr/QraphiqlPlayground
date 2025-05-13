import uuid
from sqlalchemy import Column, String
from .database import Base

class Game(Base):
    __tablename__ = "games"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, unique=True, index=True)
