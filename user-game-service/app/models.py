import uuid
from sqlalchemy import Column, String, UniqueConstraint
from .database import Base

class UserGameLink(Base):
    __tablename__ = "user_game_links"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, index=True, nullable=False)
    gameId = Column(String, index=True, nullable=False)
    

    __table_args__ = (UniqueConstraint('username', 'gameId', name='_username_game_uc'),)
    # This ensures that the combination of username and game_id is unique across the table.