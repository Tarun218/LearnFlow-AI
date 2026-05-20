from fastapi import APIRouter

import google.generativeai as genai

import os

from dotenv import load_dotenv

from services.chroma_service import (
    get_all_chunks
)

load_dotenv()

router = APIRouter()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


@router.post("/generate-flashcards")
async def generate_flashcards():

    try:

        chunks = get_all_chunks()

        if len(chunks) == 0:

            return {
                "error": "No PDF uploaded yet"
            }

        context = "\n\n".join(chunks)

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