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


@router.post("/generate-quiz")
async def generate_quiz():

    try:

        print(
            "TOTAL CHUNKS:",
            len(embedding_service.document_chunks)
        )

        if len(embedding_service.document_chunks) == 0:

            return {
                "error": "No PDF uploaded yet",
                "chunks_found": 0
            }

        context = "\n\n".join(
            embedding_service.document_chunks[:10]
        )

        prompt = f"""
        Generate 5 multiple choice questions from the following study material.

        Each question must contain:
        - Question
        - 4 options (A, B, C, D)
        - Correct answer

        STUDY MATERIAL:
        {context}
        """

        response = model.generate_content(
            prompt
        )

        return {
            "quiz": response.text,
            "chunks_found": len(
                embedding_service.document_chunks
            )
        }

    except Exception as e:

        return {
            "error": str(e)
        }