from pydantic import BaseModel

class GameCreate(BaseModel):
    title: str
    
class GameRead(BaseModel):
    id: str
    title: str

    class Config:
        orm_mode = True