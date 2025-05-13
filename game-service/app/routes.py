from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/games", response_model=schemas.GameRead)
def create_game(game: schemas.GameCreate, db: Session = Depends(get_db)):
    db_game = models.Game(title=game.title)
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game

@router.get("/games", response_model=list[schemas.GameRead])
def read_games(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    games = db.query(models.Game).offset(skip).limit(limit).all()
    return games