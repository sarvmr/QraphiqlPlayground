from fastapi import FastAPI
from . import models
from .database import engine
from .routes import router

app = FastAPI()
models.Base.metadata.drop_all(bind=engine)  # Drop all tables
models.Base.metadata.create_all(bind=engine)

app.include_router(router)
