from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv

from database.db import engine, Base

from models.user import User

from routes.auth import router as auth_router
from routes.upload import router as upload_router
from routes.ai import router as ai_router
from routes.chat import router as chat_router
from routes.quiz import router as quiz_router
from routes.flashcards import router as flashcards_router
from routes.notes import router as notes_router
from routes.documents import router as documents_router

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(ai_router)
app.include_router(chat_router)
app.include_router(quiz_router)
app.include_router(flashcards_router)
app.include_router(notes_router)
app.include_router(documents_router)


@app.get("/")
def home():
    return {
        "message": "LearnFlow AI Backend Running"
    }