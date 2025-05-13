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

@router.get("/user-games/{username}", response_model=list[schemas.UserGameRead])
def get_user_games(username: str, db: Session = Depends(get_db)):
    user_games = db.query(models.UserGameLink).filter(models.UserGameLink.username == username).all()
    print(user_games)
    if not user_games:
        return []    
    return user_games


@router.post("/link")
def link_user_game(link: schemas.UserGameCreate, db: Session = Depends(get_db)):
    existing = db.query(models.UserGameLink).filter(
        models.UserGameLink.username == link.username,
        models.UserGameLink.gameId == link.gameId  
    ).first()
    if existing:
        return {"success": False, "reason": "User already linked to this game"}
    db_link = models.UserGameLink(username=link.username, gameId=link.gameId)
    db.add(db_link)
    db.commit()
    #db.refresh(db_link)
    return {"success": True, "reason": "Game linked successfully"}

@router.delete("/unlink")
def unlink_user_game(link: schemas.UserGameCreate, db: Session = Depends(get_db)):
    db_link = db.query(models.UserGameLink).filter(
        models.UserGameLink.username == link.username,
        models.UserGameLink.gameId == link.gameId
    ).first()
    if not db_link:
        return {"success": False, "reason": "Link not found"}
    db.delete(db_link)
    db.commit()
    return {"success": True, "reason": "Unlinked successfully"}