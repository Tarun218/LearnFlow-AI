from fastapi import APIRouter

import google.generativeai as genai

import os

from dotenv import load_dotenv

import services.embedding_service as embedding_service

load_dotenv()

router = APIRouter()

# Configure Gemini
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


@router.post("/generate-flashcards")
async def generate_flashcards():

    try:

        if len(embedding_service.document_chunks) == 0:

            return {
                "error": "No PDF uploaded yet"
            }

        context = "\n\n".join(
            embedding_service.document_chunks[:10]
        )

        prompt = f"""
        Generate 10 study flashcards from the following material.

        Format:
        Q: question
        A: answer

        STUDY MATERIAL:
        {context}
        """

        response = model.generate_content(
            prompt
        )

        return {
            "flashcards": response.text
        }

    except Exception as e:

        return {
            "error": str(e)
        }