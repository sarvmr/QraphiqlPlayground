from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from uuid import uuid4

app = FastAPI()

# In-memory database simulation
games = []

#this class is game object
class Game(BaseModel):
    id: str
    title: str

#this class is used to create a game object with a title
class GameCreate(BaseModel):
    title: str

@app.post("/games", response_model=Game)
def create_game(game: GameCreate):
    new_game = Game(id=str(uuid4()), title=game.title)
    games.append(new_game)
    return new_game

@app.get("/games", response_model=List[Game])
def get_games():
    return games

