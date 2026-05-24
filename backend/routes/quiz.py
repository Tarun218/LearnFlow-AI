from fastapi import APIRouter

from google import genai

import os

from dotenv import load_dotenv

from services.chroma_service import (
    get_document_chunks,
    get_all_documents
)

load_dotenv()

router = APIRouter()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    client = genai.Client(api_key=api_key)
else:
    client = None


@router.post("/generate-quiz")
async def generate_quiz():

    try:

        documents = get_all_documents()

        if len(documents) == 0:

            return {
                "error": "No PDF uploaded yet"
            }

        active_document = documents[-1]

        chunks = get_document_chunks(
            active_document
        )

        context = "\n\n".join(chunks)

        prompt = f"""
        Generate 5 multiple choice questions from the following study material.

        Each question must contain:
        - Question
        - 4 options (A, B, C, D)
        - Correct answer

        STUDY MATERIAL:
        {context}
        """

        if not client:
            return {"error": "GEMINI_API_KEY not configured"}

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {
            "quiz": response.text,
            "document_used": active_document
        }

    except Exception as e:

        return {
            "error": str(e)
        }