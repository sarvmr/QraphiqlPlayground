from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

user_game_links = []
class UserGameLink(BaseModel):
    username: str
    gameId: str
    
@app.post("/link")
def link_game_to_user(link: UserGameLink):
    user_game_links.append(link)
    return {"success": True, "message": "Game linked to user successfully."}

@app.post("/unlink")
def unlink_game_from_user(link: UserGameLink):
    try:
        user_game_links.remove(link)
        return {"success": True}
    except ValueError:
        return {"success": False}
    
@app.get("/user-games/{username}", response_model=List[UserGameLink])
def get_user_games(username: str):
    user_games = [link for link in user_game_links if link.username == username]
    return user_games

