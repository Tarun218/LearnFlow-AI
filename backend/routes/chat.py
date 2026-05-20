from fastapi import APIRouter

import google.generativeai as genai

import os

from dotenv import load_dotenv

from services.chroma_service import (
    search_document
)

load_dotenv()

router = APIRouter()

# Configure Gemini
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


@router.post("/chat")
async def chat_with_pdf(
    question: str
):

    try:

        relevant_chunks = search_document(
            question
        )

        context = "\n\n".join(
            relevant_chunks
        )

        prompt = f"""
        Answer the question using the provided study material.

        STUDY MATERIAL:
        {context}

        QUESTION:
        {question}
        """

        response = model.generate_content(
            prompt
        )

        return {
            "answer": response.text,
            "context_used": relevant_chunks
        }

    except Exception as e:

        return {
            "error": str(e)
        }