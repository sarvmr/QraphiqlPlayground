
from pydantic import BaseModel, ConfigDict

class UserGameCreate(BaseModel):
    username: str
    gameId: str

class UserGameRead(BaseModel):
    id: str
    username: str
    gameId: str

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
        
